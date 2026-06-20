import { ImageResponse } from 'next/og'
import { OgCard } from '@/lib/og-card'

export const runtime = 'edge'
export const alt = 'Emerging Markets Thesis | Awarizon'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <OgCard
      tagline="Our Thesis"
      title="The next major tech opportunity is adoption, not invention."
      description="Why Awarizon operates inside the adoption gap across Nigeria and West Africa's emerging digital economy."
    />,
    size,
  )
}
