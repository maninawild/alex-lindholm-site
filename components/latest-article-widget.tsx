"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type LatestArticle = {
  title: string;
  href: string;
  date?: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  source: string;
};

export function LatestArticleWidget() {
  const [article, setArticle] = useState<LatestArticle | null>(null);
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    setTarget(document.querySelector("#strategic-session")?.parentElement ?? null);
    fetch("/api/articles/latest")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => setArticle(data?.article ?? null))
      .catch(() => setArticle(null));
  }, []);

  if (!target || !article) return null;

  const published = article.date
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(article.date))
    : null;

  return createPortal(
    <section className="bg-bone py-10 text-ink sm:py-14" aria-labelledby="latest-writing-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid overflow-hidden rounded-sm border border-ink/10 bg-paper shadow-quiet lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-[260px] overflow-hidden bg-bone lg:min-h-full">
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
              priority
            />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              Latest from Alex
            </p>
            <h2 id="latest-writing-heading" className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.025em] text-balance sm:text-4xl">
              {article.title}
            </h2>
            <p className="mt-3 text-sm text-graphite/58">
              {[published, article.source].filter(Boolean).join(" · ")}
            </p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-graphite/74">
              {article.excerpt}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={article.href}
                className="inline-flex min-h-11 items-center justify-center gap-3 rounded-md border border-electric bg-electric px-5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <span>Read article</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="/articles"
                className="inline-flex min-h-11 items-center justify-center gap-3 rounded-md border border-ink/15 px-5 text-sm font-medium text-ink transition hover:border-electric hover:bg-electric/5"
              >
                <span>View all articles</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>,
    target,
  );
}
