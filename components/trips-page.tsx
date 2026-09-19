import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const whatsappUrl = "https://wa.me/message/4OIGQ3FHUZQSD1";

const copy = {
  en: {
    lang: "EN",
    switchHref: "/ru/trips",
    switchLabel: "RU",
    eyebrow: "Trips with Alex",
    title: "See places through more than one lens.",
    intro:
      "Small-group trips shaped by history, culture, nature, people and the conversations that happen along the way.",
    navUpcoming: "Next trip",
    navPast: "Past experiences",
    navFormats: "Formats",
    upcomingEyebrow: "Coming in October 2026",
    upcomingTitle: "Kröller-Müller & De Hoge Veluwe",
    upcomingText:
      "A day around modern art, architecture and one of the Netherlands’ most distinctive landscapes. Full details and the date will follow.",
    languageNote: "This trip is for Russian-speaking participants.",
    interest: "I’m interested",
    pastEyebrow: "Past experiences",
    pastTitle: "Not one standard tour, but many ways to travel.",
    pastIntro:
      "Over the years I have hosted dozens of trips in different roles: guide, organizer, educator, connector and fellow traveller.",
    experiences: [
      ["The Netherlands from the inside", "Cities, water, local life and the stories usually missed on a standard route."],
      ["Art and nature", "Museums, landscapes and long conversations without rushing between checkpoints."],
      ["Cross-border weekends", "Belgium, Zeeland and nearby places connected through history, food and people."],
      ["Trips with a purpose", "Sailing, community visits and field trips for founders, investors and curious professionals."],
    ],
    formatsEyebrow: "Formats",
    formatsTitle: "A trip can be a day out or the beginning of a project.",
    formats: ["Day trips", "Culture & history", "Nature", "Investment & discovery trips"],
    whyTitle: "Why travel with me",
    whyText:
      "I trained as a historian and have worked across education, communities, startups and investment. I connect the place to the wider context, introduce people and leave room for the unexpected.",
    finalTitle: "Want to join the next trip?",
    finalText: "Message me on WhatsApp. Payment and ticketing will be added later.",
    finalCta: "Message Alex",
    home: "Home",
  },
  ru: {
    lang: "RU",
    switchHref: "/trips",
    switchLabel: "EN",
    eyebrow: "Поездки с Алексом",
    title: "Смотреть на места сразу с нескольких сторон.",
    intro:
      "Небольшие поездки, где история, культура, природа и люди соединяются с живым разговором по дороге.",
    navUpcoming: "Ближайшая поездка",
    navPast: "Прошлые поездки",
    navFormats: "Форматы",
    upcomingEyebrow: "Октябрь 2026",
    upcomingTitle: "Крёллер-Мюллер и Де-Хоге-Велюве",
    upcomingText:
      "Один день вокруг современного искусства, архитектуры и одного из самых необычных ландшафтов Нидерландов. Дату и программу добавим скоро.",
    languageNote: "Поездка пройдет на русском языке.",
    interest: "Мне интересно",
    pastEyebrow: "Прошлые поездки",
    pastTitle: "Не одна стандартная экскурсия, а разные способы путешествовать.",
    pastIntro:
      "За эти годы я провел десятки поездок в разных ролях: гид, организатор, преподаватель, человек, который знакомит людей, и просто попутчик.",
    experiences: [
      ["Нидерланды изнутри", "Города, вода, местная жизнь и истории, которые обычно не попадают в стандартный маршрут."],
      ["Искусство и природа", "Музеи, ландшафты и долгие разговоры без гонки между обязательными точками."],
      ["Выходные через границу", "Бельгия, Зеландия и близкие места через историю, еду и людей."],
      ["Поездки с целью", "Яхта, сообщества и исследовательские поездки для предпринимателей, инвесторов и любопытных профессионалов."],
    ],
    formatsEyebrow: "Форматы",
    formatsTitle: "Поездка может быть одним днем или началом нового проекта.",
    formats: ["Однодневные поездки", "Культура и история", "Природа", "Инвестиционные и исследовательские поездки"],
    whyTitle: "Почему со мной",
    whyText:
      "По образованию я историк, а работал в образовании, сообществах, стартапах и инвестициях. Я связываю место с широким контекстом, знакомлю людей и оставляю пространство для неожиданного.",
    finalTitle: "Хотите поехать в следующий раз?",
    finalText: "Напишите мне в WhatsApp. Оплату и покупку билетов добавим позже.",
    finalCta: "Написать Алексу",
    home: "Главная",
  },
} as const;

