'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; alpha: number
}

interface Props {
  count?: number
  maxDist?: number
  speed?: number
  opacity?: number
  className?: string
}

export default function ParticleNetwork({
  count = 55,
  maxDist = 130,
  speed = 0.32,
  opacity = 0.6,
  className = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, raf = 0
    const mouse = { x: -9999, y: -9999 }
    const particles: Particle[] = []

    function resize() {
      w = canvas!.offsetWidth
      h = canvas!.offsetHeight
      canvas!.width = w * devicePixelRatio
      canvas!.height = h * devicePixelRatio
      ctx!.scale(devicePixelRatio, devicePixelRatio)
    }

    function init() {
      particles.length = 0
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const s = speed * (0.5 + Math.random() * 0.5)
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * s,
          vy: Math.sin(angle) * s,
          size: 0.8 + Math.random() * 1.4,
          alpha: 0.18 + Math.random() * 0.45,
        })
      }
    }

    function tick() {
      ctx!.clearRect(0, 0, w, h)

      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 14400) {
          const d = Math.sqrt(d2)
          const f = (120 - d) / 120 * 0.55
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }

        // Gentle drift toward center (keeps particles from escaping)
        p.vx += (w / 2 - p.x) * 0.00008
        p.vy += (h / 2 - p.y) * 0.00008

        // Dampen
        p.vx *= 0.982
        p.vy *= 0.982

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > 1.8) {
          p.vx = (p.vx / spd) * 1.8
          p.vy = (p.vy / spd) * 1.8
        }

        p.x += p.vx
        p.y += p.vy

        // Soft bounce
        if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx) }
        else if (p.x > w) { p.x = w; p.vx = -Math.abs(p.vx) }
        if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy) }
        else if (p.y > h) { p.y = h; p.vy = -Math.abs(p.vy) }
      }

      // Draw connections
      ctx!.lineWidth = 0.6
      for (let i = 0; i < particles.length - 1; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.13
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.strokeStyle = `rgba(255,229,0,${alpha})`
            ctx!.stroke()
          }
        }
      }

      // Draw dots
      for (const p of particles) {
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, 6.283)
        ctx!.fillStyle = `rgba(255,229,0,${p.alpha})`
        ctx!.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    function onMouse(e: MouseEvent) {
      const r = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    function onLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }
    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else {
        raf = requestAnimationFrame(tick)
      }
    }

    const ro = new ResizeObserver(() => {
      resize()
      init()
    })

    resize()
    init()
    raf = requestAnimationFrame(tick)
    ro.observe(canvas)
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [count, maxDist, speed])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
    />
  )
}
