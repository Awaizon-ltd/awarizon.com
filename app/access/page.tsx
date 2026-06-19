'use client'

import { useState } from 'react'
import PageTransition from '@/components/motion/PageTransition'
import ScrollProvider from '@/components/motion/ScrollProvider'
import Button from '@/components/ui/Button'

type Mode = 'select' | 'build' | 'integrate' | 'deploy' | 'submitted'

const INTENT_OPTIONS = [
  {
    id: 'build',
    icon: '◈',
    label: 'Build with Awarizon',
    sub: 'Partnership & Co-development',
    desc: 'Collaborate on infrastructure, product, or distribution. Build something together.',
    color: 'from-accent/10 to-transparent',
  },
  {
    id: 'integrate',
    icon: '⬡',
    label: 'Integrate Infrastructure',
    sub: 'API & Systems Access',
    desc: 'Embed Awarizon infrastructure into your existing systems. API access, SDKs, direct integration.',
    color: 'from-blue-400/10 to-transparent',
  },
  {
    id: 'deploy',
    icon: '◉',
    label: 'Deploy Consumer Product',
    sub: 'Zela & Product Distribution',
    desc: 'Deploy Awarizon consumer products to your market, organization, or customer base.',
    color: 'from-green-400/10 to-transparent',
  },
]

