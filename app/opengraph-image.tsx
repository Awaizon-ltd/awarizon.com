import { ImageResponse } from 'next/og'
import { OgCard } from '@/lib/og-card'

export const runtime = 'edge'
export const alt = 'Awarizon — EVM SDK for Web3 Developers'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <OgCard
      tagline="EVM SDK for Web3 Developers"
      title="Build Production Web3 Apps on Any Chain"
      description="Typed React hooks, built-in wallet, SIWE auth, React Native support — one API key, zero blockchain boilerplate."
    />,
    size,
  )
}
