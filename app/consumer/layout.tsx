import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consumer Systems",
  description:
    "Awarizon builds consumer products like Zela that transform digital infrastructure into practical daily financial experiences. 50K+ users, real-time payments, mobile-first.",
  openGraph: {
    title: "Consumer Systems | Awarizon",
    description:
      "Consumer-facing products — including Zela — that transform digital infrastructure into practical daily financial experiences for everyday users.",
  },
  twitter: {
    title: "Consumer Systems | Awarizon",
    description:
      "Consumer products like Zela transform digital infrastructure into practical daily financial experiences. 50K+ users.",
  },
  alternates: {
    canonical: "https://awarizon.com/consumer",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
