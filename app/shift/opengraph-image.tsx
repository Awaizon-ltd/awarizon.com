import { ImageResponse } from 'next/og'
import { OgCard } from '@/lib/og-card'

export const runtime = 'edge'
export const alt = 'The Shift | Awarizon'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <OgCard
      tagline="The Shift"
      title="Technology exists everywhere. Adoption does not."
      description="Awarizon bridges the gap between what digital systems promise and what businesses actually experience across Nigeria and West Africa."
    />,
    size,
  )
}
