import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adoption Layer",
  description:
    "Awarizon's distribution-as-design approach ensures technology gets adopted, not just deployed. We bridge the gap between digital infrastructure and real business usage in Nigeria and West Africa.",
  openGraph: {
    title: "Adoption Layer | Awarizon",
    description:
      "Distribution as design. Awarizon ensures technology gets adopted, not just deployed — bridging digital infrastructure with real business usage.",
  },
  twitter: {
    title: "Adoption Layer | Awarizon",
    description:
      "Distribution as design. Technology that gets adopted, not just deployed — bridging systems with real usage.",
  },
  alternates: {
    canonical: "https://awarizon.com/adoption",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
