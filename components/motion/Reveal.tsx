'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  y?: number
  x?: number
  scale?: number
  className?: string
  once?: boolean
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  className = '',
  once = true,
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, scale: scale === 1 ? 1 : scale * 0.95 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.75, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

/* Stagger container — use with RevealItem children */
export function RevealGroup({
  children,
  stagger = 0.1,
  className = '',
}: {
  children: ReactNode
  stagger?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

/* Item inside RevealGroup */
export function RevealItem({
  children,
  className = '',
  y = 24,
}: {
  children: ReactNode
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
      }}
    >
      {children}
    </motion.div>
  )
}
