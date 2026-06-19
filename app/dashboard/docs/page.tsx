'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Shared components ────────────────────────────────────────────────────────

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
      className="font-mono text-[9px] tracking-widest px-2.5 py-1 border border-[#252525] text-dim hover:border-accent/30 hover:text-accent transition-colors flex-shrink-0"
    >
      {copied ? '✓ COPIED' : 'COPY'}
    </button>
  )
}

function CodeBlock({ children, lang = 'ts', copyable = true }: { children: string; lang?: string; copyable?: boolean }) {
  return (
    <div className="border border-[#1E1E1E] bg-[#060606] overflow-hidden mb-4">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#181818]">
        <span className="font-mono text-[9px] text-dim/60 tracking-widest">{lang.toUpperCase()}</span>
        {copyable && <CopyButton text={children} />}
      </div>
      <pre className="font-mono text-[12px] text-muted leading-relaxed p-4 overflow-x-auto whitespace-pre">
        {children}
      </pre>
    </div>
  )
}

function Shell({ children }: { children: string }) {
  return (
    <div className="border border-[#1E1E1E] bg-[#060606] overflow-hidden mb-4">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#181818]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          <span className="font-mono text-[9px] text-dim/60 tracking-widest">TERMINAL</span>
        </div>
        <CopyButton text={children} />
      </div>
      <pre className="font-mono text-[12px] text-accent/80 leading-relaxed p-4 overflow-x-auto whitespace-pre">
        {children}
      </pre>
    </div>
  )
}

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
      <code className="font-mono text-[12px] text-accent w-36 flex-shrink-0">{label}</code>
      <code className="font-mono text-[11px] text-dim w-28 flex-shrink-0">{type}</code>
      {req && <span className="font-mono text-[8px] tracking-widest px-1.5 py-0.5 bg-accent/10 text-accent border border-accent/20 flex-shrink-0">REQ</span>}
      <span className="font-body text-sm text-muted flex-1">{desc}</span>
    </div>
  )
}

