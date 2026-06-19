'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { onAuthStateChanged, updateProfile, type User } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

export default function ProfilePage() {
  const [user,        setUser]        = useState<User | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [saveState,   setSaveState]   = useState<SaveState>('idle')
  const [errorMsg,    setErrorMsg]    = useState('')

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setDisplayName(u?.displayName ?? '')
    })
  }, [])

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    if (!user) return
    setSaveState('saving')
    setErrorMsg('')
    try {
      await updateProfile(user, { displayName: displayName.trim() || null })
      // Sync updated name to Firestore via Admin route
      const token = await user.getIdToken(true)
      await fetch('/api/auth/sync', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ idToken: token }),
      })
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 2500)
    } catch {
      setSaveState('error')
      setErrorMsg('Failed to update profile. Please try again.')
    }
  }

  const provider = user?.providerData[0]?.providerId === 'google.com' ? 'Google' : 'Email / Password'
  const joined   = user?.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—'

  return (
    <div className="p-6 lg:p-10 max-w-2xl">

      {/* Header */}
      <div className="mb-10">
        <span className="font-mono text-[9px] tracking-[0.3em] text-dim block mb-3">DASHBOARD // PROFILE</span>
        <h1 className="font-display font-extrabold text-white leading-tight mb-2"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
          Your Profile
        </h1>
        <p className="font-body text-muted text-base">
          Manage your account details and display name.
        </p>
      </div>

      {/* Initials avatar */}
      <div className="flex items-center gap-5 mb-10 p-6 border border-[#111] bg-[#030303]">
        <div className="w-16 h-16 flex items-center justify-center bg-accent text-black font-mono text-2xl font-bold flex-shrink-0">
          {(displayName || user?.email || '?').slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div className="font-display font-semibold text-white text-lg">
            {displayName || user?.email?.split('@')[0] || 'User'}
          </div>
          <div className="font-mono text-[10px] text-dim tracking-widest mt-1">{user?.email}</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[8px] text-accent/60 tracking-widest">ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Edit form */}
      <form onSubmit={handleSave} className="mb-10">
        <div className="border border-[#111] bg-[#030303]">
          <div className="px-6 py-4 border-b border-[#0D0D0D]">
            <span className="font-mono text-[9px] text-dim tracking-widest">EDIT DETAILS</span>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className="block font-mono text-[9px] tracking-widest text-dim mb-2">
                DISPLAY NAME
              </label>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-black border border-[#1A1A1A] focus:border-accent text-white font-body text-sm px-4 py-3 outline-none placeholder:text-[#2A2A2A] transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] tracking-widest text-dim mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={user?.email ?? ''}
                disabled
                className="w-full bg-[#050505] border border-[#0D0D0D] text-dim font-body text-sm px-4 py-3 outline-none cursor-not-allowed"
              />
              <p className="font-mono text-[8px] text-dim/50 mt-1.5 tracking-wide">
                Email cannot be changed here.
              </p>
            </div>

            {errorMsg && (
              <div className="flex items-start gap-2 p-3 border border-red-500/20 bg-red-500/5">
                <span className="text-red-400 text-xs mt-0.5">✕</span>
                <p className="font-body text-sm text-red-400">{errorMsg}</p>
              </div>
            )}

            {saveState === 'saved' && (
              <div className="flex items-center gap-2 p-3 border border-accent/20 bg-accent/5">
                <span className="text-accent text-xs">✓</span>
                <p className="font-mono text-[10px] text-accent tracking-widest">PROFILE UPDATED</p>
              </div>
            )}

            <button
              type="submit"
              disabled={saveState === 'saving'}
              className="font-mono text-[11px] tracking-widest px-6 py-3 bg-accent text-black hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saveState === 'saving' ? (
                <>
                  <span className="w-3 h-3 border border-black/40 border-t-black rounded-full animate-spin" />
                  SAVING
                </>
              ) : 'SAVE CHANGES →'}
            </button>
          </div>
        </div>
      </form>

      {/* Read-only info */}
      <div className="border border-[#111] bg-[#030303]">
        <div className="px-6 py-4 border-b border-[#0D0D0D]">
          <span className="font-mono text-[9px] text-dim tracking-widest">ACCOUNT INFO</span>
        </div>
        <div className="divide-y divide-[#0A0A0A]">
          {[
            { label: 'User ID',       value: user?.uid ?? '—'  },
            { label: 'Sign-in Method',value: provider           },
            { label: 'Member Since',  value: joined             },
            { label: 'Email Verified',value: user?.emailVerified ? 'Yes' : 'No' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between px-6 py-3">
              <span className="font-mono text-[10px] text-dim tracking-widest">{label.toUpperCase()}</span>
              <span className="font-body text-sm text-muted text-right max-w-[55%] truncate">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
