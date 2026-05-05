'use client'

import { useState } from 'react'
import PageTransition from '@/components/motion/PageTransition'
import ScrollProvider from '@/components/motion/ScrollProvider'
import Button from '@/components/ui/Button'

const ECOSYSTEM_NODES = [
  {
    id: 'infra',
    label: 'Infrastructure',
    code: 'INFRA_LAYER',
    x: 50,
    y: 15,
    size: 64,
    desc: 'Wallets, Payments, APIs, Identity, Automation — the technical foundation enabling everything above it.',
    connections: ['distribution', 'market'],
    primary: true,
  },
  {
    id: 'distribution',
    label: 'Distribution',
    code: 'DISTRIB_SYS',
    x: 78,
    y: 50,
    size: 52,
    desc: 'Deployment pathways, integration support, and adoption systems that move infrastructure into real environments.',
    connections: ['consumer'],
    primary: false,
  },
  {
    id: 'consumer',
    label: 'Consumer',
    code: 'CONSUMER_LAYER',
    x: 60,
    y: 82,
    size: 52,
    desc: 'Products like Zela that surface infrastructure capabilities as natural, everyday user experiences.',
    connections: ['feedback'],
    primary: false,
  },
  {
    id: 'feedback',
    label: 'Feedback',
    code: 'FEEDBACK_LOOP',
    x: 22,
    y: 65,
    size: 48,
    desc: 'Real-world usage data, behavioral intelligence, and market signals that continuously improve the system.',
    connections: ['infra'],
    primary: false,
  },
  {
    id: 'market',
    label: 'Market',
    code: 'MARKET_NODE',
    x: 18,
    y: 32,
    size: 48,
    desc: 'The operational environment — businesses, consumers, and economic activity across emerging markets.',
    connections: ['infra'],
    primary: false,
  },
]

const LOOP_STEPS = [
  { label: 'Infrastructure creates capability', detail: 'Technical systems that make digital operations possible' },
  { label: 'Distribution creates reach', detail: 'Deployment pathways that bring systems into real environments' },
  { label: 'Consumer products create validation', detail: 'Real usage that generates intelligence and trust' },
  { label: 'Feedback improves the system', detail: 'Behavioral data loops back into infrastructure refinement' },
]

