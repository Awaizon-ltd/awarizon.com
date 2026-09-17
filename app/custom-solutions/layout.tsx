import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Solutions",
  description:
    "Bespoke web3 infrastructure development — custom smart contracts, wallet systems, enterprise integrations, and dedicated engineering for teams the SDK alone can't cover.",
  openGraph: {
    title: "Custom Solutions | Awarizon",
    description:
      "When the SDK isn't enough, we build it with you. Custom smart contracts, bespoke wallet infrastructure, and dedicated engineering support.",
  },
  twitter: {
    title: "Custom Solutions | Awarizon",
    description:
      "When the SDK isn't enough, we build it with you. Custom smart contracts, bespoke wallet infrastructure, and dedicated engineering support.",
  },
  alternates: {
    canonical: "https://awarizon.com/custom-solutions",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
