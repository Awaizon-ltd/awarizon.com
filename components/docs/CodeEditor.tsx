'use client'

import { useState } from 'react'
import { useLang } from './LangContext'

// VS Code Dark+ colour palette
const C = {
  comment:  '#6A9955',
  string:   '#CE9178',
  keyword:  '#C586C0',
  type:     '#4EC9B0',
  number:   '#B5CEA8',
  func:     '#DCDCAA',
  variable: '#9CDCFE',
  op:       '#D4D4D4',
  text:     '#D4D4D4',
}

const KEYWORDS = new Set([
  'import','export','from','const','let','var','async','await',
  'return','new','class','interface','extends','function','if','else',
  'for','of','in','true','false','null','undefined','default','as',
  'try','catch','throw','static','typeof','type','void','this','super',
])

const TYPES = new Set([
  'string','number','boolean','bigint','Promise','Array','Record',
  'unknown','never','any','Error','React','ReactNode','HTMLElement',
  'TransactionResult','TransactionReceipt','ContractInstance','EventLog',
  'SupportedChain','AwarizonConfig',
])

type TT = 'comment'|'string'|'keyword'|'type'|'number'|'func'|'text'|'op'

interface Tok { t: TT; v: string }

function tokenize(code: string): Tok[] {
  const out: Tok[] = []
  let i = 0

  while (i < code.length) {
    // Line comment
    if (code[i] === '/' && code[i + 1] === '/') {
      const nl = code.indexOf('\n', i)
      const v = nl === -1 ? code.slice(i) : code.slice(i, nl)
      out.push({ t: 'comment', v }); i += v.length; continue
    }
    // Template literal
    if (code[i] === '`') {
      let j = i + 1
      while (j < code.length && code[j] !== '`') { if (code[j] === '\\') j++; j++ }
      out.push({ t: 'string', v: code.slice(i, j + 1) }); i = j + 1; continue
    }
    // Quoted string
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i]; let j = i + 1
      while (j < code.length && code[j] !== q && code[j] !== '\n') { if (code[j] === '\\') j++; j++ }
      out.push({ t: 'string', v: code.slice(i, j + 1) }); i = j + 1; continue
    }
    // Hex number
    if (code[i] === '0' && code[i + 1] === 'x') {
      let j = i + 2
      while (j < code.length && /[0-9a-fA-F]/.test(code[j])) j++
      out.push({ t: 'number', v: code.slice(i, j) }); i = j; continue
    }
    // Decimal / bigint
    if (/\d/.test(code[i])) {
      let j = i
      while (j < code.length && /[\d_]/.test(code[j])) j++
      if (code[j] === 'n') j++
      out.push({ t: 'number', v: code.slice(i, j) }); i = j; continue
    }
    // Identifier
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++
      const w = code.slice(i, j)
      // Peek past spaces to check for '('
      let k = j; while (k < code.length && code[k] === ' ') k++
      const tt: TT = KEYWORDS.has(w) ? 'keyword' : TYPES.has(w) ? 'type' : code[k] === '(' ? 'func' : 'text'
      out.push({ t: tt, v: w }); i = j; continue
    }
    // Operator / punctuation / whitespace
    out.push({ t: 'op', v: code[i] }); i++
  }
  return out
}

// ─── CodeEditor ───────────────────────────────────────────────────────────────

interface CodeEditorProps {
  code:      string
  lang?:     string
  filename?: string
}

export function CodeEditor({ code, lang = 'ts', filename }: CodeEditorProps) {
  const [copied, setCopied] = useState(false)
  const tokens = tokenize(code)

  function copy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-5 overflow-hidden" style={{ border: '1px solid #2D2D2D', borderRadius: 0 }}>
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ background: '#252526', borderBottom: '1px solid #2D2D2D' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: '#FF5F57' }} />
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: '#FFBD2E' }} />
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: '#28CA41' }} />
          </div>
          <span className="font-mono text-[11px] tracking-wide" style={{ color: '#9D9D9D' }}>
            {filename ?? lang.toUpperCase()}
          </span>
        </div>
        <button
          onClick={copy}
          className="font-mono text-[10px] tracking-widest px-3 py-1 transition-colors"
          style={{
            border: `1px solid ${copied ? '#28CA41' : '#3D3D3D'}`,
            color:  copied ? '#28CA41' : '#9D9D9D',
            background: 'transparent',
          }}
        >
          {copied ? '✓ COPIED' : 'COPY'}
        </button>
      </div>
      {/* Code body */}
      <div className="overflow-x-auto" style={{ background: '#1E1E1E' }}>
        <pre className="font-mono text-[13px] leading-[1.75] p-5 whitespace-pre">
          {tokens.map((tok, idx) => (
            <span key={idx} style={{ color: C[tok.t] ?? C.text }}>
              {tok.v}
            </span>
          ))}
        </pre>
      </div>
    </div>
  )
}

