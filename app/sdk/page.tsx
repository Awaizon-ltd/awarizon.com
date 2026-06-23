'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PageTransition from '@/components/motion/PageTransition'
import ScrollProvider from '@/components/motion/ScrollProvider'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import ChainBadge from '@/components/ui/ChainBadge'
import { CodeEditor, ShellBlock } from '@/components/docs/CodeEditor'
import ChainsMarquee from '@/components/ui/ChainsMarquee'

const ease = [0.16, 1, 0.3, 1] as const

// ─── Static data ──────────────────────────────────────────────────────────────

const PACKAGES = [
  {
    name:  '@awarizon/web3',
    badge: 'CORE',
    desc:  'Framework-agnostic EVM client. Reads, writes, events, multicall, gas estimation. Runs in Node.js, browser, and Edge runtimes.',
    tags:  ['Node.js', 'Browser', 'Edge', 'ESM'],
  },
  {
    name:  '@awarizon/react',
    badge: 'HOOKS',
    desc:  'React 18+ hooks built on the core SDK. Automatic loading states, error handling, re-fetching, and cleanup on unmount.',
    tags:  ['React 18+', 'Next.js', 'Vite', 'Remix'],
  },
  {
    name:  '@awarizon/cli',
    badge: 'CODEGEN',
    desc:  'Generate fully typed TypeScript or JavaScript contract clients and React hooks from any ABI. No boilerplate, no repetition.',
    tags:  ['TypeScript', 'JavaScript', 'ABI → Types', 'CLI'],
  },
]

const FEATURES = [
  { icon: '⬡', title: '15+ EVM chains',        body: 'Base, Ethereum, Polygon, Arbitrum, Optimism, BNB, Avalanche, zkSync, Linea, Scroll, Zora, Celo, Gnosis, Mantle, Fantom — and testnets.' },
  { icon: '◈', title: 'Full TypeScript types',  body: 'Every method, argument, and return value is typed. ABI-generated clients take it further — zero any at call sites.' },
  { icon: '◉', title: 'Zero config reads',      body: 'Read any view/pure function with zero wallet setup. Just a contract address, ABI, and API key.' },
  { icon: '◌', title: 'React hooks included',   body: 'useReadContract, useWriteContract, useContract — built-in loading, error, and refetch state. No extra library.' },
  { icon: '◫', title: 'CLI code generation',    body: 'One command converts any ABI into a typed class and React hooks. Run it once, never write boilerplate again.' },
  { icon: '◇', title: 'Event subscriptions',    body: 'Real-time on-chain events via contract.on("Transfer", cb). Returns an unsubscribe function for clean teardown.' },
  { icon: '⬡', title: 'Multicall batching',     body: 'Batch multiple reads into a single RPC round-trip with awz.multicall(). Falls back gracefully on chains without multicall3.' },
  { icon: '◈', title: 'Named registry',         body: 'Register contracts once, reference by name everywhere. awz.register("USDC", { address, abi }) then awz.use("USDC").' },
]

const CHAINS = [
  { id: 'base',      label: 'Base',         tag: 'Recommended' },
  { id: 'ethereum',  label: 'Ethereum',      tag: 'Mainnet'     },
  { id: 'polygon',   label: 'Polygon',       tag: 'PoS'         },
  { id: 'arbitrum',  label: 'Arbitrum One',  tag: 'L2'          },
  { id: 'optimism',  label: 'Optimism',      tag: 'L2'          },
  { id: 'bnb',       label: 'BNB Chain',     tag: 'BSC'         },
  { id: 'avalanche', label: 'Avalanche',     tag: 'C-Chain'     },
  { id: 'zksync',    label: 'zkSync Era',    tag: 'ZK-L2'       },
  { id: 'linea',     label: 'Linea',         tag: 'ZK-L2'       },
  { id: 'scroll',    label: 'Scroll',        tag: 'ZK-L2'       },
  { id: 'zora',      label: 'Zora',          tag: 'OP-Stack'    },
  { id: 'mantle',    label: 'Mantle',        tag: 'L2'          },
  { id: 'celo',      label: 'Celo',          tag: 'EVM'         },
  { id: 'gnosis',    label: 'Gnosis',        tag: 'xDai'        },
  { id: 'fantom',    label: 'Fantom',        tag: 'EVM'         },
]