const TOC = [
  { id: 'install',     label: 'Installation'       },
  { id: 'auth',        label: 'Authentication'      },
  { id: 'quickstart',  label: 'Quick Start'         },
  { id: 'core',        label: '@awarizon/web3'      },
  { id: 'reads',       label: 'Contract Reads'      },
  { id: 'writes',      label: 'Contract Writes'     },
  { id: 'events',      label: 'Events'              },
  { id: 'gas',         label: 'Gas Estimation'      },
  { id: 'react',       label: '@awarizon/react'     },
  { id: 'codegen',     label: 'Code Generator'      },
  { id: 'chains',      label: 'Supported Chains'    },
  { id: 'errors',      label: 'Error Handling'      },
  { id: 'types',       label: 'TypeScript Types'    },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardDocsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">

      {/* Header */}
      <div className="mb-10">
        <span className="font-mono text-[11px] tracking-[0.3em] text-dim block mb-3">
          DASHBOARD // SDK_DOCS
        </span>
        <h1 className="font-display font-extrabold text-white leading-tight mb-3"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
          SDK Documentation
        </h1>
        <p className="font-body text-muted text-base max-w-2xl">
          Complete reference for <code className="font-mono text-accent text-sm">@awarizon/web3</code>,{' '}
          <code className="font-mono text-accent text-sm">@awarizon/react</code>, and the{' '}
          <code className="font-mono text-accent text-sm">@awarizon/cli</code> code generator.
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
          Install the packages you need from npm. All three are published under the{' '}
          <code className="font-mono text-accent text-sm">@awarizon</code> scope.
        </p>
        <Shell>{`# Core SDK — works in Node.js, browser, and Edge runtimes
npm install @awarizon/web3

# React hooks (requires React 18+)
npm install @awarizon/react

# CLI — install globally or use with npx
npm install -g @awarizon/cli`}</Shell>
      </section>

      {/* ── Authentication ───────────────────────────────────── */}
      <section id="auth" className="scroll-mt-6">
        <SectionHeader label="02 // AUTHENTICATION" />
        <p className="font-body text-muted mb-4 leading-relaxed">
          Every SDK call is authenticated with an API key from your dashboard. Go to{' '}
          <Link href="/dashboard/api-keys" className="text-accent hover:underline">API Keys</Link>{' '}
          to generate one. Keys look like <code className="font-mono text-accent text-sm">awz_live_...</code>
        </p>
        <div className="border border-yellow-500/20 bg-yellow-500/5 p-4 mb-4">
          <span className="font-mono text-[10px] text-yellow-400 tracking-widest block mb-1">SECURITY NOTE</span>
          <p className="font-body text-sm text-muted">
            Never commit API keys to version control. Use environment variables and keep server-side keys out of client bundles.
          </p>
        </div>
        <Shell>{`# .env.local
AWARIZON_API_KEY=awz_live_YOUR_KEY

# For browser / Next.js client components
NEXT_PUBLIC_AWARIZON_KEY=awz_live_YOUR_KEY`}</Shell>
      </section>

      {/* ── Quick Start ──────────────────────────────────────── */}
      <section id="quickstart" className="scroll-mt-6">
        <SectionHeader label="03 // QUICK START" />
        <p className="font-body text-muted mb-4 leading-relaxed">
          Three lines to your first on-chain read.
        </p>
        <CodeBlock>{`import { AwarizonWeb3 } from "@awarizon/web3"

const awz = new AwarizonWeb3({
  chain:  "base",
  apiKey: process.env.AWARIZON_API_KEY,
})

const contract = await awz.contract({
  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",  // USDC on Base
  abi:     USDC_ABI,
})

// Read state (no gas, no wallet needed)
const balance = await contract.balanceOf("0xYourAddress")
console.log(balance) // 1000000n (6 decimals)

// Write a transaction
const tx = await contract.transfer("0xRecipient", 500_000n)
const receipt = await tx.wait()
console.log("confirmed in block", receipt.blockNumber)`}</CodeBlock>
      </section>

      {/* ── Core SDK ─────────────────────────────────────────── */}
      <section id="core" className="scroll-mt-6">
        <SectionHeader label="04 // @awarizon/web3 — CORE SDK" />
        <p className="font-body text-muted mb-4 leading-relaxed">
          The core package is framework-agnostic. It runs in Node.js 18+, modern browsers, Cloudflare Workers, Vercel Edge, and Deno.
        </p>

        <h3 className="font-display font-semibold text-white text-base mb-3">new AwarizonWeb3(config)</h3>
        <CodeBlock>{`import { AwarizonWeb3 } from "@awarizon/web3"

const awz = new AwarizonWeb3({
  chain:   "base",          // required
  apiKey:  "awz_live_...",  // required
  timeout: 30_000,          // optional, ms (default 30 000)
  retries: 3,               // optional (default 3)
})`}</CodeBlock>
        <div className="border border-[#1E1E1E] bg-[#080808] mb-6">
          <Row label="chain"   type="SupportedChain" req  desc="EVM chain to connect to. See Supported Chains section." />
          <Row label="apiKey"  type="string"          req  desc="Your API key from the dashboard. Format: awz_live_..." />
          <Row label="timeout" type="number"               desc="Milliseconds before a request times out. Default: 30 000." />
          <Row label="retries" type="number"               desc="Number of automatic retries on transient RPC failures. Default: 3." />
        </div>

        <h3 className="font-display font-semibold text-white text-base mb-3">awz.contract(options)</h3>
        <CodeBlock>{`const contract = await awz.contract({
  address: "0xContractAddress",  // checksummed address
  abi:     ABI_ARRAY,             // contract ABI (JSON array)
})`}</CodeBlock>
        <p className="font-body text-sm text-muted mb-6">
          Returns a <code className="font-mono text-accent text-sm">ContractInstance</code>. The address and ABI are validated at construction time.
        </p>
      </section>

      {/* ── Reads ────────────────────────────────────────────── */}
      <section id="reads" className="scroll-mt-6">
        <SectionHeader label="05 // CONTRACT READS" />
        <p className="font-body text-muted mb-4 leading-relaxed">
          Call any <code className="font-mono text-accent text-sm">view</code> or <code className="font-mono text-accent text-sm">pure</code> function directly on the contract instance. These never cost gas.
        </p>
        <CodeBlock>{`// Single return value
const balance  = await contract.balanceOf(ownerAddress)      // bigint
const symbol   = await contract.symbol()                      // string
const decimals = await contract.decimals()                    // bigint

// Multiple return values are destructured as a tuple
const [reserve0, reserve1, blockTimestamp] = await contract.getReserves()

// Structs are returned as Record<string, unknown>
const position = await contract.positions(positionId)`}</CodeBlock>
      </section>

      {/* ── Writes ───────────────────────────────────────────── */}
      <section id="writes" className="scroll-mt-6">
        <SectionHeader label="06 // CONTRACT WRITES" />
        <p className="font-body text-muted mb-4 leading-relaxed">
          Calling a <code className="font-mono text-accent text-sm">nonpayable</code> or <code className="font-mono text-accent text-sm">payable</code> function broadcasts a transaction and returns immediately with the hash. Use <code className="font-mono text-accent text-sm">.wait()</code> to block until confirmed.
        </p>
        <CodeBlock>{`// Nonpayable — no ETH attached
const tx = await contract.transfer(recipientAddress, 1_000_000n)

// Get hash immediately (transaction is already broadcast)
console.log("tx hash:", tx.hash)

// Wait for on-chain confirmation (1 block by default)
const receipt = await tx.wait()
console.log("block:",    receipt.blockNumber)
console.log("gas used:", receipt.gasUsed)
console.log("status:",   receipt.status) // "success" | "reverted"

// Payable — attach ETH value via options object
const tx2 = await contract.deposit({ value: 1_000_000_000_000_000n }) // 0.001 ETH`}</CodeBlock>
      </section>

      {/* ── Events ───────────────────────────────────────────── */}
      <section id="events" className="scroll-mt-6">
        <SectionHeader label="07 // EVENTS" />
        <p className="font-body text-muted mb-4 leading-relaxed">
          Subscribe to real-time contract events. The SDK returns an unsubscribe function you must call on cleanup.
        </p>
        <CodeBlock>{`// Subscribe to a named event
const unsubscribe = contract.on("Transfer", (log) => {
  console.log("from:",  log.args.from)
  console.log("to:",    log.args.to)
  console.log("value:", log.args.value)
})

// Remove the listener (call in cleanup / useEffect return)
unsubscribe()

// Subscribe to all events with "*"
const unsubAll = contract.on("*", (log) => {
  console.log("event:", log.name, log.args)
})`}</CodeBlock>
      </section>

      {/* ── Gas ──────────────────────────────────────────────── */}
      <section id="gas" className="scroll-mt-6">
        <SectionHeader label="08 // GAS ESTIMATION" />
        <p className="font-body text-muted mb-4 leading-relaxed">
          Simulate a write transaction to get the estimated gas units before spending a wallet's funds.
        </p>
        <CodeBlock>{`const gas = await contract.estimateGas(
  "transfer",         // function name
  recipientAddress,   // ...args
  1_000_000n,
)

console.log("estimated gas:", gas) // e.g. 21000n

// Useful for showing users a fee preview
const gasPrice = await awz.getGasPrice()
const feeBigInt = gas * gasPrice
const feeEth    = Number(feeBigInt) / 1e18`}</CodeBlock>
      </section>

      {/* ── React ────────────────────────────────────────────── */}
      <section id="react" className="scroll-mt-6">
        <SectionHeader label="09 // @awarizon/react — HOOKS" />
        <p className="font-body text-muted mb-4 leading-relaxed">
          React hooks that wrap the core SDK with loading states, error handling, and automatic cleanup. Requires React 18+.
        </p>

        <h3 className="font-display font-semibold text-white text-base mb-3">AwarizonProvider</h3>
        <CodeBlock>{`// app/layout.tsx — Next.js App Router
import { AwarizonProvider } from "@awarizon/react"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AwarizonProvider
          chain="base"
          apiKey={process.env.NEXT_PUBLIC_AWARIZON_KEY}
        >
          {children}
        </AwarizonProvider>
      </body>
    </html>
  )
}`}</CodeBlock>

        <h3 className="font-display font-semibold text-white text-base mb-3 mt-6">useReadContract</h3>
        <p className="font-body text-sm text-muted mb-3">Fetches a view/pure function. Re-fetches when args change.</p>
        <CodeBlock>{`import { useReadContract } from "@awarizon/react"

function Balance({ owner }: { owner: \`0x\${string}\` }) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: "0xToken",
    abi:     ERC20_ABI,
    method:  "balanceOf",
    args:    [owner],
  })

  if (isLoading) return <span>Loading…</span>
  if (error)     return <span className="text-red-400">{error.message}</span>
  return (
    <div>
      <span>{data?.toString()}</span>
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}`}</CodeBlock>

        <h3 className="font-display font-semibold text-white text-base mb-3 mt-6">useWriteContract</h3>
        <p className="font-body text-sm text-muted mb-3">Returns a <code className="font-mono text-accent text-sm">write</code> callback. Call it with the function arguments.</p>
        <CodeBlock>{`import { useWriteContract } from "@awarizon/react"

function TransferButton({ to, amount }: { to: \`0x\${string}\`; amount: bigint }) {
  const { write, isPending, data: tx, error } = useWriteContract({
    address: "0xToken",
    abi:     ERC20_ABI,
    method:  "transfer",
  })

  return (
    <div>
      <button onClick={() => write([to, amount])} disabled={isPending}>
        {isPending ? "Sending…" : "Transfer"}
      </button>
      {tx    && <p>Hash: {tx.hash}</p>}
      {error && <p className="text-red-400">{error.message}</p>}
    </div>
  )
}`}</CodeBlock>

        <h3 className="font-display font-semibold text-white text-base mb-3 mt-6">useContract</h3>
        <p className="font-body text-sm text-muted mb-3">Returns the raw <code className="font-mono text-accent text-sm">ContractInstance</code> for advanced use cases.</p>
        <CodeBlock>{`import { useEffect } from "react"
import { useContract } from "@awarizon/react"

function EventFeed() {
  const { contract } = useContract({ address: "0xToken", abi: ERC20_ABI })

  useEffect(() => {
    if (!contract) return
    const unsub = contract.on("Transfer", (log) => {
      console.log("Transfer:", log.args)
    })
    return unsub  // unsubscribe on unmount
  }, [contract])

  return null
}`}</CodeBlock>

        {/* Hook return values */}
        <div className="border border-[#1E1E1E] bg-[#080808] mt-4 mb-6">
          <div className="px-5 py-3 border-b border-[#161616]">
            <span className="font-mono text-[9px] text-dim tracking-widest">useReadContract — RETURN VALUES</span>
          </div>
          <Row label="data"       type="unknown"      desc="Decoded return value from the contract function. undefined while loading." />
          <Row label="isLoading"  type="boolean"      desc="True during the first fetch only." />
          <Row label="isFetching" type="boolean"      desc="True during any fetch, including background re-fetches." />
          <Row label="error"      type="Error | null" desc="Last error, or null if the last fetch succeeded." />
          <Row label="refetch"    type="() => void"   desc="Manually trigger a re-fetch." />
        </div>
        <div className="border border-[#1E1E1E] bg-[#080808] mb-6">
          <div className="px-5 py-3 border-b border-[#161616]">
            <span className="font-mono text-[9px] text-dim tracking-widest">useWriteContract — RETURN VALUES</span>
          </div>
          <Row label="write"     type="(args: unknown[]) => void" desc="Call with the function arguments to broadcast the transaction." />
          <Row label="isPending" type="boolean"                   desc="True while the transaction is being signed and broadcast." />
          <Row label="data"      type="TransactionResult | null"  desc="Transaction result after successful broadcast." />
          <Row label="error"     type="Error | null"              desc="Error from the last write attempt, if any." />
          <Row label="reset"     type="() => void"                desc="Clears data and error state." />
        </div>
      </section>

      {/* ── Code Gen ─────────────────────────────────────────── */}
      <section id="codegen" className="scroll-mt-6">
        <SectionHeader label="10 // CODE GENERATOR" />
        <p className="font-body text-muted mb-4 leading-relaxed">
          Generate fully typed contract clients and React hooks from any ABI using the{' '}
          <Link href="/dashboard/codegen" className="text-accent hover:underline">Code Generator in your dashboard</Link>{' '}
          or the CLI.
        </p>
        <Shell>{`# CLI — generate from a local ABI file
npx @awarizon/cli codegen \\
  --name    MyToken \\
  --address 0xContractAddress \\
  --abi     ./abi.json \\
  --lang    ts \\
  --out     ./src/contracts

# Produces:
#   MyTokenClient.ts   — typed class that wraps AwarizonWeb3
#   useMyToken.ts      — React hooks (useReadX, useWriteX, useXEvent)`}</Shell>

        <p className="font-body text-sm text-muted mb-3">Using the generated client:</p>
        <CodeBlock>{`import { AwarizonWeb3 } from "@awarizon/web3"
import { MyTokenClient } from "./MyTokenClient"

const awz      = new AwarizonWeb3({ chain: "base", apiKey: process.env.AWARIZON_API_KEY })
const myToken  = await MyTokenClient.create(awz)

// Fully typed — no ABI needed at call site
const balance = await myToken.balanceOf("0xOwner")
const tx      = await myToken.transfer("0xTo", 1_000_000n)
await tx.wait()`}</CodeBlock>

        <p className="font-body text-sm text-muted mb-3">Using the generated React hooks:</p>
        <CodeBlock>{`import { useReadBalanceOf, useWriteTransfer } from "./useMyToken"

function TokenUI({ owner }: { owner: \`0x\${string}\` }) {
  const { data: balance } = useReadBalanceOf(owner)
  const { write: transfer, isPending } = useWriteTransfer()

  return (
    <div>
      <p>Balance: {balance?.toString()}</p>
      <button
        onClick={() => transfer(["0xRecipient", 500_000n])}
        disabled={isPending}
      >
        Transfer
      </button>
    </div>
  )
}`}</CodeBlock>
      </section>

      {/* ── Chains ───────────────────────────────────────────── */}
      <section id="chains" className="scroll-mt-6">
        <SectionHeader label="11 // SUPPORTED CHAINS" />
        <p className="font-body text-muted mb-5 leading-relaxed">
          Pass the chain identifier to <code className="font-mono text-accent text-sm">new AwarizonWeb3()</code> or <code className="font-mono text-accent text-sm">{'<AwarizonProvider>'}</code>.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#1E1E1E] mb-4">
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
              <code className="font-mono text-[12px] text-accent block mb-0.5">{`"${c.id}"`}</code>
              <span className="font-body text-xs text-dim">{c.name} — {c.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Errors ───────────────────────────────────────────── */}
      <section id="errors" className="scroll-mt-6">
        <SectionHeader label="12 // ERROR HANDLING" />
        <p className="font-body text-muted mb-4 leading-relaxed">
          The SDK exports typed error classes. Catch them specifically for actionable error recovery.
        </p>
        <CodeBlock>{`import {
  AwarizonError,  // base — catches all SDK errors
  AuthError,      // invalid / revoked API key
  ChainError,     // transaction reverted or RPC error
  TimeoutError,   // exceeded configured timeout
} from "@awarizon/web3"

try {
  const tx = await contract.transfer(to, amount)
  await tx.wait()
} catch (err) {
  if (err instanceof AuthError) {
    // Key is invalid — redirect to /dashboard/api-keys
    console.error("Auth:", err.message)
  } else if (err instanceof ChainError) {
    // Transaction reverted
    console.error("Revert reason:", err.reason)  // e.g. "ERC20: insufficient balance"
    console.error("Error code:",    err.code)    // EVM error code
  } else if (err instanceof TimeoutError) {
    console.error("RPC timed out after", err.duration, "ms")
  } else if (err instanceof AwarizonError) {
    console.error("SDK error:", err.message)
  }
}`}</CodeBlock>
      </section>

      {/* ── Types ────────────────────────────────────────────── */}
      <section id="types" className="scroll-mt-6">
        <SectionHeader label="13 // TYPESCRIPT TYPES" />
        <p className="font-body text-muted mb-4 leading-relaxed">
          All exported types from <code className="font-mono text-accent text-sm">@awarizon/web3</code> and <code className="font-mono text-accent text-sm">@awarizon/react</code>.
        </p>
        <CodeBlock>{`// ── @awarizon/web3 ────────────────────────────────────────────────────────

import type {
  AwarizonConfig,
  SupportedChain,
  ContractOptions,
  ContractInstance,
  TransactionOptions,
  TransactionResult,
  TransactionReceipt,
  EventLog,
} from "@awarizon/web3"

type SupportedChain =
  | "base" | "ethereum" | "polygon" | "arbitrum"
  | "optimism" | "bnb" | "avalanche" | "zksync" | "linea"

interface AwarizonConfig {
  chain:    SupportedChain
  apiKey:   string
  timeout?: number          // ms, default 30 000
  retries?: number          // default 3
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
  topics:  \`0x\${string}\`[]
  data:    \`0x\${string}\`
  args:    Record<string, unknown>
}

// ── @awarizon/react ────────────────────────────────────────────────────────

import type {
  AwarizonProviderProps,
  UseReadContractOptions,
  UseReadContractResult,
  UseWriteContractOptions,
  UseWriteContractResult,
} from "@awarizon/react"

interface AwarizonProviderProps {
  chain:    SupportedChain
  apiKey:   string
  children: React.ReactNode
}

interface UseReadContractOptions {
  address: \`0x\${string}\`
  abi:     unknown[]
  method:  string
  args?:   unknown[]
  enabled?: boolean     // default true — set false to skip the fetch
}

interface UseWriteContractOptions {
  address: \`0x\${string}\`
  abi:     unknown[]
  method:  string
}`}</CodeBlock>
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
        <a href="https://www.npmjs.com/org/awarizon"
          target="_blank" rel="noreferrer"
          className="font-mono text-[10px] tracking-widest text-dim hover:text-muted transition-colors">
          NPM REGISTRY ↗
        </a>
        <Link href="/docs"
          className="font-mono text-[10px] tracking-widest text-dim hover:text-muted transition-colors">
          FULL PUBLIC DOCS ↗
        </Link>
      </div>
    </div>
  )
}
