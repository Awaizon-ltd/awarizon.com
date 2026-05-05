'use client'

import { useEffect, ReactNode } from 'react'
import { createRevealObserver } from '@/lib/animations'

interface ScrollProviderProps {
  children: ReactNode
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
  useEffect(() => {
    const observer = createRevealObserver()
    
    const elements = document.querySelectorAll('.reveal')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return <>{children}</>
}
