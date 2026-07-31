import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { ConsultationClarity } from "@/components/consultation-clarity";
import { DiscoveryCallCta } from "@/components/discovery-call-cta";
import { LatestArticleWidget } from "@/components/latest-article-widget";
import { ArticlePresentationCleanup } from "@/components/article-presentation-cleanup";
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
  "Alex Lindholm works across venture ecosystems, ethical technology, responsible AI, human-centered innovation, and cross-border collaboration.";
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alex Lindholm | Venture Architect & Human-Centered Technologist",
    template: "%s | Alex Lindholm",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Alex Lindholm",
    "Human-Centered Innovation",
    "Ethical Technology",
    "Responsible AI",
    "Venture Ecosystems",
    "Systems Thinking",
    "Innovation Leadership",
    "Human-Centric AI",
    "Digital Humanism",
    "Future of Entrepreneurship",
    "Ecosystem Design",
    "Technology Ethics",
    "Strategic Foresight",
    "European Innovation",
    "Human Networks",
    "Meaningful Technology",
  ],
  openGraph: {
    title: "Alex Lindholm | Venture Architect & Ecosystem Builder",
    description:
      "A human-first personal platform for venture architecture, ethical technology, founder ecosystems, and meaningful collaboration.",
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
      "Human-centered innovation, venture ecosystems, responsible AI, and cross-border collaboration.",
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
        <ConsultationClarity />
        <DiscoveryCallCta />
        <LatestArticleWidget />
        <ArticlePresentationCleanup />
      </body>
    </html>
  );
}
