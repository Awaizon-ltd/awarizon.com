// ─── Types ────────────────────────────────────────────────────────────────────

export interface PropDef {
  name: string
  type: string
  req?: boolean
  desc: string
}

export type DocItem =
  | { type: 'text';    md: string }
  | { type: 'h3';      id: string; title: string }
  | { type: 'step';    id: string; n: string; title: string }
  | { type: 'label';   text: string }
  | { type: 'code';    code: string; lang?: string; filename?: string }
  | { type: 'shell';   cmd: string; label?: string }
  | { type: 'callout'; icon: string; variant: 'tip' | 'warn' | 'info'; md: string }
  | { type: 'props';   header?: string; rows: PropDef[] }
  | { type: 'grid';    cols?: 2 | 3 | 4; items: Array<{ label: string; sub?: string; tag?: string }> }
  | { type: 'pkg-grid'; items: Array<{ pkg: string; desc: string }> }
  | { type: 'chain-grid'; items: Array<{ id: string; name: string; tag: string }> }
  | { type: 'track'; track: string; trackDesc: string; items: Array<{ type: 'text' | 'shell' | 'code'; [k: string]: unknown }> }

export interface DocSection {
  id: string
  title: string
  items: DocItem[]
}

// ─── Content ──────────────────────────────────────────────────────────────────

