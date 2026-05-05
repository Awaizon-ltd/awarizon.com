'use client'

import { useState } from 'react'
import PageTransition from '@/components/motion/PageTransition'
import ScrollProvider from '@/components/motion/ScrollProvider'
import Button from '@/components/ui/Button'
import { ADOPTION_FLOW } from '@/lib/constants'

const PRINCIPLES = [
  {
    code: 'PRIN_01',
    title: 'Products people can actually use',
    desc: 'Designed for the operational reality of emerging markets — not imported assumptions about user behavior.',
  },
  {
    code: 'PRIN_02',
    title: 'Deployment businesses can implement',
    desc: 'Integration pathways built for real organizational constraints, not theoretical ideal environments.',
  },
  {
    code: 'PRIN_03',
    title: 'Systems that reduce friction',
    desc: 'Technology should make operations simpler, not introduce new layers of complexity to manage.',
  },
  {
    code: 'PRIN_04',
    title: 'Integration that fits local behavior',
    desc: 'Distribution is not marketing. It is architecture — designed around how people and businesses actually operate.',
  },
]

export default function AdoptionPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <ScrollProvider>
      <PageTransition>
        {/* Hero */}
        <section className="relative min-h-screen flex flex-col overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 grid-bg-static opacity-20" />
            {/* Left gradient */}
            <div className="absolute left-0 inset-y-0 w-[40vw] bg-gradient-to-r from-accent/[0.04] to-transparent" />
          </div>

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen">
            {/* Layer ID */}
            <div className="flex items-center gap-4 mb-16">
              <div className="flex items-center gap-2">
                <span className="w-1 h-6 bg-accent" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-accent">LAYER_03</span>
              </div>
              <span className="font-mono text-[10px] text-dim">ADOPT_SYS // ACTIVE</span>
            </div>

            {/* Split layout */}
            <div className="flex-1 grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: Headline */}
              <div>
                <div className="mb-4 reveal">
                  <span className="sys-label opacity-40">DISTRIBUTION AS INFRASTRUCTURE</span>
                </div>
                <h1 className="font-display font-bold leading-none mb-8 reveal" style={{ fontSize: 'clamp(2rem, 5vw, 5.5rem)' }}>
                  <span className="block text-white">Building</span>
                  <span className="block text-white">technology is only</span>
                  <span className="block text-accent">half</span>
                  <span className="block text-white">the equation.</span>
                </h1>

                <div className="space-y-4 reveal reveal-delay-2">
                  <p className="font-body text-lg text-muted leading-relaxed">
                    Distribution completes the system.
                  </p>
                  <p className="font-body text-base text-dim leading-relaxed">
                    Many companies can build software. Fewer can create adoption. Awarizon is structured around both.
                  </p>
                </div>

                {/* System quote */}
                <div className="mt-12 border-l-2 border-accent pl-6 reveal reveal-delay-3">
                  <p className="font-mono text-sm text-accent/80 leading-relaxed">
                    "We deploy systems into operational environments."
                  </p>
                  <p className="font-mono text-xs text-dim mt-2">
                    "Distribution is infrastructure execution."
                  </p>
                </div>
              </div>

              {/* Right: Flow visualization */}
              <div className="relative reveal reveal-delay-2">
                <div className="border border-[#1A1A1A] bg-[#050505] p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="sys-label opacity-60">ADOPTION_FLOW_SIM</span>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="font-mono text-[10px] text-green-400">LIVE</span>
                    </div>
                  </div>

                  {/* Flow steps */}
                  <div className="space-y-2">
                    {ADOPTION_FLOW.map((step, i) => {
                      const isActive = activeStep === i
                      const isPast = activeStep !== null && i < activeStep

                      return (
                        <div key={step.id}>
                          <button
                            className={`w-full flex items-center gap-4 p-3 border transition-all duration-300 text-left ${
                              isActive
                                ? 'border-accent bg-accent/5 shadow-[0_0_20px_rgba(255,229,0,0.08)]'
                                : 'border-[#1A1A1A] hover:border-[#333] bg-transparent'
                            }`}
                            onMouseEnter={() => setActiveStep(i)}
                            onMouseLeave={() => setActiveStep(null)}
                          >
                            {/* Icon */}
                            <div className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${
                              isActive ? 'border-accent bg-accent/10 text-accent' : 'border-[#222] text-dim'
                            }`}>
                              <span className="text-lg">{step.icon}</span>
                            </div>

                            {/* Step info */}
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className={`font-mono text-[10px] tracking-widest uppercase transition-colors ${
                                  isActive ? 'text-accent' : 'text-dim'
                                }`}>
                                  STEP_{String(i + 1).padStart(2, '0')}
                                </span>
                                {isActive && (
                                  <span className="font-mono text-[9px] text-accent/60 animate-pulse">ACTIVE</span>
                                )}
                              </div>
                              <div className={`font-display font-medium text-sm transition-colors ${
                                isActive ? 'text-white' : 'text-muted'
                              }`}>
                                {step.label}
                              </div>
                            </div>
                          </button>

                          {/* Connector */}
                          {i < ADOPTION_FLOW.length - 1 && (
                            <div className="flex items-center ml-5 my-0.5">
                              <div className={`w-px h-4 transition-colors duration-300 ${
                                isActive ? 'bg-accent/40' : 'bg-[#1A1A1A]'
                              }`} />
                              {isActive && (
                                <div className="absolute ml-0 w-px h-4 bg-accent/30 animate-data-flow" />
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Active description */}
                  {activeStep !== null && (
                    <div className="mt-4 p-3 bg-accent/5 border border-accent/10 animate-slide-up">
                      <p className="font-mono text-xs text-accent/80 leading-relaxed">
                        {ADOPTION_FLOW[activeStep].desc}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Distribution Principles */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 reveal">
              <span className="sys-label opacity-40 block mb-4">DISTRIBUTION_ARCHITECTURE // CORE PRINCIPLES</span>
              <div className="h-px bg-gradient-to-r from-accent/30 to-transparent mb-8" />
              <h2 className="font-display font-bold text-3xl text-white">
                Distribution is part of the product.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-[#0D0D0D]">
              {PRINCIPLES.map((p, i) => (
                <div key={p.code} className="bg-black p-8 reveal group hover:bg-[#040404] transition-colors duration-300" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="sys-label opacity-40 mb-4">{p.code}</div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent mt-1 shrink-0" />
                    <h3 className="font-display font-bold text-white text-lg leading-tight group-hover:text-accent/90 transition-colors duration-300">
                      {p.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-muted leading-relaxed ml-5">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics bar */}
        <section className="py-16 px-6 md:px-12 lg:px-20 border-t border-b border-[#0D0D0D] bg-[#040404]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { val: '2×', label: 'Faster integration vs manual' },
                { val: '94%', label: 'Adoption retention rate' },
                { val: '72h', label: 'Average time to deploy' },
                { val: '∞', label: 'Feedback loop iterations' },
              ].map((stat, i) => (
                <div key={i} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="font-display font-bold text-4xl text-accent mb-2 accent-glow">{stat.val}</div>
                  <div className="font-mono text-[10px] text-dim tracking-widest uppercase leading-relaxed">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-8">
            <div className="reveal">
              <span className="sys-label opacity-40 block mb-2">NEXT_LAYER</span>
              <p className="font-display font-semibold text-2xl text-white">See the consumer interface.</p>
            </div>
            <div className="reveal reveal-delay-2">
              <Button href="/consumer" variant="primary" size="lg">
                Consumer Systems →
              </Button>
            </div>
          </div>
        </section>

      </PageTransition>
    </ScrollProvider>
  )
}
