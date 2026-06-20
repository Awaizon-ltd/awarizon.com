'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '@/components/motion/PageTransition'
import ScrollProvider from '@/components/motion/ScrollProvider'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import Button from '@/components/ui/Button'
import FloatingOrbs from '@/components/ui/FloatingOrbs'

const ease = [0.16, 1, 0.3, 1] as const

const ECOSYSTEM_NODES = [
  { id: 'infra',        label: 'Infrastructure', code: 'INFRA_LAYER',   x: 50, y: 16, size: 60, primary: true,
    desc: 'Crypto wallets, on-chain payments, Web3 APIs, decentralized identity, smart contracts — the blockchain foundation.',
    connections: ['distribution', 'market'] },
  { id: 'distribution', label: 'Distribution',   code: 'DISTRIB_SYS',   x: 80, y: 50, size: 50, primary: false,
    desc: 'Global deployment pathways and integration support that move blockchain protocols into real-world operational environments.',
    connections: ['feedback'] },
  { id: 'feedback',     label: 'Feedback',        code: 'FEEDBACK_LOOP', x: 22, y: 66, size: 46, primary: false,
    desc: 'Real on-chain usage data and market signals that continuously sharpen the protocol and product.',
    connections: ['infra'] },
  { id: 'market',       label: 'Market',           code: 'MARKET_NODE',   x: 18, y: 33, size: 46, primary: false,
    desc: 'Developers, businesses, and on-chain economic activity across global markets.',
    connections: ['infra'] },
]

const LOOP_STEPS = [
  { label: 'Blockchain infrastructure creates capability', detail: 'On-chain protocols — wallets, payments, identity — that make crypto operations possible at any scale' },
  { label: 'Distribution creates global reach',           detail: 'Deployment pathways that bring blockchain infrastructure into real business environments worldwide' },
  { label: 'Real usage generates market feedback',        detail: 'On-chain behavioral data and developer signals that loop back into infrastructure refinement' },
  { label: 'Feedback sharpens the protocol',             detail: 'Continuous improvement cycles that make the infrastructure faster, more reliable, and more useful' },
]

