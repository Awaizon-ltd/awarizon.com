import { ImageResponse } from 'next/og'
import { OgCard } from '@/lib/og-card'

export const runtime = 'edge'
export const alt = 'SDK | Awarizon'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <OgCard
      tagline="Developer SDK"
      title="One SDK. Any chain. Any contract."
      description="EVM reads, writes, events, and typed codegen across 15+ chains — built for developers who move fast."
    />,
    size,
  )
}
