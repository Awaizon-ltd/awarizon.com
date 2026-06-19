import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Awarizon SDK Docs — @awarizon/web3 · @awarizon/react · @awarizon/cli',
  description: 'Complete reference for the Awarizon Web3 SDK. Install, authenticate, read and write smart contracts, React hooks, CLI code generation, and TypeScript types.',
}

function CodeBlock({ children, lang = 'ts' }: { children: string; lang?: string }) {
  return (
    <div className="my-4 border border-[#1E1E1E] bg-[#080808] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1A1A1A]">
        <span className="font-mono text-[9px] text-dim/60 tracking-widest">{lang.toUpperCase()}</span>
      </div>
      <pre className="font-mono text-[12px] text-muted leading-relaxed p-5 overflow-x-auto whitespace-pre">
        {children}
      </pre>
    </div>
  )
}

function Shell({ children }: { children: string }) {
  return (
    <div className="my-4 border border-[#1E1E1E] bg-[#080808] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1A1A1A]">
        <span className="w-2 h-2 rounded-full bg-accent/40" />
        <span className="font-mono text-[9px] text-dim/60 tracking-widest">TERMINAL</span>
      </div>
      <pre className="font-mono text-[12px] text-accent/80 leading-relaxed p-5 overflow-x-auto whitespace-pre">
        {children}
      </pre>
    </div>
  )
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-display font-bold text-2xl text-white mt-16 mb-4 scroll-mt-20 flex items-center gap-3">
      <span className="w-1 h-6 bg-accent flex-shrink-0" />
      {children}
    </h2>
  )
}

function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="font-display font-semibold text-lg text-white mt-10 mb-3 scroll-mt-20">
      {children}
    </h3>
  )
}

