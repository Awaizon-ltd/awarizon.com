import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'SDK — Awarizon',
  description: 'One SDK. Any chain. Any contract. The EVM developer SDK for reads, writes, events, and typed codegen across 15+ chains.',
}

export default function SDKLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
