'use client'

import { useState } from 'react'
import PageTransition from '@/components/motion/PageTransition'
import ScrollProvider from '@/components/motion/ScrollProvider'
import Button from '@/components/ui/Button'

const ECOSYSTEM_NODES = [
  { id:'infra',    label:'Infrastructure', code:'INFRA_LAYER',   x:50, y:16, size:60, primary:true,  desc:'Wallets, Payments, APIs, Identity, Automation — the technical foundation.',              connections:['distribution','market'] },
  { id:'distribution', label:'Distribution',  code:'DISTRIB_SYS', x:80, y:50, size:50, primary:false, desc:'Deployment pathways and integration support that move infrastructure into real environments.',connections:['consumer'] },
  { id:'consumer', label:'Consumer',      code:'CONSUMER_LAYER', x:60, y:83, size:50, primary:false, desc:'Products like Zela that surface infrastructure as natural daily experiences.',               connections:['feedback'] },
  { id:'feedback', label:'Feedback',      code:'FEEDBACK_LOOP',  x:22, y:66, size:46, primary:false, desc:'Real-world usage data and market signals that continuously improve the system.',            connections:['infra'] },
  { id:'market',   label:'Market',        code:'MARKET_NODE',    x:18, y:33, size:46, primary:false, desc:'Businesses, consumers, and economic activity across emerging markets.',                    connections:['infra'] },
]

const LOOP_STEPS = [
  { label:'Infrastructure creates capability',  detail:'Technical systems that make digital operations possible' },
  { label:'Distribution creates reach',          detail:'Deployment pathways that bring systems into real environments' },
  { label:'Consumer products create validation', detail:'Real usage that generates intelligence and trust' },
  { label:'Feedback improves the system',        detail:'Behavioural data loops back into infrastructure refinement' },
]

