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
    "wallet connect sdk",
    "Awarizon",
  ],

  authors: [{ name: "Awarizon", url: siteUrl }],
  creator: "Awarizon",
  publisher: "Awarizon",

  openGraph: {
    title: `${siteName} — Build Production Web3 Apps on Any EVM Chain`,
    description:
      "Typed SDK, React hooks, built-in wallet, SIWE auth, React Native support. From contract call to production dApp in minutes — not months.",

    url: siteUrl,
    siteName,
    locale: "en_US",
    type: "website",

    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Awarizon — EVM SDK for Web3 Developers",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: `${siteName} — Build Production Web3 Apps on Any EVM Chain`,

    description:
      "Typed SDK, React hooks, built-in wallet, SIWE auth, React Native support. From contract call to production dApp in minutes — not months.",

    creator: "@awarizon",
    site: "@awarizon",

    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        alt: "Awarizon — EVM SDK for Web3 Developers",
      },
    ],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      {
        url: "/logo.png",
      },
    ],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased">
        <ClientShell>{children}</ClientShell>

        {/* Global progress bar — driven by Navigation.tsx's scroll handler */}
        <div
          id="progress-bar"
          className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left scale-x-0"
          style={{ background: "var(--accent)" }}
        />
      </body>
    </html>
  );
}