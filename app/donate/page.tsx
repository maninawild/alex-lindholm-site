import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support Alex's Charity initiatives",
  alternates: { canonical: "/donate" },
  robots: { index: false, follow: true },
};

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-paper px-5 py-20 text-ink">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bluegray">Coming soon</p>
        <h1 className="mt-5 font-serif text-5xl">Donate</h1>
        <p className="mt-6 text-lg">Support Alex&apos;s Charity initiatives</p>
        <p className="mt-4 text-sm leading-7 text-graphite">This page is currently in development. Details about the initiatives and ways to contribute will be available here soon.</p>
        <Link href="/links" className="mt-8 inline-block rounded-xl bg-[#25334D] px-6 py-3 font-semibold text-white transition hover:bg-[#354968]">Back to links</Link>
      </div>
    </main>
  );
}
