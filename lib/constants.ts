export const NAV_LAYERS = [
  {
    href: '/shift',
    label: 'The Shift',
    code: 'ENTRY_LAYER',
    sublabel: 'Problem Space & Worldview',
    num: '01',
  },
  {
    href: '/infrastructure',
    label: 'Infrastructure Layer',
    code: 'INFRA_NODE',
    sublabel: 'Systems We Build',
    num: '02',
  },
  {
    href: '/adoption',
    label: 'Adoption Layer',
    code: 'ADOPT_SYS',
    sublabel: 'Distribution as Design',
    num: '03',
  },
  {
    href: '/consumer',
    label: 'Consumer Systems',
    code: 'CONSUMER_LAYER',
    sublabel: 'Products & Interfaces',
    num: '04',
  },
  {
    href: '/ecosystem',
    label: 'Ecosystem Logic',
    code: 'ECO_GRAPH',
    sublabel: 'Everything Connected',
    num: '05',
  },
  {
    href: '/thesis',
    label: 'Emerging Markets Thesis',
    code: 'MARKET_THESIS',
    sublabel: 'Why We Exist Here',
    num: '06',
  },
  {
    href: '/access',
    label: 'Access Layer',
    code: 'ACCESS_GATE',
    sublabel: 'Entry into the System',
    num: '07',
  },
]

export const INFRASTRUCTURE_NODES = [
  {
    id: 'wallet',
    label: 'Wallet Systems',
    code: 'WALLET_INFRA',
    description: 'Digital wallet infrastructure enabling secure value storage, transfer, and programmable money logic for businesses and consumers.',
    x: 50,
    y: 20,
    color: '#FFE500',
    tags: ['Custody', 'Multi-sig', 'Programmable'],
  },
  {
    id: 'payments',
    label: 'Payments Engine',
    code: 'PAY_ENGINE',
    description: 'High-throughput transaction processing with support for multiple payment rails, real-time settlement, and merchant integrations.',
    x: 80,
    y: 45,
    color: '#FFE500',
    tags: ['Real-time', 'Multi-rail', 'Settlement'],
  },
  {
    id: 'identity',
    label: 'Identity Layer',
    code: 'ID_LAYER',
    description: 'Authentication and identity verification infrastructure for digital onboarding, KYC/AML compliance, and access control.',
    x: 65,
    y: 75,
    color: '#FFE500',
    tags: ['KYC/AML', 'Auth', 'Verification'],
  },
  {
    id: 'apis',
    label: 'APIs / SDKs',
    code: 'API_LAYER',
    description: 'Developer-first interface layer exposing Awarizon infrastructure through clean, documented APIs and language-native SDKs.',
    x: 20,
    y: 65,
    color: '#FFE500',
    tags: ['REST', 'WebSocket', 'SDKs'],
  },
  {
    id: 'automation',
    label: 'Business Automation',
    code: 'AUTO_SYS',
    description: 'Operational tooling and workflow automation systems that replace manual processes with programmable, auditable pipelines.',
    x: 15,
    y: 35,
    color: '#FFE500',
    tags: ['Workflows', 'Pipelines', 'Auditable'],
  },
]

export const ADOPTION_FLOW = [
  { id: 'business', label: 'Business', icon: '◈', desc: 'Organization identifies need for modern digital infrastructure' },
  { id: 'integration', label: 'Integration', icon: '⬡', desc: 'Awarizon systems connect with existing operational environment' },
  { id: 'activation', label: 'Activation', icon: '◉', desc: 'Systems go live, staff trained, processes modernized' },
  { id: 'usage', label: 'Usage', icon: '◆', desc: 'Real-world operation generates data and behavioral signals' },
  { id: 'feedback', label: 'Feedback Loop', icon: '↺', desc: 'Intelligence feeds back into system refinement and improvement' },
]

export const CONSUMER_PRODUCTS = [
  {
    id: 'zela',
    name: 'Zela',
    tagline: 'Consumer Application Layer',
    description: 'A consumer-facing product that transforms digital infrastructure into practical daily financial experiences.',
    status: 'ACTIVE',
    version: 'v2.1.0',
    category: 'Fintech Consumer',
    metrics: ['50K+ Users', 'Real-time Payments', 'Mobile-first'],
  },
]

export const ECOSYSTEM_NODES = [
  { id: 'infra', label: 'Infrastructure', x: 50, y: 15, size: 60, primary: true },
  { id: 'distribution', label: 'Distribution', x: 80, y: 55, size: 50 },
  { id: 'consumer', label: 'Consumer', x: 60, y: 85, size: 50 },
  { id: 'feedback', label: 'Feedback', x: 20, y: 70, size: 44 },
  { id: 'market', label: 'Market', x: 15, y: 35, size: 44 },
]

export const MARKET_STATS = [
  { label: 'Internet Users in Nigeria', value: '103M+', change: '+12%' },
  { label: 'Unbanked Adults (West Africa)', value: '350M+', change: 'Opportunity' },
  { label: 'Mobile Money Transactions (2023)', value: '$1.4T', change: '+25% YoY' },
  { label: 'Digital Business Adoption Gap', value: '68%', change: 'Addressable' },
]

export const SYSTEM_VERSION = 'v3.2.1-PROD'
export const SYSTEM_STATUS = 'OPERATIONAL'
export const BUILD_DATE = '2024.Q4'
