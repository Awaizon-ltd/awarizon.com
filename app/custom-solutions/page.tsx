'use client'

import Link from 'next/link'
import PageTransition from '@/components/motion/PageTransition'
import ScrollProvider from '@/components/motion/ScrollProvider'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import Button from '@/components/ui/Button'
import FloatingOrbs from '@/components/ui/FloatingOrbs'

const CAPABILITIES = [
  { icon: '◈', title: 'Custom smart contract systems',  body: 'Bespoke protocol logic — staking, vesting, marketplaces, or anything your product needs that a template can\'t cover.' },
  { icon: '⬡', title: 'Bespoke wallet infrastructure',  body: 'Custody models, multi-sig flows, and account abstraction built around how your users actually transact.' },
  { icon: '◉', title: 'Enterprise API integration',      body: 'Wire on-chain infrastructure into existing systems — ERPs, payment stacks, internal tooling — without a rebuild.' },
  { icon: '◫', title: 'Protocol extensions & migrations', body: 'Extend an existing protocol, migrate off a legacy stack, or move a system to new chains without downtime.' },
  { icon: '◇', title: 'White-label on-chain products',   body: 'A full consumer or business-facing product built on Awarizon infrastructure, shipped under your brand.' },
  { icon: '◌', title: 'Dedicated engineering support',    body: 'Direct access to the team that built the SDK — for architecture reviews, audits, and hands-on implementation help.' },
]

const PROCESS = [
  { n: '01', title: 'Discovery',    body: 'We map what you\'re building, what exists already, and where infrastructure is the actual blocker.' },
  { n: '02', title: 'Architecture', body: 'A concrete technical plan — chains, contracts, wallet model, integration points — before any code ships.' },
  { n: '03', title: 'Build',        body: 'Engineering against the plan, on the same infrastructure that runs Awarizon\'s own products in production.' },
  { n: '04', title: 'Deploy',       body: 'Ship to mainnet with simulation, monitoring, and rollback paths in place — not a one-way door.' },
  { n: '05', title: 'Support',      body: 'Ongoing access to the team for iteration, scaling, and whatever the roadmap needs next.' },
]

const FOR_WHO = [
  { code: 'STARTUPS',    title: 'Startups',           body: 'Need on-chain infrastructure fast, without hiring a blockchain team from scratch.' },
  { code: 'ENTERPRISE',  title: 'Enterprises',         body: 'Integrating payments, identity, or settlement into systems that already exist at scale.' },
  { code: 'PROTOCOLS',   title: 'Existing protocols',  body: 'Extending, auditing, or migrating a system that\'s already live and can\'t afford downtime.' },
]