// ─── CodeTabs ─────────────────────────────────────────────────────────────────

interface CodeTabsProps {
  ts:        string
  js:        string
  filename?: string
}

function toJsFilename(filename: string): string {
  return filename.replace(/\.(tsx?)(\b|(?=\s))/, (_, ext) => ext === 'tsx' ? '.jsx' : '.js')
}

export function CodeTabs({ ts, js, filename }: CodeTabsProps) {
  const { lang, setLang } = useLang()
  const [copied, setCopied] = useState(false)

  const code   = lang === 'js' ? js : ts
  const file   = filename ? (lang === 'js' ? toJsFilename(filename) : filename) : undefined
  const tokens = tokenize(code)

  function copy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-5 overflow-hidden" style={{ border: '1px solid #2D2D2D' }}>
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ background: '#252526', borderBottom: '1px solid #2D2D2D' }}
      >
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5 flex-shrink-0">
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: '#FF5F57' }} />
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: '#FFBD2E' }} />
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: '#28CA41' }} />
          </div>

          {/* TS / JS tab buttons */}
          <div className="flex items-center overflow-hidden" style={{ border: '1px solid #3D3D3D' }}>
            <button
              onClick={() => setLang('ts')}
              className="font-mono text-[10px] tracking-widest px-2.5 py-1 transition-colors"
              style={{
                background: lang === 'ts' ? '#007ACC' : 'transparent',
                color:      lang === 'ts' ? '#ffffff' : '#6A6A6A',
              }}
            >
              TS
            </button>
            <span style={{ width: 1, background: '#3D3D3D', alignSelf: 'stretch' }} />
            <button
              onClick={() => setLang('js')}
              className="font-mono text-[10px] tracking-widest px-2.5 py-1 transition-colors"
              style={{
                background: lang === 'js' ? '#F0DB4F' : 'transparent',
                color:      lang === 'js' ? '#222222' : '#6A6A6A',
              }}
            >
              JS
            </button>
          </div>

          {/* Filename */}
          {file && (
            <span className="font-mono text-[11px] tracking-wide truncate" style={{ color: '#9D9D9D' }}>
              {file}
            </span>
          )}
        </div>

        <button
          onClick={copy}
          className="font-mono text-[10px] tracking-widest px-3 py-1 transition-colors flex-shrink-0"
          style={{
            border:     `1px solid ${copied ? '#28CA41' : '#3D3D3D'}`,
            color:       copied ? '#28CA41' : '#9D9D9D',
            background: 'transparent',
          }}
        >
          {copied ? '✓ COPIED' : 'COPY'}
        </button>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto" style={{ background: '#1E1E1E' }}>
        <pre className="font-mono text-[13px] leading-[1.75] p-5 whitespace-pre">
          {tokens.map((tok, idx) => (
            <span key={idx} style={{ color: C[tok.t] ?? C.text }}>
              {tok.v}
            </span>
          ))}
        </pre>
      </div>
    </div>
  )
}

// ─── ShellBlock ───────────────────────────────────────────────────────────────

interface ShellBlockProps {
  command: string
  label?:  string
}

export function ShellBlock({ command, label = 'TERMINAL' }: ShellBlockProps) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-4 overflow-hidden" style={{ border: '1px solid #2D2D2D' }}>
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ background: '#252526', borderBottom: '1px solid #2D2D2D' }}
      >
        <span className="font-mono text-[10px] tracking-widest" style={{ color: '#9D9D9D' }}>{label}</span>
        <button
          onClick={copy}
          className="font-mono text-[10px] tracking-widest px-3 py-1 transition-colors"
          style={{
            border: `1px solid ${copied ? '#28CA41' : '#3D3D3D'}`,
            color:  copied ? '#28CA41' : '#9D9D9D',
            background: 'transparent',
          }}
        >
          {copied ? '✓ COPIED' : 'COPY'}
        </button>
      </div>
      <div className="flex items-center gap-3 px-5 py-4" style={{ background: '#1E1E1E' }}>
        <span className="font-mono text-[14px] select-none" style={{ color: '#28CA41' }}>$</span>
        <span className="font-mono text-[13px]" style={{ color: '#D4D4D4' }}>{command}</span>
      </div>
    </div>
  )
}