const INTENT_FIELDS: Record<string, { label: string; type: string; placeholder: string; required?: boolean }[]> = {
  build: [
    { label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
    { label: 'Organization', type: 'text', placeholder: 'Company or project name', required: true },
    { label: 'Email Address', type: 'email', placeholder: 'hello@yourcompany.com', required: true },
    { label: 'Build Type', type: 'text', placeholder: 'Infrastructure / Consumer App / Distribution / Other' },
    { label: 'Timeline', type: 'text', placeholder: 'e.g. Q2 2025, 6 months, ASAP' },
    { label: 'Message', type: 'textarea', placeholder: 'Describe what you want to build or achieve…', required: true },
  ],
  integrate: [
    { label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
    { label: 'Organization', type: 'text', placeholder: 'Company or project name', required: true },
    { label: 'Email Address', type: 'email', placeholder: 'hello@yourcompany.com', required: true },
    { label: 'Integration Type', type: 'text', placeholder: 'Payments / Wallet / Identity / Full Stack / Custom' },
    { label: 'Current Tech Stack', type: 'text', placeholder: 'e.g. Node.js, Python, React, etc.' },
    { label: 'Message', type: 'textarea', placeholder: 'Describe your integration goal…', required: true },
  ],
  deploy: [
    { label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
    { label: 'Organization', type: 'text', placeholder: 'Company or project name', required: true },
    { label: 'Email Address', type: 'email', placeholder: 'hello@yourcompany.com', required: true },
    { label: 'Target Market Size', type: 'text', placeholder: 'Estimated users / organisation size' },
    { label: 'Geography', type: 'text', placeholder: 'e.g. United States, Europe, Southeast Asia' },
    { label: 'Message', type: 'textarea', placeholder: 'Tell us about your deployment goals…', required: true },
  ],
}

async function sendViaEmailJS(templateParams: Record<string, string>) {
  // @ts-ignore
  const emailjs = (await import('@emailjs/browser')).default
  return emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    templateParams,
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  )
}

export default function AccessPage() {
  const [mode, setMode] = useState<Mode>('select')
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [initPhase, setInitPhase] = useState<string[]>([])
  const [errorMsg, setErrorMsg] = useState('')

  const activeIntent = INTENT_OPTIONS.find(o => o.id === selectedIntent)
  const activeFields = selectedIntent ? INTENT_FIELDS[selectedIntent] ?? [] : []

  function selectIntent(id: string) {
    setSelectedIntent(id)
    setMode(id as Mode)
    setFormData({})
    setStatus('idle')
    setInitPhase([])
    setErrorMsg('')
  }

  async function handleSubmit() {
    // Basic validation
    const requiredFields = activeFields.filter(f => f.required)
    for (const f of requiredFields) {
      if (!formData[f.label]?.trim()) return
    }

    setStatus('sending')
    setInitPhase([])

    const phases = [
      'VALIDATING_INPUT…',
      'INITIALIZING_CONNECTION…',
      'AUTHENTICATING_REQUEST…',
      'ROUTING_TO_TEAM…',
      'ENCRYPTING_PAYLOAD…',
    ]

    // Show boot phases while sending
    const phaseTimer = setInterval(() => {
      setInitPhase(p => {
        if (p.length < phases.length) return [...p, phases[p.length]]
        clearInterval(phaseTimer)
        return p
      })
    }, 420)

    try {
      await sendViaEmailJS({
        intent: selectedIntent ?? '',
        from_name: formData['Full Name'] ?? '',
        from_email: formData['Email Address'] ?? '',
        organization: formData['Organization'] ?? '',
        message: formData['Message'] ?? '',
        extra_fields: Object.entries(formData)
          .filter(([k]) => !['Full Name', 'Email Address', 'Organization', 'Message'].includes(k))
          .map(([k, v]) => `${k}: ${v}`)
          .join('\n'),
        to_name: 'Awarizon Team',
      })
      clearInterval(phaseTimer)
      setInitPhase([...phases, '● CONNECTION_ESTABLISHED.'])
      await new Promise(r => setTimeout(r, 600))
      setStatus('sent')
      setMode('submitted')
    } catch (err: any) {
      clearInterval(phaseTimer)
      setStatus('error')
      setErrorMsg(err?.text || 'Transmission failed. Try again or email hello@awarizon.com directly.')
    }
  }

  const isFormValid = () => {
    const req = activeFields.filter(f => f.required)
    return req.every(f => (formData[f.label] ?? '').trim().length > 0)
  }

  return (
    <ScrollProvider>
      <PageTransition>
        {/* ─── Hero with background image ─── */}
        <section className="relative min-h-screen flex flex-col overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="s-overlay bg-gradient-to-b from-black via-black/90 to-black" />
          <div className="s-overlay grid-bg-static opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,229,0,0.06),transparent_60%)] pointer-events-none" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen">
            {/* Layer ID */}
            <div className="flex items-center gap-4 mb-16">
              <div className="flex items-center gap-2">
                <span className="w-1 h-6 bg-accent" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-accent">LAYER_07</span>
              </div>
              <span className="font-mono text-[10px] text-dim">ACCESS_GATE // ENTRY POINT</span>
            </div>

            {mode !== 'submitted' ? (
              <div className="flex-1 grid lg:grid-cols-2 gap-16 items-start">
                {/* Left */}
                <div>
                  <div className="mb-4 reveal">
                    <span className="sys-label opacity-40">ACCESS LAYER // NOT A CONTACT PAGE</span>
                  </div>
                  <h1 className="font-display font-bold leading-none mb-8 reveal" style={{ fontSize: 'clamp(3rem, 7vw, 8rem)' }}>
                    <span className="block text-white">Enter the</span>
                    <span className="block gradient-text">system.</span>
                  </h1>
                  <p className="font-body text-lg md:text-xl text-muted leading-relaxed mb-10 max-w-md reveal reveal-delay-2">
                    Select your intent to initialize the connection. This is an entry point into the Awarizon system, not a generic contact form.
                  </p>

                  {/* System status panel */}
                  <div className="border border-[#1A1A1A] bg-[#040404]/90 p-5 reveal reveal-delay-3 max-w-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="font-mono text-[10px] text-green-400 tracking-widest">SYSTEM_ACCEPTING_REQUESTS</span>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      {[
                        ['Response SLA', '< 48h'],
                        ['System Load', 'OPTIMAL'],
                        ['Region', 'NGN // WAF'],
                        ['Encryption', 'TLS_1.3'],
                        ['Queue Status', 'OPEN'],
                        ['Capacity', '100%'],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between col-span-1">
                          <span className="font-mono text-[10px] text-dim">{k}</span>
                          <span className="font-mono text-[10px] text-accent/60">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct email fallback */}
                  <div className="mt-8 reveal reveal-delay-4">
                    <p className="font-mono text-[10px] text-dim tracking-widest mb-1">DIRECT CHANNEL</p>
                    <a href="mailto:hello@awarizon.com" className="font-body text-base text-muted hover:text-accent transition-colors duration-200">
                      hello@awarizon.com
                    </a>
                  </div>
                </div>

                {/* Right: form system */}
                <div className="reveal reveal-delay-2">
                  {mode === 'select' ? (
                    <div>
                      <div className="sys-label opacity-40 mb-5">SELECT_INTENT</div>
                      <div className="space-y-px">
                        {INTENT_OPTIONS.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => selectIntent(option.id)}
                            className={`w-full flex items-start gap-5 p-6 border border-[#1A1A1A] hover:border-accent/50 bg-gradient-to-r ${option.color} hover:bg-accent/[0.04] transition-all duration-300 text-left group`}
                          >
                            <div className="w-12 h-12 border border-[#222] group-hover:border-accent/40 flex items-center justify-center transition-colors duration-300 shrink-0">
                              <span className="text-xl text-dim group-hover:text-accent transition-colors duration-300">{option.icon}</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-display font-semibold text-white group-hover:text-accent transition-colors duration-300 mb-0.5 text-lg">{option.label}</div>
                              <div className="font-mono text-[10px] text-dim tracking-widest mb-2">{option.sub}</div>
                              <div className="font-body text-sm text-muted leading-relaxed">{option.desc}</div>
                            </div>
                            <div className="font-mono text-dim group-hover:text-accent transition-colors duration-300 mt-1 text-lg">→</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : status === 'sending' ? (
                    /* Boot sequence */
                    <div className="border border-[#1A1A1A] bg-[#030303] p-8">
                      <div className="sys-label mb-6">SYSTEM_BOOT_SEQUENCE</div>
                      <div className="space-y-2">
                        {initPhase.map((phase, i) => (
                          <div key={i} className="flex items-center gap-3 animate-slide-up">
                            <span className="font-mono text-sm text-accent">›</span>
                            <span className={`font-mono text-sm ${phase.startsWith('●') ? 'text-green-400' : 'text-[#666]'}`}>
                              {phase}
                            </span>
                          </div>
                        ))}
                        {initPhase.length < 6 && (
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-accent">›</span>
                            <span className="inline-block w-2 h-4 bg-accent animate-flicker" />
                          </div>
                        )}
                      </div>
                    </div>
                  ) : activeIntent ? (
                    /* Dynamic form */
                    <div className="border border-[#1A1A1A] bg-[#030303]">
                      {/* Form header */}
                      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A]">
                        <div className="flex items-center gap-3">
                          <span className="text-accent text-lg">{activeIntent.icon}</span>
                          <span className="sys-label">{activeIntent.label.toUpperCase().replace(/ /g, '_')}</span>
                        </div>
                        <button onClick={() => { setMode('select'); setSelectedIntent(null); setFormData({}); setStatus('idle') }}
                          className="font-mono text-[10px] text-dim hover:text-white transition-colors tracking-widest">
                          ← BACK
                        </button>
                      </div>

                      {/* Form fields */}
                      <div className="p-6 space-y-4">
                        {activeFields.map((field, i) => (
                          <div key={field.label} className="animate-slide-up" style={{ animationDelay: `${i * 70}ms` }}>
                            <label className="font-mono text-[10px] text-accent/60 tracking-widest block mb-2">
                              {field.label.toUpperCase()}{field.required && <span className="text-accent ml-1">*</span>}
                            </label>
                            {field.type === 'textarea' ? (
                              <textarea
                                className="w-full px-4 py-3 bg-[#070707] border border-[#1A1A1A] text-white text-base placeholder-[#2A2A2A] focus:border-accent focus:outline-none resize-none font-body transition-colors duration-200"
                                placeholder={field.placeholder}
                                rows={4}
                                value={formData[field.label] ?? ''}
                                onChange={e => setFormData(d => ({ ...d, [field.label]: e.target.value }))}
                              />
                            ) : (
                              <input
                                type={field.type}
                                className="w-full px-4 py-3 bg-[#070707] border border-[#1A1A1A] text-white text-base placeholder-[#2A2A2A] focus:border-accent focus:outline-none font-body transition-colors duration-200"
                                placeholder={field.placeholder}
                                value={formData[field.label] ?? ''}
                                onChange={e => setFormData(d => ({ ...d, [field.label]: e.target.value }))}
                              />
                            )}
                          </div>
                        ))}

                        {status === 'error' && (
                          <div className="p-3 border border-red-500/30 bg-red-500/5">
                            <p className="font-mono text-xs text-red-400">{errorMsg}</p>
                          </div>
                        )}

                        <div className="pt-2">
                          <button
                            onClick={handleSubmit}
                            disabled={!isFormValid()}
                            className="w-full py-4 bg-accent text-black font-mono font-semibold text-sm tracking-widest uppercase hover:bg-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            INITIALIZE CONNECTION →
                          </button>
                          <p className="font-mono text-[9px] text-dim text-center mt-3 tracking-widest">
                            TRANSMISSION ENCRYPTED // RESPONSE WITHIN 48H
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              /* Submitted state */
              <div className="flex-1 flex items-center justify-center">
                <div className="max-w-lg text-center">
                  <div className="w-20 h-20 border-2 border-accent mx-auto mb-8 flex items-center justify-center animate-glow-pulse">
                    <span className="text-4xl text-accent">✓</span>
                  </div>
                  <div className="sys-label mb-4 text-green-400">CONNECTION_ESTABLISHED</div>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-5">You are in the system.</h2>
                  <p className="font-body text-lg text-muted mb-8 leading-relaxed">
                    We have received your request and will reach out within 48 hours. The connection is live.
                  </p>
                  <div className="border border-[#1A1A1A] bg-[#040404] p-5 mb-8 text-left">
                    <div className="font-mono text-[10px] text-dim tracking-widest mb-3">REQUEST_RECEIPT</div>
                    <div className="font-mono text-sm text-accent/60 space-y-1">
                      <div>REQ_ID: AWZ-{Math.random().toString(36).substring(2, 10).toUpperCase()}</div>
                      <div>INTENT: {selectedIntent?.toUpperCase()}</div>
                      <div>FROM: {formData['Email Address'] ?? 'N/A'}</div>
                      <div>STATUS: QUEUED_FOR_REVIEW</div>
                      <div>SLA: &lt;48H_RESPONSE</div>
                    </div>
                  </div>
                  <Button href="/shift" variant="ghost">← Back to Entry Layer</Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── Contact channels ─── */}
        <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 reveal">
              <span className="sys-label opacity-40 block mb-4">CONTACT_CHANNELS // DIRECT ACCESS</span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white">Other ways to reach us.</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0D0D0D]">
              {[
                { code: 'CH_01', icon: '◈', label: 'General', sub: 'Inquiries & questions', value: 'hello@awarizon.com', href: 'mailto:hello@awarizon.com', img: null },
                { code: 'CH_02', icon: '⬡', label: 'Partnerships', sub: 'Business & integration', value: 'partners@awarizon.com', href: 'mailto:partners@awarizon.com', img: null },
                { code: 'CH_03', icon: '◉', label: 'Developers', sub: 'API & SDK access', value: 'dev@awarizon.com', href: 'mailto:dev@awarizon.com', img: null },
                { code: 'CH_04', icon: '◆', label: 'Location', sub: 'Headquarters', value: 'Global', href: '#', img: null },
              ].map((ch) => (
                <a
                  key={ch.code}
                  href={ch.href}
                  className={`relative overflow-hidden reveal block group transition-colors duration-300 ${ch.img ? '' : 'bg-black hover:bg-[#040404]'}`}
                >
                  {ch.img && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ch.img}
                        alt="" aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover opacity-[0.13] mix-blend-luminosity grayscale group-hover:opacity-[0.22] transition-opacity duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/70" />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                    </>
                  )}
                  <div className="relative p-7">
                    <div className="sys-label opacity-40 mb-4">{ch.code}</div>
                    <div className="text-2xl mb-4 text-dim group-hover:text-accent transition-colors duration-300">{ch.icon}</div>
                    <div className="font-display font-semibold text-white text-lg mb-0.5 group-hover:text-accent transition-colors duration-300">{ch.label}</div>
                    <div className="font-mono text-[10px] text-dim mb-3 tracking-widest">{ch.sub}</div>
                    <div className="font-body text-base text-muted group-hover:text-white transition-colors duration-300">{ch.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

      </PageTransition>
    </ScrollProvider>
  )
}
