'use client'

import { useEffect, useState, useCallback } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

interface ApiKey {
  id:        string
  name:      string
  prefix:    string
  status:    'active' | 'revoked'
  createdAt: string | null
}

interface NewKey {
  id:     string
  key:    string
  name:   string
  prefix: string
}

type CreateState = 'idle' | 'creating' | 'error'
type TestState   = 'idle' | 'testing'  | 'success' | 'error'

function maskKey(prefix: string) {
  return prefix + '••••••••••••••••••••••••'
}

function fmtDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="font-mono text-[9px] tracking-widest px-3 py-1.5 border border-[#1A1A1A] text-dim hover:border-accent/40 hover:text-accent transition-colors"
    >
      {copied ? 'COPIED ✓' : 'COPY'}
    </button>
  )
}

export default function ApiKeysPage() {
  const [user,        setUser]        = useState<User | null>(null)
  const [keys,        setKeys]        = useState<ApiKey[]>([])
  const [loading,     setLoading]     = useState(true)
  const [newKeyName,  setNewKeyName]  = useState('')
  const [createState, setCreateState] = useState<CreateState>('idle')
  const [createError, setCreateError] = useState('')
  const [freshKey,    setFreshKey]    = useState<NewKey | null>(null)
  const [revoking,    setRevoking]    = useState<string | null>(null)
  const [testState,   setTestState]   = useState<TestState>('idle')
  const [testResult,  setTestResult]  = useState('')
  const [testKey,     setTestKey]     = useState('')

  async function getToken(u: User) {
    return u.getIdToken()
  }

  const fetchKeys = useCallback(async (u: User) => {
    const token = await getToken(u)
    const res   = await fetch('/api/keys', { headers: { 'x-id-token': token } })
    const data  = await res.json() as { keys: ApiKey[] }
    setKeys(data.keys ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      if (u) fetchKeys(u)
    })
  }, [fetchKeys])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !newKeyName.trim()) return
    setCreateState('creating')
    setCreateError('')
    try {
      const token = await getToken(user)
      const res   = await fetch('/api/keys', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'x-id-token': token },
        body:    JSON.stringify({ name: newKeyName.trim() }),
      })
      const data = await res.json() as NewKey & { error?: string }
      if (!res.ok) throw new Error(data.error ?? 'Failed')
      setFreshKey(data)
      setNewKeyName('')
      setCreateState('idle')
      await fetchKeys(user)
    } catch (err: unknown) {
      setCreateState('error')
      setCreateError(err instanceof Error ? err.message : 'Failed to generate key.')
    }
  }

  async function handleRevoke(keyId: string) {
    if (!user) return
    setRevoking(keyId)
    try {
      const token = await getToken(user)
      await fetch('/api/keys', {
        method:  'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-id-token': token },
        body:    JSON.stringify({ keyId }),
      })
      await fetchKeys(user)
    } finally {
      setRevoking(null)
    }
  }

  async function handleTest(e: React.FormEvent) {
    e.preventDefault()
    if (!testKey.trim()) return
    setTestState('testing')
    setTestResult('')
    try {
      const res  = await fetch('/api/v1/test', {
        headers: { 'Authorization': `Bearer ${testKey.trim()}` },
      })
      const data = await res.json() as { message?: string; error?: string }
      if (res.ok) {
        setTestState('success')
        setTestResult(data.message ?? 'Connection successful.')
      } else {
        setTestState('error')
        setTestResult(data.error ?? 'Invalid key.')
      }
    } catch {
      setTestState('error')
      setTestResult('Network error. Please try again.')
    }
  }

  const activeKeys  = keys.filter(k => k.status === 'active')
  const revokedKeys = keys.filter(k => k.status === 'revoked')

  return (
    <div className="p-6 lg:p-10 max-w-4xl">

      {/* Header */}
      <div className="mb-10">
        <span className="font-mono text-[9px] tracking-[0.3em] text-dim block mb-3">
          DASHBOARD // API_KEYS
        </span>
        <h1 className="font-display font-extrabold text-white leading-tight mb-2"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
          API Keys
        </h1>
        <p className="font-body text-muted text-base">
          Generate keys to authenticate requests to the Awarizon API. Keep them secret — treat them like passwords.
        </p>
      </div>

      {/* Fresh key reveal — shown once after creation */}
      {freshKey && (
        <div className="mb-8 border border-accent/30 bg-accent/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] text-accent tracking-widest">
              NEW KEY GENERATED — SAVE IT NOW
            </span>
          </div>
          <p className="font-body text-sm text-muted mb-4">
            This is the only time the full key will be shown. Copy it somewhere safe before closing.
          </p>
          <div className="flex items-center gap-3 bg-black border border-[#1A1A1A] px-4 py-3 mb-4">
            <code className="font-mono text-sm text-accent flex-1 break-all">
              {freshKey.key}
            </code>
            <CopyButton text={freshKey.key} />
          </div>
          <button
            onClick={() => setFreshKey(null)}
            className="font-mono text-[9px] tracking-widest text-dim hover:text-white transition-colors"
          >
            I HAVE SAVED MY KEY — DISMISS ×
          </button>
        </div>
      )}

      {/* Generate key form */}
      <div className="mb-8 border border-[#111] bg-[#030303]">
        <div className="px-6 py-4 border-b border-[#0D0D0D]">
          <span className="font-mono text-[9px] text-dim tracking-widest">GENERATE NEW KEY</span>
        </div>
        <form onSubmit={handleCreate} className="p-6">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block font-mono text-[9px] tracking-widest text-dim mb-2">
                KEY NAME / LABEL
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={e => setNewKeyName(e.target.value)}
                placeholder="e.g. Production, Mobile App, Testing"
                maxLength={64}
                className="w-full bg-black border border-[#1A1A1A] focus:border-accent text-white font-body text-sm px-4 py-3 outline-none placeholder:text-[#2A2A2A] transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={createState === 'creating' || !newKeyName.trim()}
              className="flex-shrink-0 font-mono text-[10px] tracking-widest px-6 py-3 bg-accent text-black hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {createState === 'creating' ? (
                <>
                  <span className="w-3 h-3 border border-black/40 border-t-black rounded-full animate-spin" />
                  GENERATING
                </>
              ) : 'GENERATE KEY →'}
            </button>
          </div>
          {createState === 'error' && (
            <p className="font-mono text-[9px] text-red-400 mt-3">{createError}</p>
          )}
        </form>
      </div>

      {/* Active keys list */}
      <div className="mb-8 border border-[#111] bg-[#030303]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#0D0D0D]">
          <span className="font-mono text-[9px] text-dim tracking-widest">ACTIVE KEYS</span>
          <span className="font-mono text-[9px] text-accent/60 tracking-widest">
            {activeKeys.length} KEY{activeKeys.length !== 1 ? 'S' : ''}
          </span>
        </div>

        {loading ? (
          <div className="px-6 py-8 flex items-center gap-3">
            <span className="w-4 h-4 border border-accent/30 border-t-accent rounded-full animate-spin" />
            <span className="font-mono text-[9px] text-dim tracking-widest">LOADING KEYS…</span>
          </div>
        ) : activeKeys.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <div className="font-mono text-[9px] text-dim tracking-widest mb-2">NO ACTIVE KEYS</div>
            <p className="font-body text-sm text-muted">Generate your first API key above.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#0A0A0A]">
            {activeKeys.map(k => (
              <div key={k.id} className="px-6 py-4 flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-display font-semibold text-white text-sm">{k.name}</span>
                    <span className="font-mono text-[8px] px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 tracking-widest">
                      ACTIVE
                    </span>
                  </div>
                  <code className="font-mono text-xs text-muted">
                    {maskKey(k.prefix)}
                  </code>
                  <div className="font-mono text-[9px] text-dim mt-1">
                    Created {fmtDate(k.createdAt)}
                  </div>
                </div>
                <button
                  onClick={() => handleRevoke(k.id)}
                  disabled={revoking === k.id}
                  className="flex-shrink-0 font-mono text-[9px] tracking-widest px-4 py-2 border border-red-500/20 text-red-400/70 hover:border-red-500/50 hover:text-red-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {revoking === k.id ? (
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 border border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                      REVOKING
                    </span>
                  ) : 'REVOKE'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Test connection */}
      <div className="mb-8 border border-[#111] bg-[#030303]">
        <div className="px-6 py-4 border-b border-[#0D0D0D]">
          <span className="font-mono text-[9px] text-dim tracking-widest">TEST CONNECTION</span>
        </div>
        <div className="p-6">
          <p className="font-body text-sm text-muted mb-5">
            Paste any active key below to verify it authenticates correctly against the Awarizon API.
          </p>
          <form onSubmit={handleTest} className="flex gap-3 items-end mb-4">
            <div className="flex-1">
              <label className="block font-mono text-[9px] tracking-widest text-dim mb-2">
                API KEY
              </label>
              <input
                type="text"
                value={testKey}
                onChange={e => setTestKey(e.target.value)}
                placeholder="awz_live_…"
                className="w-full bg-black border border-[#1A1A1A] focus:border-accent text-white font-mono text-xs px-4 py-3 outline-none placeholder:text-[#2A2A2A] transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={testState === 'testing' || !testKey.trim()}
              className="flex-shrink-0 font-mono text-[10px] tracking-widest px-6 py-3 border border-[#1A1A1A] text-muted hover:border-accent/40 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {testState === 'testing' ? (
                <>
                  <span className="w-3 h-3 border border-white/20 border-t-white rounded-full animate-spin" />
                  TESTING
                </>
              ) : 'TEST →'}
            </button>
          </form>

          {testState === 'success' && (
            <div className="flex items-center gap-3 p-3 border border-accent/20 bg-accent/5">
              <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
              <span className="font-mono text-[10px] text-accent tracking-widest">{testResult}</span>
            </div>
          )}
          {testState === 'error' && (
            <div className="flex items-center gap-3 p-3 border border-red-500/20 bg-red-500/5">
              <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
              <span className="font-mono text-[10px] text-red-400 tracking-widest">{testResult}</span>
            </div>
          )}

          {/* Code sample */}
          <div className="mt-6">
            <div className="font-mono text-[8px] text-dim tracking-widest mb-2">USAGE EXAMPLE</div>
            <div className="bg-black border border-[#0D0D0D] p-4 overflow-x-auto">
              <pre className="font-mono text-[11px] text-muted leading-relaxed whitespace-pre">{`curl https://awarizon.com/api/v1/test \\
  -H "Authorization: Bearer awz_live_YOUR_KEY"`}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Revoked keys (collapsed) */}
      {revokedKeys.length > 0 && (
        <div className="border border-[#0D0D0D] bg-[#020202]">
          <div className="px-6 py-4 border-b border-[#0D0D0D]">
            <span className="font-mono text-[9px] text-dim/50 tracking-widest">
              REVOKED KEYS ({revokedKeys.length})
            </span>
          </div>
          <div className="divide-y divide-[#080808]">
            {revokedKeys.map(k => (
              <div key={k.id} className="px-6 py-3 flex items-center gap-4 opacity-40">
                <div className="flex-1 min-w-0">
                  <span className="font-display text-sm text-muted">{k.name}</span>
                  <code className="font-mono text-xs text-dim block mt-0.5">
                    {maskKey(k.prefix)}
                  </code>
                </div>
                <span className="font-mono text-[8px] px-2 py-0.5 border border-[#1A1A1A] text-dim tracking-widest flex-shrink-0">
                  REVOKED
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
