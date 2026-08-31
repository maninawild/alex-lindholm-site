import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PublicOnlyEnhancements } from "@/components/public-only-enhancements";
import { personJsonLd, siteUrl, websiteJsonLd } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const siteDescription =
  "Alex Lindholm is a product and venture leader with 10+ years in startup incubation, product discovery, venture building, portfolio analysis and business development.";
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alex Lindholm | Venture Architect & Founder Advisor",
    template: "%s | Alex Lindholm",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Alex Lindholm",
    "Product and Venture Mentor",
    "Venture Builder Netherlands",
    "Accelerator Program Director",
    "Startup Incubation",
    "Product Discovery",
    "Innovation and Incubation",
    "Entrepreneur in Residence",
    "Portfolio Analyst",
    "Business Development Netherlands",
  ],
  openGraph: {
    title: "Alex Lindholm | Venture Architect & Founder Advisor",
    description:
      "Product and venture leadership across startup incubation, product discovery, venture building, portfolio analysis and business development.",
    url: siteUrl,
    siteName: "Alex Lindholm",
    images: [
      {
        url: "/placeholders/og-alex-lindholm.svg",
        width: 1200,
        height: 630,
        alt: "Alex Lindholm personal platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Lindholm | Venture Architect",
    description:
      "Venture strategy, startup validation, fundraising readiness, and complex decisions in uncertain markets.",
  },
  verification: {
    ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
    ...(bingSiteVerification
      ? {
          other: {
            "msvalidate.01": bingSiteVerification,
          },
        }
      : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteJsonLd(siteDescription), personJsonLd()]),
          }}
        />
        {children}
        <PublicOnlyEnhancements />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
