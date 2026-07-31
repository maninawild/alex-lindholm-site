"use client";

import { useEffect } from "react";

const serviceLabelPattern = /^(?:post\s*\d+|additional(?:\s+post)?|дополнительно|пост\s*\d+)\s*[:.-]?$/i;

export function ArticlePresentationCleanup() {
  useEffect(() => {
    if (!window.location.pathname.startsWith("/articles/")) return;

    const prose = document.querySelector<HTMLElement>(".article-prose");
    if (!prose) return;

    const candidates = prose.querySelectorAll<HTMLElement>("h1, h2, h3, p, strong");

    candidates.forEach((element) => {
      const text = element.textContent?.replace(/\s+/g, " ").trim() ?? "";
      if (!serviceLabelPattern.test(text)) return;

      const block = element.closest("h1, h2, h3, p") as HTMLElement | null;
      (block ?? element).remove();
    });

    prose.querySelectorAll("p").forEach((paragraph) => {
      if (!paragraph.textContent?.trim() && !paragraph.querySelector("img")) {
        paragraph.remove();
      }
    });
  }, []);

  return null;
}
