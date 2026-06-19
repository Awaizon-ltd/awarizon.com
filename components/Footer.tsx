"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { NAV_LAYERS } from "@/lib/constants";
import { LEARN_ARTICLES } from "@/lib/learn-content";

// EmailJS send helper — works without SSR
async function sendViaEmailJS(data: {
  name: string;
  email: string;
  message: string;
}) {
  // @ts-ignore — loaded dynamically
  const emailjs = (await import("@emailjs/browser")).default;

  return emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      to_name: "Awarizon",
    },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
  );
}

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSend() {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      await sendViaEmailJS({ name, email, message });
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.text || "Transmission failed. Please try again.");
    }
  }

  return (
    <footer className="relative border-t border-[#111] bg-[#020202] overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg-static opacity-20 pointer-events-none" />

      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Main footer grid */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link
              href="/shift"
              className="group inline-flex items-center gap-3 mb-6"
            >
              <Image
                src="/logo.png"
                alt="Awarizon"
                height={36}
                width={140}
                className="h-9 w-auto object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
              />
            </Link>

            <p className="font-body text-sm text-muted leading-relaxed mb-6 max-w-xs">
              Global blockchain infrastructure and distribution — building the
              protocols that connect developers, businesses, and consumers to
              the on-chain economy.
            </p>

            {/* System badge */}
            <div className="inline-flex items-center gap-2 border border-[#1A1A1A] px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest text-green-400">
                SYSTEM OPERATIONAL
              </span>
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h4 className="sys-label mb-5 opacity-50">NAVIGATION LAYERS</h4>
            <ul className="space-y-2.5">
              {NAV_LAYERS.filter((l) => l.href !== "/learn").map((layer) => (
                <li key={layer.href}>
                  <Link
                    href={layer.href}
                    className="group flex items-center gap-3 text-muted hover:text-white transition-colors duration-200"
                  >
                    <span className="font-mono text-[10px] text-dim group-hover:text-accent transition-colors w-6">
                      {layer.num}
                    </span>
                    <span className="font-body text-sm">{layer.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact info */}
          <div>
            <h4 className="sys-label mb-5 opacity-50">CONTACT INTERFACE</h4>
            <div className="space-y-5">
              {[
                {
                  code: "EMAIL",
                  label: "General Inquiries",
                  value: "info@awarizon.com",
                  href: "mailto:hello@awarizon.com",
                },
                {
                  code: "PARTNERSHIPS",
                  label: "Partnerships & Integration",
                  value: "partners@awarizon.com",
                  href: "mailto:partners@awarizon.com",
                },
                {
                  code: "DEVELOPERS",
                  label: "Developer Access",
                  value: "dev@awarizon.com",
                  href: "mailto:dev@awarizon.com",
                },
                {
                  code: "LOCATION",
                  label: "Headquarters",
                  value: "Global",
                  href: "#",
                },
              ].map((c) => (
                <div key={c.code}>
                  <div className="font-mono text-[9px] text-dim tracking-widest mb-0.5">
                    {c.code}
                  </div>
                  <div className="font-body text-[11px] text-dim mb-0.5">
                    {c.label}
                  </div>
                  <a
                    href={c.href}
                    className="font-body text-sm text-muted hover:text-accent transition-colors duration-200"
                  >
                    {c.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4 — Quick contact form */}
          <div>
            <h4 className="sys-label mb-5 opacity-50">QUICK TRANSMISSION</h4>

            {status === "sent" ? (
              <div className="border border-accent/30 bg-accent/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-[10px] text-green-400 tracking-widest">
                    TRANSMITTED
                  </span>
                </div>
                <p className="font-body text-sm text-muted">
                  Message received. We'll respond within 48 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 font-mono text-[10px] text-dim hover:text-accent transition-colors tracking-widest"
                >
                  SEND ANOTHER →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#080808] border border-[#1A1A1A] text-white text-sm placeholder-[#2A2A2A] focus:border-accent focus:outline-none font-body transition-colors duration-200"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#080808] border border-[#1A1A1A] text-white text-sm placeholder-[#2A2A2A] focus:border-accent focus:outline-none font-body transition-colors duration-200"
                />
                <textarea
                  placeholder="Your message…"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#080808] border border-[#1A1A1A] text-white text-sm placeholder-[#2A2A2A] focus:border-accent focus:outline-none font-body transition-colors duration-200 resize-none"
                />
                {status === "error" && (
                  <p className="font-mono text-[10px] text-red-400">
                    {errorMsg}
                  </p>
                )}
                <button
                  onClick={handleSend}
                  disabled={status === "sending" || !name || !email || !message}
                  className="w-full py-3 bg-accent text-black font-mono font-semibold text-xs tracking-widest uppercase hover:bg-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "TRANSMITTING…" : "SEND MESSAGE →"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Learn Web3 row */}
        <div className="mb-12 pt-10 border-t border-[#0D0D0D]">
          <div className="flex items-center gap-4 mb-6">
            <h4 className="sys-label opacity-50 whitespace-nowrap">LEARN WEB3</h4>
            <div className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2.5">
            {LEARN_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={article.slug === "what-is-awarizon" ? "/learn" : `/learn/${article.slug}`}
                className="group flex items-start gap-2 text-muted hover:text-white transition-colors duration-200"
              >
                <span className="font-mono text-[10px] text-dim group-hover:text-accent transition-colors mt-0.5 flex-shrink-0">→</span>
                <span className="font-body text-sm leading-snug">{article.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#1A1A1A] to-transparent mb-10" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 flex-wrap">
            <span className="font-mono text-[10px] text-dim tracking-widest">
              © {new Date().getFullYear()} AWARIZON LTD. ALL RIGHTS RESERVED.
            </span>
            <span className="font-mono text-[10px] text-[#1F1F1F]">|</span>
            <span className="font-mono text-[10px] text-dim tracking-widest">
              AWZ_GLOBAL_2024
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] text-dim">
              GLOBAL // ON-CHAIN
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[10px] text-accent tracking-widest">
                SYS_v3.2.1
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
