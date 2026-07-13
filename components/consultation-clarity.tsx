"use client";

import { useEffect } from "react";

const SESSION_URL = "https://zcal.co/axlindholm/1hour";

export function ConsultationClarity() {
  useEffect(() => {
    const sessionLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(`a[href="${SESSION_URL}"]`),
    );

    sessionLinks.forEach((link) => {
      const section = link.closest("section");

      if (section?.id === "strategic-session") {
        link.textContent = "Book 60-min session — €100";
        link.setAttribute(
          "aria-label",
          "Book a paid 60-minute strategic consultation with Alex Lindholm for 100 euros",
        );
        return;
      }

      if (section?.id === "contact") {
        link.textContent = "Book a €100 session";
        link.setAttribute(
          "aria-label",
          "Book a paid strategic consultation with Alex Lindholm for 100 euros",
        );
        return;
      }

      link.textContent = "Book a €100 Strategic Session";
      link.setAttribute(
        "aria-label",
        "Book a paid strategic consultation with Alex Lindholm for 100 euros",
      );
    });

    const strategicSection = document.getElementById("strategic-session");
    if (strategicSection && !strategicSection.querySelector("[data-session-price]")) {
      const heading = strategicSection.querySelector("h2");
      if (heading) {
        const price = document.createElement("p");
        price.dataset.sessionPrice = "true";
        price.className =
          "mt-3 text-base font-semibold tracking-[-0.01em] text-ink";
        price.textContent = "60 minutes · €100 · Paid consultation";
        heading.insertAdjacentElement("afterend", price);
      }
    }
  }, []);

  return null;
}
