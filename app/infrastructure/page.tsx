'use client'

import { useState, useRef } from 'react'
import PageTransition from '@/components/motion/PageTransition'
import ScrollProvider from '@/components/motion/ScrollProvider'
import Button from '@/components/ui/Button'
import { INFRASTRUCTURE_NODES } from '@/lib/constants'

const CONNECTIONS = [
  ['wallet', 'payments'],
  ['payments', 'identity'],
  ['identity', 'apis'],
  ['apis', 'automation'],
  ['automation', 'wallet'],
  ['wallet', 'apis'],
  ['payments', 'automation'],
]

export default function InfrastructurePage() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [modalNode, setModalNode] = useState<string | null>(null)

  const getNode = (id: string) => INFRASTRUCTURE_NODES.find(n => n.id === id)
  const activeNodeData = modalNode ? getNode(modalNode) : null

  function getNodePos(id: string) {
    const node = getNode(id)
    if (!node) return { x: 0, y: 0 }
    return { x: node.x, y: node.y }
  }

  return (
    <ScrollProvider>
      <PageTransition>
        {/* ─── Hero with server-room image ─── */}
        <section className="img-bg img-bg-strong relative min-h-screen flex flex-col overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="bg-photo"
            src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&q=80"
            alt=""
            aria-hidden="true"
          />
          <div className="img-overlay bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,229,0,0.07),transparent)]" />
          <div className="img-overlay grid-bg-static opacity-20" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen">
            <div className="flex items-center gap-4 mb-16">
              <div className="flex items-center gap-2">
                <span className="w-1 h-6 bg-accent" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-accent">LAYER_02</span>
              </div>
              <span className="font-mono text-[10px] text-dim">INFRA_NODE // ACTIVE</span>
            </div>

            <div className="mb-12 reveal">
              <h1 className="font-display font-bold leading-none mb-6" style={{ fontSize: 'clamp(2.8rem, 7.5vw, 9rem)' }}>
                <span className="block text-white">We build</span>
                <span className="block text-white">the systems</span>
                <span className="block gradient-text">that make digital</span>
                <span className="block text-white">operations possible.</span>
              </h1>
              <p className="font-body text-xl text-muted max-w-xl leading-relaxed">
                Modular infrastructure layers designed to connect with how businesses actually work — not isolated software products.
              </p>
            </div>

            {/* Node Graph */}
            <div className="flex-1 flex items-center justify-center mt-8">
              <div className="relative w-full max-w-2xl" style={{ paddingBottom: '70%' }}>
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full"
                  style={{ overflow: 'visible' }}
                >
                  {CONNECTIONS.map(([from, to]) => {
                    const p1 = getNodePos(from)
                    const p2 = getNodePos(to)
                    const isActive = activeNode === from || activeNode === to
                    return (
                      <g key={`${from}-${to}`}>
                        <line x1={`${p1.x}%`} y1={`${p1.y}%`} x2={`${p2.x}%`} y2={`${p2.y}%`}
                          stroke={isActive ? '#FFE500' : '#1A1A1A'}
                          strokeWidth={isActive ? '0.4' : '0.3'}
                          className="transition-all duration-300"
                        />
                        <line x1={`${p1.x}%`} y1={`${p1.y}%`} x2={`${p2.x}%`} y2={`${p2.y}%`}
                          stroke="#FFE500" strokeWidth="0.4" strokeDasharray="3 6"
                          strokeOpacity={isActive ? '0.8' : '0.3'} className="flow-line transition-all duration-300"
                        />
                      </g>
                    )
                  })}

                  {INFRASTRUCTURE_NODES.map((node) => {
                    const isActive = activeNode === node.id
                    return (
                      <g key={node.id}>
                        <circle cx={`${node.x}%`} cy={`${node.y}%`} r={isActive ? '3.5' : '2.8'}
                          fill="none" stroke="#FFE500" strokeOpacity={isActive ? '0.4' : '0.15'} strokeWidth="0.3"
                          className="transition-all duration-300" />
                        {isActive && (
                          <circle cx={`${node.x}%`} cy={`${node.y}%`} r="5"
                            fill="none" stroke="#FFE500" strokeOpacity="0.1" strokeWidth="0.3" />
                        )}
                        <circle cx={`${node.x}%`} cy={`${node.y}%`} r={isActive ? '2' : '1.5'}
                          fill={isActive ? '#FFE500' : '#111'} stroke="#FFE500"
                          strokeOpacity={isActive ? '1' : '0.5'} strokeWidth="0.3"
                          className="cursor-pointer transition-all duration-300"
                          onMouseEnter={() => setActiveNode(node.id)}
                          onMouseLeave={() => setActiveNode(null)}
                          onClick={() => setModalNode(node.id)}
                        />
                        <text x={`${node.x}%`} y={`${node.y + 6}%`} textAnchor="middle" fontSize="2.4"
                          fill={isActive ? '#FFE500' : '#555'} fontFamily="DM Mono, monospace"
                          className="transition-all duration-300 select-none pointer-events-none">
                          {node.label}
                        </text>
                        <text x={`${node.x}%`} y={`${node.y - 5}%`} textAnchor="middle" fontSize="1.6"
                          fill={isActive ? '#FFE50080' : '#33333380'} fontFamily="DM Mono, monospace"
                          className="transition-all duration-300 select-none pointer-events-none">
                          {node.code}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>
            </div>
            <p className="text-center font-mono text-xs text-dim mt-4 animate-pulse-slow">
              HOVER TO ACTIVATE — CLICK TO INSPECT NODE
            </p>
          </div>
        </section>

        {/* ─── Cards ─── */}
        <section className="py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 reveal">
              <span className="sys-label opacity-40 block mb-4">SYSTEM MANIFEST // INFRASTRUCTURE COMPONENTS</span>
              <div className="h-px bg-gradient-to-r from-accent/30 to-transparent" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0D0D0D]">
              {INFRASTRUCTURE_NODES.map((node, i) => (
                <div
                  key={node.id}
                  className="bg-black p-7 border-l border-[#111] hover:border-l-accent hover:bg-[#050505] transition-all duration-300 reveal group cursor-pointer"
                  style={{ transitionDelay: `${i * 100}ms` }}
                  onClick={() => setModalNode(node.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] tracking-widest text-accent/60 group-hover:text-accent transition-colors">{node.code}</span>
                    <span className="font-mono text-[10px] text-dim">ACTIVE</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-3 h-3">
                      <span className="absolute inset-0 rounded-full bg-accent/20 animate-ping" style={{ animationDuration: `${3 + i * 0.5}s` }} />
                      <span className="relative block w-3 h-3 rounded-full border border-accent/40 bg-accent/10" />
                    </div>
                    <h3 className="font-display font-semibold text-white text-lg">{node.label}</h3>
                  </div>
                  <p className="font-body text-sm text-muted leading-relaxed mb-5">{node.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {node.tags.map(tag => (
                      <span key={tag} className="font-mono text-[10px] px-2 py-1 bg-[#111] text-dim border border-[#1A1A1A] group-hover:text-accent/60 group-hover:border-accent/20 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="bg-black p-7 flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <div className="font-mono text-[10px] text-dim mb-2 tracking-widest">EXPANDING</div>
                  <div className="font-display text-3xl text-[#1A1A1A] font-bold">+</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Why matters — image accent ─── */}
        <section className="img-bg relative py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="bg-photo"
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80"
            alt=""
            aria-hidden="true"
          />
          <div className="img-overlay bg-gradient-to-r from-black via-black/90 to-black/70" />

          <div className="relative max-w-4xl mx-auto">
            <div className="reveal">
              <span className="sys-label opacity-40 block mb-6">STRATEGIC CONTEXT</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-8 leading-tight">
                The next generation of businesses will not be defined by who{' '}
                <em className="not-italic text-muted">uses</em> technology.
              </h2>
              <p className="font-body text-lg md:text-xl text-muted leading-relaxed mb-8 max-w-2xl">
                They will be defined by who integrates technology deeply enough to become faster, more scalable, and more resilient. Awarizon helps make that transition possible.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/adoption" variant="primary">Adoption Layer →</Button>
                <Button href="/access" variant="ghost">Integrate Infrastructure</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        {activeNodeData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6" onClick={() => setModalNode(null)}>
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
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
