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

function StepHeading({ id, n, title }: { id: string; n: string; title: string }) {
  return (
    <div id={id} className="flex items-center gap-3 mt-10 mb-2 scroll-mt-20">
      <span
        className="font-mono text-[9px] tracking-widest border border-accent/40 text-accent/80 px-1.5 py-0.5 flex-shrink-0"
        style={{ lineHeight: 1.5 }}
      >
        {n}
      </span>
      <h3 className="font-display font-semibold text-white text-base">{title}</h3>
    </div>
  )
}

function Callout({ icon, children, variant = 'info' }: {
  icon: string
  children: React.ReactNode
  variant?: 'tip' | 'warn' | 'info'
}) {
  const styles: Record<string, string> = {
    tip:  'border-accent/25 bg-accent/5',
    warn: 'border-orange-500/30 bg-orange-500/5',
    info: 'border-sky-500/25 bg-sky-500/5',
  }
  return (
    <div className={`border flex gap-3 px-4 py-3 my-3 ${styles[variant]}`}>
      <span className="text-sm flex-shrink-0 mt-0.5">{icon}</span>
      <p className="font-body text-[13px] text-muted leading-relaxed">{children}</p>
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { pkg: '@awarizon/web3',         desc: 'Core SDK. Node.js, browser, Edge runtimes.' },
              { pkg: '@awarizon/react',         desc: 'React 18+ hooks for reads, writes, events.' },
              { pkg: '@awarizon/react-native',  desc: 'Mobile SDK. Expo and bare React Native.' },
              { pkg: '@awarizon/cli',           desc: 'Codegen CLI. TypeScript or JavaScript output.' },
            ].map(({ pkg, desc }) => (
              <div key={pkg}>
                <code className="font-mono text-[11px] block mb-0.5" style={{ color: '#CE9178' }}>{pkg}</code>
                <span className="font-body text-[12px] text-dim">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Setup Guide ─────────────────────────────────────── */}
      <section id="setup">
        <SectionTitle id="setup">Setup Guide</SectionTitle>
        <Sub>Five steps from zero to live blockchain data. Follow them in order — each one builds on the last.</Sub>

        {/* Step 1 — API Key */}
        <StepHeading id="setup-apikey" n="STEP 1" title="Get your API key" />
        <Sub>Every SDK call is authenticated with an API key. It links your usage to your account and unlocks the full feature set.</Sub>
        <div className="border border-[#1E1E1E] bg-[#0A0A0A] p-4 my-3">
          <div className="font-mono text-[9px] text-dim tracking-widest mb-2">KEY FORMAT</div>
          <code className="font-mono text-[13px]" style={{ color: '#CE9178' }}>awz_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx</code>
          <p className="font-body text-[12px] text-dim mt-2 leading-relaxed">
            Go to your{' '}
            <Link href="/dashboard/api-keys" className="text-accent hover:underline">dashboard → API Keys</Link>
            {' '}→ click <strong className="text-muted font-semibold">Create key</strong>. Copy it immediately — it will not be shown again.
          </p>
        </div>
        <Callout icon="⚠️" variant="warn">
          Never commit your API key to Git or paste it directly in source files. Store it as an environment variable and ensure <code className="font-mono text-[12px]">.env</code> is in your <code className="font-mono text-[12px]">.gitignore</code>.
        </Callout>

        {/* Step 2 — Install */}
        <StepHeading id="setup-install" n="STEP 2" title="Install the right package" />
        <Sub>Pick your track below. You can install more packages any time — they are fully independent.</Sub>

        <div className="border border-[#1E1E1E] bg-[#0A0A0A] mt-3 mb-3">
          <div className="px-4 py-2.5 border-b border-[#1E1E1E] flex items-center gap-2">
            <span className="font-mono text-[9px] tracking-widest text-accent/70">TRACK A</span>
            <span className="font-mono text-[9px] text-dim tracking-wide">— Node.js · scripts · backend · Vite (non-React)</span>
          </div>
          <div className="p-4">
            <Sub>Core SDK only. Works in Node 18+, Deno, Bun, Edge runtimes, and browser bundles.</Sub>
            <ShellBlock command="npm install @awarizon/web3" label="CORE SDK" />
          </div>
        </div>

        <div className="border border-[#1E1E1E] bg-[#0A0A0A] mb-3">
          <div className="px-4 py-2.5 border-b border-[#1E1E1E] flex items-center gap-2">
            <span className="font-mono text-[9px] tracking-widest text-accent/70">TRACK B</span>
            <span className="font-mono text-[9px] text-dim tracking-wide">— React · Next.js · Vite React (requires React 18+)</span>
          </div>
          <div className="p-4">
            <Sub>Installs the core SDK and the React hooks package together. One command, everything you need.</Sub>
            <ShellBlock command="npm install @awarizon/web3 @awarizon/react" label="SDK + REACT HOOKS" />
          </div>
        </div>

        <div className="border border-[#1E1E1E] bg-[#0A0A0A] mb-3">
          <div className="px-4 py-2.5 border-b border-[#1E1E1E] flex items-center gap-2">
            <span className="font-mono text-[9px] tracking-widest text-accent/70">TRACK C</span>
            <span className="font-mono text-[9px] text-dim tracking-wide">— Expo · React Native (Expo SDK 49+ or bare RN 0.74+)</span>
          </div>
          <div className="p-4">
            <Sub>Adds secure wallet key storage (iOS Keychain / Android Keystore) and mobile-optimised wallet hooks.</Sub>
            <ShellBlock command="npm install @awarizon/react-native expo-secure-store" label="MOBILE" />
          </div>
        </div>

        <div className="border border-[#1E1E1E] bg-[#0A0A0A] mb-3">
          <div className="px-4 py-2.5 border-b border-[#1E1E1E] flex items-center gap-2">
            <span className="font-mono text-[9px] tracking-widest text-dim">OPTIONAL</span>
            <span className="font-mono text-[9px] text-dim tracking-wide">— CLI code generation (install globally once)</span>
          </div>
          <div className="p-4">
            <Sub>Generates a fully typed contract client and React hooks from any ABI file. Use it to skip writing boilerplate for custom contracts.</Sub>
            <ShellBlock command="npm install -g @awarizon/cli" label="CLI (GLOBAL)" />
          </div>
        </div>

        {/* Step 3 — Env Variable */}
        <StepHeading id="setup-env" n="STEP 3" title="Store your key as an environment variable" />
        <Sub>Create a <code className="font-mono text-accent text-[13px]">.env</code> file in your project root and add your key. Your framework loads it automatically.</Sub>
        <CodeEditor
          filename=".env  ·  Node.js, Vite, scripts"
          code={`# Loaded via process.env — never sent to the browser
AWARIZON_API_KEY=awz_live_...`}
        />
        <CodeEditor
          filename=".env.local  ·  Next.js"
          code={`# NEXT_PUBLIC_ exposes the value to browser bundles.
# Use this only for public-facing read-only API keys.
NEXT_PUBLIC_AWARIZON_API_KEY=awz_live_...`}
        />
        <Callout icon="💡" variant="tip">
          Create a <code className="font-mono text-[12px]">.env.example</code> file with placeholder values and commit that instead. Other developers on your team will know which variables are required without ever seeing the real key.
        </Callout>

        {/* Step 4a — Node.js / Scripts */}
        <StepHeading id="setup-vanilla" n="STEP 4A" title="Initialize — Node.js / Scripts / Backend" />
        <Sub>
          Create the SDK instance once in a shared file and export it. Every other file imports from there — the connection pool is reused automatically.
        </Sub>
        <CodeEditor
          filename="lib/awarizon.ts"
          code={`import { AwarizonWeb3 } from "@awarizon/web3"

export const awarizon = new AwarizonWeb3({
  chain:  "base",                          // the EVM chain to connect to
  apiKey: process.env.AWARIZON_API_KEY!,   // loaded from .env
})

// Import this file anywhere you need blockchain access:
// import { awarizon } from "@/lib/awarizon"`}
        />
        <Callout icon="💡" variant="tip">
          Not sure which chain to pick? Start with <code className="font-mono text-[12px]">"base-sepolia"</code> — it is a free test network where transactions cost no real money. Switch to <code className="font-mono text-[12px]">"base"</code> when you are ready for production.
        </Callout>
        <div className="border border-[#1E1E1E] bg-[#0A0A0A] mb-2 mt-3">
          <div className="font-mono text-[9px] text-dim tracking-widest px-4 py-2 border-b border-[#1E1E1E]">AVAILABLE CHAINS</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#1E1E1E]">
            {[
              ['"base"',            'Recommended for new projects'],
              ['"base-sepolia"',    'Base testnet — free, no real funds'],
              ['"ethereum"',        'Ethereum mainnet'],
              ['"sepolia"',         'Ethereum testnet'],
              ['"polygon"',         'Polygon PoS mainnet'],
              ['"arbitrum"',        'Arbitrum One L2'],
              ['"optimism"',        'Optimism L2'],
              ['"bnb"',             'BNB Smart Chain'],
              ['"avalanche"',       'Avalanche C-Chain'],
            ].map(([id, desc]) => (
              <div key={id} className="bg-[#0A0A0A] px-3 py-2.5">
                <code className="font-mono text-[11px] block mb-0.5" style={{ color: '#CE9178' }}>{id}</code>
                <span className="font-body text-[11px] text-dim leading-tight">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4b — React / Next.js */}
        <StepHeading id="setup-react" n="STEP 4B" title="Initialize — React / Next.js" />
        <Sub>
          React uses a <strong className="text-muted font-semibold">Provider</strong> pattern. You create the SDK instance once and wrap your app with{' '}
          <code className="font-mono text-accent text-[13px]">AwarizonProvider</code> — every hook in every component automatically gets access to it.
        </Sub>

        <p className="font-mono text-[10px] tracking-widest text-dim mt-5 mb-1">1 of 3 — Create the SDK instance</p>
        <CodeEditor
          filename="lib/awarizon.ts"
          code={`import { AwarizonWeb3 } from "@awarizon/web3"

// Create OUTSIDE of any component — never recreated on re-renders
export const awarizon = new AwarizonWeb3({
  chain:  "base",
  apiKey: process.env.NEXT_PUBLIC_AWARIZON_API_KEY!,
})`}
        />

        <p className="font-mono text-[10px] tracking-widest text-dim mt-5 mb-1">2 of 3 — Create a Providers wrapper (Next.js App Router needs <code className="font-mono text-[10px]">"use client"</code>)</p>
        <CodeEditor
          filename="components/Providers.tsx"
          code={`"use client"
import { AwarizonProvider } from "@awarizon/react"
import { awarizon } from "@/lib/awarizon"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AwarizonProvider awarizon={awarizon}>
      {children}
    </AwarizonProvider>
  )
}

// If you are on Vite React (no App Router) you can skip this file
// and wrap directly in main.tsx or App.tsx:
//
// import { AwarizonProvider } from "@awarizon/react"
// import { awarizon } from "./lib/awarizon"
//
// <AwarizonProvider awarizon={awarizon}><App /></AwarizonProvider>`}
        />

        <p className="font-mono text-[10px] tracking-widest text-dim mt-5 mb-1">3 of 3 — Add the Provider to your root layout</p>
        <CodeEditor
          filename="app/layout.tsx  (Next.js App Router)"
          code={`import { Providers } from "@/components/Providers"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

// Done. Every component inside <Providers> can now call useToken(),
// useNFT(), useReadContract(), etc. — no prop drilling needed.`}
        />

        {/* Step 5 — First Call */}
        <StepHeading id="setup-first" n="STEP 5" title="Make your first call" />
        <Sub>
          Reading blockchain data requires <strong className="text-muted font-semibold">no wallet and no gas</strong>.
          You can query any contract on any chain right now, instantly.
        </Sub>

        <p className="font-mono text-[10px] tracking-widest text-dim mt-5 mb-1">Node.js / Script</p>
        <CodeEditor
          filename="scripts/check-balance.ts"
          code={`import { awarizon } from "./lib/awarizon"

// USDC on Base mainnet — no ABI file needed
const usdc = await awarizon.erc20("0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913")

const symbol   = await usdc.symbol()   // "USDC"
const decimals = await usdc.decimals() // 6

// Check any wallet address
const raw       = await usdc.balanceOf("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")
const formatted = Number(raw) / 10 ** decimals

console.log(\`Balance: \${formatted} \${symbol}\`)
// → "Balance: 1234.56 USDC"

// Reading state costs nothing — no gas, no wallet, no transaction`}
        />

        <p className="font-mono text-[10px] tracking-widest text-dim mt-5 mb-1">React component</p>
        <CodeEditor
          filename="components/USDCBalance.tsx"
          code={`import { useState, useEffect } from "react"
import { useToken } from "@awarizon/react"

// USDC on Base mainnet
const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"

export function USDCBalance({ wallet }: { wallet: \`0x\${string}\` }) {
  const { symbol, decimals, balanceOf, isLoading } = useToken(USDC_BASE)
  const [balance, setBalance] = useState<string>("…")

  useEffect(() => {
    if (decimals === null) return
    balanceOf(wallet)
      .then(raw => setBalance((Number(raw) / 10 ** decimals).toFixed(2)))
  }, [wallet, balanceOf, decimals])

  if (isLoading) return <p>Loading token…</p>

  return <p>Balance: {balance} {symbol}</p>
  //          → "Balance: 1234.56 USDC"
}`}
        />

        <Callout icon="💡" variant="tip">
          Token amounts are always stored as raw integers on-chain — no decimal point. 1 USDC is <code className="font-mono text-[12px]">1_000_000n</code> because USDC has 6 decimals. Always divide by <code className="font-mono text-[12px]">{"10 ** decimals"}</code> before displaying to users.
        </Callout>

        <Callout icon="ℹ️" variant="info">
          To <strong>send</strong> transactions (transfers, minting, staking) you also need a wallet connected. See the Writing transactions section below for the full write flow.
        </Callout>
      </section>

      {/* ── Quick Start ─────────────────────────────────────── */}
      <section id="quickstart">
        <SectionTitle id="quickstart">Quick Start</SectionTitle>
        <Sub>Initialise the SDK, interact with an ERC-20 token with zero ABI boilerplate, and send a transaction.</Sub>
        <CodeEditor
          filename="quickstart.ts"
          code={`import { AwarizonWeb3 } from "@awarizon/web3"

// 1. Initialise with your chain and API key
const awarizon = new AwarizonWeb3({
  chain:  "base",
  apiKey: process.env.AWARIZON_API_KEY, // awz_live_...
})

// 2. ERC-20 token — no ABI import needed
const usdc = await awarizon.erc20("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")

// 3. Read on-chain state (no gas, no wallet)
const balance = await usdc.balanceOf("0xYourAddress")
console.log(balance)           // 1000000n  (USDC has 6 decimals)
console.log(await usdc.symbol())     // "USDC"
console.log(await usdc.decimals())   // 6

// 4. Write a transaction
const tx = await usdc.transfer("0xRecipient", 500_000n)
console.log("hash:", tx.hash)  // 0x...

// 5. Or load any custom contract with your own ABI
const staking = await awarizon.contract({ address: "0x...", abi: STAKING_ABI })
await staking.stake(100n)`}
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

const awarizon = new AwarizonWeb3({
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

        {/* ERC Standard Clients */}
        <h3 id="erc-standards" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          ERC Standard Clients
        </h3>
        <Sub>
          Load ERC-20, ERC-721, and ERC-1155 contracts with zero ABI imports. Every method is fully typed — your editor autocompletes the entire standard interface.
        </Sub>
        <CodeEditor
          lang="ts"
          code={`// ── ERC-20 Token ─────────────────────────────────────────────────────────────
const usdc = await awarizon.erc20("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")

const name     = await usdc.name()              // "USD Coin"
const symbol   = await usdc.symbol()            // "USDC"
const decimals = await usdc.decimals()          // 6
const supply   = await usdc.totalSupply()       // bigint
const balance  = await usdc.balanceOf(owner)    // bigint
const allowed  = await usdc.allowance(owner, spender)

await usdc.transfer(recipient, 1_000_000n)      // 1 USDC
await usdc.approve(spender, 500_000n)
await usdc.transferFrom(from, to, 1_000_000n)

// ── ERC-721 NFT Collection ────────────────────────────────────────────────────
const nft = await awarizon.erc721("0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D")

const owner = await nft.ownerOf(1n)             // \`0x\${string}\`
const uri   = await nft.tokenURI(1n)            // "ipfs://..."
const count = await nft.balanceOf(wallet)       // bigint

await nft.safeTransferFrom(from, to, 1n)
await nft.approve(operator, 1n)
await nft.setApprovalForAll(operator, true)

// ── ERC-1155 Multi-Token ──────────────────────────────────────────────────────
const items = await awarizon.erc1155("0x...")

const qty     = await items.balanceOf(user, 42n)        // bigint
const uri     = await items.uri(42n)                    // metadata URI
const batched = await items.balanceOfBatch([u1, u2], [1n, 2n])

await items.safeTransferFrom(from, to, 42n, 1n, "0x")
await items.setApprovalForAll(operator, true)`}
        />

        {/* Contract Registry */}
        <h3 id="registry" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          Contract Registry
        </h3>
        <Sub>
          Register contracts once by name at startup. Reference them anywhere in your app without repeating addresses or ABIs. Chains are
          automatically taken from the SDK instance.
        </Sub>
        <CodeEditor
          lang="ts"
          code={`// Register at startup — returns \`this\` for chaining
awarizon
  .register("USDC",  { address: "0x...", abi: erc20Abi  })
  .register("Vault", { address: "0x...", abi: vaultAbi  })
  .register("NFT",   { address: "0x...", abi: erc721Abi })

// Use by name anywhere — address and ABI never repeated again
const usdc  = await awarizon.use("USDC")
const vault = await awarizon.use("Vault")
const nft   = await awarizon.use("NFT")

await usdc.transfer(recipient, 100_000n)
await vault.deposit(1_000n)

// Inspect or clean up
awarizon.registeredContracts() // ["USDC", "Vault", "NFT"]
awarizon.unregister("Vault")`}
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

        {/* Built-in Wallet */}
        <h3 id="wallet-builtin" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          Built-in Wallet
        </h3>
        <Sub>
          The SDK ships a full self-custodial wallet — generate new wallets, import from a 12 or 24-word BIP-39 mnemonic,
          or load from a raw private key. No browser extension or external library required.
        </Sub>
        <CodeEditor
          lang="ts"
          code={`// ── Create a brand-new wallet ─────────────────────────────────────────────────
const created = await awarizon.wallet.create()
console.log(created.address)    // "0xAbCd..."
console.log(created.privateKey) // "0x..."  ← returned once — store it securely

// ── Import from a BIP-39 mnemonic (12 or 24 words) ────────────────────────────
const fromPhrase = await awarizon.wallet.importMnemonic(
  "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12",
  0, // optional HD account index (default 0)
)
console.log(fromPhrase.address) // "0x..."

// ── Import from a hex private key ─────────────────────────────────────────────
const fromKey = await awarizon.wallet.importPrivateKey("0x...")
console.log(fromKey.address) // "0x..."

// Once any wallet is loaded, all write calls use it automatically:
const tx = await usdc.transfer(recipient, 1_000_000n)
console.log("txHash:", tx.hash)`}
        />
        <div className="border border-[#1E1E1E] bg-[#0A0A0A] mt-3 mb-3">
          <div className="font-mono text-[9px] text-dim tracking-widest px-4 py-2 border-b border-[#1E1E1E]">WALLET ACCESSORS</div>
          <PropRow name="wallet.address()"           type="Address"    desc="Returns the active wallet address. Throws WalletNotConnectedError if no wallet is loaded." />
          <PropRow name="wallet.isConnected()"       type="boolean"    desc="True when any wallet — internal or external — is active." />
          <PropRow name="wallet.hasInternalWallet()" type="boolean"    desc="True when a locally generated or imported key/mnemonic wallet is loaded." />
          <PropRow name="wallet.hasExternalWallet()" type="boolean"    desc="True when an external WalletClient (wagmi, RainbowKit) has been injected." />
          <PropRow name="wallet.disconnect()"        type="void"       desc="Clears all wallet state — both internal keys and external connections." />
          <PropRow name="getWalletInfo()"            type="WalletInfo" desc="Returns { address, chain, isExternal } — useful for displaying connected wallet state." />
        </div>
        <Callout icon="⚠️" variant="warn">
          Never store private keys or mnemonic phrases in plaintext, localStorage, or client-side variables.
          On mobile use <code className="font-mono text-[12px]">expo-secure-store</code> via <code className="font-mono text-[12px]">@awarizon/react-native</code>.
          On server, load from environment variables only.
        </Callout>

        {/* External Wallets */}
        <h3 id="wallet-external" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          External Wallets — wagmi · RainbowKit · WalletConnect
        </h3>
        <Sub>
          Inject any viem-compatible WalletClient from wagmi, RainbowKit, or a custom EIP-1193 provider.
          External signers always take priority over internal wallets — the user&apos;s connected wallet is used for all writes.
        </Sub>

        <p className="font-mono text-[10px] tracking-widest text-dim mt-5 mb-1">wagmi — useWalletClient()</p>
        <CodeEditor
          lang="tsx"
          code={`// npm install wagmi viem @tanstack/react-query
import { useWalletClient } from "wagmi"
import { useEffect } from "react"
import { useSDK } from "@awarizon/react"

// Place this component inside both <WagmiProvider> and <AwarizonProvider>
function WagmiConnector() {
  const awarizon = useSDK()
  const { data: walletClient } = useWalletClient()

  useEffect(() => {
    if (walletClient) {
      awarizon.connectWallet(walletClient) // all writes now use this wallet
    } else {
      awarizon.disconnectWallet()
    }
  }, [walletClient, awarizon])

  return null
}`}
        />

        <p className="font-mono text-[10px] tracking-widest text-dim mt-5 mb-1">RainbowKit — same wagmi pattern + connect button</p>
        <CodeEditor
          lang="tsx"
          code={`// npm install @rainbow-me/rainbowkit wagmi viem @tanstack/react-query
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useWalletClient } from "wagmi"
import { useEffect } from "react"
import { useSDK } from "@awarizon/react"

// RainbowKit is built on wagmi — the injection pattern is identical
function RainbowConnector() {
  const awarizon = useSDK()
  const { data: walletClient } = useWalletClient()

  useEffect(() => {
    if (walletClient) awarizon.connectWallet(walletClient)
    else              awarizon.disconnectWallet()
  }, [walletClient, awarizon])

  return null // renders nothing — just syncs the wallet state
}

function Navbar() {
  return (
    <nav>
      {/* RainbowKit handles MetaMask, Coinbase Wallet, WalletConnect, and more */}
      <ConnectButton />
      <RainbowConnector />  {/* syncs the selection into awarizon */}
    </nav>
  )
}`}
        />

        <p className="font-mono text-[10px] tracking-widest text-dim mt-5 mb-1">Constructor signer — pre-connected at init time</p>
        <CodeEditor
          lang="ts"
          code={`// If you already have a WalletClient at init time, pass it directly.
// Equivalent to calling awarizon.connectWallet(signer) after construction.
const awarizon = new AwarizonWeb3({
  chain:  "base",
  apiKey: "awz_live_...",
  signer: myWalletClient, // any viem WalletClient
})`}
        />

        {/* Multicall */}
        <h3 id="multicall" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          Multicall — batch reads
        </h3>
        <Sub>
          Batch multiple view/pure reads into a single RPC round-trip via multicall3.
          Critical for dashboards that need many values at once — 10 reads becomes 1 request.
        </Sub>
        <CodeEditor
          lang="ts"
          code={`// 3 reads → 1 network request
const [balance, symbol, decimals] = await awarizon.multicall([
  { address: USDC, abi: erc20Abi, method: "balanceOf",  args: [userAddress] },
  { address: USDC, abi: erc20Abi, method: "symbol"                          },
  { address: USDC, abi: erc20Abi, method: "decimals"                        },
])

console.log(balance)   // 1000000n
console.log(symbol)    // "USDC"
console.log(decimals)  // 6n

// Dashboard pattern — fetch a whole portfolio in one shot
const [ethBal, usdcBal, daiSupply, nftOwner] = await awarizon.multicall([
  { address: WETH,  abi: erc20Abi,  method: "balanceOf", args: [wallet] },
  { address: USDC,  abi: erc20Abi,  method: "balanceOf", args: [wallet] },
  { address: DAI,   abi: erc20Abi,  method: "totalSupply"               },
  { address: NFT,   abi: erc721Abi, method: "ownerOf",   args: [1n]     },
])`}
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
        <Sub>
          Wraps your component tree and makes the SDK available to every hook inside it.
          Accepts a single <code className="font-mono text-accent text-[13px]">awarizon</code> prop — a configured{' '}
          <code className="font-mono text-accent text-[13px]">AwarizonWeb3</code> instance created outside the component tree.
        </Sub>
        <CodeEditor
          filename="components/Providers.tsx"
          code={`"use client"
import { AwarizonProvider } from "@awarizon/react"
import { AwarizonWeb3 } from "@awarizon/web3"

// Create the instance OUTSIDE any component — never re-created on re-renders
const awarizon = new AwarizonWeb3({
  chain:  "base",
  apiKey: process.env.NEXT_PUBLIC_AWARIZON_API_KEY!,
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AwarizonProvider awarizon={awarizon}>
      {children}
    </AwarizonProvider>
  )
}`}
        />
        <div className="border border-[#1E1E1E] bg-[#0A0A0A] mb-4">
          <PropRow name="awarizon" type="AwarizonWeb3" req desc="A configured SDK instance. Create it once outside the component tree and pass it here." />
          <PropRow name="children" type="ReactNode"    req desc="The component subtree that can access SDK hooks." />
        </div>

        {/* useWallet */}
        <h3 id="use-wallet" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          useWallet
        </h3>
        <Sub>
          Manage wallet state reactively. Supports creating a fresh wallet, importing from mnemonic or private key,
          and injecting an external WalletClient — all with loading and error state built in.
        </Sub>
        <CodeEditor
          lang="tsx"
          code={`import { useWallet } from "@awarizon/react"

function WalletPanel() {
  const {
    address,          // string | null — active wallet address
    isConnected,      // boolean
    isLoading,        // true during async wallet operations
    error,            // Error | null
    create,           // () => Promise<void>
    importMnemonic,   // (phrase: string, accountIndex?: number) => Promise<void>
    importPrivateKey, // (key: \`0x\${string}\`) => Promise<void>
    connect,          // (walletClient: WalletClient) => void — external wallets
    disconnect,       // () => void
  } = useWallet()

  if (isLoading) return <p>Loading…</p>

  if (!isConnected) {
    return (
      <div>
        <button onClick={create}>Create new wallet</button>
        <button onClick={() => importMnemonic("word1 word2 ... word12")}>
          Import from phrase
        </button>
      </div>
    )
  }

  return (
    <div>
      <p>Connected: {address}</p>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      <button onClick={disconnect}>Disconnect</button>
    </div>
  )
}`}
        />
        <div className="border border-[#1E1E1E] bg-[#0A0A0A] mt-3 mb-3">
          <div className="font-mono text-[9px] text-dim tracking-widest px-4 py-2 border-b border-[#1E1E1E]">RETURN VALUES</div>
          <PropRow name="address"          type="string | null"  desc="Active wallet address, or null when no wallet is connected." />
          <PropRow name="isConnected"      type="boolean"        desc="True when any wallet (internal or external) is active." />
          <PropRow name="isLoading"        type="boolean"        desc="True during create, import, or connect operations." />
          <PropRow name="error"            type="Error | null"   desc="Last wallet operation error. Cleared on the next successful operation." />
          <PropRow name="create"           type="() => Promise"  desc="Generate a fresh wallet keypair and activate it." />
          <PropRow name="importMnemonic"   type="fn"             desc="(phrase, index?) → restore from a BIP-39 mnemonic and activate." />
          <PropRow name="importPrivateKey" type="fn"             desc="(key) → load from a hex private key and activate." />
          <PropRow name="connect"          type="fn"             desc="(walletClient) → inject an external WalletClient (wagmi, RainbowKit)." />
          <PropRow name="disconnect"       type="() => void"     desc="Clear all wallet state and set address to null." />
        </div>

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
        {/* useToken */}
        <h3 id="use-token" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          useToken
        </h3>
        <Sub>Zero-ABI hook for ERC-20 tokens. Fetches name, symbol, decimals, and total supply on mount. Exposes fully typed read and write helpers.</Sub>
        <CodeEditor
          lang="tsx"
          code={`import { useToken } from "@awarizon/react"

function TokenCard({ address }: { address: \`0x\${string}\` }) {
  const {
    name, symbol, decimals, totalSupply,
    isLoading, error,
    balanceOf, transfer, approve,
  } = useToken(address)

  const [balance, setBalance] = useState<bigint | null>(null)

  useEffect(() => {
    balanceOf(userAddress).then(setBalance)
  }, [balanceOf])

  if (isLoading) return <span>Loading…</span>
  if (error)     return <span>{error.message}</span>

  return (
    <div>
      <p>{name} ({symbol}) — {decimals} decimals</p>
      <p>Balance: {balance?.toString()}</p>
      <button onClick={() => transfer(recipient, 1_000_000n)}>
        Send 1 {symbol}
      </button>
    </div>
  )
}`}
        />

        {/* useNFT */}
        <h3 id="use-nft" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          useNFT
        </h3>
        <Sub>Zero-ABI hook for ERC-721 collections. Loads collection name and symbol on mount. Exposes all standard ownership and transfer helpers.</Sub>
        <CodeEditor
          lang="tsx"
          code={`import { useNFT } from "@awarizon/react"

function NFTCard({ address, tokenId }: { address: \`0x\${string}\`; tokenId: bigint }) {
  const {
    name, symbol, isLoading,
    ownerOf, tokenURI, safeTransferFrom,
  } = useNFT(address)

  const [owner, setOwner] = useState<string | null>(null)
  const [uri,   setUri]   = useState<string | null>(null)

  useEffect(() => {
    Promise.all([ownerOf(tokenId), tokenURI(tokenId)])
      .then(([o, u]) => { setOwner(o); setUri(u) })
  }, [tokenId, ownerOf, tokenURI])

  if (isLoading) return <span>Loading collection…</span>

  return (
    <div>
      <p>{name} #{tokenId.toString()} ({symbol})</p>
      <p>Owner: {owner}</p>
      <img src={uri ?? ''} alt="NFT" />
      <button onClick={() => safeTransferFrom(owner!, recipient, tokenId)}>
        Transfer
      </button>
    </div>
  )
}`}
        />

        {/* useNativeBalance */}
        <h3 id="use-native" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          useNativeBalance
        </h3>
        <Sub>
          Fetch the native currency balance (ETH, MATIC, BNB…) for any address.
          Pass a <code className="font-mono text-accent text-[13px]">pollingInterval</code> in ms to keep it live.
        </Sub>
        <CodeEditor
          lang="tsx"
          code={`import { useNativeBalance } from "@awarizon/react"

function WalletBalance({ address }: { address: \`0x\${string}\` }) {
  // Polls every 12 s — matches Ethereum's ~12 s block time
  const { formatted, balance, isLoading, refetch } = useNativeBalance(address, 12_000)

  if (isLoading) return <span>Loading…</span>

  return (
    <div>
      <p>{formatted} ETH</p>           {/* "1.2345"  — human-readable */}
      <p>{balance?.toString()} wei</p> {/* raw bigint */}
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}`}
        />
      </section>

      {/* ── CLI ─────────────────────────────────────────────── */}
      <section id="cli">
        <SectionTitle id="cli">@awarizon/cli — Code Generation</SectionTitle>
        <Sub>
          Generate a fully-typed contract client class and React hooks from any ABI file.
          Run once — the generated files work without the CLI installed in production.
        </Sub>
        <ShellBlock
          command="npx @awarizon/cli codegen --name MyToken --abi ./abi.json --address 0x... --out ./src/contracts"
          label="CLI — GENERATE FROM ABI"
        />

        <div className="border border-[#1E1E1E] bg-[#0A0A0A] mt-3 mb-4">
          <div className="font-mono text-[9px] text-dim tracking-widest px-4 py-2 border-b border-[#1E1E1E]">FLAGS</div>
          <PropRow name="--name / -n"  type="string"   req  desc='Contract name in PascalCase. Used as the generated class name — "MyToken" → MyTokenClient.' />
          <PropRow name="--abi / -a"   type="path"     req  desc="Path to the ABI JSON file (standard Solidity output or Hardhat artifact)." />
          <PropRow name="--address"    type="Address"       desc="Deployed contract address. Baked into the generated file so you never pass it at runtime." />
          <PropRow name="--out / -o"   type="path"          desc="Output directory. Defaults to the current working directory." />
          <PropRow name="--lang"       type="ts | js"       desc='Output language. "ts" for TypeScript (default), "js" for JavaScript.' />
          <PropRow name="--no-react"   type="flag"          desc="Skip generating the React hooks file — output the client class only." />
        </div>

        <p className="font-mono text-[10px] tracking-widest text-dim mt-4 mb-2">Two files are generated:</p>

        <CodeEditor
          filename="MyTokenClient.ts  (contract client — auto-generated)"
          code={`import { AwarizonWeb3 } from "@awarizon/web3"
import type { TransactionResult } from "@awarizon/web3"

const CONTRACT_ADDRESS = "0xYourDeployedAddress"

export class MyTokenClient {
  private _contract: any

  // Factory — use this instead of new MyTokenClient()
  static async create(awz: AwarizonWeb3): Promise<MyTokenClient> {
    const client = new MyTokenClient()
    client._contract = await awz.contract({ address: CONTRACT_ADDRESS, abi: ABI })
    return client
  }

  // ── Read methods (view / pure) ────────────────────────────────────────────────
  async balanceOf(owner: \`0x\${string}\`): Promise<bigint> {
    return this._contract.balanceOf(owner)
  }
  async symbol():   Promise<string>  { return this._contract.symbol()   }
  async decimals(): Promise<number>  { return this._contract.decimals() }

  // ── Write methods (nonpayable / payable) ──────────────────────────────────────
  async transfer(to: \`0x\${string}\`, amount: bigint): Promise<TransactionResult> {
    return this._contract.transfer(to, amount)
  }
  async approve(spender: \`0x\${string}\`, amount: bigint): Promise<TransactionResult> {
    return this._contract.approve(spender, amount)
  }
}`}
        />

        <CodeEditor
          filename="useMyToken.ts  (React hooks — auto-generated)"
          code={`import { useEffect } from "react"
import { useReadContract, useWriteContract, useContract } from "@awarizon/react"

const CONTRACT_ADDRESS = "0xYourDeployedAddress"

// ── Read hooks — auto-fetching, re-fetches when args change ───────────────────
export function useReadBalanceOf(owner: \`0x\${string}\`) {
  return useReadContract({
    address: CONTRACT_ADDRESS, abi: MYTOKEN_ABI,
    method: "balanceOf",       args: [owner],
  })
}
export function useReadSymbol() {
  return useReadContract({ address: CONTRACT_ADDRESS, abi: MYTOKEN_ABI, method: "symbol" })
}

// ── Write hooks — returns a write() callback ──────────────────────────────────
export function useWriteTransfer() {
  return useWriteContract({ address: CONTRACT_ADDRESS, abi: MYTOKEN_ABI, method: "transfer" })
}
export function useWriteApprove() {
  return useWriteContract({ address: CONTRACT_ADDRESS, abi: MYTOKEN_ABI, method: "approve" })
}

// ── Event hooks — subscribe/unsubscribe automatically on mount/unmount ────────
export function useMyTokenTransferEvent(handler: (log: any) => void) {
  const { contract } = useContract({ address: CONTRACT_ADDRESS, abi: MYTOKEN_ABI })
  useEffect(() => {
    if (!contract) return
    return contract.on("Transfer", handler) // returns the unsubscribe function
  }, [contract, handler])
}

// Usage:
// const { data: balance }   = useReadBalanceOf(userAddress)
// const { write: transfer } = useWriteTransfer()
// useMyTokenTransferEvent((log) => console.log("Transfer:", log.args))`}
        />

        <p className="font-mono text-[10px] tracking-widest text-dim mt-5 mb-1">awarizon info — show installed versions</p>
        <ShellBlock command="npx @awarizon/cli info" label="CLI — VERSION INFO" />
        <CodeEditor
          lang="sh"
          code={`@awarizon/cli         v1.1.0
@awarizon/web3        v1.1.0
@awarizon/react       v1.1.0
@awarizon/tx-engine   v1.1.0`}
        />

        <p className="text-[13px] text-muted mb-2">
          You can also generate from the{' '}
          <Link href="/dashboard/codegen" className="text-accent hover:underline">Code Generator in your dashboard</Link>
          {' '}— paste an ABI and download the files instantly.
        </p>
      </section>

      {/* ── @awarizon/react-native ──────────────────────────── */}
      <section id="react-native">
        <SectionTitle id="react-native">@awarizon/react-native</SectionTitle>
        <Sub>
          Mobile wallet management for Expo and bare React Native. Adds hardware-backed key storage
          (iOS Keychain / Android Keystore), automatic wallet restore on app launch, and React Native-safe async crypto.
        </Sub>

        <ShellBlock
          command="npm install @awarizon/react-native expo-secure-store"
          label="INSTALL"
        />
        <Callout icon="ℹ️" variant="info">
          Requires Expo SDK 49+ or bare React Native 0.74+. The core <code className="font-mono text-[12px]">@awarizon/web3</code> package is also required — install it following the Setup Guide above.
        </Callout>

        {/* Secure Storage */}
        <h3 id="rn-storage" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          Secure Storage Setup
        </h3>
        <Sub>
          <code className="font-mono text-accent text-[13px]">createSecureStorage</code> wraps{' '}
          <code className="font-mono text-accent text-[13px]">expo-secure-store</code> behind a simple adapter interface.
          Private keys are encrypted by the OS — never stored in plaintext on disk.
        </Sub>
        <CodeEditor
          lang="tsx"
          code={`import * as ExpoSecureStore from "expo-secure-store"
import { createSecureStorage } from "@awarizon/react-native"
import { AwarizonWeb3 } from "@awarizon/web3"

// Create the secure storage adapter — wrap the ExpoSecureStore module
const storage = createSecureStorage(ExpoSecureStore)

// Create the SDK instance (same as on web)
const awarizon = new AwarizonWeb3({
  chain:  "base",
  apiKey: process.env.EXPO_PUBLIC_AWARIZON_API_KEY!,
})

// Pass both to useRNWallet in your component (see below)`}
        />
        <Callout icon="💡" variant="tip">
          On iOS, keys are stored in the Keychain and survive app reinstalls by default. On Android, they are encrypted with the Android Keystore and tied to the app package. Neither platform writes the key to disk in plaintext.
        </Callout>

        {/* useRNWallet */}
        <h3 id="use-rn-wallet" className="font-display font-semibold text-white text-base mt-8 mb-1 scroll-mt-20">
          useRNWallet
        </h3>
        <Sub>
          The main hook for React Native. Handles wallet creation, import, and secure persistence.
          On every app launch, it automatically restores the last saved wallet from secure storage —
          no login screen needed.
        </Sub>
        <CodeEditor
          lang="tsx"
          code={`import { Text, View, Button } from "react-native"
import { useRNWallet, createSecureStorage } from "@awarizon/react-native"
import * as ExpoSecureStore from "expo-secure-store"
import { awarizon } from "./lib/awarizon"

const storage = createSecureStorage(ExpoSecureStore)

function WalletScreen() {
  const {
    address,          // string | null — active wallet address
    isConnected,      // boolean
    isLoading,        // true during create / import / auto-restore
    error,            // Error | null
    create,           // () => Promise<CreatedWallet> — saves key to secure storage
    importMnemonic,   // (phrase, accountIndex?) => Promise<void>
    importPrivateKey, // (key: \`0x\${string}\`) => Promise<void>
    deleteWallet,     // () => Promise<void> — removes from secure storage (logout)
  } = useRNWallet({
    awarizon,
    storage,          // required — the secure storage adapter
    walletId: "main", // optional — storage namespace (default: "default")
    autoRestore: true,// optional — restore on mount (default: true)
  })

  if (isLoading) return <Text>Loading wallet…</Text>

  if (!isConnected) {
    return (
      <View>
        <Button title="Create Wallet" onPress={create} />
        <Button
          title="Import from Phrase"
          onPress={() => importMnemonic("word1 word2 ... word12")}
        />
        {error && <Text style={{ color: "red" }}>{error.message}</Text>}
      </View>
    )
  }

  return (
    <View>
      <Text>Connected: {address}</Text>
      <Button title="Log Out" onPress={deleteWallet} />
    </View>
  )
}`}
        />

        <div className="border border-[#1E1E1E] bg-[#0A0A0A] mt-3 mb-3">
          <div className="font-mono text-[9px] text-dim tracking-widest px-4 py-2 border-b border-[#1E1E1E]">OPTIONS</div>
          <PropRow name="awarizon"    type="AwarizonWeb3"         req  desc="The SDK instance to attach the wallet to." />
          <PropRow name="storage"     type="SecureStorageAdapter" req  desc="Adapter created by createSecureStorage(ExpoSecureStore)." />
          <PropRow name="walletId"    type="string"                    desc='Storage namespace key. Use different IDs for multi-wallet apps. Default: "default".' />
          <PropRow name="autoRestore" type="boolean"                   desc="Auto-restore the last saved wallet from secure storage on mount. Default: true." />
        </div>

        <div className="border border-[#1E1E1E] bg-[#0A0A0A] mb-3">
          <div className="font-mono text-[9px] text-dim tracking-widest px-4 py-2 border-b border-[#1E1E1E]">RETURN VALUES</div>
          <PropRow name="address"          type="string | null"  desc="Active wallet address, or null when no wallet is loaded." />
          <PropRow name="isConnected"      type="boolean"        desc="True when a wallet is active (restored or newly created)." />
          <PropRow name="isLoading"        type="boolean"        desc="True during create, import, auto-restore, or deleteWallet." />
          <PropRow name="error"            type="Error | null"   desc="Last operation error. Cleared on the next successful operation." />
          <PropRow name="create"           type="() => Promise"  desc="Generate a fresh wallet. Private key is saved to secure storage immediately." />
          <PropRow name="importMnemonic"   type="fn"             desc="(phrase, index?) → import from BIP-39 mnemonic and save to secure storage." />
          <PropRow name="importPrivateKey" type="fn"             desc="(key) → import from hex private key and save to secure storage." />
          <PropRow name="deleteWallet"     type="() => Promise"  desc="Remove the wallet from secure storage and clear all state. Use this as your logout action." />
        </div>

        <Callout icon="💡" variant="tip">
          <strong>Auto-restore priority:</strong> on mount, <code className="font-mono text-[12px]">useRNWallet</code> checks for a saved private key first, then a saved mnemonic. If neither is found and <code className="font-mono text-[12px]">autoRestore</code> is true, the hook stays in a clean disconnected state — no error is thrown, no prompt required.
        </Callout>
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
        <Sub>
          The SDK exports typed error classes for targeted recovery. Simulation errors automatically surface the
          human-readable revert reason from the contract — no manual ABI decoding required.
        </Sub>
        <CodeEditor
          lang="ts"
          code={`import {
  SimulationError,        // contract reverted during simulation (before gas is spent)
  ContractExecutionError, // broadcast or receipt error
  GasEstimationError,     // gas estimation failed
  ApiKeyRequiredError,    // missing API key
  InvalidApiKeyError,     // revoked or malformed key
  UnsupportedChainError,  // chain string not recognised
  WalletNotConnectedError,// write attempted with no wallet
} from "@awarizon/web3"

try {
  await usdc.transfer(to, amount)
} catch (err) {
  if (err instanceof SimulationError) {
    // Revert reason is extracted automatically — no hex decoding needed
    console.error(err.message)
    // → "Simulation failed: transfer: ERC20: transfer amount exceeds balance"
    // → "Simulation failed: mint: MintLimitReached(500, 500)"  (custom errors too)
  } else if (err instanceof WalletNotConnectedError) {
    // Prompt user to connect a wallet
    console.error("No wallet connected")
  } else if (err instanceof InvalidApiKeyError) {
    // Redirect to /dashboard/api-keys
    console.error("API key invalid or revoked")
  } else if (err instanceof ContractExecutionError) {
    console.error("Execution failed:", err.message)
    console.error("Function:", err.functionName)
  }
}`}
        />
      </section>

      {/* ── TypeScript Types ─────────────────────────────────── */}
      <section id="types">
        <SectionTitle id="types">TypeScript Types</SectionTitle>
        <Sub>All exported types across the Awarizon SDK packages.</Sub>
        <CodeEditor
          lang="ts"
          code={`// ── @awarizon/web3 ───────────────────────────────────────────────────────────
import type {
  AwarizonConfig,
  ContractInstance,
  ContractRegistryEntry,
  TransactionResult,
  TransactionReceipt,
  Erc20Contract,      // typed interface for awarizon.erc20()
  Erc721Contract,     // typed interface for awarizon.erc721()
  Erc1155Contract,    // typed interface for awarizon.erc1155()
  ERC20_ABI,          // pre-bundled ABI — use in register() or contract()
  ERC721_ABI,
  ERC1155_ABI,
} from "@awarizon/web3"

interface AwarizonConfig {
  chain:    string        // chain alias string or viem Chain object
  apiKey:   string        // "awz_live_..."
  rpcUrl?:  string        // custom RPC endpoint override
  signer?:  WalletClient  // pre-connected external signer
}

interface ContractRegistryEntry {
  address: \`0x\${string}\`
  abi:     Abi
}

interface TransactionResult {
  hash:    \`0x\${string}\`
  receipt: TransactionReceipt
}

interface TransactionReceipt {
  blockNumber: bigint
  blockHash:   \`0x\${string}\`
  gasUsed:     bigint
  status:      "success" | "reverted"
}

interface WalletInfo {
  address:    \`0x\${string}\`
  chain:      string
  isExternal: boolean  // true for wagmi/RainbowKit, false for internal
}

// ── @awarizon/react ───────────────────────────────────────────────────────────
import type {
  UseWalletReturn,
  UseTokenReturn,
  UseNFTReturn,
  UseNativeBalanceReturn,
  UseReadContractReturn,
  UseWriteContractReturn,
} from "@awarizon/react"

interface UseWalletReturn {
  address: string | null;  isConnected: boolean
  isLoading: boolean;      error: Error | null
  create(): Promise<void>
  importMnemonic(phrase: string, accountIndex?: number): Promise<void>
  importPrivateKey(key: \`0x\${string}\`): Promise<void>
  connect(walletClient: WalletClient): void
  disconnect(): void
}

interface UseTokenReturn {
  name: string | null;  symbol: string | null
  decimals: number | null;  totalSupply: bigint | null
  isLoading: boolean;  error: Error | null
  balanceOf(owner: Address): Promise<bigint>
  allowance(owner: Address, spender: Address): Promise<bigint>
  transfer(to: Address, amount: bigint): Promise<TransactionResult>
  approve(spender: Address, amount: bigint): Promise<TransactionResult>
}

interface UseNFTReturn {
  name: string | null;  symbol: string | null
  isLoading: boolean;  error: Error | null
  ownerOf(tokenId: bigint): Promise<Address>
  tokenURI(tokenId: bigint): Promise<string>
  safeTransferFrom(from: Address, to: Address, tokenId: bigint): Promise<TransactionResult>
}

interface UseNativeBalanceReturn {
  balance: bigint | null;  formatted: string | null
  isLoading: boolean;  error: Error | null
  refetch(): Promise<void>
}

// ── @awarizon/react-native ────────────────────────────────────────────────────
import type {
  UseRNWalletReturn,
  UseRNWalletOptions,
  SecureStorageAdapter,
} from "@awarizon/react-native"

interface UseRNWalletOptions {
  awarizon:     AwarizonWeb3
  storage:      SecureStorageAdapter    // from createSecureStorage(ExpoSecureStore)
  walletId?:    string                  // storage namespace, default: "default"
  autoRestore?: boolean                 // restore on mount, default: true
}

interface UseRNWalletReturn {
  address: string | null;  isConnected: boolean
  isLoading: boolean;      error: Error | null
  create(): Promise<CreatedWallet>
  importMnemonic(phrase: string, accountIndex?: number): Promise<void>
  importPrivateKey(key: \`0x\${string}\`): Promise<void>
  deleteWallet(): Promise<void>  // removes from secure storage — use as logout
}

interface SecureStorageAdapter {
  getItem(key: string): Promise<string | null>
  setItem(key: string, value: string): Promise<void>
  deleteItem(key: string): Promise<void>
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
