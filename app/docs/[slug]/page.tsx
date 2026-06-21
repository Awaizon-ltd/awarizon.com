import { notFound } from 'next/navigation'
import Link from 'next/link'
import { DOCS, type DocItem } from '@/lib/docs'
import { CodeEditor, CodeTabs, ShellBlock } from '@/components/docs/CodeEditor'

// ─── Primitives ───────────────────────────────────────────────────────────────

function Sub({ children }: { children: React.ReactNode }) {
  return <p className="font-body text-muted text-[15px] leading-relaxed mb-3">{children}</p>
}

function PropRow({ name, type, req, desc }: { name: string; type: string; req?: boolean; desc: string }) {
  return (
    <div className="flex flex-wrap items-start gap-x-4 gap-y-1 px-4 py-3 border-b border-[#1A1A1A] last:border-0">
      <code className="font-mono text-[12px] w-32 flex-shrink-0" style={{ color: '#9CDCFE' }}>{name}</code>
      <code className="font-mono text-[11px] w-28 flex-shrink-0" style={{ color: '#4EC9B0' }}>{type}</code>
      {req && <span className="font-mono text-[8px] tracking-widest px-1.5 py-0.5 border border-accent/30 text-accent/80">REQ</span>}
      <span className="font-body text-[13px] text-muted flex-1 min-w-[160px]">{desc}</span>
    </div>
  )
}

function StepHeading({ id, n, title }: { id: string; n: string; title: string }) {
  return (
    <div id={id} className="flex items-center gap-3 mt-10 mb-3 scroll-mt-24">
      <span className="font-mono text-[9px] tracking-widest border border-accent/40 text-accent/80 px-1.5 py-0.5 flex-shrink-0">
        {n}
      </span>
      <h3 className="font-display font-semibold text-white text-base">{title}</h3>
    </div>
  )
}

function Callout({ icon, children, variant = 'info' }: {
  icon: string; children: React.ReactNode; variant?: 'tip' | 'warn' | 'info'
}) {
  const styles: Record<string, string> = {
    tip:  'border-accent/25 bg-accent/5',
    warn: 'border-orange-500/30 bg-orange-500/5',
    info: 'border-sky-500/25 bg-sky-500/5',
  }
  return (
    <div className={`border flex gap-3 px-4 py-3 my-4 ${styles[variant]}`}>
      <span className="text-sm flex-shrink-0 mt-0.5">{icon}</span>
      <p className="font-body text-[13px] text-muted leading-relaxed">{children}</p>
    </div>
  )
}

// ─── Inline markdown ──────────────────────────────────────────────────────────

function parseInline(md: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  const re = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g
  let last = 0
  let k = 0
  let m: RegExpExecArray | null

  while ((m = re.exec(md)) !== null) {
    if (m.index > last) parts.push(md.slice(last, m.index))
    if (m[1] !== undefined) {
      const external = m[2].startsWith('http')
      parts.push(external
        ? <a key={k++} href={m[2]} target="_blank" rel="noreferrer" className="text-accent hover:underline">{m[1]}</a>
        : <Link key={k++} href={m[2]} className="text-accent hover:underline">{m[1]}</Link>
      )
    } else if (m[3] !== undefined) {
      parts.push(<code key={k++} className="font-mono text-[12px] bg-[#1A1A1A] px-1 text-accent/80 rounded-sm">{m[3]}</code>)
    } else if (m[4] !== undefined) {
      parts.push(<strong key={k++} className="text-white font-semibold">{m[4]}</strong>)
    }
    last = m.index + m[0].length
  }
  if (last < md.length) parts.push(md.slice(last))
  return parts.length === 1 ? parts[0] : <>{parts}</>
}

// ─── Track styles ─────────────────────────────────────────────────────────────

const TRACK_STYLES: Record<string, string> = {
  A: 'border-l-accent/60 bg-accent/[0.03]',
  B: 'border-l-sky-500/50 bg-sky-500/[0.03]',
  C: 'border-l-purple-500/50 bg-purple-500/[0.03]',
}
const TRACK_BADGE: Record<string, string> = {
  A: 'border-accent/40 text-accent/80',
  B: 'border-sky-500/40 text-sky-400',
  C: 'border-purple-400/40 text-purple-400',
}

// ─── Block renderer ───────────────────────────────────────────────────────────

