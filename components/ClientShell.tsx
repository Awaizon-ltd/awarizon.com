'use client'

import { useEffect } from 'react'
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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Disable smooth scroll inside dashboard/auth to keep them snappy
      ...(hideChrome ? { duration: 0.01 } : {}),
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [hideChrome])

  return (
    <>
      {!hideChrome && <Navigation />}
      <main className="relative">{children}</main>
      {!hideChrome && <Footer />}
    </>
  )
}