export default function EcosystemPage() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [activeLoop, setActiveLoop] = useState<number | null>(null)

  const getNode = (id: string) => ECOSYSTEM_NODES.find(n => n.id === id)

  function getAllConnections() {
    const connections: Array<{ from: string; to: string }> = []
    ECOSYSTEM_NODES.forEach(node => {
      node.connections.forEach(to => {
        connections.push({ from: node.id, to })
      })
    })
    return connections
  }

  const connections = getAllConnections()
  const activeNodeData = activeNode ? getNode(activeNode) : null

  return (
    <ScrollProvider>
      <PageTransition>
        {/* Hero */}
        <section className="relative min-h-screen flex flex-col overflow-hidden">
          <div className="absolute inset-0 grid-bg-static opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,229,0,0.04),transparent)]" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen">
            {/* Layer ID */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center gap-2">
                <span className="w-1 h-6 bg-accent" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-accent">LAYER_05</span>
              </div>
              <span className="font-mono text-[10px] text-dim">ECO_GRAPH // ACTIVE</span>
            </div>

            <div className="mb-8 reveal">
              <span className="sys-label opacity-40 block mb-4">ECOSYSTEM LOGIC // SYSTEM ARCHITECTURE</span>
              <h1 className="font-display font-bold leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}>
                <span className="block text-white">Awarizon is not</span>
                <span className="block text-white">a collection of products.</span>
                <span className="block gradient-text">It is a connected system.</span>
              </h1>
            </div>

            {/* Main ecosystem diagram */}
            <div className="flex-1 flex items-start gap-8 flex-col lg:flex-row">
              {/* SVG Architecture Graph */}
              <div className="relative flex-1 min-h-[400px] lg:min-h-[500px]">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  style={{ overflow: 'visible', minHeight: '400px' }}
                >
                  {/* Connections */}
                  {connections.map(({ from, to }) => {
                    const n1 = getNode(from)
                    const n2 = getNode(to)
                    if (!n1 || !n2) return null
                    const isHighlighted = activeNode === from || activeNode === to

                    return (
                      <g key={`${from}-${to}`}>
                        {/* Base line */}
                        <line
                          x1={`${n1.x}%`} y1={`${n1.y}%`}
                          x2={`${n2.x}%`} y2={`${n2.y}%`}
                          stroke={isHighlighted ? '#FFE500' : '#1A1A1A'}
                          strokeWidth={isHighlighted ? '0.5' : '0.3'}
                          className="transition-all duration-300"
                        />
                        {/* Flow animation */}
                        <line
                          x1={`${n1.x}%`} y1={`${n1.y}%`}
                          x2={`${n2.x}%`} y2={`${n2.y}%`}
                          stroke="#FFE500"
                          strokeWidth="0.4"
                          strokeDasharray="3 8"
                          strokeOpacity={isHighlighted ? '0.7' : '0.15'}
                          className="flow-line transition-all duration-300"
                        />
                      </g>
                    )
                  })}

                  {/* Nodes */}
                  {ECOSYSTEM_NODES.map((node) => {
                    const isActive = activeNode === node.id
                    const r = (node.size / 2) / 10

                    return (
                      <g
                        key={node.id}
                        className="cursor-pointer"
                        onMouseEnter={() => setActiveNode(node.id)}
                        onMouseLeave={() => setActiveNode(null)}
                      >
                        {/* Outer glow ring */}
                        <circle
                          cx={`${node.x}%`} cy={`${node.y}%`}
                          r={`${r + 1.5}`}
                          fill="none"
                          stroke="#FFE500"
                          strokeOpacity={isActive ? '0.2' : '0.05'}
                          strokeWidth="0.3"
                          className="transition-all duration-300"
                        />
                        {/* Main circle */}
                        <circle
                          cx={`${node.x}%`} cy={`${node.y}%`}
                          r={`${r}`}
                          fill={isActive ? '#FFE50015' : '#080808'}
                          stroke="#FFE500"
                          strokeOpacity={isActive ? '0.8' : node.primary ? '0.4' : '0.2'}
                          strokeWidth={node.primary ? '0.4' : '0.3'}
                          className="transition-all duration-300"
                        />
                        {/* Inner dot */}
                        <circle
                          cx={`${node.x}%`} cy={`${node.y}%`}
                          r="1"
                          fill="#FFE500"
                          opacity={isActive ? '1' : '0.4'}
                          className="transition-all duration-300"
                        />
                        {/* Label */}
                        <text
                          x={`${node.x}%`}
                          y={`${node.y + r + 3.5}%`}
                          textAnchor="middle"
                          fontSize="2.4"
                          fill={isActive ? '#FFE500' : '#666'}
                          fontFamily="DM Mono, monospace"
                          fontWeight={isActive ? 'bold' : 'normal'}
                          className="transition-all duration-300 select-none"
                        >
                          {node.label}
                        </text>
                        {/* Code label */}
                        <text
                          x={`${node.x}%`}
                          y={`${node.y - r - 2}%`}
                          textAnchor="middle"
                          fontSize="1.5"
                          fill={isActive ? '#FFE50060' : '#2A2A2A'}
                          fontFamily="DM Mono, monospace"
                          className="transition-all duration-300 select-none"
                        >
                          {node.code}
                        </text>
                      </g>
                    )
                  })}
                </svg>

                {/* HINT */}
                <div className="absolute bottom-0 left-0 right-0 text-center">
                  <p className="font-mono text-[10px] text-dim animate-pulse-slow">
                    HOVER NODES TO INSPECT SYSTEM
                  </p>
                </div>
              </div>

              {/* Right panel: Active node info or loop */}
              <div className="lg:w-80 shrink-0">
                {activeNodeData ? (
                  <div className="border border-accent/30 bg-black p-6 animate-slide-up">
                    <div className="sys-label mb-3">{activeNodeData.code}</div>
                    <h2 className="font-display font-bold text-xl text-white mb-4">{activeNodeData.label}</h2>
                    <p className="font-body text-sm text-muted leading-relaxed mb-4">{activeNodeData.desc}</p>

                    {activeNodeData.connections.length > 0 && (
                      <div>
                        <div className="font-mono text-[10px] text-dim tracking-widest mb-2">CONNECTS TO</div>
                        <div className="flex flex-wrap gap-1.5">
                          {activeNodeData.connections.map(cId => {
                            const cn = getNode(cId)
                            return cn ? (
                              <span key={cId} className="font-mono text-[10px] px-2 py-1 bg-accent/10 text-accent border border-accent/20">
                                {cn.label}
                              </span>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent" />
                  </div>
                ) : (
                  <div className="border border-[#1A1A1A] bg-[#050505] p-6">
                    <div className="sys-label opacity-40 mb-4">SYSTEM_MANIFEST</div>
                    <p className="font-body text-sm text-muted leading-relaxed">
                      Each layer strengthens the next. Infrastructure creates capability. Distribution creates reach. Consumer products create validation.
                    </p>
                    <div className="mt-4 h-px bg-gradient-to-r from-accent/20 to-transparent" />
                    <div className="mt-4 font-mono text-xs text-dim">
                      TOTAL NODES: {ECOSYSTEM_NODES.length}<br />
                      CONNECTIONS: {connections.length}<br />
                      STATUS: OPERATIONAL
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* The loop */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 reveal">
              <span className="sys-label opacity-40 block mb-4">SYSTEM_LOOP // CONTINUOUS IMPROVEMENT</span>
              <h2 className="font-display font-bold text-3xl text-white">The technical loop.</h2>
            </div>

            <div className="relative">
              {/* Connecting spine */}
              <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent hidden md:block" />

              <div className="space-y-px">
                {LOOP_STEPS.map((step, i) => (
                  <button
                    key={i}
                    className={`w-full flex items-start gap-6 p-6 border-b border-[#0D0D0D] text-left group transition-all duration-300 reveal ${
                      activeLoop === i ? 'bg-accent/5 border-l border-l-accent' : 'hover:bg-[#040404]'
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                    onMouseEnter={() => setActiveLoop(i)}
                    onMouseLeave={() => setActiveLoop(null)}
                  >
                    {/* Step dot */}
                    <div className="shrink-0 relative">
                      <div className={`w-3 h-3 rounded-full border transition-all duration-300 mt-1 ${
                        activeLoop === i ? 'border-accent bg-accent shadow-[0_0_10px_rgba(255,229,0,0.6)]' : 'border-[#333] bg-transparent'
                      }`} />
                    </div>

                    <div className="flex-1">
                      <div className="font-mono text-[10px] text-dim mb-2">LOOP_STEP_{String(i + 1).padStart(2, '0')}</div>
                      <h3 className={`font-display font-bold text-lg mb-1 transition-colors duration-300 ${
                        activeLoop === i ? 'text-accent' : 'text-white group-hover:text-white'
                      }`}>
                        {step.label}
                      </h3>
                      {activeLoop === i && (
                        <p className="font-body text-sm text-muted animate-slide-up">{step.detail}</p>
                      )}
                    </div>

                    <div className={`font-mono text-lg shrink-0 transition-all duration-300 ${
                      activeLoop === i ? 'text-accent' : 'text-dim'
                    }`}>
                      →
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technical positioning */}
        <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#040404]">
          <div className="max-w-6xl mx-auto text-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 border border-accent/20 px-4 py-2 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="sys-label">TECHNICAL POSITIONING</span>
              </div>
              <p className="font-display font-bold text-2xl md:text-3xl text-white max-w-3xl mx-auto leading-relaxed">
                Awarizon operates as a{' '}
                <span className="text-accent">technology development and distribution company</span>{' '}
                focused on turning digital capability into real-world utility.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-8">
            <div className="reveal">
              <span className="sys-label opacity-40 block mb-2">NEXT_LAYER</span>
              <p className="font-display font-semibold text-2xl text-white">Why we exist here.</p>
            </div>
            <div className="reveal reveal-delay-2">
              <Button href="/thesis" variant="primary" size="lg">
                Emerging Markets Thesis →
              </Button>
            </div>
          </div>
        </section>

      </PageTransition>
    </ScrollProvider>
  )
}