function renderItem(item: DocItem, idx: number) {
  switch (item.type) {

    case 'text':
      return <Sub key={idx}>{parseInline(item.md)}</Sub>

    case 'h3':
      return (
        <h3
          key={idx}
          id={item.id}
          className="font-display font-semibold text-white text-[1.05rem] mt-10 mb-3 scroll-mt-24"
        >
          {item.title}
        </h3>
      )

    case 'step':
      return <StepHeading key={idx} id={item.id} n={item.n} title={item.title} />

    case 'label':
      return (
        <p key={idx} className="font-mono text-[10px] text-dim/70 tracking-widest mt-5 mb-1 uppercase">
          {item.text}
        </p>
      )

    case 'code':
      return <CodeEditor key={idx} code={item.code} lang={item.lang} filename={item.filename} />

    case 'code-tabs':
      return <CodeTabs key={idx} ts={item.ts} js={item.js} filename={item.filename} />

    case 'shell':
      return <ShellBlock key={idx} command={item.cmd} label={item.label} />

    case 'callout':
      return (
        <Callout key={idx} icon={item.icon} variant={item.variant}>
          {parseInline(item.md)}
        </Callout>
      )

    case 'props':
      return (
        <div key={idx} className="border border-[#1E1E1E] my-5 bg-[#080808]">
          {item.header && (
            <div className="px-4 py-2 border-b border-[#1E1E1E]">
              <span className="font-mono text-[9px] tracking-[0.2em] text-dim/60 uppercase">{item.header}</span>
            </div>
          )}
          {item.rows.map((row, i) => (
            <PropRow key={i} name={row.name} type={row.type} req={row.req} desc={row.desc} />
          ))}
        </div>
      )

    case 'grid': {
      const cols = item.cols ?? 2
      const gridClass = cols === 3 ? 'grid-cols-2 sm:grid-cols-3' : cols === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'
      return (
        <div key={idx} className={`grid ${gridClass} gap-2 my-4`}>
          {item.items.map((it, i) => (
            <div key={i} className="border border-[#1E1E1E] bg-[#080808] px-3 py-2.5">
              <code className="font-mono text-[11px] text-white block">{it.label}</code>
              {it.sub && <span className="font-body text-[11px] text-dim block mt-0.5">{it.sub}</span>}
              {it.tag && <span className="font-mono text-[9px] tracking-widest text-accent/60 block mt-1 uppercase">{it.tag}</span>}
            </div>
          ))}
        </div>
      )
    }

    case 'pkg-grid':
      return (
        <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-5">
          {item.items.map((pkg, i) => (
            <div key={i} className="border border-[#1E1E1E] bg-[#080808] px-4 py-3">
              <code className="font-mono text-[12px] text-accent block mb-1">{pkg.pkg}</code>
              <span className="font-body text-[13px] text-dim">{pkg.desc}</span>
            </div>
          ))}
        </div>
      )

    case 'chain-grid':
      return (
        <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 my-5">
          {item.items.map((chain, i) => (
            <div key={i} className="border border-[#1E1E1E] bg-[#080808] px-3 py-2.5">
              <code className="font-mono text-[11px] text-accent block">{chain.id}</code>
              <span className="font-body text-[12px] text-white block mt-0.5">{chain.name}</span>
              <span className="font-mono text-[9px] tracking-widest text-dim/70 uppercase">{chain.tag}</span>
            </div>
          ))}
        </div>
      )

    case 'track': {
      const box   = TRACK_STYLES[item.track] ?? 'border-l-[#444] bg-[#0A0A0A]'
      const badge = TRACK_BADGE[item.track]   ?? 'border-[#444] text-dim'
      return (
        <div key={idx} className={`border-l-2 border border-[#1E1E1E] px-4 pt-3 pb-1 my-4 ${box}`}>
          <div className="flex items-center gap-3 mb-2">
            <span className={`font-mono text-[9px] tracking-widest border px-1.5 py-0.5 flex-shrink-0 ${badge}`}>
              TRACK {item.track}
            </span>
            <span className="font-mono text-[10px] text-dim/70">{item.trackDesc}</span>
          </div>
          {item.items.map((inner, i) => {
            if (inner.type === 'text')  return <Sub key={i}>{parseInline((inner as unknown as { md: string }).md)}</Sub>
            if (inner.type === 'shell') return <ShellBlock key={i} command={(inner as unknown as { cmd: string }).cmd} label={(inner as unknown as { label?: string }).label} />
            if (inner.type === 'code')  return <CodeEditor key={i} code={(inner as unknown as { code: string }).code} filename={(inner as unknown as { filename?: string }).filename} />
            return null
          })}
        </div>
      )
    }

    default:
      return null
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

// Pre-generate all slugs at build time
export async function generateStaticParams() {
  return DOCS.map(section => ({ slug: section.id }))
}

export default async function DocsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const section = DOCS.find(s => s.id === slug)
  if (!section) notFound()

  const idx  = DOCS.findIndex(s => s.id === slug)
  const prev = idx > 0 ? DOCS[idx - 1] : null
  const next = idx < DOCS.length - 1 ? DOCS[idx + 1] : null

  const isOverview = slug === 'overview'

  return (
    <div className="font-body text-muted max-w-3xl">

      {/* Page header */}
      {isOverview ? (
        <div className="mb-10">
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent/70 block mb-4">
            @AWARIZON // SDK REFERENCE
          </span>
          <h1
            className="font-display font-extrabold text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', lineHeight: 1.1 }}
          >
            Awarizon SDK
          </h1>
        </div>
      ) : (
        <div className="mb-8">
          <h1
            className="font-display font-bold text-white mb-3"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.15 }}
          >
            {section.title}
          </h1>
          <div className="w-8 h-0.5 bg-accent" />
        </div>
      )}

      {/* Section content */}
      <div>
        {section.items.map((item, i) => renderItem(item, i))}
      </div>

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between mt-16 pt-6 border-t border-[#1E1E1E]">
        {prev ? (
          <Link
            href={`/docs/${prev.id}`}
            className="group flex items-center gap-2 text-dim hover:text-white transition-colors"
          >
            <span className="font-mono text-[12px] group-hover:-translate-x-0.5 transition-transform">←</span>
            <div>
              <p className="font-mono text-[9px] tracking-widest text-dim/50 uppercase mb-0.5">Previous</p>
              <p className="font-body text-[13px]">{prev.title}</p>
            </div>
          </Link>
        ) : <span />}

        {next ? (
          <Link
            href={`/docs/${next.id}`}
            className="group flex items-center gap-2 text-dim hover:text-white transition-colors text-right"
          >
            <div>
              <p className="font-mono text-[9px] tracking-widest text-dim/50 uppercase mb-0.5">Next</p>
              <p className="font-body text-[13px]">{next.title}</p>
            </div>
            <span className="font-mono text-[12px] group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        ) : <span />}
      </div>

    </div>
  )
}
