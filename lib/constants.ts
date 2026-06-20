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
    href: '/sdk',
    label: 'SDK',
    code: 'SDK_LAYER',
    sublabel: 'Developer APIs & Packages',
    num: '03',
  },
  {
    href: '/adoption',
    label: 'Adoption Layer',
    code: 'ADOPT_SYS',
    sublabel: 'Distribution as Design',
    num: '04',
  },
  {
    href: '/ecosystem',
    label: 'Ecosystem Logic',
    code: 'ECO_GRAPH',
    sublabel: 'Everything Connected',
    num: '06',
  },
  {
    href: '/thesis',
    label: 'Global Adoption Thesis',
    code: 'MARKET_THESIS',
    sublabel: 'Why We Exist Here',
    num: '07',
  },
  {
    href: '/access',
    label: 'Access Layer',
    code: 'ACCESS_GATE',
    sublabel: 'Entry into the System',
    num: '08',
  },
  {
    href: '/learn',
    label: 'Web3 Academy',
    code: 'LEARN_LAYER',
    sublabel: 'Blockchain Education Hub',
    num: '09',
  },
]

export const INFRASTRUCTURE_NODES = [
  {
    id: 'wallet',
    label: 'Crypto Wallets',
    code: 'WALLET_INFRA',
    description: 'Non-custodial wallet infrastructure enabling businesses and developers to build secure digital asset management — custody, multi-sig, and programmable spending logic at protocol level.',
    x: 50,
    y: 20,
    color: '#FFE500',
    tags: ['Non-custodial', 'Multi-sig', 'Self-custody'],
  },
  {
    id: 'payments',
    label: 'On-chain Payments',
    code: 'PAY_ENGINE',
    description: 'Blockchain-native payment processing with stablecoin support, cross-border settlement, and developer APIs for integrating crypto payments into any product or business operation.',
    x: 80,
    y: 45,
    color: '#FFE500',
    tags: ['Stablecoins', 'Cross-chain', 'Settlement'],
  },
  {
    id: 'identity',
    label: 'Decentralized Identity',
    code: 'ID_LAYER',
    description: 'Web3-native identity and verification infrastructure — wallet-based onboarding, on-chain KYC/AML compliance, and self-sovereign identity for any application or protocol.',
    x: 65,
    y: 75,
    color: '#FFE500',
    tags: ['DID', 'On-chain KYC', 'Self-sovereign'],
  },
  {
    id: 'apis',
    label: 'Web3 APIs / SDKs',
    code: 'API_LAYER',
    description: 'Developer-first blockchain interface layer — EVM-compatible SDKs, REST APIs, and protocol connectors built for developers who need to ship Web3 products fast.',
    x: 20,
    y: 65,
    color: '#FFE500',
    tags: ['EVM', 'REST', 'SDKs'],
  },
  {
    id: 'automation',
    label: 'Smart Contract Systems',
    code: 'AUTO_SYS',
    description: 'Programmable on-chain workflows and smart contract infrastructure that replace manual processes with auditable, trust-minimized automation at scale.',
    x: 15,
    y: 35,
    color: '#FFE500',
    tags: ['Smart Contracts', 'On-chain', 'Auditable'],
  },
]

export const ADOPTION_FLOW = [
  { id: 'business', label: 'Business', icon: '◈', desc: 'Developer or business identifies need for blockchain rails and on-chain infrastructure' },
  { id: 'integration', label: 'Integration', icon: '⬡', desc: 'Awarizon Web3 APIs and SDKs connect with existing systems and operational environments' },
  { id: 'activation', label: 'Activation', icon: '◉', desc: 'Protocols go live, teams onboarded, operations move on-chain' },
  { id: 'usage', label: 'Usage', icon: '◆', desc: 'Real on-chain activity generates transaction data and behavioral intelligence' },
  { id: 'feedback', label: 'Feedback Loop', icon: '↺', desc: 'On-chain data loops back into protocol refinement and ecosystem growth' },
]

export const CONSUMER_PRODUCTS = [
  {
    id: 'zela',
    name: 'Zela',
    tagline: 'Crypto Consumer Layer',
    description: 'A consumer-facing app that transforms blockchain infrastructure into practical daily crypto experiences — stablecoins, on-chain payments, and self-custody made simple.',
    status: 'ACTIVE',
    version: 'v2.1.0',
    category: 'Crypto Consumer',
    metrics: ['50K+ Users', 'On-chain Payments', 'Mobile-first'],
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
  { label: 'Global Crypto Users', value: '560M+', change: '+32% YoY' },
  { label: 'Global DeFi TVL', value: '$100B+', change: 'On-Chain Value' },
  { label: 'Blockchain Transactions (2024)', value: '$20T+', change: '+45% YoY' },
  { label: 'Global Adoption Gap', value: '72%', change: 'Addressable' },
]

export const SYSTEM_VERSION = 'v3.2.1-PROD'
export const SYSTEM_STATUS = 'OPERATIONAL'
export const BUILD_DATE = '2024.Q4'
