'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LAYERS } from '@/lib/constants'
import CrossDomainLink from '@/components/CrossDomainLink'

// Desktop pill nav grouped into 4 dropdown menus — /shift is covered by the
// logo, /access is the "Get started" CTA pill, so both sit outside these groups.
// `crossApp` marks items that live on a different subdomain (docs.awarizon.com)
// and should open in a new tab via CrossDomainLink instead of a same-app Link.
const MENU_GROUPS = [
  {
    label: 'Platform',
    items: [
      { href: '/infrastructure',   label: 'Infrastructure',    sub: 'Systems we build' },
      { href: '/sdk',               label: 'SDK',                 sub: 'Developer APIs & packages' },
      { href: '/custom-solutions', label: 'Custom Solutions',   sub: 'Bespoke infrastructure development' },
    ],
  },
  {
    label: 'Ecosystem',
    items: [
      { href: '/ecosystem', label: 'Ecosystem Logic',   sub: 'Everything connected' },
      { href: '/adoption',  label: 'Adoption Layer',     sub: 'Distribution as design' },
      { href: '/thesis',    label: 'Global Thesis',       sub: 'Why we exist here' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { href: '/learn', label: 'Web3 Academy', sub: 'Blockchain education hub' },
      { href: '/docs',  label: 'Documentation', sub: 'SDK reference & guides', crossApp: 'docs' as const },
    ],
  },
  {
    label: 'Company',
    items: [
      { href: '/company', label: 'About Awarizon', sub: 'Our mission & team' },
      { href: '/access',  label: 'Contact',         sub: 'Get in touch' },
    ],
  },
]

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)

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
    setOpenGroup(null)
  }, [pathname])

  return (
    <>
      {/* Top bar — floating pill nav (desktop) */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4 md:pt-5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-3">

          {/* Left — logo + 4 grouped dropdown menus, merged into one pill (desktop only) */}
          <div className={`hidden lg:flex items-center bg-[#0D0D0D]/90 backdrop-blur-xl border rounded-full p-1.5 pr-2 gap-0.5 shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-colors duration-300 ${
            scrolled ? 'border-white/15' : 'border-white/10'
          }`}>
            <Link href="/shift" className="relative h-9 w-9 rounded-full bg-accent flex items-center justify-center shrink-0 overflow-hidden">
              <Image src="/slogo.png" alt="Awarizon" width={20} height={20} className="h-5 w-5 object-contain brightness-0" />
            </Link>
            <nav className="flex items-center gap-0.5 pl-1.5">
              {MENU_GROUPS.map((group) => {
                const isActiveGroup = group.items.some(i => i.href === pathname)
                const isOpen = openGroup === group.label
                return (
                  <div
                    key={group.label}
                    className="relative"
                    onMouseEnter={() => setOpenGroup(group.label)}
                    onMouseLeave={() => setOpenGroup(null)}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenGroup(isOpen ? null : group.label)}
                      className={`flex items-center gap-1 font-body text-[13px] px-3.5 py-2 rounded-full transition-colors duration-200 whitespace-nowrap ${
                        isActiveGroup || isOpen ? 'text-black bg-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {group.label}
                      <svg
                        width="10" height="10" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-0 mt-2 w-64 bg-[#0D0D0D]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_16px_40px_rgba(0,0,0,0.5)] origin-top-left"
                        >
                          {group.items.map((item) => {
                            const isItemActive = pathname === item.href
                            const itemClassName = `block px-3.5 py-2.5 rounded-xl transition-colors duration-150 ${
                              isItemActive ? 'bg-accent/10' : 'hover:bg-white/[0.06]'
                            }`
                            const itemContent = (
                              <>
                                <div className={`font-body text-[13px] ${isItemActive ? 'text-accent' : 'text-white'}`}>
                                  {item.label}
                                </div>
                                <div className="font-mono text-[10px] text-dim mt-0.5">{item.sub}</div>
                              </>
                            )
                            if ('crossApp' in item && item.crossApp) {
                              return (
                                <CrossDomainLink key={item.href} to={item.crossApp} path="/" className={itemClassName}>
                                  {itemContent}
                                </CrossDomainLink>
                              )
                            }
                            return (
                              <Link key={item.href} href={item.href} className={itemClassName}>
                                {itemContent}
                              </Link>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </nav>
          </div>

          {/* Logo alone — mobile/tablet (pill nav needs lg width) */}
          <Link href="/shift" className="lg:hidden relative h-10 w-10 rounded-full bg-accent flex items-center justify-center shrink-0">
            <Image src="/slogo.png" alt="Awarizon" width={22} height={22} className="h-[22px] w-[22px] object-contain brightness-0" />
          </Link>

          {/* Right — sign in, get-started pill, hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth"
              className="hidden lg:block font-body text-[13px] text-white/70 hover:text-white transition-colors duration-200 px-2"
            >
              Sign in
            </Link>

            <Link
              href="/auth"
              className={`hidden sm:flex items-center bg-[#0D0D0D]/90 backdrop-blur-xl border rounded-full p-1.5 pl-5 gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.45)] group transition-colors duration-300 ${
                scrolled ? 'border-white/15' : 'border-white/10'
              }`}
            >
              <span className="font-body text-[13px] text-white whitespace-nowrap">Get started</span>
              <span className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-accent transition-colors duration-200 shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </span>
            </Link>

            {/* Hamburger — mobile/tablet nav toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-3 bg-[#0D0D0D]/90 backdrop-blur-xl border border-white/10 rounded-full group"
              aria-label="Toggle navigation"
            >
              <span className={`block w-4 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <span className={`block h-px bg-accent transition-all duration-300 ${menuOpen ? 'w-4 opacity-0' : 'w-3'}`} />
              <span className={`block w-4 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </button>
          </div>
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
                  ? 'w-3 h-3 bg-accent shadow-[0_0_10px_rgba(200,241,63,0.8)]'
                  : 'w-1.5 h-1.5 bg-[#333] group-hover:bg-[#555]'
              }`} />
            </Link>
          )
        })}
      </div>
    </>
  )
}
