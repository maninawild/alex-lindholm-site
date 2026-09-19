import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { TripReviews } from "@/components/trip-reviews";

const whatsappUrl = "https://wa.me/message/4OIGQ3FHUZQSD1";

const sharedTrips = [
  { date: "24.06.2023", image: "/media/trips/IMG_1228.jpeg", position: "50% 78%" },
  { date: "25.06, 02.07, 15.07.2023", image: "/media/trips/IMG_1226.jpeg", position: "50% 63%" },
  { date: "16.07.2023", image: "/media/trips/IMG_1226.jpeg", position: "50% 35%" },
  { date: "22.07, 29.07, 05.08.2023", image: "/media/trips/IMG_1223.jpeg", position: "50% 62%" },
  { date: "12.08.2023", image: "/media/trips/IMG_1223.jpeg", position: "50% 64%" },
  { date: "13.08.2023", image: "/media/trips/IMG_1223.jpeg", position: "50% 34%" },
  { date: "29.06, 06.07, 13.07.2024", image: "/media/trips/IMG_1222.jpeg", position: "50% 38%" },
  { date: "23.08–01.09.2024", image: "/media/trips/IMG_1221.jpeg", position: "50% 34%" },
  { date: "05.07.2025", image: "/media/trips/IMG_1220.jpeg", position: "50% 64%" },
  { date: "06.07.2025", image: "/media/trips/IMG_1220.jpeg", position: "50% 34%" },
] as const;

