import { ImageResponse } from 'next/og'
import { OgCard } from '@/lib/og-card'

export const runtime = 'edge'
export const alt = 'Infrastructure Layer | Awarizon'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <OgCard
      tagline="Infrastructure Layer"
      title="Modular digital infrastructure built for West Africa."
      description="Wallet systems, payments engines, identity layers, APIs, and business automation — designed for how businesses in Nigeria actually operate."
    />,
    size,
  )
}
