"use client";

import { useState, useEffect } from "react";
import PageTransition from "@/components/motion/PageTransition";
import ScrollProvider from "@/components/motion/ScrollProvider";
import Button from "@/components/ui/Button";
import WorldMap from "@/components/system/WorldMap";
import { MARKET_STATS } from "@/lib/constants";

const THESIS_SECTIONS = [
  {
    phase: "PROBLEM",
    code: "PHASE_01",
    headline: "The next major blockchain opportunity is not a new chain.",
    sub: "It is global adoption.",
    body: "Across global markets — especially emerging ones — developers and businesses know they need Web3 infrastructure. The protocols exist. Getting them deployed into real operations, at real scale, for real users, is where the industry stalls.",
  },
  {
    phase: "INSIGHT",
    code: "PHASE_02",
    headline: "Web3 without distribution remains a whitepaper.",
    sub: "Reality requires on-chain deployment.",
    body: "Builders need blockchain infrastructure that integrates with real systems. Developers need APIs that work in production. Businesses need tooling that doesn't require a PhD in cryptography to operate at scale.",
  },
  {
    phase: "OPPORTUNITY",
    code: "PHASE_03",
    headline:
      "Global markets won't be transformed by copying existing DeFi patterns.",
    sub: "They will be transformed by locally-intelligent blockchain distribution.",
    body: "The infrastructure companies that win globally will be those that understand how to make Web3 usable, practical, and scalable within the real constraints of each market — contextual by design.",
  },
  {
    phase: "STRATEGY",
    code: "PHASE_04",
    headline: "That is where Awarizon operates.",
    sub: "Inside the adoption gap. Solving the real problem.",
    body: "We build the blockchain infrastructure, global distribution systems, and consumer interfaces that move Web3 from possibility to adoption. Thesis made operational.",
  },
];

