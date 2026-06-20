import { ImageResponse } from 'next/og'
import { OgCard } from '@/lib/og-card'

export const runtime = 'edge'
export const alt = 'Access Layer | Awarizon'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <OgCard
      tagline="Access Layer"
      title="Enter the Awarizon system."
      description="Build with us, integrate digital infrastructure via API, or deploy consumer products like Zela to your market in Nigeria and West Africa."
    />,
    size,
  )
}