export default function EcosystemPage() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [activeLoop, setActiveLoop] = useState<number | null>(null)

  const getNode = (id: string) => ECOSYSTEM_NODES.find(n => n.id === id)!
  const connections = ECOSYSTEM_NODES.flatMap(n => n.connections.map(to => ({ from:n.id, to })))
  const activeNodeData = activeNode ? getNode(activeNode) : null

  return (
    <ScrollProvider>
      <PageTransition>

        {/* ── HERO ──────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
          <div className="absolute inset-0 grid-bg-static opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,229,0,0.04),transparent)]" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-1 h-6 bg-accent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-accent">LAYER_05 // ECO_GRAPH</span>
            </div>

            <div className="mb-8 reveal">
              <span className="sys-label opacity-40 block mb-4">ECOSYSTEM LOGIC // SYSTEM ARCHITECTURE</span>
              <h1 className="font-display font-extrabold leading-[0.92]" style={{ fontSize:'clamp(2rem, 5.5vw, 5.5rem)' }}>
                <span className="block text-white">Awarizon is not</span>
                <span className="block text-white">a collection of products.</span>
                <span className="block gradient-text">It is a connected system.</span>
              </h1>
            </div>

            <div className="flex-1 flex items-start gap-8 flex-col lg:flex-row">
              {/* Graph */}
              <div className="relative flex-1 min-h-[400px]" onMouseLeave={() => setActiveNode(null)}>
                <svg viewBox="0 0 100 100" className="w-full" style={{ overflow:'visible', minHeight:'400px' }}>
                  {[20,35,50,65,80].map(y => (
                    <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#FFE500" strokeWidth="0.04" strokeOpacity="0.06" strokeDasharray="1 3" />
                  ))}
                  {connections.map(({ from, to }) => {
                    const n1 = getNode(from); const n2 = getNode(to)
                    const hi = activeNode === from || activeNode === to
                    return (
                      <g key={`${from}-${to}`}>
                        <line x1={`${n1.x}%`} y1={`${n1.y}%`} x2={`${n2.x}%`} y2={`${n2.y}%`}
                          stroke={hi ? '#FFE500' : '#1A1A1A'} strokeWidth={hi ? '0.5' : '0.25'}
                          style={{ transition:'all .3s' }} />
                        <line x1={`${n1.x}%`} y1={`${n1.y}%`} x2={`${n2.x}%`} y2={`${n2.y}%`}
                          stroke="#FFE500" strokeWidth="0.35" strokeDasharray="3 8"
                          strokeOpacity={hi ? '0.65' : '0.12'} className="flow-line" />
                      </g>
                    )
                  })}
                  {ECOSYSTEM_NODES.map(node => {
                    const hi = activeNode === node.id
                    const r = (node.size / 2) / 10
                    return (
                      <g key={node.id} className="cursor-pointer"
                        onMouseEnter={() => setActiveNode(node.id)}>
                        <circle cx={`${node.x}%`} cy={`${node.y}%`} r={`${r + 1.8}`}
                          fill="none" stroke="#FFE500" strokeOpacity={hi ? '0.2' : '0.04'} strokeWidth="0.25" style={{ transition:'all .3s' }} />
                        <circle cx={`${node.x}%`} cy={`${node.y}%`} r={`${r}`}
                          fill={hi ? '#FFE50012' : '#070707'} stroke="#FFE500"
                          strokeOpacity={hi ? '0.8' : node.primary ? '0.4' : '0.2'}
                          strokeWidth={node.primary ? '0.4' : '0.25'} style={{ transition:'all .3s' }} />
                        <circle cx={`${node.x}%`} cy={`${node.y}%`} r="1.1"
                          fill="#FFE500" opacity={hi ? '1' : '0.4'} style={{ transition:'all .3s' }} />
                        <text x={`${node.x}%`} y={`${node.y + r + 4}%`} textAnchor="middle" fontSize="2.5"
                          fill={hi ? '#FFE500' : '#555'} fontFamily="JetBrains Mono, monospace"
                          fontWeight={hi ? 'bold' : 'normal'} style={{ transition:'all .3s', userSelect:'none' }}>
                          {node.label}
                        </text>
                        <text x={`${node.x}%`} y={`${node.y - r - 2.2}%`} textAnchor="middle" fontSize="1.5"
                          fill={hi ? '#FFE50055' : '#252525'} fontFamily="JetBrains Mono, monospace"
                          style={{ transition:'all .3s', userSelect:'none' }}>
                          {node.code}
                        </text>
                      </g>
                    )
                  })}
                </svg>
                <p className="text-center font-mono text-[10px] text-dim animate-pulse-slow mt-2">HOVER NODES TO INSPECT</p>
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
                            return <span key={cId} className="font-mono text-[10px] px-2 py-1 bg-accent/10 text-accent border border-accent/20">{cn.label}</span>
                          })}
                        </div>
                      </div>
                    )}
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent" />
                  </div>
                ) : (
                  <div className="border border-[#1A1A1A] bg-[#040404] p-6">
                    <div className="sys-label opacity-40 mb-4">SYSTEM_MANIFEST</div>
                    <p className="font-body text-base text-muted leading-relaxed mb-5">Each layer strengthens the next. Infrastructure creates capability. Distribution creates reach. Consumer products create validation.</p>
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
            <div className="mb-14 reveal">
              <span className="sys-label opacity-40 block mb-4">SYSTEM_LOOP // CONTINUOUS IMPROVEMENT</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white">The technical loop.</h2>
            </div>
            <div className="relative">
              <div className="absolute left-[7px] top-6 bottom-6 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent hidden md:block" />
              <div className="space-y-px">
                {LOOP_STEPS.map((step, i) => (
                  <button key={i}
                    className={`w-full flex items-start gap-6 p-7 border-b border-[#0D0D0D] text-left group transition-all duration-300 reveal ${
                      activeLoop === i ? 'bg-accent/[0.04] border-l-2 border-l-accent' : 'hover:bg-[#040404] border-l-2 border-l-transparent'
                    }`}
                    style={{ transitionDelay:`${i*80}ms` }}
                    onMouseEnter={() => setActiveLoop(i)}
                    onMouseLeave={() => setActiveLoop(null)}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border mt-1 shrink-0 transition-all duration-300 ${
                      activeLoop === i ? 'border-accent bg-accent shadow-[0_0_10px_rgba(255,229,0,0.6)]' : 'border-[#2A2A2A]'
                    }`} />
                    <div className="flex-1">
                      <div className="font-mono text-[10px] text-dim mb-2">LOOP_{String(i+1).padStart(2,'0')}</div>
                      <h3 className={`font-display font-bold text-xl mb-1 transition-colors duration-300 ${activeLoop===i ? 'text-accent' : 'text-white'}`}>
                        {step.label}
                      </h3>
                      {activeLoop === i && (
                        <p className="font-body text-base text-muted animate-slide-up">{step.detail}</p>
                      )}
                    </div>
                    <div className={`font-mono text-lg shrink-0 transition-all duration-300 ${activeLoop===i ? 'text-accent' : 'text-dim'}`}>→</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── POSITIONING ─────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#030303]">
          <div className="max-w-6xl mx-auto text-center reveal">
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
        </section>

        {/* ── CTA ─────────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-8">
            <div className="reveal">
              <span className="sys-label opacity-40 block mb-2">NEXT_LAYER</span>
              <p className="font-display font-semibold text-3xl text-white">Why we exist here.</p>
            </div>
            <div className="reveal reveal-delay-2">
              <Button href="/thesis" variant="primary" size="lg">Emerging Markets Thesis →</Button>
            </div>
          </div>
        </section>

      </PageTransition>
    </ScrollProvider>
  )
}
