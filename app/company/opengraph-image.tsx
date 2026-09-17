import { ImageResponse } from 'next/og'
import { OgCard } from '@/lib/og-card'

export const runtime = 'edge'
export const alt = 'Company | Awarizon'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <OgCard
      tagline="Company"
      title="We build the infrastructure on-chain products run on."
      description="Awarizon is a global web3 infrastructure company founded in 2023 — wallets, payments, identity, and developer tooling as one coherent system."
    />,
    size,
  )
}
