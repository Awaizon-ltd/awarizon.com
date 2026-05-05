'use client'

import { useState, useEffect } from 'react'
import PageTransition from '@/components/motion/PageTransition'
import ScrollProvider from '@/components/motion/ScrollProvider'
import Button from '@/components/ui/Button'
import { MARKET_STATS } from '@/lib/constants'

const THESIS_SECTIONS = [
  {
    phase: 'PROBLEM',
    code: 'PHASE_01',
    headline: 'The next major technology opportunity is not invention.',
    sub: 'It is adoption.',
    body: 'In markets like Nigeria, many businesses do not need abstract innovation. They have seen it. They know it exists. They read about it. The problem is something else entirely.',
  },
  {
    phase: 'INSIGHT',
    code: 'PHASE_02',
    headline: 'Technology without execution remains theoretical.',
    sub: 'Reality requires implementation.',
    body: 'Businesses need systems that fit operational realities. Technology that respects infrastructure constraints. Products that understand local workflows. Tools that can be deployed, not just demonstrated.',
  },
  {
    phase: 'OPPORTUNITY',
    code: 'PHASE_03',
    headline: 'Emerging markets will not be transformed by copying foreign software patterns.',
    sub: 'They will be transformed by local intelligence.',
    body: 'The companies that win here will understand how to make technology usable, practical, and scalable within local conditions. Not imported, not generic — contextual.',
  },
  {
    phase: 'STRATEGY',
    code: 'PHASE_04',
    headline: 'That is where Awarizon operates.',
    sub: 'Inside the gap. Solving the real problem.',
    body: 'We build the infrastructure, distribution systems, and consumer interfaces that move technology from possibility to adoption. This is the entire thesis made operational.',
  },
]

const MARKET_SIGNALS = [
  { city: 'Lagos', intensity: 1.0, label: 'Primary Market' },
  { city: 'Abuja', intensity: 0.7, label: 'Government Hub' },
  { city: 'Kano', intensity: 0.5, label: 'Northern Market' },
  { city: 'Port Harcourt', intensity: 0.65, label: 'Delta Market' },
  { city: 'Ibadan', intensity: 0.45, label: 'Southwest' },
  { city: 'Accra', intensity: 0.3, label: 'West Africa' },
  { city: 'Abidjan', intensity: 0.25, label: 'Côte d\'Ivoire' },
]

