import type { Metadata } from "next";
import Link from "next/link";

const whatsappUrl = "https://wa.me/message/4OIGQ3FHUZQSD1";

export const metadata: Metadata = {
  title: "Private Zone",
  description:
    "Private projects, selected experiences and emerging initiatives by Alex Lindholm.",
  alternates: { canonical: "https://www.axlindholm.nl/private" },
  openGraph: {
    title: "Private Zone | Alex Lindholm",
    description:
      "Private projects, selected experiences and emerging initiatives by Alex Lindholm.",
    url: "/private",
    type: "website",
  },
};

export default function PrivateLandingPage() {
  return (
    <main className="flex min-h-[calc(100vh-12rem)] items-center justify-center bg-paper px-5 py-16 sm:px-8">
      <section className="w-full max-w-xl">
        <h1 className="font-serif text-5xl font-medium tracking-[-0.045em] text-ink sm:text-6xl">
          Private
        </h1>
        <nav aria-label="Private sections" className="mt-10 grid gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-between rounded-md border border-ink/12 bg-white px-5 text-base font-semibold text-ink transition hover:border-copper hover:text-copper">
            Private Events <span aria-hidden="true">↗</span>
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-between rounded-md border border-ink/12 bg-white px-5 text-base font-semibold text-ink transition hover:border-copper hover:text-copper">
            Travel &amp; Excursions <span aria-hidden="true">↗</span>
          </a>
          <Link href="/private/jewish" className="flex min-h-14 items-center justify-between rounded-md bg-[#8F3F4D] px-5 text-base font-semibold text-white transition hover:bg-[#73333f]">
            Learn more about Private Projects <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </section>
    </main>
  );
}
