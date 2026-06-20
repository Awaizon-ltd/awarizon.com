import { ImageResponse } from 'next/og'
import { OgCard } from '@/lib/og-card'

export const runtime = 'edge'
export const alt = 'Ecosystem Logic | Awarizon'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <OgCard
      tagline="Ecosystem Logic"
      title="Everything connected."
      description="Infrastructure, distribution, consumer products, and feedback loops — one coherent system for technology adoption across Nigeria and emerging markets."
    />,
    size,
  )
}
