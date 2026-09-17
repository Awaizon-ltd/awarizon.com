'use client'

import Link from 'next/link'
import PageTransition from '@/components/motion/PageTransition'
import ScrollProvider from '@/components/motion/ScrollProvider'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import Button from '@/components/ui/Button'
import ParticleNetwork from '@/components/ui/ParticleNetwork'

const VALUES = [
  {
    code: 'V_01',
    title: 'Infrastructure first',
    body: 'We build the protocols and systems underneath — not another app competing for attention. Infrastructure is the leverage point.',
  },
  {
    code: 'V_02',
    title: 'Built for builders',
    body: 'Every decision starts from the developer and business actually shipping on top of us. If it adds friction, it does not ship.',
  },
  {
    code: 'V_03',
    title: 'Global by default',
    body: 'On-chain infrastructure has no borders. We design for every market from day one, not as an afterthought.',
  },
  {
    code: 'V_04',
    title: 'Shipped, not theorized',
    body: 'Working systems over whitepapers. We measure ourselves by what runs in production, not what sounds good in a pitch.',
  },
]

const TIMELINE = [
  { year: '2023', label: 'Founded', body: 'Awarizon started with a simple thesis: on-chain adoption needs infrastructure, not more fragmented tools.' },
  { year: '2024', label: 'Infrastructure layer', body: 'Built out the core protocol stack — wallets, payments, identity, and automation — as reusable systems.' },
  { year: 'Now', label: 'Developer platform', body: 'Shipped the Awarizon SDK — the same infrastructure we run on, packaged for any team to build on.' },
]

const SOCIALS = [
  { label: 'X / Twitter', handle: '@awarizon',         href: 'https://x.com/awarizon' },
  { label: 'LinkedIn',    handle: 'Awarizon',           href: 'https://linkedin.com/company/awarizon' },
  { label: 'Instagram',   handle: '@awarizon_official', href: 'https://instagram.com/awarizon_official' },
]

