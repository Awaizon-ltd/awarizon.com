"use client";

import { useState, useEffect } from "react";
import PageTransition from "@/components/motion/PageTransition";
import ScrollProvider from "@/components/motion/ScrollProvider";
import Button from "@/components/ui/Button";

const PRODUCT_FEATURES = [
  {
    icon: "⚡",
    label: "Real-time Payments",
    desc: "Instant money movement across all major payment networks with sub-second clearing.",
  },
  {
    icon: "🔒",
    label: "Secure Identity",
    desc: "Biometric and multi-factor authentication built into every transaction flow.",
  },
  {
    icon: "◈",
    label: "Wallet Infrastructure",
    desc: "Programmable value storage, transfer, and spending rules in one interface.",
  },
  {
    icon: "◉",
    label: "Merchant Connect",
    desc: "Accept payments from any business or individual — QR, link, or tap.",
  },
  {
    icon: "⬡",
    label: "Analytics Layer",
    desc: "Real-time behavioral intelligence and financial insights dashboard.",
  },
  {
    icon: "∞",
    label: "API Access",
    desc: "Developer tools for deep custom integrations and workflow automation.",
  },
];

const WHY_CONSUMER = [
  {
    code: "REASON_01",
    text: "Validate infrastructure under real usage conditions",
  },
  { code: "REASON_02", text: "Understand behavior at scale" },
  {
    code: "REASON_03",
    text: "Refine product design using real-world feedback",
  },
  { code: "REASON_04", text: "Create direct market trust and familiarity" },
];

