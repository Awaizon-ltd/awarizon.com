import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Layer",
  description:
    "Enter the Awarizon system. Build with us, integrate digital infrastructure via API, or deploy consumer products like Zela to your market in Nigeria and West Africa.",
  openGraph: {
    title: "Access Layer | Awarizon",
    description:
      "Enter the Awarizon system. Build with us, integrate infrastructure via API, or deploy Zela consumer products to your market.",
  },
  twitter: {
    title: "Access Layer | Awarizon",
    description:
      "Enter the Awarizon system — build, integrate, or deploy. The gateway to Nigeria's technology infrastructure.",
  },
  alternates: {
    canonical: "https://awarizon.com/access",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
