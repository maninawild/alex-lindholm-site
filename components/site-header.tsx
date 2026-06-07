"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "/#work", label: "Work" },
  { href: "/lectures-and-speaking", label: "Speaking" },
  { href: "/articles", label: "Articles" },
  { href: "/#collaborate", label: "Collaborate" },
];

const linkedinUrl = "https://www.linkedin.com/in/axlindholm/";

type SiteHeaderProps = {
  transparentAtTop?: boolean;
};

export function SiteHeader({ transparentAtTop = true }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const isSolid = !transparentAtTop || isScrolled || isMenuOpen;

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-[100] w-full transition-[background-color,border-color,color,box-shadow] duration-300 ${
        isSolid
          ? "border-b border-ink/10 bg-[rgba(255,255,255,0.92)] text-ink shadow-[0_1px_18px_rgba(16,19,26,0.045)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent text-white"
      }`}
    >
      <nav className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 md:py-4">
        <a
          href="/#top"
          className={`text-lg font-bold tracking-[-0.01em] transition ${
            isSolid ? "text-ink" : "text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.82)]"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          Alex Lindholm
        </a>
        <div
          className={`hidden items-center gap-x-6 text-sm font-semibold md:flex ${
            isSolid ? "text-graphite/78" : "text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.78)]"
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`transition ${
                isSolid ? "hover:text-ink" : "hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className={`inline-flex min-h-11 items-center justify-center rounded-md border px-3 text-sm font-semibold transition md:hidden ${
            isSolid
              ? "border-ink/12 bg-white text-ink"
              : "border-white/45 bg-ink/18 text-white backdrop-blur-md [text-shadow:0_1px_8px_rgba(0,0,0,0.72)]"
          }`}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-site-menu"
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </nav>
      {isMenuOpen ? (
        <div id="mobile-site-menu" className="pointer-events-auto border-t border-ink/10 bg-white px-5 py-4 text-ink shadow-quiet md:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {[...navItems, { href: linkedinUrl, label: "LinkedIn" }].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="min-h-12 rounded-md border border-ink/8 px-4 py-3 text-base font-medium text-ink transition hover:border-electric hover:bg-electric/5"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer me" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
