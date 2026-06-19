import { notFound } from 'next/navigation'
import Link from 'next/link'
import PageTransition from '@/components/motion/PageTransition'
import ScrollProvider from '@/components/motion/ScrollProvider'
import Accordion from '@/components/ui/Accordion'
import LearnIllustration from '@/components/learn/LearnIllustration'
import { getArticle, getRelatedArticles, type ContentBlock } from '@/lib/learn-content'

interface Props { params: { slug: string } }

export default function LearnArticlePage({ params }: Props) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  const related = getRelatedArticles(article.relatedSlugs)

  return (
    <ScrollProvider>
      <PageTransition>

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-black border-b border-[#0D0D0D]">
          <div className="absolute inset-0 grid-bg-static opacity-15" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,rgba(255,229,0,0.05),transparent)]" />

          <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-16 max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-10 font-mono text-[10px] text-dim">
              <Link href="/learn" className="hover:text-accent transition-colors tracking-widest">
                WEB3 ACADEMY
              </Link>
              <span className="text-[#1A1A1A]">/</span>
              <span className="text-accent/60 tracking-widest">{article.category}</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div className="reveal">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[9px] px-2 py-1 border border-[#1A1A1A] text-dim tracking-widest">
                    {article.category}
                  </span>
                  <span className="font-mono text-[9px] text-dim">{article.readTime}</span>
                </div>
                <h1 className="font-display font-extrabold leading-[0.95] mb-4 text-white"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}>
                  {article.title}
                </h1>
                <p className="font-body text-lg text-muted leading-relaxed mb-6">
                  {article.subtitle}
                </p>
                <p className="font-body text-base text-muted/70 leading-relaxed border-l-2 border-accent/30 pl-4">
                  {article.intro}
                </p>
              </div>

              {/* Illustration */}
              <div className="flex justify-center reveal">
                <LearnIllustration slug={article.slug} size={280} />
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTENT ──────────────────────────────────────── */}
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
          <section className="py-16 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D] bg-[#030303]">
            <div className="max-w-3xl mx-auto">
              <span className="sys-label opacity-40 block mb-8">KEY TERMS GLOSSARY</span>
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

        {/* ── RELATED ARTICLES ─────────────────────────────── */}
        {related.length > 0 && (
          <section className="py-16 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
            <div className="max-w-3xl mx-auto">
              <span className="sys-label opacity-40 block mb-8">READ NEXT</span>
              <div className="grid sm:grid-cols-3 gap-3">
                {related.map(rel => (
                  <Link
                    key={rel.slug}
                    href={`/learn/${rel.slug}`}
                    className="group p-4 border border-[#111] hover:border-accent/25 transition-all"
                  >
                    <div className="mb-3 opacity-70 group-hover:opacity-100 transition-opacity">
                      <LearnIllustration slug={rel.slug} size={80} />
                    </div>
                    <div className="font-mono text-[9px] text-dim mb-1 tracking-widest">{rel.category}</div>
                    <h3 className="font-display font-semibold text-sm text-white group-hover:text-accent transition-colors leading-tight">
                      {rel.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── BACK LINK ─────────────────────────────────────── */}
        <section className="py-10 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <Link href="/learn" className="font-mono text-[10px] text-dim hover:text-accent transition-colors tracking-widest flex items-center gap-2">
              ← BACK TO WEB3 ACADEMY
            </Link>
            <Link href="/access" className="font-mono text-[10px] text-accent tracking-widest hover:text-white transition-colors">
              GET STARTED WITH AWARIZON →
            </Link>
          </div>
        </section>

      </PageTransition>
    </ScrollProvider>
  )
}

// ─── Block renderer ─────────────────────────────────────────────────────────
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
      tip:  { border: 'border-accent/30',     bg: 'bg-accent/5',       title: 'text-accent',      icon: '💡' },
      warn: { border: 'border-red-500/30',    bg: 'bg-red-500/5',     title: 'text-red-400',     icon: '⚠' },
      info: { border: 'border-sky-400/30',    bg: 'bg-sky-400/5',     title: 'text-sky-400',     icon: 'ℹ' },
    }
    const c = colors[block.variant]
    return (
      <div className={`p-4 border-l-2 ${c.border} ${c.bg}`}>
        <div className={`font-mono text-xs ${c.title} mb-2 flex items-center gap-2`}>
          <span>{c.icon}</span>
          {block.title}
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
