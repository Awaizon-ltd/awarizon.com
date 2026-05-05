'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import DataGrid from '@/components/system/DataGrid'
import PageTransition from '@/components/motion/PageTransition'
import ScrollProvider from '@/components/motion/ScrollProvider'
import Button from '@/components/ui/Button'

const BOOT_SEQUENCE = [
  { text: 'INITIALIZING AWARENESS LAYER…', delay: 200, speed: 35 },
  { text: 'SCANNING OPERATIONAL ENVIRONMENT…', delay: 600, speed: 28 },
  { text: 'DETECTING ADOPTION GAP…', delay: 500, speed: 35 },
  { text: 'CALIBRATING MARKET PARAMETERS…', delay: 500, speed: 28 },
  { text: 'LOADING INFRASTRUCTURE MODULES…', delay: 600, speed: 25 },
  { text: '● SYSTEM ONLINE: AWARIZON', delay: 400, speed: 45 },
]

const PROBLEM_LAYERS = [
  {
    code: 'SIGNAL_01',
    title: 'Technology exists everywhere.',
    sub: 'Adoption does not.',
    body: 'Across emerging markets, businesses know they need better systems. They know digital infrastructure matters. They know speed, automation, payments, identity, and data will define the next decade.',
  },
  {
    code: 'SIGNAL_02',
    title: 'The challenge is no longer access.',
    sub: 'The challenge is execution.',
    body: 'Businesses struggle with fragmented workflows, disconnected payment systems, poor internal tooling, and unreliable digital processes. Technology without integration becomes noise.',
  },
  {
    code: 'SIGNAL_03',
    title: 'Technology without adoption',
    sub: 'creates no leverage.',
    body: 'Awarizon focuses on usable systems, not theoretical transformation. We exist inside the gap between what technology promises and what businesses actually experience.',
  },
]

type BootLine = {
  text: string
  done: boolean
  current: string
}

