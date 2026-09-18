'use client'

// Full-bleed section background image whose scale is driven by scroll
// position instead of a fixed CSS animation — place inside a `relative
// overflow-hidden` section, alongside a gradient overlay for text contrast.

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, animate } from 'framer-motion'

interface Props {
  src: string
  alt?: string
  /** 'in' grows the image as the section scrolls through view (and shrinks it scrolling back up). 'out' is the reverse. */
  direction?: 'in' | 'out'
  scaleFrom?: number
  scaleTo?: number
  className?: string
  /** 'contain' (default) fits the whole image inside the box, centered, never cropped. 'cover' fills the box edge-to-edge, cropping as needed. */
  fit?: 'cover' | 'contain'
  /** Adds a slow, continuous 360° spin on top of the scroll-driven scale, for subjects (wireframes, isometric shapes) that read well rotating in place. */
  spin?: boolean
  spinDuration?: number
}

export default function ScrollZoomImage({
  src,
  alt = '',
  direction = 'in',
  scaleFrom = 1,
  scaleTo = 1.1,
  className = '',
  fit = 'contain',
  spin = false,
  spinDuration = 40,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const range = direction === 'in' ? [scaleFrom, scaleTo] : [scaleTo, scaleFrom]
  const scale = useTransform(scrollYProgress, [0, 1], range)
  const rotate = useMotionValue(0)

  useEffect(() => {
    if (!spin || reduceMotion) return
    const controls = animate(rotate, 360, { duration: spinDuration, repeat: Infinity, ease: 'linear' })
    return () => controls.stop()
  }, [spin, spinDuration, reduceMotion, rotate])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={src}
        alt={alt}
        style={reduceMotion ? undefined : spin ? { scale, rotate } : { scale }}
        className={`w-full h-full object-${fit} ${className}`}
      />
    </div>
  )
}