export default function ThesisPage() {
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActivePhase((p) => (p + 1) % THESIS_SECTIONS.length),
      4200,
    );
    return () => clearInterval(id);
  }, []);

  const active = THESIS_SECTIONS[activePhase];

  return (
    <ScrollProvider>
      <PageTransition>
        {/* ── HERO ──────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
          <div className="absolute inset-0 grid-bg-static opacity-20" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-accent/[0.05] blur-3xl pointer-events-none" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen">
            <div className="flex items-center gap-3 mb-16">
              <span className="w-1 h-6 bg-accent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-accent">
                LAYER_06 // MARKET_THESIS
              </span>
            </div>

            <div className="flex-1 grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: thesis */}
              <div>
                <span className="sys-label opacity-40 block mb-5 reveal">
                  GLOBAL ADOPTION THESIS
                </span>
                <h1
                  className="font-display font-extrabold leading-[0.92] reveal"
                  style={{ fontSize: "clamp(2.2rem, 5.5vw, 6rem)" }}
                >
                  <span className="block text-white">The next major</span>
                  <span className="block text-white">blockchain</span>
                  <span className="block text-white">opportunity</span>
                  <span className="block text-white">is not a new chain.</span>
                </h1>
                <p className="font-display font-bold text-2xl md:text-3xl text-accent mt-4 mb-10 reveal reveal-delay-1">
                  It is global adoption.
                </p>

                {/* Phase tabs */}
                <div className="flex gap-2 mb-6 flex-wrap reveal reveal-delay-2">
                  {THESIS_SECTIONS.map((s, i) => (
                    <button
                      key={s.phase}
                      onClick={() => setActivePhase(i)}
                      className={`font-mono text-[10px] tracking-widest px-3 py-2 border transition-all duration-300 ${
                        activePhase === i
                          ? "border-accent text-accent bg-accent/8"
                          : "border-[#1E1E1E] text-dim hover:border-[#333]"
                      }`}
                    >
                      {s.phase}
                    </button>
                  ))}
                </div>

                <div
                  key={active.code}
                  className="min-h-[190px] animate-slide-up reveal reveal-delay-3"
                >
                  <div className="sys-label opacity-35 mb-3">{active.code}</div>
                  <h2 className="font-display font-bold text-xl md:text-2xl text-white mb-2 leading-snug">
                    {active.headline}
                  </h2>
                  <p className="font-body text-lg text-accent/75 mb-4">
                    {active.sub}
                  </p>
                  <p className="font-body text-base text-muted leading-relaxed">
                    {active.body}
                  </p>
                </div>

                {/* Progress */}
                <div className="flex gap-1 mt-8">
                  {THESIS_SECTIONS.map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-0.5 bg-[#111] overflow-hidden"
                    >
                      <div
                        className={`h-full bg-accent transition-all duration-500 ${i <= activePhase ? "w-full" : "w-0"}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: world map + stats */}
              <div className="reveal reveal-delay-2">
                <WorldMap className="mb-4" />
                <div className="grid grid-cols-2 gap-px bg-[#0D0D0D]">
                  {MARKET_STATS.map((stat, i) => (
                    <div key={i} className="bg-black p-5">
                      <div className="font-display font-extrabold text-2xl md:text-3xl text-accent mb-1 accent-glow">
                        {stat.value}
                      </div>
                      <div className="font-mono text-[9px] text-dim tracking-widest leading-relaxed mb-1">
                        {stat.label}
                      </div>
                      <div className="font-mono text-[9px] text-accent/50">
                        {stat.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STRATEGIC TEXT ────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="reveal">
              <span className="sys-label opacity-40 block mb-8">
                STRATEGIC_THESIS // FULL STATEMENT
              </span>
              <div className="h-rule mb-8" />
              <p className="font-display font-bold text-2xl md:text-4xl text-white leading-snug">
                Global markets will not be transformed by repackaging existing
                DeFi protocols.
              </p>
            </div>
            <div className="reveal reveal-delay-1">
              <p className="font-body text-xl md:text-2xl text-muted leading-relaxed">
                They will be transformed by companies that build blockchain infrastructure that is{" "}
                <em className="not-italic text-white font-semibold">usable</em>,{" "}
                <em className="not-italic text-white font-semibold">
                  practical
                </em>
                , and{" "}
                <em className="not-italic text-white font-semibold">
                  scalable
                </em>{" "}
                within the real conditions of each market.
              </p>
            </div>
            <div className="reveal reveal-delay-2 border-l-2 border-accent pl-8">
              <p className="font-display font-bold text-xl md:text-2xl text-accent leading-relaxed">
                That is where Awarizon operates.
              </p>
            </div>
          </div>
        </section>

        {/* ── GEO CARDS — section bg image ──────────────────── */}
        <section className="section-img-bg py-20 px-6 md:px-12 lg:px-20">
          {/* Aerial city image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="s-img"
            src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=1400&q=70"
            alt=""
            aria-hidden="true"
          />
          <div className="s-overlay bg-black/82" />

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-px bg-[#0D0D0D]/80">
              {[
                {
                  code: "GEO_01",
                  title: "Emerging Economies",
                  desc: "High mobile penetration, growing developer communities, and urgent demand for financial infrastructure make emerging economies the fastest-growing blockchain markets.",
                },
                {
                  code: "GEO_02",
                  title: "Enterprise & B2B",
                  desc: "Businesses globally are seeking blockchain rails for payments, identity, and supply chain. The infrastructure layer they need doesn't yet exist at scale.",
                },
                {
                  code: "GEO_03",
                  title: "Global Markets",
                  desc: "Where blockchain adoption gaps are largest — and where the infrastructure we build creates the most durable, compounding value across every continent.",
                },
              ].map((geo, i) => (
                <div
                  key={geo.code}
                  className="bg-black/88 backdrop-blur-sm p-10 reveal"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="sys-label opacity-40 mb-4">{geo.code}</div>
                  <h3 className="font-display font-bold text-3xl text-white mb-4">
                    {geo.title}
                  </h3>
                  <p className="font-body text-base text-muted leading-relaxed">
                    {geo.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-8">
            <div className="reveal">
              <span className="sys-label opacity-40 block mb-2">
                FINAL_LAYER
              </span>
              <p className="font-display font-semibold text-3xl text-white">
                Enter the system.
              </p>
            </div>
            <div className="reveal reveal-delay-2">
              <Button href="/access" variant="primary" size="lg">
                Access Layer →
              </Button>
            </div>
          </div>
        </section>
      </PageTransition>
    </ScrollProvider>
  );
}
