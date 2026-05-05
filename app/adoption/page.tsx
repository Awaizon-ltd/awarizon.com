'use client'

import { useState } from 'react'
import PageTransition from '@/components/motion/PageTransition'
import ScrollProvider from '@/components/motion/ScrollProvider'
import Button from '@/components/ui/Button'
import { ADOPTION_FLOW } from '@/lib/constants'

const PRINCIPLES = [
  { code:'PRIN_01', title:'Products people can actually use', desc:'Designed for the operational reality of emerging markets — not imported assumptions about user behaviour.' },
  { code:'PRIN_02', title:'Deployment businesses can implement', desc:'Integration pathways built for real organisational constraints, not theoretical ideal environments.' },
  { code:'PRIN_03', title:'Systems that reduce friction', desc:'Technology should simplify operations, not introduce new complexity layers to manage.' },
  { code:'PRIN_04', title:'Integration that fits local behaviour', desc:'Distribution is architecture — designed around how people and businesses actually operate.' },
]

export default function AdoptionPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <ScrollProvider>
      <PageTransition>

        {/* ── HERO ──────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
          <div className="absolute inset-0 grid-bg-static opacity-20" />
          <div className="absolute left-0 inset-y-0 w-[40vw] bg-gradient-to-r from-accent/[0.04] to-transparent" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen">
            <div className="flex items-center gap-3 mb-16">
              <span className="w-1 h-6 bg-accent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-accent">LAYER_03 // ADOPT_SYS</span>
            </div>

            <div className="flex-1 grid lg:grid-cols-2 gap-16 items-start">
              {/* Left */}
              <div>
                <span className="sys-label opacity-40 block mb-5 reveal">DISTRIBUTION AS INFRASTRUCTURE</span>
                <h1 className="font-display font-extrabold leading-[0.92] mb-8 reveal" style={{ fontSize: 'clamp(2.4rem, 6vw, 6.5rem)' }}>
                  <span className="block text-white">Building</span>
                  <span className="block text-white">technology is only</span>
                  <span className="block text-accent">half</span>
                  <span className="block text-white">the equation.</span>
                </h1>
                <div className="space-y-4 reveal reveal-delay-2">
                  <p className="font-body text-xl text-muted leading-relaxed">Distribution completes the system.</p>
                  <p className="font-body text-base text-dim/90 leading-relaxed max-w-md">
                    Many companies can build software. Fewer can create adoption. Awarizon is structured around both.
                  </p>
                </div>
                <div className="mt-12 border-l-2 border-accent pl-6 reveal reveal-delay-3">
                  <p className="font-body text-base text-accent/80 italic leading-relaxed">
                    "We deploy systems into operational environments."
                  </p>
                  <p className="font-mono text-xs text-dim mt-2 tracking-wide">
                    "Distribution is infrastructure execution."
                  </p>
                </div>
              </div>

              {/* Right: flow sim */}
              <div className="reveal reveal-delay-2">
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
                              isActive ? 'border-accent bg-accent/5 shadow-[0_0_16px_rgba(255,229,0,0.06)]' : 'border-[#141414] hover:border-[#2A2A2A]'
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
                                STEP_{String(i+1).padStart(2,'0')}
                              </span>
                              <span className={`font-display font-medium text-sm transition-colors ${isActive ? 'text-white' : 'text-muted'}`}>
                                {step.label}
                              </span>
                            </div>
                            {isActive && <span className="font-mono text-[10px] text-accent/60 animate-pulse">ACTIVE</span>}
                          </button>
                          {isActive && (
                            <div className="px-5 py-3 bg-accent/[0.03] border-l border-accent/20 animate-slide-up">
                              <p className="font-body text-sm text-muted leading-relaxed">{step.desc}</p>
                            </div>
                          )}
                          {i < ADOPTION_FLOW.length - 1 && (
                            <div className={`ml-7 w-px h-3 ${isActive ? 'bg-accent/30' : 'bg-[#141414]'} transition-colors duration-300`} />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRINCIPLES — section bg image ─────────────────── */}
        <section className="section-img-bg py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          {/* Abstract data / network image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="s-img" src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=70" alt="" aria-hidden="true" />
          <div className="s-overlay bg-gradient-to-r from-black via-black/70 to-black" />

          <div className="max-w-6xl mx-auto">
            <div className="mb-14 reveal">
              <span className="sys-label opacity-40 block mb-4">DISTRIBUTION_ARCHITECTURE // CORE PRINCIPLES</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white">Distribution is part of the product.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-[#111]/60">
              {PRINCIPLES.map((p, i) => (
                <div key={p.code} className="bg-black/88 backdrop-blur-sm p-8 group hover:bg-black/95 transition-all duration-300 reveal" style={{ transitionDelay: `${i*100}ms` }}>
                  <div className="sys-label opacity-40 mb-5">{p.code}</div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent mt-1 shrink-0" />
                    <h3 className="font-display font-bold text-white text-xl leading-snug group-hover:text-accent/90 transition-colors duration-300">{p.title}</h3>
                  </div>
                  <p className="font-body text-base text-muted leading-relaxed ml-5">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── METRICS ─────────────────────────────────────────── */}
        <section className="py-16 px-6 md:px-12 lg:px-20 border-t border-b border-[#0D0D0D] bg-[#030303]">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val:'2×',   label:'Faster integration vs manual' },
              { val:'94%',  label:'Adoption retention rate'      },
              { val:'72h',  label:'Avg time to deploy'          },
              { val:'∞',    label:'Feedback loop iterations'    },
            ].map((s, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i*80}ms` }}>
                <div className="font-display font-extrabold text-4xl md:text-5xl text-accent mb-2 accent-glow">{s.val}</div>
                <div className="font-mono text-[10px] text-dim tracking-widest uppercase leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-8">
            <div className="reveal">
              <span className="sys-label opacity-40 block mb-2">NEXT_LAYER</span>
              <p className="font-display font-semibold text-3xl text-white">See the consumer interface.</p>
            </div>
            <div className="reveal reveal-delay-2">
              <Button href="/consumer" variant="primary" size="lg">Consumer Systems →</Button>
            </div>
          </div>
        </section>

      </PageTransition>
    </ScrollProvider>
  )
}