function Callout({ type = 'info', children }: { type?: 'info' | 'warn'; children: React.ReactNode }) {
  const color = type === 'warn' ? 'border-yellow-500/30 bg-yellow-500/5 text-yellow-300' : 'border-accent/20 bg-accent/5 text-muted'
  return (
    <div className={`my-4 border ${color} p-4 text-sm font-body leading-relaxed`}>
      {children}
    </div>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-mono text-[9px] tracking-widest px-2 py-0.5 bg-[#111] border border-[#222] text-dim mr-1.5 mb-1.5">
      {children}
    </span>
  )
}

export default function DocsPage() {
  return (
    <div className="font-body text-muted">

      {/* ── Overview ── */}
      <section id="overview">
        <div className="mb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent/70">SDK_DOCS // v1.0</span>
        </div>
        <h1 className="font-display font-extrabold text-white leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
          Awarizon SDK
        </h1>
        <p className="text-base text-muted leading-relaxed max-w-2xl mb-4">
          The Awarizon SDK gives developers a clean, typed interface to interact with EVM smart contracts on any supported chain — without managing RPC nodes, gas estimation complexity, or boilerplate ABI wrappers.
        </p>
        <p className="text-base text-muted leading-relaxed max-w-2xl">
          All calls are authenticated with an API key from your{' '}
          <Link href="/dashboard/api-keys" className="text-accent hover:underline">dashboard</Link>.
          The SDK handles connection pooling, retries, and chain switching automatically.
        </p>
      </section>

      {/* ── Packages ── */}
      <H2 id="packages">Packages</H2>
      <p className="mb-5 leading-relaxed">
        The Awarizon SDK is published as three focused packages on npm under the <code className="font-mono text-accent text-sm">@awarizon</code> scope.
      </p>
      <div className="grid sm:grid-cols-3 gap-px bg-[#1E1E1E] mb-6">
        {[
          { pkg: '@awarizon/web3',   desc: 'Core SDK. Framework-agnostic. Use in any Node.js or browser environment.' },
          { pkg: '@awarizon/react',  desc: 'React hooks built on the core SDK. Includes data-fetching, mutation, and event subscription hooks.' },
          { pkg: '@awarizon/cli',    desc: 'CLI tool. Generates typed TypeScript/JavaScript contract clients and React hooks from any ABI.' },
        ].map(({ pkg, desc }) => (
          <div key={pkg} className="bg-[#0A0A0A] p-5">
            <code className="font-mono text-[12px] text-accent block mb-2">{pkg}</code>
            <p className="font-body text-sm text-muted leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* ── Installation ── */}
      <H2 id="installation">Installation</H2>
      <Shell>{`# Core SDK (Node.js, browser, Edge)
npm install @awarizon/web3

# React hooks (requires React 18+)
npm install @awarizon/react

# CLI — install globally or use with npx
npm install -g @awarizon/cli`}</Shell>

      {/* ── Authentication ── */}
      <H2 id="authentication">Authentication</H2>
      <p className="mb-4 leading-relaxed">
        All SDK calls require an API key. Keys are scoped to your account and can be managed in the{' '}
        <Link href="/dashboard/api-keys" className="text-accent hover:underline">API Keys</Link> section of your dashboard.
      </p>
      <Callout type="warn">
        <strong className="text-white">Never expose your API key client-side in production.</strong> Use environment variables and, for browser apps, proxy requests through your own backend or use a restricted key.
      </Callout>
      <p className="mb-4 leading-relaxed">API keys follow the format <code className="font-mono text-accent text-sm">awz_live_...</code> for production keys.</p>
      <Shell>{`# .env
AWARIZON_API_KEY=awz_live_YOUR_KEY_HERE

# Next.js (browser-safe)
NEXT_PUBLIC_AWARIZON_KEY=awz_live_YOUR_KEY_HERE`}</Shell>

      {/* ── Quick Start ── */}
      <H2 id="quickstart">Quick Start</H2>
      <p className="mb-4 leading-relaxed">Initialise the SDK and make your first contract call in under a minute.</p>
      <CodeBlock>{`import { AwarizonWeb3 } from "@awarizon/web3"

const awz = new AwarizonWeb3({
  chain:  "base",
  apiKey: process.env.AWARIZON_API_KEY,
})

// Attach to any EVM contract
const usdc = await awz.contract({
  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  abi:     USDC_ABI,
})

// Read on-chain state
const balance = await usdc.balanceOf("0xYourAddress")
console.log(balance) // 1000000n  (USDC has 6 decimals)

// Write a transaction
const tx = await usdc.transfer("0xRecipient", 1_000_000n)
console.log("hash:", tx.hash)

const receipt = await tx.wait()
console.log("confirmed in block:", receipt.blockNumber)`}</CodeBlock>

      {/* ── @awarizon/web3 ── */}
      <H2 id="web3-sdk">@awarizon/web3</H2>
      <p className="leading-relaxed">The core package. Works in Node.js 18+, modern browsers, and Edge runtimes.</p>

      <H3 id="constructor">new AwarizonWeb3(config)</H3>
      <p className="mb-3 leading-relaxed">Creates an SDK instance. All <code className="font-mono text-accent text-sm">.contract()</code> calls share the same connection pool.</p>
      <CodeBlock>{`import { AwarizonWeb3 } from "@awarizon/web3"

const awz = new AwarizonWeb3({
  chain:   "base",           // required — see Supported Chains
  apiKey:  "awz_live_...",   // required
  timeout: 30_000,           // optional, ms (default: 30 000)
  retries: 3,                // optional (default: 3)
})`}</CodeBlock>
      <p className="mb-3 font-mono text-[11px] text-dim tracking-widest">CONFIG OPTIONS</p>
      <div className="border border-[#1E1E1E] divide-y divide-[#1A1A1A] mb-4">
        {[
          { name: 'chain',   type: 'SupportedChain', req: true,  desc: 'Target EVM chain identifier.' },
          { name: 'apiKey',  type: 'string',          req: true,  desc: 'Awarizon API key (awz_live_...).' },
          { name: 'timeout', type: 'number',           req: false, desc: 'RPC request timeout in milliseconds. Default: 30 000.' },
          { name: 'retries', type: 'number',           req: false, desc: 'Number of automatic retries on transient failures. Default: 3.' },
        ].map(row => (
          <div key={row.name} className="flex flex-wrap items-start gap-3 px-4 py-3">
            <code className="font-mono text-[12px] text-accent w-20 flex-shrink-0">{row.name}</code>
            <code className="font-mono text-[11px] text-dim w-28 flex-shrink-0">{row.type}</code>
            {row.req && <span className="font-mono text-[9px] px-1.5 py-0.5 bg-accent/10 text-accent border border-accent/20 tracking-widest flex-shrink-0">REQUIRED</span>}
            <span className="font-body text-sm text-muted flex-1">{row.desc}</span>
          </div>
        ))}
      </div>

      <H3 id="contract-method">awz.contract(options)</H3>
      <p className="mb-3 leading-relaxed">Returns a <code className="font-mono text-accent text-sm">ContractInstance</code> bound to the given address and ABI.</p>
      <CodeBlock>{`const contract = await awz.contract({
  address: "0xContractAddress",   // EIP-55 checksum address
  abi:     [...],                  // JSON ABI array
})`}</CodeBlock>

      <H3 id="reads">Reading state</H3>
      <p className="mb-3 leading-relaxed">
        Call any <code className="font-mono text-accent text-sm">view</code> or <code className="font-mono text-accent text-sm">pure</code> function directly on the instance. Arguments are typed from the ABI via the code generator.
      </p>
      <CodeBlock>{`// view function — returns on-chain value
const balance  = await contract.balanceOf(ownerAddress)
const name     = await contract.name()
const decimals = await contract.decimals()

// Multiple return values
const [reserve0, reserve1] = await contract.getReserves()`}</CodeBlock>

      <H3 id="writes">Writing transactions</H3>
      <p className="mb-3 leading-relaxed">
        Call any <code className="font-mono text-accent text-sm">nonpayable</code> or <code className="font-mono text-accent text-sm">payable</code> function. Returns a <code className="font-mono text-accent text-sm">TransactionResult</code> immediately after broadcast; call <code className="font-mono text-accent text-sm">.wait()</code> to block until confirmed.
      </p>
      <CodeBlock>{`// Broadcast and get hash immediately
const tx = await contract.transfer(recipientAddress, 1_000_000n)
console.log("broadcasted:", tx.hash)

// Wait for on-chain confirmation
const receipt = await tx.wait()
console.log("block:", receipt.blockNumber)
console.log("gas used:", receipt.gasUsed)
console.log("status:", receipt.status) // "success" | "reverted"

// Payable function — attach ETH value
const tx2 = await contract.deposit({ value: 1_000_000_000_000_000n }) // 0.001 ETH`}</CodeBlock>

      <H3 id="events">Events</H3>
      <p className="mb-3 leading-relaxed">Subscribe to contract events in real time. Returns an unsubscribe function.</p>
      <CodeBlock>{`const unsubscribe = contract.on("Transfer", (log) => {
  console.log("from:",  log.from)
  console.log("to:",    log.to)
  console.log("value:", log.value)
})

// Remove the listener when done
unsubscribe()`}</CodeBlock>

      <H3 id="gas">Gas estimation</H3>
      <p className="mb-3 leading-relaxed">Estimate the gas cost of a write before broadcasting.</p>
      <CodeBlock>{`const gas = await contract.estimateGas("transfer", recipientAddress, 1_000_000n)
console.log("gas estimate:", gas) // 21000n`}</CodeBlock>

      {/* ── @awarizon/react ── */}
      <H2 id="react-sdk">@awarizon/react</H2>
      <p className="leading-relaxed">React hooks powered by the core SDK. Handles loading states, re-fetching, and cleanup automatically. Requires React 18+.</p>

      <H3 id="provider">AwarizonProvider</H3>
      <p className="mb-3 leading-relaxed">Wrap your application (or subtree) with <code className="font-mono text-accent text-sm">AwarizonProvider</code>. All hooks read their configuration from the nearest provider.</p>
      <CodeBlock>{`// app/layout.tsx (Next.js App Router)
import { AwarizonProvider } from "@awarizon/react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AwarizonProvider
      chain="base"
      apiKey={process.env.NEXT_PUBLIC_AWARIZON_KEY}
    >
      {children}
    </AwarizonProvider>
  )
}`}</CodeBlock>

      <H3 id="use-read-contract">useReadContract</H3>
      <p className="mb-3 leading-relaxed">Fetches the result of a <code className="font-mono text-accent text-sm">view</code>/<code className="font-mono text-accent text-sm">pure</code> function. Re-fetches on argument changes.</p>
      <CodeBlock>{`import { useReadContract } from "@awarizon/react"

function TokenBalance({ owner }: { owner: \`0x\${string}\` }) {
  const { data, isLoading, error } = useReadContract({
    address: "0xToken",
    abi:     ERC20_ABI,
    method:  "balanceOf",
    args:    [owner],
  })

  if (isLoading) return <span>Loading…</span>
  if (error)     return <span className="text-red-400">{error.message}</span>
  return <span>{data?.toString()}</span>
}`}</CodeBlock>
      <div className="border border-[#1E1E1E] divide-y divide-[#1A1A1A] mb-4">
        {[
          { name: 'data',       type: 'unknown',  desc: 'Decoded return value from the contract function.' },
          { name: 'isLoading',  type: 'boolean',  desc: 'True while the first fetch is in-flight.' },
          { name: 'isFetching', type: 'boolean',  desc: 'True during any fetch, including re-fetches.' },
          { name: 'error',      type: 'Error | null', desc: 'Last error, if any.' },
          { name: 'refetch',    type: '() => void', desc: 'Manually trigger a re-fetch.' },
        ].map(row => (
          <div key={row.name} className="flex flex-wrap items-start gap-3 px-4 py-3">
            <code className="font-mono text-[12px] text-accent w-24 flex-shrink-0">{row.name}</code>
            <code className="font-mono text-[11px] text-dim w-32 flex-shrink-0">{row.type}</code>
            <span className="font-body text-sm text-muted flex-1">{row.desc}</span>
          </div>
        ))}
      </div>

      <H3 id="use-write-contract">useWriteContract</H3>
      <p className="mb-3 leading-relaxed">Returns a <code className="font-mono text-accent text-sm">write</code> callback bound to a specific contract function. Call it with the function arguments to broadcast the transaction.</p>
      <CodeBlock>{`import { useWriteContract } from "@awarizon/react"

function TransferButton({ to, amount }: { to: \`0x\${string}\`; amount: bigint }) {
  const { write, isPending, data: tx, error } = useWriteContract({
    address: "0xToken",
    abi:     ERC20_ABI,
    method:  "transfer",
  })

  return (
    <>
      <button
        onClick={() => write([to, amount])}
        disabled={isPending}
      >
        {isPending ? "Sending…" : "Transfer"}
      </button>
      {tx    && <p>Sent: {tx.hash}</p>}
      {error && <p className="text-red-400">{error.message}</p>}
    </>
  )
}`}</CodeBlock>

      <H3 id="use-contract">useContract</H3>
      <p className="mb-3 leading-relaxed">Returns the raw <code className="font-mono text-accent text-sm">ContractInstance</code>. Use this for event subscriptions or methods not covered by the above hooks.</p>
      <CodeBlock>{`import { useEffect } from "react"
import { useContract } from "@awarizon/react"

function EventListener() {
  const { contract } = useContract({
    address: "0xToken",
    abi:     ERC20_ABI,
  })

  useEffect(() => {
    if (!contract) return
    const unsub = contract.on("Transfer", (log) => console.log(log))
    return unsub  // cleanup on unmount
  }, [contract])
}`}</CodeBlock>

      {/* ── CLI ── */}
      <H2 id="cli">@awarizon/cli</H2>
      <p className="mb-4 leading-relaxed">
        The CLI generates fully typed TypeScript or JavaScript contract clients and React hooks from any ABI. You can also run code generation directly from the{' '}
        <Link href="/dashboard/codegen" className="text-accent hover:underline">dashboard Code Generator</Link>.
      </p>
      <Shell>{`# Generate from a local ABI file
npx @awarizon/cli codegen \\
  --name   MyToken \\
  --address 0xContractAddress \\
  --abi    ./abi.json \\
  --lang   ts \\
  --out    ./src/contracts

# Outputs:
#   src/contracts/MyTokenClient.ts   — typed contract client class
#   src/contracts/useMyToken.ts      — React hooks (useReadX, useWriteX, useXEvent)`}</Shell>

      <p className="mb-3 leading-relaxed">The generated client wraps the core SDK:</p>
      <CodeBlock>{`// Auto-generated: MyTokenClient.ts
import { AwarizonWeb3 } from "@awarizon/web3"

export class MyTokenClient {
  static async create(awz: AwarizonWeb3) {
    const client = new MyTokenClient()
    client._contract = await awz.contract({ address: CONTRACT_ADDRESS, abi: ABI })
    return client
  }

  // Typed read methods (view/pure)
  async balanceOf(owner: \`0x\${string}\`): Promise<bigint> {
    return this._contract.balanceOf(owner)
  }

  // Typed write methods (nonpayable/payable)
  async transfer(to: \`0x\${string}\`, amount: bigint): Promise<TransactionResult> {
    return this._contract.transfer(to, amount)
  }
}`}</CodeBlock>

      {/* ── Chains ── */}
      <H2 id="chains">Supported Chains</H2>
      <p className="mb-5 leading-relaxed">All EVM-compatible chains below are supported. Pass the chain identifier string to the constructor or provider.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#1E1E1E] mb-4">
        {[
          { id: 'base',      name: 'Base',          note: 'Recommended' },
          { id: 'ethereum',  name: 'Ethereum',       note: 'Mainnet'    },
          { id: 'polygon',   name: 'Polygon',        note: 'PoS'        },
          { id: 'arbitrum',  name: 'Arbitrum One',   note: 'L2'         },
          { id: 'optimism',  name: 'Optimism',       note: 'L2'         },
          { id: 'bnb',       name: 'BNB Chain',      note: 'BSC'        },
          { id: 'avalanche', name: 'Avalanche',      note: 'C-Chain'    },
          { id: 'zksync',    name: 'zkSync Era',     note: 'ZK-L2'      },
          { id: 'linea',     name: 'Linea',          note: 'ZK-L2'      },
        ].map(c => (
          <div key={c.id} className="bg-[#0A0A0A] px-4 py-3">
            <code className="font-mono text-[12px] text-accent block mb-0.5">{`"${c.id}"`}</code>
            <span className="font-body text-xs text-dim">{c.name} — {c.note}</span>
          </div>
        ))}
      </div>

      {/* ── Errors ── */}
      <H2 id="errors">Error Handling</H2>
      <p className="mb-3 leading-relaxed">The SDK exports typed error classes for structured error handling.</p>
      <CodeBlock>{`import {
  AwarizonError,  // base class for all SDK errors
  AuthError,      // invalid / expired API key
  ChainError,     // transaction reverted or RPC error
  TimeoutError,   // request exceeded the configured timeout
} from "@awarizon/web3"

try {
  const tx = await contract.transfer(to, amount)
  await tx.wait()
} catch (err) {
  if (err instanceof AuthError) {
    // Key is invalid or has been revoked — redirect to API keys page
    console.error("Auth failed:", err.message)
  } else if (err instanceof ChainError) {
    // Contract reverted or RPC returned an error
    console.error("Chain error:", err.reason)   // solidity revert reason
    console.error("Code:",       err.code)      // EVM error code
  } else if (err instanceof TimeoutError) {
    // RPC did not respond within the configured timeout
    console.error("Timeout after", err.duration, "ms")
  } else if (err instanceof AwarizonError) {
    // Catch-all for any other SDK error
    console.error("SDK error:", err.message)
  }
}`}</CodeBlock>

      {/* ── Types ── */}
      <H2 id="types">TypeScript Types</H2>
      <p className="mb-3 leading-relaxed">All exported types from <code className="font-mono text-accent text-sm">@awarizon/web3</code>:</p>
      <CodeBlock>{`import type {
  AwarizonConfig,
  SupportedChain,
  ContractOptions,
  ContractInstance,
  TransactionOptions,
  TransactionResult,
  TransactionReceipt,
  EventLog,
  AwarizonError,
} from "@awarizon/web3"

// AwarizonConfig
interface AwarizonConfig {
  chain:    SupportedChain
  apiKey:   string
  timeout?: number   // ms
  retries?: number
}

// SupportedChain
type SupportedChain =
  | "base" | "ethereum" | "polygon" | "arbitrum"
  | "optimism" | "bnb" | "avalanche" | "zksync" | "linea"

// ContractOptions
interface ContractOptions {
  address: \`0x\${string}\`
  abi:     unknown[]
}

// TransactionResult — returned immediately after broadcast
interface TransactionResult {
  hash: \`0x\${string}\`
  wait(): Promise<TransactionReceipt>
}

// TransactionReceipt — resolved after confirmation
interface TransactionReceipt {
  blockNumber: number
  blockHash:   \`0x\${string}\`
  gasUsed:     bigint
  status:      "success" | "reverted"
  logs:        EventLog[]
}

// EventLog — emitted by contract.on(...)
interface EventLog {
  name:    string
  address: \`0x\${string}\`
  topics:  \`0x\${string}\`[]
  data:    \`0x\${string}\`
  args:    Record<string, unknown>
}`}</CodeBlock>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-[#1E1E1E]">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/dashboard/api-keys" className="font-mono text-[10px] tracking-widest text-accent/70 hover:text-accent transition-colors">
            GET API KEY →
          </Link>
          <Link href="/dashboard/codegen" className="font-mono text-[10px] tracking-widest text-dim hover:text-muted transition-colors">
            CODE GENERATOR →
          </Link>
          <a
            href="https://www.npmjs.com/org/awarizon"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] tracking-widest text-dim hover:text-muted transition-colors"
          >
            NPM REGISTRY ↗
          </a>
        </div>
        <p className="font-mono text-[9px] text-dim/40 tracking-widest mt-6">
          AWARIZON LABS // SDK_DOCS // v1
        </p>
      </div>
    </div>
  )
}
