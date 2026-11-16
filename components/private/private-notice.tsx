"use client";

import { useEffect, useState } from "react";

export function PrivateNotice({ locale = "en" }: { locale?: "en" | "ru" }) {
  const ru = locale === "ru";
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = locale;
    return () => { document.documentElement.lang = previous; };
  }, [locale]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!visible) return null;

  return (
    <aside role="dialog" aria-label={ru ? "Уведомление о закрытом разделе" : "Private area notice"} className="fixed inset-x-4 bottom-4 z-[130] mx-auto max-w-xl border border-ink/12 bg-white p-5 shadow-[0_18px_60px_rgba(16,19,26,0.22)] sm:inset-x-auto sm:right-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric">{ru ? "Закрытый раздел" : "Private area"}</p>
      <p className="mt-2 text-sm leading-6 text-graphite/76">{ru ? "Вы в закрытом разделе сайта. Пожалуйста, не копируйте и не распространяйте материалы. Перед пересылкой любой информации свяжитесь с владельцем." : "You are in the private area of this site. Please do not copy or share these materials. Contact the owner before forwarding any information."}</p>
      <button type="button" onClick={() => { setVisible(false); }} className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-graphite">
        {ru ? "Понятно" : "I understand"}
      </button>
    </aside>
  );
}
