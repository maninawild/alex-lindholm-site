"use client";
import { useEffect } from "react";
import { track } from "@vercel/analytics";

export function ConversionEvents() {
  useEffect(() => {
    function click(event: MouseEvent) {
      if (location.pathname.startsWith("/private")) return;
      const link = (event.target as Element)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const placement = link.closest("nav") ? "navigation" : link.closest("#contact") ? "contact" : "content";
      if (href === "/product-venture-leader") track("hiring_entry_click", { placement });
      else if (href.startsWith("mailto:alex@inspirexchange.nl")) track("hiring_contact_click", { placement });
      else if (href.startsWith("https://zcal.co/axlindholm/")) track("consultation_click", { placement, kind: href.includes("discovery") ? "discovery" : "paid" });
    }
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}
