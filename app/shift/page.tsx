"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageTransition from "@/components/motion/PageTransition";
import ScrollProvider from "@/components/motion/ScrollProvider";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import FloatingOrbs from "@/components/ui/FloatingOrbs";
import LiveTxFeed from "@/components/ui/LiveTxFeed";
import { ALL_CHAINS } from "@/lib/chainLogos";

const BOOT_SEQUENCE = [
  { text: "INITIALIZING AWARIZON INFRASTRUCTURE LAYER…", delay: 200, speed: 32 },
  { text: "LOADING SDK MODULES — @awarizon/web3…",       delay: 600, speed: 26 },
  { text: "CONNECTING TO 15+ EVM CHAIN NETWORKS…",       delay: 500, speed: 32 },
  { text: "SCANNING DEVELOPER BUILD ENVIRONMENT…",       delay: 500, speed: 26 },
  { text: "CALIBRATING BUILD ACCELERATION ENGINE…",      delay: 600, speed: 22 },
  { text: "● SYSTEM ONLINE: AWARIZON — BUILD 5× FASTER", delay: 400, speed: 40 },
];

const PROBLEM_LAYERS = [
  {
    code: "SIGNAL_01", num: "01",
    title: "Web3 setup takes months.",
    sub: "It should take days.",
    body: "Dev teams spend 3–6 months configuring RPCs, managing ABIs, setting up wallets, and handling chain differences — before writing a single line of product code. Awarizon eliminates that entirely.",
  },
  {
    code: "SIGNAL_02", num: "02",
    title: "Fragmented tooling kills velocity.",
    sub: "One SDK changes everything.",
    body: "Scattered libraries, inconsistent APIs, and no clear integration pathway force developers to reinvent the wheel on every project. A unified, production-ready SDK changes the equation.",
  },
  {
    code: "SIGNAL_03", num: "03",
    title: "Businesses need on-chain capability",
    sub: "without a dedicated blockchain team.",
    body: "Startups and enterprises shouldn't need specialist Web3 engineers to integrate payments, identity, or wallets. Awarizon's modular infrastructure makes on-chain operations accessible to any technical team.",
  },
];

const STATUS_ITEMS = [
  { dot: "bg-accent", label: "SYS:ONLINE",            accent: true  },
  { dot: "",          label: "LAYER_01 // INFRASTRUCTURE", accent: false },
  { dot: "",          label: "DEV_ENV_ACTIVE",         accent: false },
];

const ease = [0.16, 1, 0.3, 1] as const;

// ─── Comparison illustration ───────────────────────────────────────────────────

