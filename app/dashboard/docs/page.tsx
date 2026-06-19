'use client'

import Link from 'next/link'
import { CodeEditor, ShellBlock } from '@/components/docs/CodeEditor'

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mt-10 mb-4">
      <span className="w-0.5 h-5 bg-accent" />
      <span className="font-mono text-[10px] text-accent/80 tracking-widest">{label}</span>
      <div className="flex-1 h-px bg-[#1A1A1A]" />
    </div>
  )
}

function Row({ label, type, req, desc }: { label: string; type: string; req?: boolean; desc: string }) {
  return (
    <div className="flex flex-wrap items-start gap-3 px-5 py-3 border-b border-[#161616] last:border-0">
      <code className="font-mono text-[12px] w-36 flex-shrink-0" style={{ color: '#9CDCFE' }}>{label}</code>
      <code className="font-mono text-[11px] w-28 flex-shrink-0" style={{ color: '#4EC9B0' }}>{type}</code>
      {req && <span className="font-mono text-[8px] tracking-widest px-1.5 py-0.5 border border-accent/30 text-accent/80 flex-shrink-0">REQ</span>}
      <span className="font-body text-sm text-muted flex-1">{desc}</span>
    </div>
  )
}

const TOC = [
  { id: 'install',    label: 'Installation'    },
  { id: 'auth',       label: 'Authentication'  },
  { id: 'quickstart', label: 'Quick Start'     },
  { id: 'core',       label: '@awarizon/web3'  },
  { id: 'reads',      label: 'Contract Reads'  },
  { id: 'writes',     label: 'Contract Writes' },
  { id: 'events',     label: 'Events'          },
  { id: 'gas',        label: 'Gas Estimation'  },
  { id: 'react',      label: '@awarizon/react' },
  { id: 'codegen',    label: 'Code Generator'  },
  { id: 'chains',     label: 'Chains'          },
  { id: 'errors',     label: 'Error Handling'  },
  { id: 'types',      label: 'TS Types'        },
]

