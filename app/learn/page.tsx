import Link from 'next/link'
import PageTransition from '@/components/motion/PageTransition'
import ScrollProvider from '@/components/motion/ScrollProvider'
import Accordion from '@/components/ui/Accordion'
import LearnIllustration from '@/components/learn/LearnIllustration'
import { getArticle, LEARN_ARTICLES, type ContentBlock } from '@/lib/learn-content'

// The learn hub IS the "What is Awarizon?" article
const article = getArticle('what-is-awarizon')!
const otherArticles = LEARN_ARTICLES.filter(a => a.slug !== 'what-is-awarizon')

function BlockRenderer({ block }: { block: ContentBlock }) {
  if (block.t === 'p') {
    return <p className="font-body text-base text-muted leading-relaxed">{block.c}</p>
  }
  if (block.t === 'ul') {
    return (
      <ul className="space-y-2">
        {block.c.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-accent/50 font-mono text-xs mt-1 flex-shrink-0">◆</span>
            <span className="font-body text-sm text-muted leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    )
  }
  if (block.t === 'ol') {
    return (
      <ol className="space-y-2">
        {block.c.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-accent/60 font-mono text-xs mt-1 flex-shrink-0 min-w-[20px]">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-body text-sm text-muted leading-relaxed">{item}</span>
          </li>
        ))}
      </ol>
    )
  }
  if (block.t === 'callout') {
    const colors = {
      tip:  { border: 'border-accent/30',  bg: 'bg-accent/5',   title: 'text-accent',   icon: '💡' },
      warn: { border: 'border-red-500/30', bg: 'bg-red-500/5',  title: 'text-red-400',  icon: '⚠' },
      info: { border: 'border-sky-400/30', bg: 'bg-sky-400/5',  title: 'text-sky-400',  icon: 'ℹ' },
    }
    const c = colors[block.variant]
    return (
      <div className={`p-4 border-l-2 ${c.border} ${c.bg}`}>
        <div className={`font-mono text-xs ${c.title} mb-2 flex items-center gap-2`}>
          <span>{c.icon}</span>{block.title}
        </div>
        <p className="font-body text-sm text-muted leading-relaxed">{block.c}</p>
      </div>
    )
  }
  if (block.t === 'compare') {
    return (
      <div className="grid sm:grid-cols-2 gap-3">
        {[block.left, block.right].map(({ label, items }) => (
          <div key={label} className="p-4 border border-[#111] bg-[#030303]">
            <div className="font-mono text-[10px] text-accent/60 tracking-widest mb-3">{label}</div>
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent/30 font-mono text-xs mt-0.5 flex-shrink-0">–</span>
                  <span className="font-body text-xs text-muted leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function LearnPage() {
  return (
    <ScrollProvider>
      <PageTransition>

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-black border-b border-[#0D0D0D]">
          <div className="absolute inset-0 grid-bg-static opacity-15" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,rgba(255,229,0,0.06),transparent)]" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-1 h-6 bg-accent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-accent">LAYER_08 // LEARN_LAYER</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="reveal">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[9px] px-2 py-1 border border-[#1A1A1A] text-dim tracking-widest">
                    {article.category}
                  </span>
                  <span className="font-mono text-[9px] text-dim">{article.readTime}</span>
                </div>
                <h1 className="font-display font-extrabold leading-[0.95] mb-4 text-white"
                  style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)' }}>
                  {article.title}
                </h1>
                <p className="font-body text-lg text-muted leading-relaxed mb-6">
                  {article.subtitle}
                </p>
                <p className="font-body text-base text-muted/70 leading-relaxed border-l-2 border-accent/30 pl-4">
                  {article.intro}
                </p>
              </div>
              <div className="flex justify-center reveal">
                <LearnIllustration slug="what-is-awarizon" size={300} />
              </div>
            </div>
          </div>
        </section>

        {/* ── ARTICLE CONTENT ──────────────────────────────── */}
        <section className="py-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            {article.sections.map((section, i) => (
              section.accordion ? (
                <div key={section.id} className="mb-3">
                  <Accordion title={section.title} defaultOpen={i === 0}>
                    <div className="space-y-4">
                      {section.blocks.map((block, j) => (
                        <BlockRenderer key={j} block={block} />
                      ))}
                    </div>
                  </Accordion>
                </div>
              ) : (
                <div key={section.id} className="mb-12">
                  <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-6 leading-tight">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.blocks.map((block, j) => (
                      <BlockRenderer key={j} block={block} />
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </section>

        {/* ── KEY TERMS ────────────────────────────────────── */}
        {article.keyTerms.length > 0 && (
          <section className="py-12 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D] bg-[#030303]">
            <div className="max-w-3xl mx-auto">
              <span className="sys-label opacity-40 block mb-6">KEY TERMS</span>
              <div className="grid sm:grid-cols-2 gap-3">
                {article.keyTerms.map(({ term, def }) => (
                  <div key={term} className="p-4 border border-[#111] hover:border-[#1A1A1A] transition-colors">
                    <div className="font-mono text-xs text-accent mb-1">{term}</div>
                    <p className="font-body text-sm text-muted leading-relaxed">{def}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CONTINUE LEARNING ────────────────────────────── */}
        <section className="py-16 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <span className="sys-label opacity-40">CONTINUE LEARNING</span>
              <div className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0D0D0D]">
              {otherArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/learn/${a.slug}`}
                  className="group bg-black hover:bg-[#030303] p-6 flex gap-5 items-start transition-all border border-transparent hover:border-[#111]"
                >
                  <div className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                    <LearnIllustration slug={a.slug} size={72} />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[8px] text-dim tracking-widest block mb-1">{a.category}</span>
                    <h3 className="font-display font-semibold text-white text-sm leading-tight group-hover:text-accent transition-colors mb-1">
                      {a.title}
                    </h3>
                    <p className="font-body text-xs text-muted leading-relaxed line-clamp-2">{a.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-16 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          <div className="max-w-2xl reveal">
            <span className="sys-label opacity-40 block mb-4">READY TO BUILD?</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4 leading-tight">
              Understanding Web3 is step one.
            </h2>
            <p className="font-body text-muted mb-6 leading-relaxed">
              Awarizon gives developers the APIs and businesses the infrastructure to go from reading about blockchain to building on it.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/access" className="font-mono text-xs tracking-widest px-6 py-3 bg-accent text-black hover:bg-white transition-colors">
                GET ACCESS →
              </Link>
              <Link href="/infrastructure" className="font-mono text-xs tracking-widest px-6 py-3 border border-[#2A2A2A] text-muted hover:border-accent/40 hover:text-white transition-colors">
                VIEW INFRASTRUCTURE
              </Link>
            </div>
          </div>
        </section>

      </PageTransition>
    </ScrollProvider>
  )
}
