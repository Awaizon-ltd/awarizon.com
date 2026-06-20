'use client'

import { useEffect, useState, useCallback } from 'react'

const CHAINS  = ['base', 'eth', 'arbitrum', 'polygon', 'bnb', 'avalanche', 'optimism', 'zeta']
const TOKENS  = ['USDC', 'ETH', 'USDT', 'WBTC', 'ARB', 'OP', 'MATIC', 'BNB']
const METHODS = ['transfer', 'swap', 'deposit', 'mint', 'stake', 'bridge', 'approve']
const STATUS  = ['confirmed', 'confirmed', 'confirmed', 'confirmed', 'pending']

let gid = 0

function rng(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function shortHash() {
  return '0x' + Array.from({ length: 10 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('')
}

interface Tx {
  id: number
  hash: string
  chain: string
  method: string
  token: string
  amount: string
  status: string
  ms: number
  fresh: boolean
}

function genTx(): Tx {
  const dollars = rng(10, 149999)
  const amount = dollars >= 10000
    ? `$${(dollars / 1000).toFixed(1)}k`
    : `$${dollars.toLocaleString()}`
  return {
    id: ++gid,
    hash: shortHash(),
    chain: CHAINS[rng(0, CHAINS.length - 1)],
    method: METHODS[rng(0, METHODS.length - 1)],
    token: TOKENS[rng(0, TOKENS.length - 1)],
    amount,
    status: STATUS[rng(0, STATUS.length - 1)],
    ms: rng(420, 3800),
    fresh: true,
  }
}

const SEED: Tx[] = Array.from({ length: 6 }, genTx).map(t => ({ ...t, fresh: false }))

export default function LiveTxFeed({ className = '' }: { className?: string }) {
  const [txs, setTxs] = useState<Tx[]>(SEED)
  const [totalToday, setTotalToday] = useState(rng(12400, 24800))
  const [tps, setTps] = useState((rng(80, 140) / 10).toFixed(1))

  const addTx = useCallback(() => {
    setTxs(prev => [genTx(), ...prev.slice(0, 5)].map((t, i) => ({ ...t, fresh: i === 0 })))
    setTotalToday(c => c + rng(1, 5))
    if (Math.random() > 0.7) setTps((rng(60, 180) / 10).toFixed(1))
  }, [])

  useEffect(() => {
    const id = setInterval(addTx, rng(1600, 2800))
    return () => clearInterval(id)
  }, [addTx])

  return (
    <div className={`border border-[#1E1E1E] bg-black/95 backdrop-blur-md w-72 shrink-0 font-mono ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#141414]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-[9px] text-green-400 tracking-widest">LIVE NETWORK</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-dim">{tps} tx/s</span>
          <span className="text-[9px] text-accent/60">{totalToday.toLocaleString()} today</span>
        </div>
      </div>

      {/* TX list */}
      <div className="divide-y divide-[#080808]">
        {txs.slice(0, 6).map((tx, i) => (
          <div
            key={tx.id}
            className={`px-4 py-2.5 transition-all duration-500 ${tx.fresh && i === 0 ? 'bg-accent/[0.04]' : ''}`}
            style={{ opacity: Math.max(0.25, 1 - i * 0.15) }}
          >
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] text-muted truncate max-w-[120px]">
                {tx.hash.slice(0, 16)}…
              </span>
              <span className="text-[10px] text-accent font-medium shrink-0 ml-2">
                {tx.amount}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-dim">
              <span className="uppercase tracking-wide text-dim/70">{tx.chain}</span>
              <span className="text-dim/30">·</span>
              <span>{tx.method}</span>
              <span className="text-dim/30">·</span>
              <span>{tx.ms}ms</span>
              <span className="ml-auto">
                <span className={`px-1.5 py-0.5 text-[8px] tracking-widest uppercase ${
                  tx.status === 'confirmed'
                    ? 'text-green-400/70 bg-green-400/5'
                    : 'text-yellow-400/60 bg-yellow-400/5'
                }`}>
                  {tx.status}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-[#0A0A0A] flex items-center justify-between">
        <span className="text-[9px] text-dim/50 tracking-widest">@awarizon/web3</span>
        <span className="text-[9px] text-accent/40 tracking-widest">EVM_NATIVE</span>
      </div>
    </div>
  )
}