const EXAMPLES = [
  {
    tab: 'Read',
    code: `import { AwarizonWeb3 } from "@awarizon/web3"

const awz = new AwarizonWeb3({
  chain:  "base",
  apiKey: process.env.AWARIZON_API_KEY,
})

// ERC-20 shorthand — no ABI import needed
const usdc = await awz.erc20("0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913")

const symbol      = await usdc.symbol()       // "USDC"
const decimals    = await usdc.decimals()     // 6n
const totalSupply = await usdc.totalSupply()  // 123456789000000n
const balance     = await usdc.balanceOf("0xYourAddress") // 1000000n`,
  },
  {
    tab: 'Write',
    code: `const usdc = await awz.erc20("0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913")

// Transfer — broadcast and get hash immediately
const tx = await usdc.transfer("0xRecipient", 500_000n)
console.log("hash:", tx.hash) // 0x...

// Wait for on-chain confirmation
const receipt = await tx.wait()
console.log("block:",    receipt.blockNumber)
console.log("gas used:", receipt.gasUsed)
console.log("status:",   receipt.status) // "success" | "reverted"

// Any custom contract — just supply the ABI
const contract = await awz.contract({ address: "0x...", abi: MY_ABI })
const result = await contract.myCustomMethod(arg1, arg2)`,
  },
  {
    tab: 'React',
    code: `import { AwarizonProvider, useReadContract, useWriteContract } from "@awarizon/react"

// 1. Wrap once in your layout
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AwarizonProvider chain="base" apiKey={process.env.NEXT_PUBLIC_AWARIZON_KEY}>
      {children}
    </AwarizonProvider>
  )
}

// 2. Read anywhere — auto loading state, re-fetches on arg change
function TokenBalance({ owner }: { owner: \`0x\${string}\` }) {
  const { data, isLoading, error } = useReadContract({
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    abi:     ERC20_ABI,
    method:  "balanceOf",
    args:    [owner],
  })
  if (isLoading) return <span>Loading…</span>
  return <span>{data?.toString()}</span>
}

// 3. Write with pending state
function TransferButton({ to, amount }: { to: \`0x\${string}\`; amount: bigint }) {
  const { write, isPending } = useWriteContract({
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    abi:     ERC20_ABI,
    method:  "transfer",
  })
  return <button onClick={() => write([to, amount])} disabled={isPending}>Transfer</button>
}`,
  },
  {
    tab: 'CLI',
    code: `# Generate typed client + React hooks from any ABI
npx @awarizon/cli generate \\
  --name    USDC \\
  --address 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 \\
  --abi     ./usdc.json \\
  --lang    ts \\
  --out     ./src/contracts

# Output:
#   USDCClient.ts     — typed class, zero ABI at call sites
#   useUSDC.ts        — useReadBalanceOf, useWriteTransfer, …

# Use in your app
import { USDCClient }         from "./contracts/USDCClient"
import { useReadBalanceOf }   from "./contracts/useUSDC"

const usdc    = await USDCClient.create(awz)
const balance = await usdc.balanceOf("0xOwner") // fully typed, bigint`,
  },
]

// ─── Framework scaffold data ──────────────────────────────────────────────────

