import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/site-header";
import {
  courseAccessCookie,
  verifyCourseAccessToken,
} from "@/lib/safe-investing-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Доступ к курсу | Alex Lindholm",
  robots: { index: false, follow: false },
};

const lessons = [
  {
    number: "01",
    title: "Введение в инвестиции простыми словами",
    id: "B4JWAl1TTDo",
  },
  {
    number: "02",
    title: "Способы и механизмы заработка на бирже",
    env: "SAFE_INVESTING_LESSON_2_ID",
  },
  {
    number: "03",
    title: "Основные риски инвестиций",
    env: "SAFE_INVESTING_LESSON_3_ID",
  },
] as const;

export default async function SafeInvestingAccessPage() {
  const token = (await cookies()).get(courseAccessCookie)?.value;
  const hasAccess = verifyCourseAccessToken(token);

  if (!hasAccess) {
    return (
      <main className="min-h-screen bg-[#F4F6F8] text-ink">
        <SiteHeader />
        <section className="mx-auto flex min-h-[80vh] max-w-xl items-center px-5 py-32 sm:px-8">
          <div className="w-full rounded-sm border border-ink/10 bg-white p-7 shadow-sm sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">
              Закрытый раздел
            </p>
            <h1 className="mt-4 text-3xl font-medium tracking-[-0.03em]">
              Доступ не подтверждён
            </h1>
            <p className="mt-4 text-base leading-7 text-graphite/72">
              Уроки 2–3 открываются автоматически после подтверждённой оплаты Stripe.
            </p>
            <Link
              href="/ru/courses/safe-investing"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-electric px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Вернуться к курсу
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const resolvedLessons = lessons.map((lesson) => ({
    ...lesson,
    videoId: "id" in lesson ? lesson.id : process.env[lesson.env],
  }));

  return (
    <main className="min-h-screen bg-white text-ink">
      <SiteHeader />
      <section className="bg-ink pb-14 pt-32 text-white sm:pb-18 sm:pt-40">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            Оплата подтверждена
          </p>
          <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-6xl">
            Безопасные инвестиции
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">
            Все три урока доступны на этой странице в течение 30 дней на этом устройстве.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 sm:px-8">
          {resolvedLessons.map((lesson) => (
            <article key={lesson.number}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">
                Урок {lesson.number}
              </p>
              <h2 className="mt-3 text-2xl font-medium tracking-[-0.025em] sm:text-3xl">
                {lesson.title}
              </h2>
              {lesson.videoId ? (
                <div className="mt-6 aspect-video overflow-hidden rounded-sm border border-ink/10 bg-black shadow-xl">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${lesson.videoId}?rel=0`}
                    title={lesson.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="mt-6 rounded-sm border border-ink/10 bg-[#F4F6F8] p-6 text-sm text-graphite/70">
                  Видео временно недоступно. Напишите автору курса.
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
