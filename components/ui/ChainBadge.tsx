'use client'

import Image from 'next/image'
import { getChainLogo } from '@/lib/chainLogos'

interface Props {
  name: string
  size?: 'xs' | 'sm' | 'md'
  showLabel?: boolean
  className?: string
}

const dims  = { xs: 16, sm: 22, md: 30 }
const fonts = { xs: 'text-[8px]', sm: 'text-[10px]', md: 'text-[11px]' }

export default function ChainBadge({ name, size = 'sm', showLabel = true, className = '' }: Props) {
  const logo = getChainLogo(name)
  const d    = dims[size]

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div
        className="rounded-full bg-[#0D0D0D] border border-[#222] flex items-center justify-center overflow-hidden shrink-0"
        style={{ width: d, height: d }}
      >
        {logo ? (
          <Image
            src={logo}
            alt={name}
            width={d - 6}
            height={d - 6}
            className="object-contain"
          />
        ) : (
          <span className="font-mono text-[7px] text-accent/50 font-bold leading-none select-none">
            {name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {showLabel && (
        <span className={`font-mono ${fonts[size]} text-dim`}>{name}</span>
      )}
    </div>
  )
}
