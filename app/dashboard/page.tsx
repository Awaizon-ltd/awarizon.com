'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

const QUICK_LINKS = [
  { href: '/dashboard/api-keys', label: 'API Keys',       desc: 'Generate & manage API credentials',  tag: 'DASH_02' },
  { href: '/dashboard/usage',    label: 'SDK Usage',      desc: 'Calls, chains, success rates',       tag: 'DASH_03' },
  { href: '/dashboard/codegen',  label: 'Code Generator', desc: 'Generate typed clients & hooks',     tag: 'DASH_04' },
  { href: '/infrastructure',     label: 'Infrastructure', desc: 'Wallets, payments, identity, APIs',  tag: 'LAYER_02' },
  { href: '/learn',              label: 'Web3 Academy',   desc: 'Blockchain education hub',           tag: 'LAYER_08' },
]

interface UsageTotals {
  calls:     number
  reads:     number
  writes:    number
  errors:    number
  lastCallAt: string | null
}

function fmtNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K'
  return String(n)
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="border border-[#2A2A2A] bg-[#0E0E0E] p-5 group hover:border-[#3A3A3A] transition-colors">
      <div className="font-mono text-[10px] text-dim tracking-widest mb-3">{label}</div>
      <div className="font-display font-bold text-2xl text-white mb-1">{value}</div>
      <div className="font-mono text-[10px] text-accent/80 tracking-widest">{sub}</div>
    </div>
  )
}

export default function DashboardPage() {
  const [user,  setUser]  = useState<User | null>(null)
  const [usage, setUsage] = useState<UsageTotals | null>(null)

  const fetchUsage = useCallback(async (u: User) => {
    try {
      const token = await u.getIdToken()
      const res   = await fetch('/api/usage/stats', { headers: { 'x-id-token': token } })
      if (res.ok) {
        const data = await res.json() as { totals: UsageTotals }
        setUsage(data.totals)
      }
    } catch {
      // Non-critical — silently skip if stats unavailable
    }
  }, [])

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      if (u) fetchUsage(u)
    })
  }, [fetchUsage])

  const successRate = usage && usage.calls > 0
    ? ((1 - usage.errors / usage.calls) * 100).toFixed(1) + '%'
    : '—'

  return (
    <div className="p-6 lg:p-10 max-w-5xl">

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-[11px] tracking-[0.3em] text-dim">DASHBOARD // OVERVIEW</span>
          <span className="w-1 h-1 rounded-full bg-accent/40" />
          <span className="font-mono text-[11px] text-dim">
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </span>
        </div>
      </div>

      {/* Stats row — live SDK metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#2A2A2A] mb-10">
        <StatCard
          label="TOTAL SDK CALLS"
          value={usage ? fmtNum(usage.calls) : '—'}
          sub="ALL TIME"
        />
        <StatCard
          label="CONTRACT READS"
          value={usage ? fmtNum(usage.reads) : '—'}
          sub="VIEW / PURE"
        />
        <StatCard
          label="CONTRACT WRITES"
          value={usage ? fmtNum(usage.writes) : '—'}
          sub="TRANSACTIONS"
        />
        <StatCard
          label="SUCCESS RATE"
          value={successRate}
          sub={usage && usage.errors > 0 ? `${fmtNum(usage.errors)} ERRORS` : 'NO ERRORS'}
        />
      </div>

      {/* Quick links */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-[11px] text-dim tracking-widest">EXPLORE AWARIZON</span>
          <div className="flex-1 h-px bg-[#2A2A2A]" />
        </div>
        <div className="grid sm:grid-cols-2 gap-px bg-[#2A2A2A]">
          {QUICK_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="group bg-black hover:bg-[#0E0E0E] p-5 flex items-start gap-4 transition-all border border-transparent hover:border-[#333]"
            >
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[10px] text-dim/80 tracking-widest mb-1">{link.tag}</div>
                <div className="font-display font-semibold text-white text-sm mb-1 group-hover:text-accent transition-colors">
                  {link.label}
                </div>
                <div className="font-body text-xs text-muted leading-relaxed">{link.desc}</div>
              </div>
              <span className="font-mono text-dim group-hover:text-accent transition-colors mt-0.5">→</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