function SignalMap() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1400)
    return () => clearInterval(id)
  }, [])

  const positions = [
    { x: 22, y: 75 }, { x: 45, y: 45 }, { x: 60, y: 18 },
    { x: 28, y: 80 }, { x: 25, y: 68 }, { x: 18, y: 72 }, { x: 8, y: 66 },
  ]

  return (
    <div className="relative border border-[#1A1A1A] bg-[#030303] overflow-hidden" style={{ minHeight: '300px' }}>
      {/* City silhouette background */}
      <svg viewBox="0 0 400 160" className="absolute bottom-0 w-full opacity-5" preserveAspectRatio="none">
        <path d="M0,160 L0,100 L20,100 L20,80 L40,80 L40,60 L60,60 L60,40 L80,40 L80,70 L100,70 L100,50 L110,50 L110,30 L120,30 L120,50 L140,50 L140,70 L160,70 L160,55 L170,55 L170,35 L180,35 L180,55 L200,55 L200,80 L220,80 L220,65 L240,65 L240,45 L250,45 L250,65 L270,65 L270,85 L290,85 L290,60 L310,60 L310,40 L320,40 L320,60 L340,60 L340,80 L360,80 L360,100 L380,100 L380,120 L400,120 L400,160 Z" fill="#FFE500"/>
      </svg>

      <div className="absolute inset-0 grid-bg-static opacity-30" />
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="sys-label opacity-40">MARKET_SIGNAL_MAP // NGN_WEST_AFRICA</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[9px] text-accent/60">LIVE</span>
          </div>
        </div>

        <div className="relative" style={{ height: '200px' }}>
          {MARKET_SIGNALS.map((signal, i) => {
            const pos = positions[i] ?? { x: 30, y: 50 }
            const pulsing = tick % MARKET_SIGNALS.length === i
            const size = 8 + signal.intensity * 10

            return (
              <div key={signal.city} className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pos.x + 20}%`, top: `${pos.y}%` }}>
                {pulsing && (
                  <>
                    <div className="absolute rounded-full border border-accent/40 animate-ping"
                      style={{ inset: `-${size * 0.5}px`, animationDuration: '1s' }} />
                    <div className="absolute rounded-full border border-accent/15 animate-ping"
                      style={{ inset: `-${size}px`, animationDuration: '1s', animationDelay: '0.25s' }} />
                  </>
                )}
                <div className="rounded-full transition-all duration-500"
                  style={{
                    width: `${size}px`, height: `${size}px`,
                    background: `rgba(255,229,0,${0.3 + signal.intensity * 0.7})`,
                    boxShadow: pulsing ? `0 0 ${size * 2}px rgba(255,229,0,0.5)` : 'none',
                  }} />
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap">
                  <div className="font-mono text-[9px] text-accent/50">{signal.city}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function ThesisPage() {
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActivePhase(p => (p + 1) % THESIS_SECTIONS.length), 4000)
    return () => clearInterval(id)
  }, [])

  const active = THESIS_SECTIONS[activePhase]

  return (
    <ScrollProvider>
      <PageTransition>
        {/* ─── Hero with aerial/city image ─── */}
        <section className="img-bg img-bg-medium relative min-h-screen flex flex-col overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="bg-photo"
            src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=1920&q=80"
            alt=""
            aria-hidden="true"
          />
          <div className="img-overlay bg-gradient-to-b from-black via-black/80 to-black" />
          <div className="img-overlay grid-bg-static opacity-20" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-accent/[0.06] blur-3xl pointer-events-none" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen">
            <div className="flex items-center gap-4 mb-16">
              <div className="flex items-center gap-2">
                <span className="w-1 h-6 bg-accent" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-accent">LAYER_06</span>
              </div>
              <span className="font-mono text-[10px] text-dim">MARKET_THESIS // ACTIVE</span>
            </div>

            <div className="flex-1 grid lg:grid-cols-2 gap-16 items-center">
              {/* Left */}
              <div>
                <div className="mb-8 reveal">
                  <span className="sys-label opacity-40 block mb-4">EMERGING MARKETS THESIS</span>
                  <h1 className="font-display font-bold leading-none" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 6rem)' }}>
                    <span className="block text-white">The next major</span>
                    <span className="block text-white">technology</span>
                    <span className="block text-white">opportunity</span>
                    <span className="block text-white">is not invention.</span>
                  </h1>
                  <div className="mt-4">
                    <span className="font-display font-bold text-2xl md:text-3xl text-accent">It is adoption.</span>
                  </div>
                </div>

                {/* Phase selector */}
                <div className="flex items-center gap-2 mb-5 reveal flex-wrap">
                  {THESIS_SECTIONS.map((s, i) => (
                    <button key={s.phase} onClick={() => setActivePhase(i)}
                      className={`font-mono text-[10px] tracking-widest px-3 py-1.5 border transition-all duration-300 ${
                        activePhase === i ? 'border-accent text-accent bg-accent/10' : 'border-[#222] text-dim hover:border-[#444]'
                      }`}>
                      {s.phase}
                    </button>
                  ))}
                </div>

                <div className="min-h-[200px]">
                  <div key={active.code} className="animate-slide-up">
                    <div className="sys-label opacity-40 mb-3">{active.code}</div>
                    <h2 className="font-display font-bold text-xl md:text-2xl text-white mb-2 leading-tight">{active.headline}</h2>
                    <p className="font-display text-lg text-accent/70 mb-4">{active.sub}</p>
                    <p className="font-body text-base text-muted leading-relaxed">{active.body}</p>
                  </div>
                </div>

                <div className="flex gap-1 mt-6">
                  {THESIS_SECTIONS.map((_, i) => (
                    <div key={i} className="flex-1 h-0.5 bg-[#111] overflow-hidden">
                      <div className={`h-full bg-accent transition-all duration-300 ${i <= activePhase ? 'w-full' : 'w-0'}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className="reveal reveal-delay-2">
                <SignalMap />
                <div className="mt-4 grid grid-cols-2 gap-px bg-[#0D0D0D]">
                  {MARKET_STATS.map((stat, i) => (
                    <div key={i} className="bg-black p-5">
                      <div className="font-display font-bold text-2xl md:text-3xl text-accent mb-1 accent-glow">{stat.value}</div>
                      <div className="font-mono text-[9px] text-dim tracking-widest leading-relaxed mb-1">{stat.label}</div>
                      <div className="font-mono text-[9px] text-accent/50">{stat.change}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Strategic detail ─── */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="reveal">
              <span className="sys-label opacity-40 block mb-8">STRATEGIC_THESIS // FULL STATEMENT</span>
              <div className="h-rule mb-8" />
              <p className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed">
                Emerging markets will not be transformed by copying foreign software patterns.
              </p>
            </div>
            <div className="reveal reveal-delay-1">
              <p className="font-display text-xl md:text-2xl text-muted leading-relaxed">
                They will be transformed by companies that understand how to make technology{' '}
                <em className="not-italic text-white font-medium">usable</em>,{' '}
                <em className="not-italic text-white font-medium">practical</em>, and{' '}
                <em className="not-italic text-white font-medium">scalable</em> within local conditions.
              </p>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="border-l-2 border-accent pl-8">
                <p className="font-display font-bold text-xl md:text-2xl text-accent leading-relaxed">
                  That is where Awarizon operates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Geography cards with image ─── */}
        <section className="img-bg relative py-20 px-6 md:px-12 lg:px-20 bg-[#040404]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="bg-photo"
            src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1920&q=80"
            alt=""
            aria-hidden="true"
          />
          <div className="img-overlay bg-black/85" />

          <div className="relative max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-px bg-[#0D0D0D]">
              {[
                { code: 'GEO_01', title: 'Nigeria', desc: "Africa's largest economy and most populous nation. Over 200M people. The continent's most significant digital opportunity." },
                { code: 'GEO_02', title: 'West Africa', desc: 'A $700B+ combined GDP region with rapidly expanding digital infrastructure and growing middle class.' },
                { code: 'GEO_03', title: 'Emerging Markets', desc: 'The environments where technology adoption gaps are largest — and where the infrastructure we build matters most.' },
              ].map((geo, i) => (
                <div key={geo.code} className="bg-black/90 p-8 md:p-10 reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="sys-label opacity-40 mb-4">{geo.code}</div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">{geo.title}</h3>
                  <p className="font-body text-base text-muted leading-relaxed">{geo.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-8">
            <div className="reveal">
              <span className="sys-label opacity-40 block mb-2">FINAL_LAYER</span>
              <p className="font-display font-semibold text-2xl md:text-3xl text-white">Enter the system.</p>
            </div>
            <div className="reveal reveal-delay-2">
              <Button href="/access" variant="primary" size="lg">Access Layer →</Button>
            </div>
          </div>
        </section>

      </PageTransition>
    </ScrollProvider>
  )
}
