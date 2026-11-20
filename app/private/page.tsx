import { translator } from "@/lib/i18n";
import type { Metadata } from "next";
import { privateIdeas } from "@/data/private-ideas";

const whatsappUrl = "https://wa.me/message/4OIGQ3FHUZQSD1";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{lang?: string}> }): Promise<Metadata> {
  const ru = (await searchParams).lang === "ru";
  return { title: ru ? "Закрытый раздел" : "Private Area", description: ru ? "Раздел, которым Алекс Линдхольм делится лично." : "An area shared personally by Alex Lindholm." };
}

export default async function PrivateLandingPage({searchParams}:{searchParams:Promise<{lang?:string}>}) {
 const locale=(await searchParams).lang === "ru" ? "ru" : "en"; const t=translator(locale);
  return (
    <main lang={locale} className="bg-paper px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto w-full max-w-5xl">
        <section className="max-w-xl">
          <h1 className="font-serif text-5xl font-medium tracking-[-0.045em] text-ink sm:text-6xl">
            {locale === "ru" ? "Закрытый раздел" : "Private"}
          </h1>
          <nav aria-label={locale === "ru" ? "Разделы" : "Private sections"} className="mt-10 grid gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-between rounded-md border border-ink/12 bg-white px-5 text-base font-semibold text-ink transition hover:border-copper hover:text-copper">
              {locale === "ru" ? "Частные мероприятия" : "Private Events"} <span aria-hidden="true">↗</span>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-between rounded-md border border-ink/12 bg-white px-5 text-base font-semibold text-ink transition hover:border-copper hover:text-copper">
              {locale === "ru" ? "Поездки и экскурсии" : "Travel & Excursions"} <span aria-hidden="true">↗</span>
            </a>
            <a href={locale === "ru" ? "/private/jewish?lang=ru" : "/private/jewish"} className="flex min-h-14 items-center justify-between rounded-md bg-ink px-5 text-base font-semibold text-white transition hover:bg-graphite">
              {locale === "ru" ? "Еврейский опыт и проекты" : "Jewish Experience & Projects"} <span aria-hidden="true">→</span>
            </a>
          </nav>
        </section>

        <section
          id="development-ideas"
          className="relative mt-16 overflow-hidden rounded-sm bg-[#10131a] px-5 py-8 text-white shadow-[0_24px_70px_rgba(16,19,26,0.18)] sm:px-8 sm:py-10"
          aria-labelledby="development-ideas-title"
        >
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-electric/25 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">
              {locale === "ru" ? "Закрытые концепции · EN" : "Private concepts"}
            </p>
            <h2
              id="development-ideas-title"
              className="mt-3 font-serif text-4xl font-medium tracking-[-0.04em] sm:text-5xl"
            >
              {locale === "ru" ? "Новые идеи проектов" : "New Development Ideas"}
            </h2>
            <nav aria-label={locale === "ru" ? "Новые идеи проектов" : "New development ideas"} className="mt-8 grid gap-3 md:grid-cols-3">
              {privateIdeas.map((idea, index) => (
                <a
                  key={idea.slug}
                  href={`/private/ideas/${idea.slug}`}
                  className="group flex min-h-44 flex-col justify-between rounded-sm border border-white/14 bg-white/[0.065] p-5 transition hover:-translate-y-0.5 hover:border-electric/65 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                >
                  <span className="flex items-center justify-between gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/42">
                    <span>{locale === "ru" ? "Материалы на английском" : idea.status}</span>
                    <span aria-hidden="true">0{index + 1}</span>
                  </span>
                  <span className="flex items-end justify-between gap-4">
                    <span className="font-serif text-2xl font-medium leading-tight tracking-[-0.025em]">
                      {idea.title}
                    </span>
                    <span className="shrink-0 text-electric transition group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </section>
      </div>
    </main>
  );
}
