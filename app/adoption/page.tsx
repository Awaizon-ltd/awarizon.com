'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '@/components/motion/PageTransition'
import ScrollProvider from '@/components/motion/ScrollProvider'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import Button from '@/components/ui/Button'
import CountUp from '@/components/ui/CountUp'
import FloatingOrbs from '@/components/ui/FloatingOrbs'
import { ADOPTION_FLOW } from '@/lib/constants'

const ease = [0.16, 1, 0.3, 1] as const

const PRINCIPLES = [
  { code: 'PRIN_01', title: 'Blockchain products developers can actually ship',    desc: 'Built for real developer and business constraints — not imported assumptions about how Web3 adoption works in practice.' },
  { code: 'PRIN_02', title: 'Infrastructure businesses can integrate',              desc: 'Deployment pathways built for organizations without dedicated blockchain teams, with compliance requirements, and operating in markets with unique constraints.' },
  { code: 'PRIN_03', title: 'Protocols that reduce friction',                       desc: 'Web3 infrastructure should simplify operations — not introduce new complexity that requires specialist knowledge to manage.' },
  { code: 'PRIN_04', title: 'Distribution that fits local behaviour',               desc: 'Global distribution is architecture — designed around how people and businesses in each market actually earn, spend, and transact on-chain.' },
]

const METRICS = [
  { val: 2,  suffix: '×',  label: 'Faster integration vs legacy systems' },
  { val: 94, suffix: '%',  label: 'On-chain adoption retention'          },
  { val: 72, suffix: 'h',  label: 'Avg time to go live on-chain'         },
]

