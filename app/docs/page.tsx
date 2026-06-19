'use client'

import Link from 'next/link'
import { CodeEditor, ShellBlock } from '@/components/docs/CodeEditor'

// ─── Section primitives ───────────────────────────────────────────────────────

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-display font-bold text-white scroll-mt-20 mb-2 flex items-center gap-3"
      style={{ fontSize: '1.35rem', marginTop: '3.5rem' }}
    >
      <span className="w-0.5 h-5 bg-accent flex-shrink-0" />
      {children}
    </h2>
  )
}

function Sub({ children }: { children: React.ReactNode }) {
  return <p className="font-body text-muted text-[15px] leading-relaxed mb-1">{children}</p>
}

function PropRow({ name, type, req, desc }: { name: string; type: string; req?: boolean; desc: string }) {
  return (
    <div className="flex flex-wrap items-start gap-x-4 gap-y-1 px-4 py-3 border-b border-[#1A1A1A] last:border-0">
      <code className="font-mono text-[12px] w-32 flex-shrink-0" style={{ color: '#9CDCFE' }}>{name}</code>
      <code className="font-mono text-[11px] w-28 flex-shrink-0" style={{ color: '#4EC9B0' }}>{type}</code>
      {req && <span className="font-mono text-[8px] tracking-widest px-1.5 py-0.5 border border-accent/30 text-accent/80">REQ</span>}
      <span className="font-body text-[13px] text-muted flex-1 min-w-[160px]">{desc}</span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocsPage() {
  return (
    <div className="font-body text-muted">

      {/* Hero */}
      <div className="mb-10">
        <span className="font-mono text-[10px] tracking-[0.3em] text-accent/70 block mb-4">@AWARIZON // SDK REFERENCE</span>
        <h1 className="font-display font-extrabold text-white mb-4" style={{ fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 1.1 }}>
          Awarizon SDK
        </h1>
        <p className="text-[15px] text-muted leading-relaxed max-w-xl">
          A typed interface for interacting with EVM smart contracts on any supported chain.
          Authenticate with an API key from your{' '}
          <Link href="/dashboard/api-keys" className="text-accent hover:underline">dashboard</Link>.
        </p>
      </div>

      {/* ── Install ─────────────────────────────────────────── */}
      <section id="install">
        <SectionTitle id="install">Install</SectionTitle>
        <Sub>One command installs the core SDK and React hooks together.</Sub>
        <ShellBlock
          command="npm install @awarizon/web3 @awarizon/react"
          label="INSTALL SDK + REACT HOOKS"
        />

        <Sub>Install the CLI separately to generate typed contract clients from any ABI.</Sub>
        <ShellBlock
          command="npm install -g @awarizon/cli"
          label="INSTALL CLI (GLOBAL)"
        />

        <div className="border border-[#1E1E1E] bg-[#0A0A0A] p-4 mt-3 mb-2">
          <div className="font-mono text-[9px] text-dim tracking-widest mb-2">PACKAGES</div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { pkg: '@awarizon/web3',  desc: 'Core SDK. Node.js, browser, Edge runtimes.' },
              { pkg: '@awarizon/react', desc: 'React 18+ hooks for reads, writes, events.' },
              { pkg: '@awarizon/cli',   desc: 'Codegen CLI. Outputs TypeScript or JavaScript.' },
            ].map(({ pkg, desc }) => (
              <div key={pkg}>
                <code className="font-mono text-[11px] block mb-0.5" style={{ color: '#CE9178' }}>{pkg}</code>
                <span className="font-body text-[12px] text-dim">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Start ─────────────────────────────────────── */}
      <section id="quickstart">
        <SectionTitle id="quickstart">Quick Start</SectionTitle>
        <Sub>Initialise the SDK, attach to a contract, read state, and send a transaction.</Sub>
        <CodeEditor
          filename="quickstart.ts"
          code={`import { AwarizonWeb3 } from "@awarizon/web3"

// 1. Initialise with your chain and API key
const awz = new AwarizonWeb3({
  chain:  "base",
  apiKey: process.env.AWARIZON_API_KEY, // awz_live_...
})

// 2. Attach to any EVM contract
const usdc = await awz.contract({
  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  abi:     USDC_ABI,
})

// 3. Read on-chain state (no gas, no wallet)
const balance = await usdc.balanceOf("0xYourAddress")
console.log(balance) // 1000000n  (USDC has 6 decimals)

// 4. Write a transaction
const tx = await usdc.transfer("0xRecipient", 500_000n)
console.log("hash:", tx.hash)

// 5. Wait for confirmation
const receipt = await tx.wait()
console.log("block:", receipt.blockNumber) // e.g. 12345678`}
        />
      </section>

      {/* ── @awarizon/web3 ───────────────────────────────────── */}
      <section id="core">
        <SectionTitle id="core">@awarizon/web3</SectionTitle>

        {/* Constructor */}
        <h3 id="constructor" className="font-display font-semibold text-white text-base mt-6 mb-1 scroll-mt-20">
          new AwarizonWeb3(config)
        </h3>
        <Sub>Creates an SDK instance. All <code className="font-mono text-accent text-[13px]">.contract()</code> calls share the same connection pool.</Sub>
        <CodeEditor
          lang="ts"
          code={`import { AwarizonWeb3 } from "@awarizon/web3"

const awz = new AwarizonWeb3({
  chain:   "base",         // required — target EVM chain
  apiKey:  "awz_live_...", // required — from dashboard.awarizon.com
  timeout: 30_000,         // optional, ms  (default: 30 000)
  retries: 3,              // optional      (default: 3)
})`}
        />
        <div className="border border-[#1E1E1E] bg-[#0A0A0A] mb-4">
          <PropRow name="chain"   type="SupportedChain" req  desc="EVM chain identifier string. See Supported Chains." />
          <PropRow name="apiKey"  type="string"          req  desc='API key from the dashboard. Format: "awz_live_..."' />
          <PropRow name="timeout" type="number"               desc="Request timeout in milliseconds. Default 30 000." />
          <PropRow name="retries" type="number"               desc="Automatic retries on transient RPC errors. Default 3." />
        </div>

        {/* contract() */}
        <h3 id="contract-method" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          awz.contract(options) → ContractInstance
        </h3>
        <Sub>Binds the SDK to a deployed contract. Returns a fully-typed <code className="font-mono text-accent text-[13px]">ContractInstance</code>.</Sub>
        <CodeEditor
          lang="ts"
          code={`const contract = await awz.contract({
  address: "0xContractAddress", // EIP-55 checksum address
  abi:     ABI_ARRAY,            // standard JSON ABI
})`}
        />

        {/* Reads */}
        <h3 id="reads" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          Reading state
        </h3>
        <Sub>Call any <code className="font-mono text-accent text-[13px]">view</code> or <code className="font-mono text-accent text-[13px]">pure</code> function directly. Zero gas, no wallet required.</Sub>
        <CodeEditor
          lang="ts"
          code={`// Single return value
const balance  = await contract.balanceOf(ownerAddress) // bigint
const symbol   = await contract.symbol()                // string
const decimals = await contract.decimals()              // bigint

// Tuple return — destructure directly
const [reserve0, reserve1] = await contract.getReserves()

// Struct — returned as Record<string, unknown>
const position = await contract.positions(tokenId)`}
        />

        {/* Writes */}
        <h3 id="writes" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          Writing transactions
        </h3>
        <Sub>
          <code className="font-mono text-accent text-[13px]">nonpayable</code> and <code className="font-mono text-accent text-[13px]">payable</code> functions return a{' '}
          <code className="font-mono text-accent text-[13px]">TransactionResult</code> immediately after broadcast.
          Call <code className="font-mono text-accent text-[13px]">.wait()</code> to block until confirmed.
        </Sub>
        <CodeEditor
          lang="ts"
          code={`// Broadcast and get hash immediately
const tx = await contract.transfer(recipientAddress, 1_000_000n)
console.log("broadcasted:", tx.hash) // 0x...

// Wait for on-chain confirmation (1 block)
const receipt = await tx.wait()
console.log("block:",    receipt.blockNumber)
console.log("gas used:", receipt.gasUsed)
console.log("status:",   receipt.status) // "success" | "reverted"

// Payable function — attach ETH via options object
const tx2 = await contract.deposit({ value: 1_000_000_000_000_000n }) // 0.001 ETH`}
        />

        {/* Events */}
        <h3 id="events" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          Events
        </h3>
        <Sub>Subscribe to real-time contract events. The SDK returns an unsubscribe function — always call it on cleanup.</Sub>
        <CodeEditor
          lang="ts"
          code={`// Subscribe to a named event
const unsubscribe = contract.on("Transfer", (log) => {
  console.log("from:",  log.args.from)
  console.log("to:",    log.args.to)
  console.log("value:", log.args.value)
})

// Unsubscribe (e.g. on component unmount)
unsubscribe()

// Wildcard — receive all events
const unsubAll = contract.on("*", (log) => {
  console.log(log.name, log.args)
})`}
        />

        {/* Gas */}
        <h3 id="gas" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          Gas estimation
        </h3>
        <Sub>Simulate a write before broadcasting to get the estimated gas cost.</Sub>
        <CodeEditor
          lang="ts"
          code={`const gas = await contract.estimateGas(
  "transfer",        // function name
  recipientAddress,  // ...args
  1_000_000n,
)
console.log("estimated gas:", gas) // e.g. 21000n`}
        />
      </section>

      {/* ── @awarizon/react ──────────────────────────────────── */}
      <section id="react">
        <SectionTitle id="react">@awarizon/react</SectionTitle>
        <Sub>React hooks built on the core SDK. Manages loading states, re-fetching, and cleanup automatically. Requires React 18+.</Sub>

        {/* Provider */}
        <h3 id="provider" className="font-display font-semibold text-white text-base mt-6 mb-1 scroll-mt-20">
          AwarizonProvider
        </h3>
        <Sub>Wrap your app (or a subtree) once. All hooks read config from the nearest provider.</Sub>
        <CodeEditor
          filename="app/layout.tsx"
          code={`import { AwarizonProvider } from "@awarizon/react"

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
}`}
        />

        {/* useReadContract */}
        <h3 id="use-read" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          useReadContract
        </h3>
        <Sub>Fetches a view/pure function. Re-fetches automatically when args change.</Sub>
        <CodeEditor
          lang="tsx"
          code={`import { useReadContract } from "@awarizon/react"

function TokenBalance({ owner }: { owner: \`0x\${string}\` }) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: "0xToken",
    abi:     ERC20_ABI,
    method:  "balanceOf",
    args:    [owner],       // re-fetches when owner changes
  })

  if (isLoading) return <span>Loading…</span>
  if (error)     return <span>{error.message}</span>
  return <span>{data?.toString()}</span>
}`}
        />

        {/* useWriteContract */}
        <h3 id="use-write" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          useWriteContract
        </h3>
        <Sub>Returns a <code className="font-mono text-accent text-[13px]">write</code> callback bound to a specific function. Call it with the ABI arguments.</Sub>
        <CodeEditor
          lang="tsx"
          code={`import { useWriteContract } from "@awarizon/react"

function TransferButton({ to, amount }: { to: \`0x\${string}\`; amount: bigint }) {
  const { write, isPending, data: tx, error, reset } = useWriteContract({
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
      {error && <p>{error.message}</p>}
    </div>
  )
}`}
        />

        {/* useContract */}
        <h3 id="use-contract" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          useContract
        </h3>
        <Sub>Returns the raw <code className="font-mono text-accent text-[13px]">ContractInstance</code> for event subscriptions or advanced use.</Sub>
        <CodeEditor
          lang="tsx"
          code={`import { useEffect } from "react"
import { useContract } from "@awarizon/react"

function TransferFeed() {
  const { contract } = useContract({ address: "0xToken", abi: ERC20_ABI })

  useEffect(() => {
    if (!contract) return
    const unsub = contract.on("Transfer", (log) => {
      console.log("Transfer:", log.args)
    })
    return unsub // unsubscribe on unmount
  }, [contract])

  return null
}`}
        />
      </section>

      {/* ── CLI ─────────────────────────────────────────────── */}
      <section id="cli">
        <SectionTitle id="cli">@awarizon/cli — Code Generation</SectionTitle>
        <Sub>Generate fully typed contract clients and React hooks from any ABI. No boilerplate.</Sub>
        <ShellBlock
          command="npx @awarizon/cli codegen --name MyToken --address 0x... --abi ./abi.json --lang ts"
          label="CLI — GENERATE FROM ABI FILE"
        />
        <p className="font-mono text-[11px] text-dim mb-3 tracking-wide">
          Outputs: <span style={{ color: '#CE9178' }}>MyTokenClient.ts</span> and <span style={{ color: '#CE9178' }}>useMyToken.ts</span>
        </p>
        <CodeEditor
          filename="MyTokenClient.ts  (auto-generated)"
          code={`import { AwarizonWeb3 } from "@awarizon/web3"
import type { TransactionResult } from "@awarizon/web3"

export class MyTokenClient {
  static async create(awz: AwarizonWeb3): Promise<MyTokenClient> {
    const client = new MyTokenClient()
    client._contract = await awz.contract({ address: CONTRACT_ADDRESS, abi: ABI })
    return client
  }

  // Typed read methods (view / pure)
  async balanceOf(owner: \`0x\${string}\`): Promise<bigint> {
    return this._contract.balanceOf(owner)
  }

  // Typed write methods (nonpayable / payable)
  async transfer(to: \`0x\${string}\`, amount: bigint): Promise<TransactionResult> {
    return this._contract.transfer(to, amount)
  }
}`}
        />
        <CodeEditor
          filename="useMyToken.ts  (auto-generated)"
          code={`import { useReadContract, useWriteContract } from "@awarizon/react"

// Auto-generated read hook
export function useReadBalanceOf(owner: \`0x\${string}\`) {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi:     MYTOKEN_ABI,
    method:  "balanceOf",
    args:    [owner],
  })
}

// Auto-generated write hook
export function useWriteTransfer() {
  return useWriteContract({
    address: CONTRACT_ADDRESS,
    abi:     MYTOKEN_ABI,
    method:  "transfer",
  })
}`}
        />
        <p className="text-[13px] text-muted mb-2">
          You can also generate from the{' '}
          <Link href="/dashboard/codegen" className="text-accent hover:underline">Code Generator in your dashboard</Link>
          {' '}— paste an ABI and download the files.
        </p>
      </section>

      {/* ── Chains ──────────────────────────────────────────── */}
      <section id="chains">
        <SectionTitle id="chains">Supported Chains</SectionTitle>
        <Sub>Pass the chain ID string to <code className="font-mono text-accent text-[13px]">new AwarizonWeb3()</code> or <code className="font-mono text-accent text-[13px]">{'<AwarizonProvider>'}</code>.</Sub>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#1E1E1E] mt-4 mb-4">
          {[
            { id: 'base',      name: 'Base',          tag: 'Recommended' },
            { id: 'ethereum',  name: 'Ethereum',       tag: 'Mainnet'     },
            { id: 'polygon',   name: 'Polygon',        tag: 'PoS'         },
            { id: 'arbitrum',  name: 'Arbitrum One',   tag: 'L2'          },
            { id: 'optimism',  name: 'Optimism',       tag: 'L2'          },
            { id: 'bnb',       name: 'BNB Chain',      tag: 'BSC'         },
            { id: 'avalanche', name: 'Avalanche',      tag: 'C-Chain'     },
            { id: 'zksync',    name: 'zkSync Era',     tag: 'ZK-L2'       },
            { id: 'linea',     name: 'Linea',          tag: 'ZK-L2'       },
          ].map(c => (
            <div key={c.id} className="bg-[#0A0A0A] px-4 py-3">
              <code className="font-mono text-[12px] block mb-0.5" style={{ color: '#CE9178' }}>{`"${c.id}"`}</code>
              <span className="font-body text-[12px] text-dim">{c.name} — {c.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Errors ──────────────────────────────────────────── */}
      <section id="errors">
        <SectionTitle id="errors">Error Handling</SectionTitle>
        <Sub>The SDK exports typed error classes. Catch them specifically for targeted recovery.</Sub>
        <CodeEditor
          lang="ts"
          code={`import {
  AwarizonError, // base — catches any SDK error
  AuthError,     // invalid or revoked API key
  ChainError,    // transaction reverted or RPC error
  TimeoutError,  // exceeded the configured timeout
} from "@awarizon/web3"

try {
  const tx = await contract.transfer(to, amount)
  await tx.wait()
} catch (err) {
  if (err instanceof AuthError) {
    // Redirect to /dashboard/api-keys to regenerate
    console.error("Auth failed:", err.message)
  } else if (err instanceof ChainError) {
    // Smart contract reverted
    console.error("Revert reason:", err.reason) // e.g. "ERC20: insufficient balance"
    console.error("Error code:",    err.code)
  } else if (err instanceof TimeoutError) {
    console.error("Timed out after", err.duration, "ms")
  } else if (err instanceof AwarizonError) {
    console.error("SDK error:", err.message)
  }
}`}
        />
      </section>

      {/* ── TypeScript Types ─────────────────────────────────── */}
      <section id="types">
        <SectionTitle id="types">TypeScript Types</SectionTitle>
        <Sub>All exported types from <code className="font-mono text-accent text-[13px]">@awarizon/web3</code> and <code className="font-mono text-accent text-[13px]">@awarizon/react</code>.</Sub>
        <CodeEditor
          lang="ts"
          code={`import type {
  AwarizonConfig,
  SupportedChain,
  ContractInstance,
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
      <div className="mt-16 pt-6 border-t border-[#1A1A1A] flex flex-wrap gap-5">
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
          NPM ↗
        </a>
      </div>
    </div>
  )
}
