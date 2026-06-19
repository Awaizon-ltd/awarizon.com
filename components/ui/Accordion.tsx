'use client'

import { useState, type ReactNode } from 'react'

interface AccordionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border border-[#1A1A1A] hover:border-[#2A2A2A] transition-colors">
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-white text-base group-hover:text-accent transition-colors pr-4">
          {title}
        </span>
        <span
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-[#2A2A2A] group-hover:border-accent/40 transition-all"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <line x1="5" y1="0" x2="5" y2="10" stroke="#FFE500" strokeWidth="1.5" />
            <line x1="0" y1="5" x2="10" y2="5" stroke="#FFE500" strokeWidth="1.5" />
          </svg>
        </span>
      </button>

      <div
        style={{
          maxHeight: open ? '1200px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div className="px-6 pb-6 border-t border-[#1A1A1A]">
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </div>
  )
}
