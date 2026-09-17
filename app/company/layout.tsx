import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Awarizon is a global web3 infrastructure company founded in 2023 — building wallets, payments, identity, and developer tooling as one coherent system.",
  openGraph: {
    title: "Company | Awarizon",
    description:
      "We build the infrastructure the next wave of on-chain products runs on. Founded 2023, global from day one.",
  },
  twitter: {
    title: "Company | Awarizon",
    description:
      "We build the infrastructure the next wave of on-chain products runs on. Founded 2023, global from day one.",
  },
  alternates: {
    canonical: "https://awarizon.com/company",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