const FRAMEWORKS = [
  {
    tab:     'Next.js',
    filename: 'app/layout.tsx',
    install:  'npx create-awarizon-app my-app --template nextjs',
    tags:    ['App Router', 'Server + Client', 'NEXT_PUBLIC_ env'],
    tree: `my-app/
├── app/
│   ├── layout.tsx       ← AwarizonProvider wired here
│   ├── page.tsx         ← live USDC read demo
│   └── globals.css
├── lib/
│   └── awarizon.ts      ← server-side SDK singleton
├── .env.local
└── package.json`,
    code: `// app/layout.tsx
import { AwarizonProvider } from '@awarizon/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AwarizonProvider
          chain="base"
          apiKey={process.env.NEXT_PUBLIC_AWARIZON_API_KEY!}
        >
          {children}
        </AwarizonProvider>
      </body>
    </html>
  )
}

// lib/awarizon.ts — for Server Actions & API routes
import { AwarizonWeb3 } from '@awarizon/web3'
export const awz = new AwarizonWeb3({
  chain:  'base',
  apiKey: process.env.AWARIZON_API_KEY!,
})`,
  },
  {
    tab:     'React + Vite',
    filename: 'src/main.tsx',
    install:  'npx create-awarizon-app my-app --template react',
    tags:    ['Vite 5', 'React 18+', 'VITE_ env'],
    tree: `my-app/
├── src/
│   ├── main.tsx         ← AwarizonProvider wired here
│   ├── App.tsx          ← live USDC read demo
│   └── index.css
├── .env
├── vite.config.ts
└── package.json`,
    code: `// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AwarizonProvider } from '@awarizon/react'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AwarizonProvider
      chain="base"
      apiKey={import.meta.env.VITE_AWARIZON_API_KEY}
    >
      <App />
    </AwarizonProvider>
  </StrictMode>,
)

// src/App.tsx — read any contract, live
import { useReadContract } from '@awarizon/react'

const { data: symbol } = useReadContract({
  address:      '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  abi:          ERC20_ABI,
  functionName: 'symbol',
})`,
  },
  {
    tab:     'Expo',
    filename: 'app/_layout.tsx',
    install:  'npx create-awarizon-app my-app --template expo',
    tags:    ['Expo SDK 51', 'Expo Router', 'React Native', 'EXPO_PUBLIC_ env'],
    tree: `my-app/
├── app/
│   ├── _layout.tsx      ← AwarizonProvider + Stack nav
│   └── (tabs)/
│       ├── _layout.tsx  ← Tab bar
│       └── index.tsx    ← live USDC read demo
├── .env
├── app.json
└── package.json`,
    code: `// app/_layout.tsx
import { Stack } from 'expo-router'
import { AwarizonProvider } from '@awarizon/react-native'

export default function RootLayout() {
  return (
    <AwarizonProvider
      chain="base"
      apiKey={process.env.EXPO_PUBLIC_AWARIZON_API_KEY!}
    >
      <Stack
        screenOptions={{
          headerStyle:     { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
    </AwarizonProvider>
  )
}

// app/(tabs)/index.tsx — on-chain data in React Native
import { useReadContract } from '@awarizon/react-native'

const { data: symbol } = useReadContract({
  address:      '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  abi:          ERC20_ABI,
  functionName: 'symbol',
})`,
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SDKPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [activeFramework, setActiveFramework] = useState(0)

  return (
    <ScrollProvider>
      <PageTransition>

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
          <div className="absolute inset-0 grid-bg-static opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,229,0,0.06),transparent)]" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen">

            {/* Label */}
            <div className="flex items-center gap-3 mb-14">
              <span className="w-1 h-6 bg-accent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-accent">SDK_LAYER // @awarizon</span>
            </div>

            {/* Two-col hero */}
            <div className="grid lg:grid-cols-2 gap-16 items-start flex-1">

              {/* Left — staggered headline */}
              <div>
                <motion.h1
                  className="font-display font-extrabold text-white leading-[0.9] mb-8"
                  style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
                >
                  {[
                    { text: 'One SDK.',       cls: 'text-white'    },
                    { text: 'Any chain.',     cls: 'text-white'    },
                    { text: 'Any contract.',  cls: 'gradient-text' },
                  ].map(({ text, cls }) => (
                    <div key={text} className="overflow-hidden">
                      <motion.span
                        className={`block ${cls}`}
                        variants={{
                          hidden: { y: '110%', opacity: 0 },
                          show:   { y: '0%',   opacity: 1, transition: { duration: 0.85, ease } },
                        }}
                      >
                        {text}
                      </motion.span>
                    </div>
                  ))}
                </motion.h1>

                <p className="font-body text-xl text-muted leading-relaxed mb-6 max-w-md">
                  EVM infrastructure for developers who need to ship — reads, writes, events,
                  and typed codegen across 15+ chains. Works in Node.js, browser, and Edge.
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {['TypeScript', 'React hooks', '15+ chains', 'CLI codegen', 'No wallet for reads'].map(t => (
                    <span key={t} className="font-mono text-[10px] tracking-widest px-3 py-1.5 border border-[#2A2A2A] text-dim">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mb-12">
                  <Link
                    href="/auth"
                    className="font-mono text-[11px] tracking-widest px-6 py-3.5 bg-accent text-black font-semibold hover:bg-white transition-colors"
                  >
                    GET API KEY →
                  </Link>
                  <Link
                    href="/docs"
                    className="font-mono text-[11px] tracking-widest px-6 py-3.5 border border-[#2A2A2A] text-muted hover:text-white hover:border-white/30 transition-colors"
                  >
                    READ THE DOCS
                  </Link>
                  <a
                    href="https://www.npmjs.com/org/awarizon"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] tracking-widest px-6 py-3.5 text-dim hover:text-accent transition-colors"
                  >
                    NPM ↗
                  </a>
                </div>

                {/* Stat row */}
                <div className="grid grid-cols-3 gap-px bg-[#111] border border-[#111]">
                  {[
                    { n: '15+',  l: 'EVM chains'    },
                    { n: '3',    l: 'npm packages'   },
                    { n: '100%', l: 'TypeScript'     },
                  ].map(s => (
                    <div key={s.l} className="bg-black px-4 py-4">
                      <div className="font-display font-extrabold text-accent text-2xl">{s.n}</div>
                      <div className="font-mono text-[10px] text-dim tracking-widest mt-0.5">{s.l.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — install + quick code */}
              <Reveal delay={0.2} className="lg:pt-4">
                <ShellBlock command="npm install @awarizon/web3 @awarizon/react" label="INSTALL" />
                <CodeEditor
                  filename="quickstart.ts"
                  code={`import { AwarizonWeb3 } from "@awarizon/web3"

const awz = new AwarizonWeb3({
  chain:  "base",
  apiKey: process.env.AWARIZON_API_KEY,
})

// ERC-20 — no ABI needed
const usdc = await awz.erc20("0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913")

const symbol  = await usdc.symbol()              // "USDC"
const balance = await usdc.balanceOf("0x...")    // 1000000n

const tx = await usdc.transfer("0xRecipient", 500_000n)
const receipt = await tx.wait()
console.log("confirmed:", receipt.blockNumber)`}
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── PACKAGES ─────────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D] bg-[#030303]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 reveal">
              <span className="sys-label opacity-40 block mb-3">PACKAGES // THREE MODULES</span>
              <div className="h-px bg-gradient-to-r from-accent/30 to-transparent" />
            </div>

            <RevealGroup className="grid md:grid-cols-3 gap-px bg-[#111]" stagger={0.1}>
              {PACKAGES.map((pkg) => (
                <RevealItem key={pkg.name}>
                  <div className="bg-black p-8 group hover:bg-[#030303] transition-colors h-full">
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-[9px] tracking-widest px-2 py-1 border border-accent/20 text-accent/70">{pkg.badge}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" />
                    </div>
                    <code className="font-mono text-[15px] text-white block mb-3">{pkg.name}</code>
                    <p className="font-body text-sm text-muted leading-relaxed mb-5">{pkg.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.tags.map(t => (
                        <span key={t} className="font-mono text-[9px] px-2 py-1 bg-[#0A0A0A] text-dim border border-[#1A1A1A] group-hover:border-accent/15 group-hover:text-dim/80 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* Install for all */}
            <div className="mt-6">
              <ShellBlock command="npm install @awarizon/web3 @awarizon/react && npm install -g @awarizon/cli" label="INSTALL ALL" />
            </div>
          </div>
        </section>

        {/* ── CODE EXAMPLES ────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 reveal">
              <span className="sys-label opacity-40 block mb-3">CODE_SAMPLES // LIVE EXAMPLES</span>
              <div className="h-px bg-gradient-to-r from-accent/30 to-transparent mb-6" />
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
                From zero to on-chain in minutes.
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 border border-[#1A1A1A] w-fit mb-0">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={ex.tab}
                  onClick={() => setActiveTab(i)}
                  className={`font-mono text-[10px] tracking-widest px-5 py-3 transition-colors border-r border-[#1A1A1A] last:border-0 ${
                    activeTab === i
                      ? 'bg-accent text-black'
                      : 'bg-[#080808] text-dim hover:text-white'
                  }`}
                >
                  {ex.tab.toUpperCase()}
                </button>
              ))}
            </div>

            <CodeEditor
              filename={`${EXAMPLES[activeTab].tab.toLowerCase()}.ts`}
              code={EXAMPLES[activeTab].code}
            />
          </div>
        </section>

        {/* ── SCAFFOLD ─────────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D] bg-[#030303]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 reveal">
              <span className="sys-label opacity-40 block mb-3">CREATE_APP // SCAFFOLD A PROJECT</span>
              <div className="h-px bg-gradient-to-r from-accent/30 to-transparent mb-6" />
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
                Scaffold a full project<br className="hidden sm:block" /> in one command.
              </h2>
              <p className="font-body text-lg text-muted max-w-xl">
                One command gives you a complete starter wired with <code className="font-mono text-accent/80">AwarizonProvider</code>, env vars, and a live on-chain read demo — for Next.js, React + Vite, or Expo.
              </p>
            </div>

            <div className="mb-8 reveal">
              <ShellBlock command="npx create-awarizon-app my-app" label="SCAFFOLD" />
            </div>

            {/* Framework tabs */}
            <div className="flex gap-0 border border-[#1A1A1A] w-fit mb-0">
              {FRAMEWORKS.map((fw, i) => (
                <button
                  key={fw.tab}
                  onClick={() => setActiveFramework(i)}
                  className={`font-mono text-[10px] tracking-widest px-5 py-3 transition-colors border-r border-[#1A1A1A] last:border-0 ${
                    activeFramework === i
                      ? 'bg-accent text-black'
                      : 'bg-[#080808] text-dim hover:text-white'
                  }`}
                >
                  {fw.tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Framework panel */}
            <div className="border border-t-0 border-[#1A1A1A]">
              <div className="grid lg:grid-cols-2">
                {/* File tree */}
                <div className="border-b lg:border-b-0 lg:border-r border-[#1A1A1A] p-6 bg-[#060606]">
                  <p className="font-mono text-[10px] text-dim tracking-widest mb-4">FILE STRUCTURE</p>
                  <pre className="font-mono text-[12px] text-muted leading-[1.7] whitespace-pre">
                    {FRAMEWORKS[activeFramework].tree}
                  </pre>
                </div>

                {/* Setup code */}
                <div>
                  <CodeEditor
                    filename={FRAMEWORKS[activeFramework].filename}
                    code={FRAMEWORKS[activeFramework].code}
                  />
                  <div className="px-6 pb-5 flex flex-wrap gap-2">
                    {FRAMEWORKS[activeFramework].tags.map(t => (
                      <span key={t} className="font-mono text-[9px] px-2 py-1 bg-[#0A0A0A] text-dim border border-[#1A1A1A]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Create command */}
              <div className="border-t border-[#1A1A1A] px-4 py-4">
                <ShellBlock command={FRAMEWORKS[activeFramework].install} label="RUN" />
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D] bg-[#030303]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 reveal">
              <span className="sys-label opacity-40 block mb-3">CAPABILITIES // WHAT IT DOES</span>
              <div className="h-px bg-gradient-to-r from-accent/30 to-transparent mb-6" />
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
                Everything you need to build on-chain.
              </h2>
            </div>

            <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#111]" stagger={0.06}>
              {FEATURES.map((f) => (
                <RevealItem key={f.title} y={20}>
                  <div className="bg-black p-6 hover:bg-[#030303] transition-colors group h-full">
                    <span className="font-mono text-xl text-accent/40 group-hover:text-accent/70 transition-colors block mb-4">{f.icon}</span>
                    <h3 className="font-display font-semibold text-white text-sm mb-2">{f.title}</h3>
                    <p className="font-body text-[13px] text-dim leading-relaxed">{f.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── CHAINS ───────────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 reveal">
              <span className="sys-label opacity-40 block mb-3">CHAIN_SUPPORT // 15+ NETWORKS</span>
              <div className="h-px bg-gradient-to-r from-accent/30 to-transparent mb-6" />
              <h2 className="font-display font-bold text-3xl text-white">
                One SDK. Every chain that matters.
              </h2>
            </div>

            <RevealGroup className="grid grid-cols-3 sm:grid-cols-5 gap-px bg-[#111] mb-4" stagger={0.04}>
              {CHAINS.map((c) => (
                <RevealItem key={c.id} y={12}>
                  <div className="bg-[#030303] px-4 py-4 hover:bg-[#060606] transition-colors group">
                    <ChainBadge name={c.id} size="sm" showLabel={false} className="mb-2" />
                    <code className="font-mono text-[11px] text-white group-hover:text-accent transition-colors block mb-0.5">
                      {`"${c.id}"`}
                    </code>
                    <span className="font-body text-[11px] text-dim block">{c.label}</span>
                    <span className="font-mono text-[9px] text-dim/50 block">{c.tag}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <p className="font-mono text-[10px] text-dim tracking-widest">
              + TESTNETS: sepolia, base-sepolia, polygon-amoy, arbitrum-sepolia, optimism-sepolia
            </p>
          </div>
        </section>

        {/* ── CHAINS MARQUEE ───────────────────────────────── */}
        <ChainsMarquee />

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-[#0D0D0D]">
          <div className="absolute inset-0 grid-bg-static opacity-10" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] bg-accent/[0.04] blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto text-center reveal">
            <span className="sys-label opacity-40 block mb-6">START_NOW // 60 SECONDS</span>
            <h2
              className="font-display font-extrabold text-white mb-6 leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              Start building on-chain<br />
              <span className="gradient-text">in 60 seconds.</span>
            </h2>
            <p className="font-body text-lg text-muted mb-10 max-w-xl mx-auto">
              Get an API key from your dashboard, run the install command, and make your first on-chain read before the page finishes loading.
            </p>

            <div className="max-w-md mx-auto mb-10">
              <ShellBlock command="npm install @awarizon/web3 @awarizon/react" label="STEP 1 — INSTALL" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/auth"
                className="font-mono text-[11px] tracking-widest px-8 py-4 bg-accent text-black font-semibold hover:bg-white transition-colors"
              >
                GET API KEY →
              </Link>
              <Link
                href="/docs"
                className="font-mono text-[11px] tracking-widest px-8 py-4 border border-[#2A2A2A] text-muted hover:text-white hover:border-white/30 transition-colors"
              >
                READ THE DOCS
              </Link>
              <Link
                href="/dashboard/docs"
                className="font-mono text-[11px] tracking-widest px-8 py-4 text-dim hover:text-accent transition-colors"
              >
                FULL API REFERENCE →
              </Link>
            </div>
          </div>
        </section>

      </PageTransition>
    </ScrollProvider>
  )
}
