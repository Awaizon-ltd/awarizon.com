'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  AuthError,
} from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase/client'

type Mode  = 'signin' | 'signup'
type State = 'idle' | 'loading' | 'error'

function parseFirebaseError(err: AuthError): string {
  const map: Record<string, string> = {
    'auth/email-already-in-use':    'An account with this email already exists.',
    'auth/invalid-email':           'Please enter a valid email address.',
    'auth/weak-password':           'Password must be at least 6 characters.',
    'auth/user-not-found':          'No account found with this email.',
    'auth/wrong-password':          'Incorrect password. Please try again.',
    'auth/invalid-credential':      'Email or password is incorrect.',
    'auth/too-many-requests':       'Too many attempts. Please wait a moment.',
    'auth/popup-closed-by-user':    'Sign-in popup was closed.',
    'auth/network-request-failed':  'Network error. Check your connection.',
  }
  return map[err.code] ?? 'Something went wrong. Please try again.'
}

async function syncToFirestore(idToken: string) {
  const res = await fetch('/api/auth/sync', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ idToken }),
  })
  if (!res.ok) throw new Error('Failed to sync user data')
}

export default function AuthPage() {
  const router = useRouter()
  const [mode,     setMode]     = useState<Mode>('signin')
  const [state,    setState]    = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')

  function resetError() { setErrorMsg(''); setState('idle') }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    try {
      if (mode === 'signup') {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        if (name.trim()) {
          await updateProfile(cred.user, { displayName: name.trim() })
        }
        const token = await cred.user.getIdToken()
        await syncToFirestore(token)
      } else {
        const cred  = await signInWithEmailAndPassword(auth, email, password)
        const token = await cred.user.getIdToken()
        await syncToFirestore(token)
      }
      router.push('/dashboard')
    } catch (err) {
      setState('error')
      setErrorMsg(parseFirebaseError(err as AuthError))
    }
  }

  async function handleGoogle() {
    setState('loading')
    setErrorMsg('')
    try {
      const cred  = await signInWithPopup(auth, googleProvider)
      const token = await cred.user.getIdToken()
      await syncToFirestore(token)
      router.push('/dashboard')
    } catch (err) {
      setState('error')
      setErrorMsg(parseFirebaseError(err as AuthError))
    }
  }

  const loading = state === 'loading'

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg-static opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,229,0,0.05),transparent)]" />

      {/* Logo / back to site */}
      <a href="/" className="relative z-10 mb-10 flex items-center gap-2 group">
        <span className="w-1 h-5 bg-accent" />
        <span className="font-mono text-[11px] tracking-[0.3em] text-accent/70 group-hover:text-accent transition-colors">
          AWARIZON
        </span>
      </a>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md border border-[#1A1A1A] bg-black/90 backdrop-blur-sm">

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-accent/40" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-accent/20" />

        {/* Tabs */}
        <div className="flex border-b border-[#111]">
          {(['signin', 'signup'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); resetError() }}
              className={[
                'flex-1 py-4 font-mono text-[10px] tracking-[0.2em] transition-all border-b-2',
                mode === m
                  ? 'text-accent border-accent bg-accent/5'
                  : 'text-dim border-transparent hover:text-muted hover:border-[#2A2A2A]',
              ].join(' ')}
            >
              {m === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>
          ))}
        </div>

        <div className="p-8">
          <h1 className="font-display font-bold text-2xl text-white mb-1">
            {mode === 'signin' ? 'Welcome back' : 'Join Awarizon'}
          </h1>
          <p className="font-body text-sm text-muted mb-8">
            {mode === 'signin'
              ? 'Sign in to access your on-chain dashboard.'
              : 'Create your account to get started with Web3 infrastructure.'}
          </p>

          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-[#222] hover:border-accent/30 bg-[#050505] hover:bg-[#0A0A0A] text-white font-mono text-[11px] tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed mb-6"
          >
            {/* Google SVG */}
            <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            CONTINUE WITH GOOGLE
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#111]" />
            <span className="font-mono text-[9px] text-dim tracking-widest">OR</span>
            <div className="flex-1 h-px bg-[#111]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block font-mono text-[9px] tracking-widest text-dim mb-1.5">
                  DISPLAY NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-[#050505] border border-[#1A1A1A] focus:border-accent text-white font-body text-sm px-4 py-3 outline-none placeholder:text-[#2A2A2A] transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block font-mono text-[9px] tracking-widest text-dim mb-1.5">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-[#050505] border border-[#1A1A1A] focus:border-accent text-white font-body text-sm px-4 py-3 outline-none placeholder:text-[#2A2A2A] transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] tracking-widest text-dim mb-1.5">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={mode === 'signup' ? 'Min. 6 characters' : '••••••••'}
                required
                minLength={6}
                className="w-full bg-[#050505] border border-[#1A1A1A] focus:border-accent text-white font-body text-sm px-4 py-3 outline-none placeholder:text-[#2A2A2A] transition-colors"
              />
            </div>

            {/* Error */}
            {errorMsg && (
              <div className="flex items-start gap-2 p-3 border border-red-500/20 bg-red-500/5">
                <span className="text-red-400 text-xs mt-0.5 flex-shrink-0">✕</span>
                <p className="font-body text-sm text-red-400">{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-accent text-black font-mono text-[11px] tracking-[0.2em] font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-3 h-3 border border-black/40 border-t-black rounded-full animate-spin" />
                  PROCESSING
                </>
              ) : (
                mode === 'signin' ? 'SIGN IN →' : 'CREATE ACCOUNT →'
              )}
            </button>
          </form>

          {/* Forgot password (sign in only) */}
          {mode === 'signin' && (
            <p className="text-center mt-4 font-mono text-[9px] text-dim">
              <a href="/auth/reset" className="hover:text-accent transition-colors tracking-widest">
                FORGOT PASSWORD?
              </a>
            </p>
          )}

          {/* Switch mode */}
          <p className="text-center mt-6 font-body text-sm text-muted">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); resetError() }}
              className="text-accent hover:text-white transition-colors font-semibold"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Footer notice */}
        <div className="px-8 pb-6 border-t border-[#0D0D0D] pt-4">
          <p className="font-mono text-[8px] text-dim/50 text-center tracking-wide leading-relaxed">
            BY CONTINUING YOU AGREE TO AWARIZON'S TERMS OF SERVICE AND PRIVACY POLICY.
            YOUR DATA IS STORED SECURELY AND NEVER SHARED.
          </p>
        </div>
      </div>

      {/* System tag */}
      <p className="relative z-10 mt-8 font-mono text-[9px] text-dim/40 tracking-[0.3em]">
        AUTH_LAYER // SECURE · ON-CHAIN READY
      </p>
    </div>
  )
}
