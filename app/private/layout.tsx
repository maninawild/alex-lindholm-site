import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { CopyDeterrence } from "@/components/private/copy-deterrence";
import { PrivateNotice } from "@/components/private/private-notice";

export async function generateMetadata(): Promise<Metadata> {
  const ru = (await headers()).get("x-private-locale") === "ru";
  const title = ru ? "Закрытый раздел" : "Private Area";
  const description = ru ? "Раздел, которым Алекс Линдхольм делится лично." : "An area shared personally by Alex Lindholm.";
  return {
    title,
    description,
    robots: { index: false, follow: false, noarchive: true, nosnippet: true, noimageindex: true },
    alternates: { canonical: null, languages: {} },
    openGraph: { title: `${title} | Alex Lindholm`, description, images: [] },
    twitter: { card: "summary", title: `${title} | Alex Lindholm`, description, images: [] },
  };
}

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const locale = h.get("x-private-locale") === "ru" ? "ru" : "en";
  const ru = locale === "ru";
  const jewish = h.get("x-private-pathname") === "/private/jewish";
  return (
    <div lang={locale} className="min-h-screen bg-paper text-ink">
      <div className="fixed inset-x-0 top-0 z-[120] h-9 border-b border-white/10 bg-[#10131a] text-white">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link href="/private" className="truncate text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/78 transition hover:text-white">
            {ru ? "Лично и конфиденциально · Алекс Линдхольм" : "Private & Confidential · Alex Lindholm"}
          </Link>
          <Link href="/" className="shrink-0 text-[0.68rem] font-semibold text-white/62 transition hover:text-white">
            {ru ? "Основной сайт (EN)" : "Main site"}
          </Link>
        </div>
      </div>
      <SiteHeader transparentAtTop={false} privateZone contentLanguage={locale} languageSwitch={jewish ? { href: ru ? "/private/jewish" : "/private/jewish?lang=ru", label: ru ? "EN" : "RU", ariaLabel: ru ? "Read this page in English" : "Читать эту страницу на русском" } : undefined} />
      <CopyDeterrence>
        <div className="pt-[6.7rem] sm:pt-[7.15rem]">{children}</div>
        <footer className="border-t border-ink/10 bg-[#10131a] px-5 py-6 text-white sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 text-[0.68rem] leading-5 text-white/52 sm:flex-row sm:items-center sm:justify-between">
            <p>{ru ? "© 2026 Алекс Линдхольм. Все права защищены." : "© 2026 Alex Lindholm. All rights reserved."}</p>
            <p>{ru ? "Лично и конфиденциально. Доступ предоставлен вам лично. Копирование, пересылка, публикация и распространение — только с предварительного письменного разрешения." : "Private & Confidential. Access is personal and non-transferable; no copying, forwarding, publication or redistribution without prior written permission."}</p>
          </div>
        </footer>
      </CopyDeterrence>
      <PrivateNotice locale={locale} />
    </div>
  );
}