export default function DashboardDocsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">

      {/* Header */}
      <div className="mb-10">
        <span className="font-mono text-[11px] tracking-[0.3em] text-dim block mb-3">DASHBOARD // SDK_DOCS</span>
        <h1
          className="font-display font-extrabold text-white leading-tight mb-3"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
        >
          SDK Documentation
        </h1>
        <p className="font-body text-muted text-base max-w-2xl">
          Complete reference for{' '}
          <code className="font-mono text-accent text-sm">@awarizon/web3</code>,{' '}
          <code className="font-mono text-accent text-sm">@awarizon/react</code>, and{' '}
          <code className="font-mono text-accent text-sm">@awarizon/cli</code>.
          Your API key is at{' '}
          <Link href="/dashboard/api-keys" className="text-accent hover:underline">API Keys →</Link>
        </p>
      </div>

      {/* TOC strip */}
      <div className="border border-[#1E1E1E] bg-[#080808] p-5 mb-10">
        <span className="font-mono text-[9px] text-dim tracking-widest block mb-3">ON THIS PAGE</span>
        <div className="flex flex-wrap gap-2">
          {TOC.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="font-mono text-[10px] tracking-widest px-3 py-1.5 border border-[#1E1E1E] text-dim hover:border-accent/30 hover:text-accent transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Installation ─────────────────────────────────────── */}
      <section id="install" className="scroll-mt-6">
        <SectionHeader label="01 // INSTALLATION" />
        <p className="font-body text-muted mb-4 leading-relaxed">
          One command installs the SDK and React hooks. Install the CLI separately.
        </p>
        <ShellBlock command="npm install @awarizon/web3 @awarizon/react" label="INSTALL SDK + REACT HOOKS" />
        <ShellBlock command="npm install -g @awarizon/cli" label="INSTALL CLI (GLOBAL)" />
      </section>

      {/* ── Authentication ───────────────────────────────────── */}
      <section id="auth" className="scroll-mt-6">
        <SectionHeader label="02 // AUTHENTICATION" />
        <p className="font-body text-muted mb-4 leading-relaxed">
          Generate an API key from{' '}
          <Link href="/dashboard/api-keys" className="text-accent hover:underline">API Keys</Link>.
          Keys look like <code className="font-mono text-accent text-sm">awz_live_...</code>
        </p>
        <div className="border border-yellow-500/20 bg-yellow-500/5 p-4 mb-4">
          <span className="font-mono text-[10px] text-yellow-400 tracking-widest block mb-1">SECURITY NOTE</span>
          <p className="font-body text-sm text-muted">
            Never commit API keys to version control. Use environment variables. Keep server-side keys out of client bundles.
          </p>
        </div>
        <CodeEditor
          filename=".env.local"
          code={`AWARIZON_API_KEY=awz_live_YOUR_KEY

# For browser / Next.js client components only
NEXT_PUBLIC_AWARIZON_KEY=awz_live_YOUR_KEY`}
        />
      </section>

      {/* ── Quick Start ──────────────────────────────────────── */}
      <section id="quickstart" className="scroll-mt-6">
        <SectionHeader label="03 // QUICK START" />
        <CodeEditor
          filename="quickstart.ts"
          code={`import { AwarizonWeb3 } from "@awarizon/web3"

const awz = new AwarizonWeb3({
  chain:  "base",
  apiKey: process.env.AWARIZON_API_KEY,
})

const contract = await awz.contract({
  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  abi:     USDC_ABI,
})

// Read state (no gas, no wallet needed)
const balance = await contract.balanceOf("0xYourAddress")
console.log(balance) // 1000000n  (6 decimals)

// Write a transaction
const tx = await contract.transfer("0xRecipient", 500_000n)
const receipt = await tx.wait()
console.log("confirmed in block", receipt.blockNumber)`}
        />
      </section>

      {/* ── Core SDK ─────────────────────────────────────────── */}
      <section id="core" className="scroll-mt-6">
        <SectionHeader label="04 // @awarizon/web3 — CORE SDK" />

        <h3 className="font-display font-semibold text-white text-base mb-2">new AwarizonWeb3(config)</h3>
        <CodeEditor
          code={`import { AwarizonWeb3 } from "@awarizon/web3"

const awz = new AwarizonWeb3({
  chain:   "base",          // required
  apiKey:  "awz_live_...",  // required
  timeout: 30_000,          // optional, ms (default 30 000)
  retries: 3,               // optional (default 3)
})`}
        />
        <div className="border border-[#1E1E1E] bg-[#080808] mb-6">
          <Row label="chain"   type="SupportedChain" req  desc="EVM chain to connect to. See Supported Chains section." />
          <Row label="apiKey"  type="string"          req  desc='API key from the dashboard. Format: "awz_live_..."' />
          <Row label="timeout" type="number"               desc="Milliseconds before a request times out. Default: 30 000." />
          <Row label="retries" type="number"               desc="Automatic retries on transient RPC failures. Default: 3." />
        </div>

        <h3 className="font-display font-semibold text-white text-base mb-2 mt-6">awz.contract(options)</h3>
        <CodeEditor
          code={`const contract = await awz.contract({
  address: "0xContractAddress",  // checksummed EIP-55 address
  abi:     ABI_ARRAY,             // standard JSON ABI array
})`}
        />
      </section>

      {/* ── Reads ────────────────────────────────────────────── */}
      <section id="reads" className="scroll-mt-6">
        <SectionHeader label="05 // CONTRACT READS" />
        <p className="font-body text-muted mb-3 leading-relaxed">
          Call any <code className="font-mono text-accent text-sm">view</code> or <code className="font-mono text-accent text-sm">pure</code> function. Zero gas, no wallet required.
        </p>
        <CodeEditor
          code={`// Single return value
const balance  = await contract.balanceOf(ownerAddress) // bigint
const symbol   = await contract.symbol()                // string
const decimals = await contract.decimals()              // bigint

// Tuple return — destructure directly
const [reserve0, reserve1] = await contract.getReserves()

// Struct — returned as Record<string, unknown>
const position = await contract.positions(tokenId)`}
        />
      </section>

      {/* ── Writes ───────────────────────────────────────────── */}
      <section id="writes" className="scroll-mt-6">
        <SectionHeader label="06 // CONTRACT WRITES" />
        <p className="font-body text-muted mb-3 leading-relaxed">
          Write functions broadcast immediately and return a <code className="font-mono text-accent text-sm">TransactionResult</code>.
          Call <code className="font-mono text-accent text-sm">.wait()</code> to block until confirmed.
        </p>
        <CodeEditor
          code={`const tx = await contract.transfer(recipientAddress, 1_000_000n)
console.log("hash:", tx.hash)

const receipt = await tx.wait()
console.log("block:",    receipt.blockNumber)
console.log("gas used:", receipt.gasUsed)
console.log("status:",   receipt.status) // "success" | "reverted"

// Payable — attach ETH value via options object
const tx2 = await contract.deposit({ value: 1_000_000_000_000_000n })`}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────── */}
      <section id="events" className="scroll-mt-6">
        <SectionHeader label="07 // EVENTS" />
        <CodeEditor
          code={`// Subscribe to a named event
const unsubscribe = contract.on("Transfer", (log) => {
  console.log("from:",  log.args.from)
  console.log("to:",    log.args.to)
  console.log("value:", log.args.value)
})

// Unsubscribe (call in cleanup / useEffect return)
unsubscribe()

// Wildcard — receive all events
const unsubAll = contract.on("*", (log) => {
  console.log(log.name, log.args)
})`}
        />
      </section>

      {/* ── Gas ──────────────────────────────────────────────── */}
      <section id="gas" className="scroll-mt-6">
        <SectionHeader label="08 // GAS ESTIMATION" />
        <CodeEditor
          code={`const gas = await contract.estimateGas(
  "transfer",        // function name
  recipientAddress,  // ...args
  1_000_000n,
)
console.log("estimated gas:", gas) // e.g. 21000n`}
        />
      </section>

      {/* ── React ────────────────────────────────────────────── */}
      <section id="react" className="scroll-mt-6">
        <SectionHeader label="09 // @awarizon/react — HOOKS" />

        <h3 className="font-display font-semibold text-white text-base mb-2">AwarizonProvider</h3>
        <CodeEditor
          filename="app/layout.tsx"
          code={`import { AwarizonProvider } from "@awarizon/react"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AwarizonProvider chain="base" apiKey={process.env.NEXT_PUBLIC_AWARIZON_KEY}>
          {children}
        </AwarizonProvider>
      </body>
    </html>
  )
}`}
        />

        <h3 className="font-display font-semibold text-white text-base mb-2 mt-6">useReadContract</h3>
        <CodeEditor
          lang="tsx"
          code={`import { useReadContract } from "@awarizon/react"

function Balance({ owner }: { owner: \`0x\${string}\` }) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: "0xToken",
    abi:     ERC20_ABI,
    method:  "balanceOf",
    args:    [owner],
  })

  if (isLoading) return <span>Loading…</span>
  if (error)     return <span>{error.message}</span>
  return <span>{data?.toString()}</span>
}`}
        />

        <h3 className="font-display font-semibold text-white text-base mb-2 mt-6">useWriteContract</h3>
        <CodeEditor
          lang="tsx"
          code={`import { useWriteContract } from "@awarizon/react"

function TransferButton({ to, amount }: { to: \`0x\${string}\`; amount: bigint }) {
  const { write, isPending, data: tx, error } = useWriteContract({
    address: "0xToken",
    abi:     ERC20_ABI,
    method:  "transfer",
  })

  return (
    <button onClick={() => write([to, amount])} disabled={isPending}>
      {isPending ? "Sending…" : "Transfer"}
    </button>
  )
}`}
        />

        <h3 className="font-display font-semibold text-white text-base mb-2 mt-6">useContract</h3>
        <CodeEditor
          lang="tsx"
          code={`import { useEffect } from "react"
import { useContract } from "@awarizon/react"

function EventFeed() {
  const { contract } = useContract({ address: "0xToken", abi: ERC20_ABI })

  useEffect(() => {
    if (!contract) return
    const unsub = contract.on("Transfer", (log) => console.log(log.args))
    return unsub
  }, [contract])

  return null
}`}
        />

        {/* Return value tables */}
        <div className="border border-[#1E1E1E] bg-[#080808] mt-4 mb-4">
          <div className="px-5 py-3 border-b border-[#161616]">
            <span className="font-mono text-[9px] text-dim tracking-widest">useReadContract — RETURN VALUES</span>
          </div>
          <Row label="data"       type="unknown"      desc="Decoded return value. undefined while loading." />
          <Row label="isLoading"  type="boolean"      desc="True during the first fetch only." />
          <Row label="isFetching" type="boolean"      desc="True during any fetch including re-fetches." />
          <Row label="error"      type="Error | null" desc="Last error, or null if last fetch succeeded." />
          <Row label="refetch"    type="() => void"   desc="Manually trigger a re-fetch." />
        </div>
        <div className="border border-[#1E1E1E] bg-[#080808] mb-4">
          <div className="px-5 py-3 border-b border-[#161616]">
            <span className="font-mono text-[9px] text-dim tracking-widest">useWriteContract — RETURN VALUES</span>
          </div>
          <Row label="write"     type="(args[]) => void"         desc="Call with function args to broadcast." />
          <Row label="isPending" type="boolean"                  desc="True while signing and broadcasting." />
          <Row label="data"      type="TransactionResult | null" desc="Result after broadcast." />
          <Row label="error"     type="Error | null"             desc="Error from last write attempt." />
          <Row label="reset"     type="() => void"               desc="Clears data and error state." />
        </div>
      </section>

      {/* ── Code Gen ─────────────────────────────────────────── */}
      <section id="codegen" className="scroll-mt-6">
        <SectionHeader label="10 // CODE GENERATOR" />
        <p className="font-body text-muted mb-4 leading-relaxed">
          Generate typed clients and hooks from any ABI via the{' '}
          <Link href="/dashboard/codegen" className="text-accent hover:underline">dashboard Code Generator</Link>{' '}
          or the CLI.
        </p>
        <ShellBlock
          command="npx @awarizon/cli codegen --name MyToken --address 0x... --abi ./abi.json --lang ts --out ./src/contracts"
          label="CLI — GENERATE FROM ABI"
        />
        <CodeEditor
          filename="MyTokenClient.ts  (generated)"
          code={`import { AwarizonWeb3 } from "@awarizon/web3"
import { MyTokenClient } from "./MyTokenClient"

const awz     = new AwarizonWeb3({ chain: "base", apiKey: process.env.AWARIZON_API_KEY })
const myToken = await MyTokenClient.create(awz)

// Fully typed — no ABI needed at call site
const balance = await myToken.balanceOf("0xOwner")
const tx      = await myToken.transfer("0xTo", 1_000_000n)
await tx.wait()`}
        />
      </section>

      {/* ── Chains ───────────────────────────────────────────── */}
      <section id="chains" className="scroll-mt-6">
        <SectionHeader label="11 // SUPPORTED CHAINS" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#1E1E1E] mb-4 mt-4">
          {[
            { id: 'base',      name: 'Base',         note: 'Recommended · OP Stack L2' },
            { id: 'ethereum',  name: 'Ethereum',      note: 'Mainnet'                  },
            { id: 'polygon',   name: 'Polygon',       note: 'PoS sidechain'            },
            { id: 'arbitrum',  name: 'Arbitrum One',  note: 'Optimistic L2'            },
            { id: 'optimism',  name: 'Optimism',      note: 'OP Stack L2'              },
            { id: 'bnb',       name: 'BNB Chain',     note: 'BSC'                      },
            { id: 'avalanche', name: 'Avalanche',     note: 'C-Chain'                  },
            { id: 'zksync',    name: 'zkSync Era',    note: 'ZK-rollup L2'             },
            { id: 'linea',     name: 'Linea',         note: 'ZK-rollup L2'             },
          ].map(c => (
            <div key={c.id} className="bg-[#080808] px-4 py-3">
              <code className="font-mono text-[12px] block mb-0.5" style={{ color: '#CE9178' }}>{`"${c.id}"`}</code>
              <span className="font-body text-xs text-dim">{c.name} — {c.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Errors ───────────────────────────────────────────── */}
      <section id="errors" className="scroll-mt-6">
        <SectionHeader label="12 // ERROR HANDLING" />
        <CodeEditor
          code={`import {
  AwarizonError, // base — catches all SDK errors
  AuthError,     // invalid / revoked API key
  ChainError,    // transaction reverted or RPC error
  TimeoutError,  // exceeded configured timeout
} from "@awarizon/web3"

try {
  const tx = await contract.transfer(to, amount)
  await tx.wait()
} catch (err) {
  if (err instanceof AuthError) {
    // Key invalid — redirect to /dashboard/api-keys
    console.error("Auth:", err.message)
  } else if (err instanceof ChainError) {
    console.error("Revert:", err.reason) // e.g. "ERC20: insufficient balance"
    console.error("Code:",   err.code)
  } else if (err instanceof TimeoutError) {
    console.error("Timed out after", err.duration, "ms")
  } else if (err instanceof AwarizonError) {
    console.error("SDK error:", err.message)
  }
}`}
        />
      </section>

      {/* ── Types ────────────────────────────────────────────── */}
      <section id="types" className="scroll-mt-6">
        <SectionHeader label="13 // TYPESCRIPT TYPES" />
        <CodeEditor
          lang="ts"
          code={`import type {
  AwarizonConfig, SupportedChain,
  ContractInstance, TransactionResult, TransactionReceipt, EventLog,
} from "@awarizon/web3"

type SupportedChain =
  | "base" | "ethereum" | "polygon" | "arbitrum"
  | "optimism" | "bnb" | "avalanche" | "zksync" | "linea"

interface AwarizonConfig {
  chain:    SupportedChain
  apiKey:   string
  timeout?: number   // ms, default 30 000
  retries?: number   // default 3
}

interface TransactionResult {
  hash: \`0x\${string}\`
  wait(confirmations?: number): Promise<TransactionReceipt>
}

interface TransactionReceipt {
  blockNumber: number
  blockHash:   \`0x\${string}\`
  gasUsed:     bigint
  status:      "success" | "reverted"
  logs:        EventLog[]
}

interface EventLog {
  name:    string
  address: \`0x\${string}\`
  args:    Record<string, unknown>
}`}
        />
      </section>

      {/* Footer */}
      <div className="mt-14 pt-6 border-t border-[#1A1A1A] flex flex-wrap items-center gap-6">
        <Link href="/dashboard/api-keys"
          className="font-mono text-[10px] tracking-widest text-accent/70 hover:text-accent transition-colors">
          GET API KEY →
        </Link>
        <Link href="/dashboard/codegen"
          className="font-mono text-[10px] tracking-widest text-dim hover:text-muted transition-colors">
          CODE GENERATOR →
        </Link>
        <a href="https://www.npmjs.com/org/awarizon" target="_blank" rel="noreferrer"
          className="font-mono text-[10px] tracking-widest text-dim hover:text-muted transition-colors">
          NPM REGISTRY ↗
        </a>
        <Link href="/docs"
          className="font-mono text-[10px] tracking-widest text-dim hover:text-muted transition-colors">
          PUBLIC DOCS ↗
        </Link>
      </div>
    </div>
  )
}