export default function CompanyPage() {
  return (
    <ScrollProvider>
      <PageTransition>

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-accent-wash">
          <ParticleNetwork count={40} maxDist={130} opacity={0.35} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(200,241,63,0.06),transparent)] pointer-events-none" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen">
            <div className="flex items-center gap-3 mb-14">
              <span className="w-1 h-6 bg-accent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-accent">COMPANY // ABOUT AWARIZON</span>
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-4xl">
              <Reveal>
                <h1 className="font-display font-extrabold text-hero text-white mb-8">
                  We build the infrastructure the next wave of on-chain products runs on.
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="font-body text-xl text-muted leading-relaxed max-w-2xl">
                  Awarizon is a global web3 infrastructure company — wallets, payments, identity, and
                  developer tooling built as one coherent system, not a pile of disconnected tools.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="grid grid-cols-3 gap-px bg-[#111] border border-[#111] mt-12 max-w-xl">
                  {[
                    { n: '2023',   l: 'Founded'   },
                    { n: 'Global', l: 'Markets'    },
                    { n: '3',      l: 'SDK Packages' },
                  ].map(s => (
                    <div key={s.l} className="bg-black px-4 py-4">
                      <div className="font-display font-extrabold text-accent text-2xl">{s.n}</div>
                      <div className="font-mono text-[10px] text-dim tracking-widest mt-0.5">{s.l.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── ORIGIN STORY ─────────────────────────────────── */}
        <section className="py-28 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D] bg-accent-wash">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <span className="sys-label opacity-65 block mb-8">WHY WE STARTED</span>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-display font-extrabold text-statement text-white leading-[1.08] mb-8">
                Businesses and consumers needed digital and automated systems that actually worked —
                not fragmented tools bolted together.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body text-lg text-muted leading-relaxed max-w-3xl">
                That observation is why Awarizon exists. We started by building the infrastructure layer
                ourselves — wallets, payments, identity, automation — and proved it in production before
                packaging it for anyone else. Every system we ship has already run under real conditions,
                for real users, at scale.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── VALUES ───────────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D] bg-accent-wash-soft">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 reveal">
              <span className="sys-label opacity-65 block mb-3">HOW WE OPERATE // PRINCIPLES</span>
              <div className="h-px bg-gradient-to-r from-accent/30 to-transparent mb-6" />
              <h2 className="font-display font-bold text-h2 text-white">
                What we optimize for.
              </h2>
            </div>

            <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#111]" stagger={0.08}>
              {VALUES.map((v) => (
                <RevealItem key={v.code} y={20}>
                  <div className="bg-black p-6 hover:bg-[#030303] transition-colors h-full">
                    <span className="font-mono text-[9px] tracking-widest text-accent/60 block mb-4">{v.code}</span>
                    <h3 className="font-display font-semibold text-white text-h4 mb-2">{v.title}</h3>
                    <p className="font-body text-[13px] text-dim leading-relaxed">{v.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── TIMELINE ─────────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-14 reveal">
              <span className="sys-label opacity-65 block mb-3">TIMELINE // WHERE WE'VE BEEN</span>
              <div className="h-px bg-gradient-to-r from-accent/30 to-transparent" />
            </div>

            <RevealGroup className="space-y-0" stagger={0.1}>
              {TIMELINE.map((t, i) => (
                <RevealItem key={t.year}>
                  <div className={`flex flex-col sm:flex-row gap-4 sm:gap-10 py-8 ${i !== TIMELINE.length - 1 ? 'border-b border-[#111]' : ''}`}>
                    <span className="font-display font-extrabold text-accent text-2xl sm:w-32 shrink-0">{t.year}</span>
                    <div>
                      <h3 className="font-display font-semibold text-white text-h4 mb-2">{t.label}</h3>
                      <p className="font-body text-sm text-muted leading-relaxed max-w-2xl">{t.body}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── FOUNDER ──────────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D] bg-accent-wash-soft">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 reveal">
              <span className="sys-label opacity-65 block mb-3">LEADERSHIP // FOUNDER</span>
              <div className="h-px bg-gradient-to-r from-accent/30 to-transparent" />
            </div>

            <Reveal>
              <div className="border border-[#1A1A1A] bg-black p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                  <div>
                    <h3 className="font-display font-bold text-h3 text-white mb-1">Harry Francis</h3>
                    <p className="font-mono text-[10px] tracking-widest text-accent mb-5">FOUNDER</p>
                    <p className="font-body text-base text-muted leading-relaxed max-w-lg">
                      Started Awarizon in 2023 to give businesses and consumers digital and automated
                      systems that actually work — infrastructure first, products second.
                    </p>
                  </div>

                  <div className="flex md:flex-col gap-3 shrink-0">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between gap-6 border border-[#1A1A1A] px-4 py-2.5 hover:border-accent/40 transition-colors min-w-[180px]"
                      >
                        <span className="font-mono text-[10px] text-dim group-hover:text-white tracking-widest transition-colors">{s.label}</span>
                        <span className="font-mono text-[10px] text-accent/70 group-hover:text-accent transition-colors">{s.handle}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-[#0D0D0D]">
          <div className="absolute inset-0 grid-bg-static opacity-10" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] bg-accent/[0.04] blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto text-center reveal">
            <span className="sys-label opacity-65 block mb-6">JOIN US // GET IN TOUCH</span>
            <h2 className="font-display font-extrabold text-white text-statement mb-6">
              Want to build <span className="gradient-text">with us?</span>
            </h2>
            <p className="font-body text-lg text-muted mb-10 max-w-xl mx-auto">
              Whether you're integrating our infrastructure, co-developing something new, or exploring a
              custom build — we'd like to hear about it.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/access" variant="primary" size="lg">GET IN TOUCH →</Button>
              <Link
                href="/custom-solutions"
                className="font-mono text-[11px] tracking-widest px-8 py-4 border border-[#2A2A2A] text-muted hover:text-white hover:border-white/30 transition-colors"
              >
                CUSTOM SOLUTIONS
              </Link>
            </div>
          </div>
        </section>

      </PageTransition>
    </ScrollProvider>
  )
}
