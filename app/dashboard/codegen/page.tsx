'use client'

import { useEffect, useRef, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

type OutputLang = 'ts' | 'js'
type Status     = 'idle' | 'generating' | 'success' | 'error'
type OutputTab  = 'client' | 'hooks'

interface CodeResult {
  client:       string
  hooks:        string
  contractName: string
}

// ─── Copy button ──────────────────────────────────────────────────────────────

function CopyButton({ text, label = 'COPY' }: { text: string; label?: string }) {
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
      {copied ? 'COPIED ✓' : label}
    </button>
  )
}

// ─── Download button ──────────────────────────────────────────────────────────

function DownloadButton({ content, filename }: { content: string; filename: string }) {
  function download() {
    const blob = new Blob([content], { type: 'text/plain' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }
  return (
    <button
      onClick={download}
      className="font-mono text-[9px] tracking-widest px-3 py-1.5 border border-[#1A1A1A] text-dim hover:border-accent/40 hover:text-accent transition-colors"
    >
      DOWNLOAD
    </button>
  )
}

// ─── Language toggle ──────────────────────────────────────────────────────────

function LangToggle({ lang, onChange }: { lang: OutputLang; onChange: (l: OutputLang) => void }) {
  return (
    <div className="flex items-center gap-0">
      {(['ts', 'js'] as const).map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={[
            'font-mono text-[10px] tracking-widest px-5 py-2.5 border transition-colors',
            lang === opt
              ? 'bg-accent text-black border-accent'
              : 'bg-black text-dim border-[#1A1A1A] hover:border-accent/30 hover:text-muted',
          ].join(' ')}
        >
          {opt === 'ts' ? 'TYPESCRIPT' : 'JAVASCRIPT'}
        </button>
      ))}
    </div>
  )
}

// ─── Code output panel ────────────────────────────────────────────────────────

