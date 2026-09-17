import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Layer",
  description:
    "Enter the Awarizon system. Build with us, integrate digital infrastructure via API, or deploy on-chain products to your market — anywhere in the world.",
  openGraph: {
    title: "Access Layer | Awarizon",
    description:
      "Enter the Awarizon system. Build with us, integrate infrastructure via API, or deploy on-chain products to your market.",
  },
  twitter: {
    title: "Access Layer | Awarizon",
    description:
      "Enter the Awarizon system — build, integrate, or deploy. The gateway to global web3 infrastructure.",
  },
  alternates: {
    canonical: "https://awarizon.com/access",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