const copy = {
  en: {
    switchHref: "/ru/trips", switchLabel: "RU", switchAria: "Open the Russian version",
    eyebrow: "Trips with Alex", title: "See places through more than one lens.",
    intro: "Small-group trips shaped by history, culture, nature, people and the conversations that happen along the way.",
    navUpcoming: "Next trip", navPast: "Past experiences", navFormats: "Formats",
    upcomingEyebrow: "Coming in October 2026", upcomingTitle: "Kröller-Müller & De Hoge Veluwe",
    upcomingText: "A day around modern art, architecture and one of the Netherlands’ most distinctive landscapes. Full details and the date will follow.",
    languageNote: "This trip is for Russian-speaking participants.", interest: "Learn more",
    dates: [["3 October", "08:00–21:00 · 2 places left"], ["17 October", "08:00–21:00 · 4 places left"]],
    pastEyebrow: "Past experiences",
    pastTitle: "Not one standard tour, but many ways to travel.",
    pastIntro: "Over the years I have hosted dozens of trips in different roles: guide, organizer, educator, connector and fellow traveller.",
    experiences: [
      ["The Netherlands from the inside", "Cities, water, local life and the stories usually missed on a standard route."],
      ["Art and nature", "Museums, landscapes and long conversations without rushing between checkpoints."],
      ["Cross-border weekends", "Belgium, Zeeland and nearby places connected through history, food and people."],
      ["Trips with a purpose", "Sailing, community visits and field trips for founders, investors and curious professionals."],
    ],
    archiveTitle: "Selected trips",
    trips: [
      ["Art trip to Kröller-Müller", "Kröller-Müller Museum and De Hoge Veluwe."],
      ["One day to feel local in the Netherlands", "A one-day route around the Netherlands."],
      ["Zeeland: sea, castles, wine and oysters", "A networking trip through Zeeland."],
      ["Two Hollands and five cities", "A series of routes across North and South Holland."],
      ["Fairytale Bruges", "A day in Bruges."],
      ["Van Gogh without the crowds", "Van Gogh and De Hoge Veluwe National Park."],
      ["Belgium in one weekend", "Brussels and Bruges."],
      ["A week on a yacht around Greece", "Seven days sailing around Greece."],
      ["Onboarding trip: two Hollands and five cities", "A small-group route through five cities."],
      ["Sunny Hobbiton and moody Urk", "A networking trip in the Netherlands."],
    ],
    formatsEyebrow: "Formats",
    formatsTitle: "A trip can be a day out or the beginning of a project.",
    formats: ["Day trips", "Culture & history", "Nature", "Investment & discovery trips"],
    backgroundTitle: "Why travel with me",
    backgroundText: "I trained as a historian and have worked across education, communities, startups and investment. I connect the place to the wider context, introduce people and leave room for the unexpected.",
    finalTitle: "Want to join the next trip?", finalText: "Message me on WhatsApp. Payment and ticketing will be added later.", finalCta: "Message Alex", home: "Home",
  },
  ru: {
    switchHref: "/trips", switchLabel: "EN", switchAria: "Открыть английскую версию",
    eyebrow: "Поездки с Алексом", title: "Смотреть на места сразу с нескольких сторон.",
    intro: "Небольшие поездки, где история, культура, природа и люди соединяются с живым разговором по дороге.",
    navUpcoming: "Ближайшая поездка", navPast: "Прошлые поездки", navFormats: "Форматы",
    upcomingEyebrow: "Октябрь 2026", upcomingTitle: "Крёллер-Мюллер и Де-Хоге-Велюве",
    upcomingText: "Один день вокруг современного искусства, архитектуры и одного из самых необычных ландшафтов Нидерландов. Дату и программу добавим скоро.",
    languageNote: "Поездка пройдет на русском языке.", interest: "Узнать больше",
    dates: [["3 октября", "08:00–21:00 · осталось 2 места"], ["17 октября", "08:00–21:00 · осталось 4 места"]],
    pastEyebrow: "Прошлые поездки",
    pastTitle: "Не одна стандартная экскурсия, а разные способы путешествовать.",
    pastIntro: "За эти годы я провел десятки поездок в разных ролях: гид, организатор, преподаватель, человек, который знакомит людей, и просто попутчик.",
    experiences: [
      ["Нидерланды изнутри", "Города, вода, местная жизнь и истории, которые обычно не попадают в стандартный маршрут."],
      ["Искусство и природа", "Музеи, ландшафты и долгие разговоры без гонки между обязательными точками."],
      ["Выходные через границу", "Бельгия, Зеландия и близкие места через историю, еду и людей."],
      ["Поездки с целью", "Яхта, сообщества и исследовательские поездки для предпринимателей, инвесторов и любопытных профессионалов."],
    ],
    archiveTitle: "Некоторые поездки",
    trips: [
      ["Арт-путешествие в Крёллер-Мюллер", "Музей Крёллер-Мюллер и Де-Хоге-Велюве."],
      ["Один день, чтобы почувствовать себя местным", "Однодневный маршрут по Нидерландам."],
      ["Зеландия: море, замки, вино и устрицы", "Нетворкинг-поездка по Зеландии."],
      ["Две Голландии и пять городов", "Серия маршрутов по Северной и Южной Голландии."],
      ["Сказочный Брюгге", "Один день в Брюгге."],
      ["Ван Гог без толп", "Ван Гог и национальный парк Де-Хоге-Велюве."],
      ["Бельгия за один выходной", "Брюссель и Брюгге."],
      ["Неделя на яхте вокруг Греции", "Семь дней под парусом вокруг Греции."],
      ["Онбординг-поездка: две Голландии и пять городов", "Маршрут небольшой группой через пять городов."],
      ["Солнечный Хоббитон и угрюмый Урк", "Нетворкинг-поездка по Нидерландам."],
    ],
    formatsEyebrow: "Форматы",
    formatsTitle: "Поездка может быть одним днем или началом нового проекта.",
    formats: ["Однодневные поездки", "Культура и история", "Природа", "Инвестиционные и исследовательские поездки"],
    backgroundTitle: "Почему со мной",
    backgroundText: "По образованию я историк, а работал в образовании, сообществах, стартапах и инвестициях. Я связываю место с широким контекстом, знакомлю людей и оставляю пространство для неожиданного.",
    finalTitle: "Хотите поехать в следующий раз?", finalText: "Напишите мне в WhatsApp. Оплату и покупку билетов добавим позже.",
    finalCta: "Написать Алексу", home: "Главная",
  },
} as const;

type TripsPageProps = { locale: keyof typeof copy };

