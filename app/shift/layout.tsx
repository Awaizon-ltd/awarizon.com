import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Shift",
  description:
    "Technology exists everywhere. Adoption does not. Awarizon bridges the gap between what digital systems promise and what businesses actually experience across Nigeria and West Africa.",
  openGraph: {
    title: "The Shift | Awarizon",
    description:
      "Technology exists everywhere. Adoption does not. Awarizon exists inside the gap between what technology promises and what businesses actually experience.",
  },
  twitter: {
    title: "The Shift | Awarizon",
    description:
      "Technology exists everywhere. Adoption does not. Awarizon bridges the adoption gap in Nigeria and West Africa.",
  },
  alternates: {
    canonical: "https://awarizon.com/shift",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
