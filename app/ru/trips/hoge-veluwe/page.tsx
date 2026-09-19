import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TripPartnershipNote } from "@/components/trip-reviews";
import { siteUrl } from "@/lib/site";

const whatsappUrl = "https://wa.me/message/4OIGQ3FHUZQSD1";

export const metadata: Metadata = {
  title: "Hoge Veluwe",
  description:
    "Поездка в национальный парк Hoge Veluwe и музей Крёллер-Мюллер 3 и 17 октября 2026 года.",
  alternates: { canonical: `${siteUrl}/ru/trips/hoge-veluwe` },
  openGraph: {
    title: "Hoge Veluwe: Ван Гог и осенний парк",
    description: "Ван Гог, велосипеды, осенний лес и музей Крёллер-Мюллер.",
    url: "/ru/trips/hoge-veluwe",
    type: "website",
  },
};

const dates = [
  { date: "3 октября", time: "08:00–21:00", places: 2 },
  { date: "17 октября", time: "08:00–21:00", places: 4 },
] as const;

const gallery = [
  { src: "/media/trips/IMG_1228.jpeg", position: "50% 78%" },
  { src: "/media/trips/IMG_1223.jpeg", position: "50% 34%" },
  { src: "/media/trips/IMG_1222.jpeg", position: "50% 38%" },
  { src: "/media/trips/IMG_1221.jpeg", position: "50% 34%" },
] as const;

export default function HogeVeluweTripPage() {
  return (
    <main className="bg-white text-ink">
      <SiteHeader languageSwitch={{ href: "/trips", label: "EN", ariaLabel: "Открыть английскую версию страницы поездок" }} />

      <section className="relative min-h-[68svh] overflow-hidden bg-ink text-white">
        <Image src="/media/alex/alex-travel-01.jpg" alt="Поездка с Алексом Линдхольмом" fill priority sizes="100vw" className="object-cover object-[55%_50%]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,19,26,0.94)_0%,rgba(16,19,26,0.70)_48%,rgba(16,19,26,0.22)_82%)]" />
        <div className="relative z-10 mx-auto flex min-h-[68svh] max-w-7xl flex-col justify-end px-5 pb-10 pt-28 sm:px-8 sm:pb-16">
          <Link href="/ru/trips" className="mb-8 text-sm font-semibold text-white/72 hover:text-white">← Все поездки</Link>
          <h1 className="max-w-4xl text-4xl font-medium leading-[1.04] tracking-[-0.035em] text-balance sm:text-6xl">Hoge Veluwe: Ван Гог и осенний парк</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">Однодневная поездка в музей Крёллер-Мюллер и национальный парк.</p>
        </div>
      </section>

      <section className="border-b border-ink/10 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-3 border-b border-ink/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8F3F4D]">Бронирование</p>
              <h2 className="mt-2 text-2xl font-medium tracking-[-0.02em]">Выберите дату</h2>
            </div>
            <p className="text-sm text-graphite/68"><strong className="text-ink">€90</strong> Гаага и Роттердам · <strong className="text-ink">€99</strong> Амстердам</p>
          </div>
          <div>
            {dates.map((item) => (
              <article key={item.date} className="grid gap-4 border-b border-ink/10 py-5 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-8">
                <div>
                  <p className="text-lg font-semibold">{item.date}</p>
                  <p className="mt-1 text-sm text-graphite/68">{item.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5" aria-hidden="true">
                    {[0, 1, 2, 3].map((place) => <span key={place} className={`h-2.5 w-7 rounded-full ${place < item.places ? "bg-[#8F3F4D]" : "bg-ink/10"}`} />)}
                  </div>
                  <p className="whitespace-nowrap text-sm font-semibold">{item.places} места</p>
                </div>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#8F3F4D] px-5 text-sm font-semibold text-white transition hover:bg-ink">Я еду!</a>
              </article>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-graphite/68">В цену включены билеты в национальный парк и музей, а также транспорт. При покупке билета укажите свой адрес.</p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">О поездке</p>
          </div>
          <article className="max-w-3xl space-y-6 text-base leading-8 text-graphite/86 sm:text-lg">
            <p className="text-xl font-semibold leading-8 text-ink sm:text-2xl">Все 88 картин Ван Гога из частной коллекции Крёллер-Мюллер впервые за 40 лет показывают вместе - уникальный шанс успеть до конца декабря.</p>
            <p>Музей находится в одном из самых интересных национальных парков Нидерландов – Hoge Veluwe.</p>
            <p>Идеальный повод ехать: велосипеды и осенний лес, глоток живой природы охраняемого заповедника, полноценный доступный взору Ван Гог, ну и загадка дня - что же у нас багажнике (сюрприз-сюрприз).</p>
            <p>Мы неформально познакомимся, узнаем об истории создания парка и коллекции, проведем успокаивающий и вдохновляющий день в лесном музее, полакомимся локальным обедом в заповедном ресторане. У нас будет возможность самостоятельно побродить по лесу. Внимание - проверяйте актуальный прогноз погоды и если нужно, возьмите дождевик. Парк и музей прекрасны в любую погоду - проверено.</p>
            <p>В национальном парке мы возьмем велосипеды, чтобы передвигаться быстро и независимо, посетим подземный музей заповедника, локальный Ресторан, музей искусства семейства Кроллер Мюллер, музей под открытым небом, и, если погода позволит, сделаем несколько кругов по национальному парку в поисках кабанов, оленей и торгующих скрытых жемчужин парка.</p>
            <p>После этого мы отправимся домой, всех доставим прямо к двери.</p>
            <p>Выедем утром в субботу 3 октября - Гаага, Амстердам, забираем от порога.</p>
            <p>Группа всего 4 человека.</p>
          </article>
        </div>
      </section>

      <section className="bg-ink py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-2xl font-medium tracking-[-0.02em] sm:text-3xl">Фотографии предыдущих поездок</h2>
          <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {gallery.map((image) => (
              <div key={`${image.src}-${image.position}`} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white/5">
                <Image src={image.src} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="scale-[1.06] object-cover" style={{ objectPosition: image.position }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection locale="ru" />
      <TripPartnershipNote locale="ru" />
    </main>
  );
}
