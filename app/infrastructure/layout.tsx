import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infrastructure Layer",
  description:
    "Awarizon builds modular digital infrastructure — wallet systems, payments engines, identity layers, APIs, and business automation — designed for how developers and businesses actually build on-chain.",
  openGraph: {
    title: "Infrastructure Layer | Awarizon",
    description:
      "Modular digital infrastructure — wallet systems, payments engines, identity layers, APIs, and automation — designed for how businesses actually work.",
  },
  twitter: {
    title: "Infrastructure Layer | Awarizon",
    description:
      "Wallet systems, payments engines, identity layers, APIs, and automation built for global on-chain infrastructure.",
  },
  alternates: {
    canonical: "https://awarizon.com/infrastructure",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
