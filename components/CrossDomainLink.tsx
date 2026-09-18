'use client'

import { useEffect, useState, type ReactNode, type MouseEvent } from 'react'
import { auth } from '@/lib/firebase/client'
import { mainUrl, dashboardUrl, docsUrl } from '@/lib/domains'

type Target = 'main' | 'dashboard' | 'docs'

function resolve(to: Target, path: string): string {
  if (to === 'main') return mainUrl(path)
  if (to === 'dashboard') return dashboardUrl(path)
  return docsUrl(path)
}

interface Props {
  to: Target
  path?: string
  /** Carry the current Firebase session over to dashboard.awarizon.com. No-op for other targets. */
  withAuthHandoff?: boolean
  className?: string
  children: ReactNode
  /** Fired synchronously on click, alongside (not instead of) the cross-domain navigation — e.g. to close a mobile drawer. */
  onClick?: () => void
}

/**
 * A link that crosses an app boundary (awarizon.com ↔ dashboard.awarizon.com
 * ↔ docs.awarizon.com). Always opens a new tab, and — for dashboard links,
 * when the visitor is already signed in — hands off the current session so
 * they land there already authenticated instead of hitting a second login.
 */
export default function CrossDomainLink({ to, path = '/', withAuthHandoff = false, className, children, onClick }: Props) {
  // Relative fallback on first render (matches SSR), upgraded to the real
  // cross-origin URL once mounted — avoids a hydration mismatch.
  const [href, setHref] = useState(() => (to === 'dashboard' ? `/dashboard${path === '/' ? '' : path}` : to === 'docs' ? `/docs${path === '/' ? '' : path}` : path))

  useEffect(() => {
    setHref(resolve(to, path))
  }, [to, path])

  async function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.()
    // Let modified clicks (open in new tab / background tab) use the native href.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return
    e.preventDefault()

    const destination = resolve(to, path)
    const win = window.open('about:blank', '_blank')
    if (!win) {
      // Popup blocked — same-tab navigation beats a silently swallowed click.
      window.location.href = destination
      return
    }

    if (to === 'dashboard' && withAuthHandoff && auth.currentUser) {
      try {
        const idToken = await auth.currentUser.getIdToken()
        const res = await fetch('/api/auth/handoff', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ idToken }),
        })
        if (!res.ok) throw new Error('handoff failed')
        const { token } = await res.json() as { token: string }
        // Base is needed since `destination` may be a relative path in dev/preview.
        const url = new URL(destination, window.location.origin)
        url.searchParams.set('handoff', token)
        win.location.href = url.toString()
        return
      } catch {
        // Fall through — dashboard.awarizon.com just shows its own sign-in.
      }
    }

    win.location.href = destination
  }

  return (
    <a href={href} onClick={handleClick} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
