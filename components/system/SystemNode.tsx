'use client'

import { useState } from 'react'

export interface NodeData {
  id: string
  label: string
  code: string
  description: string
  tags: string[]
  x: number
  y: number
  color?: string
}

interface SystemNodeProps {
  node: NodeData
  size?: number
  className?: string
}

export default function SystemNode({ node, size = 48, className = '' }: SystemNodeProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {/* Node button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="group relative flex items-center justify-center rounded-full border border-accent/30 bg-black hover:border-accent hover:bg-accent/5 transition-all duration-300"
        style={{ width: size, height: size }}
        aria-expanded={expanded}
        aria-label={node.label}
      >
        {/* Inner dot */}
        <span className="w-2 h-2 rounded-full bg-accent group-hover:scale-125 transition-transform duration-300 animate-pulse-slow" />

        {/* Ring animations */}
        <span className="absolute inset-0 rounded-full border border-accent/20 animate-ping" style={{ animationDuration: '3s' }} />

        {/* Code label */}
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[9px] text-accent/60 tracking-widest whitespace-nowrap">
          {node.code}
        </span>
      </button>

      {/* Node label */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
        <span className="font-display font-semibold text-xs text-white/80">{node.label}</span>
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div className="absolute z-20 top-full mt-8 left-1/2 -translate-x-1/2 w-64 bg-black border border-accent/30 shadow-[0_0_40px_rgba(255,229,0,0.1)] p-4 animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="sys-label">{node.code}</span>
            <button onClick={() => setExpanded(false)} className="text-dim hover:text-white text-xs font-mono">✕</button>
          </div>

          {/* Content */}
          <h3 className="font-display font-semibold text-white mb-2">{node.label}</h3>
          <p className="text-muted text-xs leading-relaxed mb-3 font-body">{node.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {node.tags.map(tag => (
              <span key={tag} className="font-mono text-[10px] px-2 py-0.5 bg-accent/10 text-accent border border-accent/20">
                {tag}
              </span>
            ))}
          </div>

          {/* Corner decoration */}
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent/40" />
        </div>
      )}
    </div>
  )
}
