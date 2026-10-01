"use client";

import { useEffect, useState } from "react";

export function PrivateNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("private-notice-dismissed")) return;
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!visible) return null;

  return (
    <aside role="dialog" aria-label="Private area notice" className="fixed inset-x-4 bottom-4 z-[130] mx-auto max-w-xl border border-ink/12 bg-white p-5 shadow-[0_18px_60px_rgba(16,19,26,0.22)] sm:inset-x-auto sm:right-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric">Private area</p>
      <p className="mt-2 text-sm leading-6 text-graphite/76">You are in the private area of this site. All rights and data are protected from copying and sharing. Please contact the owner before forwarding any information.</p>
      <button type="button" onClick={() => { sessionStorage.setItem("private-notice-dismissed", "true"); setVisible(false); }} className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-graphite">
        I understand
      </button>
    </aside>
  );
}
