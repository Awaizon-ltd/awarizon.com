'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ─── Nav tree ─────────────────────────────────────────────────────────────────

const NAV = [
  { id: 'overview',     label: 'Overview'     },
  { id: 'packages',     label: 'Packages'     },
  { id: 'installation', label: 'Installation' },
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
      { id: 'use-read-contract',  label: 'useReadContract'   },
      { id: 'use-write-contract', label: 'useWriteContract'  },
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

type NavItem = typeof NAV[number]

function getParentSection(activeId: string): NavItem | null {
  for (const s of NAV) {
    if (s.id === activeId) return s
    if ('children' in s && s.children?.some(c => c.id === activeId)) return s
  }
  return null
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function DocsLayout({ children }: { children: ReactNode }) {
  const [active,        setActive]        = useState('overview')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    const ids = NAV.flatMap(s => 'children' in s && s.children ? [s.id, ...s.children.map(c => c.id)] : [s.id])
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-15% 0px -75% 0px' },
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const parentSection = getParentSection(active)
  const tocItems = 'children' in (parentSection ?? {}) ? (parentSection as NavItem & { children: { id: string; label: string }[] }).children ?? [] : []

  const sidebarContent = (
    <nav className="space-y-0.5">
      {NAV.map(section => (
        <div key={section.id}>
          <a
            href={`#${section.id}`}
            onClick={() => setMobileNavOpen(false)}
            className={[
              'block font-mono text-[11px] tracking-widest px-3 py-2 transition-colors',
              active === section.id
                ? 'text-accent border-l-2 border-accent bg-accent/5'
                : 'text-muted hover:text-white border-l-2 border-transparent hover:bg-[#0A0A0A]',
            ].join(' ')}
          >
            {section.label}
          </a>
          {'children' in section && section.children?.map(child => (
            <a
              key={child.id}
              href={`#${child.id}`}
              onClick={() => setMobileNavOpen(false)}
              className={[
                'block font-mono text-[10px] tracking-wider pl-6 pr-3 py-1.5 transition-colors',
                active === child.id ? 'text-accent' : 'text-dim hover:text-muted',
              ].join(' ')}
            >
              {child.label}
            </a>
          ))}
        </div>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-black flex flex-col">

      {/* Top bar */}
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
            onClick={() => setMobileNavOpen(v => !v)}
            className="lg:hidden text-muted p-1.5"
            aria-label="Toggle nav"
          >
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className="block w-3.5 h-px bg-current mb-1.5" />
            <span className="block w-5 h-px bg-current" />
          </button>
        </div>
      </header>

      {/* Body — desktop: 3-col with only center scrolling */}
      <div className="flex flex-1 lg:h-[calc(100vh-3.5rem)] lg:overflow-hidden">

        {/* Left sidebar — desktop */}
        <aside className="hidden lg:flex flex-col w-56 xl:w-64 flex-shrink-0 border-r border-[#1E1E1E] overflow-y-auto py-6 px-3">
          {sidebarContent}
        </aside>

        {/* Mobile drawer */}
        {mobileNavOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 bg-black/80 z-40"
              onClick={() => setMobileNavOpen(false)}
            />
            <aside className="lg:hidden fixed left-0 top-14 bottom-0 w-64 bg-black border-r border-[#1E1E1E] z-50 overflow-y-auto py-6 px-3">
              {sidebarContent}
            </aside>
          </>
        )}

        {/* Center — only this scrolls on desktop */}
        <main className="flex-1 min-w-0 overflow-y-auto px-6 md:px-10 lg:px-14 py-12">
          {children}
        </main>

        {/* Right TOC sidebar — xl+ only */}
        <aside className="hidden xl:flex flex-col w-48 2xl:w-52 flex-shrink-0 border-l border-[#1E1E1E] overflow-y-auto py-8 px-4">
          {tocItems.length > 0 ? (
            <>
              <p className="font-mono text-[9px] tracking-[0.2em] text-dim/60 mb-4 uppercase">On this page</p>
              <nav className="space-y-0.5">
                {tocItems.map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={[
                      'block font-mono text-[10px] tracking-wide py-1.5 px-2 transition-colors',
                      active === item.id
                        ? 'text-accent border-l border-accent pl-2'
                        : 'text-dim hover:text-muted border-l border-transparent',
                    ].join(' ')}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </>
          ) : null}
        </aside>

      </div>
    </div>
  )
}
