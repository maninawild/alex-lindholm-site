import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://alexlindholm.com"),
  title: {
    default: "Alex Lindholm | Venture Architect & Human-Centered Technologist",
    template: "%s | Alex Lindholm",
  },
  description:
    "Alex Lindholm works across venture ecosystems, ethical technology, responsible AI, human-centered innovation, and cross-border collaboration.",
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
    url: "https://alexlindholm.com",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
