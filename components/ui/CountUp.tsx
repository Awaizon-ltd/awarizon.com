'use client'

import { useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
}

export default function CountUp({ to, suffix = '', prefix = '', duration = 1500 }: Props) {
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView || !ref.current) return
    const el = ref.current
    const t0 = performance.now()
    function tick(now: number) {
      const p      = Math.min((now - t0) / duration, 1)
      const eased  = 1 - Math.pow(1 - p, 3)
      el.textContent = `${prefix}${Math.round(to * eased)}${suffix}`
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, suffix, prefix, duration])

  return <span ref={ref}>{`${prefix}0${suffix}`}</span>
}