function ComparisonIllustration() {
  const withoutItems = [
    "Configure RPC endpoints",
    "Manage ABI files by hand",
    "Build wallet connection logic",
    "Handle chain ID differences",
    "Write retry & gas logic",
    "Build payment processing",
    "Set up identity & auth",
    "Maintain as chains update",
  ];
  const withItems = [
    "npm install @awarizon/web3",
    "Configure your API key",
    "Ship your product",
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="border border-black/10 p-6">
        <div className="font-mono text-[9px] text-black/40 tracking-widest mb-5 uppercase">
          Without Awarizon
        </div>
        <div className="space-y-2.5">
          {withoutItems.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 border border-black/15 rounded-sm flex items-center justify-center shrink-0">
                <span className="text-[8px] text-black/30">✕</span>
              </div>
              <span className="font-body text-[12px] text-black/40 line-through decoration-black/20">
                {item}
              </span>
            </div>
          ))}
          <div className="pt-3 mt-3 border-t border-black/8">
            <span className="font-mono text-[10px] text-black/30 tracking-widest">
              ~3–6 MONTHS OF SETUP
            </span>
          </div>
        </div>
      </div>
      <div className="border border-black bg-black p-6">
        <div className="font-mono text-[9px] text-accent tracking-widest mb-5 uppercase">
          With Awarizon
        </div>
        <div className="space-y-3.5">
          {withItems.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 bg-accent flex items-center justify-center shrink-0">
                <span className="text-[8px] text-black font-bold">✓</span>
              </div>
              <span className="font-mono text-[12px] text-white">{item}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-5 border-t border-white/10">
          <span className="font-display font-extrabold text-accent text-2xl">90% less</span>
          <span className="font-mono text-[9px] text-white/40 block mt-0.5 tracking-widest">
            SETUP & CONFIGURATION TIME
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type BootLine = { text: string; done: boolean; current: string };

export default function ShiftPage() {
  const [bootLines, setBootLines] = useState<BootLine[]>([]);
  const [heroVisible, setHeroVisible] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const ran = useRef(false);

  // Vanta
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    async function initVanta() {
      if (!vantaRef.current) return;
      const THREE = await import("three");
      // @ts-expect-error — no types for vanta
      const mod = await import("vanta/dist/vanta.net.min");
      const VANTA = mod.default ?? mod;
      vantaEffect.current = VANTA({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        color: 0xffe500,
        backgroundColor: 0x000000,
        points: 9.0,
        maxDistance: 22.0,
        spacing: 18.0,
        showDots: true,
      });
    }
    initVanta();
    return () => { vantaEffect.current?.destroy(); };
  }, []);

  // Boot sequence
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    async function runBoot() {
      for (let i = 0; i < BOOT_SEQUENCE.length; i++) {
        const { text, delay, speed } = BOOT_SEQUENCE[i];
        await new Promise((r) => setTimeout(r, delay));
        setBootLines((prev) => [...prev, { text: "", done: false, current: "" }]);
        for (let j = 0; j <= text.length; j++) {
          await new Promise((r) => setTimeout(r, speed));
          setBootLines((prev) => {
            const u = [...prev];
            u[i] = { text, done: j === text.length, current: text.slice(0, j) };
            return u;
          });
        }
      }
      await new Promise((r) => setTimeout(r, 400));
      setHeroVisible(true);
    }
    runBoot();
  }, []);

  return (
    <ScrollProvider>
      <PageTransition>

        {/* ── HERO ───────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
          {/* Vanta NET */}
          <div ref={vantaRef} className="absolute inset-0 z-[0]" />
          {/* Darken so text stays legible */}
          <div className="absolute inset-0 bg-black/52 z-[1]" />
          {/* Edge vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_50%_45%,transparent_30%,black_85%)] z-[2]" />
          <div className="absolute inset-0 grid-bg-static opacity-[0.06] z-[2]" />
          <div className="absolute left-0 right-0 h-px bg-accent/10 animate-scan pointer-events-none z-[3]" />

          <div className="relative z-[4] flex flex-col min-h-screen px-6 md:px-12 lg:px-20 pt-24 pb-16">

            {/* Status bar */}
            <motion.div
              className="flex items-center gap-4 mb-12 flex-wrap"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
            >
              {STATUS_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-2"
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
                  }}
                >
                  {item.dot && (
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dot} animate-pulse`} />
                  )}
                  <span className={`font-mono text-[10px] tracking-widest ${item.accent ? "text-accent" : "text-dim"}`}>
                    {item.label}
                  </span>
                  {i < STATUS_ITEMS.length - 1 && (
                    <span className="font-mono text-[10px] text-dim/40 ml-2">|</span>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Terminal */}
            <motion.div
              className="mb-16 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
            >
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
                      <span className="font-mono text-dim text-sm mt-px select-none shrink-0">›</span>
                      <span
                        className={`font-mono text-sm leading-relaxed ${
                          line.text.startsWith("●")
                            ? "text-accent font-medium"
                            : line.done ? "text-[#888]" : "text-[#555]"
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
            </motion.div>

            {/* Hero text — animates in after boot */}
            <motion.div
              initial="hidden"
              animate={heroVisible ? "show" : "hidden"}
              variants={{ show: { transition: { staggerChildren: 0.13 } } }}
            >
              <motion.span
                className="sys-label opacity-35 tracking-[0.4em] block mb-6"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 0.35, y: 0, transition: { duration: 0.5, ease } },
                }}
              >
                AWARIZON // INFRASTRUCTURE PLATFORM
              </motion.span>

              <h1 className="font-display font-extrabold leading-[0.92] mb-10 overflow-hidden text-5xl lg:text-[8rem]">
                {[
                  { text: "Build",      cls: "block text-white"    },
                  { text: "on-chain.",  cls: "block text-white"    },
                  { text: "5× faster.", cls: "block gradient-text" },
                ].map(({ text, cls }) => (
                  <div key={text} className="overflow-hidden">
                    <motion.span
                      className={cls}
                      style={{ display: "block" }}
                      variants={{
                        hidden: { y: "110%", opacity: 0 },
                        show: {
                          y: "0%", opacity: 1,
                          transition: { duration: 0.85, ease },
                        },
                      }}
                    >
                      {text}
                    </motion.span>
                  </div>
                ))}
              </h1>

              <motion.div
                className="max-w-lg"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
                }}
              >
                <p className="font-body text-xl md:text-2xl text-muted mb-5">
                  Infrastructure for{" "}
                  {["developers", "startups", "businesses"].map((word, i, arr) => (
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
                  ))}
                </p>
                <div className="h-px bg-gradient-to-r from-accent/40 via-transparent to-transparent mb-6" />
                <p className="font-body text-lg text-dim/90 leading-relaxed">
                  One SDK, ready-made APIs, wallet systems, and payment infrastructure — everything needed to ship production-ready Web3 with{" "}
                  <span className="text-white">90% less setup time.</span>
                </p>

                {tooltip && (
                  <motion.div
                    className="mt-4 px-4 py-3 border border-accent/20 bg-accent/5"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="font-mono text-sm text-accent/90">
                      {tooltip === "developers" &&
                        "Ship EVM integrations in hours. The @awarizon/web3 SDK handles RPC, ABIs, wallets, and codegen — no boilerplate."}
                      {tooltip === "startups" &&
                        "Go from idea to on-chain product without hiring a blockchain team. Wallets, payments, identity, and more."}
                      {tooltip === "businesses" &&
                        "Integrate stablecoin payments, smart contracts, and digital identity into existing products — no Web3 team required."}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="mt-auto pt-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: heroVisible ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
              <span className="font-mono text-[10px] text-dim tracking-widest mt-2 block">
                SCROLL TO EXPLORE
              </span>
            </motion.div>

            {/* Live TX feed — xl desktop only */}
            <motion.div
              className="hidden xl:block absolute right-20 bottom-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: heroVisible ? 1 : 0, y: heroVisible ? 0 : 20 }}
              transition={{ duration: 0.8, ease, delay: 0.8 }}
            >
              <LiveTxFeed />
            </motion.div>
          </div>
        </section>

        {/* ── VALUE PROP — white section ──────────────────────── */}
        <section className="bg-white py-28 px-6 md:px-12 lg:px-20 relative overflow-hidden">
          <FloatingOrbs color="0,0,0" orbs={[
            { w: 600, h: 400, left: '-5%',  top: '10%', delay: '0s',  duration: '12s', opacity: 0.018 },
            { w: 400, h: 350, left: '65%',  top: '40%', delay: '3s',  duration: '14s', opacity: 0.012 },
          ]} />
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <Reveal>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-black/40 block mb-5 uppercase">
                    The Platform // Built for Builders
                  </span>
                  <h2
                    className="font-display font-extrabold text-black leading-[0.93] mb-6"
                    style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}
                  >
                    Everything your team needs to build on-chain — without starting from zero.
                  </h2>
                  <p className="font-body text-lg text-black/85 leading-relaxed mb-10 max-w-md">
                    Awarizon provides the SDK, APIs, wallet systems, payment infrastructure, and developer tools that eliminate months of blockchain setup. Ship what matters — not infrastructure.
                  </p>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="grid grid-cols-3 gap-px bg-black/10 mb-8">
                    {[
                      { to: 5,  suffix: "×", label: "Faster development" },
                      { to: 90, suffix: "%", label: "Less setup time"    },
                      { to: 15, suffix: "+", label: "EVM chains"         },
                    ].map((s) => (
                      <div key={s.suffix} className="bg-white px-4 py-5">
                        <div className="font-display font-extrabold text-3xl md:text-4xl text-black mb-1">
                          <CountUp to={s.to} suffix={s.suffix} />
                        </div>
                        <div className="font-mono text-[9px] text-black/40 tracking-widest uppercase">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["SDK", "REST APIs", "Wallet Infrastructure", "Payments", "Identity", "Smart Contracts"].map((p) => (
                      <span key={p} className="font-mono text-[9px] px-3 py-1.5 border border-black/15 text-black/50 tracking-widest">
                        {p}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.2}>
                <ComparisonIllustration />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── PROBLEM CARDS ─────────────────────────────────────── */}
        <section className="section-img-bg relative py-32 px-6 md:px-12 lg:px-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="s-img" src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=75" alt="" aria-hidden="true" />
          <div className="s-overlay bg-gradient-to-b from-black via-transparent to-black" />

          <div className="relative max-w-6xl mx-auto">
            <Reveal className="mb-20">
              <span className="sys-label opacity-40 block mb-4">SIGNAL_ANALYSIS // THE PROBLEM</span>
              <div className="h-px bg-gradient-to-r from-accent/40 to-transparent mb-8" />
              <h2 className="font-display font-bold text-5xl md:text-6xl text-white">
                Why teams need us.
              </h2>
            </Reveal>

            <RevealGroup className="grid md:grid-cols-3 gap-px bg-[#111]/80" stagger={0.12}>
              {PROBLEM_LAYERS.map((layer) => (
                <RevealItem key={layer.code} className="bg-black/90 backdrop-blur-sm p-10">
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
                  <p className="font-body text-base text-muted leading-relaxed">{layer.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── QUOTE ─────────────────────────────────────────────── */}
        <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-accent/[0.03] blur-3xl pointer-events-none" />
          <Reveal className="relative max-w-4xl">
            <span className="sys-label opacity-40 block mb-6">OPERATIONAL CONTEXT</span>
            <blockquote className="font-display font-bold leading-tight text-3xl md:text-5xl text-white mb-10">
              "We build the infrastructure that moves{" "}
              <span className="text-accent">developers and businesses</span>{" "}
              from months of setup to shipping on-chain in days."
            </blockquote>
            <div className="flex items-center gap-8 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-px h-10 bg-accent/40" />
                <div>
                  <p className="font-mono text-xs text-accent">POSITIONING</p>
                  <p className="font-body text-base text-muted">Blockchain Infrastructure & Developer Platform</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-px h-10 bg-[#333]" />
                <div>
                  <p className="font-mono text-xs text-dim">SDK</p>
                  <p className="font-body text-base text-muted">
                    @awarizon/web3 · @awarizon/react · @awarizon/cli
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── SDK SHOWCASE ──────────────────────────────────────── */}
        <section className="relative py-28 px-6 md:px-12 lg:px-20 bg-[#020202] border-t border-[#0E0E0E] overflow-hidden">
          <div className="absolute inset-0 grid-bg-static opacity-10 pointer-events-none" />
          <div className="absolute left-0 top-0 w-[40vw] h-[40vw] bg-accent/[0.03] blur-3xl pointer-events-none" />

          <div className="relative max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <span className="font-mono text-[10px] tracking-[0.3em] text-accent/70 block mb-5">
                  THE PRODUCT // AWARIZON SDK
                </span>
                <h2
                  className="font-display font-extrabold text-white leading-[0.92] mb-6"
                  style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
                >
                  One SDK.<br />Any chain.<br />
                  <span className="gradient-text">Ship faster.</span>
                </h2>
                <p className="font-body text-lg text-muted leading-relaxed mb-8 max-w-md">
                  <code className="font-mono text-accent text-sm">@awarizon/web3</code> gives developers typed reads, writes, events, and codegen across 15+ EVM chains — without configuring RPC providers, managing ABIs, or writing boilerplate.
                </p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 mb-8">
                  {["15+ EVM chains","Full TypeScript","React hooks built-in","CLI code generation","Zero config reads","Event subscriptions"].map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-accent flex-shrink-0" />
                      <span className="font-mono text-[11px] text-muted tracking-wide">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/sdk" className="font-mono text-[10px] tracking-widest px-5 py-3 bg-accent text-black font-semibold hover:bg-white transition-colors">
                    EXPLORE THE SDK →
                  </Link>
                  <Link href="/dashboard/docs" className="font-mono text-[10px] tracking-widest px-5 py-3 border border-[#252525] text-muted hover:text-white hover:border-white/20 transition-colors">
                    DOCUMENTATION
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="border border-[#2D2D2D] mb-3">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#252526] border-b border-[#2D2D2D]">
                    <span className="font-mono text-[9px] tracking-widest text-[#9D9D9D]">INSTALL</span>
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-4 bg-[#1E1E1E]">
                    <span className="font-mono text-sm text-[#28CA41] select-none">$</span>
                    <span className="font-mono text-sm text-[#D4D4D4]">
                      npm install{" "}
                      <span style={{ color: "#CE9178" }}>@awarizon/web3</span>{" "}
                      <span style={{ color: "#CE9178" }}>@awarizon/react</span>
                    </span>
                  </div>
                </div>
                <div className="border border-[#2D2D2D]">
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-[#252526] border-b border-[#2D2D2D]">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                    </div>
                    <span className="font-mono text-[11px] text-[#9D9D9D]">quickstart.ts</span>
                  </div>
                  <pre className="font-mono text-[13px] leading-[1.75] p-5 bg-[#1E1E1E] overflow-x-auto whitespace-pre">
                    <span style={{ color: "#C586C0" }}>import</span>
                    <span style={{ color: "#D4D4D4" }}>{" { "}</span>
                    <span style={{ color: "#4EC9B0" }}>AwarizonWeb3</span>
                    <span style={{ color: "#D4D4D4" }}>{" } "}</span>
                    <span style={{ color: "#C586C0" }}>from</span>
                    <span style={{ color: "#CE9178" }}>{' "@awarizon/web3"'}</span>
                    {"\n\n"}
                    <span style={{ color: "#C586C0" }}>const</span>
                    <span style={{ color: "#D4D4D4" }}> awz = </span>
                    <span style={{ color: "#C586C0" }}>new </span>
                    <span style={{ color: "#DCDCAA" }}>AwarizonWeb3</span>
                    <span style={{ color: "#D4D4D4" }}>{"({"}</span>
                    {"\n"}
                    <span style={{ color: "#D4D4D4" }}>{"  "}</span>
                    <span style={{ color: "#9CDCFE" }}>chain</span>
                    <span style={{ color: "#D4D4D4" }}>{": "}</span>
                    <span style={{ color: "#CE9178" }}>"base"</span>
                    <span style={{ color: "#D4D4D4" }}>,</span>
                    {"\n"}
                    <span style={{ color: "#D4D4D4" }}>{"  "}</span>
                    <span style={{ color: "#9CDCFE" }}>apiKey</span>
                    <span style={{ color: "#D4D4D4" }}>{": process.env."}</span>
                    <span style={{ color: "#9CDCFE" }}>AWARIZON_API_KEY</span>
                    {"\n"}
                    <span style={{ color: "#D4D4D4" }}>{"})"})</span>
                    {"\n\n"}
                    <span style={{ color: "#6A9955" }}>{"// ERC-20 in one line"}</span>
                    {"\n"}
                    <span style={{ color: "#C586C0" }}>const</span>
                    <span style={{ color: "#D4D4D4" }}> token = </span>
                    <span style={{ color: "#C586C0" }}>await </span>
                    <span style={{ color: "#9CDCFE" }}>awz</span>
                    <span style={{ color: "#D4D4D4" }}>.</span>
                    <span style={{ color: "#DCDCAA" }}>erc20</span>
                    <span style={{ color: "#CE9178" }}>("0x8335..."</span>
                    <span style={{ color: "#D4D4D4" }}>)</span>
                    {"\n"}
                    <span style={{ color: "#C586C0" }}>const</span>
                    <span style={{ color: "#D4D4D4" }}> bal = </span>
                    <span style={{ color: "#C586C0" }}>await </span>
                    <span style={{ color: "#9CDCFE" }}>token</span>
                    <span style={{ color: "#D4D4D4" }}>.</span>
                    <span style={{ color: "#DCDCAA" }}>balanceOf</span>
                    <span style={{ color: "#D4D4D4" }}>(</span>
                    <span style={{ color: "#CE9178" }}>"0xYourAddress"</span>
                    <span style={{ color: "#D4D4D4" }}>)</span>
                    {"\n"}
                    <span style={{ color: "#6A9955" }}>{"// → 1000000n"}</span>
                    {"\n\n"}
                    <span style={{ color: "#C586C0" }}>const</span>
                    <span style={{ color: "#D4D4D4" }}> tx = </span>
                    <span style={{ color: "#C586C0" }}>await </span>
                    <span style={{ color: "#9CDCFE" }}>token</span>
                    <span style={{ color: "#D4D4D4" }}>.</span>
                    <span style={{ color: "#DCDCAA" }}>transfer</span>
                    <span style={{ color: "#D4D4D4" }}>(</span>
                    <span style={{ color: "#CE9178" }}>"0xRecipient"</span>
                    <span style={{ color: "#D4D4D4" }}>, </span>
                    <span style={{ color: "#B5CEA8" }}>500_000n</span>
                    <span style={{ color: "#D4D4D4" }}>)</span>
                    {"\n"}
                    <span style={{ color: "#C586C0" }}>await </span>
                    <span style={{ color: "#9CDCFE" }}>tx</span>
                    <span style={{ color: "#D4D4D4" }}>.</span>
                    <span style={{ color: "#DCDCAA" }}>wait</span>
                    <span style={{ color: "#D4D4D4" }}>()</span>
                  </pre>
                </div>
                <div className="grid grid-cols-3 gap-px bg-[#111] mt-3">
                  {["@awarizon/web3", "@awarizon/react", "@awarizon/cli"].map((p) => (
                    <div key={p} className="bg-[#020202] px-3 py-2.5 text-center">
                      <code className="font-mono text-[10px] text-dim">{p}</code>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── SUPPORTED CHAINS ──────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-[#0E0E0E] bg-[#020202]">
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-10">
              <span className="sys-label opacity-40 block mb-3">CHAIN_SUPPORT // EVM_NATIVE</span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
                Supported across every major chain.
              </h2>
            </Reveal>

            <RevealGroup className="flex items-end gap-4 flex-wrap" stagger={0.04}>
              {ALL_CHAINS.map(({ name, logo }) => (
                <RevealItem key={name} y={16}>
                  <motion.div
                    className="flex flex-col items-center gap-1.5 group cursor-default"
                    whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#111] border border-[#1E1E1E] flex items-center justify-center overflow-hidden group-hover:border-accent/40 transition-colors duration-300">
                      <Image src={logo} alt={name} width={32} height={32} className="w-8 h-8 object-contain" />
                    </div>
                    <span className="font-mono text-[9px] text-dim group-hover:text-accent/70 transition-colors">
                      {name}
                    </span>
                  </motion.div>
                </RevealItem>
              ))}
              <RevealItem y={16}>
                <motion.div
                  className="flex flex-col items-center gap-1.5 cursor-default"
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                    <span className="font-mono text-accent text-xl font-bold leading-none">+</span>
                  </div>
                  <span className="font-mono text-[9px] text-accent tracking-widest">more</span>
                </motion.div>
              </RevealItem>
            </RevealGroup>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-[#111]">
          <div className="max-w-6xl mx-auto flex items-start justify-between flex-wrap gap-8">
            <Reveal>
              <span className="sys-label opacity-40 block mb-2">DISTRIBUTION_LAYER // NEXT</span>
              <p className="font-display font-semibold text-3xl text-white">
                Build on the infrastructure.
              </p>
              <p className="font-body text-base text-dim mt-2 max-w-sm">
                From developer SDK to full business adoption — distribution is part of the product.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="flex flex-wrap gap-3">
              <Button href="/sdk" variant="primary" size="lg">SDK →</Button>
              <Button href="/adoption" variant="ghost" size="lg">Adoption Layer</Button>
              <Button href="/infrastructure" variant="ghost" size="lg">Infrastructure</Button>
            </Reveal>
          </div>
        </section>

      </PageTransition>
    </ScrollProvider>
  );
}
