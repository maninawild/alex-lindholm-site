import type { Metadata } from "next";
import Link from "next/link";
import { privateIdeas } from "@/data/private-ideas";

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
    <main className="bg-paper px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto w-full max-w-5xl">
        <section className="max-w-xl">
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

        <section
          id="development-ideas"
          className="relative mt-16 overflow-hidden rounded-sm bg-[#10131a] px-5 py-8 text-white shadow-[0_24px_70px_rgba(16,19,26,0.18)] sm:px-8 sm:py-10"
          aria-labelledby="development-ideas-title"
        >
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#8F3F4D]/45 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d9a6af]">
              Private concepts
            </p>
            <h2
              id="development-ideas-title"
              className="mt-3 font-serif text-4xl font-medium tracking-[-0.04em] sm:text-5xl"
            >
              New Development Ideas
            </h2>
            <nav aria-label="New development ideas" className="mt-8 grid gap-3 md:grid-cols-3">
              {privateIdeas.map((idea, index) => (
                <Link
                  key={idea.slug}
                  href={`/private/ideas/${idea.slug}`}
                  className="group flex min-h-44 flex-col justify-between rounded-sm border border-white/14 bg-white/[0.065] p-5 transition hover:-translate-y-0.5 hover:border-[#d9a6af]/65 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a6af]"
                >
                  <span className="flex items-center justify-between gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/42">
                    <span>{idea.status}</span>
                    <span aria-hidden="true">0{index + 1}</span>
                  </span>
                  <span className="flex items-end justify-between gap-4">
                    <span className="font-serif text-2xl font-medium leading-tight tracking-[-0.025em]">
                      {idea.title}
                    </span>
                    <span className="shrink-0 text-[#d9a6af] transition group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </section>
      </div>
    </main>
  );
}
