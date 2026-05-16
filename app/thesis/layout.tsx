import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emerging Markets Thesis",
  description:
    "The next major technology opportunity is not invention — it is adoption. Awarizon's thesis on how local intelligence, not foreign patterns, will transform Nigeria and West Africa's digital economy.",
  openGraph: {
    title: "Emerging Markets Thesis | Awarizon",
    description:
      "The next major tech opportunity is adoption, not invention. Why Awarizon operates inside the adoption gap across Nigeria and West Africa's emerging markets.",
  },
  twitter: {
    title: "Emerging Markets Thesis | Awarizon",
    description:
      "The next major tech opportunity is adoption, not invention. Awarizon's thesis on transforming Nigeria's digital economy.",
  },
  alternates: {
    canonical: "https://awarizon.com/thesis",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
