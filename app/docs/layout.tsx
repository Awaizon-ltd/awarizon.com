'use client'

import { useEffect, useState, useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { DOCS } from '@/lib/docs'
import { LangProvider, useLang } from '@/components/docs/LangContext'

// ─── Nav tree ─────────────────────────────────────────────────────────────────
// Top-level items → pages (/docs/{id})
// Children → anchor links (#id) within that page

const NAV = [
  { id: 'overview',     label: 'Overview'     },
  { id: 'packages',     label: 'Packages'     },
  { id: 'installation',  label: 'Installation'        },
  { id: 'create-app',   label: 'create-awarizon-app' },
  {
    id: 'setup', label: 'Setup Guide',
    children: [
      { id: 'setup-apikey',  label: '① Get API Key'      },
      { id: 'setup-install', label: '② Install'           },
      { id: 'setup-env',     label: '③ Env Variable'      },
      { id: 'setup-vanilla', label: '④ Node.js / Scripts' },
      { id: 'setup-react',   label: '④ React / Next.js'  },
      { id: 'setup-first',   label: '⑤ First Call'        },
    ],
  },
  { id: 'quickstart', label: 'Quick Start' },
  {
    id: 'web3-sdk', label: '@awarizon/web3',
    children: [
      { id: 'constructor',     label: 'new AwarizonWeb3()' },
      { id: 'contract-method', label: '.contract()'        },
      { id: 'erc-standards',   label: 'ERC Standards'      },
      { id: 'registry',        label: 'Contract Registry'  },
      { id: 'reads',           label: 'Reading state'      },
      { id: 'writes',          label: 'Writing txns'       },
      { id: 'events',          label: 'Events'             },
      { id: 'gas',             label: 'Gas estimation'     },
      { id: 'wallet-builtin',  label: 'Built-in Wallet'   },
      { id: 'wallet-external', label: 'External Wallets'  },
      { id: 'eip1193',         label: 'EIP-1193 Connect'  },
      { id: 'walletconnect',   label: 'WalletConnect'     },
      { id: 'live-tracking',   label: 'Live Tracking'     },
      { id: 'multicall',       label: 'Multicall'         },
    ],
  },
  {
    id: 'react-sdk', label: '@awarizon/react',
    children: [
      { id: 'provider',           label: 'AwarizonProvider'  },
      { id: 'connect-button',     label: 'ConnectButton'     },
      { id: 'connect-modal',      label: 'ConnectModal'      },
      { id: 'account-modal',      label: 'AccountModal'      },
      { id: 'use-wallet',         label: 'useWallet'         },
      { id: 'contract-binding',   label: 'contract()'        },
      { id: 'use-read',           label: 'useRead()'         },
      { id: 'use-write',          label: 'useWrite()'        },
      { id: 'use-contract',       label: 'useContract'       },
      { id: 'use-token',          label: 'useToken'          },
      { id: 'use-nft',            label: 'useNFT'            },
      { id: 'use-native',         label: 'useNativeBalance'  },
      { id: 'chain-icons',        label: 'Chain Icons'       },
    ],
  },
  { id: 'cli', label: '@awarizon/cli' },
  {
    id: 'react-native', label: '@awarizon/react-native',
    children: [
      { id: 'rn-provider',         label: 'AwarizonProvider' },
      { id: 'rn-storage',          label: 'Secure Storage'   },
      { id: 'use-rn-wallet',       label: 'useRNWallet'      },
      { id: 'rn-contract-binding', label: 'contract()'       },
    ],
  },
  {
    id: 'auth-sdk', label: '@awarizon/auth',
    children: [
      { id: 'auth-flow',   label: 'How SIWE Works' },
      { id: 'use-siwe',    label: 'useSiwe'         },
      { id: 'auth-server', label: 'Server Verify'   },
      { id: 'auth-class',  label: 'AwarizonAuth'    },
    ],
  },
  { id: 'chains', label: 'Supported Chains' },
  { id: 'errors', label: 'Error Handling'   },
  { id: 'types',  label: 'TypeScript Types' },
]

type NavItem = typeof NAV[number]

// ─── Layout ───────────────────────────────────────────────────────────────────

function DocsLayoutInner({ children }: { children: ReactNode }) {
  const pathname      = usePathname()
  const currentSlug   = pathname?.split('/docs/')[1]?.split('#')[0] ?? 'overview'
  const [activeId,      setActiveId]      = useState('')
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [mobileNavVisible, setMobileNavVisible] = useState(true)
  const lastScrollY = useRef(0)

  // Derive the right TOC from the current section's h3/step items
  const currentSection = DOCS.find(s => s.id === currentSlug)
  const tocItems = (currentSection?.items ?? [])
    .filter(item => item.type === 'h3' || item.type === 'step')
    .map(item => {
      const it = item as { type: string; id: string; title: string }
      return { id: it.id, label: it.title }
    })

  // IntersectionObserver tracks which h3/step is visible → highlights right TOC
  useEffect(() => {
    setActiveId('')
    const ids  = tocItems.map(t => t.id)
    const els  = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) { setActiveId(entry.target.id); break }
        }
      },
      { rootMargin: '-10% 0px -70% 0px' },
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlug])

  // Mobile-only: show the nav strip when scrolling up or at the top, hide on scroll down
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 10) {
        setMobileNavVisible(true)
      } else if (y < lastScrollY.current) {
        setMobileNavVisible(true)   // scrolling up
      } else if (y > lastScrollY.current + 4) {
        setMobileNavVisible(false)  // scrolling down (4px threshold avoids jitter)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ─── Sidebar nav ────────────────────────────────────────────────────────────

  const SidebarNav = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="py-6 px-3 space-y-0.5">
      {NAV.map(section => {
        const isActive   = currentSlug === section.id
        const hasChildren = 'children' in section && (section as NavItem & { children?: unknown[] }).children

        return (
          <div key={section.id}>
            {/* Top-level link → navigates to the page */}
            <Link
              href={`/docs/${section.id}`}
              onClick={onNavigate}
              className={[
                'flex items-center justify-between font-mono text-[11px] tracking-widest px-3 py-2 transition-colors rounded-sm',
                isActive
                  ? 'text-accent border-l-2 border-accent bg-accent/5'
                  : 'text-muted hover:text-white border-l-2 border-transparent hover:bg-white/[0.03]',
              ].join(' ')}
            >
              <span>{section.label}</span>
              {hasChildren && (
                <span
                  className={[
                    'font-mono text-[8px] transition-transform duration-200 opacity-40',
                    isActive ? 'rotate-90' : '',
                  ].join(' ')}
                >
                  ▶
                </span>
              )}
            </Link>

            {/* Sub-items — only when this page is active */}
            {hasChildren && isActive && (
              <div className="mt-0.5 mb-1">
                {(section as NavItem & { children: { id: string; label: string }[] }).children.map(child => (
                  <a
                    key={child.id}
                    href={`#${child.id}`}
                    onClick={onNavigate}
                    className={[
                      'flex items-center gap-2 font-mono text-[10px] tracking-wide pl-5 pr-3 py-1.5 transition-colors border-l-2',
                      activeId === child.id
                        ? 'text-accent border-accent bg-accent/[0.04]'
                        : 'text-dim hover:text-muted border-transparent hover:border-white/10',
                    ].join(' ')}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-black flex flex-col">

      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-black/95 backdrop-blur border-b border-[#1E1E1E] flex items-center gap-4 px-5 h-14 flex-shrink-0">
        <Link href="/" className="flex items-center gap-3 mr-4">
          <Image src="/logo.png" alt="Awarizon" width={100} height={24} className="h-6 w-auto brightness-0 invert" />
        </Link>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] text-dim tracking-widest hidden sm:block">DOCS</span>
          <span className="font-mono text-[9px] text-accent/50 tracking-widest hidden sm:block">/ v1</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <a
            href="https://www.npmjs.com/org/awarizon"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] text-dim hover:text-white transition-colors tracking-widest hidden sm:block"
          >
            NPM ↗
          </a>
          <Link
            href="/auth"
            className="font-mono text-[10px] tracking-widest px-4 py-2 bg-accent text-black hover:bg-white transition-colors"
          >
            GET API KEY
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden text-muted p-1.5"
            aria-label="Toggle navigation"
          >
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className="block w-3.5 h-px bg-current mb-1.5" />
            <span className="block w-5 h-px bg-current" />
          </button>
        </div>
      </header>

      {/* ── Mobile section nav strip ──────────────────────────────────────── */}
      {/* Fixed below the header on mobile. Slides out when scrolling down, back in on scroll up. */}
      <div
        className={[
          'lg:hidden fixed top-14 left-0 right-0 z-20',
          'bg-black/95 backdrop-blur border-b border-[#1E1E1E]',
          'transition-transform duration-200',
          mobileNavVisible ? 'translate-y-0' : '-translate-y-full',
        ].join(' ')}
      >
        <div className="flex items-center gap-3 px-4 h-10">
          {/* Hamburger — opens the full nav drawer */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex-shrink-0 flex flex-col gap-[4px] py-1 text-dim hover:text-white transition-colors"
            aria-label="Open navigation"
          >
            <span className="block w-[18px] h-px bg-current" />
            <span className="block w-[12px] h-px bg-current" />
            <span className="block w-[18px] h-px bg-current" />
          </button>

          {/* Divider */}
          <span className="w-px h-3.5 bg-[#2a2a2a] flex-shrink-0" />

          {/* Breadcrumb: Docs / Current section */}
          <div className="flex items-center gap-1.5 min-w-0 font-mono text-[10px] tracking-widest overflow-hidden">
            <span className="text-dim/50 flex-shrink-0">DOCS</span>
            <span className="text-dim/30 flex-shrink-0">/</span>
            <span className="text-accent/80 truncate">
              {currentSection?.title ?? 'Overview'}
            </span>
          </div>

          {/* Prev / Next quick arrows */}
          <div className="ml-auto flex items-center gap-3 flex-shrink-0">
            {(() => {
              const idx  = DOCS.findIndex(s => s.id === currentSlug)
              const prev = idx > 0 ? DOCS[idx - 1] : null
              const next = idx < DOCS.length - 1 ? DOCS[idx + 1] : null
              return (
                <>
                  {prev ? (
                    <Link href={`/docs/${prev.id}`} className="font-mono text-[11px] text-dim hover:text-white transition-colors" aria-label={`Previous: ${prev.title}`}>←</Link>
                  ) : <span className="w-4" />}
                  {next ? (
                    <Link href={`/docs/${next.id}`} className="font-mono text-[11px] text-dim hover:text-white transition-colors" aria-label={`Next: ${next.title}`}>→</Link>
                  ) : <span className="w-4" />}
                </>
              )
            })()}
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      {/* Desktop: fixed to remaining viewport height — sidebars and content each scroll independently.
          Mobile: unconstrained height — normal page scroll. */}
      <div className="flex flex-1 lg:min-h-0 lg:overflow-hidden">

        {/* Left sidebar — desktop: fills body column, scrolls its own nav */}
        <aside className="hidden lg:block flex-shrink-0 w-56 xl:w-64 border-r border-[#1E1E1E] overflow-y-auto">
          <SidebarNav />
        </aside>

        {/* Mobile drawer */}
        {mobileOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 bg-black/80 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="lg:hidden fixed left-0 top-14 bottom-0 w-64 bg-[#050505] border-r border-[#1E1E1E] z-50 overflow-y-auto">
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
            </aside>
          </>
        )}

        {/* Center content — desktop: scrolls independently within the fixed body row */}
        {/* pt-10 on mobile offsets the fixed nav strip (h-10); lg:pt-12 restores normal padding */}
        <main className="flex-1 min-w-0 px-6 md:px-10 lg:px-14 xl:px-16 pt-14 lg:pt-12 pb-12 lg:overflow-y-auto">
          {children}
        </main>

        {/* Right TOC — xl+ only, scrolls its own column */}
        {tocItems.length > 0 && (
          <aside className="hidden xl:block flex-shrink-0 w-52 2xl:w-56 border-l border-[#1E1E1E] overflow-y-auto py-8 px-4">
            <p className="font-mono text-[9px] tracking-[0.2em] text-dim/50 mb-4 uppercase">On this page</p>
            <nav className="space-y-0.5">
              {tocItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={[
                    'block font-mono text-[10px] tracking-wide py-1.5 px-2 transition-colors border-l',
                    activeId === item.id
                      ? 'text-accent border-accent'
                      : 'text-dim hover:text-muted border-transparent',
                  ].join(' ')}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
        )}

      </div>
    </div>
  )
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <DocsLayoutInner>{children}</DocsLayoutInner>
    </LangProvider>
  )
}
