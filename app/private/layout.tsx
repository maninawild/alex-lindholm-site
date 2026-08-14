import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

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
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="fixed inset-x-0 top-0 z-[120] h-9 border-b border-white/10 bg-[#10131a] text-white">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link href="/private" className="truncate text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/78 transition hover:text-white">
            Private &amp; Confidential · Alex Lindholm
          </Link>
          <Link href="/" className="shrink-0 text-[0.68rem] font-semibold text-white/62 transition hover:text-white">
            Main site
          </Link>
        </div>
      </div>
      <SiteHeader transparentAtTop={false} privateZone />
      <div className="pt-[6.7rem] sm:pt-[7.15rem]">{children}</div>
      <footer className="border-t border-ink/10 bg-[#10131a] px-5 py-6 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-[0.68rem] leading-5 text-white/52 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Alex Lindholm. All rights reserved.</p>
          <p>Private &amp; Confidential. Access is personal and non-transferable; no copying, forwarding, publication or redistribution without prior written permission.</p>
        </div>
      </footer>
    </div>
  );
}
