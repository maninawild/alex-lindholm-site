"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const discoveryCallUrl = "https://zcal.co/axlindholm/discovery";

export function DiscoveryCallCta() {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    setTarget(document.querySelector("#work > div"));
  }, []);

  if (!target) {
    return null;
  }

  return createPortal(
    <div className="mt-6 flex flex-col items-start gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-2xl text-sm leading-6 text-graphite/65">
        Not sure which area fits your question? Start with a short discovery call.
      </p>
      <a
        href={discoveryCallUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 shrink-0 items-center justify-center gap-3 rounded-md border border-electric bg-electric px-5 text-sm font-medium text-white transition duration-300 hover:bg-blue-700"
        aria-label="Book a short discovery call with Alex Lindholm"
      >
        <span>Book a short discovery call</span>
        <span aria-hidden="true">→</span>
      </a>
    </div>,
    target,
  );
}
