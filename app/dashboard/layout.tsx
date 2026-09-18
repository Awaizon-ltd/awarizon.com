'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import Sidebar from '@/components/dashboard/Sidebar'
import Image from 'next/image'
import Link from 'next/link'

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border border-accent/30 border-t-accent rounded-full animate-spin" />
        <span className="font-mono text-[10px] text-dim tracking-[0.3em]">LOADING SESSION</span>
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router  = useRouter()
  const [user,         setUser]         = useState<User | null>(null)
  const [loading,      setLoading]      = useState(true)
  const [sidebarOpen,  setSidebarOpen]  = useState(false)

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace('/auth')
      } else {
        setUser(u)
        setLoading(false)
      }
    })
  }, [router])

  if (loading) return <LoadingScreen />
  if (!user)   return null

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar
        user={user}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area — offset by sidebar on desktop */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">

        {/* Mobile top bar — hidden on desktop (sidebar handles navigation there) */}
        <header className="lg:hidden sticky top-0 z-20 flex items-center gap-3 px-4 h-14 bg-black border-b border-[#252525]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col gap-1.5 p-1.5 text-muted hover:text-white transition-colors"
            aria-label="Open sidebar"
          >
            <span className="block w-5 h-px bg-current" />
            <span className="block w-3.5 h-px bg-current" />
            <span className="block w-5 h-px bg-current" />
          </button>

          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Awarizon"
              height={24}
              width={96}
              className="h-6 w-auto object-contain brightness-0 invert"
            />
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[11px] text-muted tracking-widest hidden sm:block truncate max-w-[160px]">
              {user.email}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
