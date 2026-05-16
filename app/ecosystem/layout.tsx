import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecosystem Logic",
  description:
    "The Awarizon ecosystem connects infrastructure, distribution, consumer products, and feedback loops into one coherent system for technology adoption in Nigeria and emerging markets.",
  openGraph: {
    title: "Ecosystem Logic | Awarizon",
    description:
      "Everything connected. The Awarizon ecosystem links infrastructure, distribution, consumer products, and feedback loops into one coherent system.",
  },
  twitter: {
    title: "Ecosystem Logic | Awarizon",
    description:
      "Infrastructure, distribution, consumer products, and feedback loops — all connected in the Awarizon ecosystem.",
  },
  alternates: {
    canonical: "https://awarizon.com/ecosystem",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
