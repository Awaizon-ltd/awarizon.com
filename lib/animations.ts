// Animation timing functions
export const EASING = {
  spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
  ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
}

export const DURATION = {
  fast: 200,
  medium: 400,
  slow: 700,
  xslow: 1200,
}

// Staggered children delay
export function staggerDelay(index: number, base = 100): string {
  return `${index * base}ms`
}

// Terminal typing sequence
export async function typeText(
  element: HTMLElement,
  text: string,
  speed = 50
): Promise<void> {
  element.textContent = ''
  for (let i = 0; i < text.length; i++) {
    element.textContent += text[i]
    await new Promise(resolve => setTimeout(resolve, speed))
  }
}

// Sequence of terminal messages
export async function runBootSequence(
  lines: Array<{ text: string; delay: number; speed?: number }>,
  onLine: (index: number, text: string) => void
): Promise<void> {
  for (let i = 0; i < lines.length; i++) {
    await new Promise(resolve => setTimeout(resolve, lines[i].delay))
    onLine(i, lines[i].text)
  }
}

// Intersection Observer setup
export function createRevealObserver(): IntersectionObserver {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  )
}

// Number counter animation
export function animateCounter(
  element: HTMLElement,
  target: number,
  duration = 2000,
  suffix = ''
): void {
  const start = 0
  const startTime = performance.now()

  function update(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.round(start + (target - start) * eased)
    element.textContent = current.toLocaleString() + suffix

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

// Mouse parallax effect
export function applyParallax(
  element: HTMLElement,
  e: MouseEvent,
  strength = 0.02
): void {
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const deltaX = (e.clientX - centerX) * strength
  const deltaY = (e.clientY - centerY) * strength
  element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
}

// Generate SVG connection path between two points
export function connectionPath(
  x1: number, y1: number,
  x2: number, y2: number,
  curve = 0.4
): string {
  const cx1 = x1 + (x2 - x1) * curve
  const cy1 = y1
  const cx2 = x2 - (x2 - x1) * curve
  const cy2 = y2
  return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`
}
