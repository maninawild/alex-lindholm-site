import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Access",
  description: "A private, unlisted area shared personally by Alex Lindholm.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
  openGraph: {
    title: "Private Access | Alex Lindholm",
    description: "A private, unlisted area shared personally by Alex Lindholm.",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Private Access | Alex Lindholm",
    description: "A private, unlisted area shared personally by Alex Lindholm.",
    images: [],
  },
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
