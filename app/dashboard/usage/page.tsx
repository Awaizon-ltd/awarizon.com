'use client'

import { useEffect, useState, useCallback } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import Link from 'next/link'

interface DayStat {
  date:   string
  calls:  number
  reads:  number
  writes: number
  errors: number
}

interface KeyStat {
  keyId:      string
  keyName:    string
  calls:      number
  reads:      number
  writes:     number
  errors:     number
  lastCallAt: string | null
}

interface StatsData {
  totals: {
    calls:     number
    reads:     number
    writes:    number
    errors:    number
    chains:    Record<string, number>
    lastCallAt: string | null
  }
  days: DayStat[]
  keys: KeyStat[]
}

function fmtDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function fmtNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K'
  return String(n)
}

function successRate(calls: number, errors: number): string {
  if (calls === 0) return '—'
  return ((1 - errors / calls) * 100).toFixed(1) + '%'
}

function MetricCard({
  label, value, sub, accent = false,
}: { label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div className={`border bg-[#030303] p-5 ${accent ? 'border-accent/30' : 'border-[#111]'}`}>
      <div className="font-mono text-[8px] text-dim tracking-widest mb-3">{label}</div>
      <div className={`font-display font-bold text-2xl mb-1 ${accent ? 'text-accent' : 'text-white'}`}>
        {value}
      </div>
      <div className="font-mono text-[9px] text-dim/70 tracking-widest">{sub}</div>
    </div>
  )
}

