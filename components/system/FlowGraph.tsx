'use client'

import { useState } from 'react'
import { connectionPath } from '@/lib/animations'

interface FlowNode {
  id: string
  label: string
  icon: string
  desc: string
}

interface FlowGraphProps {
  nodes: FlowNode[]
  className?: string
}

export default function FlowGraph({ nodes, className = '' }: FlowGraphProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  const nodeWidth = 100 / (nodes.length)
  const centerY = 50

  return (
    <div className={`relative w-full ${className}`}>
      {/* SVG connection lines */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ height: '80px' }}
      >
        {nodes.slice(0, -1).map((node, i) => {
          const x1 = (i + 0.5) * nodeWidth
          const x2 = (i + 1.5) * nodeWidth
          const isActive = activeNode === node.id || activeNode === nodes[i + 1].id

          return (
            <g key={`connection-${i}`}>
              {/* Base line */}
              <line
                x1={`${x1}%`}
                y1="40"
                x2={`${x2}%`}
                y2="40"
                stroke={isActive ? '#FFE500' : '#222'}
                strokeWidth="0.5"
              />
              {/* Animated flow */}
              <line
                x1={`${x1}%`}
                y1="40"
                x2={`${x2}%`}
                y2="40"
                stroke="#FFE500"
                strokeWidth="0.5"
                strokeDasharray="4 8"
                opacity={isActive ? '0.8' : '0.3'}
                className="flow-line"
              />
              {/* Arrow */}
              <polygon
                points={`${x2}%,38 ${x2 - 2}%,41 ${x2 + 1}%,41`}
                fill={isActive ? '#FFE500' : '#333'}
              />
            </g>
          )
        })}
      </svg>

      {/* Nodes */}
      <div className="relative flex items-start justify-between gap-2" style={{ paddingTop: '20px' }}>
        {nodes.map((node, i) => {
          const isActive = activeNode === node.id
          return (
            <button
              key={node.id}
              className="flex-1 flex flex-col items-center gap-2 group"
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              onClick={() => setActiveNode(isActive ? null : node.id)}
            >
              {/* Icon node */}
              <div className={`
                relative w-12 h-12 flex items-center justify-center border transition-all duration-300
                ${isActive
                  ? 'border-accent bg-accent/10 shadow-[0_0_20px_rgba(255,229,0,0.3)]'
                  : 'border-[#333] bg-[#0A0A0A] group-hover:border-accent/50'
                }
              `}>
                <span className="text-lg">{node.icon}</span>
                {isActive && (
                  <span className="absolute inset-0 border border-accent/20 scale-125 animate-ping" style={{ animationDuration: '2s' }} />
                )}
                {/* Step number */}
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-dim">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Label */}
              <span className={`font-mono text-[10px] tracking-widest uppercase text-center transition-colors duration-200 ${
                isActive ? 'text-accent' : 'text-muted group-hover:text-white'
              }`}>
                {node.label}
              </span>

              {/* Description (expanded) */}
              {isActive && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-black border border-accent/20 p-3 text-left z-10 animate-slide-up">
                  <p className="text-xs text-muted leading-relaxed">{node.desc}</p>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
