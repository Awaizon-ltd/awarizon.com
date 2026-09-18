'use client'

import type { ReactNode } from 'react'

type Target = 'main' | 'dashboard' | 'docs'

function resolve(to: Target, path: string): string {
  const prefix = to === 'dashboard' ? '/dashboard' : to === 'docs' ? '/docs' : ''
  if (path === '/') return prefix || '/'
  return `${prefix}${path}`
}

interface Props {
  to: Target
  path?: string
  className?: string
  children: ReactNode
  /** Fired on click, alongside the navigation — e.g. to close a mobile drawer. */
  onClick?: () => void
}

/**
 * Opens a section of the site (dashboard/docs) in a new tab, keeping the
 * current tab open. Everything is served from the same origin — there is
 * no subdomain involved.
 */
export default function NewTabLink({ to, path = '/', className, children, onClick }: Props) {
  return (
    <a href={resolve(to, path)} onClick={onClick} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
