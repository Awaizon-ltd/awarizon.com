import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const siteName = "Awarizon";
const siteUrl = "https://awarizon.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${siteName} — Technology Development & Distribution`,
    template: `%s | ${siteName}`,
  },

  description:
    "Awarizon helps businesses adopt modern digital systems and builds consumer products that make technology useful in everyday life across Nigeria and West Africa.",

  keywords: [
    "Awarizon",
    "technology development Nigeria",
    "digital infrastructure Africa",
    "fintech Nigeria",
    "West Africa technology",
    "business automation Nigeria",
    "digital payments Africa",
    "wallet infrastructure",
    "technology distribution",
    "Zela app",
    "emerging markets technology",
    "digital transformation Nigeria",
    "technology adoption",
  ],

  authors: [{ name: "Awarizon", url: siteUrl }],
  creator: "Awarizon",
  publisher: "Awarizon",

  openGraph: {
    title: `${siteName} — Technology Development & Distribution`,
    description:
      "Building the bridge between businesses, technology, and everyday users across Nigeria and West Africa.",
    url: siteUrl,
    siteName: siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Awarizon — Technology Development & Distribution",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Technology Development & Distribution`,
    description:
      "Building the bridge between businesses, technology, and everyday users across Nigeria and West Africa.",
    site: "@awarizon",
    creator: "@awarizon",
    images: ["/opengraph-image"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Awarizon",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "Awarizon helps businesses adopt modern digital systems and builds consumer products that make technology useful in everyday life.",
  email: "hello@awarizon.com",
  areaServed: ["Nigeria", "West Africa", "Emerging Markets"],
  sameAs: [
    "https://twitter.com/awarizon",
    "https://linkedin.com/company/awarizon",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@awarizon.com",
    contactType: "customer service",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Awarizon",
  url: siteUrl,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

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
