'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Lenis from 'lenis'
import Navigation from './Navigation'
import Footer from './Footer'

export default function ClientShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const hideChrome =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/docs')

  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Disable smooth scroll inside dashboard/auth to keep them snappy
      ...(hideChrome ? { duration: 0.01 } : {}),
    })
    lenisRef.current = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [hideChrome])

  // Lenis intercepts native scrolling, so Next's default scroll restoration
  // never fires -- reset to top ourselves on every route change.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return (
    <>
      {!hideChrome && <Navigation />}
      <main className="relative">{children}</main>
      {!hideChrome && <Footer />}
    </>
  )
}
