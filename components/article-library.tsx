"use client";

import { useMemo, useState } from "react";
import { articleLanguages, type ArticleLanguage } from "@/data/article-taxonomy";
import type { ArticleSummary } from "@/lib/articles";

type ArticleLibraryProps = {
  articles: ArticleSummary[];
};

const languageOptions = [
  { label: "All", value: "all" },
  { label: "English", value: "en" },
  { label: "Russian", value: "ru" },
] as const;

const featuredTopics = [
  "Human-Centered AI",
  "Ethical Technology",
  "Startup Ecosystems",
  "Society",
  "Digital Humanism",
  "Future of Work",
  "Media & Algorithms",
  "Cities & Communities",
];

export function ArticleLibrary({ articles }: ArticleLibraryProps) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState<(typeof languageOptions)[number]["value"]>("all");
  const [tag, setTag] = useState("All");

  const topicTags = useMemo(() => {
    const allTags = Array.from(new Set([...featuredTopics, ...articles.flatMap((article) => article.tags)]));
    return allTags.sort((a, b) => a.localeCompare(b));
  }, [articles]);

  const visibleArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesLanguage = language === "all" || article.language === language;
      const matchesTag = tag === "All" || article.tags.includes(tag) || article.category === tag;
      const searchable = [
        article.title,
        article.category,
        article.language,
        article.metaDescription,
        article.source,
        article.status,
        ...article.tags,
      ]
        .join(" ")
        .toLowerCase();

      return matchesLanguage && matchesTag && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [articles, language, query, tag]);

  const hasRussianArticles = articles.some((article) => article.language === "ru");
  const emptyTitle =
    language === "ru" && !hasRussianArticles
      ? "Russian articles will appear here after Telegram import."
      : "No articles match these filters.";
  const emptyText =
    language === "ru" && !hasRussianArticles
      ? "The Telegram import structure is prepared, but no Russian posts have been imported yet."
      : "Try All languages, clear the search, or choose another topic tag.";

  return (
    <section className="bg-bone pb-20 text-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative z-10 border-y border-ink/10 bg-white py-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <label className="block">
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-graphite/52">
                Search articles
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, topic, tag, or description"
                className="min-h-12 w-full rounded-md border border-ink/12 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-graphite/45 focus:border-electric"
              />
            </label>
            <div className="relative z-10 flex flex-wrap gap-2">
              {languageOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setLanguage(option.value)}
                  className={`relative z-10 min-h-10 rounded-md border px-4 text-sm transition ${
                    language === option.value
                      ? "border-electric bg-electric text-white"
                      : "border-ink/12 bg-white text-graphite/74 hover:border-electric"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-graphite/52">
              Featured topics
            </p>
            <div className="relative z-10 flex gap-2 overflow-x-auto pb-1">
              {["All topics", ...featuredTopics].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTag(item === "All topics" ? "All" : item)}
                  className={`relative z-10 shrink-0 rounded-md border px-3 py-2 text-xs transition ${
                    (item === "All topics" ? tag === "All" : tag === item)
                      ? "border-ink bg-ink text-white"
                      : "border-ink/10 bg-white text-graphite/70 hover:border-ink/30"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-3 flex gap-2 overflow-x-auto pb-1">
            {topicTags.filter((item) => !featuredTopics.includes(item)).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTag(item)}
                className={`relative z-10 shrink-0 rounded-md border px-3 py-2 text-xs transition ${
                  tag === item
                    ? "border-ink bg-ink text-white"
                    : "border-ink/10 bg-white text-graphite/70 hover:border-ink/30"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {visibleArticles.length > 0 ? (
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="mt-12 max-w-2xl border-l border-ink/14 pl-6">
            <p className="font-serif text-3xl leading-tight text-ink">{emptyTitle}</p>
            <p className="mt-4 text-base leading-7 text-graphite/72">
              {emptyText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: ArticleSummary }) {
  const languageLabel = articleLanguages[article.language as ArticleLanguage];

  return (
    <article className="group flex min-h-[420px] flex-col overflow-hidden rounded-md border border-ink/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-quiet">
      {article.featuredImage ? (
        <a href={article.href} className="flex aspect-[16/10] items-center justify-center border-b border-ink/8 bg-white p-3">
          <img
            src={article.featuredImage}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </a>
      ) : null}

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em] text-graphite/52">
            <span>{languageLabel}</span>
            <span>/</span>
            <span>{formatCardDate(article.originalDate || article.date, article.language)}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {article.source ? (
              <span className="rounded-md border border-ink/10 px-2.5 py-1 text-xs text-graphite/65">
                {article.source}
              </span>
            ) : null}
            <span className="rounded-md border border-ink/10 px-2.5 py-1 text-xs text-graphite/65">
              {article.readingTime} min read
            </span>
          </div>
          <h2 className="mt-5 font-serif text-3xl leading-[1.08] tracking-[-0.01em] text-ink">
            <a href={article.href}>{article.title}</a>
          </h2>
          <p className="mt-4 line-clamp-4 text-sm leading-6 text-graphite/72">{article.excerpt}</p>
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-ink px-3 py-1.5 text-xs text-white">{article.category}</span>
            {article.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-md border border-ink/10 px-3 py-1.5 text-xs text-graphite/68">
                {tag}
              </span>
            ))}
          </div>
          <a className="mt-6 inline-flex text-sm font-medium text-electric transition group-hover:translate-x-1" href={article.href}>
            Read article
          </a>
        </div>
      </div>
    </article>
  );
}

function formatCardDate(date: string | undefined, language: ArticleLanguage) {
  if (!date) return "Undated";

  return new Intl.DateTimeFormat(language === "ru" ? "ru-RU" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
