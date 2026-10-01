import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const freeLessonId = "B4JWAl1TTDo";
const whatsappUrl = "https://wa.me/message/4OIGQ3FHUZQSD1";

const lessons = [
  {
    number: "01",
    title: "Введение в инвестиции простыми словами",
    duration: "18 минут",
    text: "Как устроены фондовый, валютный и товарный рынки, зачем нужен брокер и чем инвестиции отличаются от банковского вклада.",
    access: "Открытый урок",
  },
  {
    number: "02",
    title: "Способы заработка на бирже",
    duration: "20 минут",
    text: "Рост цены, дивиденды, облигации, ETF, фьючерсы, опционы, валютные операции, длинные и короткие позиции.",
    access: "В полном доступе",
  },
  {
    number: "03",
    title: "Основные риски инвестиций",
    duration: "18 минут",
    text: "Комиссии, неудачные сделки, кредитное плечо, несбалансированный портфель, эмоциональные решения и отсутствие стратегии.",
    access: "В полном доступе",
  },
] as const;

export function SafeInvestingCoursePage() {
  const configuredCheckout = process.env.NEXT_PUBLIC_SAFE_INVESTING_CHECKOUT_URL;
  const checkoutUrl = configuredCheckout || whatsappUrl;
  const checkoutLabel = configuredCheckout ? "Получить доступ за €19" : "Запросить доступ за €19";

  return (
    <main className="bg-white text-ink">
      <SiteHeader />

      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-white sm:pb-24 sm:pt-40">
        <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_80%_20%,#2563EB_0,transparent_32%),radial-gradient(circle_at_15%_90%,#8F3F4D_0,transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/62">Базовый видеокурс · 3 урока</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-[1.04] tracking-[-0.04em] text-balance sm:text-6xl">
              Безопасные инвестиции для начинающих
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/76 sm:text-lg">
              Короткий старт без обещаний лёгких денег: как устроен рынок, на чём зарабатывают и где новички чаще всего теряют деньги.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#lesson-1" className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-ink transition hover:bg-white/90">
                Смотреть первый урок
              </a>
              <a href="#access" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/28 px-5 text-sm font-semibold text-white transition hover:bg-white/10">
                Все 3 урока · €19
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-white/14 bg-white/14">
            {[["3", "урока"], ["56", "минут"], ["2021", "год записи"]].map(([value, label]) => (
              <div key={label} className="bg-white/5 px-4 py-6 backdrop-blur-sm">
                <p className="text-2xl font-semibold sm:text-3xl">{value}</p>
                <p className="mt-2 text-xs leading-5 text-white/58">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-[#F4F6F8] py-5">
        <div className="mx-auto max-w-7xl px-5 text-sm leading-6 text-graphite/72 sm:px-8">
          Курс записан в 2021 году. Проверяйте актуальные правила, налоги, условия брокеров и характеристики инструментов. Материал носит образовательный характер и не является индивидуальной инвестиционной рекомендацией.
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">Программа</p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">Три урока, которые дают основу</h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-graphite/72">
                Это самостоятельный базовый блок для тех, кто только начинает разбираться в финансовом рынке.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-ink/10 bg-ink/10">
              {lessons.map((lesson, index) => (
                <article key={lesson.number} className="grid gap-5 bg-white p-6 sm:grid-cols-[4rem_1fr_auto] sm:items-start sm:p-7">
                  <p className="text-sm font-semibold tabular-nums text-copper">{lesson.number}</p>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.015em]">{lesson.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-graphite/68">{lesson.text}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-sm font-medium text-ink">{lesson.duration}</p>
                    <p className={`mt-2 text-xs ${index === 0 ? "text-electric" : "text-graphite/50"}`}>{lesson.access}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="lesson-1" className="scroll-mt-24 bg-ink py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/52">Урок 1 · бесплатно</p>
            <h2 className="mt-4 text-3xl font-medium tracking-[-0.025em] sm:text-4xl">Введение в инвестиции простыми словами</h2>
          </div>
          <div className="aspect-video overflow-hidden rounded-sm border border-white/12 bg-black shadow-2xl">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${freeLessonId}?rel=0`}
              title="Введение в инвестиции простыми словами"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="mt-6 rounded-sm border border-white/14 bg-white/5 p-5 text-sm leading-6 text-white/72 sm:p-6">
            <strong className="text-white">Исправление к уроку:</strong> в объяснении опционов допущена оговорка. Call даёт право купить актив, Put даёт право продать актив.
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">Почему три урока</p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">3 базовых урока торговли</h2>
            <p className="mt-5 text-base leading-8 text-graphite/74">
              Курс был разработан по заказу образовательной платформы Universus. В 2021 году были записаны три первых урока. Сейчас они собраны в отдельный компактный курс.
            </p>
            <p className="mt-4 text-base leading-8 text-graphite/74">
              Если курс покажется вам интересным - дайте мне знать, вы бесплатно получите продолжение.
            </p>
          </div>
          <div id="access" className="scroll-mt-24 rounded-sm border border-ink/10 bg-[#F4F6F8] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">Полный доступ</p>
            <div className="mt-4 flex items-baseline gap-3">
              <p className="text-5xl font-semibold tracking-[-0.04em]">€19</p>
              <p className="text-sm text-graphite/54">один платёж</p>
            </div>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-graphite/76">
              <li>Все три видеоурока</li>
              <li>Доступ к будущему голосованию за продолжение</li>
              <li>Без подписки и автоматических списаний</li>
            </ul>
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-electric px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {checkoutLabel}
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10 bg-white py-7 text-sm text-graphite/62">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <p>© {new Date().getFullYear()} Alex Lindholm</p>
          <Link href="/" className="font-medium text-ink hover:text-electric">Главная</Link>
        </div>
      </footer>
    </main>
  );
}
