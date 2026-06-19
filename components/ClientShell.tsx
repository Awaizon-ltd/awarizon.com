'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

export default function ClientShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const hideChrome = pathname.startsWith('/dashboard') || pathname.startsWith('/auth') || pathname.startsWith('/docs')

  return (
    <>
      {!hideChrome && <Navigation />}
      <main className="relative">{children}</main>
      {!hideChrome && <Footer />}
    </>
  )
}