function CodePanel({
  code,
  filename,
}: {
  code:     string
  filename: string
}) {
  return (
    <div className="bg-black border border-[#0D0D0D]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#0D0D0D]">
        <code className="font-mono text-[9px] text-dim tracking-wide">{filename}</code>
        <div className="flex items-center gap-2">
          <CopyButton text={code} />
          <DownloadButton content={code} filename={filename} />
        </div>
      </div>
      <div className="overflow-auto max-h-[500px]">
        <pre className="font-mono text-[11px] text-muted leading-relaxed p-4 whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CodeGenPage() {
  const [user,       setUser]       = useState<User | null>(null)
  const [name,       setName]       = useState('')
  const [address,    setAddress]    = useState('')
  const [abiText,    setAbiText]    = useState('')
  const [lang,       setLang]       = useState<OutputLang>('ts')
  const [status,     setStatus]     = useState<Status>('idle')
  const [error,      setError]      = useState('')
  const [result,     setResult]     = useState<CodeResult | null>(null)
  const [activeTab,  setActiveTab]  = useState<OutputTab>('client')
  const [dragActive, setDragActive] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return onAuthStateChanged(auth, setUser)
  }, [])

  // ── Drag-and-drop ABI file ────────────────────────────────────────────────

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setDragActive(true)
  }
  function handleDragLeave() {
    setDragActive(false)
  }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      setAbiText(text)
    }
    reader.readAsText(file)
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return

    setError('')
    setStatus('generating')

    // Parse and normalise ABI from textarea
    let parsedAbi: unknown
    try {
      parsedAbi = JSON.parse(abiText.trim())
    } catch {
      setStatus('error')
      setError('ABI is not valid JSON. Paste a JSON array or a JSON object with an "abi" field.')
      return
    }

    // Accept both raw array and Hardhat/Foundry artifact format
    const abi = Array.isArray(parsedAbi)
      ? parsedAbi
      : typeof parsedAbi === 'object' && parsedAbi !== null && Array.isArray((parsedAbi as Record<string, unknown>).abi)
        ? (parsedAbi as { abi: unknown[] }).abi
        : null

    if (!abi) {
      setStatus('error')
      setError('ABI must be a JSON array or an object with an "abi" array (e.g. Hardhat artifact).')
      return
    }

    try {
      const token = await user.getIdToken()
      const res   = await fetch('/api/codegen', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'x-id-token': token },
        body:    JSON.stringify({ name: name.trim(), address: address.trim(), abi, lang }),
      })
      const data = await res.json() as CodeResult & { error?: string }
      if (!res.ok) throw new Error(data.error ?? 'Generation failed')
      setResult(data)
      setStatus('success')
      setActiveTab('client')
    } catch (err: unknown) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Code generation failed. Please try again.')
    }
  }

  const canSubmit = status !== 'generating' && name.trim() && address.trim() && abiText.trim()
  const ext       = lang === 'ts' ? 'ts' : 'js'
  const clientFile = result ? `${result.contractName}Client.${ext}` : `Contract.${ext}`
  const hooksFile  = result ? `use${result.contractName}.${ext}` : `useContract.${ext}`

  return (
    <div className="p-6 lg:p-10 max-w-4xl">

      {/* Header */}
      <div className="mb-10">
        <span className="font-mono text-[9px] tracking-[0.3em] text-dim block mb-3">
          DASHBOARD // CODE_GEN
        </span>
        <h1
          className="font-display font-extrabold text-white leading-tight mb-2"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
        >
          Code Generator
        </h1>
        <p className="font-body text-muted text-base max-w-xl">
          Paste any contract ABI and instantly generate a fully typed client class and
          React hooks ready for your project.
        </p>
      </div>

      {/* ── Input form ── */}
      <form onSubmit={handleGenerate} className="space-y-0 mb-8">

        <div className="border border-[#111] bg-[#030303]">

          {/* Section header */}
          <div className="px-6 py-4 border-b border-[#0D0D0D]">
            <span className="font-mono text-[9px] text-dim tracking-widest">CONTRACT DETAILS</span>
          </div>

          <div className="p-6 space-y-5">

            {/* Name + Address row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[9px] tracking-widest text-dim mb-2">
                  CONTRACT NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. StakingPool, ERC20Token"
                  maxLength={64}
                  required
                  className="w-full bg-black border border-[#1A1A1A] focus:border-accent text-white font-body text-sm px-4 py-3 outline-none placeholder:text-[#2A2A2A] transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-[9px] tracking-widest text-dim mb-2">
                  CONTRACT ADDRESS
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="0x..."
                  maxLength={42}
                  required
                  className="w-full bg-black border border-[#1A1A1A] focus:border-accent text-white font-mono text-xs px-4 py-3 outline-none placeholder:text-[#2A2A2A] transition-colors"
                />
              </div>
            </div>

            {/* Language selector */}
            <div>
              <label className="block font-mono text-[9px] tracking-widest text-dim mb-2">
                OUTPUT LANGUAGE
              </label>
              <LangToggle lang={lang} onChange={setLang} />
            </div>

            {/* ABI textarea with drag-drop */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[9px] tracking-widest text-dim">
                  ABI  <span className="text-dim/40">(JSON array or Hardhat/Foundry artifact)</span>
                </label>
                {abiText && (
                  <button
                    type="button"
                    onClick={() => setAbiText('')}
                    className="font-mono text-[8px] text-dim/50 hover:text-dim tracking-widest transition-colors"
                  >
                    CLEAR ×
                  </button>
                )}
              </div>
              <div
                ref={dropRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={[
                  'relative transition-colors',
                  dragActive ? 'border border-accent/50 bg-accent/5' : '',
                ].join(' ')}
              >
                <textarea
                  value={abiText}
                  onChange={e => setAbiText(e.target.value)}
                  placeholder={'[\n  { "type": "function", "name": "balanceOf", ... }\n]'}
                  rows={10}
                  required
                  className="w-full bg-black border border-[#1A1A1A] focus:border-accent text-muted font-mono text-[11px] px-4 py-3 outline-none placeholder:text-[#1A1A1A] transition-colors resize-y leading-relaxed"
                  style={{ minHeight: 180 }}
                />
                {dragActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 pointer-events-none">
                    <span className="font-mono text-[10px] text-accent tracking-widest">
                      DROP JSON FILE
                    </span>
                  </div>
                )}
              </div>
              <p className="font-mono text-[8px] text-dim/40 tracking-widest mt-1.5">
                DRAG & DROP a .json ABI file, or paste JSON directly above
              </p>
            </div>

            {/* Error */}
            {status === 'error' && (
              <div className="flex items-start gap-3 p-3 border border-red-500/20 bg-red-500/5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1" />
                <span className="font-mono text-[10px] text-red-400 tracking-wide">{error}</span>
              </div>
            )}

          </div>

          {/* Submit */}
          <div className="px-6 py-4 border-t border-[#0D0D0D] flex items-center gap-4">
            <button
              type="submit"
              disabled={!canSubmit}
              className="font-mono text-[10px] tracking-widest px-8 py-3 bg-accent text-black hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {status === 'generating' ? (
                <>
                  <span className="w-3 h-3 border border-black/40 border-t-black rounded-full animate-spin" />
                  GENERATING…
                </>
              ) : 'GENERATE CODE →'}
            </button>
            {status === 'success' && (
              <span className="font-mono text-[9px] text-accent/60 tracking-widest">
                ✓ GENERATED SUCCESSFULLY
              </span>
            )}
          </div>
        </div>
      </form>

      {/* ── Output ── */}
      {result && status === 'success' && (
        <div className="border border-[#111] bg-[#030303]">

          {/* Tabs */}
          <div className="flex items-center border-b border-[#0D0D0D]">
            {([
              { key: 'client', label: 'CONTRACT CLIENT', file: clientFile },
              { key: 'hooks',  label: 'REACT HOOKS',     file: hooksFile  },
            ] as const).map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={[
                  'flex items-center gap-2 px-6 py-4 border-r border-[#0D0D0D] transition-colors',
                  activeTab === tab.key
                    ? 'border-b-2 border-b-accent bg-accent/5 text-white'
                    : 'text-dim hover:text-muted hover:bg-[#050505]',
                ].join(' ')}
              >
                <span className="font-mono text-[9px] tracking-widest">{tab.label}</span>
                <code className="font-mono text-[8px] text-dim/50 hidden sm:block">{tab.file}</code>
              </button>
            ))}
          </div>

          {/* Code panel */}
          <div className="p-5">
            {activeTab === 'client' && (
              <CodePanel code={result.client} filename={clientFile} />
            )}
            {activeTab === 'hooks' && (
              <CodePanel code={result.hooks} filename={hooksFile} />
            )}
          </div>

          {/* Usage hint */}
          <div className="px-5 pb-5">
            <div className="bg-black border border-[#0D0D0D] p-4">
              <div className="font-mono text-[8px] text-dim tracking-widest mb-2">QUICK START</div>
              <pre className="font-mono text-[11px] text-muted leading-relaxed whitespace-pre">{
lang === 'ts'
? `import { AwarizonWeb3 } from "@awarizon/web3"
import { ${result.contractName}Client } from "./${result.contractName}Client"

const awarizon = new AwarizonWeb3({ chain: "base", apiKey: "awz_live_..." })
const contract = await ${result.contractName}Client.create(awarizon)`
: `import { AwarizonWeb3 } from "@awarizon/web3"
import { ${result.contractName}Client } from "./${result.contractName}Client"

const awarizon = new AwarizonWeb3({ chain: "base", apiKey: "awz_live_..." })
const contract = await ${result.contractName}Client.create(awarizon)`
              }</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