type TripsPageProps = { locale: keyof typeof copy };

export function TripsPage({ locale }: TripsPageProps) {
  const t = copy[locale];

  return (
    <main className="bg-white text-ink">
      <SiteHeader />

      <section className="relative min-h-[84svh] overflow-hidden bg-ink text-white">
        <Image
          src="/media/alex/alex-travel-01.jpg"
          alt={locale === "ru" ? "Алекс Линдхольм в путешествии" : "Alex Lindholm travelling in Tallinn"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[55%_50%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,19,26,0.92)_0%,rgba(16,19,26,0.72)_42%,rgba(16,19,26,0.22)_78%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/72 via-transparent to-ink/35" />

        <div className="relative z-10 mx-auto flex min-h-[84svh] max-w-7xl flex-col justify-end px-5 pb-10 pt-28 sm:px-8 sm:pb-16">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/72">{t.eyebrow}</p>
              <Link
                href={t.switchHref}
                className="rounded-full border border-white/35 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white hover:text-ink"
                hrefLang={t.switchLabel.toLowerCase()}
              >
                {t.switchLabel}
              </Link>
            </div>
            <h1 className="max-w-2xl text-4xl font-medium leading-[1.04] tracking-[-0.035em] text-balance sm:text-6xl">
              {t.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">{t.intro}</p>
            <nav className="mt-7 flex flex-wrap gap-2" aria-label={locale === "ru" ? "Разделы страницы" : "Page sections"}>
              <a href="#next-trip" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">{t.navUpcoming}</a>
              <a href="#past-trips" className="rounded-full border border-white/35 px-4 py-2 text-sm font-semibold text-white">{t.navPast}</a>
              <a href="#formats" className="rounded-full border border-white/35 px-4 py-2 text-sm font-semibold text-white">{t.navFormats}</a>
            </nav>
          </div>
        </div>
      </section>

      <section id="next-trip" className="scroll-mt-24 border-b border-ink/10 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <article className="grid overflow-hidden rounded-sm border border-ink/10 bg-[#F4F6F8] lg:grid-cols-[0.75fr_1.25fr]">
            <div className="flex min-h-56 flex-col justify-between bg-electric p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/76">{t.upcomingEyebrow}</p>
              <div>
                <p className="text-5xl font-semibold leading-none">{locale === "ru" ? "ОКТ" : "OCT"}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.18em]">2026</p>
              </div>
            </div>
            <div className="p-6 sm:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">{t.navUpcoming}</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-5xl">{t.upcomingTitle}</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-graphite/76 sm:text-lg">{t.upcomingText}</p>
              <p className="mt-4 text-xs text-graphite/55">{t.languageNote}</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-md bg-ink px-5 text-sm font-semibold text-white transition hover:bg-graphite"
              >
                {t.interest} <span className="ml-2" aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section id="past-trips" className="scroll-mt-24 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">{t.pastEyebrow}</p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.025em] text-balance sm:text-4xl">{t.pastTitle}</h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-graphite/72">{t.pastIntro}</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-ink/10 bg-ink/10 sm:grid-cols-2">
              {t.experiences.map(([title, text], index) => (
                <article key={title} className="min-h-56 bg-white p-6 sm:p-7">
                  <p className="text-xs font-semibold tabular-nums text-copper">0{index + 1}</p>
                  <h3 className="mt-8 text-xl font-semibold tracking-[-0.015em]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-graphite/68">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="formats" className="scroll-mt-24 bg-ink py-16 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/58">{t.formatsEyebrow}</p>
            <h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-[-0.025em] text-balance sm:text-4xl">{t.formatsTitle}</h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {t.formats.map((format) => (
                <span key={format} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/82">{format}</span>
              ))}
            </div>
          </div>
          <div className="border-l border-white/16 pl-6 sm:pl-8">
            <h2 className="text-2xl font-medium tracking-[-0.02em]">{t.whyTitle}</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/72 sm:text-lg">{t.whyText}</p>
          </div>
        </div>
      </section>

      <section className="bg-electric py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-medium tracking-[-0.025em] sm:text-4xl">{t.finalTitle}</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/76">{t.finalText}</p>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-ink transition hover:bg-white/90">
            {t.finalCta} <span className="ml-2" aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <footer className="border-t border-ink/10 bg-white py-7 text-sm text-graphite/62">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <p>© {new Date().getFullYear()} Alex Lindholm</p>
          <Link href="/" className="font-medium text-ink hover:text-electric">{t.home}</Link>
        </div>
      </footer>
    </main>
  );
}