export function TripsPage({ locale }: TripsPageProps) {
  const t = copy[locale];

  return (
    <main className="bg-white text-ink">
      <SiteHeader languageSwitch={{ href: t.switchHref, label: t.switchLabel, ariaLabel: t.switchAria }} />

      <section className="relative min-h-[84svh] overflow-hidden bg-ink text-white">
        <Image src="/media/alex/alex-travel-01.jpg" alt={locale === "ru" ? "Алекс Линдхольм в путешествии" : "Alex Lindholm travelling in Tallinn"} fill priority sizes="100vw" className="object-cover object-[55%_50%]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,19,26,0.92)_0%,rgba(16,19,26,0.72)_42%,rgba(16,19,26,0.22)_78%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/72 via-transparent to-ink/35" />
        <div className="relative z-10 mx-auto flex min-h-[84svh] max-w-7xl flex-col justify-end px-5 pb-10 pt-28 sm:px-8 sm:pb-16">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/72">{t.eyebrow}</p>
            <h1 className="max-w-2xl text-4xl font-medium leading-[1.04] tracking-[-0.035em] text-balance sm:text-6xl">{t.title}</h1>
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
              <div><p className="text-5xl font-semibold leading-none">{locale === "ru" ? "ОКТ" : "OCT"}</p><p className="mt-3 text-sm tracking-[0.18em]">2026</p></div>
            </div>
            <div className="p-6 sm:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">{t.navUpcoming}</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-5xl">{t.upcomingTitle}</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-graphite/76 sm:text-lg">{t.upcomingText}</p>
              <div className="mt-6 grid max-w-2xl gap-px overflow-hidden rounded-sm border border-ink/10 bg-ink/10 sm:grid-cols-2">
                {t.dates.map(([date, status]) => (
                  <div key={date} className="bg-white p-4">
                    <p className="font-semibold text-ink">{date}</p>
                    <p className="mt-1 text-sm text-graphite/68">{status}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-graphite/55">{t.languageNote}</p>
              <Link href="/ru/trips/hoge-veluwe" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-md bg-ink px-5 text-sm font-semibold text-white transition hover:bg-graphite">{t.interest}<span className="ml-2" aria-hidden="true">→</span></Link>
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

          <div className="mt-12 border-t border-ink/10 pt-8">
            <h3 className="text-xl font-semibold tracking-[-0.015em]">{t.archiveTitle}</h3>
            <div className="mt-5 grid gap-x-8 border-t border-ink/10 md:grid-cols-2">
              {sharedTrips.map((trip, index) => {
                const [title] = t.trips[index];
                return (
                  <article key={`${trip.date}-${title}`} className="grid grid-cols-[4rem_1fr] items-center gap-4 border-b border-ink/10 py-3">
                    <div className="relative h-12 overflow-hidden rounded-sm bg-[#F4F6F8]">
                      <Image src={trip.image} alt="" fill sizes="64px" className="scale-[1.06] object-cover" style={{ objectPosition: trip.position }} />
                    </div>
                    <div className="min-w-0">
                      <time className="block text-[11px] font-semibold tabular-nums text-copper">{trip.date}</time>
                      <p className="mt-0.5 truncate text-sm font-semibold" title={title}>{title}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <TripReviews locale={locale} />

      <section id="formats" className="scroll-mt-24 bg-ink py-16 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/58">{t.formatsEyebrow}</p><h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-[-0.025em] text-balance sm:text-4xl">{t.formatsTitle}</h2><div className="mt-8 flex flex-wrap gap-2">{t.formats.map((format) => <span key={format} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/82">{format}</span>)}</div></div>
          <div className="border-l border-white/16 pl-6 sm:pl-8"><h2 className="text-2xl font-medium tracking-[-0.02em]">{t.backgroundTitle}</h2><p className="mt-5 max-w-xl text-base leading-8 text-white/72 sm:text-lg">{t.backgroundText}</p></div>
        </div>
      </section>

      <section className="bg-electric py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div><h2 className="text-3xl font-medium tracking-[-0.025em] sm:text-4xl">{t.finalTitle}</h2><p className="mt-3 max-w-2xl text-base leading-7 text-white/76">{t.finalText}</p></div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-ink transition hover:bg-white/90">{t.finalCta}<span className="ml-2" aria-hidden="true">→</span></a>
        </div>
      </section>

      <footer className="border-t border-ink/10 bg-white py-7 text-sm text-graphite/62">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8"><p>© {new Date().getFullYear()} Alex Lindholm</p><Link href="/" className="font-medium text-ink hover:text-electric">{t.home}</Link></div>
      </footer>
    </main>
  );
}
