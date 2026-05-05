'use client'

import { useEffect, ReactNode, useRef } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.add('page-enter')
    }
  }, [])

  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  )
}
