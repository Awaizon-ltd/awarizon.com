import { ImageResponse } from 'next/og'
import { OgCard } from '@/lib/og-card'

export const runtime = 'edge'
export const alt = 'Awarizon — Technology Development & Distribution'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <OgCard
      tagline="Technology Company"
      title="Technology Development & Distribution"
      description="Building the bridge between businesses, technology, and everyday users across Nigeria and West Africa."
    />,
    size,
  )
}