function PhoneMockup({ active }: { active: boolean }) {
  return (
    <div
      className={`relative transition-all duration-700 ${active ? "scale-100 opacity-100" : "scale-95 opacity-70"}`}
    >
      <div
        className="relative w-60 mx-auto border-2 border-[#222] bg-[#080808] rounded-3xl overflow-hidden shadow-2xl"
        style={{ aspectRatio: "9/19" }}
      >
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#0D0D0D] rounded-full z-10 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
        </div>
        <div className="h-full bg-[#050505] pt-10 px-3 pb-4 flex flex-col">
          <div className="flex justify-between items-center mb-4 px-1">
            <span className="font-mono text-[9px] text-[#444]">9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-2 border border-[#333] rounded-sm">
                <div className="w-3/4 h-full bg-accent rounded-sm" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="font-mono text-[9px] text-[#444]">ZELA</div>
              <div className="font-display font-bold text-white text-base">
                Balance
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
              <span className="text-accent font-bold text-xs">Z</span>
            </div>
          </div>
          {/* Balance card */}
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-4">
            <div className="font-mono text-[9px] text-accent/60 mb-1">
              AVAILABLE
            </div>
            <div className="font-display font-bold text-accent text-xl">
              ₦ 847,250
            </div>
            <div className="font-mono text-[9px] text-[#444] mt-1.5">
              **** **** **** 4829
            </div>
          </div>
          {/* Actions */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {["Send", "Receive", "Pay", "More"].map((action) => (
              <button key={action} className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 bg-[#111] border border-[#1A1A1A] rounded-xl flex items-center justify-center">
                  <span className="text-xs text-[#444]">◈</span>
                </div>
                <span className="font-mono text-[8px] text-[#444]">
                  {action}
                </span>
              </button>
            ))}
          </div>
          {/* Transactions */}
          <div className="flex-1">
            <div className="font-mono text-[9px] text-[#333] mb-2">
              RECENT ACTIVITY
            </div>
            {[
              {
                name: "Shoprite",
                amount: "-₦4,500",
                type: "Payment",
                time: "2m ago",
              },
              {
                name: "John A.",
                amount: "+₦12,000",
                type: "Transfer",
                time: "1h ago",
              },
              { name: "Bolt", amount: "-₦1,200", type: "Ride", time: "3h ago" },
            ].map((tx) => (
              <div
                key={tx.name}
                className="flex justify-between items-center py-2 border-b border-[#0D0D0D]"
              >
                <div>
                  <div className="font-mono text-[9px] text-[#666]">
                    {tx.name}
                  </div>
                  <div className="font-mono text-[8px] text-[#333]">
                    {tx.type} • {tx.time}
                  </div>
                </div>
                <div
                  className={`font-mono text-[9px] font-medium ${tx.amount.startsWith("+") ? "text-green-400" : "text-[#666]"}`}
                >
                  {tx.amount}
                </div>
              </div>
            ))}
          </div>
          {/* Nav */}
          <div className="flex justify-around pt-3 border-t border-[#111]">
            {["◉", "◈", "⬡", "◆"].map((icon, i) => (
              <button
                key={i}
                className={`p-1.5 ${i === 0 ? "text-accent" : "text-[#333]"}`}
              >
                <span className="text-base">{icon}</span>
              </button>
            ))}
          </div>
        </div>
        {active && (
          <div className="absolute inset-0 bg-accent/[0.02] pointer-events-none" />
        )}
      </div>
      {active && (
        <div className="absolute -inset-6 bg-accent/5 rounded-3xl blur-2xl animate-breathe pointer-events-none" />
      )}
    </div>
  );
}

export default function ConsumerPage() {
  const [phoneActive] = useState(true);

  return (
    <ScrollProvider>
      <PageTransition>
        {/* ─── Hero with mobile/lifestyle image ─── */}
        <section className="relative min-h-screen flex flex-col overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="s-img w-[60vh]"
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80"
            alt=""
            aria-hidden="true"
          />
          <div className="s-overlay bg-gradient-to-l from-black/30 via-black/80 to-black" />
          <div className="s-overlay grid-bg-static opacity-15" />
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-accent/[0.05] to-transparent pointer-events-none" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen">
            <div className="flex items-center gap-4 mb-16">
              <div className="flex items-center gap-2">
                <span className="w-1 h-6 bg-accent" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-accent">
                  LAYER_04
                </span>
              </div>
              <span className="font-mono text-[10px] text-dim">
                CONSUMER_LAYER // ACTIVE
              </span>
            </div>

            <div className="flex-1 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-4 reveal">
                  <span className="sys-label opacity-40">
                    CONSUMER SYSTEMS // PRODUCT LAYER
                  </span>
                </div>
                <h1
                  className="font-display font-bold leading-none mb-8 reveal"
                  style={{ fontSize: "clamp(2.2rem, 5.5vw, 6.5rem)" }}
                >
                  <span className="block text-white">Consumer products</span>
                  <span className="block text-white">are where</span>
                  <span className="block gradient-text">infrastructure</span>
                  <span className="block text-white">meets reality.</span>
                </h1>
                <p className="font-body text-xl text-muted leading-relaxed mb-8 reveal reveal-delay-2">
                  Real adoption does not begin with architecture diagrams. It
                  begins when technology becomes natural to use.
                </p>
                <div className="inline-flex items-center gap-4 border border-accent/30 bg-accent/5 px-5 py-3.5 reveal reveal-delay-3">
                  <div className="w-10 h-10 bg-accent flex items-center justify-center">
                    <span className="font-display font-bold text-black text-base">
                      Z
                    </span>
                  </div>
                  <div>
                    <div className="font-display font-bold text-white text-base">
                      Zela
                    </div>
                    <div className="font-mono text-[10px] text-accent/60">
                      Consumer Application Layer
                    </div>
                  </div>
                  <div className="ml-4 font-mono text-[10px] text-green-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    v2.1.0 LIVE
                  </div>
                </div>
              </div>
              <div className="flex justify-center reveal reveal-delay-2">
                <PhoneMockup active={phoneActive} />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Why consumer matters ─── */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="mb-4 reveal">
                  <span className="sys-label opacity-40">
                    STRATEGIC_RATIONALE
                  </span>
                </div>
                <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-8 leading-tight reveal">
                  Every consumer product strengthens the infrastructure behind
                  it.
                </h2>
                <div className="space-y-5 reveal reveal-delay-2">
                  {WHY_CONSUMER.map((item) => (
                    <div
                      key={item.code}
                      className="flex items-start gap-4 group"
                    >
                      <div className="flex items-center gap-2 mt-1 shrink-0">
                        <span className="font-mono text-[9px] text-dim">
                          {item.code}
                        </span>
                        <div className="w-5 h-px bg-accent/30 group-hover:bg-accent transition-colors duration-300" />
                      </div>
                      <p className="font-body text-base text-muted leading-relaxed group-hover:text-white transition-colors duration-300">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="reveal reveal-delay-2">
                <div className="border-l-2 border-accent/30 pl-8 py-4 mb-8">
                  <p className="font-display font-medium text-xl md:text-2xl text-white/80 leading-relaxed mb-6">
                    "Technology becomes powerful when it disappears into
                    behavior."
                  </p>
                  <p className="font-body text-base text-muted leading-relaxed">
                    Not as isolated apps. But as active interfaces between
                    infrastructure and everyday life.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-px bg-[#0D0D0D]">
                  {[
                    { val: "50K+", label: "Active Users" },
                    { val: "<2s", label: "Tx Speed" },
                    { val: "99.9%", label: "Uptime" },
                  ].map((m, i) => (
                    <div key={i} className="bg-black p-5 text-center">
                      <div className="font-display font-bold text-2xl md:text-3xl text-accent mb-1">
                        {m.val}
                      </div>
                      <div className="font-mono text-[9px] text-dim tracking-widest">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Features grid with image bg ─── */}
        <section className="section-img-bg py-24 px-6 md:px-12 lg:px-20 bg-[#030303]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="s-img"
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=80"
            alt=""
            aria-hidden="true"
          />
          <div className="s-overlay bg-[#030303]/95" />

          <div className="relative max-w-6xl mx-auto">
            <div className="mb-16 reveal">
              <span className="sys-label opacity-40 block mb-4">
                ZELA // FEATURE MANIFEST
              </span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
                System capabilities.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#111]">
              {PRODUCT_FEATURES.map((feat, i) => (
                <div
                  key={feat.label}
                  className="bg-[#030303] p-7 hover:bg-[#070707] transition-all duration-300 group reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="text-3xl mb-5 group-hover:scale-110 transition-transform duration-300">
                    {feat.icon}
                  </div>
                  <h3 className="font-display font-semibold text-white text-lg mb-2 group-hover:text-accent transition-colors duration-300">
                    {feat.label}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-8">
            <div className="reveal">
              <span className="sys-label opacity-40 block mb-2">
                NEXT_LAYER
              </span>
              <p className="font-display font-semibold text-2xl md:text-3xl text-white">
                See how it all connects.
              </p>
            </div>
            <div className="reveal reveal-delay-2">
              <Button href="/ecosystem" variant="primary" size="lg">
                Ecosystem Logic →
              </Button>
            </div>
          </div>
        </section>
      </PageTransition>
    </ScrollProvider>
  );
}
