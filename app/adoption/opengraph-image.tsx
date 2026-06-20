import { ImageResponse } from 'next/og'
import { OgCard } from '@/lib/og-card'

export const runtime = 'edge'
export const alt = 'Adoption Layer | Awarizon'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <OgCard
      tagline="Adoption Layer"
      title="Distribution as design."
      description="Awarizon ensures technology gets adopted, not just deployed — bridging digital infrastructure with real business usage across Nigeria and West Africa."
    />,
    size,
  )
}
