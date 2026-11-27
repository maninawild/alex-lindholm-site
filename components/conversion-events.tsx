"use client";
import { useEffect } from "react";
import { recordIntent } from "@/lib/metrics/client";

export function ConversionEvents({ enabled = false }: { enabled?: boolean }) {
  useEffect(() => {
    function click(event: MouseEvent) {
      if (!enabled) return;
      const link = (event.target as Element)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const path = href.replace(/^\/ru(?=\/|$)/, "");
      const placement = link.closest("nav") ? "navigation" : link.closest("#contact") ? "contact" : "content";
      if (path === "/product-venture-leader") recordIntent(enabled, "hiring_entry_click", placement);
      else if (href.startsWith("mailto:alex@inspirexchange.nl")) recordIntent(enabled, "hiring_contact_click", placement);
      else if (href.startsWith("https://zcal.co/axlindholm/")) recordIntent(enabled, "consultation_click", placement);
    }
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, [enabled]);
  return null;
}
