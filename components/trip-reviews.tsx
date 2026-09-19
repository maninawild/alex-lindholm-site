const localieUrl = "https://localie.co/profile/alexlindholm";

export function TripPartnershipNote({ locale = "ru" }: { locale?: "ru" | "en" }) {
  const ru = locale === "ru";

  return (
    <aside className="border-t border-ink/10 bg-white py-7">
      <p className="mx-auto max-w-7xl px-5 text-xs leading-5 text-graphite/58 sm:px-8">
        {ru
          ? "Авторские поездки в 2023–2025 гг. совершались в партнерстве с сообществом Localie и могут быть запрошены и забронированы также через сообщество. "
          : "Original trips in 2023–2025 were organized in partnership with the Localie community and can also be requested and booked through the community. "}
        <a href={localieUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:text-[#8F3F4D]">
          {ru ? "Профиль гида" : "Guide profile"}
        </a>
      </p>
    </aside>
  );
}
