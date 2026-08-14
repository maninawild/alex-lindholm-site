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

const privateOffers = [
  {
    title: "Private Events",
    description: "Small-format gatherings, salons and invitation-led experiences designed around a specific group and context.",
  },
  {
    title: "Travel & Excursions",
    description: "Curated journeys and guided cultural experiences shaped around people, place, history and conversation.",
  },
];

export default function PrivateLandingPage() {
  return (
    <main className="min-h-[calc(100vh-7rem)] bg-paper">
      <section className="relative overflow-hidden border-b border-ink/10 bg-[#10131a] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(143,63,77,0.32),transparent_35%),radial-gradient(circle_at_12%_85%,rgba(37,99,235,0.16),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/52">Private Zone</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-balance sm:text-7xl">
            Personal projects, shared with intention.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/64">
            A discreet space for selected events, journeys and projects that sit outside Alex’s public professional work.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            {privateOffers.map((offer) => (
              <article key={offer.title} className="flex min-h-64 flex-col justify-between rounded-sm border border-ink/10 bg-white p-6 shadow-quiet sm:p-8">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-copper">By request</p>
                  <h2 className="mt-4 font-serif text-3xl font-medium tracking-[-0.03em] sm:text-4xl">{offer.title}</h2>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-graphite/66">{offer.description}</p>
                </div>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center justify-between border-t border-ink/10 pt-5 text-sm font-semibold text-ink transition hover:text-copper">
                  <span>{offer.title}</span>
                  <span className="text-xs text-graphite/52" aria-hidden="true">WhatsApp ↗</span>
                </a>
              </article>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-5 rounded-sm border border-copper/18 bg-[#8F3F4D] p-6 text-white shadow-quiet sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-white/58">Protected archive</p>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-[-0.03em]">Jewish Experience &amp; Projects</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/66">Community leadership, education, international exchange projects, lectures and selected writing.</p>
            </div>
            <Link href="/private/jewish" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-[#10131a] transition hover:bg-white/90">
              Learn more about Private Projects
            </Link>
          </div>

          <nav aria-label="Private zone actions" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-graphite/62">
            <Link href="/#work" className="transition hover:text-ink">← Back to public projects</Link>
            <a href="https://zcal.co/axlindholm/1hour" target="_blank" rel="noopener noreferrer" className="transition hover:text-ink">Discuss a project ↗</a>
          </nav>
        </div>
      </section>
    </main>
  );
}
