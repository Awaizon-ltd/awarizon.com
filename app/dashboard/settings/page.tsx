'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  onAuthStateChanged,
  signOut,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  type User,
} from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

type PwState  = 'idle' | 'saving' | 'saved' | 'error'
type DelState = 'idle' | 'confirm' | 'deleting'

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  // Password change
  const [currentPw, setCurrentPw] = useState('')
  const [newPw,     setNewPw]     = useState('')
  const [pwState,   setPwState]   = useState<PwState>('idle')
  const [pwError,   setPwError]   = useState('')

  // Delete account
  const [delState,  setDelState]  = useState<DelState>('idle')
  const [delPw,     setDelPw]     = useState('')
  const [delError,  setDelError]  = useState('')

  const isGoogle = user?.providerData[0]?.providerId === 'google.com'

  useEffect(() => {
    return onAuthStateChanged(auth, setUser)
  }, [])

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !user.email) return
    setPwState('saving')
    setPwError('')
    try {
      const cred = EmailAuthProvider.credential(user.email, currentPw)
      await reauthenticateWithCredential(user, cred)
      await updatePassword(user, newPw)
      setPwState('saved')
      setCurrentPw('')
      setNewPw('')
      setTimeout(() => setPwState('idle'), 2500)
    } catch (err: unknown) {
      setPwState('error')
      const code = (err as { code?: string }).code
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setPwError('Current password is incorrect.')
      } else if (code === 'auth/weak-password') {
        setPwError('New password must be at least 6 characters.')
      } else {
        setPwError('Failed to update password. Please try again.')
      }
    }
  }

  async function handleSignOut() {
    await signOut(auth)
    router.replace('/auth')
  }

  async function handleDeleteAccount() {
    if (!user) return
    setDelError('')
    setDelState('deleting')
    try {
      if (!isGoogle && user.email) {
        const cred = EmailAuthProvider.credential(user.email, delPw)
        await reauthenticateWithCredential(user, cred)
      }
      await deleteUser(user)
      router.replace('/')
    } catch (err: unknown) {
      setDelState('confirm')
      const code = (err as { code?: string }).code
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setDelError('Incorrect password.')
      } else {
        setDelError('Could not delete account. Please sign out and sign back in, then try again.')
      }
    }
  }

  return (
    <div className="p-6 lg:p-10 max-w-2xl">

      {/* Header */}
      <div className="mb-10">
        <span className="font-mono text-[9px] tracking-[0.3em] text-dim block mb-3">DASHBOARD // SETTINGS</span>
        <h1 className="font-display font-extrabold text-white leading-tight mb-2"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
          Settings
        </h1>
        <p className="font-body text-muted text-base">
          Manage your security preferences and account options.
        </p>
      </div>

      {/* Session */}
      <div className="mb-6 border border-[#111] bg-[#030303]">
        <div className="px-6 py-4 border-b border-[#0D0D0D]">
          <span className="font-mono text-[9px] text-dim tracking-widest">SESSION</span>
        </div>
        <div className="p-6 flex items-center justify-between gap-4">
          <div>
            <div className="font-display font-semibold text-white text-sm mb-1">Sign out of Awarizon</div>
            <div className="font-body text-xs text-muted">You will be redirected to the sign-in screen.</div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex-shrink-0 font-mono text-[10px] tracking-widest px-5 py-2.5 border border-[#2A2A2A] text-muted hover:border-accent/30 hover:text-white transition-colors"
          >
            SIGN OUT
          </button>
        </div>
      </div>

      {/* Change password — email users only */}
      {!isGoogle && (
        <div className="mb-6 border border-[#111] bg-[#030303]">
          <div className="px-6 py-4 border-b border-[#0D0D0D]">
            <span className="font-mono text-[9px] text-dim tracking-widest">CHANGE PASSWORD</span>
          </div>
          <form onSubmit={handlePasswordChange} className="p-6 space-y-4">
            <div>
              <label className="block font-mono text-[9px] tracking-widest text-dim mb-2">CURRENT PASSWORD</label>
              <input
                type="password"
                value={currentPw}
                onChange={e => setCurrentPw(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-black border border-[#1A1A1A] focus:border-accent text-white font-body text-sm px-4 py-3 outline-none placeholder:text-[#2A2A2A] transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[9px] tracking-widest text-dim mb-2">NEW PASSWORD</label>
              <input
                type="password"
                value={newPw}
                onChange={e => setNewPw(e.target.value)}
                required
                minLength={6}
                placeholder="Min. 6 characters"
                className="w-full bg-black border border-[#1A1A1A] focus:border-accent text-white font-body text-sm px-4 py-3 outline-none placeholder:text-[#2A2A2A] transition-colors"
              />
            </div>

            {pwError && (
              <div className="flex items-start gap-2 p-3 border border-red-500/20 bg-red-500/5">
                <span className="text-red-400 text-xs mt-0.5">✕</span>
                <p className="font-body text-sm text-red-400">{pwError}</p>
              </div>
            )}
            {pwState === 'saved' && (
              <div className="flex items-center gap-2 p-3 border border-accent/20 bg-accent/5">
                <span className="text-accent text-xs">✓</span>
                <p className="font-mono text-[10px] text-accent tracking-widest">PASSWORD UPDATED</p>
              </div>
            )}

            <button
              type="submit"
              disabled={pwState === 'saving' || !currentPw || !newPw}
              className="font-mono text-[10px] tracking-widest px-6 py-2.5 bg-accent text-black hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {pwState === 'saving' ? (
                <>
                  <span className="w-3 h-3 border border-black/40 border-t-black rounded-full animate-spin" />
                  UPDATING
                </>
              ) : 'UPDATE PASSWORD →'}
            </button>
          </form>
        </div>
      )}

      {isGoogle && (
        <div className="mb-6 p-4 border border-[#111] bg-[#030303]">
          <p className="font-mono text-[9px] text-dim tracking-widest">
            PASSWORD MANAGEMENT — Signed in with Google. Manage your password through your Google account.
          </p>
        </div>
      )}

      {/* Delete account — danger zone */}
      <div className="border border-red-500/20 bg-[#030303]">
        <div className="px-6 py-4 border-b border-red-500/10">
          <span className="font-mono text-[9px] text-red-400/70 tracking-widest">DANGER ZONE</span>
        </div>
        <div className="p-6">
          <div className="font-display font-semibold text-white text-sm mb-1">Delete Account</div>
          <p className="font-body text-xs text-muted mb-5 leading-relaxed">
            Permanently delete your Awarizon account and all associated data. This action cannot be undone.
          </p>

          {delState === 'idle' && (
            <button
              onClick={() => setDelState('confirm')}
              className="font-mono text-[10px] tracking-widest px-5 py-2.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              DELETE MY ACCOUNT
            </button>
          )}

          {delState === 'confirm' && (
            <div className="space-y-4">
              <div className="p-3 border border-red-500/20 bg-red-500/5">
                <p className="font-mono text-[9px] text-red-400 tracking-widest">
                  THIS ACTION IS PERMANENT AND CANNOT BE UNDONE.
                </p>
              </div>
              {!isGoogle && (
                <div>
                  <label className="block font-mono text-[9px] tracking-widest text-dim mb-2">
                    CONFIRM WITH YOUR PASSWORD
                  </label>
                  <input
                    type="password"
                    value={delPw}
                    onChange={e => setDelPw(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-black border border-red-500/20 focus:border-red-500/50 text-white font-body text-sm px-4 py-3 outline-none placeholder:text-[#2A2A2A] transition-colors"
                  />
                </div>
              )}
              {delError && (
                <p className="font-body text-sm text-red-400">{delError}</p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  disabled={!isGoogle && !delPw}
                  className="font-mono text-[10px] tracking-widest px-5 py-2.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors border border-red-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  CONFIRM DELETE
                </button>
                <button
                  onClick={() => { setDelState('idle'); setDelPw(''); setDelError('') }}
                  className="font-mono text-[10px] tracking-widest px-5 py-2.5 border border-[#2A2A2A] text-dim hover:text-white transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}

          {delState === 'deleting' && (
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 border border-red-400/40 border-t-red-400 rounded-full animate-spin" />
              <span className="font-mono text-[10px] text-red-400 tracking-widest">DELETING ACCOUNT…</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