export default function EcosystemPage() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [activeLoop, setActiveLoop] = useState<number | null>(null)

  const getNode   = (id: string) => ECOSYSTEM_NODES.find(n => n.id === id)!
  const connections = ECOSYSTEM_NODES.flatMap(n => n.connections.map(to => ({ from: n.id, to })))
  const activeNodeData = activeNode ? getNode(activeNode) : null

  return (
    <ScrollProvider>
      <PageTransition>

        {/* ── HERO ──────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
          <div className="absolute inset-0 grid-bg-static opacity-20 z-0" />
          <FloatingOrbs />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,229,0,0.04),transparent)] z-0" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen">
            <motion.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="w-1 h-6 bg-accent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-accent">LAYER_05 // ECO_GRAPH</span>
            </motion.div>

            {/* Hero heading stagger */}
            <motion.div
              className="mb-8"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } } }}
            >
              <motion.span
                className="sys-label block mb-4"
                style={{ opacity: 0.4 }}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show:   { opacity: 0.4, y: 0, transition: { duration: 0.5, ease } },
                }}
              >
                ECOSYSTEM LOGIC // SYSTEM ARCHITECTURE
              </motion.span>

              <h1 className="font-display font-extrabold leading-[0.92]" style={{ fontSize: 'clamp(2rem, 5.5vw, 5.5rem)' }}>
                {[
                  { text: 'Awarizon is not',             cls: 'text-white'    },
                  { text: 'a collection of products.',   cls: 'text-white'    },
                  { text: 'It is a connected system.',   cls: 'gradient-text' },
                ].map(({ text, cls }) => (
                  <div key={text} className="overflow-hidden">
                    <motion.span
                      className={`block ${cls}`}
                      variants={{
                        hidden: { y: '110%', opacity: 0 },
                        show:   { y: '0%',   opacity: 1, transition: { duration: 0.8, ease } },
                      }}
                    >
                      {text}
                    </motion.span>
                  </div>
                ))}
              </h1>
            </motion.div>

            <div className="flex-1 flex items-start gap-8 flex-col lg:flex-row">
              {/* ── SVG node graph ── */}
              <div className="relative flex-1 min-h-[400px]" onMouseLeave={() => setActiveNode(null)}>
                <svg viewBox="0 0 100 100" className="w-full" style={{ overflow: 'visible', minHeight: '400px' }}>
                  {/* Background grid lines */}
                  {[20, 35, 50, 65, 80].map(y => (
                    <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#FFE500"
                      strokeWidth="0.04" strokeOpacity="0.06" strokeDasharray="1 3" />
                  ))}

                  {/* Connection lines + animated data packets */}
                  {connections.map(({ from, to }, idx) => {
                    const n1 = getNode(from); const n2 = getNode(to)
                    const hi = activeNode === from || activeNode === to
                    const pathId = `eco-path-${from}-${to}`
                    const dur    = 2.2 + idx * 0.35
                    const delay  = idx * 0.5
                    return (
                      <g key={`${from}-${to}`}>
                        {/* Static connection */}
                        <line x1={`${n1.x}%`} y1={`${n1.y}%`} x2={`${n2.x}%`} y2={`${n2.y}%`}
                          stroke={hi ? '#FFE500' : '#1A1A1A'} strokeWidth={hi ? '0.5' : '0.25'}
                          style={{ transition: 'all .3s' }} />
                        <line x1={`${n1.x}%`} y1={`${n1.y}%`} x2={`${n2.x}%`} y2={`${n2.y}%`}
                          stroke="#FFE500" strokeWidth="0.35" strokeDasharray="3 8"
                          strokeOpacity={hi ? '0.65' : '0.12'} className="flow-line" />

                        {/* Invisible path for animateMotion */}
                        <path id={pathId}
                          d={`M ${n1.x} ${n1.y} L ${n2.x} ${n2.y}`}
                          fill="none" stroke="none" />

                        {/* Traveling packet */}
                        <circle r="1.1" fill="#FFE500" fillOpacity="0.9">
                          <animateMotion dur={`${dur}s`} repeatCount="indefinite" begin={`${delay}s`}>
                            <mpath href={`#${pathId}`} />
                          </animateMotion>
                        </circle>
                        {/* Trailing glow */}
                        <circle r="0.55" fill="#FFE500" fillOpacity="0.3">
                          <animateMotion dur={`${dur}s`} repeatCount="indefinite" begin={`${delay + 0.14}s`}>
                            <mpath href={`#${pathId}`} />
                          </animateMotion>
                        </circle>
                      </g>
                    )
                  })}

                  {/* Nodes */}
                  {ECOSYSTEM_NODES.map((node, ni) => {
                    const hi  = activeNode === node.id
                    const r   = (node.size / 2) / 10
                    const pr  = r + 2.2
                    return (
                      <g key={node.id} className="cursor-pointer" onMouseEnter={() => setActiveNode(node.id)}>
                        {/* Outer glow ring */}
                        <circle cx={`${node.x}%`} cy={`${node.y}%`} r={`${pr}`}
                          fill="none" stroke="#FFE500" strokeOpacity={hi ? '0.2' : '0.04'}
                          strokeWidth="0.25" style={{ transition: 'all .3s' }} />

                        {/* Pulse expand ring — always animating */}
                        <circle cx={`${node.x}%`} cy={`${node.y}%`} r={`${r}`}
                          fill="none" stroke="#FFE500" strokeWidth="0.3" strokeOpacity="0">
                          <animate attributeName="r" from={`${r}`} to={`${r + 10}`}
                            dur={`${2.8 + ni * 0.6}s`} repeatCount="indefinite" begin={`${ni * 0.7}s`} />
                          <animate attributeName="stroke-opacity" from="0.45" to="0"
                            dur={`${2.8 + ni * 0.6}s`} repeatCount="indefinite" begin={`${ni * 0.7}s`} />
                        </circle>

                        {/* Main circle */}
                        <circle cx={`${node.x}%`} cy={`${node.y}%`} r={`${r}`}
                          fill={hi ? '#FFE50012' : '#070707'} stroke="#FFE500"
                          strokeOpacity={hi ? '0.8' : node.primary ? '0.4' : '0.2'}
                          strokeWidth={node.primary ? '0.4' : '0.25'}
                          style={{ transition: 'all .3s' }} />

                        {/* Center dot */}
                        <circle cx={`${node.x}%`} cy={`${node.y}%`} r="1.2"
                          fill="#FFE500" opacity={hi ? '1' : '0.45'} style={{ transition: 'all .3s' }}>
                          {node.primary && (
                            <animate attributeName="opacity" values="0.45;0.9;0.45" dur="2s" repeatCount="indefinite" />
                          )}
                        </circle>

                        {/* Label below */}
                        <text x={`${node.x}%`} y={`${node.y + r + 4.5}%`} textAnchor="middle" fontSize="2.5"
                          fill={hi ? '#FFE500' : '#555'} fontFamily="JetBrains Mono, monospace"
                          fontWeight={hi ? 'bold' : 'normal'} style={{ transition: 'all .3s', userSelect: 'none' }}>
                          {node.label}
                        </text>
                        {/* Code label above */}
                        <text x={`${node.x}%`} y={`${node.y - r - 2.5}%`} textAnchor="middle" fontSize="1.5"
                          fill={hi ? '#FFE50055' : '#252525'} fontFamily="JetBrains Mono, monospace"
                          style={{ transition: 'all .3s', userSelect: 'none' }}>
                          {node.code}
                        </text>
                      </g>
                    )
                  })}
                </svg>
                <p className="text-center font-mono text-[10px] text-dim animate-pulse-slow mt-2">
                  HOVER NODES TO INSPECT
                </p>
              </div>

              {/* Info panel */}
              <div className="lg:w-80 shrink-0">
                {activeNodeData ? (
                  <div className="border border-accent/30 bg-black p-6 animate-slide-up relative">
                    <div className="sys-label mb-3">{activeNodeData.code}</div>
                    <h2 className="font-display font-bold text-xl text-white mb-4">{activeNodeData.label}</h2>
                    <p className="font-body text-base text-muted leading-relaxed mb-5">{activeNodeData.desc}</p>
                    {activeNodeData.connections.length > 0 && (
                      <div>
                        <div className="font-mono text-[10px] text-dim tracking-widest mb-2">CONNECTS TO</div>
                        <div className="flex flex-wrap gap-1.5">
                          {activeNodeData.connections.map(cId => {
                            const cn = getNode(cId)
                            return (
                              <span key={cId} className="font-mono text-[10px] px-2 py-1 bg-accent/10 text-accent border border-accent/20">
                                {cn.label}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent" />
                  </div>
                ) : (
                  <div className="border border-[#1A1A1A] bg-[#040404] p-6">
                    <div className="sys-label opacity-40 mb-4">SYSTEM_MANIFEST</div>
                    <p className="font-body text-base text-muted leading-relaxed mb-5">
                      Each layer strengthens the next. Blockchain infrastructure creates capability.
                      Distribution creates global reach. Market feedback closes the loop.
                    </p>
                    <div className="h-px bg-gradient-to-r from-accent/20 to-transparent mb-5" />
                    <div className="font-mono text-xs text-dim space-y-1">
                      <div>TOTAL NODES: {ECOSYSTEM_NODES.length}</div>
                      <div>CONNECTIONS: {connections.length}</div>
                      <div>STATUS: OPERATIONAL</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── LOOP STEPS ────────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-14">
              <span className="sys-label opacity-40 block mb-4">SYSTEM_LOOP // CONTINUOUS IMPROVEMENT</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white">The technical loop.</h2>
            </Reveal>

            <div className="relative">
              <div className="absolute left-[7px] top-6 bottom-6 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent hidden md:block" />
              <RevealGroup className="space-y-px" stagger={0.08}>
                {LOOP_STEPS.map((step, i) => (
                  <RevealItem key={i}>
                    <button
                      className={`w-full flex items-start gap-6 p-7 border-b border-[#0D0D0D] text-left group transition-all duration-300 ${
                        activeLoop === i
                          ? 'bg-accent/[0.04] border-l-2 border-l-accent'
                          : 'hover:bg-[#040404] border-l-2 border-l-transparent'
                      }`}
                      onMouseEnter={() => setActiveLoop(i)}
                      onMouseLeave={() => setActiveLoop(null)}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full border mt-1 shrink-0 transition-all duration-300 ${
                        activeLoop === i
                          ? 'border-accent bg-accent shadow-[0_0_10px_rgba(255,229,0,0.6)]'
                          : 'border-[#2A2A2A]'
                      }`} />
                      <div className="flex-1">
                        <div className="font-mono text-[10px] text-dim mb-2">LOOP_{String(i + 1).padStart(2, '0')}</div>
                        <h3 className={`font-display font-bold text-xl mb-1 transition-colors duration-300 ${activeLoop === i ? 'text-accent' : 'text-white'}`}>
                          {step.label}
                        </h3>
                        {activeLoop === i && (
                          <p className="font-body text-base text-muted animate-slide-up">{step.detail}</p>
                        )}
                      </div>
                      <div className={`font-mono text-lg shrink-0 transition-all duration-300 ${activeLoop === i ? 'text-accent' : 'text-dim'}`}>→</div>
                    </button>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>

        {/* ── POSITIONING ───────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#030303] relative overflow-hidden">
          <FloatingOrbs orbs={[
            { w: 460, h: 340, left: '-5%',  top: '10%', delay: '0s',  duration: '9s',  opacity: 0.055 },
            { w: 320, h: 260, left: '60%',  top: '30%', delay: '2s',  duration: '12s', opacity: 0.04  },
          ]} />
          <div className="relative max-w-6xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 border border-accent/20 px-4 py-2 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="sys-label">TECHNICAL POSITIONING</span>
              </div>
              <p className="font-display font-bold text-2xl md:text-3xl text-white max-w-3xl mx-auto leading-relaxed">
                Awarizon operates as a{' '}
                <span className="text-accent">global blockchain infrastructure and distribution company</span>{' '}
                focused on turning on-chain capability into real-world utility — for developers, businesses, and builders.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-8">
            <Reveal>
              <span className="sys-label opacity-40 block mb-2">NEXT_LAYER</span>
              <p className="font-display font-semibold text-3xl text-white">Why we exist here.</p>
            </Reveal>
            <Reveal delay={0.15}>
              <Button href="/thesis" variant="primary" size="lg">Global Adoption Thesis →</Button>
            </Reveal>
          </div>
        </section>

      </PageTransition>
    </ScrollProvider>
  )
}
