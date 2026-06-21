import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

const siteName = "Awarizon";
const siteUrl = "https://awarizon.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${siteName} — Build Production Web3 Apps on Any EVM Chain`,
    template: `%s | ${siteName}`,
  },

  description:
    "Ship faster with a typed EVM SDK that just works. React hooks, built-in wallet, SIWE auth, and React Native support — one API key, zero blockchain boilerplate.",

  keywords: [
    "web3 sdk",
    "evm sdk",
    "ethereum sdk typescript",
    "react web3 hooks",
    "blockchain developer tools",
    "smart contract hooks react",
    "useReadContract useWriteContract",
    "wagmi alternative",
    "viem wrapper",
    "sign in with ethereum",
    "siwe sdk",
    "erc20 hooks",
    "nft hooks react",
    "defi sdk javascript",
    "react native web3",
    "expo blockchain sdk",
    "base chain sdk",
    "polygon sdk",
    "arbitrum sdk",
    "web3 boilerplate",
    "create web3 app",
    "blockchain api key",
    "typed web3 typescript",
    "multicall react",
    "wallet connect sdk",
    "Awarizon",
    "awarizon sdk",
  ],

  authors: [{ name: "Awarizon", url: siteUrl }],
  creator: "Awarizon",
  publisher: "Awarizon",

  openGraph: {
    title: `${siteName} — Build Production Web3 Apps on Any EVM Chain`,
    description:
      "Typed SDK, React hooks, built-in wallet, SIWE auth, React Native support. From contract call to production dApp in minutes — not months.",
    url: siteUrl,
    siteName: siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Awarizon — EVM SDK for Web3 Developers",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Build Production Web3 Apps on Any EVM Chain`,
    description:
      "Typed SDK, React hooks, built-in wallet, SIWE auth, React Native support. From contract call to production dApp in minutes — not months.",
    site: "@awarizon",
    creator: "@awarizon",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Awarizon",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "Awarizon builds production-grade EVM tooling for Web3 developers. One SDK, any chain — ship smart contract apps faster with typed React hooks, built-in wallet management, and mobile support.",
  email: "hello@awarizon.com",
  areaServed: "Worldwide",
  sameAs: [
    "https://twitter.com/awarizon",
    "https://linkedin.com/company/awarizon",
    "https://www.npmjs.com/org/awarizon",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@awarizon.com",
    contactType: "developer support",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Awarizon",
  url: siteUrl,
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Awarizon SDK",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Node.js, Browser, iOS, Android",
  url: `${siteUrl}/sdk`,
  description:
    "Production-grade EVM SDK for Web3 developers. Typed React hooks for reads, writes, wallet management, SIWE auth, and multicall — across Base, Ethereum, Polygon, Arbitrum, and more.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Awarizon",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />

        {/* Ambient overlays */}
        <div className="scan-overlay" />
        <div className="noise-overlay" />

        <ClientShell>{children}</ClientShell>

        {/* Global progress bar */}
        <div
          id="progress-bar"
          className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left scale-x-0"
          style={{ background: "var(--accent)" }}
        />
      </body>
    </html>
  );
}