export default function AdoptionPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <ScrollProvider>
      <PageTransition>

        {/* ── HERO ──────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
          <div className="absolute inset-0 grid-bg-static opacity-20 z-0" />
          <FloatingOrbs />
          {/* Signal waves SVG — subtle expanding rings */}
          <div className="absolute right-[10%] top-[20%] w-[380px] h-[380px] pointer-events-none z-0 opacity-30">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {[22, 38, 54, 70].map((r, i) => (
                <circle key={r} cx="50" cy="50" r={r} fill="none"
                  stroke="#FFE500" strokeWidth="0.3" strokeOpacity="0.4">
                  <animate attributeName="r" from={r} to={r + 18} dur={`${3 + i * 0.7}s`}
                    begin={`${i * 0.9}s`} repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" from="0.4" to="0" dur={`${3 + i * 0.7}s`}
                    begin={`${i * 0.9}s`} repeatCount="indefinite" />
                </circle>
              ))}
              <circle cx="50" cy="50" r="3" fill="#FFE500" fillOpacity="0.6">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <div className="absolute left-0 inset-y-0 w-[40vw] bg-gradient-to-r from-accent/[0.04] to-transparent pointer-events-none z-0" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen">
            {/* Layer tag */}
            <motion.div
              className="flex items-center gap-3 mb-16"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="w-1 h-6 bg-accent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-accent">LAYER_03 // ADOPT_SYS</span>
            </motion.div>

            <div className="flex-1 grid lg:grid-cols-2 gap-16 items-start">
              {/* Left — staggered hero text */}
              <div>
                <motion.span
                  className="sys-label block mb-5"
                  style={{ opacity: 0.4 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.4, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.3 }}
                >
                  DISTRIBUTION AS INFRASTRUCTURE
                </motion.span>

                <motion.h1
                  className="font-display font-extrabold leading-[0.92] mb-8"
                  style={{ fontSize: 'clamp(2.4rem, 6vw, 6.5rem)' }}
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
                >
                  {[
                    { text: 'Building',            cls: 'text-white'  },
                    { text: 'blockchain is only',  cls: 'text-white'  },
                    { text: 'half',                cls: 'text-accent' },
                    { text: 'the equation.',       cls: 'text-white'  },
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
                </motion.h1>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease, delay: 1.05 }}
                >
                  <p className="font-body text-xl text-muted leading-relaxed">
                    Distribution completes the protocol.
                  </p>
                  <p className="font-body text-base text-dim/90 leading-relaxed max-w-md">
                    Many teams can ship a smart contract. Fewer can drive real-world Web3 adoption.
                    Awarizon is built around both.
                  </p>
                </motion.div>

                <motion.div
                  className="mt-12 border-l-2 border-accent pl-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease, delay: 1.3 }}
                >
                  <p className="font-body text-base text-accent/80 italic leading-relaxed">
                    "We deploy blockchain protocols into real operational environments."
                  </p>
                  <p className="font-mono text-xs text-dim mt-2 tracking-wide">
                    "Distribution is on-chain execution."
                  </p>
                </motion.div>
              </div>

              {/* Right — flow sim */}
              <Reveal delay={0.3}>
                <div className="border border-[#1A1A1A] bg-[#030303]">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#141414]">
                    <span className="sys-label opacity-60">ADOPTION_FLOW_SIM</span>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="font-mono text-[9px] text-green-400">LIVE</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-1.5">
                    {ADOPTION_FLOW.map((step, i) => {
                      const isActive = activeStep === i
                      return (
                        <div key={step.id}>
                          <button
                            className={`w-full flex items-center gap-4 p-4 border transition-all duration-300 text-left ${
                              isActive
                                ? 'border-accent bg-accent/5 shadow-[0_0_16px_rgba(255,229,0,0.06)]'
                                : 'border-[#141414] hover:border-[#2A2A2A]'
                            }`}
                            onMouseEnter={() => setActiveStep(i)}
                            onMouseLeave={() => setActiveStep(null)}
                          >
                            <div className={`w-11 h-11 flex items-center justify-center border transition-all duration-300 shrink-0 ${
                              isActive ? 'border-accent bg-accent/10 text-accent' : 'border-[#1E1E1E] text-dim'
                            }`}>
                              <span className="text-xl">{step.icon}</span>
                            </div>
                            <div className="flex-1">
                              <span className={`font-mono text-[9px] tracking-widest uppercase block mb-0.5 ${isActive ? 'text-accent' : 'text-dim'}`}>
                                STEP_{String(i + 1).padStart(2, '0')}
                              </span>
                              <span className={`font-display font-medium text-sm transition-colors ${isActive ? 'text-white' : 'text-muted'}`}>
                                {step.label}
                              </span>
                            </div>
                            {isActive && (
                              <span className="font-mono text-[10px] text-accent/60 animate-pulse">ACTIVE</span>
                            )}
                          </button>

                          {isActive && (
                            <div className="px-5 py-3 bg-accent/[0.03] border-l border-accent/20 animate-slide-up">
                              <p className="font-body text-sm text-muted leading-relaxed">{step.desc}</p>
                            </div>
                          )}

                          {i < ADOPTION_FLOW.length - 1 && (
                            <div className="ml-[1.625rem] w-px h-8 relative overflow-hidden">
                              <div className={`absolute inset-0 transition-colors duration-300 ${isActive ? 'bg-accent/15' : 'bg-[#111]'}`} />
                              <div
                                className="absolute left-0 right-0 h-5 animate-flow-down"
                                style={{
                                  background: isActive
                                    ? 'linear-gradient(to bottom, transparent, rgba(255,229,0,0.7), transparent)'
                                    : 'linear-gradient(to bottom, transparent, rgba(255,229,0,0.18), transparent)',
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── PRINCIPLES ────────────────────────────────────── */}
        <section className="section-img-bg py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="s-img" src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=70" alt="" aria-hidden="true" />
          <div className="s-overlay bg-gradient-to-r from-black via-black/70 to-black" />

          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-14">
              <span className="sys-label opacity-40 block mb-4">DISTRIBUTION_ARCHITECTURE // CORE PRINCIPLES</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
                Distribution is part of the product.
              </h2>
            </Reveal>

            <RevealGroup className="grid md:grid-cols-2 gap-px bg-[#111]/60" stagger={0.1}>
              {PRINCIPLES.map((p) => (
                <RevealItem key={p.code}>
                  <div className="bg-black/88 backdrop-blur-sm p-8 group hover:bg-black/95 transition-all duration-300 h-full">
                    <div className="sys-label opacity-40 mb-5">{p.code}</div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent mt-1 shrink-0" />
                      <h3 className="font-display font-bold text-white text-xl leading-snug group-hover:text-accent/90 transition-colors duration-300">
                        {p.title}
                      </h3>
                    </div>
                    <p className="font-body text-base text-muted leading-relaxed ml-5">{p.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── METRICS ───────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-b border-[#0D0D0D] bg-[#030303]">
          <div className="max-w-6xl mx-auto">
            <RevealGroup className="grid grid-cols-2 md:grid-cols-4 gap-8" stagger={0.1}>
              {METRICS.map((m) => (
                <RevealItem key={m.label}>
                  <div>
                    <div className="font-display font-extrabold text-4xl md:text-5xl text-accent mb-2 accent-glow">
                      <CountUp to={m.val} suffix={m.suffix} />
                    </div>
                    <div className="font-mono text-[10px] text-dim tracking-widest uppercase leading-relaxed">
                      {m.label}
                    </div>
                  </div>
                </RevealItem>
              ))}
              {/* ∞ stat — no CountUp */}
              <RevealItem>
                <div>
                  <div className="font-display font-extrabold text-4xl md:text-5xl text-accent mb-2 accent-glow">∞</div>
                  <div className="font-mono text-[10px] text-dim tracking-widest uppercase leading-relaxed">
                    Protocol feedback iterations
                  </div>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-8">
            <Reveal>
              <span className="sys-label opacity-40 block mb-2">NEXT_LAYER</span>
              <p className="font-display font-semibold text-3xl text-white">Explore the ecosystem.</p>
            </Reveal>
            <Reveal delay={0.15} className="flex flex-wrap gap-3">
              <Button href="/ecosystem" variant="primary"  size="lg">Ecosystem Logic →</Button>
              <Button href="/sdk"       variant="ghost"    size="lg">Build with the SDK</Button>
            </Reveal>
          </div>
        </section>

      </PageTransition>
    </ScrollProvider>
  )
}
