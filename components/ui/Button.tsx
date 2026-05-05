import { ReactNode } from 'react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'system'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  size = 'md',
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const variantClasses = {
    primary: `
      bg-accent text-black font-mono font-medium tracking-widest uppercase
      hover:bg-white transition-colors duration-200
      disabled:opacity-40 disabled:cursor-not-allowed
    `,
    secondary: `
      bg-transparent border border-accent text-accent font-mono tracking-widest uppercase
      hover:bg-accent hover:text-black transition-all duration-200
      disabled:opacity-40 disabled:cursor-not-allowed
    `,
    ghost: `
      bg-transparent border border-[#333] text-white font-mono tracking-widest uppercase
      hover:border-accent hover:text-accent transition-all duration-200
      disabled:opacity-40 disabled:cursor-not-allowed
    `,
    system: `
      bg-[#111] border border-[#222] text-accent font-mono tracking-widest uppercase text-xs
      hover:border-accent hover:bg-accent/5 transition-all duration-200
      disabled:opacity-40 disabled:cursor-not-allowed
    `,
  }

  const classes = `
    inline-flex items-center gap-2
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim()

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  )
}