export const DOCS: DocSection[] = [

  // ── Overview ────────────────────────────────────────────────────────────────
  {
    id: 'overview',
    title: 'Awarizon SDK',
    items: [
      { type: 'text', md: 'A typed interface for interacting with EVM smart contracts on any supported chain. Authenticate with an API key from your [dashboard](/dashboard/api-keys).' },
    ],
  },

  // ── Packages ────────────────────────────────────────────────────────────────
  {
    id: 'packages',
    title: 'Packages',
    items: [
      { type: 'text', md: 'The SDK is split into focused packages — install only what your project needs.' },
      {
        type: 'pkg-grid',
        items: [
          { pkg: '@awarizon/web3',        desc: 'Core SDK. Node.js, browser, Edge runtimes.' },
          { pkg: '@awarizon/react',        desc: 'React 18+ hooks, ConnectButton, and wallet UI.' },
          { pkg: '@awarizon/auth',         desc: 'Sign-In with Ethereum (EIP-4361). Works standalone or with React.' },
          { pkg: '@awarizon/react-native', desc: 'Mobile SDK. Expo and bare React Native.' },
          { pkg: '@awarizon/cli',          desc: 'Codegen CLI. TypeScript or JavaScript output.' },
        ],
      },
    ],
  },

  // ── Installation ────────────────────────────────────────────────────────────
  {
    id: 'installation',
    title: 'Installation',
    items: [
      { type: 'text', md: 'One command installs the core SDK and React hooks together.' },
      { type: 'shell', cmd: 'npm install @awarizon/web3 @awarizon/react', label: 'INSTALL SDK + REACT HOOKS' },
      { type: 'text', md: 'Install the CLI separately to generate typed contract clients from any ABI.' },
      { type: 'shell', cmd: 'npm install -g @awarizon/cli', label: 'INSTALL CLI (GLOBAL)' },
    ],
  },

  // ── Setup Guide ─────────────────────────────────────────────────────────────
  {
    id: 'setup',
    title: 'Setup Guide',
    items: [
      { type: 'text', md: 'Five steps from zero to live blockchain data. Follow them in order — each one builds on the last.' },

      { type: 'step', id: 'setup-apikey', n: 'STEP 1', title: 'Get your API key' },
      { type: 'text', md: 'Every SDK call is authenticated with an API key. Go to [dashboard → API Keys](/dashboard/api-keys) → click **Create key**. Copy it immediately — it will not be shown again.' },
      { type: 'grid', cols: 2, items: [{ label: 'awz_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx', sub: 'Key format — never commit this to Git' }] },
      { type: 'callout', icon: '⚠️', variant: 'warn', md: 'Never commit your API key to Git or paste it directly in source files. Store it as an environment variable and ensure `.env` is in your `.gitignore`.' },

      { type: 'step', id: 'setup-install', n: 'STEP 2', title: 'Install the right package' },
      { type: 'text', md: 'Pick your track below. You can install more packages any time — they are fully independent.' },
      {
        type: 'track', track: 'A', trackDesc: 'Node.js · scripts · backend · Vite (non-React)',
        items: [
          { type: 'text', md: 'Core SDK only. Works in Node 18+, Deno, Bun, Edge runtimes, and browser bundles.' },
          { type: 'shell', cmd: 'npm install @awarizon/web3', label: 'CORE SDK' },
        ],
      },
      {
        type: 'track', track: 'B', trackDesc: 'React · Next.js · Vite React (requires React 18+)',
        items: [
          { type: 'text', md: 'Installs the core SDK and the React hooks package together. One command, everything you need.' },
          { type: 'shell', cmd: 'npm install @awarizon/web3 @awarizon/react', label: 'SDK + REACT HOOKS' },
        ],
      },
      {
        type: 'track', track: 'C', trackDesc: 'Expo · React Native (Expo SDK 49+ or bare RN 0.74+)',
        items: [
          { type: 'text', md: 'Adds secure wallet key storage (iOS Keychain / Android Keystore) and mobile-optimised wallet hooks.' },
          { type: 'shell', cmd: 'npm install @awarizon/react-native expo-secure-store', label: 'MOBILE' },
        ],
      },

      { type: 'step', id: 'setup-env', n: 'STEP 3', title: 'Store your key as an environment variable' },
      { type: 'text', md: 'Create a `.env` file in your project root and add your key. Your framework loads it automatically.' },
      { type: 'code', filename: '.env  ·  Node.js, Vite, scripts', code: `# Loaded via process.env — never sent to the browser
AWARIZON_API_KEY=awz_live_...` },
      { type: 'code', filename: '.env.local  ·  Next.js', code: `# NEXT_PUBLIC_ exposes the value to browser bundles.
NEXT_PUBLIC_AWARIZON_API_KEY=awz_live_...` },
      { type: 'callout', icon: '💡', variant: 'tip', md: 'Create a `.env.example` file with placeholder values and commit that instead. Other developers will know which variables are required without seeing the real key.' },

      { type: 'step', id: 'setup-vanilla', n: 'STEP 4A', title: 'Initialize — Node.js / Scripts / Backend' },
      { type: 'text', md: 'Create the SDK instance once in a shared file and export it. Every other file imports from there — the connection pool is reused automatically.' },
      {
        type: 'code', filename: 'lib/awarizon.ts', code: `import { AwarizonWeb3 } from "@awarizon/web3"

export const awarizon = new AwarizonWeb3({
  chain:  "base",                          // the EVM chain to connect to
  apiKey: process.env.AWARIZON_API_KEY!,   // loaded from .env
})`,
      },
      { type: 'callout', icon: '💡', variant: 'tip', md: 'Not sure which chain to pick? Start with `"base-sepolia"` — it is a free test network where transactions cost no real money. Switch to `"base"` when you are ready for production.' },
      {
        type: 'chain-grid',
        items: [
          { id: '"base"',          name: 'Base',             tag: 'Recommended for new projects' },
          { id: '"base-sepolia"',  name: 'Base Testnet',     tag: 'Free — no real funds' },
          { id: '"ethereum"',      name: 'Ethereum',         tag: 'Mainnet' },
          { id: '"sepolia"',       name: 'Sepolia',          tag: 'Ethereum testnet' },
          { id: '"polygon"',       name: 'Polygon',          tag: 'PoS mainnet' },
          { id: '"arbitrum"',      name: 'Arbitrum One',     tag: 'L2' },
          { id: '"optimism"',      name: 'Optimism',         tag: 'L2' },
          { id: '"bnb"',           name: 'BNB Chain',        tag: 'BSC' },
          { id: '"avalanche"',     name: 'Avalanche',        tag: 'C-Chain' },
        ],
      },

      { type: 'step', id: 'setup-react', n: 'STEP 4B', title: 'Initialize — React / Next.js' },
      { type: 'text', md: 'React uses a **Provider** pattern. You create the SDK instance once and wrap your app with `AwarizonProvider` — every hook in every component automatically gets access to it.' },
      { type: 'label', text: '1 of 3 — Create the SDK instance' },
      {
        type: 'code', filename: 'lib/awarizon.ts', code: `import { AwarizonWeb3 } from "@awarizon/web3"

// Create OUTSIDE of any component — never recreated on re-renders
export const awarizon = new AwarizonWeb3({
  chain:  "base",
  apiKey: process.env.NEXT_PUBLIC_AWARIZON_API_KEY!,
})`,
      },
      { type: 'label', text: '2 of 3 — Create a Providers wrapper (Next.js App Router needs "use client")' },
      {
        type: 'code', filename: 'components/Providers.tsx', code: `"use client"
import { AwarizonProvider } from "@awarizon/react"
import { awarizon } from "@/lib/awarizon"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AwarizonProvider awarizon={awarizon}>
      {children}
    </AwarizonProvider>
  )
}`,
      },
      { type: 'label', text: '3 of 3 — Add the Provider to your root layout' },
      {
        type: 'code', filename: 'app/layout.tsx', code: `import { Providers } from "@/components/Providers"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}`,
      },

      { type: 'step', id: 'setup-first', n: 'STEP 5', title: 'Make your first call' },
      { type: 'text', md: 'Reading blockchain data requires **no wallet and no gas**. You can query any contract on any chain right now, instantly.' },
      { type: 'label', text: 'Node.js / Script' },
      {
        type: 'code', filename: 'scripts/check-balance.ts', code: `import { awarizon } from "./lib/awarizon"

// USDC on Base mainnet — no ABI file needed
const usdc = await awarizon.erc20("0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913")

const symbol   = await usdc.symbol()   // "USDC"
const decimals = await usdc.decimals() // 6
const raw       = await usdc.balanceOf("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")
const formatted = Number(raw) / 10 ** decimals

console.log(\`Balance: \${formatted} \${symbol}\`)  // "Balance: 1234.56 USDC"`,
      },
      { type: 'label', text: 'React component' },
      {
        type: 'code', filename: 'components/USDCBalance.tsx', code: `import { useToken } from "@awarizon/react"
import { useState, useEffect } from "react"

const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"

export function USDCBalance({ wallet }: { wallet: \`0x\${string}\` }) {
  const { symbol, decimals, balanceOf, isLoading } = useToken(USDC_BASE)
  const [balance, setBalance] = useState<string>("…")

  useEffect(() => {
    if (decimals === null) return
    balanceOf(wallet).then(raw => setBalance((Number(raw) / 10 ** decimals).toFixed(2)))
  }, [wallet, balanceOf, decimals])

  if (isLoading) return <p>Loading token…</p>
  return <p>Balance: {balance} {symbol}</p>
}`,
      },
      { type: 'callout', icon: '💡', variant: 'tip', md: 'Token amounts are always raw integers on-chain. 1 USDC is `1_000_000n` because USDC has 6 decimals. Always divide by `10 ** decimals` before displaying to users.' },
      { type: 'callout', icon: 'ℹ️', variant: 'info', md: 'To **send** transactions (transfers, minting, staking) you also need a wallet connected. See the Writing transactions section below for the full write flow.' },
    ],
  },

  // ── Quick Start ─────────────────────────────────────────────────────────────
  {
    id: 'quickstart',
    title: 'Quick Start',
    items: [
      { type: 'text', md: 'Initialise the SDK, interact with an ERC-20 token with zero ABI boilerplate, and send a transaction.' },
      {
        type: 'code', filename: 'quickstart.ts', code: `import { AwarizonWeb3 } from "@awarizon/web3"

// 1. Initialise
const awarizon = new AwarizonWeb3({
  chain:  "base",
  apiKey: process.env.AWARIZON_API_KEY, // awz_live_...
})

// 2. ERC-20 — no ABI import needed
const usdc = await awarizon.erc20("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")

// 3. Read on-chain state (no gas, no wallet)
console.log(await usdc.balanceOf("0xYourAddress")) // 1000000n
console.log(await usdc.symbol())                   // "USDC"
console.log(await usdc.decimals())                 // 6

// 4. Send a transaction
const tx = await usdc.transfer("0xRecipient", 500_000n)
console.log("hash:", tx.hash)  // 0x...

// 5. Load any custom contract with your own ABI
const staking = await awarizon.contract({ address: "0x...", abi: STAKING_ABI })
await staking.stake(100n)`,
      },
    ],
  },

  // ── @awarizon/web3 ──────────────────────────────────────────────────────────
  {
    id: 'web3-sdk',
    title: '@awarizon/web3',
    items: [
      { type: 'text', md: 'Core SDK. Works in Node 18+, Deno, Bun, Edge runtimes, and any browser bundler. Zero framework dependencies.' },

      { type: 'h3', id: 'constructor', title: 'new AwarizonWeb3(config)' },
      { type: 'text', md: 'Creates an SDK instance. All `.contract()` calls share the same connection pool.' },
      {
        type: 'code', code: `import { AwarizonWeb3 } from "@awarizon/web3"

const awarizon = new AwarizonWeb3({
  chain:   "base",         // required — target EVM chain
  apiKey:  "awz_live_...", // required — from dashboard.awarizon.com
  timeout: 30_000,         // optional, ms  (default: 30 000)
  retries: 3,              // optional      (default: 3)
})`,
      },
      {
        type: 'props',
        rows: [
          { name: 'chain',   type: 'SupportedChain', req: true, desc: 'EVM chain identifier string. See Supported Chains.' },
          { name: 'apiKey',  type: 'string',          req: true, desc: 'API key from the dashboard. Format: "awz_live_..."' },
          { name: 'timeout', type: 'number',                     desc: 'Request timeout in milliseconds. Default 30 000.' },
          { name: 'retries', type: 'number',                     desc: 'Automatic retries on transient RPC errors. Default 3.' },
          { name: 'rpcUrl',  type: 'string',                     desc: 'Custom RPC endpoint override.' },
          { name: 'signer',  type: 'WalletClient',               desc: 'Pre-connected viem WalletClient — equivalent to calling connectWallet() after construction.' },
        ],
      },

      { type: 'h3', id: 'contract-method', title: 'awz.contract(options) → ContractInstance' },
      { type: 'text', md: 'Binds the SDK to a deployed contract. Returns a fully-typed `ContractInstance` where every ABI function is a direct method call.' },
      {
        type: 'code', code: `const token = await awarizon.contract({
  address: "0xContractAddress", // EIP-55 checksum address
  abi:     ABI_ARRAY,            // standard JSON ABI
})

// Every ABI function becomes a direct method — reads and writes
const symbol  = await token.symbol()                   // string
const balance = await token.balanceOf(ownerAddress)    // bigint
const tx      = await token.transfer(to, amount)       // TransactionResult`,
      },

      { type: 'h3', id: 'erc-standards', title: 'ERC Standard Clients' },
      { type: 'text', md: 'Load ERC-20, ERC-721, and ERC-1155 contracts with zero ABI imports. Every method is fully typed — your editor autocompletes the entire standard interface.' },
      {
        type: 'code', code: `// ── ERC-20 Token ──────────────────────────────────────────────────────────────
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

const qty     = await items.balanceOf(user, 42n)
const uri     = await items.uri(42n)
const batched = await items.balanceOfBatch([u1, u2], [1n, 2n])

await items.safeTransferFrom(from, to, 42n, 1n, "0x")
await items.setApprovalForAll(operator, true)`,
      },

      { type: 'h3', id: 'registry', title: 'Contract Registry' },
      { type: 'text', md: 'Register contracts once by name at startup. Reference them anywhere in your app without repeating addresses or ABIs.' },
      {
        type: 'code', code: `// Register at startup — returns \`this\` for chaining
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

awarizon.registeredContracts() // ["USDC", "Vault", "NFT"]
awarizon.unregister("Vault")`,
      },

      { type: 'h3', id: 'reads', title: 'Reading state' },
      { type: 'text', md: 'Call any `view` or `pure` function directly. Zero gas, no wallet required.' },
      {
        type: 'code', code: `// Single return value
const balance  = await contract.balanceOf(ownerAddress) // bigint
const symbol   = await contract.symbol()                // string
const decimals = await contract.decimals()              // bigint

// Tuple return — destructure directly
const [reserve0, reserve1] = await contract.getReserves()

// Struct — returned as Record<string, unknown>
const position = await contract.positions(tokenId)`,
      },

      { type: 'h3', id: 'writes', title: 'Writing transactions' },
      { type: 'text', md: '`nonpayable` and `payable` functions return a `TransactionResult` immediately after broadcast. Call `.wait()` to block until confirmed.' },
      {
        type: 'code', code: `// Broadcast and get hash immediately
const tx = await contract.transfer(recipientAddress, 1_000_000n)
console.log("broadcasted:", tx.hash) // 0x...

// Wait for on-chain confirmation (1 block)
const receipt = await tx.wait()
console.log("block:",    receipt.blockNumber)
console.log("gas used:", receipt.gasUsed)
console.log("status:",   receipt.status)  // "success" | "reverted"

// Payable function — attach ETH via options object (last arg)
const tx2 = await contract.deposit({ value: 1_000_000_000_000_000n }) // 0.001 ETH

// Custom gas limit
const tx3 = await contract.mint(quantity, { value: price, gas: 200_000n })`,
      },

      { type: 'h3', id: 'events', title: 'Events' },
      { type: 'text', md: 'Subscribe to real-time contract events. The SDK returns an unsubscribe function — always call it on cleanup.' },
      {
        type: 'code', code: `// Subscribe to a named event
const unsubscribe = contract.on("Transfer", (log) => {
  console.log("from:",  log.args.from)
  console.log("to:",    log.args.to)
  console.log("value:", log.args.value)
})

// Unsubscribe (e.g. on component unmount)
unsubscribe()

// Wildcard — receive all events from this contract
const unsubAll = contract.on("*", (log) => {
  console.log(log.name, log.args)
})`,
      },

      { type: 'h3', id: 'gas', title: 'Gas estimation' },
      { type: 'text', md: 'Simulate a write before broadcasting to get the estimated gas cost.' },
      {
        type: 'code', code: `const gas = await contract.estimateGas(
  "transfer",        // function name
  recipientAddress,  // ...args
  1_000_000n,
)
console.log("estimated gas:", gas) // 21000n`,
      },

      { type: 'h3', id: 'wallet-builtin', title: 'Built-in Wallet' },
      { type: 'text', md: 'The SDK ships a full self-custodial wallet — generate new wallets, import from a 12 or 24-word BIP-39 mnemonic, or load from a raw private key. No browser extension or external library required.' },
      {
        type: 'code', code: `// ── Create a brand-new wallet ─────────────────────────────────────────────────
const created = await awarizon.wallet.create()
console.log(created.address)    // "0xAbCd..."
console.log(created.privateKey) // "0x..."  ← returned once — store it securely

// ── Import from a BIP-39 mnemonic (12 or 24 words) ────────────────────────────
const fromPhrase = await awarizon.wallet.importMnemonic(
  "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12",
  0, // optional HD account index (default 0)
)

// ── Import from a hex private key ─────────────────────────────────────────────
const fromKey = await awarizon.wallet.importPrivateKey("0x...")

// Once any wallet is loaded, all write calls use it automatically:
const tx = await usdc.transfer(recipient, 1_000_000n)`,
      },
      {
        type: 'props',
        header: 'WALLET ACCESSORS',
        rows: [
          { name: 'wallet.address()',           type: 'Address',    desc: 'Returns the active wallet address. Throws WalletNotConnectedError if no wallet is loaded.' },
          { name: 'wallet.isConnected()',       type: 'boolean',    desc: 'True when any wallet — internal or external — is active.' },
          { name: 'wallet.hasInternalWallet()', type: 'boolean',    desc: 'True when a locally generated or imported key/mnemonic wallet is loaded.' },
          { name: 'wallet.hasExternalWallet()', type: 'boolean',    desc: 'True when an external WalletClient (wagmi, RainbowKit) has been injected.' },
          { name: 'wallet.disconnect()',        type: 'void',       desc: 'Clears all wallet state — both internal keys and external connections.' },
          { name: 'getWalletInfo()',            type: 'WalletInfo', desc: 'Returns { address, chain, isExternal } — useful for displaying connected wallet state.' },
        ],
      },
      { type: 'callout', icon: '⚠️', variant: 'warn', md: 'Never store private keys or mnemonic phrases in plaintext, localStorage, or client-side variables. On mobile use `expo-secure-store` via `@awarizon/react-native`. On server, load from environment variables only.' },

      { type: 'h3', id: 'wallet-external', title: 'External Wallets — wagmi & RainbowKit' },
      { type: 'text', md: 'Inject any viem-compatible `WalletClient` from wagmi or RainbowKit. A one-line sync component keeps the Awarizon SDK in lockstep with whatever wallet the user selects in wagmi — account switches and chain changes included.' },
      { type: 'label', text: 'wagmi — useWalletClient()' },
      {
        type: 'code', lang: 'tsx', code: `import { useEffect } from "react"
import { useWalletClient } from "wagmi"
import { useSDK } from "@awarizon/react"

// Drop this inside any component that lives under both <WagmiProvider> and <AwarizonProvider>
function WalletSync() {
  const awarizon = useSDK()
  const { data: walletClient } = useWalletClient()

  useEffect(() => {
    if (walletClient) awarizon.connectWallet(walletClient)
    else              awarizon.disconnectWallet()
  }, [walletClient, awarizon])

  return null  // renders nothing — purely a sync effect
}`,
      },
      { type: 'label', text: 'RainbowKit — WalletSync + ConnectButton' },
      {
        type: 'code', lang: 'tsx', code: `import { useEffect } from "react"
import { useWalletClient } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useSDK } from "@awarizon/react"

// Syncs the active wagmi wallet into Awarizon whenever it changes
function WalletSync() {
  const awarizon = useSDK()
  const { data: walletClient } = useWalletClient()
  useEffect(() => {
    if (walletClient) awarizon.connectWallet(walletClient)
    else              awarizon.disconnectWallet()
  }, [walletClient, awarizon])
  return null
}

// In your layout — WalletSync is invisible, ConnectButton handles the UI
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WalletSync />          {/* keeps Awarizon in sync with RainbowKit */}
      <ConnectButton />       {/* RainbowKit's button — shows connected address */}
      {children}
    </>
  )
}`,
      },

      { type: 'h3', id: 'eip1193', title: 'EIP-1193 — Browser Wallet Direct Connect' },
      { type: 'text', md: 'Connect any injected browser wallet (MetaMask, Rabby, Brave, Coinbase, Phantom) directly via `connectEIP1193Provider()` — no wagmi, no extra dependencies.' },
      {
        type: 'code', code: `// One call — requests accounts + subscribes to account/chain events
await awarizon.connectEIP1193Provider(window.ethereum, {
  name: "MetaMask", // optional display name
})

// All subsequent writes use this wallet
const { hash } = await token.transfer("0x...", 100n)

// Detect the injected wallet
function detectWalletName(p: Record<string, unknown>): string {
  if (p.isMetaMask && !p.isRabby) return "MetaMask"
  if (p.isRabby)                  return "Rabby"
  if (p.isBraveWallet)            return "Brave Wallet"
  if (p.isCoinbaseWallet)         return "Coinbase Wallet"
  if (p.isPhantom)                return "Phantom"
  return "Browser Wallet"
}`,
      },
      { type: 'callout', icon: '💡', variant: 'tip', md: 'If you use `<ConnectButton />` from `@awarizon/react`, this is handled for you automatically — including wallet detection, WalletConnect QR, and the account popup.' },

      { type: 'h3', id: 'walletconnect', title: 'WalletConnect — MetaMask · Trust · Rainbow · Coinbase' },
      { type: 'text', md: 'WalletConnect v2 is built into the SDK — **no RainbowKit or wagmi required**. Pass `walletConnectProjectId` at init to unlock direct connections to MetaMask Mobile, Trust Wallet, Rainbow, Coinbase Wallet, Uniswap, and any other WalletConnect-compatible app. Get a free project ID at [cloud.walletconnect.com](https://cloud.walletconnect.com).' },
      {
        type: 'code', code: `const awarizon = new AwarizonWeb3({
  chain:                  "base",
  apiKey:                 "awz_live_...",
  walletConnectProjectId: "YOUR_WC_PROJECT_ID",  // from cloud.walletconnect.com
})`,
      },
      { type: 'text', md: 'Calling `connectWalletConnect()` fires `onDisplayUri` with a `wc://` URI string. On **desktop**, render it as a QR code. On **mobile**, turn it into a deep link that opens the user\'s wallet app directly.' },
      { type: 'label', text: 'Desktop — QR code (user scans from mobile wallet app)' },
      {
        type: 'code', lang: 'tsx', code: `import QRCode from "react-qr-code"  // or any QR library
import { useState } from "react"
import { useSDK } from "@awarizon/react"

function ConnectDesktop() {
  const awarizon  = useSDK()
  const [uri, setUri] = useState<string | null>(null)

  async function connect() {
    await awarizon.connectWalletConnect({
      onDisplayUri: (wcUri) => setUri(wcUri),
    })
    setUri(null)  // clear QR once connected
  }

  if (uri) return (
    <div>
      <p>Scan with MetaMask, Trust, Rainbow, Coinbase, or any wallet app</p>
      <QRCode value={uri} size={240} />
    </div>
  )

  return <button onClick={connect}>Connect Wallet</button>
}`,
      },
      { type: 'label', text: 'Mobile — deep link buttons (opens the wallet app directly)' },
      {
        type: 'code', lang: 'tsx', code: `import { useState } from "react"
import { useSDK } from "@awarizon/react"

// WalletConnect v2 deep-link prefixes — each wallet registers its own URI scheme
const WALLETS = [
  { name: 'MetaMask',        scheme: 'metamask://wc?uri=',   icon: '🦊' },
  { name: 'Trust Wallet',    scheme: 'trust://wc?uri=',      icon: '🛡️' },
  { name: 'Rainbow',         scheme: 'rainbow://wc?uri=',    icon: '🌈' },
  { name: 'Coinbase Wallet', scheme: 'cbwallet://wc?uri=',   icon: '🔵' },
  { name: 'Uniswap Wallet',  scheme: 'uniswap://wc?uri=',   icon: '🦄' },
]

function ConnectMobile() {
  const awarizon   = useSDK()
  const [uri, setUri] = useState<string | null>(null)

  async function startConnect() {
    await awarizon.connectWalletConnect({
      onDisplayUri: (wcUri) => setUri(wcUri),
    })
    setUri(null)  // clear once approved
  }

  if (uri) {
    return (
      <div>
        <p>Choose your wallet:</p>
        {WALLETS.map(w => (
          <a
            key={w.name}
            href={\`\${w.scheme}\${encodeURIComponent(uri)}\`}
            style={{ display: "block", margin: "8px 0" }}
          >
            {w.icon} Open in {w.name}
          </a>
        ))}
      </div>
    )
  }

  return <button onClick={startConnect}>Connect Mobile Wallet</button>
}`,
      },
      { type: 'callout', icon: '💡', variant: 'tip', md: 'Detect `navigator.userAgent` at runtime to show QR (desktop) or deep-link buttons (mobile) automatically. `<ConnectButton />` from `@awarizon/react` does this for you — it renders the correct UI for each platform without any extra setup.' },
      {
        type: 'grid',
        cols: 2,
        items: [
          { label: 'MetaMask Mobile',  sub: 'metamask://wc?uri=...',   tag: 'iOS · Android' },
          { label: 'Trust Wallet',     sub: 'trust://wc?uri=...',      tag: 'iOS · Android' },
          { label: 'Rainbow',          sub: 'rainbow://wc?uri=...',    tag: 'iOS · Android' },
          { label: 'Coinbase Wallet',  sub: 'cbwallet://wc?uri=...',   tag: 'iOS · Android' },
          { label: 'Uniswap Wallet',   sub: 'uniswap://wc?uri=...',   tag: 'iOS · Android' },
          { label: 'Any WC v2 wallet', sub: 'Universal QR code fallback', tag: 'All platforms' },
        ],
      },

      { type: 'h3', id: 'live-tracking', title: 'Live Wallet & Chain Tracking' },
      { type: 'text', md: 'When connected via `connectEIP1193Provider()` or `connectWalletConnect()`, the SDK subscribes to provider events automatically. No polling — the SDK state stays in sync with whatever the user does in their wallet app.' },
      {
        type: 'props',
        header: 'AUTO-HANDLED PROVIDER EVENTS',
        rows: [
          { name: 'accountsChanged', type: 'string[]', desc: 'New account selected → rebuilds WalletClient, fires onWalletChange.' },
          { name: 'accountsChanged', type: '[]',       desc: 'Wallet locked / disconnected → calls disconnectExternal().' },
          { name: 'chainChanged',    type: 'string',   desc: 'User switched networks → fires onChainChange.' },
          { name: 'disconnect',      type: '—',        desc: 'Provider disconnected → calls disconnectExternal().' },
        ],
      },
      {
        type: 'code', code: `// Subscribe outside React if needed
const unsub  = awarizon.wallet.onWalletChange(({ address, type }) => {
  console.log("wallet:", address, type)  // "external" | "internal" | "none"
})
const unsub2 = awarizon.wallet.onChainChange(({ chainId }) => {
  console.log("chain:", chainId)
})
unsub(); unsub2()`,
      },
      { type: 'callout', icon: '💡', variant: 'tip', md: 'In React, `useWallet()` subscribes to both events automatically — `address`, `chainId`, and `isChainMismatch` update in real time without any setup.' },

      { type: 'h3', id: 'multicall', title: 'Multicall — batch reads' },
      { type: 'text', md: 'Batch multiple view/pure reads into a single RPC round-trip via multicall3. Critical for dashboards that need many values at once — 10 reads becomes 1 request.' },
      {
        type: 'code', code: `// 3 reads → 1 network request
const [balance, symbol, decimals] = await awarizon.multicall([
  { address: USDC, abi: erc20Abi, method: "balanceOf", args: [userAddress] },
  { address: USDC, abi: erc20Abi, method: "symbol"                         },
  { address: USDC, abi: erc20Abi, method: "decimals"                       },
])

// Dashboard pattern — whole portfolio in one shot
const [ethBal, usdcBal, daiSupply, nftOwner] = await awarizon.multicall([
  { address: WETH, abi: erc20Abi,  method: "balanceOf", args: [wallet] },
  { address: USDC, abi: erc20Abi,  method: "balanceOf", args: [wallet] },
  { address: DAI,  abi: erc20Abi,  method: "totalSupply"               },
  { address: NFT,  abi: erc721Abi, method: "ownerOf",   args: [1n]     },
])`,
      },
    ],
  },

  // ── @awarizon/react ─────────────────────────────────────────────────────────
  {
    id: 'react-sdk',
    title: '@awarizon/react',
    items: [
      { type: 'text', md: 'React hooks built on the core SDK. Manages loading states, re-fetching, and cleanup automatically. Requires React 18+.' },

      { type: 'h3', id: 'provider', title: 'AwarizonProvider' },
      { type: 'text', md: 'Wraps your component tree and makes the SDK available to every hook inside it.' },
      {
        type: 'code', filename: 'components/Providers.tsx', code: `"use client"
import { AwarizonProvider } from "@awarizon/react"
import { AwarizonWeb3 } from "@awarizon/web3"

const awarizon = new AwarizonWeb3({
  chain:                  "base",
  apiKey:                 process.env.NEXT_PUBLIC_AWARIZON_API_KEY!,
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
})

export function Providers({ children }: { children: React.ReactNode }) {
  return <AwarizonProvider awarizon={awarizon}>{children}</AwarizonProvider>
}`,
      },
      {
        type: 'props',
        header: 'PROPS',
        rows: [
          { name: 'awarizon',               type: 'AwarizonWeb3', req: true, desc: 'Pre-configured SDK instance.' },
          { name: 'children',               type: 'ReactNode',    req: true, desc: 'The component subtree that can access SDK hooks.' },
        ],
      },

      { type: 'h3', id: 'connect-button', title: 'ConnectButton' },
      { type: 'text', md: 'A fully self-contained wallet connect / account button. Auto-detects MetaMask, Rabby, Brave, Coinbase Wallet, and Phantom. Shows WalletConnect QR when `walletConnectProjectId` is set.' },
      {
        type: 'code', lang: 'tsx', code: `import { ConnectButton } from "@awarizon/react"

// Zero-config — default styling
<ConnectButton />

// Custom label
<ConnectButton label="Sign In" />

// Custom Tailwind class
<ConnectButton className="rounded-full bg-indigo-600 px-5 py-2 text-white text-sm font-medium" />

// Full render prop — you control the entire UI
<ConnectButton>
  {({ isConnected, address, connect, disconnect, isConnecting }) =>
    isConnected ? (
      <button onClick={disconnect}>
        {address?.slice(0, 6)}…{address?.slice(-4)}
      </button>
    ) : (
      <button onClick={connect} disabled={isConnecting}>
        {isConnecting ? "Connecting…" : "Connect Wallet"}
      </button>
    )
  }
</ConnectButton>`,
      },
      {
        type: 'props',
        header: 'PROPS',
        rows: [
          { name: 'label',     type: 'string',        desc: 'Button text when disconnected. Default: "Connect Wallet".' },
          { name: 'className', type: 'string',        desc: 'CSS class. When set, all default styles are removed.' },
          { name: 'style',     type: 'CSSProperties', desc: 'Inline style override.' },
          { name: 'children',  type: 'fn(props)',     desc: 'Render prop — receive { isConnected, isConnecting, address, connectorName, connect, disconnect } and return your own JSX.' },
        ],
      },

      { type: 'h3', id: 'connect-modal', title: 'ConnectModal' },
      { type: 'text', md: 'The wallet selection modal rendered by `ConnectButton`. Use it standalone to trigger the connect flow from your own button.' },
      {
        type: 'code', lang: 'tsx', code: `import { ConnectModal } from "@awarizon/react"
import { useState } from "react"

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Connect</button>
      {open && <ConnectModal onClose={() => setOpen(false)} />}
    </>
  )
}`,
      },

      { type: 'h3', id: 'account-modal', title: 'AccountModal' },
      { type: 'text', md: 'The mini account popup shown when connected. Displays chain logo, wallet address with one-click copy, live native token balance (polls every 15 s), and a disconnect button.' },
      {
        type: 'code', lang: 'tsx', code: `import { AccountModal, useWallet } from "@awarizon/react"
import { useState } from "react"

function AccountButton() {
  const { address, chainId, isConnected, disconnect } = useWallet()
  const [open, setOpen] = useState(false)

  if (!isConnected) return null
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button onClick={() => setOpen(v => !v)}>
        {address?.slice(0, 6)}…{address?.slice(-4)}
      </button>
      {open && (
        <AccountModal
          address={address!}
          chainId={chainId}
          onClose={() => setOpen(false)}
          onDisconnect={() => { disconnect(); setOpen(false) }}
        />
      )}
    </div>
  )
}`,
      },
      {
        type: 'props',
        header: 'PROPS',
        rows: [
          { name: 'address',      type: 'Address',     req: true, desc: 'The connected wallet address to display.' },
          { name: 'chainId',      type: 'number|null',            desc: 'Active chain ID — used to show the chain logo and name.' },
          { name: 'onClose',      type: '() => void',  req: true, desc: 'Called when the user clicks outside the popup.' },
          { name: 'onDisconnect', type: '() => void',  req: true, desc: 'Called when the user clicks the Disconnect button.' },
        ],
      },

      { type: 'h3', id: 'use-wallet', title: 'useWallet' },
      { type: 'text', md: 'Manage wallet state reactively. Reacts to connect, disconnect, account switches, and chain changes automatically — including when the user acts in their wallet app without interacting with your UI.' },
      {
        type: 'code', lang: 'tsx', code: `import { useWallet } from "@awarizon/react"

function WalletPanel() {
  const {
    address,          // Address | null
    isConnected,      // boolean
    isLoading,        // true during async wallet operations
    error,            // Error | null
    chainId,          // number | null
    isChainMismatch,  // true when wallet is on a different chain than the SDK
    connectorInfo,    // { type, name?, icon? }
    create,           // () => Promise<CreatedWallet>
    importMnemonic,   // (phrase, accountIndex?) => Promise<void>
    importPrivateKey, // (key) => Promise<void>
    connect,          // (walletClient, info?) => void
    disconnect,       // () => void
    signMessage,      // (msg) => Promise<Hex>
  } = useWallet()

  if (isChainMismatch) return <p>Wrong network — please switch in your wallet</p>
  if (!isConnected)    return <button onClick={create}>Create Wallet</button>
  return (
    <div>
      <p>{address}</p>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  )
}`,
      },
      {
        type: 'props',
        header: 'RETURN VALUES',
        rows: [
          { name: 'address',          type: 'Address | null', desc: 'Active wallet address, or null when no wallet is connected.' },
          { name: 'isConnected',      type: 'boolean',        desc: 'True when any wallet (internal or external) is active.' },
          { name: 'isLoading',        type: 'boolean',        desc: 'True during create, import, or connect operations.' },
          { name: 'error',            type: 'Error | null',   desc: 'Last wallet operation error. Cleared on the next success.' },
          { name: 'chainId',          type: 'number | null',  desc: 'Chain ID the external wallet is currently on.' },
          { name: 'isChainMismatch',  type: 'boolean',        desc: 'True when the external wallet is on a different chain than the SDK config.' },
          { name: 'connectorInfo',    type: 'ConnectorInfo',  desc: '{ type, name?, icon? } — how the wallet is connected.' },
          { name: 'create',           type: '() => Promise',  desc: 'Generate a fresh wallet keypair and activate it.' },
          { name: 'importMnemonic',   type: 'fn',             desc: '(phrase, index?) → restore from a BIP-39 mnemonic.' },
          { name: 'importPrivateKey', type: 'fn',             desc: '(key) → load from a hex private key.' },
          { name: 'connect',          type: 'fn',             desc: '(walletClient, info?) → inject an external WalletClient.' },
          { name: 'disconnect',       type: '() => void',     desc: 'Clear wallet state.' },
          { name: 'signMessage',      type: 'fn',             desc: '(message | { raw }) → sign a plain text or raw-bytes message. Returns Hex.' },
        ],
      },

      { type: 'h3', id: 'contract-binding', title: 'contract() — Simplified Contract Binding' },
      { type: 'text', md: 'Create a contract reference once at module level. Eliminates repeating `address`, `abi`, and `method` strings across every hook call — works for **any** contract (ERC-20, DAO, staking, NFT minting, etc.).' },
      {
        type: 'code', lang: 'tsx', code: `import { contract } from "@awarizon/react"
import { ERC20_ABI } from "@awarizon/web3"

// ── Define once (module level, outside any component) ─────────────────────────
const USDC = contract("0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", ERC20_ABI)

// ── DAO / Governance ──────────────────────────────────────────────────────────
const DAO = contract("0x...", DAO_ABI)

// ── Staking contract ──────────────────────────────────────────────────────────
const STAKING = contract("0x...", STAKING_ABI)

// ── NFT collection ────────────────────────────────────────────────────────────
const NFT = contract("0x...", NFT_ABI)`,
      },
      {
        type: 'props',
        header: 'BOUND METHOD BEHAVIOUR',
        rows: [
          { name: 'TOKEN.name()',                  type: 'CallDescriptor', desc: 'Call with args → returns a descriptor for useRead(). No args = empty array.' },
          { name: 'TOKEN.balanceOf(userAddress)',   type: 'CallDescriptor', desc: 'Pass args inline — re-runs when args change thanks to useRead\'s dep tracking.' },
          { name: 'TOKEN.transfer (un-called)',     type: 'BoundMethod',    desc: 'Pass without calling to useWrite(). Args are supplied at write() call time.' },
        ],
      },

      { type: 'h3', id: 'use-read', title: 'useRead()' },
      { type: 'text', md: 'Reactive read hook. Pair with `contract()` — pass a bound method call to avoid repeating address/abi/method on every hook.' },
      {
        type: 'code', lang: 'tsx', code: `import { contract, useRead } from "@awarizon/react"
import { ERC20_ABI, DAO_ABI, STAKING_ABI, NFT_ABI } from "@awarizon/web3"

const USDC    = contract("0x833589...", ERC20_ABI)
const DAO     = contract("0x...",       DAO_ABI)
const STAKING = contract("0x...",       STAKING_ABI)
const NFT     = contract("0x...",       NFT_ABI)

function Dashboard({ user }: { user: \`0x\${string}\` }) {
  // ERC-20
  const { data: name }    = useRead(USDC.name())
  const { data: symbol }  = useRead(USDC.symbol())
  const { data: balance, isLoading } = useRead(USDC.balanceOf(user), { pollingInterval: 10_000 })

  // DAO
  const { data: proposalCount } = useRead(DAO.proposalCount())
  const { data: quorum }        = useRead(DAO.quorumVotes())

  // Staking
  const { data: staked }  = useRead(STAKING.balanceOf(user))
  const { data: earned }  = useRead(STAKING.earned(user), { pollingInterval: 12_000 })

  // NFT
  const { data: supply }  = useRead(NFT.totalSupply())
  const { data: price }   = useRead(NFT.mintPrice())

  if (isLoading) return <p>Loading…</p>
  return <p>{name} ({symbol}): {balance?.toString()}</p>
}`,
      },
      {
        type: 'props',
        header: 'SIGNATURE',
        rows: [
          { name: 'call',                    type: 'CallDescriptor',       req: true, desc: 'Descriptor from a bound method call: TOKEN.balanceOf(user).' },
          { name: 'options.pollingInterval', type: 'number',                          desc: 'Auto-refresh interval in ms. Omit to fetch once on mount.' },
        ],
      },
      {
        type: 'props',
        header: 'RETURN VALUES',
        rows: [
          { name: 'data',       type: 'T | null',    desc: 'The return value of the contract function.' },
          { name: 'isLoading',  type: 'boolean',     desc: 'True on initial load.' },
          { name: 'isFetching', type: 'boolean',     desc: 'True on every refetch (including polling).' },
          { name: 'error',      type: 'Error | null', desc: 'Error from the last call.' },
          { name: 'refetch',    type: '() => Promise<void>', desc: 'Manually trigger a re-fetch.' },
        ],
      },

      { type: 'h3', id: 'use-write', title: 'useWrite()' },
      { type: 'text', md: 'Write hook. Pass a bound method (un-called) — args are supplied when you actually call `write()`. Works for any write function: ERC-20 transfers, DAO votes, NFT minting, staking deposits, etc.' },
      {
        type: 'code', lang: 'tsx', code: `import { contract, useRead, useWrite } from "@awarizon/react"

const USDC    = contract("0x833589...", ERC20_ABI)
const DAO     = contract("0x...",       DAO_ABI)
const STAKING = contract("0x...",       STAKING_ABI)
const NFT     = contract("0x...",       NFT_ABI)

function Actions({ user }: { user: \`0x\${string}\` }) {
  // Token
  const { write: transfer, isLoading: sending }   = useWrite(USDC.transfer)

  // DAO
  const { write: vote,     isLoading: voting }     = useWrite(DAO.castVote)
  const { write: propose,  isLoading: proposing }  = useWrite(DAO.propose)

  // Staking
  const { write: stake,    isLoading: staking }    = useWrite(STAKING.stake)
  const { write: claim,    isLoading: claiming }   = useWrite(STAKING.getReward)

  // NFT mint (payable — pass value in last arg)
  const { data: price }                            = useRead(NFT.mintPrice())
  const { write: mint,     isLoading: minting }    = useWrite(NFT.mint)

  return (
    <div>
      <button onClick={() => transfer(recipient, 100n)}       disabled={sending}>  Send USDC     </button>
      <button onClick={() => vote(proposalId, 1)}             disabled={voting}>   Vote For      </button>
      <button onClick={() => stake(parseUnits("100", 18))}    disabled={staking}>  Stake         </button>
      <button onClick={() => claim()}                         disabled={claiming}> Claim Rewards </button>
      <button onClick={() => mint(1n, { value: price ?? 0n })} disabled={minting}> Mint NFT      </button>
    </div>
  )
}`,
      },
      {
        type: 'props',
        header: 'RETURN VALUES',
        rows: [
          { name: 'write',     type: '(...args) => Promise<TransactionResult>', desc: 'Call with the ABI args to execute the transaction.' },
          { name: 'isLoading', type: 'boolean',     desc: 'True while the transaction is being submitted.' },
          { name: 'isSuccess', type: 'boolean',     desc: 'True after a successful transaction.' },
          { name: 'result',    type: 'TransactionResult | null', desc: 'Transaction hash and receipt after success.' },
          { name: 'error',     type: 'Error | null', desc: 'Error if the transaction failed.' },
          { name: 'reset',     type: '() => void',  desc: 'Clear all state back to idle.' },
        ],
      },

      { type: 'h3', id: 'use-contract', title: 'useContract' },
      { type: 'text', md: 'Returns the raw `ContractInstance` for event subscriptions or advanced imperative use.' },
      {
        type: 'code', lang: 'tsx', code: `import { useEffect } from "react"
import { useContract } from "@awarizon/react"

function TransferFeed() {
  const { contract } = useContract({ address: "0xToken", abi: ERC20_ABI })

  useEffect(() => {
    if (!contract) return
    const unsub = contract.on("Transfer", (log) => {
      console.log("Transfer:", log.args)
    })
    return unsub  // unsubscribe on unmount
  }, [contract])

  return null
}`,
      },

      { type: 'h3', id: 'use-token', title: 'useToken' },
      { type: 'text', md: 'Zero-ABI hook for ERC-20 tokens. Fetches name, symbol, decimals, and total supply on mount.' },
      {
        type: 'code', lang: 'tsx', code: `import { useToken } from "@awarizon/react"

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
  return (
    <div>
      <p>{name} ({symbol}) — {decimals} decimals</p>
      <p>Balance: {balance?.toString()}</p>
      <button onClick={() => transfer(recipient, 1_000_000n)}>
        Send 1 {symbol}
      </button>
    </div>
  )
}`,
      },

      { type: 'h3', id: 'use-nft', title: 'useNFT' },
      { type: 'text', md: 'Zero-ABI hook for ERC-721 collections. Loads collection name and symbol on mount. Exposes all standard ownership and transfer helpers.' },
      {
        type: 'code', lang: 'tsx', code: `import { useNFT } from "@awarizon/react"

function NFTCard({ address, tokenId }: { address: \`0x\${string}\`; tokenId: bigint }) {
  const { name, symbol, ownerOf, tokenURI, safeTransferFrom, isLoading } = useNFT(address)

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
      <img src={uri ?? ''} alt="NFT" />
      <button onClick={() => safeTransferFrom(owner!, recipient, tokenId)}>Transfer</button>
    </div>
  )
}`,
      },

      { type: 'h3', id: 'use-native', title: 'useNativeBalance' },
      { type: 'text', md: 'Fetch the native currency balance (ETH, MATIC, BNB…) for any address. Pass a `pollingInterval` in ms to keep it live.' },
      {
        type: 'code', lang: 'tsx', code: `import { useNativeBalance } from "@awarizon/react"

function WalletBalance({ address }: { address: \`0x\${string}\` }) {
  // Polls every 12 s — matches Ethereum's ~12 s block time
  const { formatted, balance, isLoading, refetch } = useNativeBalance(address, 12_000)

  if (isLoading) return <span>Loading…</span>
  return (
    <div>
      <p>{formatted} ETH</p>            {/* "1.2345" — human-readable */}
      <p>{balance?.toString()} wei</p>  {/* raw bigint */}
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}`,
      },

      { type: 'h3', id: 'chain-icons', title: 'Chain Icons & Metadata' },
      { type: 'text', md: 'Helper functions that map chain IDs to icons, human-readable names, and native currency symbols. Used internally by `AccountModal` and `ConnectButton`.' },
      {
        type: 'code', code: `import { getChainIcon, getChainName, getChainNativeSymbol } from "@awarizon/react"

getChainIcon(1)          // "https://awarizon.com/eth.png"
getChainIcon(8453)       // "https://awarizon.com/base.png"
getChainIcon(99999)      // undefined — unknown chain

getChainName(1)          // "Ethereum"
getChainName(8453)       // "Base"
getChainName(99999)      // "Chain 99999"  — fallback

getChainNativeSymbol(1)     // "ETH"
getChainNativeSymbol(56)    // "BNB"
getChainNativeSymbol(137)   // "POL"
getChainNativeSymbol(43114) // "AVAX"`,
      },
      {
        type: 'grid',
        cols: 3,
        items: [
          { label: '1',     sub: 'Ethereum' },    { label: '56',    sub: 'BNB Chain' },
          { label: '137',   sub: 'Polygon' },     { label: '42161', sub: 'Arbitrum One' },
          { label: '10',    sub: 'Optimism' },    { label: '43114', sub: 'Avalanche' },
          { label: '8453',  sub: 'Base' },        { label: '2020',  sub: 'Ronin' },
          { label: '146',   sub: 'Sonic' },       { label: '7000',  sub: 'ZetaChain' },
          { label: '80094', sub: 'Berachain' },   { label: '33139', sub: 'ApeChain' },
        ],
      },
    ],
  },

  // ── CLI ─────────────────────────────────────────────────────────────────────
  {
    id: 'cli',
    title: '@awarizon/cli — Code Generation',
    items: [
      { type: 'text', md: 'Generate a fully-typed contract client class and React hooks from any ABI file. Run once — the generated files work without the CLI installed in production.' },
      { type: 'shell', cmd: 'npx @awarizon/cli codegen --name MyToken --abi ./abi.json --address 0x... --out ./src/contracts', label: 'CLI — GENERATE FROM ABI' },
      {
        type: 'props',
        header: 'FLAGS',
        rows: [
          { name: '--name / -n', type: 'string', req: true, desc: 'Contract name in PascalCase. "MyToken" → MyTokenClient.' },
          { name: '--abi / -a',  type: 'path',   req: true, desc: 'Path to the ABI JSON file (Solidity output or Hardhat artifact).' },
          { name: '--address',   type: 'Address',           desc: 'Deployed contract address. Baked into the generated file.' },
          { name: '--out / -o',  type: 'path',              desc: 'Output directory. Defaults to the current working directory.' },
          { name: '--lang',      type: 'ts | js',           desc: '"ts" for TypeScript (default), "js" for JavaScript.' },
          { name: '--no-react',  type: 'flag',              desc: 'Skip generating React hooks — output the client class only.' },
        ],
      },
      { type: 'text', md: 'Two files are generated:' },
      {
        type: 'code', filename: 'MyTokenClient.ts  (auto-generated)', code: `import { AwarizonWeb3 } from "@awarizon/web3"

const CONTRACT_ADDRESS = "0xYourDeployedAddress"

export class MyTokenClient {
  private _contract: any

  static async create(awz: AwarizonWeb3): Promise<MyTokenClient> {
    const client = new MyTokenClient()
    client._contract = await awz.contract({ address: CONTRACT_ADDRESS, abi: ABI })
    return client
  }

  // Read methods
  async balanceOf(owner: \`0x\${string}\`): Promise<bigint> { return this._contract.balanceOf(owner) }
  async symbol():   Promise<string> { return this._contract.symbol() }
  async decimals(): Promise<number> { return this._contract.decimals() }

  // Write methods
  async transfer(to: \`0x\${string}\`, amount: bigint): Promise<TransactionResult> {
    return this._contract.transfer(to, amount)
  }
}`,
      },
      {
        type: 'code', filename: 'useMyToken.ts  (React hooks — auto-generated)', code: `import { contract, useRead, useWrite } from "@awarizon/react"

const CONTRACT_ADDRESS = "0xYourDeployedAddress"
const TOKEN = contract(CONTRACT_ADDRESS, MYTOKEN_ABI)

export function useReadBalanceOf(owner: \`0x\${string}\`) {
  return useRead(TOKEN.balanceOf(owner))
}
export function useReadSymbol() {
  return useRead(TOKEN.symbol())
}
export function useWriteTransfer() {
  return useWrite(TOKEN.transfer)
}

// Usage:
// const { data: balance }   = useReadBalanceOf(userAddress)
// const { write: transfer } = useWriteTransfer()`,
      },
      { type: 'shell', cmd: 'npx @awarizon/cli info', label: 'CLI — VERSION INFO' },
    ],
  },

  // ── @awarizon/react-native ──────────────────────────────────────────────────
  {
    id: 'react-native',
    title: '@awarizon/react-native',
    items: [
      { type: 'text', md: 'Mobile wallet management for Expo and bare React Native. Adds hardware-backed key storage (iOS Keychain / Android Keystore), automatic wallet restore on app launch, and React Native-safe async crypto.' },
      { type: 'shell', cmd: 'npm install @awarizon/react-native expo-secure-store', label: 'INSTALL' },
      { type: 'callout', icon: 'ℹ️', variant: 'info', md: 'Requires Expo SDK 49+ or bare React Native 0.74+. `@awarizon/web3` is also required — install it following the Setup Guide.' },

      { type: 'h3', id: 'rn-provider', title: 'AwarizonProvider (React Native)' },
      { type: 'text', md: 'Same Provider pattern as `@awarizon/react`. Wrap your root layout to give all hooks access to the SDK.' },
      {
        type: 'code', filename: 'app/_layout.tsx', lang: 'tsx', code: `import { AwarizonProvider } from "@awarizon/react-native"
import { AwarizonWeb3 } from "@awarizon/web3"
import { Stack } from "expo-router"

const awarizon = new AwarizonWeb3({
  chain:  "base",
  apiKey: process.env.EXPO_PUBLIC_AWARIZON_API_KEY!,
})

export default function RootLayout() {
  return (
    <AwarizonProvider awarizon={awarizon}>
      <Stack />
    </AwarizonProvider>
  )
}`,
      },

      { type: 'h3', id: 'rn-storage', title: 'Secure Storage Setup' },
      { type: 'text', md: '`createSecureStorage` wraps `expo-secure-store` behind a simple adapter interface. Private keys are encrypted by the OS — never stored in plaintext on disk.' },
      {
        type: 'code', lang: 'tsx', code: `import * as ExpoSecureStore from "expo-secure-store"
import { createSecureStorage } from "@awarizon/react-native"
import { AwarizonWeb3 } from "@awarizon/web3"

// Create the adapter — wraps the ExpoSecureStore module
const storage = createSecureStorage(ExpoSecureStore)

const awarizon = new AwarizonWeb3({
  chain:  "base",
  apiKey: process.env.EXPO_PUBLIC_AWARIZON_API_KEY!,
})`,
      },
      { type: 'callout', icon: '💡', variant: 'tip', md: 'On iOS, keys are stored in the Keychain and survive app reinstalls. On Android, they are encrypted with the Android Keystore and tied to the app package. Neither platform writes the key to disk in plaintext.' },

      { type: 'h3', id: 'use-rn-wallet', title: 'useRNWallet' },
      { type: 'text', md: 'The main hook for React Native. Handles wallet creation, import, and secure persistence. On every app launch, it automatically restores the last saved wallet from secure storage — no login screen needed.' },
      {
        type: 'code', lang: 'tsx', code: `import { Text, View, Button } from "react-native"
import { useRNWallet, createSecureStorage } from "@awarizon/react-native"
import * as ExpoSecureStore from "expo-secure-store"
import { awarizon } from "./lib/awarizon"

const storage = createSecureStorage(ExpoSecureStore)

function WalletScreen() {
  const {
    address,          // string | null
    isConnected,      // boolean
    isLoading,        // true during create / import / auto-restore
    error,            // Error | null
    create,           // () => Promise<CreatedWallet>
    importMnemonic,   // (phrase, accountIndex?) => Promise<void>
    importPrivateKey, // (key) => Promise<void>
    deleteWallet,     // () => Promise<void> — removes from storage (logout)
  } = useRNWallet({
    awarizon,
    storage,
    walletId:    "main", // storage namespace — default: "default"
    autoRestore: true,   // restore on mount — default: true
  })

  if (isLoading) return <Text>Loading wallet…</Text>

  if (!isConnected) {
    return (
      <View>
        <Button title="Create Wallet" onPress={create} />
        <Button title="Import Mnemonic" onPress={() => importMnemonic("word1 word2 ... word12")} />
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
}`,
      },
      {
        type: 'props',
        header: 'OPTIONS',
        rows: [
          { name: 'awarizon',    type: 'AwarizonWeb3',        req: true, desc: 'The SDK instance to attach the wallet to.' },
          { name: 'storage',     type: 'SecureStorageAdapter', req: true, desc: 'Adapter from createSecureStorage(ExpoSecureStore).' },
          { name: 'walletId',    type: 'string',                          desc: 'Storage namespace key. Use different IDs for multi-wallet apps. Default: "default".' },
          { name: 'autoRestore', type: 'boolean',                         desc: 'Auto-restore the last saved wallet from storage on mount. Default: true.' },
        ],
      },
      {
        type: 'props',
        header: 'RETURN VALUES',
        rows: [
          { name: 'address',          type: 'string | null', desc: 'Active wallet address, or null when no wallet is loaded.' },
          { name: 'isConnected',      type: 'boolean',       desc: 'True when a wallet is active (restored or newly created).' },
          { name: 'isLoading',        type: 'boolean',       desc: 'True during create, import, auto-restore, or deleteWallet.' },
          { name: 'error',            type: 'Error | null',  desc: 'Last operation error. Cleared on the next successful operation.' },
          { name: 'create',           type: '() => Promise', desc: 'Generate a fresh wallet. Private key saved to secure storage immediately.' },
          { name: 'importMnemonic',   type: 'fn',            desc: '(phrase, index?) → import from BIP-39 mnemonic and save.' },
          { name: 'importPrivateKey', type: 'fn',            desc: '(key) → import from hex private key and save.' },
          { name: 'deleteWallet',     type: '() => Promise', desc: 'Remove from secure storage and clear all state. Use this as your logout action.' },
        ],
      },
      { type: 'callout', icon: '💡', variant: 'tip', md: '**Auto-restore priority:** on mount, `useRNWallet` checks for a saved private key first, then a saved mnemonic. If neither is found, the hook stays in a clean disconnected state — no error is thrown.' },

      { type: 'h3', id: 'rn-contract-binding', title: 'contract() · useRead() · useWrite() — Mobile' },
      { type: 'text', md: 'The same contract binding API from `@awarizon/react` is available in `@awarizon/react-native`. Works identically for any contract type.' },
      {
        type: 'code', lang: 'tsx', code: `import { contract, useRead, useWrite } from "@awarizon/react-native"
import { ERC20_ABI, STAKING_ABI } from "@awarizon/web3"

// Define once, outside any component
const USDC    = contract("0x833589...", ERC20_ABI)
const STAKING = contract("0x...",       STAKING_ABI)

function MobilePortfolio({ user }: { user: \`0x\${string}\` }) {
  const { data: balance }     = useRead(USDC.balanceOf(user), { pollingInterval: 15_000 })
  const { data: staked }      = useRead(STAKING.balanceOf(user))
  const { data: earned }      = useRead(STAKING.earned(user),  { pollingInterval: 15_000 })

  const { write: transfer, isLoading: sending }  = useWrite(USDC.transfer)
  const { write: stake,    isLoading: staking }  = useWrite(STAKING.stake)
  const { write: claim,    isLoading: claiming } = useWrite(STAKING.getReward)

  return (
    <View>
      <Text>Balance: {balance?.toString()} USDC</Text>
      <Text>Staked:  {staked?.toString()}</Text>
      <Text>Earned:  {earned?.toString()}</Text>
      <Pressable onPress={() => transfer(recipient, 100n)} disabled={sending}>
        <Text>Send</Text>
      </Pressable>
      <Pressable onPress={() => claim()} disabled={claiming}>
        <Text>Claim Rewards</Text>
      </Pressable>
    </View>
  )
}`,
      },
    ],
  },

  // ── @awarizon/auth ──────────────────────────────────────────────────────────
  {
    id: 'auth-sdk',
    title: '@awarizon/auth — Sign-In with Ethereum',
    items: [
      { type: 'text', md: 'Add wallet-based authentication to any app using [EIP-4361 (SIWE)](https://eips.ethereum.org/EIPS/eip-4361). Users sign a human-readable message — no passwords, no OAuth. Verification works identically on client and server.' },
      { type: 'shell', cmd: 'npm install @awarizon/auth', label: 'INSTALL' },

      { type: 'h3', id: 'auth-flow', title: 'How SIWE Works' },
      { type: 'text', md: 'Three-step flow — nonce, sign, verify.' },
      {
        type: 'code', code: `// ─── Step 1: Server generates a nonce ────────────────────────────────────────
// GET /api/auth/nonce
const nonce = generateNonce()   // random 32-char hex
req.session.nonce = nonce
res.send(nonce)

// ─── Step 2: Client builds and signs the SIWE message ────────────────────────
import { AwarizonAuth } from "@awarizon/auth"

const auth = new AwarizonAuth(awarizon, {
  domain:    "myapp.com",
  uri:       "https://myapp.com",
  statement: "Sign in to MyApp.",
})

const nonce = await fetch("/api/auth/nonce").then(r => r.text())
const { message, signature } = await auth.signIn({ nonce })

// ─── Step 3: Server verifies the signature ────────────────────────────────────
// POST /api/auth/verify  { message, signature }
const session = await auth.verify({
  message,
  signature,
  nonce: req.session.nonce,   // must match step 1
})
// session.address is the cryptographically verified wallet address`,
      },
      { type: 'callout', icon: '🔐', variant: 'tip', md: 'SIWE is phishing-resistant. The message binds the domain, nonce, and expiry — so a signature obtained on one site cannot be replayed on another.' },

      { type: 'h3', id: 'use-siwe', title: 'useSiwe — React hook' },
      { type: 'text', md: 'Drop-in SIWE flow for React / Next.js. Handles nonce fetching, wallet signing, and server verification in one `signIn()` call. Import from `@awarizon/react`.' },
      {
        type: 'props',
        header: 'OPTIONS',
        rows: [
          { name: 'domain',    type: 'string',             req: true, desc: 'Your app\'s hostname, e.g. "myapp.com". Embedded in every SIWE message.' },
          { name: 'uri',       type: 'string',             req: true, desc: 'Full URI of the resource, e.g. "https://myapp.com".' },
          { name: 'statement', type: 'string',                        desc: 'Human-readable prompt shown to the user inside their wallet.' },
          { name: 'expiresIn', type: 'number',                        desc: 'Session validity in seconds. Default: 3600 (1 hour).' },
          { name: 'getNonce',  type: '() => Promise<string>',         desc: 'Return a nonce before signing. Omit to generate one locally. Fetch server-side for replay protection.' },
          { name: 'onVerify',  type: '(msg, sig) => Promise<unknown>',desc: 'POST to your backend for server-side verification. Whatever you return is stored in session.serverData.' },
          { name: 'onSignOut', type: '() => Promise<void>',           desc: 'Called when signOut() is invoked. Use to clear the server-side session or cookie.' },
        ],
      },
      {
        type: 'props',
        header: 'RETURNS',
        rows: [
          { name: 'isAuthenticated', type: 'boolean',          desc: 'True after a successful signIn().' },
          { name: 'address',         type: 'string | null',    desc: 'Verified Ethereum address, or null if not signed in.' },
          { name: 'session',         type: 'SiweSession | null', desc: 'Full session: address, chainId, issuedAt, expiresAt, message, signature, serverData.' },
          { name: 'isLoading',       type: 'boolean',          desc: 'True during signIn / signOut.' },
          { name: 'error',           type: 'Error | null',     desc: 'Last error. Cleared on the next signIn attempt.' },
          { name: 'signIn',          type: '() => Promise<void>', desc: 'Trigger the full SIWE flow: get nonce → sign → verify.' },
          { name: 'signOut',         type: '() => Promise<void>', desc: 'Clear the session and call onSignOut().' },
        ],
      },
      {
        type: 'code', lang: 'tsx', code: `import { useSiwe } from "@awarizon/react"

function AuthButton() {
  const { isAuthenticated, address, signIn, signOut, isLoading, error } = useSiwe({
    domain:    "myapp.com",
    uri:       "https://myapp.com",
    statement: "Sign in to access your account.",
    getNonce:  () => fetch("/api/auth/nonce").then(r => r.text()),
    onVerify:  async ({ message, signature }) => {
      const res = await fetch("/api/auth/verify", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ message, signature }),
      })
      if (!res.ok) throw new Error("Server rejected the signature")
      return res.json()  // stored as session.serverData
    },
    onSignOut: () => fetch("/api/auth/signout", { method: "POST" }),
  })

  if (isAuthenticated) {
    return <button onClick={signOut}>Sign out ({address?.slice(0,6)}…)</button>
  }
  return (
    <>
      <button onClick={signIn} disabled={isLoading}>
        {isLoading ? "Signing…" : "Sign in with Ethereum"}
      </button>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </>
  )
}`,
      },

      { type: 'h3', id: 'auth-server', title: 'Server-side Verification' },
      { type: 'text', md: 'Use `verifySiweSignature()` on your server to confirm the wallet signed the message. Works in Node.js, Next.js, Express, Edge runtime, and Deno.' },
      {
        type: 'code', code: `// ── Next.js App Router (route.ts) ────────────────────────────────────────────
import { verifySiweSignature } from "@awarizon/auth"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  const { message, signature } = await req.json()
  const nonce = cookies().get("siwe_nonce")?.value
  if (!nonce) return Response.json({ error: "Missing nonce" }, { status: 400 })

  const result = await verifySiweSignature({ message, signature, options: { domain: "myapp.com", nonce } })
  // result.address is the cryptographically verified wallet address

  cookies().set("user_address", result.address, { httpOnly: true, secure: true })
  cookies().delete("siwe_nonce")  // invalidate — one-time use only
  return Response.json({ address: result.address })
}

// ── Express ───────────────────────────────────────────────────────────────────
app.post("/api/auth/verify", async (req, res) => {
  const { message, signature } = req.body
  const result = await verifySiweSignature({
    message, signature,
    options: { domain: "myapp.com", nonce: req.session.nonce },
  })
  req.session.address = result.address
  req.session.nonce   = undefined  // invalidate after use
  res.json({ address: result.address })
})`,
      },
      { type: 'callout', icon: '⚠️', variant: 'warn', md: 'Always invalidate the nonce after a successful verification. Leaving it reusable allows the same signed message to authenticate multiple times (replay attack).' },

      { type: 'h3', id: 'auth-class', title: 'AwarizonAuth class' },
      { type: 'text', md: 'High-level class that wraps the full SIWE flow. Useful outside of React (Node scripts, CLI tools, Electron).' },
      {
        type: 'code', code: `import { AwarizonAuth, SiweMessage, parseSiweMessage, verifySiweSignature, generateNonce } from "@awarizon/auth"

const auth = new AwarizonAuth(awarizon, {
  domain:    "myapp.com",
  uri:       "https://myapp.com",
  statement: "Sign in to MyApp.",
  expiresIn: 3600,  // seconds
})

// Client: sign in
const nonce = await fetch("/api/auth/nonce").then(r => r.text())
const { message, signature } = await auth.signIn({ nonce })

// Server: verify
const session = await auth.verify({ message, signature, nonce })
// → session: { address, chainId, issuedAt, expiresAt, message, signature }

auth.isValid(session)    // → true if not expired
auth.isExpired(session)  // → true if past expiresAt

// Low-level building blocks
const nonce2 = generateNonce()  // random 32-char hex
const msg    = new SiweMessage({ domain: "myapp.com", address: "0x...", uri: "https://myapp.com", chainId: 8453, nonce: nonce2, version: "1" })
const text   = msg.prepare()
const sig    = await awarizon.signMessage(text)

const fields = parseSiweMessage(text)          // → { domain, address, uri, chainId, nonce, ... }
const result = await verifySiweSignature({ message: text, signature: sig })`,
      },
    ],
  },

  // ── Supported Chains ────────────────────────────────────────────────────────
  {
    id: 'chains',
    title: 'Supported Chains',
    items: [
      { type: 'text', md: 'Pass the chain ID string to `new AwarizonWeb3()` or `<AwarizonProvider>`.' },
      {
        type: 'chain-grid',
        items: [
          { id: '"base"',        name: 'Base',          tag: 'Recommended' },
          { id: '"base-sepolia"',name: 'Base Sepolia',  tag: 'Testnet' },
          { id: '"ethereum"',    name: 'Ethereum',      tag: 'Mainnet' },
          { id: '"sepolia"',     name: 'Sepolia',       tag: 'Testnet' },
          { id: '"polygon"',     name: 'Polygon',       tag: 'PoS' },
          { id: '"arbitrum"',    name: 'Arbitrum One',  tag: 'L2' },
          { id: '"optimism"',    name: 'Optimism',      tag: 'L2' },
          { id: '"bnb"',         name: 'BNB Chain',     tag: 'BSC' },
          { id: '"avalanche"',   name: 'Avalanche',     tag: 'C-Chain' },
          { id: '"zksync"',      name: 'zkSync Era',    tag: 'ZK-L2' },
          { id: '"linea"',       name: 'Linea',         tag: 'ZK-L2' },
          { id: '"sonic"',       name: 'Sonic',         tag: 'Mainnet' },
        ],
      },
    ],
  },

  // ── Error Handling ──────────────────────────────────────────────────────────
  {
    id: 'errors',
    title: 'Error Handling',
    items: [
      { type: 'text', md: 'The SDK exports typed error classes for targeted recovery. Simulation errors automatically surface the human-readable revert reason — no manual ABI decoding required.' },
      {
        type: 'code', code: `import {
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
    // Revert reason extracted automatically — no hex decoding needed
    console.error(err.message)
    // → "Simulation failed: ERC20: transfer amount exceeds balance"
    // → "Simulation failed: MintLimitReached(500, 500)"  (custom errors too)
  } else if (err instanceof WalletNotConnectedError) {
    // Prompt user to connect a wallet
  } else if (err instanceof InvalidApiKeyError) {
    // Redirect to /dashboard/api-keys
  } else if (err instanceof ContractExecutionError) {
    console.error("Execution failed:", err.message, "Function:", err.functionName)
  }
}`,
      },
    ],
  },

  // ── TypeScript Types ────────────────────────────────────────────────────────
  {
    id: 'types',
    title: 'TypeScript Types',
    items: [
      { type: 'text', md: 'All exported types across the Awarizon SDK packages.' },
      {
        type: 'code', code: `// ── @awarizon/web3 ───────────────────────────────────────────────────────────
import type {
  AwarizonConfig, ContractInstance, TransactionResult, TransactionReceipt,
  Erc20Contract, Erc721Contract, Erc1155Contract, WalletInfo,
} from "@awarizon/web3"

interface AwarizonConfig {
  chain:    string        // chain alias string or viem Chain object
  apiKey:   string        // "awz_live_..."
  rpcUrl?:  string
  signer?:  WalletClient  // pre-connected external signer
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

// ── @awarizon/react ───────────────────────────────────────────────────────────
import type {
  ContractRef, CallDescriptor, BoundMethod,  // contract binding API
  UseWalletReturn, UseTokenReturn, UseNFTReturn,
  UseNativeBalanceReturn, UseReadContractReturn, UseWriteContractReturn,
} from "@awarizon/react"

// contract() types
interface CallDescriptor {
  address: \`0x\${string}\`; abi: Abi; method: string; args: unknown[]
}
type BoundMethod = ((...args: unknown[]) => CallDescriptor) & CallDescriptor

// ── @awarizon/react-native ────────────────────────────────────────────────────
import type {
  UseRNWalletReturn, UseRNWalletOptions, SecureStorageAdapter,
  ContractRef, CallDescriptor, BoundMethod,  // same binding API
} from "@awarizon/react-native"

interface UseRNWalletOptions {
  awarizon: AwarizonWeb3; storage: SecureStorageAdapter
  walletId?: string; autoRestore?: boolean
}

interface SecureStorageAdapter {
  get(key: string): Promise<string | null>
  set(key: string, value: string): Promise<void>
  delete(key: string): Promise<void>
}

// ── @awarizon/auth ────────────────────────────────────────────────────────────
import type {
  SiweParams, SiweSession, SignInResult, UseSiweOptions, UseSiweReturn,
} from "@awarizon/auth"

interface SiweSession {
  address: string; chainId: number
  issuedAt: string; expiresAt?: string
  message: string; signature: string
  serverData?: unknown  // whatever your onVerify returned
}`,
      },
    ],
  },
]
