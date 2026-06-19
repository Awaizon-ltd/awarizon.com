interface Props { slug: string; size?: number }

export default function LearnIllustration({ slug, size = 260 }: Props) {
  switch (slug) {
    case 'what-is-awarizon':      return <AwarizonIllustration size={size} />
    case 'what-is-blockchain':    return <BlockchainIllustration size={size} />
    case 'what-is-crypto':        return <CryptoIllustration size={size} />
    case 'what-is-defi':          return <DefiIllustration size={size} />
    case 'what-are-nfts':         return <NftIllustration size={size} />
    case 'what-are-rwa':          return <RwaIllustration size={size} />
    case 'custodial-vs-noncustodial': return <WalletCompareIllustration size={size} />
    case 'non-custodial-wallet-detail': return <KeyIllustration size={size} />
    case 'what-is-smart-contract': return <SmartContractIllustration size={size} />
    case 'what-is-dao':           return <DaoIllustration size={size} />
    default:                      return <BlockchainIllustration size={size} />
  }
}

// ─── Awarizon — layered infrastructure stack ────────────────────────────────
function AwarizonIllustration({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="260" height="260" fill="#050505" />
      {/* Grid */}
      <defs>
        <pattern id="aw-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFE50008" strokeWidth="0.5"/>
        </pattern>
        <filter id="aw-glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <rect width="260" height="260" fill="url(#aw-grid)" />

      {/* Infrastructure layers (bottom to top) */}
      {[
        { y: 190, label: 'CHAIN LAYER',   w: 180 },
        { y: 158, label: 'API / SDK LAYER', w: 160 },
        { y: 126, label: 'IDENTITY LAYER', w: 140 },
        { y: 94,  label: 'PAYMENTS LAYER', w: 120 },
        { y: 62,  label: 'WALLET LAYER',   w: 100 },
      ].map(({ y, label, w }, i) => (
        <g key={i}>
          <rect x={(260 - w) / 2} y={y} width={w} height={22}
            fill="#0D0D0D" stroke="#FFE500" strokeOpacity={0.12 + i * 0.06} strokeWidth="0.5" />
          <rect x={(260 - w) / 2} y={y} width={w * 0.3} height={22}
            fill="#FFE500" fillOpacity={0.04 + i * 0.012} />
          <text x="130" y={y + 14} textAnchor="middle" fill="#FFE500"
            fillOpacity={0.4 + i * 0.08} fontFamily="JetBrains Mono,monospace" fontSize="7" letterSpacing="1.5">
            {label}
          </text>
        </g>
      ))}

      {/* Connector lines */}
      <line x1="130" y1="62" x2="130" y2="40" stroke="#FFE500" strokeOpacity="0.3" strokeWidth="0.5" strokeDasharray="3 3" />
      {/* Top node — Zela */}
      <circle cx="130" cy="34" r="10" fill="#0D0D0D" stroke="#FFE500" strokeOpacity="0.6" strokeWidth="0.8" />
      <text x="130" y="37" textAnchor="middle" fill="#FFE500" fontFamily="JetBrains Mono,monospace" fontSize="6.5" fontWeight="bold">ZELA</text>

      {/* Glow at center */}
      <ellipse cx="130" cy="130" rx="50" ry="40" fill="#FFE500" fillOpacity="0.02" />
    </svg>
  )
}

// ─── Blockchain — chain of blocks ────────────────────────────────────────────
function BlockchainIllustration({ size }: { size: number }) {
  const blocks = [
    { x: 20, label: '#2841', hash: '0x3fa1…' },
    { x: 86, label: '#2842', hash: '0x7b2c…' },
    { x: 152, label: '#2843', hash: '0xc91d…' },
  ]
  return (
    <svg width={size} height={size} viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="260" height="260" fill="#050505" />
      <defs>
        <pattern id="bc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFE50008" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="260" height="260" fill="url(#bc-grid)" />

      {blocks.map(({ x, label, hash }, i) => (
        <g key={i}>
          {/* Link arrow */}
          {i > 0 && (
            <g>
              <line x1={x - 14} y1="130" x2={x + 2} y2="130" stroke="#FFE500" strokeOpacity="0.35" strokeWidth="0.8" />
              <polygon points={`${x + 2},127 ${x + 2},133 ${x + 8},130`} fill="#FFE500" fillOpacity="0.35" />
            </g>
          )}
          {/* Block body */}
          <rect x={x} y={95} width={60} height={70} fill="#0D0D0D" stroke="#FFE500"
            strokeOpacity={i === 2 ? 0.7 : 0.2} strokeWidth={i === 2 ? '0.8' : '0.4'} />
          {i === 2 && <rect x={x} y={95} width={60} height={4} fill="#FFE500" fillOpacity="0.6" />}
          {/* Block label */}
          <text x={x + 30} y={113} textAnchor="middle" fill="#FFE500"
            fillOpacity={i === 2 ? 0.9 : 0.5} fontFamily="JetBrains Mono,monospace" fontSize="7" fontWeight="bold">
            BLOCK
          </text>
          <text x={x + 30} y={123} textAnchor="middle" fill="#FFE500"
            fillOpacity={i === 2 ? 0.9 : 0.5} fontFamily="JetBrains Mono,monospace" fontSize="7">
            {label}
          </text>
          {/* Hash */}
          <text x={x + 30} y={138} textAnchor="middle" fill="#888" fontFamily="JetBrains Mono,monospace" fontSize="6">
            {hash}
          </text>
          {/* TX count */}
          <text x={x + 30} y={152} textAnchor="middle" fill="#444" fontFamily="JetBrains Mono,monospace" fontSize="5.5">
            TXS: {[142, 98, 217][i]}
          </text>
          {i === 2 && (
            <>
              <circle cx={x + 50} cy={99} r="3" fill="#00D26A" />
              <text x={x + 30} y={164} textAnchor="middle" fill="#00D26A" fontFamily="JetBrains Mono,monospace" fontSize="5">LATEST</text>
            </>
          )}
        </g>
      ))}

      {/* Legend */}
      <text x="130" y="196" textAnchor="middle" fill="#444" fontFamily="JetBrains Mono,monospace" fontSize="6" letterSpacing="1.5">
        IMMUTABLE · DISTRIBUTED · TRUSTLESS
      </text>

      {/* Extending chain arrow */}
      <line x1="216" y1="130" x2="240" y2="130" stroke="#FFE500" strokeOpacity="0.2" strokeWidth="0.6" strokeDasharray="4 3" />
    </svg>
  )
}

// ─── Crypto — key + coin ─────────────────────────────────────────────────────
function CryptoIllustration({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="260" height="260" fill="#050505" />
      <defs>
        <pattern id="cr-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFE50008" strokeWidth="0.5"/>
        </pattern>
        <radialGradient id="coin-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE500" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FFE500" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="260" height="260" fill="url(#cr-grid)" />

      {/* Coin */}
      <circle cx="130" cy="105" r="46" fill="#0D0D0D" stroke="#FFE500" strokeOpacity="0.6" strokeWidth="1" />
      <circle cx="130" cy="105" r="38" fill="#111" stroke="#FFE500" strokeOpacity="0.2" strokeWidth="0.4" />
      <text x="130" y="100" textAnchor="middle" fill="#FFE500" fillOpacity="0.9"
        fontFamily="JetBrains Mono,monospace" fontSize="22" fontWeight="bold">₿</text>
      <text x="130" y="116" textAnchor="middle" fill="#FFE500" fillOpacity="0.5"
        fontFamily="JetBrains Mono,monospace" fontSize="7">DIGITAL MONEY</text>

      {/* Glow behind coin */}
      <circle cx="130" cy="105" r="60" fill="url(#coin-grad)" />

      {/* Transaction flow */}
      <rect x="28" y="174" width="66" height="36" rx="2" fill="#0D0D0D" stroke="#1A1A1A" strokeWidth="0.5" />
      <text x="61" y="188" textAnchor="middle" fill="#FFE500" fillOpacity="0.6" fontFamily="JetBrains Mono,monospace" fontSize="6">SENDER</text>
      <text x="61" y="200" textAnchor="middle" fill="#555" fontFamily="JetBrains Mono,monospace" fontSize="5.5">0x4a3b…</text>

      <rect x="166" y="174" width="66" height="36" rx="2" fill="#0D0D0D" stroke="#FFE500" strokeOpacity="0.25" strokeWidth="0.5" />
      <text x="199" y="188" textAnchor="middle" fill="#FFE500" fillOpacity="0.6" fontFamily="JetBrains Mono,monospace" fontSize="6">RECEIVER</text>
      <text x="199" y="200" textAnchor="middle" fill="#555" fontFamily="JetBrains Mono,monospace" fontSize="5.5">0x9f1c…</text>

      {/* Arrow between */}
      <line x1="97" y1="192" x2="163" y2="192" stroke="#FFE500" strokeOpacity="0.4" strokeWidth="0.8" strokeDasharray="4 3" />
      <polygon points="163,189 163,195 170,192" fill="#FFE500" fillOpacity="0.4" />
      <text x="130" y="187" textAnchor="middle" fill="#FFE500" fillOpacity="0.5" fontFamily="JetBrains Mono,monospace" fontSize="5.5">0.05 BTC</text>

      {/* Connecting lines from coin to boxes */}
      <line x1="97" y1="147" x2="61" y2="174" stroke="#FFE500" strokeOpacity="0.12" strokeWidth="0.4" />
      <line x1="163" y1="147" x2="199" y2="174" stroke="#FFE500" strokeOpacity="0.12" strokeWidth="0.4" />
    </svg>
  )
}

// ─── DeFi — liquidity pool ────────────────────────────────────────────────────
function DefiIllustration({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="260" height="260" fill="#050505" />
      <defs>
        <pattern id="df-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFE50008" strokeWidth="0.5"/>
        </pattern>
        <radialGradient id="pool-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE500" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFE500" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="260" height="260" fill="url(#df-grid)" />

      {/* Pool container */}
      <ellipse cx="130" cy="148" rx="52" ry="18" fill="#0D0D0D" stroke="#FFE500" strokeOpacity="0.5" strokeWidth="0.8" />
      <rect x="78" y="100" width="104" height="48" fill="#0D0D0D" stroke="#FFE500" strokeOpacity="0.15" strokeWidth="0.5" />
      <rect x="78" y="100" width="104" height="48" fill="url(#pool-glow)" />
      <ellipse cx="130" cy="100" rx="52" ry="18" fill="#0D0D0D" stroke="#FFE500" strokeOpacity="0.3" strokeWidth="0.6" />

      {/* Pool labels */}
      <text x="108" y="126" textAnchor="middle" fill="#FFE500" fillOpacity="0.6" fontFamily="JetBrains Mono,monospace" fontSize="7">ETH</text>
      <text x="130" y="130" textAnchor="middle" fill="#444" fontFamily="JetBrains Mono,monospace" fontSize="7">/</text>
      <text x="152" y="126" textAnchor="middle" fill="#4FC3F7" fillOpacity="0.6" fontFamily="JetBrains Mono,monospace" fontSize="7">USDC</text>
      <text x="130" y="145" textAnchor="middle" fill="#444" fontFamily="JetBrains Mono,monospace" fontSize="6">LIQUIDITY POOL</text>

      {/* LP providers coming in from top-left */}
      <line x1="50" y1="60" x2="90" y2="95" stroke="#FFE500" strokeOpacity="0.3" strokeWidth="0.7" strokeDasharray="4 3" />
      <rect x="20" y="40" width="55" height="28" rx="2" fill="#0D0D0D" stroke="#1A1A1A" strokeWidth="0.5" />
      <text x="47" y="52" textAnchor="middle" fill="#FFE500" fillOpacity="0.5" fontFamily="JetBrains Mono,monospace" fontSize="6">LIQUIDITY</text>
      <text x="47" y="62" textAnchor="middle" fill="#555" fontFamily="JetBrains Mono,monospace" fontSize="6">PROVIDER</text>

      {/* Trader top-right */}
      <line x1="210" y1="60" x2="170" y2="95" stroke="#4FC3F7" strokeOpacity="0.3" strokeWidth="0.7" strokeDasharray="4 3" />
      <rect x="185" y="40" width="55" height="28" rx="2" fill="#0D0D0D" stroke="#1A1A1A" strokeWidth="0.5" />
      <text x="212" y="52" textAnchor="middle" fill="#4FC3F7" fillOpacity="0.5" fontFamily="JetBrains Mono,monospace" fontSize="6">TRADER</text>
      <text x="212" y="62" textAnchor="middle" fill="#555" fontFamily="JetBrains Mono,monospace" fontSize="6">SWAPS</text>

      {/* Fee arrow bottom */}
      <line x1="130" y1="166" x2="130" y2="196" stroke="#FFE500" strokeOpacity="0.3" strokeWidth="0.7" strokeDasharray="4 3" />
      <rect x="95" y="196" width="70" height="26" rx="2" fill="#0D0D0D" stroke="#FFE500" strokeOpacity="0.25" strokeWidth="0.5" />
      <text x="130" y="208" textAnchor="middle" fill="#FFE500" fillOpacity="0.5" fontFamily="JetBrains Mono,monospace" fontSize="6">0.3% FEES</text>
      <text x="130" y="218" textAnchor="middle" fill="#444" fontFamily="JetBrains Mono,monospace" fontSize="5.5">TO LPs</text>

      {/* AMM label */}
      <text x="130" y="84" textAnchor="middle" fill="#444" fontFamily="JetBrains Mono,monospace" fontSize="6" letterSpacing="1.5">AUTOMATED MARKET MAKER</text>
    </svg>
  )
}

// ─── NFT — unique token certificate ──────────────────────────────────────────
function NftIllustration({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="260" height="260" fill="#050505" />
      <defs>
        <pattern id="nft-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFE50008" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="260" height="260" fill="url(#nft-grid)" />

      {/* NFT card */}
      <rect x="70" y="50" width="120" height="140" fill="#0D0D0D" stroke="#FFE500" strokeOpacity="0.5" strokeWidth="0.8" />
      {/* Accent top bar */}
      <rect x="70" y="50" width="120" height="4" fill="#FFE500" fillOpacity="0.5" />
      {/* Abstract art area */}
      <rect x="78" y="62" width="104" height="80" fill="#111" stroke="#1A1A1A" strokeWidth="0.4" />
      {/* Art elements */}
      <circle cx="130" cy="102" r="24" fill="none" stroke="#FFE500" strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="118" cy="94" r="10" fill="#FFE500" fillOpacity="0.08" stroke="#FFE500" strokeOpacity="0.3" strokeWidth="0.6" />
      <polygon points="130,78 145,102 115,102" fill="none" stroke="#FFE500" strokeOpacity="0.2" strokeWidth="0.7" />
      <rect x="106" y="98" width="48" height="28" fill="none" stroke="#FFE500" strokeOpacity="0.12" strokeWidth="0.5" />

      {/* Token ID */}
      <text x="130" y="161" textAnchor="middle" fill="#FFE500" fillOpacity="0.8" fontFamily="JetBrains Mono,monospace" fontSize="7" fontWeight="bold">TOKEN #0042</text>
      {/* Owner */}
      <text x="130" y="173" textAnchor="middle" fill="#555" fontFamily="JetBrains Mono,monospace" fontSize="6">OWNER: 0xA3f1…</text>
      {/* Contract */}
      <text x="130" y="183" textAnchor="middle" fill="#333" fontFamily="JetBrains Mono,monospace" fontSize="5.5">CONTRACT VERIFIED ✓</text>

      {/* Corner accents */}
      <line x1="70" y1="58" x2="80" y2="58" stroke="#FFE500" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="70" y1="58" x2="70" y2="68" stroke="#FFE500" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="190" y1="58" x2="180" y2="58" stroke="#FFE500" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="190" y1="58" x2="190" y2="68" stroke="#FFE500" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="70" y1="182" x2="80" y2="182" stroke="#FFE500" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="70" y1="182" x2="70" y2="172" stroke="#FFE500" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="190" y1="182" x2="180" y2="182" stroke="#FFE500" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="190" y1="182" x2="190" y2="172" stroke="#FFE500" strokeOpacity="0.2" strokeWidth="1" />

      {/* Chain verification below */}
      <text x="130" y="212" textAnchor="middle" fill="#2A2A2A" fontFamily="JetBrains Mono,monospace" fontSize="5.5" letterSpacing="1">RECORDED ON-CHAIN · IMMUTABLE PROVENANCE</text>
    </svg>
  )
}

// ─── RWA — tokenized real estate ─────────────────────────────────────────────
function RwaIllustration({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="260" height="260" fill="#050505" />
      <defs>
        <pattern id="rwa-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFE50008" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="260" height="260" fill="url(#rwa-grid)" />

      {/* Building silhouette */}
      <rect x="90" y="90" width="80" height="100" fill="#111" stroke="#1A1A1A" strokeWidth="0.5" />
      {/* Windows */}
      {[0,1,2].map(row => [0,1,2,3].map(col => (
        <rect key={`${row}-${col}`} x={96 + col * 18} y={98 + row * 22} width="12" height="14"
          fill={row === 0 && col === 1 ? '#FFE500' : '#1A1A1A'}
          fillOpacity={row === 0 && col === 1 ? 0.3 : 1}
          stroke="#FFE500" strokeOpacity="0.08" strokeWidth="0.3" />
      )))}
      {/* Roof */}
      <polygon points="86,90 130,58 174,90" fill="#0D0D0D" stroke="#1A1A1A" strokeWidth="0.5" />

      {/* Tokenization arrow + tokens */}
      <line x1="174" y1="130" x2="208" y2="130" stroke="#FFE500" strokeOpacity="0.4" strokeWidth="0.8" strokeDasharray="4 3" />
      <text x="130" y="78" textAnchor="middle" fill="#444" fontFamily="JetBrains Mono,monospace" fontSize="5.5" letterSpacing="1">REAL WORLD ASSET</text>

      {/* Token stack */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={212} y={120 - i * 6} width="34" height="20" rx="2"
          fill="#0D0D0D" stroke="#FFE500" strokeOpacity={0.15 + i * 0.15} strokeWidth="0.5" />
      ))}
      <text x="229" y="127" textAnchor="middle" fill="#FFE500" fillOpacity="0.7"
        fontFamily="JetBrains Mono,monospace" fontSize="6">TOKEN</text>
      <text x="229" y="136" textAnchor="middle" fill="#444" fontFamily="JetBrains Mono,monospace" fontSize="5.5">SHARES</text>

      {/* Stats */}
      <rect x="18" y="108" width="62" height="50" fill="#0D0D0D" stroke="#1A1A1A" strokeWidth="0.5" />
      <text x="49" y="121" textAnchor="middle" fill="#555" fontFamily="JetBrains Mono,monospace" fontSize="5.5">ASSET VALUE</text>
      <text x="49" y="133" textAnchor="middle" fill="#FFE500" fillOpacity="0.7" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="bold">$2M</text>
      <line x1="24" y1="138" x2="74" y2="138" stroke="#1A1A1A" strokeWidth="0.5" />
      <text x="49" y="149" textAnchor="middle" fill="#444" fontFamily="JetBrains Mono,monospace" fontSize="5.5">1000 TOKENS</text>
      <text x="49" y="158" textAnchor="middle" fill="#555" fontFamily="JetBrains Mono,monospace" fontSize="5">$2000 EACH</text>

      <text x="130" y="210" textAnchor="middle" fill="#2A2A2A" fontFamily="JetBrains Mono,monospace" fontSize="5.5" letterSpacing="1">FRACTIONAL · TRADEABLE · ON-CHAIN</text>
    </svg>
  )
}

// ─── Wallet compare — custodial vs non-custodial ──────────────────────────────
function WalletCompareIllustration({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="260" height="260" fill="#050505" />
      <defs>
        <pattern id="wc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFE50008" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="260" height="260" fill="url(#wc-grid)" />

      {/* Divider */}
      <line x1="130" y1="40" x2="130" y2="220" stroke="#1A1A1A" strokeWidth="0.8" strokeDasharray="5 4" />

      {/* LEFT — Custodial */}
      <text x="65" y="58" textAnchor="middle" fill="#888" fontFamily="JetBrains Mono,monospace" fontSize="7" letterSpacing="1">CUSTODIAL</text>
      {/* Bank icon */}
      <rect x="30" y="68" width="70" height="50" fill="#0D0D0D" stroke="#333" strokeWidth="0.5" />
      <rect x="38" y="74" width="54" height="6" fill="#222" />
      {[0,1,2,3].map(i => <rect key={i} x={40 + i * 13} y={83} width="8" height="22" fill="#1A1A1A" stroke="#333" strokeWidth="0.4" />)}
      <rect x="38" y="107" width="54" height="5" fill="#222" />
      {/* Lock */}
      <rect x="52" y="130" width="26" height="20" rx="2" fill="#0D0D0D" stroke="#333" strokeWidth="0.5" />
      <path d="M57 130 C57 122 65 118 73 122 L73 130" fill="none" stroke="#333" strokeWidth="1.5" />
      <circle cx="65" cy="139" r="3" fill="#333" />
      <text x="65" y="162" textAnchor="middle" fill="#333" fontFamily="JetBrains Mono,monospace" fontSize="5.5">EXCHANGE</text>
      <text x="65" y="172" textAnchor="middle" fill="#333" fontFamily="JetBrains Mono,monospace" fontSize="5.5">HOLDS KEYS</text>

      {/* RIGHT — Non-custodial */}
      <text x="195" y="58" textAnchor="middle" fill="#FFE500" fillOpacity="0.8" fontFamily="JetBrains Mono,monospace" fontSize="7" letterSpacing="1">NON-CUSTODIAL</text>
      {/* Wallet icon */}
      <rect x="162" y="68" width="76" height="52" rx="3" fill="#0D0D0D" stroke="#FFE500" strokeOpacity="0.4" strokeWidth="0.7" />
      <rect x="182" y="82" width="36" height="22" rx="10" fill="#111" stroke="#FFE500" strokeOpacity="0.3" strokeWidth="0.5" />
      <circle cx="200" cy="93" r="6" fill="#FFE500" fillOpacity="0.08" stroke="#FFE500" strokeOpacity="0.5" strokeWidth="0.7" />
      {/* Key */}
      <circle cx="195" cy="140" r="10" fill="#0D0D0D" stroke="#FFE500" strokeOpacity="0.6" strokeWidth="0.8" />
      <line x1="205" y1="140" x2="224" y2="140" stroke="#FFE500" strokeOpacity="0.6" strokeWidth="1.5" />
      <line x1="218" y1="140" x2="218" y2="148" stroke="#FFE500" strokeOpacity="0.6" strokeWidth="1.5" />
      <line x1="224" y1="140" x2="224" y2="148" stroke="#FFE500" strokeOpacity="0.6" strokeWidth="1.5" />
      <text x="195" y="162" textAnchor="middle" fill="#FFE500" fillOpacity="0.6" fontFamily="JetBrains Mono,monospace" fontSize="5.5">YOU HOLD</text>
      <text x="195" y="172" textAnchor="middle" fill="#FFE500" fillOpacity="0.6" fontFamily="JetBrains Mono,monospace" fontSize="5.5">YOUR KEYS</text>

      <text x="130" y="210" textAnchor="middle" fill="#2A2A2A" fontFamily="JetBrains Mono,monospace" fontSize="5.5" letterSpacing="1">NOT YOUR KEYS · NOT YOUR COINS</text>
    </svg>
  )
}

// ─── Non-custodial detail — seed phrase tree ─────────────────────────────────
function KeyIllustration({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="260" height="260" fill="#050505" />
      <defs>
        <pattern id="key-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFE50008" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="260" height="260" fill="url(#key-grid)" />

      {/* Seed phrase box */}
      <rect x="40" y="40" width="180" height="50" fill="#0D0D0D" stroke="#FFE500" strokeOpacity="0.5" strokeWidth="0.7" />
      <text x="130" y="57" textAnchor="middle" fill="#FFE500" fillOpacity="0.5" fontFamily="JetBrains Mono,monospace" fontSize="6" letterSpacing="1">SEED PHRASE (12 WORDS)</text>
      <text x="130" y="71" textAnchor="middle" fill="#444" fontFamily="JetBrains Mono,monospace" fontSize="6.5">
        apple ● river ● table ● drift ● …
      </text>
      <text x="130" y="82" textAnchor="middle" fill="#2A2A2A" fontFamily="JetBrains Mono,monospace" fontSize="6">MASTER KEY — NEVER SHARE</text>

      {/* Derivation arrow */}
      <line x1="130" y1="90" x2="130" y2="108" stroke="#FFE500" strokeOpacity="0.3" strokeWidth="0.7" />
      <polygon points="126,108 134,108 130,116" fill="#FFE500" fillOpacity="0.3" />

      {/* Private keys branch */}
      <line x1="90" y1="116" x2="170" y2="116" stroke="#FFE500" strokeOpacity="0.15" strokeWidth="0.5" />
      <line x1="90" y1="116" x2="90" y2="132" stroke="#FFE500" strokeOpacity="0.15" strokeWidth="0.5" />
      <line x1="130" y1="116" x2="130" y2="132" stroke="#FFE500" strokeOpacity="0.15" strokeWidth="0.5" />
      <line x1="170" y1="116" x2="170" y2="132" stroke="#FFE500" strokeOpacity="0.15" strokeWidth="0.5" />

      {/* 3 private key boxes */}
      {[
        { x: 60, label: 'ETH KEY', addr: '0xA3…' },
        { x: 104, label: 'BTC KEY', addr: 'bc1q…' },
        { x: 148, label: 'SOL KEY', addr: 'G7xR…' },
      ].map(({ x, label, addr }) => (
        <g key={label}>
          <rect x={x} y={132} width="46" height="32" fill="#0D0D0D" stroke="#FFE500" strokeOpacity="0.2" strokeWidth="0.5" />
          <text x={x + 23} y={144} textAnchor="middle" fill="#FFE500" fillOpacity="0.5" fontFamily="JetBrains Mono,monospace" fontSize="5.5">{label}</text>
          <text x={x + 23} y={156} textAnchor="middle" fill="#444" fontFamily="JetBrains Mono,monospace" fontSize="5">{addr}</text>
          {/* Arrow to address */}
          <line x1={x + 23} y1={164} x2={x + 23} y2={178} stroke="#FFE500" strokeOpacity="0.12" strokeWidth="0.5" />
          <rect x={x} y={178} width="46" height="20" fill="#050505" stroke="#1A1A1A" strokeWidth="0.4" />
          <text x={x + 23} y={188} textAnchor="middle" fill="#333" fontFamily="JetBrains Mono,monospace" fontSize="5">PUB ADDR</text>
          <text x={x + 23} y={195} textAnchor="middle" fill="#2A2A2A" fontFamily="JetBrains Mono,monospace" fontSize="4.5">{addr}</text>
        </g>
      ))}

      <text x="130" y="220" textAnchor="middle" fill="#2A2A2A" fontFamily="JetBrains Mono,monospace" fontSize="5.5" letterSpacing="1">ONE SEED → INFINITE WALLETS</text>
    </svg>
  )
}

// ─── Smart contract — vending machine ────────────────────────────────────────
function SmartContractIllustration({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="260" height="260" fill="#050505" />
      <defs>
        <pattern id="sc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFE50008" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="260" height="260" fill="url(#sc-grid)" />

      {/* Vending machine body */}
      <rect x="85" y="55" width="90" height="130" rx="4" fill="#0D0D0D" stroke="#FFE500" strokeOpacity="0.4" strokeWidth="0.8" />
      {/* Screen */}
      <rect x="95" y="65" width="70" height="40" fill="#111" stroke="#FFE500" strokeOpacity="0.2" strokeWidth="0.4" />
      <text x="130" y="81" textAnchor="middle" fill="#FFE500" fillOpacity="0.8" fontFamily="JetBrains Mono,monospace" fontSize="7">IF condition</text>
      <text x="130" y="91" textAnchor="middle" fill="#FFE500" fillOpacity="0.5" fontFamily="JetBrains Mono,monospace" fontSize="7">THEN execute</text>
      <text x="130" y="101" textAnchor="middle" fill="#444" fontFamily="JetBrains Mono,monospace" fontSize="6">no human needed</text>

      {/* Item slots */}
      {[0,1].map(row => [0,1,2].map(col => (
        <rect key={`${row}-${col}`} x={93 + col * 24} y={114 + row * 28} width="20" height="22"
          fill="#111" stroke="#FFE500" strokeOpacity="0.1" strokeWidth="0.4" />
      )))}

      {/* Coin slot */}
      <rect x="148" y="165" width="20" height="8" rx="2" fill="#111" stroke="#FFE500" strokeOpacity="0.3" strokeWidth="0.5" />
      <text x="158" y="172" textAnchor="middle" fill="#FFE500" fillOpacity="0.4" fontFamily="JetBrains Mono,monospace" fontSize="5">▶</text>

      {/* Dispense slot */}
      <rect x="95" y="176" width="70" height="6" rx="1" fill="#0A0A0A" stroke="#333" strokeWidth="0.4" />

      {/* Input arrow left */}
      <line x1="40" y1="130" x2="82" y2="130" stroke="#FFE500" strokeOpacity="0.4" strokeWidth="0.8" strokeDasharray="4 3" />
      <polygon points="82,127 82,133 88,130" fill="#FFE500" fillOpacity="0.4" />
      <text x="44" y="120" textAnchor="middle" fill="#555" fontFamily="JetBrains Mono,monospace" fontSize="6">0.1 ETH</text>
      <text x="44" y="145" textAnchor="middle" fill="#444" fontFamily="JetBrains Mono,monospace" fontSize="5.5">INPUT</text>

      {/* Output arrow right */}
      <line x1="178" y1="130" x2="216" y2="130" stroke="#FFE500" strokeOpacity="0.4" strokeWidth="0.8" strokeDasharray="4 3" />
      <polygon points="216,127 216,133 222,130" fill="#FFE500" fillOpacity="0.4" />
      <text x="224" y="120" textAnchor="middle" fill="#FFE500" fillOpacity="0.6" fontFamily="JetBrains Mono,monospace" fontSize="6">TOKEN</text>
      <text x="224" y="145" textAnchor="middle" fill="#444" fontFamily="JetBrains Mono,monospace" fontSize="5.5">OUTPUT</text>

      <text x="130" y="214" textAnchor="middle" fill="#2A2A2A" fontFamily="JetBrains Mono,monospace" fontSize="5.5" letterSpacing="1">CODE IS THE CONTRACT · NO MIDDLEMAN</text>
    </svg>
  )
}

// ─── DAO — voting governance ──────────────────────────────────────────────────
function DaoIllustration({ size }: { size: number }) {
  const voters = [
    { x: 46, y: 80, tokens: '2400', vote: 'YES' },
    { x: 130, y: 52, tokens: '8100', vote: 'YES' },
    { x: 214, y: 80, tokens: '1200', vote: 'NO' },
    { x: 56, y: 188, tokens: '3300', vote: 'YES' },
    { x: 204, y: 188, tokens: '600', vote: 'NO' },
  ]
  return (
    <svg width={size} height={size} viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="260" height="260" fill="#050505" />
      <defs>
        <pattern id="dao-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFE50008" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="260" height="260" fill="url(#dao-grid)" />

      {/* Center proposal */}
      <circle cx="130" cy="130" r="32" fill="#0D0D0D" stroke="#FFE500" strokeOpacity="0.5" strokeWidth="0.8" />
      <circle cx="130" cy="130" r="26" fill="#0A0A0A" stroke="#FFE500" strokeOpacity="0.15" strokeWidth="0.4" />
      <text x="130" y="124" textAnchor="middle" fill="#FFE500" fillOpacity="0.7" fontFamily="JetBrains Mono,monospace" fontSize="7" fontWeight="bold">PROPOSAL</text>
      <text x="130" y="134" textAnchor="middle" fill="#555" fontFamily="JetBrains Mono,monospace" fontSize="5.5">#0047</text>
      <text x="130" y="144" textAnchor="middle" fill="#444" fontFamily="JetBrains Mono,monospace" fontSize="5.5">ON-CHAIN</text>

      {/* Voters */}
      {voters.map(({ x, y, tokens, vote }) => (
        <g key={`${x}-${y}`}>
          {/* Line to center */}
          <line x1={x} y1={y} x2={130} y2={130}
            stroke={vote === 'YES' ? '#FFE500' : '#FF4444'} strokeOpacity="0.18" strokeWidth="0.6" strokeDasharray="4 3" />
          {/* Voter node */}
          <circle cx={x} cy={y} r="18" fill="#0D0D0D"
            stroke={vote === 'YES' ? '#FFE500' : '#FF4444'}
            strokeOpacity={vote === 'YES' ? '0.4' : '0.25'} strokeWidth="0.5" />
          <text x={x} y={y - 5} textAnchor="middle" fill="#555" fontFamily="JetBrains Mono,monospace" fontSize="5">{tokens}</text>
          <text x={x} y={y + 5} textAnchor="middle"
            fill={vote === 'YES' ? '#FFE500' : '#FF4444'}
            fillOpacity={vote === 'YES' ? '0.7' : '0.5'}
            fontFamily="JetBrains Mono,monospace" fontSize="6" fontWeight="bold">{vote}</text>
        </g>
      ))}

      {/* Vote bar bottom */}
      <rect x="40" y="220" width="180" height="10" rx="2" fill="#111" />
      <rect x="40" y="220" width="130" height="10" rx="2" fill="#FFE500" fillOpacity="0.3" />
      <text x="105" y="229" textAnchor="middle" fill="#FFE500" fillOpacity="0.7" fontFamily="JetBrains Mono,monospace" fontSize="5.5">72% YES</text>
      <text x="185" y="229" textAnchor="middle" fill="#FF4444" fillOpacity="0.5" fontFamily="JetBrains Mono,monospace" fontSize="5.5">28% NO</text>
    </svg>
  )
}
