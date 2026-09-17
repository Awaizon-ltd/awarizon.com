import { ImageResponse } from 'next/og'
import { OgCard } from '@/lib/og-card'

export const runtime = 'edge'
export const alt = 'Custom Solutions | Awarizon'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <OgCard
      tagline="Custom Solutions"
      title="When the SDK isn't enough, we build it with you."
      description="Custom smart contracts, bespoke wallet infrastructure, enterprise integration, and dedicated engineering support."
    />,
    size,
  )
}
