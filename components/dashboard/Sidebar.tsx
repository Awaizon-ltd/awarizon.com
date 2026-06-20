'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, type User } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

interface Props {
  user:    User
  open:    boolean
  onClose: () => void
}

const NAV_ITEMS = [
  { href: '/dashboard',           label: 'Overview',  code: '01', icon: '◉' },
  { href: '/dashboard/api-keys',  label: 'API Keys',  code: '02', icon: '◇' },
  { href: '/dashboard/usage',     label: 'Usage',     code: '03', icon: '◈' },
  { href: '/dashboard/codegen',   label: 'Code Gen',  code: '04', icon: '◌' },
  { href: '/dashboard/docs',      label: 'SDK Docs',  code: '05', icon: '◫' },
  { href: '/dashboard/profile',   label: 'Profile',   code: '06', icon: '◈' },
  { href: '/dashboard/settings',  label: 'Settings',  code: '07', icon: '⬡' },
]

const SITE_LINKS = [
  { href: '/infrastructure', label: 'Infrastructure' },
  { href: '/learn',          label: 'Web3 Academy'   },
]

function Initials({ user }: { user: User }) {
  const name = user.displayName ?? user.email ?? '?'
  const letters = name.includes(' ')
    ? name.split(' ').slice(0, 2).map(w => w[0]).join('')
    : name.slice(0, 2)
  return (
    <div className="w-9 h-9 flex items-center justify-center bg-accent text-black font-mono text-sm font-bold flex-shrink-0">
      {letters.toUpperCase()}
    </div>
  )
}

export default function Sidebar({ user, open, onClose }: Props) {
  const pathname = usePathname()
  const router   = useRouter()

  async function handleSignOut() {
    await signOut(auth)
    router.replace('/auth')
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-black border-r border-[#2A2A2A]">

      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#202020]">
        <Link href="/shift" className="group flex items-center gap-3 flex-1 min-w-0">
          <Image
            src="/logo.png"
            alt="Awarizon"
            height={28}
            width={110}
            className="h-7 w-auto object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
          />
        </Link>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-mono text-[10px] text-dim tracking-widest hidden sm:block">DASHBOARD</span>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden text-dim hover:text-white transition-colors p-1"
            aria-label="Close sidebar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="13" y1="1" x2="1"  y2="13" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
      </div>

      {/* User info */}
      <div className="px-5 py-4 border-b border-[#202020]">
        <div className="flex items-center gap-3">
          <Initials user={user} />
          <div className="min-w-0">
            <div className="font-display font-semibold text-white text-sm truncate">
              {user.displayName ?? 'User'}
            </div>
            <div className="font-mono text-[10px] text-muted truncate tracking-wide">
              {user.email}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[10px] text-accent/80 tracking-widest">ACTIVE SESSION</span>
        </div>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <div className="font-mono text-[10px] text-dim/80 tracking-widest px-2 pb-2">NAVIGATION</div>
        {NAV_ITEMS.map(item => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={[
                'flex items-center gap-3 px-3 py-2.5 transition-all group',
                active
                  ? 'bg-accent/8 border-l-2 border-accent text-accent'
                  : 'border-l-2 border-transparent text-muted hover:text-white hover:bg-[#0A0A0A]',
              ].join(' ')}
            >
              <span className={`font-mono text-base leading-none ${active ? 'text-accent' : 'text-dim group-hover:text-accent/60'}`}>
                {item.icon}
              </span>
              <span className="font-mono text-[12px] tracking-widest flex-1">{item.label}</span>
              <span className={`font-mono text-[9px] ${active ? 'text-accent/60' : 'text-dim/60'}`}>
                {item.code}
              </span>
            </Link>
          )
        })}

        {/* Site links */}
        <div className="font-mono text-[10px] text-dim/80 tracking-widest px-2 pt-5 pb-2">EXPLORE</div>
        {SITE_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 border-l-2 border-transparent text-muted hover:text-white hover:bg-[#0A0A0A] transition-all group"
          >
            <span className="font-mono text-[10px] text-dim/60 group-hover:text-accent/60 transition-colors">↗</span>
            <span className="font-mono text-[12px] tracking-widest">{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Sign out */}
      <div className="px-3 pb-5 pt-2 border-t border-[#202020]">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-muted hover:text-white hover:bg-[#0A0A0A] transition-all group"
        >
          <span className="font-mono text-base leading-none text-dim/70 group-hover:text-red-400 transition-colors">⎋</span>
          <span className="font-mono text-[12px] tracking-widest">Sign Out</span>
        </button>
        <p className="font-mono text-[9px] text-dim/50 px-3 pt-3 tracking-widest">
          BUILD_{new Date().getFullYear()} // AWARIZON LABS
        </p>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar — drawer */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          {/* Drawer */}
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-72 z-50 flex flex-col animate-slide-in-left">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  )
}
