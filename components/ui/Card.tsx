import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'system' | 'node' | 'highlight'
  glowOnHover?: boolean
  onClick?: () => void
}

export default function Card({
  children,
  className = '',
  variant = 'default',
  glowOnHover = false,
  onClick,
}: CardProps) {
  const variantClasses = {
    default: 'bg-[#0A0A0A] border border-[#1F1F1F]',
    system: 'bg-[#0D0D0D] border border-[#222] font-mono',
    node: 'bg-black border border-[#1F1F1F] relative overflow-hidden',
    highlight: 'bg-[#0A0A0A] border border-accent/30',
  }

  const hoverClasses = glowOnHover
    ? 'hover:border-accent/50 hover:shadow-[0_0_30px_rgba(255,229,0,0.08)] transition-all duration-300 cursor-pointer'
    : ''

  return (
    <div
      className={`${variantClasses[variant]} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {variant === 'node' && (
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      )}
      {children}
    </div>
  )
}

// System Card with header
interface SystemCardProps {
  code: string
  label: string
  children: ReactNode
  status?: string
  className?: string
}

export function SystemCard({ code, label, children, status = 'ACTIVE', className = '' }: SystemCardProps) {
  return (
    <div className={`bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333] transition-colors duration-300 ${className}`}>
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1A1A1A]">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest text-accent">{code}</span>
        </div>
        <span className="font-mono text-[10px] text-[#444] tracking-widest">{status}</span>
      </div>
      {/* Card label */}
      <div className="px-4 py-3 border-b border-[#111]">
        <h3 className="font-display font-semibold text-white text-sm">{label}</h3>
      </div>
      {/* Card body */}
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}
