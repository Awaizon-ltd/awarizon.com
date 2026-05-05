'use client'

import { useEffect, useRef } from 'react'

interface DataGridProps {
  density?: 'low' | 'medium' | 'high'
  animated?: boolean
  className?: string
}

export default function DataGrid({ density = 'medium', animated = true, className = '' }: DataGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const sizes = { low: 80, medium: 60, high: 40 }
  const gridSize = sizes[density]

  useEffect(() => {
    if (!animated) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrame: number
    let offset = 0

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function draw() {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 229, 0, 0.04)'
      ctx.lineWidth = 1

      const ox = offset % gridSize
      const oy = offset % gridSize

      for (let x = -gridSize + ox; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = -gridSize + oy; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Random data dots
      ctx.fillStyle = 'rgba(255, 229, 0, 0.15)'
      const time = Date.now() / 1000

      for (let gx = 0; gx < canvas.width; gx += gridSize) {
        for (let gy = 0; gy < canvas.height; gy += gridSize) {
          const wave = Math.sin(time + gx * 0.05 + gy * 0.05)
          if (wave > 0.85) {
            ctx.beginPath()
            ctx.arc(gx + ox, gy + oy, 1.5, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      if (animated) {
        offset += 0.15
        animFrame = requestAnimationFrame(draw)
      }
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrame)
    }
  }, [animated, gridSize])

  if (!animated) {
    return (
      <div
        className={`grid-bg-static ${className}`}
        aria-hidden="true"
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    />
  )
}