function BarChart({ days }: { days: DayStat[] }) {
  const maxCalls = Math.max(...days.map(d => d.calls), 1)

  return (
    <div className="flex items-end gap-1.5 h-24">
      {days.map(day => {
        const height = Math.max((day.calls / maxCalls) * 100, day.calls > 0 ? 4 : 0)
        return (
          <div key={day.date} className="flex-1 flex flex-col items-center gap-1 group relative">
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-[#111] border border-[#222] px-2 py-1 whitespace-nowrap">
                <div className="font-mono text-[9px] text-accent">{day.calls} calls</div>
                <div className="font-mono text-[8px] text-dim">{day.date.slice(5)}</div>
              </div>
            </div>
            <div
              className="w-full bg-accent/20 group-hover:bg-accent/40 transition-colors"
              style={{ height: `${height}%` }}
            />
            <span className="font-mono text-[7px] text-dim/60 tracking-wider">
              {day.date.slice(8)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function UsagePage() {
  const [user,    setUser]    = useState<User | null>(null)
  const [stats,   setStats]   = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  const fetchStats = useCallback(async (u: User) => {
    try {
      const token = await u.getIdToken()
      const res   = await fetch('/api/usage/stats', {
        headers: { 'x-id-token': token },
      })
      if (!res.ok) throw new Error('Failed to fetch stats')
      const data = await res.json() as StatsData
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load usage data.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      if (u) fetchStats(u)
      else setLoading(false)
    })
  }, [fetchStats])

  const t = stats?.totals

  // Sort chains by usage descending
  const topChains = t
    ? Object.entries(t.chains).sort(([, a], [, b]) => b - a).slice(0, 6)
    : []

  return (
    <div className="p-6 lg:p-10 max-w-5xl">

      {/* Header */}
      <div className="mb-10">
        <span className="font-mono text-[9px] tracking-[0.3em] text-dim block mb-3">
          DASHBOARD // SDK_USAGE
        </span>
        <h1 className="font-display font-extrabold text-white leading-tight mb-2"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
          SDK Usage
        </h1>
        <p className="font-body text-muted text-base">
          Real-time metrics from your API keys. All data is attributed to your authenticated account.
        </p>
      </div>

      {loading && (
        <div className="flex items-center gap-3 py-12">
          <span className="w-4 h-4 border border-accent/30 border-t-accent rounded-full animate-spin" />
          <span className="font-mono text-[9px] text-dim tracking-widest">LOADING METRICS…</span>
        </div>
      )}

      {error && (
        <div className="border border-red-500/20 bg-red-500/5 p-4 mb-8">
          <span className="font-mono text-[9px] text-red-400 tracking-widest">{error}</span>
        </div>
      )}

      {!loading && !error && stats && (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#0D0D0D] mb-10">
            <MetricCard
              label="TOTAL SDK CALLS"
              value={fmtNum(t!.calls)}
              sub="ALL TIME"
              accent
            />
            <MetricCard
              label="CONTRACT READS"
              value={fmtNum(t!.reads)}
              sub={`${t!.calls > 0 ? ((t!.reads / t!.calls) * 100).toFixed(0) : 0}% OF CALLS`}
            />
            <MetricCard
              label="CONTRACT WRITES"
              value={fmtNum(t!.writes)}
              sub={`${t!.calls > 0 ? ((t!.writes / t!.calls) * 100).toFixed(0) : 0}% OF CALLS`}
            />
            <MetricCard
              label="SUCCESS RATE"
              value={successRate(t!.calls, t!.errors)}
              sub={`${fmtNum(t!.errors)} ERRORS`}
            />
          </div>

          {/* 7-day chart */}
          <div className="mb-8 border border-[#111] bg-[#030303]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#0D0D0D]">
              <span className="font-mono text-[9px] text-dim tracking-widest">CALLS — LAST 7 DAYS</span>
              <span className="font-mono text-[9px] text-dim/50 tracking-widest">
                {t!.lastCallAt ? `LAST CALL ${fmtDate(t!.lastCallAt)}` : 'NO CALLS YET'}
              </span>
            </div>
            <div className="p-6">
              {stats.days.every(d => d.calls === 0) ? (
                <div className="text-center py-8">
                  <div className="font-mono text-[9px] text-dim tracking-widest mb-2">NO ACTIVITY YET</div>
                  <p className="font-body text-sm text-muted">
                    Start using the SDK to see your metrics here.
                  </p>
                  <Link
                    href="/dashboard/api-keys"
                    className="inline-block mt-4 font-mono text-[10px] tracking-widest text-accent hover:text-white transition-colors"
                  >
                    GET API KEY →
                  </Link>
                </div>
              ) : (
                <BarChart days={stats.days} />
              )}
            </div>
          </div>

          {/* Chain breakdown */}
          {topChains.length > 0 && (
            <div className="mb-8 border border-[#111] bg-[#030303]">
              <div className="px-6 py-4 border-b border-[#0D0D0D]">
                <span className="font-mono text-[9px] text-dim tracking-widest">TOP CHAINS</span>
              </div>
              <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {topChains.map(([chain, count]) => {
                  const pct = t!.calls > 0 ? (count / t!.calls) * 100 : 0
                  return (
                    <div key={chain} className="border border-[#0D0D0D] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display font-semibold text-white text-sm capitalize">
                          {chain}
                        </span>
                        <span className="font-mono text-[9px] text-accent/60 tracking-widest">
                          {fmtNum(count)}
                        </span>
                      </div>
                      <div className="h-1 bg-[#0D0D0D] rounded-none overflow-hidden">
                        <div
                          className="h-full bg-accent/40"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="font-mono text-[8px] text-dim mt-1.5">{pct.toFixed(1)}% OF CALLS</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Per-key breakdown */}
          {stats.keys.length > 0 && (
            <div className="mb-8 border border-[#111] bg-[#030303]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#0D0D0D]">
                <span className="font-mono text-[9px] text-dim tracking-widest">USAGE BY KEY</span>
                <Link
                  href="/dashboard/api-keys"
                  className="font-mono text-[9px] text-accent/60 hover:text-accent transition-colors tracking-widest"
                >
                  MANAGE KEYS →
                </Link>
              </div>
              <div className="divide-y divide-[#0A0A0A]">
                {stats.keys.map(k => (
                  <div key={k.keyId} className="px-6 py-4 flex items-center gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-semibold text-white text-sm mb-0.5">{k.keyName}</div>
                      <div className="font-mono text-[9px] text-dim tracking-widest">
                        {k.reads}R / {k.writes}W
                        {k.errors > 0 && (
                          <span className="text-red-400/60 ml-2">{k.errors} ERR</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-display font-bold text-white text-lg">{fmtNum(k.calls)}</div>
                      <div className="font-mono text-[8px] text-dim/50 tracking-widest">
                        {k.lastCallAt ? fmtDate(k.lastCallAt) : 'NEVER'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No keys yet */}
          {stats.keys.length === 0 && t!.calls === 0 && (
            <div className="border border-[#111] bg-[#030303] p-10 text-center">
              <div className="font-mono text-[9px] text-dim tracking-widest mb-3">NO SDK ACTIVITY</div>
              <p className="font-body text-sm text-muted mb-6 max-w-sm mx-auto">
                Generate an API key and initialise the SDK to start recording usage metrics here.
              </p>
              <Link
                href="/dashboard/api-keys"
                className="inline-block font-mono text-[10px] tracking-widest px-6 py-3 bg-accent text-black hover:bg-white transition-colors"
              >
                GET API KEY →
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}
