"use client";

import { useEffect, useState, useRef } from "react";
import PageTransition from "@/components/motion/PageTransition";
import ScrollProvider from "@/components/motion/ScrollProvider";
import Button from "@/components/ui/Button";
import ChainsMarquee from "@/components/ui/ChainsMarquee";

const BOOT_SEQUENCE = [
  { text: "INITIALIZING CHAIN AWARENESS LAYER…", delay: 200, speed: 32 },
  { text: "SCANNING GLOBAL BLOCKCHAIN ENVIRONMENT…", delay: 600, speed: 26 },
  { text: "DETECTING WEB3 ADOPTION GAP…", delay: 500, speed: 32 },
  { text: "CALIBRATING MARKET PARAMETERS…", delay: 500, speed: 26 },
  { text: "LOADING PROTOCOL MODULES…", delay: 600, speed: 22 },
  { text: "● SYSTEM ONLINE: AWARIZON", delay: 400, speed: 40 },
];

const PROBLEM_LAYERS = [
  {
    code: "SIGNAL_01",
    num: "01",
    title: "Blockchain exists everywhere.",
    sub: "Adoption does not.",
    body: "Across global markets, developers and businesses know they need Web3 infrastructure. The protocols exist. Getting them deployed into real operations — at scale, for real users — is where the industry stalls.",
  },
  {
    code: "SIGNAL_02",
    num: "02",
    title: "The challenge is no longer the chain.",
    sub: "The challenge is distribution.",
    body: "Builders struggle with fragmented Web3 tooling, no clear integration pathways, and infrastructure that works in whitepapers but not in production. Blockchain without distribution creates no value.",
  },
  {
    code: "SIGNAL_03",
    num: "03",
    title: "Web3 without adoption",
    sub: "creates no leverage.",
    body: "Awarizon focuses on deployable on-chain infrastructure, not theoretical decentralization. We exist inside the gap between what crypto promises and what the world actually runs on.",
  },
];

type BootLine = { text: string; done: boolean; current: string };

