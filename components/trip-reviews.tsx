const localieUrl = "https://localie.co/profile/alexlindholm";

export function TripReviews({ locale = "ru" }: { locale?: "ru" | "en" }) {
  const ru = locale === "ru";

  return (
    <section className="border-y border-ink/10 bg-bone py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">
              {ru ? "Отзывы" : "Reviews"}
            </p>
            <h2 className="mt-3 text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
              {ru ? "Отзывы участников поездок" : "Reviews from trip participants"}
            </h2>
          </div>
          <div>
            <p className="text-sm leading-6 text-graphite/72">
              {ru
                ? "Отзывы о предыдущих поездках доступны в моем профиле гида в Localie."
                : "Reviews from previous trips are available in my Localie guide profile."}
            </p>
            <a
              href={localieUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-ink/15 bg-white px-4 text-sm font-semibold text-ink transition hover:border-electric hover:text-electric"
            >
              {ru ? "Смотреть отзывы" : "View reviews"}
            </a>
          </div>
        </div>
        <p className="mt-8 border-t border-ink/10 pt-5 text-xs leading-5 text-graphite/58">
          {ru ? (
            <>
              Авторские поездки в 2023–2025 гг. совершались в партнерстве с сообществом Localie и могут быть запрошены и забронированы также через сообщество. {" "}
              <a href={localieUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:text-electric">
                Профиль гида
              </a>
            </>
          ) : (
            <>
              Original trips in 2023–2025 were organized in partnership with the Localie community and can also be requested and booked through the community. {" "}
              <a href={localieUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:text-electric">
                Guide profile
              </a>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
