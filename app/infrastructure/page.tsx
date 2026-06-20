'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '@/components/motion/PageTransition'
import ScrollProvider from '@/components/motion/ScrollProvider'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import Button from '@/components/ui/Button'
import ChainBadge from '@/components/ui/ChainBadge'
import ChainsMarquee from '@/components/ui/ChainsMarquee'
import { INFRASTRUCTURE_NODES } from '@/lib/constants'

const ease = [0.16, 1, 0.3, 1] as const

const CONNECTIONS = [
  ['wallet','payments'], ['payments','identity'], ['identity','apis'],
  ['apis','automation'], ['automation','wallet'], ['wallet','apis'], ['payments','automation'],
]

export default function InfrastructurePage() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [modalNode,  setModalNode]  = useState<string | null>(null)

  const getNode = (id: string) => INFRASTRUCTURE_NODES.find(n => n.id === id)
  const activeNodeData = modalNode ? getNode(modalNode) : null
  const getPos = (id: string) => { const n = getNode(id); return n ? { x: n.x, y: n.y } : { x: 0, y: 0 } }

  return (
    <ScrollProvider>
      <PageTransition>

        {/* ── HERO ───────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
          <div className="absolute inset-0 grid-bg-static opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,229,0,0.07),transparent)]" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen">
            <div className="flex items-center gap-3 mb-16">
              <span className="w-1 h-6 bg-accent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-accent">LAYER_02 // INFRA_NODE</span>
            </div>

            <motion.div
              className="mb-12"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } } }}
            >
              <h1 className="font-display font-extrabold leading-[0.92] mb-6" style={{ fontSize: 'clamp(2.8rem, 7.5vw, 9rem)' }}>
                {[
                  { text: 'We build',             cls: 'text-white'    },
                  { text: 'the protocols',         cls: 'text-white'    },
                  { text: 'that make on-chain',    cls: 'gradient-text' },
                  { text: 'operations possible.',  cls: 'text-white'    },
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
              </h1>
              <motion.p
                className="font-body text-xl text-muted max-w-xl leading-relaxed"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
                }}
              >
                Modular blockchain infrastructure — wallets, payments, identity, and APIs — designed for how developers and businesses actually build.
              </motion.p>
            </motion.div>

            {/* Node graph */}
            <div className="flex-1 flex items-center justify-center mt-4">
              <div className="relative w-full max-w-2xl" style={{ paddingBottom: '68%' }}>
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ overflow:'visible' }}>
                  {CONNECTIONS.map(([from, to]) => {
                    const p1 = getPos(from); const p2 = getPos(to)
                    const hi = activeNode === from || activeNode === to
                    return (
                      <g key={`${from}-${to}`}>
                        <line x1={`${p1.x}%`} y1={`${p1.y}%`} x2={`${p2.x}%`} y2={`${p2.y}%`}
                          stroke={hi ? '#FFE500' : '#1C1C1C'} strokeWidth={hi ? '0.4' : '0.25'}
                          style={{ transition:'all .3s' }} />
                        <line x1={`${p1.x}%`} y1={`${p1.y}%`} x2={`${p2.x}%`} y2={`${p2.y}%`}
                          stroke="#FFE500" strokeWidth="0.35" strokeDasharray="3 6"
                          strokeOpacity={hi ? '0.75' : '0.25'} className="flow-line" />
                      </g>
                    )
                  })}
                  {/* Animated data packets traveling along connections */}
                  {CONNECTIONS.map(([from, to], idx) => {
                    const p1 = getPos(from)
                    const p2 = getPos(to)
                    const pathId = `pkt-path-${from}-${to}`
                    const dur = 1.8 + idx * 0.22
                    const delay = idx * 0.35
                    return (
                      <g key={pathId}>
                        <path
                          id={pathId}
                          d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`}
                          fill="none"
                          stroke="none"
                        />
                        <circle r="1.1" fill="#FFE500" fillOpacity="0.95">
                          <animateMotion
                            dur={`${dur}s`}
                            repeatCount="indefinite"
                            begin={`${delay}s`}
                          >
                            <mpath href={`#${pathId}`} />
                          </animateMotion>
                        </circle>
                        {/* Trailing glow particle */}
                        <circle r="0.6" fill="#FFE500" fillOpacity="0.35">
                          <animateMotion
                            dur={`${dur}s`}
                            repeatCount="indefinite"
                            begin={`${delay + 0.12}s`}
                          >
                            <mpath href={`#${pathId}`} />
                          </animateMotion>
                        </circle>
                      </g>
                    )
                  })}

                  {INFRASTRUCTURE_NODES.map(node => {
                    const hi = activeNode === node.id
                    return (
                      <g key={node.id}>
                        <circle cx={`${node.x}%`} cy={`${node.y}%`} r={hi ? '3.8' : '3'}
                          fill="none" stroke="#FFE500" strokeOpacity={hi ? '0.4' : '0.15'} strokeWidth="0.3"
                          style={{ transition:'all .3s' }} />
                        {hi && <circle cx={`${node.x}%`} cy={`${node.y}%`} r="5.5"
                          fill="none" stroke="#FFE500" strokeOpacity="0.08" strokeWidth="0.25" />}
                        {/* Pulse ring — always running */}
                        <circle cx={`${node.x}%`} cy={`${node.y}%`} r="3"
                          fill="none" stroke="#FFE500" strokeWidth="0.3" strokeOpacity="0">
                          <animate attributeName="r" from="3" to="8" dur="2.4s" repeatCount="indefinite" begin={`${INFRASTRUCTURE_NODES.indexOf(node) * 0.5}s`} />
                          <animate attributeName="stroke-opacity" from="0.4" to="0" dur="2.4s" repeatCount="indefinite" begin={`${INFRASTRUCTURE_NODES.indexOf(node) * 0.5}s`} />
                        </circle>
                        <circle cx={`${node.x}%`} cy={`${node.y}%`} r={hi ? '2.2' : '1.6'}
                          fill={hi ? '#FFE500' : '#0D0D0D'} stroke="#FFE500"
                          strokeOpacity={hi ? '1' : '0.45'} strokeWidth="0.3"
                          className="cursor-pointer" style={{ transition:'all .3s' }}
                          onMouseEnter={() => setActiveNode(node.id)}
                          onMouseLeave={() => setActiveNode(null)}
                          onClick={() => setModalNode(node.id)} />
                        <text x={`${node.x}%`} y={`${node.y + 6.5}%`} textAnchor="middle" fontSize="2.4"
                          fill={hi ? '#FFE500' : '#555'} fontFamily="JetBrains Mono, monospace"
                          style={{ transition:'all .3s', userSelect:'none', pointerEvents:'none' }}>
                          {node.label}
                        </text>
                        <text x={`${node.x}%`} y={`${node.y - 5.5}%`} textAnchor="middle" fontSize="1.5"
                          fill={hi ? '#FFE50070' : '#2A2A2A'} fontFamily="JetBrains Mono, monospace"
                          style={{ transition:'all .3s', userSelect:'none', pointerEvents:'none' }}>
                          {node.code}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>
            </div>
            <p className="text-center font-mono text-[10px] text-dim mt-4 animate-pulse-slow">
              HOVER TO ACTIVATE — CLICK TO INSPECT
            </p>
          </div>
        </section>

        {/* ── CARDS — section bg image ───────────────────── */}
        <section className="section-img-bg py-24 px-6 md:px-12 lg:px-20">
          {/* Server-room texture */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="s-img" src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=70" alt="" aria-hidden="true" />
          <div className="s-overlay bg-gradient-to-b from-black via-black/60 to-black" />

          <div className="max-w-6xl mx-auto">
            <div className="mb-14 reveal">
              <span className="sys-label opacity-40 block mb-3">SYSTEM MANIFEST // COMPONENTS</span>
              <div className="h-px bg-gradient-to-r from-accent/30 to-transparent" />
            </div>
            <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#111]/70" stagger={0.08}>
              {INFRASTRUCTURE_NODES.map((node) => (
                <RevealItem key={node.id}>
                  <div className="bg-black/85 backdrop-blur-sm p-7 border-l-2 border-transparent hover:border-l-accent hover:bg-black/95 transition-all duration-300 group cursor-pointer h-full"
                    onClick={() => setModalNode(node.id)}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] tracking-widest text-accent/60 group-hover:text-accent transition-colors">{node.code}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" />
                      <span className="font-mono text-[9px] text-dim">ACTIVE</span>
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-white text-lg mb-3">{node.label}</h3>
                  <p className="font-body text-sm text-muted leading-relaxed mb-5">{node.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {node.tags.map(tag => (
                      <span key={tag} className="font-mono text-[9px] px-2 py-1 bg-[#111] text-dim border border-[#1A1A1A] group-hover:border-accent/20 group-hover:text-accent/60 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                  </div>
                </RevealItem>
              ))}
              <RevealItem className="bg-black/50 p-7 flex items-center justify-center min-h-[180px] border border-[#111]">
                <div className="text-center">
                  <div className="font-mono text-[10px] text-dim mb-2 tracking-widest">EXPANDING</div>
                  <div className="font-display text-4xl text-[#181818] font-extrabold">+</div>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </section>

        {/* ── CHAINS MARQUEE ─────────────────────────────── */}
        <ChainsMarquee />

        {/* ── WHY — white section ────────────────────────── */}
        <section className="bg-white py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left — copy */}
              <div>
                <span className="font-mono text-[10px] tracking-[0.3em] text-black/40 block mb-5 uppercase">
                  Strategic Context // Why Infrastructure Matters
                </span>
                <h2 className="font-display font-bold text-black leading-tight mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
                  The next generation of global businesses will not be defined by who{' '}
                  <em className="not-italic underline decoration-dotted">uses</em> blockchain.
                </h2>
                <p className="font-body text-lg text-black/85 leading-relaxed mb-10 max-w-lg">
                  They will be defined by who integrates on-chain infrastructure deeply enough to become faster, more programmable, and more resilient than any legacy competitor.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="/adoption" className="font-mono text-[10px] tracking-widest px-5 py-3 bg-black text-white hover:bg-black/80 transition-colors">
                    ADOPTION LAYER →
                  </a>
                  <a href="/access" className="font-mono text-[10px] tracking-widest px-5 py-3 border border-black/20 text-black/60 hover:text-black hover:border-black transition-colors">
                    INTEGRATE INFRASTRUCTURE
                  </a>
                </div>
              </div>

              {/* Right — infrastructure stack diagram */}
              <div className="space-y-1">
                {[
                  { label: 'Your Business / Application', tag: 'TOP_LAYER',    bg: 'bg-black',     text: 'text-white',     tagColor: 'text-gray-400'  },
                  { label: 'Awarizon SDK (@awarizon/web3)', tag: 'CORE_SDK',  bg: 'bg-[#FFE500]', text: 'text-black',     tagColor: 'text-black/50'  },
                  { label: 'Wallets  ·  Payments  ·  Identity', tag: 'INFRA', bg: 'bg-[#111]',    text: 'text-gray-300',  tagColor: 'text-gray-600'  },
                  { label: 'APIs  ·  Smart Contracts',  tag: 'PROTOCOL',      bg: 'bg-[#1a1a1a]', text: 'text-gray-400',  tagColor: 'text-gray-700'  },
                  { label: 'EVM Chains  (15+ Networks)', tag: 'FOUNDATION',   bg: 'bg-[#222]',    text: 'text-gray-500',  tagColor: 'text-gray-700', chains: ['ethereum','arbitrum','base','polygon','optimism','bnb'] },
                ].map((row) => (
                  <div key={row.tag} className={`${row.bg} px-6 py-4 flex items-center justify-between gap-3`}>
                    <span className={`font-mono text-sm ${row.text} font-medium`}>{row.label}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {'chains' in row && (row as any).chains?.map((c: string) => (
                        <ChainBadge key={c} name={c} size="xs" showLabel={false} />
                      ))}
                      <span className={`font-mono text-[9px] tracking-widest ${row.tagColor} ml-1`}>{row.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        {activeNodeData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6" onClick={() => setModalNode(null)}>
            <div className="absolute inset-0 bg-black/92 backdrop-blur-md" />
            <div className="relative max-w-lg w-full bg-black border border-accent/30 shadow-[0_0_80px_rgba(255,229,0,0.1)] animate-slide-up" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A]">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="sys-label">{activeNodeData.code}</span>
                </div>
                <button onClick={() => setModalNode(null)} className="font-mono text-xs text-dim hover:text-white transition-colors">ESC ✕</button>
              </div>
              <div className="p-6">
                <h2 className="font-display font-bold text-2xl text-white mb-4">{activeNodeData.label}</h2>
                <p className="font-body text-base text-muted leading-relaxed mb-6">{activeNodeData.description}</p>
                <span className="font-mono text-[10px] text-dim tracking-widest block mb-3">CAPABILITIES</span>
                <div className="flex flex-wrap gap-2">
                  {activeNodeData.tags.map(tag => (
                    <span key={tag} className="font-mono text-sm px-3 py-1.5 bg-accent/10 text-accent border border-accent/20">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-accent" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-accent/40" />
            </div>
          </div>
        )}
      </PageTransition>
    </ScrollProvider>
  )
}