export default function ShiftPage() {
  const [bootLines, setBootLines] = useState<BootLine[]>([]);
  const [heroVisible, setHeroVisible] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    async function runBoot() {
      for (let i = 0; i < BOOT_SEQUENCE.length; i++) {
        const { text, delay, speed } = BOOT_SEQUENCE[i];
        await new Promise((r) => setTimeout(r, delay));
        setBootLines((prev) => [
          ...prev,
          { text: "", done: false, current: "" },
        ]);
        for (let j = 0; j <= text.length; j++) {
          await new Promise((r) => setTimeout(r, speed));
          setBootLines((prev) => {
            const u = [...prev];
            u[i] = { text, done: j === text.length, current: text.slice(0, j) };
            return u;
          });
        }
      }
      await new Promise((r) => setTimeout(r, 500));
      setHeroVisible(true);
    }
    runBoot();
  }, []);

  return (
    <ScrollProvider>
      <PageTransition>
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
          <div className="absolute inset-0 grid-bg opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,black_72%)]" />
          <div className="absolute left-0 right-0 h-px bg-accent/8 animate-scan pointer-events-none z-10" />

          <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-12 lg:px-20 pt-24 pb-16">
            {/* Status */}
            <div className="flex items-center gap-4 mb-12 flex-wrap">
              {[
                { dot: "bg-accent", label: "SYS:ONLINE" },
                { dot: "", label: "LAYER_01 // ENTRY" },
                { dot: "", label: "NGN_MARKET_ACTIVE" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  {item.dot && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${item.dot} animate-pulse`}
                    />
                  )}
                  <span
                    className={`font-mono text-[10px] tracking-widest ${item.dot ? "text-accent" : "text-dim"}`}
                  >
                    {item.label}
                  </span>
                  {i < 2 && (
                    <span className="font-mono text-[10px] text-dim/40 ml-2">
                      |
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Terminal */}
            <div className="mb-16 max-w-xl">
              <div className="border border-[#1A1A1A] bg-[#040404]/95 backdrop-blur-sm">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1A1A1A]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  <span className="ml-3 font-mono text-[9px] text-dim tracking-widest">
                    awz_boot — v3.2.1
                  </span>
                </div>
                <div className="p-5 min-h-[152px] space-y-1.5">
                  {bootLines.map((line, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="font-mono text-dim text-sm mt-px select-none shrink-0">
                        ›
                      </span>
                      <span
                        className={`font-mono text-sm leading-relaxed ${
                          line.text.startsWith("●")
                            ? "text-accent font-medium"
                            : line.done
                              ? "text-[#888]"
                              : "text-[#555]"
                        }`}
                      >
                        {line.current}
                        {!line.done && i === bootLines.length - 1 && (
                          <span className="inline-block w-2 h-[14px] bg-accent ml-0.5 animate-flicker" />
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero text */}
            <div
              className={`transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <span className="sys-label opacity-35 tracking-[0.4em] block mb-6">
                THE SHIFT // ENTRY LAYER
              </span>
              <h1 className="font-display font-extrabold leading-[0.92] mb-10 break-words text-5xl lg:text-[8rem] ">
                <span className="block text-white">Web3</span>
                <span className="block text-white">exists</span>
                <span className="block gradient-text">everywhere.</span>
              </h1>

              <div className="max-w-lg">
                <p className="font-body text-xl md:text-2xl text-muted mb-5">
                  Adoption does not.
                </p>
                <div className="h-px bg-gradient-to-r from-accent/40 via-transparent to-transparent mb-6" />
                <p className="font-body text-lg text-dim/90 leading-relaxed">
                  Awarizon builds the bridge between{" "}
                  {["developers", "blockchain", "everyday users"].map(
                    (word, i, arr) => (
                      <span key={word}>
                        <button
                          className="text-white/80 border-b border-dashed border-accent/30 hover:border-accent hover:text-accent transition-colors duration-200"
                          onMouseEnter={() => setTooltip(word)}
                          onMouseLeave={() => setTooltip(null)}
                        >
                          {word}
                        </button>
                        {i < arr.length - 1 ? ", " : "."}
                      </span>
                    ),
                  )}
                </p>
                {tooltip && (
                  <div className="mt-4 px-4 py-3 border border-accent/20 bg-accent/5 animate-slide-up">
                    <p className="font-mono text-sm text-accent/90">
                      {tooltip === "developers" &&
                        "Builders who need production-ready Web3 APIs, EVM SDKs, and blockchain infrastructure — without starting from zero."}
                      {tooltip === "blockchain" &&
                        "On-chain systems — crypto wallets, stablecoin payments, decentralized identity, smart contracts, DeFi protocols."}
                      {tooltip === "everyday users" &&
                        "End consumers whose financial lives improve when crypto is as simple and reliable as the apps they already use."}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`mt-auto pt-14 transition-all duration-1000 delay-300 ${heroVisible ? "opacity-100" : "opacity-0"}`}
            >
              <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
              <span className="font-mono text-[10px] text-dim tracking-widest mt-2 block">
                SCROLL TO EXPLORE
              </span>
            </div>
          </div>
        </section>

        {/* ── PROBLEM CARDS — section bg image ─────────────── */}
        <section className="section-img-bg relative py-32 px-6 md:px-12 lg:px-20">
          {/* Background: abstract tech circuit photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="s-img"
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=75"
            alt=""
            aria-hidden="true"
          />
          <div className="s-overlay bg-gradient-to-b from-black via-transparent to-black" />

          <div className="relative max-w-6xl mx-auto">
            <div className="mb-20 reveal">
              <span className="sys-label opacity-40 block mb-4">
                SIGNAL_ANALYSIS // THE REALITY
              </span>
              <div className="h-px bg-gradient-to-r from-accent/40 to-transparent mb-8" />
              <h2 className="font-display font-bold text-5xl md:text-6xl text-white">
                What we detected.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-[#111]/80">
              {PROBLEM_LAYERS.map((layer, i) => (
                <div
                  key={layer.code}
                  className="bg-black/90 backdrop-blur-sm p-10 reveal"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="flex items-center gap-2 mb-8">
                    <span className="w-1 h-1 bg-accent rounded-full" />
                    <span className="sys-label opacity-60">{layer.code}</span>
                  </div>
                  <div className="font-display text-7xl font-extrabold text-[#0F0F0F] mb-6 select-none leading-none">
                    {layer.num}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-1 leading-tight">
                    {layer.title}
                  </h3>
                  <h3 className="font-display font-bold text-2xl text-accent mb-6 leading-tight">
                    {layer.sub}
                  </h3>
                  <p className="font-body text-base text-muted leading-relaxed">
                    {layer.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUOTE ─────────────────────────────────────────── */}
        <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-accent/[0.03] blur-3xl pointer-events-none" />
          <div className="relative max-w-4xl reveal">
            <span className="sys-label opacity-40 block mb-6">
              OPERATIONAL CONTEXT
            </span>
            <blockquote className="font-display font-bold leading-tight text-3xl md:text-5xl text-white mb-10">
              "We build the blockchain protocols that move businesses from{" "}
              <span className="text-accent">legacy operations</span> to on-chain
              infrastructure."
            </blockquote>
            <div className="flex items-center gap-8 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-px h-10 bg-accent/40" />
                <div>
                  <p className="font-mono text-xs text-accent">POSITIONING</p>
                  <p className="font-body text-base text-muted">
                    Blockchain Infrastructure & Global Distribution
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-px h-10 bg-[#333]" />
                <div>
                  <p className="font-mono text-xs text-dim">MARKET</p>
                  <p className="font-body text-base text-muted">
                    Global — Multi-Market Distribution
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CHAINS MARQUEE ────────────────────────────────── */}
        <ChainsMarquee />

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-[#111]">
          <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-8">
            <div className="reveal">
              <span className="sys-label opacity-40 block mb-2">
                NEXT_LAYER
              </span>
              <p className="font-display font-semibold text-3xl text-white">
                Enter the Infrastructure.
              </p>
            </div>
            <div className="reveal reveal-delay-2">
              <Button href="/infrastructure" variant="primary" size="lg">
                Infrastructure Layer →
              </Button>
            </div>
          </div>
        </section>
      </PageTransition>
    </ScrollProvider>
  );
}
