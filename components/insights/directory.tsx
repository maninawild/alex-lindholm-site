import { translator, type Locale } from "@/lib/i18n";
import Link from "next/link";
import type { InsightCategory, InsightTopic } from "@/lib/insights";

export function InsightsDirectory({
  categories,
  topics,
  locale = "en",
}: {
  categories: InsightCategory[];
  topics: InsightTopic[];
  locale?: Locale;
}) {
  const t = translator(locale);
  return (
    <section className="border-y border-ink/10 bg-white py-14">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div id="topics">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-copper">
            {t("Knowledge paths")}</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight">{t("Explore topic clusters")}</h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {topics.map((topic) => (
              <Link
                className="rounded-md border border-ink/10 p-4 transition hover:border-electric/45 hover:shadow-quiet"
                href={`/articles/topics/${topic.slug}`}
                key={topic.slug}
              >
                <span className="font-medium">{t(topic.name)}{locale === "ru" ? " (EN)" : ""}</span>
                <span className="mt-2 block text-xs text-graphite/58">
                  {topic.articleCount} {locale === "ru" ? ({zero: "статей", two: "статьи", one: "статья", few: "статьи", many: "статей", other: "статьи"}[new Intl.PluralRules("ru").select(topic.articleCount)] ?? "статей") : topic.articleCount === 1 ? "article" : "articles"}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div id="categories">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-copper">
            {t("Editorial structure")}</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight">{t("Browse categories")}</h2>
          <div className="mt-7 flex flex-wrap gap-2">
            {categories.filter((category) => category.articleCount > 0).map((category) => (
              <Link
                className="rounded-md border border-ink/10 px-3 py-2 text-sm text-graphite/72 transition hover:border-electric hover:text-electric"
                href={`/articles/categories/${category.slug}`}
                key={category.slug}
              >
                {t(category.name)}{locale === "ru" ? " (EN)" : ""} <span className="text-graphite/45">({category.articleCount})</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
