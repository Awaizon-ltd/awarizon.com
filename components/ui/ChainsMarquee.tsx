'use client'

import { useEffect, useState } from 'react'

interface Chain {
  id: string
  name: string
  logo: string
  chainId?: number
}

async function fetchEVMChains(): Promise<Chain[]> {
  const platformsRes = await fetch(
    'https://api.coingecko.com/api/v3/asset_platforms?filter=evm',
    { next: { revalidate: 86400 } } as RequestInit
  )
  if (!platformsRes.ok) throw new Error('platforms fetch failed')

  const platforms: any[] = await platformsRes.json()

  const filtered = platforms.filter(
    (p) => p.chain_identifier && p.native_coin_id && p.name
  )

  const ids = filtered.map((p) => p.native_coin_id).join(',')
  const coinsRes = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&sparkline=false&per_page=100`,
  )
  if (!coinsRes.ok) throw new Error('coins fetch failed')

  const coins: any[] = await coinsRes.json()
  const coinMap: Record<string, string> = {}
  coins.forEach((c) => { coinMap[c.id] = c.image })

  return filtered
    .filter((p) => coinMap[p.native_coin_id])
    .map((p) => ({
      id: p.id,
      name: p.name,
      logo: coinMap[p.native_coin_id],
      chainId: p.chain_identifier,
    }))
}

// ── Left illustration: P2P blockchain network topology ──────────────────────
function NetworkIllustration() {
  const nodes = [
    { x: 90,  y: 45,  r: 7, primary: true  },
    { x: 20,  y: 140, r: 5, primary: false },
    { x: 160, y: 110, r: 5, primary: false },
    { x: 48,  y: 230, r: 5, primary: false },
    { x: 155, y: 205, r: 6, primary: true  },
    { x: 15,  y: 325, r: 4, primary: false },
    { x: 105, y: 300, r: 5, primary: false },
    { x: 168, y: 345, r: 4, primary: false },
  ]

  const edges: [number, number, boolean][] = [
    [0, 1, true], [0, 2, false], [1, 3, false],
    [2, 4, true], [3, 5, false], [3, 6, false],
    [4, 6, true], [4, 7, false], [1, 4, false],
  ]

  const labels = ['VALIDATOR', 'NODE_02', 'NODE_03', 'NODE_04', 'NODE_05', 'NODE_06', 'NODE_07', 'NODE_08']

  return (
    <svg width="190" height="420" viewBox="0 0 190 420" fill="none" className="opacity-80">
      {edges.map(([a, b, animated], i) => {
        const n1 = nodes[a], n2 = nodes[b]
        return (
          <g key={i}>
            <line x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y}
              stroke="#FFE500" strokeWidth="0.4" strokeOpacity="0.12" />
            {animated && (
              <line x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y}
                stroke="#FFE500" strokeWidth="0.9" strokeOpacity="0.45"
                strokeDasharray="5 9" className="flow-line" />
            )}
          </g>
        )
      })}

      {nodes.map((node, i) => (
        <g key={i}>
          {node.primary && <>
            <circle cx={node.x} cy={node.y} r={node.r + 12}
              fill="none" stroke="#FFE500" strokeWidth="0.25" strokeOpacity="0.08" />
            <circle cx={node.x} cy={node.y} r={node.r + 6}
              fill="none" stroke="#FFE500" strokeWidth="0.35" strokeOpacity="0.18" />
          </>}
          <circle cx={node.x} cy={node.y} r={node.r + 2.5}
            fill="none" stroke="#FFE500" strokeWidth="0.4"
            strokeOpacity={node.primary ? '0.45' : '0.18'} />
          <circle cx={node.x} cy={node.y} r={node.r}
            fill={node.primary ? '#0A0A0A' : '#040404'}
            stroke="#FFE500" strokeWidth={node.primary ? '0.9' : '0.5'}
            strokeOpacity={node.primary ? '0.85' : '0.35'} />
          <circle cx={node.x} cy={node.y} r={node.primary ? 3.5 : 2}
            fill="#FFE500" fillOpacity={node.primary ? '0.55' : '0.18'} />
          <text x={node.x + node.r + 5} y={node.y + 3.5}
            fill="#FFE500" fillOpacity="0.22" fontSize="5.5"
            fontFamily="JetBrains Mono, monospace">
            {labels[i]}
          </text>
        </g>
      ))}
    </svg>
  )
}

// ── Right illustration: blockchain block stack ───────────────────────────────
function ChainBlocksIllustration() {
  const blocks = [
    { y: 10,  label: 'BLOCK #8,429,103', hash: '0x3f2a…b91c', txs: '312 TXS', latest: true  },
    { y: 112, label: 'BLOCK #8,429,102', hash: '0xa14c…d720', txs: '287 TXS', latest: false },
    { y: 214, label: 'BLOCK #8,429,101', hash: '0x7b91…3e4f', txs: '445 TXS', latest: false },
    { y: 316, label: 'BLOCK #8,429,100', hash: '0x2d5f…9a10', txs: '198 TXS', latest: false },
  ]

  return (
    <svg width="190" height="420" viewBox="0 0 190 420" fill="none" className="opacity-80">
      <defs>
        <filter id="block-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Connectors between blocks */}
      {blocks.slice(0, -1).map((block, i) => {
        const mid = block.y + 70 + (blocks[i + 1].y - block.y - 70) / 2
        return (
          <g key={i}>
            <line x1="95" y1={block.y + 70} x2="95" y2={blocks[i + 1].y}
              stroke="#FFE500" strokeWidth="0.4" strokeOpacity="0.15" />
            <line x1="95" y1={block.y + 70} x2="95" y2={blocks[i + 1].y}
              stroke="#FFE500" strokeWidth="0.9" strokeOpacity="0.4"
              strokeDasharray="3 7" className="flow-line" />
            <circle cx="95" cy={mid} r="3.5"
              fill="#050505" stroke="#FFE500" strokeWidth="0.6" strokeOpacity="0.5" />
            <circle cx="95" cy={mid} r="1.5"
              fill="#FFE500" fillOpacity="0.3" />
          </g>
        )
      })}

      {/* Blocks */}
      {blocks.map((block, i) => (
        <g key={i} filter={block.latest ? 'url(#block-glow)' : undefined}>
          {/* Block body */}
          <rect x="5" y={block.y} width="180" height="68"
            fill="#040404"
            stroke="#FFE500"
            strokeWidth={block.latest ? '0.8' : '0.35'}
            strokeOpacity={block.latest ? '0.7' : '0.2'} />

          {/* Top accent bar (latest only) */}
          {block.latest && (
            <rect x="5" y={block.y} width="180" height="2"
              fill="#FFE500" fillOpacity="0.8" />
          )}

          {/* Corner marks */}
          <line x1="5" y1={block.y + 68} x2="18" y2={block.y + 68}
            stroke="#FFE500" strokeWidth="1.2"
            strokeOpacity={block.latest ? '0.7' : '0.22'} />
          <line x1="185" y1={block.y} x2="185" y2={block.y + 12}
            stroke="#FFE500" strokeWidth="1.2"
            strokeOpacity={block.latest ? '0.7' : '0.22'} />

          {/* Status dot */}
          <circle cx="174" cy={block.y + 14} r="3"
            fill={block.latest ? '#4ADE80' : '#222'}
            stroke={block.latest ? '#4ADE80' : '#333'}
            strokeWidth="0.5"
            fillOpacity={block.latest ? '1' : '1'} />

          {/* Block label */}
          <text x="16" y={block.y + 17}
            fill="#FFE500" fillOpacity={block.latest ? '0.75' : '0.28'}
            fontSize="6" fontFamily="JetBrains Mono, monospace">
            {block.label}
          </text>
          <text x="16" y={block.y + 33}
            fill="#FFE500" fillOpacity={block.latest ? '0.45' : '0.16'}
            fontSize="5.5" fontFamily="JetBrains Mono, monospace">
            HASH: {block.hash}
          </text>
          <text x="16" y={block.y + 49}
            fill="#FFE500" fillOpacity={block.latest ? '0.35' : '0.13'}
            fontSize="5.5" fontFamily="JetBrains Mono, monospace">
            {block.txs} · CONFIRMED · EVM
          </text>
          <text x="16" y={block.y + 62}
            fill="#FFE500" fillOpacity={block.latest ? '0.22' : '0.09'}
            fontSize="5" fontFamily="JetBrains Mono, monospace">
            GAS_USED: 12,847,291 · SLOT: {8429100 + (3 - i)}
          </text>
        </g>
      ))}
    </svg>
  )
}

// ── Chain item ───────────────────────────────────────────────────────────────
function ChainItem({ chain }: { chain: Chain }) {
  const [imgErr, setImgErr] = useState(false)
  return (
    <div className="flex items-center gap-3 shrink-0 px-5 py-3 border border-[#111] bg-[#040404] hover:border-accent/25 hover:bg-[#070707] transition-all duration-300 group">
      {!imgErr ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={chain.logo}
          alt={chain.name}
          width={28}
          height={28}
          className="w-7 h-7 rounded-full object-cover shrink-0"
          onError={() => setImgErr(true)}
        />
      ) : (
        <div className="w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
          <span className="font-mono text-[9px] text-accent font-bold">
            {chain.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}
      <span className="font-mono text-[11px] text-muted whitespace-nowrap group-hover:text-white transition-colors duration-300">
        {chain.name}
      </span>
      {chain.chainId && (
        <span className="font-mono text-[9px] text-dim whitespace-nowrap">
          #{chain.chainId}
        </span>
      )}
    </div>
  )
}

// ── Skeleton loader ──────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="flex gap-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 shrink-0 px-5 py-3 border border-[#111] bg-[#040404]">
          <div className="w-7 h-7 rounded-full bg-[#111] animate-pulse" />
          <div className="w-20 h-3 bg-[#111] rounded animate-pulse" />
        </div>
      ))}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function ChainsMarquee() {
  const [chains, setChains] = useState<Chain[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEVMChains()
      .then(setChains)
      .catch(() => setChains([]))
      .finally(() => setLoading(false))
  }, [])

  // Split into two rows for opposite-direction scroll
  const mid   = Math.ceil(chains.length / 2)
  const row1  = chains.slice(0, mid)
  const row2  = chains.slice(mid)

  return (
    <section className="relative py-24 border-t border-[#0D0D0D] overflow-hidden">
      <div className="absolute inset-0 grid-bg-static opacity-10 pointer-events-none" />

      {/* ── Left illustration ── */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 pointer-events-none z-10 hidden xl:block">
        <NetworkIllustration />
      </div>

      {/* ── Right illustration ── */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 pointer-events-none z-10 hidden xl:block">
        <ChainBlocksIllustration />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-14 text-center reveal">
          <span className="sys-label opacity-40 block mb-4">CHAIN_SUPPORT // EVM_NATIVE</span>
          <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-4">
            Deployed across every major EVM chain.
          </h2>
          <p className="font-body text-base text-muted max-w-xl mx-auto leading-relaxed">
            Awarizon infrastructure is chain-agnostic and EVM-native — deploy once, run on any compatible network.
          </p>
        </div>
      </div>

      {/* ── Marquee rows ── */}
      <div className="space-y-3">
        {/* Row 1 — left → right */}
        <div className="relative overflow-hidden">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {loading ? (
            <SkeletonRow />
          ) : row1.length > 0 ? (
            <div className="flex w-max animate-marquee gap-3">
              {row1.map((c) => <ChainItem key={c.id} chain={c} />)}
              {row1.map((c) => <ChainItem key={`${c.id}-2`} chain={c} />)}
            </div>
          ) : null}
        </div>

        {/* Row 2 — right → left */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {loading ? (
            <SkeletonRow />
          ) : row2.length > 0 ? (
            <div className="flex w-max animate-marquee-rev gap-3">
              {row2.map((c) => <ChainItem key={c.id} chain={c} />)}
              {row2.map((c) => <ChainItem key={`${c.id}-2`} chain={c} />)}
            </div>
          ) : null}
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-20 mt-14">
        <div className="grid grid-cols-3 gap-px bg-[#111]">
          {[
            { val: 'EVM',    label: 'Native Architecture' },
            { val: '100+',   label: 'Supported Networks'  },
            { val: 'Any',    label: 'Chain, One API'      },
          ].map((s) => (
            <div key={s.val} className="bg-black/90 p-6 text-center">
              <div className="font-display font-extrabold text-2xl md:text-3xl text-accent mb-1 accent-glow">
                {s.val}
              </div>
              <div className="font-mono text-[10px] text-dim tracking-widest uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
