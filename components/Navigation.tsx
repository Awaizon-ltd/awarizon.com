'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NAV_LAYERS } from '@/lib/constants'

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update progress bar
      const bar = document.getElementById('progress-bar')
      if (bar) {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
        bar.style.transform = `scaleX(${scrollPercent})`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const currentIndex = NAV_LAYERS.findIndex(l => pathname === l.href)

  return (
    <>
      {/* Top bar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-sm border-b border-[#1A1A1A]' : ''
      }`}>
        <div className="flex items-center justify-between px-6 md:px-10 h-16">
          {/* Logo */}
          <Link href="/shift" className="group flex items-center gap-3">
            <div className="relative h-8 w-auto">
              <Image
                src="/logo.png"
                alt="Awarizon"
                height={32}
                width={120}
                className="h-8 w-auto object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                priority
              />
            </div>
          </Link>

          {/* Center: current layer indicator */}
          <div className="hidden md:flex items-center gap-2">
            {currentIndex >= 0 && (
              <>
                <span className="sys-label opacity-50">
                  {String(currentIndex + 1).padStart(2, '0')} /
                </span>
                <span className="sys-label">
                  {NAV_LAYERS[currentIndex].code}
                </span>
              </>
            )}
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-2 mr-2">
            <Link
              href="/auth"
              className="font-mono text-[10px] tracking-widest text-muted hover:text-white transition-colors duration-200 px-3 py-2 hidden sm:block"
            >
              SIGN IN
            </Link>
            <Link
              href="/auth"
              className="font-mono text-[10px] tracking-widest px-4 py-2 bg-accent text-black hover:bg-white transition-colors duration-200"
            >
              GET STARTED →
            </Link>
          </div>

          {/* Right: hamburger / nav toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2 group"
            aria-label="Toggle navigation"
          >
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-px bg-accent transition-all duration-300 ${menuOpen ? 'w-6 opacity-0' : 'w-4'}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-black/97 backdrop-blur-md" />
        <div className="grid-bg-static absolute inset-0 opacity-50" />

        <div className="relative h-full flex items-center justify-center px-6">
          <nav className="w-full max-w-2xl">
            {/* System header */}
            <div className="mb-12">
              <p className="sys-label opacity-40 mb-2">NAVIGATION SYSTEM // LAYER SELECT</p>
              <div className="h-px bg-gradient-to-r from-accent via-accent/40 to-transparent" />
            </div>

            <ul className="space-y-1">
              {NAV_LAYERS.map((layer, i) => {
                const isActive = pathname === layer.href
                return (
                  <li key={layer.href}>
                    <Link
                      href={layer.href}
                      className={`group flex items-center gap-6 py-4 px-4 border-l-2 transition-all duration-300 ${
                        isActive
                          ? 'border-accent bg-accent/5'
                          : 'border-transparent hover:border-accent/40 hover:bg-white/2'
                      }`}
                    >
                      <span className={`font-mono text-xs tracking-widest w-8 ${
                        isActive ? 'text-accent' : 'text-dim group-hover:text-accent/60'
                      }`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <div className={`font-display font-semibold text-lg tracking-wide transition-colors ${
                          isActive ? 'text-white' : 'text-muted group-hover:text-white'
                        }`}>
                          {layer.label}
                        </div>
                        <div className={`font-mono text-xs mt-0.5 tracking-widest uppercase ${
                          isActive ? 'text-accent' : 'text-dim group-hover:text-accent/40'
                        }`}>
                          {layer.sublabel}
                        </div>
                      </div>
                      <span className={`font-mono text-xs transition-all duration-300 ${
                        isActive ? 'text-accent' : 'text-dim opacity-0 group-hover:opacity-100'
                      }`}>
                        →
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Bottom info */}
            <div className="mt-12 pt-6 border-t border-[#1A1A1A] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Awarizon"
                  height={20}
                  width={80}
                  className="h-5 w-auto object-contain opacity-30 brightness-0 invert"
                />
              </div>
              <span className="sys-label opacity-30">GLOBAL // ON-CHAIN</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Side progress dots (desktop) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3">
        {NAV_LAYERS.map((layer, i) => {
          const isActive = pathname === layer.href
          return (
            <Link
              key={layer.href}
              href={layer.href}
              title={layer.label}
              className="group flex items-center gap-2 justify-end"
            >
              <span className={`font-mono text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                isActive ? 'text-accent' : 'text-muted'
              }`}>
                {layer.code}
              </span>
              <div className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-3 h-3 bg-accent shadow-[0_0_10px_rgba(255,229,0,0.8)]'
                  : 'w-1.5 h-1.5 bg-[#333] group-hover:bg-[#555]'
              }`} />
            </Link>
          )
        })}
      </div>
    </>
  )
}
