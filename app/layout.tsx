import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const siteName = "Awarizon";
const siteUrl = "https://awarizon.com"; // change when ready

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${siteName} — Technology Development & Distribution`,
    template: `%s — ${siteName}`,
  },

  description:
    "Awarizon helps businesses adopt modern digital systems and builds consumer products that make technology useful in everyday life.",

  keywords: [
    "Awarizon",
    "technology",
    "Nigeria",
    "West Africa",
    "fintech",
    "infrastructure",
    "digital systems",
  ],

  openGraph: {
    title: `${siteName} — Technology Development & Distribution`,
    description:
      "Building the bridge between businesses, technology, and everyday users.",
    url: siteUrl,
    siteName: siteName,
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Awarizon",
      },
    ],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased">
        {/* Ambient overlays */}
        <div className="scan-overlay" />
        <div className="noise-overlay" />

        {/* Navigation */}
        <Navigation />

        {/* Main content */}
        <main className="relative">{children}</main>

        {/* Global footer */}
        <Footer />

        {/* Global progress bar */}
        <div
          id="progress-bar"
          className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left scale-x-0"
          style={{ background: "var(--accent)" }}
        />
      </body>
    </html>
  );
}