export default function CustomSolutionsPage() {
  return (
    <ScrollProvider>
      <PageTransition>

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-accent-wash">
          <FloatingOrbs orbs={[
            { w: 620, h: 460, left: '-10%', top: '5%',  delay: '0s',  duration: '12s', opacity: 0.05  },
            { w: 380, h: 320, left: '68%',  top: '45%', delay: '2s',  duration: '14s', opacity: 0.04  },
          ]} />
          <div className="absolute inset-0 grid-bg-static opacity-20" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen">
            <div className="flex items-center gap-3 mb-14">
              <span className="w-1 h-6 bg-accent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-accent">CUSTOM_BUILD // BESPOKE INFRASTRUCTURE</span>
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-4xl">
              <Reveal>
                <h1 className="font-display font-extrabold text-hero text-white mb-8">
                  When the SDK isn't enough, <span className="gradient-text">we build it with you.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="font-body text-xl text-muted leading-relaxed max-w-2xl mb-10">
                  Custom smart contracts, bespoke wallet infrastructure, and dedicated engineering —
                  for teams that need infrastructure a template can't cover.
                </p>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="flex flex-wrap gap-3">
                  <Button href="/access?intent=build" variant="primary" size="lg">START A PROJECT →</Button>
                  <Link
                    href="/sdk"
                    className="font-mono text-[11px] tracking-widest px-8 py-4 border border-[#2A2A2A] text-muted hover:text-white hover:border-white/30 transition-colors"
                  >
                    EXPLORE THE SDK
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── CAPABILITIES ─────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D] bg-accent-wash-soft">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 reveal">
              <span className="sys-label opacity-65 block mb-3">WHAT WE BUILD // CAPABILITIES</span>
              <div className="h-px bg-gradient-to-r from-accent/30 to-transparent mb-6" />
              <h2 className="font-display font-bold text-h2 text-white">
                Infrastructure a template can't cover.
              </h2>
            </div>

            <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#111]" stagger={0.06}>
              {CAPABILITIES.map((c) => (
                <RevealItem key={c.title} y={20}>
                  <div className="bg-black p-6 hover:bg-[#030303] transition-colors group h-full">
                    <span className="font-mono text-xl text-accent/40 group-hover:text-accent/70 transition-colors block mb-4">{c.icon}</span>
                    <h3 className="font-display font-semibold text-white text-h4 mb-2">{c.title}</h3>
                    <p className="font-body text-[13px] text-dim leading-relaxed">{c.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────── */}
        <section className="py-28 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-14 reveal">
              <span className="sys-label opacity-65 block mb-3">HOW IT WORKS // THE PROCESS</span>
              <div className="h-px bg-gradient-to-r from-accent/30 to-transparent" />
            </div>

            <RevealGroup className="space-y-0" stagger={0.1}>
              {PROCESS.map((p, i) => (
                <RevealItem key={p.n}>
                  <div className={`flex flex-col sm:flex-row gap-4 sm:gap-10 py-8 ${i !== PROCESS.length - 1 ? 'border-b border-[#111]' : ''}`}>
                    <span className="font-mono text-[11px] tracking-widest text-accent sm:w-16 shrink-0">{p.n}</span>
                    <div>
                      <h3 className="font-display font-semibold text-white text-h4 mb-2">{p.title}</h3>
                      <p className="font-body text-sm text-muted leading-relaxed max-w-2xl">{p.body}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── WHO THIS IS FOR ──────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D] bg-[#030303]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 reveal">
              <span className="sys-label opacity-65 block mb-3">WHO THIS IS FOR</span>
              <div className="h-px bg-gradient-to-r from-accent/30 to-transparent" />
            </div>

            <RevealGroup className="grid sm:grid-cols-3 gap-px bg-[#111]" stagger={0.08}>
              {FOR_WHO.map((f) => (
                <RevealItem key={f.code} y={20}>
                  <div className="bg-black p-8 h-full">
                    <span className="font-mono text-[9px] tracking-widest text-accent/60 block mb-4">{f.code}</span>
                    <h3 className="font-display font-bold text-white text-h3 mb-3">{f.title}</h3>
                    <p className="font-body text-sm text-dim leading-relaxed">{f.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-[#0D0D0D]">
          <div className="absolute inset-0 grid-bg-static opacity-10" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] bg-accent/[0.04] blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto text-center reveal">
            <span className="sys-label opacity-65 block mb-6">START A PROJECT // TELL US MORE</span>
            <h2 className="font-display font-extrabold text-white text-statement mb-6">
              Tell us what <span className="gradient-text">you're building.</span>
            </h2>
            <p className="font-body text-lg text-muted mb-10 max-w-xl mx-auto">
              A short brief is enough to start — we'll follow up within 48 hours to scope the build.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/access?intent=build" variant="primary" size="lg">START A PROJECT →</Button>
              <Link
                href="/company"
                className="font-mono text-[11px] tracking-widest px-8 py-4 border border-[#2A2A2A] text-muted hover:text-white hover:border-white/30 transition-colors"
              >
                ABOUT AWARIZON
              </Link>
            </div>
          </div>
        </section>

      </PageTransition>
    </ScrollProvider>
  )
}
