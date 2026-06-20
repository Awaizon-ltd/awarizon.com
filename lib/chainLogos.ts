import type { StaticImageData } from 'next/image'

// ── Direct static imports — build-time validated, no URL strings ──────────────
import ethLogo   from '@/public/eth.png'
import arbLogo   from '@/public/arb.png'
import baseLogo  from '@/public/base.png'
import bnbLogo   from '@/public/bnb.png'
import avaxLogo  from '@/public/avax.png'
import polLogo   from '@/public/pol.png'
import opLogo    from '@/public/optimism-op-logo.png'
import beraLogo  from '@/public/berachain-bera-logo.png'
import monadLogo from '@/public/monad-mon-logo.png'
import sonicLogo from '@/public/sonic-s-logo.png'
import zetaLogo  from '@/public/zetachain-zeta-logo.png'
import hypeLogo  from '@/public/hyperliquid-hype-logo.png'
import roninLogo from '@/public/ronin-ron-logo.png'
import apeLogo   from '@/public/apecoin-ape-logo.png'
import somniaLogo from '@/public/somnia-somi-logo.png'

// ── Lookup map: any chain name/id → StaticImageData ──────────────────────────
export const CHAIN_LOGO_MAP: Record<string, StaticImageData> = {
  ethereum:    ethLogo,
  eth:         ethLogo,
  arbitrum:    arbLogo,
  arb:         arbLogo,
  base:        baseLogo,
  bnb:         bnbLogo,
  'bnb chain': bnbLogo,
  avalanche:   avaxLogo,
  avax:        avaxLogo,
  polygon:     polLogo,
  pol:         polLogo,
  matic:       polLogo,
  optimism:    opLogo,
  op:          opLogo,
  berachain:   beraLogo,
  bera:        beraLogo,
  monad:       monadLogo,
  sonic:       sonicLogo,
  zetachain:   zetaLogo,
  zeta:        zetaLogo,
  hyperliquid: hypeLogo,
  hype:        hypeLogo,
  ronin:       roninLogo,
  apecoin:     apeLogo,
  ape:         apeLogo,
  somnia:      somniaLogo,
}

export function getChainLogo(name: string): StaticImageData | null {
  return CHAIN_LOGO_MAP[name.toLowerCase().trim()] ?? null
}

// ── Ordered list for display rows (shift page, etc.) ─────────────────────────
export const ALL_CHAINS: Array<{ name: string; logo: StaticImageData }> = [
  { name: 'Ethereum',    logo: ethLogo    },
  { name: 'Arbitrum',   logo: arbLogo    },
  { name: 'Base',        logo: baseLogo   },
  { name: 'BNB Chain',  logo: bnbLogo    },
  { name: 'Avalanche',  logo: avaxLogo   },
  { name: 'Polygon',    logo: polLogo    },
  { name: 'Optimism',   logo: opLogo     },
  { name: 'Berachain',  logo: beraLogo   },
  { name: 'Monad',      logo: monadLogo  },
  { name: 'Sonic',      logo: sonicLogo  },
  { name: 'ZetaChain',  logo: zetaLogo   },
  { name: 'Hyperliquid',logo: hypeLogo   },
  { name: 'Ronin',      logo: roninLogo  },
  { name: 'ApeCoin',    logo: apeLogo    },
  { name: 'Somnia',     logo: somniaLogo },
]
