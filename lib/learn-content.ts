export type ContentBlock =
  | { t: 'p';       c: string }
  | { t: 'ul';      c: string[] }
  | { t: 'ol';      c: string[] }
  | { t: 'callout'; title: string; c: string; variant: 'tip' | 'warn' | 'info' }
  | { t: 'compare'; left: { label: string; items: string[] }; right: { label: string; items: string[] } }

export interface ArticleSection {
  id:          string
  title:       string
  blocks:      ContentBlock[]
  accordion?:  boolean
}

export interface KeyTerm {
  term: string
  def:  string
}

export interface Article {
  slug:         string
  title:        string
  subtitle:     string
  category:     string
  readTime:     string
  description:  string
  intro:        string
  sections:     ArticleSection[]
  keyTerms:     KeyTerm[]
  relatedSlugs: string[]
}

export const LEARN_ARTICLES: Article[] = [

  // ─── 1. What is Awarizon ────────────────────────────────────────────────────
  {
    slug:        'what-is-awarizon',
    title:       'What is Awarizon?',
    subtitle:    'The blockchain infrastructure company bridging Web3 to the real world',
    category:    'ABOUT',
    readTime:    '4 min read',
    description: 'Awarizon builds blockchain infrastructure — wallets, on-chain payments, and Web3 APIs — that developers, businesses, and consumers can actually use.',
    intro:       'Awarizon is a global blockchain infrastructure company. We build the protocols, wallets, payment systems, and developer tools that make it possible to use crypto in the real world — not just on paper.',

    sections: [
      {
        id: 'what-we-build',
        title: 'What Awarizon builds',
        accordion: false,
        blocks: [
          { t: 'p', c: 'Most blockchain infrastructure exists for developers who already know Web3. Awarizon builds infrastructure designed for real deployment — for businesses that need to add crypto payments, for developers who need reliable Web3 APIs, and for everyday users who just want to send money or save in stablecoins.' },
          { t: 'ul', c: [
            'Crypto Wallets — non-custodial wallet infrastructure for businesses and apps',
            'On-chain Payments — stablecoin and crypto payment rails with real-time settlement',
            'Decentralized Identity — wallet-based KYC and verification systems',
            'Web3 APIs & SDKs — developer-first tools to build on any EVM chain',
            'Smart Contract Automation — programmable on-chain workflows',
          ]},
        ],
      },
      {
        id: 'the-adoption-gap',
        title: 'The problem we are solving',
        accordion: true,
        blocks: [
          { t: 'p', c: 'Blockchain protocols are technically advanced but operationally inaccessible. Most businesses that want to use crypto cannot — not because the technology does not exist, but because integrating it requires deep Web3 expertise most teams do not have.' },
          { t: 'p', c: 'Awarizon closes this gap. We handle the complexity of blockchain infrastructure so that developers can integrate in days, not months, and businesses can go on-chain without rebuilding their entire stack.' },
          { t: 'callout', title: 'Why does Awarizon focus on infrastructure?', c: 'Most Web3 protocols are technically capable but operationally inaccessible. Awarizon builds the distribution layer that makes blockchain usable for developers, businesses, and consumers across every market — turning global adoption from possibility into reality.', variant: 'info' },
        ],
      },
      {
        id: 'zela',
        title: 'Zela — our consumer product',
        accordion: true,
        blocks: [
          { t: 'p', c: 'Zela is Awarizon\'s consumer-facing app. It puts the blockchain infrastructure we build into the hands of everyday users — on-chain payments, crypto wallets, stablecoin accounts, and merchant payment acceptance.' },
          { t: 'p', c: 'Zela serves a dual purpose: it is a real product that real people use, and it is the proof-of-concept that validates every layer of the Awarizon infrastructure. When 50,000+ people trust Zela with their daily transactions, it confirms that our protocols work under real-world conditions.' },
        ],
      },
      {
        id: 'who-its-for',
        title: 'Who Awarizon is for',
        accordion: true,
        blocks: [
          { t: 'compare',
            left:  { label: 'Developers', items: ['Integrate Web3 APIs into any product', 'Access EVM-compatible SDKs', 'Build on multiple chains with one integration', 'Testnet sandbox environment'] },
            right: { label: 'Businesses', items: ['Accept crypto and stablecoin payments', 'Issue digital wallets for customers', 'Automate workflows with smart contracts', 'Deploy on-chain identity and KYC'] },
          },
        ],
      },
    ],

    keyTerms: [
      { term: 'EVM',             def: 'Ethereum Virtual Machine — the computing environment that runs smart contracts on Ethereum and compatible chains.' },
      { term: 'Stablecoin',      def: 'Cryptocurrency pegged to a stable asset (usually US Dollar). USDC, USDT, and cNGN are examples.' },
      { term: 'Infrastructure',  def: 'The foundational systems that other products and services are built on top of.' },
      { term: 'On-chain',        def: 'Data or transactions recorded permanently on a blockchain.' },
    ],

    relatedSlugs: ['what-is-blockchain', 'what-is-crypto', 'non-custodial-wallet-detail'],
  },

  // ─── 2. What is Blockchain ─────────────────────────────────────────────────
  {
    slug:        'what-is-blockchain',
    title:       'What is Blockchain?',
    subtitle:    'The distributed ledger technology that makes Web3 possible',
    category:    'BASICS',
    readTime:    '5 min read',
    description: 'A blockchain is a shared digital record book that no single person or company controls — making it tamper-proof, transparent, and trustless.',
    intro:       'A blockchain is a digital record book shared across thousands of computers worldwide. No single person, bank, or government controls it. Once data is written to the blockchain, it cannot be changed or deleted — ever.',

    sections: [
      {
        id: 'simple-explanation',
        title: 'The simple explanation',
        accordion: false,
        blocks: [
          { t: 'p', c: 'Imagine a Google Doc that thousands of people share — but instead of being editable, every entry is permanent. And instead of Google controlling the server, no single company does. That is essentially what a blockchain is.' },
          { t: 'p', c: 'Data is grouped into "blocks." Each block contains a batch of transactions plus a unique fingerprint (called a hash) of the previous block. This links every block to the one before it — forming a "chain." If anyone tries to alter an old block, it changes that block\'s hash, which breaks its link to every block that came after it. The tampering becomes instantly obvious to the entire network.' },
          { t: 'callout', title: 'Key insight', c: 'The security of a blockchain comes not from a single trusted entity, but from mathematics and distributed consensus. Changing the record would require controlling over 50% of all computing power on the network simultaneously — which is practically impossible on large blockchains.', variant: 'tip' },
        ],
      },
      {
        id: 'how-blocks-added',
        title: 'How does a new block get added?',
        accordion: true,
        blocks: [
          { t: 'p', c: 'When someone sends crypto or executes a smart contract, the transaction is broadcast to the network. Thousands of computers (called nodes) receive this transaction and validate it — checking that the sender has sufficient funds and that the transaction is correctly signed.' },
          { t: 'ol', c: [
            'Transaction is created and signed by the sender\'s private key',
            'The transaction is broadcast to all nodes on the network',
            'Nodes validate the transaction (checking balances, signatures)',
            'Valid transactions are grouped into a candidate block',
            'A consensus mechanism (mining or staking) determines which node adds the block',
            'The block is added to the chain and distributed to all nodes',
            'The state of the blockchain is updated globally',
          ]},
        ],
      },
      {
        id: 'why-trustless',
        title: 'Why is blockchain called "trustless"?',
        accordion: true,
        blocks: [
          { t: 'p', c: 'In traditional systems, you trust intermediaries — banks to hold your money honestly, governments not to inflate the currency, companies not to freeze your account. Blockchain replaces this trust with code and mathematics.' },
          { t: 'p', c: 'The rules of the network are written into the protocol. Everyone can read them. Nobody can override them — not even the people who created the blockchain. Your money is controlled by your private key, and only your private key.' },
          { t: 'callout', title: 'Trustless ≠ No trust required', c: '"Trustless" means you do not need to trust a specific person or company. You still trust the code — but the code is open-source and audited by thousands of developers worldwide.', variant: 'info' },
        ],
      },
      {
        id: 'types',
        title: 'Types of blockchains',
        accordion: true,
        blocks: [
          { t: 'compare',
            left:  { label: 'Public Blockchains', items: ['Anyone can join and participate', 'Fully transparent — all transactions visible', 'Decentralized — no single controller', 'Examples: Bitcoin, Ethereum, Solana'] },
            right: { label: 'Private Blockchains', items: ['Access controlled by an organization', 'Transactions can be private', 'More centralized but more efficient', 'Examples: Hyperledger, Quorum'] },
          },
          { t: 'p', c: 'There are also "Layer 2" networks (like Polygon, Arbitrum, Optimism) that run on top of public blockchains to make transactions faster and cheaper — while still settling final security on the main chain.' },
        ],
      },
    ],

    keyTerms: [
      { term: 'Block',       def: 'A container holding a batch of validated transactions plus metadata (hash, timestamp, previous hash).' },
      { term: 'Hash',        def: 'A unique digital fingerprint generated from any piece of data. Changing the data changes the hash entirely.' },
      { term: 'Node',        def: 'A computer participating in the blockchain network, storing a full copy of the ledger.' },
      { term: 'Consensus',   def: 'The process by which all nodes in the network agree on which transactions are valid and in what order.' },
      { term: 'Immutability',def: 'The property of blockchain data that makes it permanent and unchangeable once confirmed.' },
      { term: 'Decentralized', def: 'Distributed across many nodes with no single point of control or failure.' },
    ],

    relatedSlugs: ['what-is-crypto', 'what-is-smart-contract', 'what-is-defi'],
  },

  // ─── 3. What is Crypto ─────────────────────────────────────────────────────
  {
    slug:        'what-is-crypto',
    title:       'What is Cryptocurrency?',
    subtitle:    'Digital money secured by mathematics and running on blockchain',
    category:    'BASICS',
    readTime:    '6 min read',
    description: 'Cryptocurrency is digital money that runs on blockchain. No bank or government issues or controls it — transactions are secured by cryptography and validated by a global network.',
    intro:       'Cryptocurrency is digital money that runs on blockchain technology. Unlike the money in your bank account, no government prints it and no bank controls it. It is created, sent, and received through a global network of computers using cryptographic mathematics.',

    sections: [
      {
        id: 'what-makes-it-crypto',
        title: 'What makes it "crypto"?',
        accordion: false,
        blocks: [
          { t: 'p', c: 'The "crypto" in cryptocurrency refers to cryptography — the mathematical science of securing information. Every transaction on a blockchain is signed with a private key (a long string of random numbers) that is mathematically impossible to fake. Only the rightful owner of the private key can authorize a transaction.' },
          { t: 'p', c: 'This means two strangers can transact directly — without a bank in the middle to verify identity or hold funds. The cryptography does the verification work instead.' },
        ],
      },
      {
        id: 'bitcoin-ethereum-others',
        title: 'Bitcoin, Ethereum, and altcoins — what is the difference?',
        accordion: true,
        blocks: [
          { t: 'ul', c: [
            'Bitcoin (BTC) — the first and largest cryptocurrency. Created in 2009. Designed to be digital gold: a scarce, censorship-resistant store of value. Fixed supply of 21 million coins.',
            'Ethereum (ETH) — the first programmable blockchain. Not just currency but a platform for smart contracts, DeFi, NFTs, and DAOs. Powers the majority of the Web3 ecosystem.',
            'Stablecoins (USDC, USDT, DAI) — crypto designed to maintain a stable price, usually pegged 1:1 to the US dollar. Used for payments, savings, and DeFi.',
            'Altcoins — all other cryptocurrencies. Some are built on Ethereum (ERC-20 tokens), others run on their own blockchains. Thousands exist, with varying legitimacy.',
          ]},
          { t: 'callout', title: 'Best entry point for most users', c: 'Stablecoins like USDC are often the most practical entry point. They have crypto\'s benefits (instant transfers, self-custody) without the price volatility — making them ideal for payments, savings, and cross-border transfers anywhere in the world.', variant: 'tip' },
        ],
      },
      {
        id: 'how-transactions-work',
        title: 'How does a crypto transaction work?',
        accordion: true,
        blocks: [
          { t: 'p', c: 'Every crypto user has a wallet with two components: a public address (like your bank account number — share it freely to receive funds) and a private key (like your PIN — never share this with anyone).' },
          { t: 'ol', c: [
            'You create a transaction: "Send 0.01 ETH to wallet address 0x123..."',
            'You sign the transaction with your private key (your wallet does this automatically)',
            'The signed transaction is broadcast to the blockchain network',
            'Nodes verify your signature is valid and you have sufficient funds',
            'The transaction is included in the next block',
            'After a few block confirmations, the transaction is final and irreversible',
          ]},
          { t: 'callout', title: 'Gas fees', c: 'Most blockchain transactions require a small fee paid to the validators who process them. On Ethereum, this is called "gas." On faster chains like Polygon or BNB Chain, fees are fractions of a cent.', variant: 'info' },
        ],
      },
      {
        id: 'mining-staking',
        title: 'How is new cryptocurrency created?',
        accordion: true,
        blocks: [
          { t: 'compare',
            left:  { label: 'Mining (Proof of Work)', items: ['Computers solve complex math puzzles', 'Winner adds the next block', 'Earns newly created crypto as reward', 'Energy-intensive', 'Used by Bitcoin'] },
            right: { label: 'Staking (Proof of Stake)', items: ['Validators lock up crypto as collateral', 'Randomly selected to add blocks', 'Earns transaction fees as reward', 'Energy-efficient', 'Used by Ethereum, Solana, most modern chains'] },
          },
        ],
      },
    ],

    keyTerms: [
      { term: 'Wallet',       def: 'Software or hardware that stores your private keys and lets you send/receive cryptocurrency.' },
      { term: 'Private Key',  def: 'A secret number that proves ownership of a wallet. Anyone with it controls the funds.' },
      { term: 'Public Address',def: 'Your crypto "account number" — safe to share. Derived mathematically from your private key.' },
      { term: 'Gas',          def: 'The fee paid to process a transaction on Ethereum and EVM-compatible chains.' },
      { term: 'Token',        def: 'A cryptocurrency that runs on an existing blockchain (e.g., USDC on Ethereum), as opposed to a native coin (ETH on Ethereum).' },
      { term: 'Staking',      def: 'Locking up cryptocurrency to participate in network validation and earn rewards.' },
    ],

    relatedSlugs: ['what-is-blockchain', 'custodial-vs-noncustodial', 'what-is-defi'],
  },

  // ─── 4. What is DeFi ───────────────────────────────────────────────────────
  {
    slug:        'what-is-defi',
    title:       'What is DeFi?',
    subtitle:    'Financial services without banks, built on smart contracts',
    category:    'PROTOCOLS',
    readTime:    '7 min read',
    description: 'DeFi (Decentralized Finance) recreates banking services — lending, borrowing, trading — using smart contracts instead of financial institutions.',
    intro:       'DeFi stands for Decentralized Finance. It is an ecosystem of financial services — lending, borrowing, trading, earning yield — built on blockchain using smart contracts. No banks, no brokers, no middlemen. Just code.',

    sections: [
      {
        id: 'finance-without-banks',
        title: 'Finance without a bank',
        accordion: false,
        blocks: [
          { t: 'p', c: 'When you borrow from a bank, they check your credit score, review your application, decide if you qualify, and charge you interest at a rate they set. This process takes days or weeks and excludes billions of people without formal credit history.' },
          { t: 'p', c: 'In DeFi, you deposit cryptocurrency as collateral into a smart contract. The contract automatically calculates what you can borrow based on programmatic rules. The transaction executes in seconds. No application. No approval. No discrimination.' },
          { t: 'p', c: 'The same logic applies to trading (decentralized exchanges), saving (yield protocols), and derivatives. Every financial service that banks and exchanges provide, DeFi rebuilds with code.' },
        ],
      },
      {
        id: 'core-services',
        title: 'Core DeFi services explained',
        accordion: true,
        blocks: [
          { t: 'ul', c: [
            'Decentralized Exchanges (DEX) — Trade crypto directly from your wallet. No account needed. Uniswap, Curve, and PancakeSwap are examples. They use "liquidity pools" instead of traditional order books.',
            'Lending & Borrowing — Deposit crypto to earn interest, or borrow against collateral. Aave and Compound are the leading protocols. Rates adjust automatically based on supply and demand.',
            'Stablecoins — DAI is a decentralized stablecoin created by MakerDAO. Users deposit ETH as collateral to generate DAI, maintaining the peg through smart contract incentives.',
            'Yield Farming — Provide liquidity or capital to protocols in exchange for token rewards. Returns vary from a few percent to sometimes thousands of percent for new protocols (with commensurate risk).',
            'Perpetuals & Derivatives — Trade leveraged positions on crypto prices. dYdX and GMX allow up to 50x leverage entirely on-chain.',
          ]},
        ],
      },
      {
        id: 'liquidity-pools',
        title: 'How do liquidity pools work?',
        accordion: true,
        blocks: [
          { t: 'p', c: 'A liquidity pool is a smart contract holding two (or more) tokens. Anyone can deposit tokens into the pool to become a "liquidity provider" and earn a share of trading fees.' },
          { t: 'p', c: 'When a trader swaps Token A for Token B, they add Token A to the pool and take Token B out. The price is determined by an Automated Market Maker (AMM) formula — typically x × y = k, where x and y are the pool balances and k is a constant. As the ratio of tokens in the pool changes, the price adjusts automatically.' },
          { t: 'callout', title: 'Impermanent Loss', c: 'If you provide liquidity and the price of the tokens diverges significantly, you may end up with less value than if you had just held the tokens. This is called "impermanent loss." It is one of the key risks for liquidity providers.', variant: 'warn' },
        ],
      },
      {
        id: 'risks',
        title: 'Risks of DeFi',
        accordion: true,
        blocks: [
          { t: 'ul', c: [
            'Smart contract bugs — Code vulnerabilities can be exploited. Billions have been lost in DeFi hacks. Always use audited protocols.',
            'Rug pulls — Malicious developers drain liquidity from protocols. Research teams before depositing.',
            'Liquidation risk — If your collateral value drops below the required threshold, the protocol automatically liquidates your position.',
            'Oracle manipulation — DeFi protocols often rely on external price feeds (oracles). If these are manipulated, funds can be stolen.',
            'Regulatory risk — DeFi operates in a legal gray area. Regulations are evolving globally.',
            'No insurance — Unlike bank deposits, DeFi funds are not insured. If a protocol fails, the loss is yours.',
          ]},
          { t: 'callout', title: 'Start small', c: 'If you are new to DeFi, start with small amounts on established protocols like Aave or Uniswap. Understand a protocol fully before committing significant capital.', variant: 'tip' },
        ],
      },
    ],

    keyTerms: [
      { term: 'DEX',             def: 'Decentralized Exchange. A trading platform running entirely on smart contracts with no central authority.' },
      { term: 'AMM',             def: 'Automated Market Maker. A pricing mechanism using a mathematical formula instead of order books.' },
      { term: 'Liquidity Pool',  def: 'Smart contract holding token reserves that traders swap against.' },
      { term: 'TVL',             def: 'Total Value Locked. The total value of crypto deposited in a DeFi protocol, used as a measure of its size.' },
      { term: 'Yield',           def: 'Returns earned by providing capital or liquidity to DeFi protocols.' },
      { term: 'Protocol',        def: 'In DeFi, a protocol is a set of smart contracts that provide a specific financial service.' },
    ],

    relatedSlugs: ['what-is-smart-contract', 'what-is-blockchain', 'what-is-dao'],
  },

  // ─── 5. What are NFTs ──────────────────────────────────────────────────────
  {
    slug:        'what-are-nfts',
    title:       'What are NFTs?',
    subtitle:    'Unique digital ownership recorded permanently on blockchain',
    category:    'ASSETS',
    readTime:    '5 min read',
    description: 'NFTs (Non-Fungible Tokens) are unique digital items whose ownership is verified on-chain. Unlike regular crypto, every NFT is one-of-a-kind and cannot be replicated.',
    intro:       'NFT stands for Non-Fungible Token. Where regular cryptocurrency is interchangeable (one Bitcoin equals any other Bitcoin), each NFT is completely unique. Ownership of each NFT is permanently recorded on a blockchain.',

    sections: [
      {
        id: 'fungible-vs-nonfungible',
        title: 'Fungible vs Non-Fungible — what does it mean?',
        accordion: false,
        blocks: [
          { t: 'p', c: '"Fungible" means interchangeable. A ₦1000 note is fungible — you can swap it for any other ₦1000 note and you still have exactly ₦1000. One Bitcoin equals any other Bitcoin. These are fungible assets.' },
          { t: 'p', c: '"Non-fungible" means unique and not interchangeable. A painting is non-fungible — the original Mona Lisa is categorically different from any copy. A house is non-fungible — 5 Victoria Island and 5 Ikoyi are different properties.' },
          { t: 'p', c: 'NFTs apply this concept to digital files. Each NFT has a unique identifier on the blockchain that proves it is distinct from all other tokens. The ownership record is permanent and publicly verifiable.' },
        ],
      },
      {
        id: 'what-can-be-nft',
        title: 'What can be an NFT?',
        accordion: true,
        blocks: [
          { t: 'ul', c: [
            'Digital art and collectibles (the original use case — CryptoPunks, Bored Apes)',
            'Music and video — artists sell directly to fans without labels',
            'Gaming items — in-game skins, weapons, land that players truly own',
            'Domain names — ENS (.eth) domains as NFTs',
            'Event tickets — with built-in royalties to creators on resale',
            'Memberships — token-gated access to communities or content',
            'Real estate deeds — tokenized property ownership',
            'Loyalty points — airline miles, reward points as tradeable NFTs',
          ]},
        ],
      },
      {
        id: 'how-ownership-works',
        title: 'How does NFT ownership actually work?',
        accordion: true,
        blocks: [
          { t: 'p', c: 'The NFT itself is not the digital file (the image, video, music). It is the proof of ownership recorded on the blockchain. The file is usually stored separately — on IPFS (a decentralized file network) or sometimes on a regular server.' },
          { t: 'p', c: 'Think of it like this: owning an NFT is like owning the certificate of authenticity for a painting. The painting (file) might hang in a gallery or be on display publicly, but the certificate proves who owns the original.' },
          { t: 'callout', title: 'The metadata problem', c: 'If an NFT\'s image is stored on a centralized server (not IPFS), the company hosting it could delete or change the image. When evaluating NFTs, check where the metadata is stored. "On-chain" metadata is most permanent.', variant: 'warn' },
        ],
      },
      {
        id: 'why-value',
        title: 'Why do NFTs have value?',
        accordion: true,
        blocks: [
          { t: 'p', c: 'NFTs derive value from the same factors as any collectible: scarcity, provenance, and utility.' },
          { t: 'ul', c: [
            'Scarcity — A collection with 10 NFTs is rarer than one with 10,000',
            'Provenance — Blockchain proves the history of ownership. A verified original from a famous artist is worth more than a copy.',
            'Utility — NFTs that unlock real-world benefits (event access, royalty shares, gaming items) have functional value beyond speculation.',
            'Community — Being part of an exclusive holder community can have social and networking value.',
          ]},
          { t: 'callout', title: 'Market cycles', c: 'The NFT market is highly volatile and largely speculative. Many NFT collections have lost 90%+ of their value. Utility and long-term community are stronger foundations for value than hype alone.', variant: 'warn' },
        ],
      },
    ],

    keyTerms: [
      { term: 'ERC-721',   def: 'The Ethereum token standard for NFTs. Each token has a unique ID.' },
      { term: 'ERC-1155',  def: 'A token standard that supports both fungible and non-fungible tokens in one contract — used in gaming.' },
      { term: 'Minting',   def: 'The process of creating a new NFT on the blockchain.' },
      { term: 'Metadata',  def: 'The data describing an NFT — name, description, image URL, attributes.' },
      { term: 'IPFS',      def: 'InterPlanetary File System. A decentralized network for storing NFT files permanently.' },
      { term: 'Royalties', def: 'A percentage of secondary sales automatically paid to the original creator via smart contract.' },
    ],

    relatedSlugs: ['what-is-blockchain', 'what-is-smart-contract', 'what-are-rwa'],
  },

  // ─── 6. What are RWA ───────────────────────────────────────────────────────
  {
    slug:        'what-are-rwa',
    title:       'What are Real World Assets (RWA)?',
    subtitle:    'Bringing physical and traditional financial assets on-chain',
    category:    'ASSETS',
    readTime:    '6 min read',
    description: 'RWAs are physical or traditional financial assets — real estate, bonds, gold — represented as tokens on a blockchain, making them instantly tradeable, globally accessible, and programmable.',
    intro:       'Real World Assets (RWAs) are physical or traditional financial assets tokenized on a blockchain. Stocks, bonds, real estate, gold, invoices — any asset with real-world value can be represented as a digital token and traded 24/7 on-chain.',

    sections: [
      {
        id: 'the-problem',
        title: 'The problem with traditional assets',
        accordion: false,
        blocks: [
          { t: 'p', c: 'Most of the world\'s wealth — estimated at over $600 trillion — sits in traditional assets: real estate, bonds, private equity, commodities. These markets are slow (days to settle), expensive (brokers, banks, lawyers), geographically restricted, and inaccessible to most of the world.' },
          { t: 'p', c: 'A retail investor in Asia cannot easily access US Treasury bonds. A small business owner in Europe cannot buy a fraction of a commercial building in New York. Settlement of stock trades takes two business days (T+2). Interest from bonds is paid monthly, not instantly.' },
          { t: 'p', c: 'RWA tokenization changes all of this.' },
        ],
      },
      {
        id: 'examples',
        title: 'Real-world examples of RWAs',
        accordion: true,
        blocks: [
          { t: 'ul', c: [
            'US Treasury Bonds — BlackRock\'s BUIDL fund (launched 2024) tokenized US Treasury bills on Ethereum. Franklin Templeton\'s BENJI fund manages $400M+ in tokenized treasuries.',
            'Real Estate — Platforms like RealT allow fractional ownership of US rental properties. Buy 1% of a Detroit property for $50 and receive rent in stablecoin daily.',
            'Private Credit — Centrifuge and Goldfinch tokenize business invoices and loans, allowing DeFi capital to flow into real-world lending.',
            'Commodities — Gold (PAX Gold), silver, and oil can be held as ERC-20 tokens representing physical ownership.',
            'Carbon Credits — Toucan and KlimaDAO tokenize carbon credits, enabling transparent carbon offset markets.',
            'Stablecoins — USDC and USDT are themselves backed by real-world assets (US dollars, treasury bills). They are the largest RWA category by value.',
          ]},
        ],
      },
      {
        id: 'how-tokenization-works',
        title: 'How does RWA tokenization work?',
        accordion: true,
        blocks: [
          { t: 'ol', c: [
            'A real-world asset is legally structured (often inside a Special Purpose Vehicle or trust)',
            'A legal agreement ties the SPV to a smart contract on-chain',
            'The smart contract issues tokens representing fractional ownership',
            'Token holders have legal rights to the underlying asset (rent, interest, dividends)',
            'Tokens can be traded on-chain 24/7 — no broker required',
            'Compliance (KYC/AML) is built into the smart contract',
          ]},
          { t: 'callout', title: 'The missing piece: legal enforcement', c: 'Token ownership on-chain is only as good as the legal framework backing it. The best RWA protocols work with licensed custodians and law firms to ensure token holders have legally enforceable rights. Always verify the legal structure before investing.', variant: 'warn' },
        ],
      },
      {
        id: 'why-matters',
        title: 'Why RWAs are the next big frontier',
        accordion: true,
        blocks: [
          { t: 'ul', c: [
            '24/7 global markets — trade real estate or bonds at 3am on a Sunday',
            'Fractional ownership — access to assets previously requiring millions of dollars',
            'Instant settlement — T+0 instead of T+2 for traditional markets',
            'Programmable yields — receive dividends directly to your wallet, automatically',
            'Composability — RWA tokens can be used as collateral in DeFi lending protocols',
            'Financial inclusion — anyone with a smartphone and internet can participate',
          ]},
          { t: 'p', c: 'Boston Consulting Group estimates that tokenized illiquid assets could be a $16 trillion market by 2030. The tokenization of US Treasuries alone exceeded $1 billion in 2024 — and this is just the beginning.' },
        ],
      },
    ],

    keyTerms: [
      { term: 'RWA',          def: 'Real World Asset. A physical or traditional financial asset represented as a blockchain token.' },
      { term: 'SPV',          def: 'Special Purpose Vehicle. A legal entity used to hold real-world assets backing blockchain tokens.' },
      { term: 'Tokenization', def: 'The process of creating a digital token on a blockchain that represents ownership of a real-world asset.' },
      { term: 'Fractional',   def: 'Dividing ownership of an asset into many smaller pieces, enabling broader participation.' },
      { term: 'Yield',        def: 'Returns generated by an asset — rent from property, interest from bonds, dividends from stocks.' },
    ],

    relatedSlugs: ['what-are-nfts', 'what-is-defi', 'what-is-smart-contract'],
  },

  // ─── 7. Custodial vs Non-custodial ─────────────────────────────────────────
  {
    slug:        'custodial-vs-noncustodial',
    title:       'Custodial vs Non-Custodial Wallets',
    subtitle:    'Who holds your keys determines who controls your crypto',
    category:    'WALLETS',
    readTime:    '5 min read',
    description: 'The most important decision in crypto: do you hold your own keys, or does someone else? Understanding this distinction is fundamental to crypto ownership.',
    intro:       '"Not your keys, not your coins." This famous phrase captures the most important concept in crypto security. A crypto wallet does not store your coins — it stores the cryptographic keys that prove you own them. Who controls those keys controls everything.',

    sections: [
      {
        id: 'custodial',
        title: 'Custodial wallets — the convenient option',
        accordion: false,
        blocks: [
          { t: 'p', c: 'When you create an account on Coinbase, Binance, Luno, or any centralized exchange, they generate a wallet for you — but they hold the private keys. You see a balance in your account, but technically, you hold an IOU from the exchange.' },
          { t: 'p', c: 'This is similar to keeping money in a bank. Convenient, comes with customer support, and if you forget your password you can recover access. But the exchange can:' },
          { t: 'ul', c: [
            'Freeze your account (at request of regulators or for policy reasons)',
            'Restrict withdrawals (as happened with many exchanges during market crises)',
            'Lose your funds (if they are hacked, as happened with FTX, Mt. Gox, and many others)',
            'Block access in certain countries',
          ]},
          { t: 'callout', title: 'FTX Collapse — a cautionary tale', c: 'In 2022, FTX — one of the world\'s largest crypto exchanges — collapsed and declared bankruptcy. Users who held crypto on FTX lost access to billions of dollars in funds. Those who held their own keys were unaffected.', variant: 'warn' },
        ],
      },
      {
        id: 'noncustodial',
        title: 'Non-custodial wallets — true ownership',
        accordion: true,
        blocks: [
          { t: 'p', c: 'With a non-custodial wallet (MetaMask, Phantom, Trust Wallet, Ledger), you generate and hold your own private keys. Your wallet is not an account on someone\'s server — it is a local set of keys that give you direct access to your funds on the blockchain.' },
          { t: 'p', c: 'Nobody can freeze your wallet. Nobody can prevent you from sending transactions. Nobody can take your funds without your private key (or seed phrase). You are the sole custodian.' },
          { t: 'ul', c: [
            'You control the keys → you control the funds',
            'Required for DeFi, NFTs, and most Web3 applications',
            'No account required — no name, email, or ID needed',
            'Works globally without geographic restrictions',
            'If you lose your seed phrase, recovery is impossible',
          ]},
        ],
      },
      {
        id: 'comparison',
        title: 'Side-by-side comparison',
        accordion: true,
        blocks: [
          { t: 'compare',
            left: { label: 'Custodial (Exchange)', items: [
              'Exchange holds your private keys',
              'Account recovery available',
              'Can be frozen or restricted',
              'Counterparty risk (exchange failure)',
              'Cannot use DeFi directly',
              'Easy for beginners',
            ]},
            right: { label: 'Non-Custodial (Self-Custody)', items: [
              'You hold your own keys',
              'No recovery if seed phrase is lost',
              'Cannot be frozen by anyone',
              'No counterparty risk',
              'Full access to DeFi and Web3',
              'Requires more responsibility',
            ]},
          },
        ],
      },
      {
        id: 'which-to-use',
        title: 'Which should you use?',
        accordion: true,
        blocks: [
          { t: 'ul', c: [
            'Just starting with crypto → custodial exchange to learn',
            'Holding significant value long-term → hardware wallet (Ledger, Trezor)',
            'Using DeFi, NFTs, or Web3 apps → non-custodial software wallet (MetaMask)',
            'Maximum security with large holdings → hardware wallet + multi-sig setup',
          ]},
          { t: 'callout', title: 'Best practice', c: 'Many experienced crypto users keep small amounts on exchanges for convenience, and the bulk of their holdings in a non-custodial hardware wallet. Never keep all funds in one place.', variant: 'tip' },
        ],
      },
    ],

    keyTerms: [
      { term: 'Private Key',    def: 'A secret cryptographic key that proves ownership and authorizes transactions. Never share.' },
      { term: 'Seed Phrase',    def: '12 or 24 words that are the master backup of your wallet. Whoever has these words controls all derived wallets.' },
      { term: 'Hot Wallet',     def: 'A wallet connected to the internet. Convenient but more vulnerable to hacking.' },
      { term: 'Cold Wallet',    def: 'A wallet kept offline (hardware device or paper). More secure for long-term storage.' },
      { term: 'Counterparty Risk', def: 'The risk that another party (an exchange) will fail to fulfill their obligations.' },
    ],

    relatedSlugs: ['non-custodial-wallet-detail', 'what-is-crypto', 'what-is-awarizon'],
  },

  // ─── 8. Non-custodial wallet in detail ─────────────────────────────────────
  {
    slug:        'non-custodial-wallet-detail',
    title:       'Non-Custodial Wallets in Detail',
    subtitle:    'Everything you need to know to use and protect a self-custody wallet',
    category:    'WALLETS',
    readTime:    '8 min read',
    description: 'A deep dive into how non-custodial wallets work: seed phrases, private keys, types of wallets, security best practices, and how to avoid the most common scams.',
    intro:       'A non-custodial wallet gives you complete sovereignty over your digital assets. No bank, exchange, or company stands between you and your funds. This power comes with responsibility — understanding how these wallets work is essential for using them safely.',

    sections: [
      {
        id: 'how-it-works',
        title: 'How a non-custodial wallet actually works',
        accordion: false,
        blocks: [
          { t: 'p', c: 'When you create a non-custodial wallet, the app generates a random seed phrase — 12 or 24 ordinary words (like "apple ocean bridge trumpet..."). This seed phrase is not stored anywhere on the internet. It exists only where you write it down.' },
          { t: 'p', c: 'From this seed phrase, the wallet mathematically derives your private keys (one per blockchain), and from each private key, your public address. The relationship is one-way: you can go from seed phrase → private key → public address, but not backwards.' },
          { t: 'ol', c: [
            'Seed phrase (12-24 words) — master backup, stored only by you',
            'Private key — derived from seed phrase, authorizes transactions',
            'Public address — derived from private key, safe to share (your "account number")',
            'Balance — stored on the blockchain, not in your wallet',
          ]},
          { t: 'callout', title: 'Your wallet does not hold crypto', c: 'This is a common misconception. Your crypto balance exists on the blockchain — a global public ledger. Your wallet holds the keys that prove you can move that balance. If you lose the keys but know your seed phrase, you can restore access on any compatible wallet app.', variant: 'info' },
        ],
      },
      {
        id: 'types',
        title: 'Types of non-custodial wallets',
        accordion: true,
        blocks: [
          { t: 'ul', c: [
            'Software Wallets (Hot) — MetaMask, Phantom, Rainbow, Trust Wallet. Apps on your phone or browser. Connected to internet. Convenient for daily use and DeFi. Vulnerable if your device is compromised.',
            'Hardware Wallets (Cold) — Ledger, Trezor, Keystone. Physical devices that sign transactions offline. Private key never touches the internet. Best for large or long-term holdings. Costs $70–$250.',
            'Paper Wallets — Private key printed or written on paper. Maximum cold storage, not practical for regular use. Risk: physical damage, loss, or theft.',
            'Multi-Signature Wallets — Require M-of-N private key signatures to authorize a transaction (e.g., 2 of 3 keys). Used by institutions, DAOs, and for shared treasuries. Safe from single points of failure.',
            'Smart Contract Wallets — Accounts controlled by smart contract code rather than a private key. Enable account recovery, spending limits, and social recovery. Examples: Argent, Safe.',
          ]},
        ],
      },
      {
        id: 'security',
        title: 'Security best practices',
        accordion: true,
        blocks: [
          { t: 'ul', c: [
            'Never share your seed phrase with anyone — no legitimate service will ever ask for it',
            'Never enter your seed phrase online or in any app except your wallet\'s official restore screen',
            'Store your seed phrase offline — write it on paper, or engrave it on metal for fire/water resistance',
            'Make multiple backups in different physical locations',
            'Use a hardware wallet for holdings over $500',
            'Use separate wallets for different purposes (one for DeFi, one for long-term storage)',
            'Verify transaction details before signing — especially the contract address',
            'Use wallets with transaction simulation (Rabby, MetaMask Snaps) that show what a transaction will do before you sign',
          ]},
          { t: 'callout', title: 'The $5 wrench attack', c: 'Physical security matters too. If people know you hold significant crypto, you become a target for robbery. Do not publicly disclose the size of your holdings. Consider a multi-sig or hardware wallet with a hidden passphrase.', variant: 'warn' },
        ],
      },
      {
        id: 'scams',
        title: 'Common scams and how to avoid them',
        accordion: true,
        blocks: [
          { t: 'ul', c: [
            'Fake support scams — Someone in Discord or Twitter DMs offers to "help" and asks for your seed phrase. Real support will never ask for this. Ignore and block.',
            'Phishing sites — Sites that look like MetaMask, Ledger, or other wallets but steal credentials. Always verify URLs and bookmark legitimate sites.',
            '"Unlimited approval" scams — DeFi protocols ask you to "approve" spending of your tokens. Some malicious contracts request unlimited approval. Always set a specific allowance and revoke approvals you no longer need (use revoke.cash).',
            'Airdrop scams — Unknown tokens appear in your wallet. Interacting with them (even to sell) can trigger malicious code. Never interact with tokens you did not acquire intentionally.',
            'Fake wallet apps — Counterfeit MetaMask or Trust Wallet apps on app stores. Download only from official sites, not from search results.',
          ]},
        ],
      },
    ],

    keyTerms: [
      { term: 'BIP-39',         def: 'The Bitcoin standard defining the list of 2048 words used in seed phrases. Most wallets use this standard.' },
      { term: 'HD Wallet',      def: 'Hierarchical Deterministic wallet. Generates many key pairs from one seed phrase using a tree structure.' },
      { term: 'Derivation Path',def: 'The mathematical formula used to derive a specific key from a seed phrase (e.g., m/44\'/60\'/0\'/0/0 for Ethereum).' },
      { term: 'Passphrase',     def: 'An optional 25th word added to the seed phrase, creating a hidden wallet. Increases security significantly.' },
      { term: 'Token Approval', def: 'Permission granted to a smart contract to spend tokens from your wallet up to a specified amount.' },
      { term: 'Multi-sig',      def: 'Multi-signature. Requiring multiple private key signatures to authorize a transaction.' },
    ],

    relatedSlugs: ['custodial-vs-noncustodial', 'what-is-crypto', 'what-is-smart-contract'],
  },

  // ─── 9. Smart Contracts ────────────────────────────────────────────────────
  {
    slug:        'what-is-smart-contract',
    title:       'What is a Smart Contract?',
    subtitle:    'Self-executing code that runs on blockchain without any middleman',
    category:    'PROTOCOLS',
    readTime:    '6 min read',
    description: 'Smart contracts are programs stored on a blockchain that execute automatically when conditions are met — no lawyers, banks, or intermediaries required.',
    intro:       'A smart contract is a program stored on a blockchain. When specific conditions are met, it executes automatically — transferring funds, minting tokens, recording votes, or enforcing agreements. No human needs to be involved. The code is the contract.',

    sections: [
      {
        id: 'vending-machine',
        title: 'The vending machine analogy',
        accordion: false,
        blocks: [
          { t: 'p', c: 'A vending machine is the closest real-world analogy to a smart contract. You insert money, select item D3, and the machine delivers your snack. No cashier. No approval. No negotiation. The machine executes the transaction automatically based on pre-programmed rules.' },
          { t: 'p', c: 'Smart contracts work identically, but instead of dispensing snacks, they can: send cryptocurrency, issue tokens, record NFT ownership, execute trades, distribute governance votes, or enforce any conditional agreement — all without human intervention.' },
          { t: 'p', c: 'The key difference from a vending machine: smart contracts run on a blockchain, making them transparent (anyone can read the code), immutable (cannot be changed after deployment), and trustless (no company or person can manipulate the outcome).' },
        ],
      },
      {
        id: 'how-they-work',
        title: 'How smart contracts work technically',
        accordion: true,
        blocks: [
          { t: 'ol', c: [
            'A developer writes the contract in Solidity (Ethereum) or Rust (Solana)',
            'The code is compiled and deployed to the blockchain — permanent and public',
            'The contract has an address, just like a wallet',
            'Anyone can call the contract\'s functions by sending a transaction to its address',
            'The contract reads inputs, executes logic, updates state, and emits events',
            'The result is permanently recorded on the blockchain',
            'Gas fees are charged for computation',
          ]},
          { t: 'callout', title: 'Immutability cuts both ways', c: 'Once deployed, a smart contract cannot be changed. This means bugs cannot be fixed unless the contract has an explicit upgrade mechanism. This is why smart contract audits are critical — and why $4 billion+ has been lost to contract exploits.', variant: 'warn' },
        ],
      },
      {
        id: 'use-cases',
        title: 'What can smart contracts do?',
        accordion: true,
        blocks: [
          { t: 'ul', c: [
            'DeFi — Power decentralized lending (Aave), trading (Uniswap), and stablecoins (MakerDAO)',
            'NFTs — Mint tokens, enforce royalty payments to creators on every secondary sale',
            'DAOs — Count governance votes and automatically execute winning proposals',
            'Payments — Release escrow payments when delivery conditions are confirmed',
            'Insurance — Automatically pay flight delay insurance if an oracle confirms a delay',
            'Tokenization — Issue tokens representing real-world assets and automate distributions',
            'Identity — Verify and store credentials on-chain without centralized databases',
            'Awarizon — Smart contract automation replaces manual business workflows with programmable, auditable processes',
          ]},
        ],
      },
      {
        id: 'oracles',
        title: 'The oracle problem',
        accordion: true,
        blocks: [
          { t: 'p', c: 'Smart contracts are isolated on the blockchain — they cannot access the real world directly. They cannot check Bitcoin\'s current price, confirm a flight was delayed, or verify that a package was delivered.' },
          { t: 'p', c: 'Oracles are services that feed real-world data into smart contracts. Chainlink is the largest oracle network, providing price feeds, weather data, sports scores, and more to thousands of smart contracts.' },
          { t: 'callout', title: 'Oracle risk', c: 'If an oracle provides incorrect data (through error or manipulation), the smart contract executes based on wrong inputs. Many DeFi hacks exploit manipulated price oracles. Quality oracle design is as important as quality contract code.', variant: 'warn' },
        ],
      },
    ],

    keyTerms: [
      { term: 'Solidity',  def: 'The primary programming language for Ethereum smart contracts.' },
      { term: 'ABI',       def: 'Application Binary Interface. Defines how to interact with a smart contract\'s functions.' },
      { term: 'Gas',       def: 'Computational fee paid to execute smart contract operations on the blockchain.' },
      { term: 'Oracle',    def: 'A service that feeds real-world data into smart contracts.' },
      { term: 'Audit',     def: 'A security review of smart contract code by specialist firms to identify vulnerabilities before deployment.' },
      { term: 'EVM',       def: 'Ethereum Virtual Machine. The runtime environment that executes smart contract code.' },
    ],

    relatedSlugs: ['what-is-blockchain', 'what-is-defi', 'what-is-dao'],
  },

  // ─── 10. DAO ───────────────────────────────────────────────────────────────
  {
    slug:        'what-is-dao',
    title:       'What is a DAO?',
    subtitle:    'Organizations governed by code and token holder votes — no CEO required',
    category:    'GOVERNANCE',
    readTime:    '5 min read',
    description: 'A DAO (Decentralized Autonomous Organization) is an organization where governance rules are written into a smart contract and decisions are made by token holders through on-chain voting.',
    intro:       'A DAO is a Decentralized Autonomous Organization. It is a new form of collective ownership and governance where rules are encoded in smart contracts, decisions are made by token holder votes, and treasuries are controlled by code — not by a CEO, board, or government.',

    sections: [
      {
        id: 'traditional-vs-dao',
        title: 'Traditional organizations vs DAOs',
        accordion: false,
        blocks: [
          { t: 'p', c: 'In a traditional company, a CEO and board make decisions. Shareholders vote annually on major issues (if they hold enough shares). The company bank account is controlled by executives. You trust the people at the top to act in everyone\'s interest.' },
          { t: 'p', c: 'In a DAO, governance rules are written into a smart contract. Any token holder can submit a proposal. All holders vote on-chain. If the vote passes the required threshold, the smart contract executes the decision automatically — releasing funds, changing parameters, or upgrading the protocol. No CEO needs to sign off.' },
          { t: 'compare',
            left: { label: 'Traditional Organization', items: ['CEO/board makes decisions', 'Annual shareholder votes', 'Bank controls treasury', 'Jurisdiction-specific laws', 'Geographic headquarters'] },
            right: { label: 'DAO', items: ['Token holders vote on decisions', 'Continuous on-chain governance', 'Smart contract controls treasury', 'Code enforces rules globally', 'Exists purely on-chain'] },
          },
        ],
      },
      {
        id: 'how-voting-works',
        title: 'How DAO voting works',
        accordion: true,
        blocks: [
          { t: 'ol', c: [
            'A community member submits a proposal (on Snapshot for off-chain signaling, or directly on-chain)',
            'The proposal includes a description, the on-chain action to execute, and a voting period (typically 3–7 days)',
            'Token holders vote: 1 token = 1 vote in most DAOs (some use quadratic voting to reduce whale influence)',
            'If the vote passes the quorum (minimum participation) and approval threshold (e.g., 60%), the proposal is queued',
            'After a time lock period (security delay), anyone can trigger execution',
            'The smart contract automatically executes the approved action — no human approval needed',
          ]},
        ],
      },
      {
        id: 'examples',
        title: 'Real DAO examples',
        accordion: true,
        blocks: [
          { t: 'ul', c: [
            'MakerDAO — Governs the DAI stablecoin. MKR token holders vote on collateral types, stability fees, and protocol upgrades. Treasury holds hundreds of millions in RWAs.',
            'Uniswap DAO — Controls the $2B+ Uniswap treasury. UNI holders have voted on fee distributions, protocol upgrades, and grants.',
            'Compound Finance — Governs the Compound lending protocol. COMP holders control interest rate models and asset listings.',
            'Nouns DAO — One NFT auctioned daily. Each NFT is a vote. Treasury grows by one ETH per day and funds public goods projects.',
            'Friends with Benefits (FWB) — Cultural DAO. Token holders access an exclusive community of creators, builders, and artists.',
            'Constitution DAO — In 2021, raised $47M in ETH in 72 hours trying to buy a copy of the US Constitution. Lost the auction but proved DAOs can mobilize capital at speed.',
          ]},
        ],
      },
      {
        id: 'challenges',
        title: 'Challenges and criticisms of DAOs',
        accordion: true,
        blocks: [
          { t: 'ul', c: [
            'Low participation — Most token holders do not vote. Governance often dominated by a small, active minority.',
            'Plutocracy — Large token holders (whales) can dominate votes. 1 token = 1 vote naturally favors wealth.',
            'Slow decisions — On-chain governance takes days to weeks. Emergency responses are difficult.',
            'Legal uncertainty — Which laws govern a DAO? Are token holders liable? Most jurisdictions lack clear answers.',
            'Smart contract risk — If governance contracts have vulnerabilities, attackers can drain treasuries through malicious proposals.',
            'Complexity for new users — Voting, delegation, and proposal creation are not user-friendly for non-technical participants.',
          ]},
          { t: 'callout', title: 'The future of DAOs', c: 'Despite challenges, DAOs represent a genuinely new model for human coordination. They are most effective for treasury management, protocol governance, and community ownership. Legal wrappers (Wyoming DAO LLC, Marshall Islands DAO) are emerging to give DAOs legal standing.', variant: 'info' },
        ],
      },
    ],

    keyTerms: [
      { term: 'Governance Token', def: 'A token that grants voting rights in a DAO. Holding more tokens means more voting power.' },
      { term: 'Proposal',         def: 'A suggested change or action submitted for DAO vote, including the on-chain transaction to execute.' },
      { term: 'Quorum',           def: 'The minimum percentage of tokens that must vote for a proposal to be valid.' },
      { term: 'Snapshot',         def: 'An off-chain voting tool used by many DAOs for gasless, non-binding governance signaling.' },
      { term: 'Time Lock',        def: 'A mandatory delay between a vote passing and its execution, allowing the community to react to malicious proposals.' },
      { term: 'Multi-sig',        def: 'Multi-signature wallet often used as DAO treasury control requiring several signers to approve transactions.' },
    ],

    relatedSlugs: ['what-is-smart-contract', 'what-is-defi', 'what-is-blockchain'],
  },
]

export function getArticle(slug: string): Article | undefined {
  return LEARN_ARTICLES.find((a) => a.slug === slug)
}

export function getRelatedArticles(slugs: string[]): Article[] {
  return slugs.map((s) => getArticle(s)).filter(Boolean) as Article[]
}