export default function ShiftPage() {
  const [bootLines, setBootLines] = useState<BootLine[]>([])
  const [heroVisible, setHeroVisible] = useState(false)
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  const bootComplete = useRef(false)

  useEffect(() => {
    if (bootComplete.current) return
    bootComplete.current = true

    async function runBoot() {
      for (let i = 0; i < BOOT_SEQUENCE.length; i++) {
        const { text, delay, speed } = BOOT_SEQUENCE[i]
        await new Promise(r => setTimeout(r, delay))
        setBootLines(prev => [...prev, { text: '', done: false, current: '' }])
        for (let j = 0; j <= text.length; j++) {
          await new Promise(r => setTimeout(r, speed))
          const partial = text.slice(0, j)
          setBootLines(prev => {
            const updated = [...prev]
            updated[i] = { text, done: j === text.length, current: partial }
            return updated
          })
        }
      }
      await new Promise(r => setTimeout(r, 600))
      setHeroVisible(true)
    }

    runBoot()
  }, [])

  return (
    <ScrollProvider>
      <PageTransition>
        {/* ─── HERO: image background ─── */}
        <section className="img-bg relative min-h-screen flex flex-col overflow-hidden">
          {/* Background photo — tech/data centre */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="bg-photo"
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80"
            alt=""
            aria-hidden="true"
          />
          {/* Overlays */}
          <div className="img-overlay bg-[radial-gradient(ellipse_at_center,transparent_10%,black_70%)]" />
          <div className="img-overlay grid-bg opacity-60" />
          {/* Scan line */}
          <div className="absolute left-0 right-0 h-px bg-accent/10 animate-scan pointer-events-none z-10" />

          <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-12 lg:px-20 pt-24 pb-16">
            {/* Status bar */}
            <div className="flex items-center gap-4 mb-12">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest text-accent">SYS:ONLINE</span>
              </div>
              <span className="font-mono text-[10px] text-dim">|</span>
              <span className="font-mono text-[10px] text-dim tracking-widest">LAYER_01 // ENTRY</span>
              <span className="font-mono text-[10px] text-dim">|</span>
              <span className="font-mono text-[10px] text-dim tracking-widest">NGN_MARKET_ACTIVE</span>
            </div>

            {/* Boot terminal */}
            <div className="mb-16 max-w-2xl">
              <div className="border border-[#1A1A1A] bg-[#050505]/90 backdrop-blur-sm">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1A1A1A]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  <span className="ml-3 font-mono text-[10px] text-dim tracking-widest">AWZ_BOOT_v3.2.1</span>
                </div>
                <div className="p-5 min-h-[160px]">
                  {bootLines.map((line, i) => (
                    <div key={i} className="flex items-start gap-3 mb-1.5">
                      <span className="font-mono text-dim text-sm mt-0.5 select-none">›</span>
                      <span className={`font-mono text-sm leading-relaxed ${
                        line.text.startsWith('●')
                          ? 'text-accent font-medium'
                          : line.done ? 'text-[#888]' : 'text-[#666]'
                      }`}>
                        {line.current}
                        {!line.done && i === bootLines.length - 1 && (
                          <span className="inline-block w-2 h-3.5 bg-accent ml-0.5 animate-flicker" />
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Hero text */}
            <div className={`transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="mb-6">
                <span className="sys-label opacity-40 tracking-[0.4em]">THE SHIFT // ENTRY LAYER</span>
              </div>

              <h1 className="font-display font-bold leading-none mb-10" style={{ fontSize: 'clamp(4rem, 10vw, 11rem)' }}>
                <span className="block text-white">Technology</span>
                <span className="block text-white">exists</span>
                <span className="block gradient-text">everywhere.</span>
              </h1>

              <div className="max-w-xl">
                <p className="font-body text-xl md:text-2xl text-muted leading-relaxed mb-4">
                  Adoption does not.
                </p>
                <div className="h-px bg-gradient-to-r from-accent/40 via-transparent to-transparent mb-6" />
                <p className="font-body text-base md:text-lg text-dim leading-relaxed">
                  Awarizon builds the bridge between{' '}
                  <button
                    className="text-white border-b border-dashed border-accent/40 hover:border-accent hover:text-accent transition-colors duration-200"
                    onMouseEnter={() => setActiveTooltip('businesses')}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >businesses</button>
                  {', '}
                  <button
                    className="text-white border-b border-dashed border-accent/40 hover:border-accent hover:text-accent transition-colors duration-200"
                    onMouseEnter={() => setActiveTooltip('technology')}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >technology</button>
                  {', and '}
                  <button
                    className="text-white border-b border-dashed border-accent/40 hover:border-accent hover:text-accent transition-colors duration-200"
                    onMouseEnter={() => setActiveTooltip('users')}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >everyday users</button>.
                </p>

                {activeTooltip && (
                  <div className="mt-4 p-4 border border-accent/20 bg-accent/5 animate-slide-up">
                    <p className="font-mono text-sm text-accent">
                      {activeTooltip === 'businesses' && 'Organizations that need modern digital infrastructure to operate competitively.'}
                      {activeTooltip === 'technology' && 'Digital systems, infrastructure, and tools — wallets, payments, identity, APIs.'}
                      {activeTooltip === 'users' && 'The end consumers whose daily lives improve when technology becomes usable.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Scroll cue */}
            <div className={`mt-auto pt-12 flex items-center gap-4 transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex flex-col gap-1.5">
                <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent mx-auto" />
                <span className="font-mono text-[10px] text-dim tracking-widest">SCROLL TO EXPLORE</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Problem Layers ─── */}
        <section className="relative py-32 px-6 md:px-12 lg:px-20">
          <div className="grid-bg-static absolute inset-0 opacity-30" />
          <div className="relative max-w-6xl mx-auto">
            <div className="mb-20 reveal">
              <span className="sys-label opacity-40 block mb-4">SIGNAL_ANALYSIS // THE REALITY</span>
              <div className="h-px bg-gradient-to-r from-accent/40 to-transparent mb-8" />
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white">
                What we detected.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-[#111]">
              {PROBLEM_LAYERS.map((layer, i) => (
                <div
                  key={layer.code}
                  className="bg-black p-8 md:p-10 reveal"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="flex items-center gap-2 mb-8">
                    <span className="w-1 h-1 bg-accent rounded-full" />
                    <span className="sys-label opacity-60">{layer.code}</span>
                  </div>
                  <div className="font-mono text-6xl font-bold text-[#111] mb-6 select-none">0{i + 1}</div>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-1 leading-tight">{layer.title}</h3>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-accent mb-6 leading-tight">{layer.sub}</h3>
                  <p className="font-body text-base text-muted leading-relaxed">{layer.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── The Gap — image accent ─── */}
        <section className="img-bg img-bg-medium relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="bg-photo"
            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&q=80"
            alt=""
            aria-hidden="true"
          />
          <div className="img-overlay bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-accent/[0.04] blur-3xl" />

          <div className="relative max-w-4xl reveal">
            <div className="mb-4">
              <span className="sys-label opacity-40">OPERATIONAL CONTEXT</span>
            </div>
            <blockquote className="font-display font-bold leading-tight text-3xl md:text-5xl lg:text-6xl text-white mb-10">
              "We design the systems that help businesses move from{' '}
              <span className="text-accent">manual operations</span> to modern infrastructure."
            </blockquote>

            <div className="flex items-center gap-8 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-px h-10 bg-accent/40" />
                <div>
                  <div className="font-mono text-xs text-accent">POSITIONING</div>
                  <div className="font-body text-base text-muted">Technology Development & Distribution</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-px h-10 bg-[#333]" />
                <div>
                  <div className="font-mono text-xs text-dim">MARKET</div>
                  <div className="font-body text-base text-muted">Nigeria, West Africa & Emerging Markets</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-[#111]">
          <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-8">
            <div className="reveal">
              <span className="sys-label opacity-40 block mb-2">NEXT_LAYER</span>
              <p className="font-display font-semibold text-2xl md:text-3xl text-white">Enter the Infrastructure.</p>
            </div>
            <div className="reveal reveal-delay-2">
              <Button href="/infrastructure" variant="primary" size="lg">Infrastructure Layer →</Button>
            </div>
          </div>
        </section>

      </PageTransition>
    </ScrollProvider>
  )
}
