import Link from "next/link";
import Image from "next/image";
import { articleLanguages } from "@/data/article-taxonomy";
import { formatArticleDate, type ArticleSummary } from "@/lib/articles";
import { insightCategoryHref } from "@/lib/insights";

export function InsightArticleGrid({
  articles,
  emptyMessage = "No published articles are available in this section yet.",
}: {
  articles: ArticleSummary[];
  emptyMessage?: string;
}) {
  if (articles.length === 0) {
    return (
      <div className="rounded-md border border-ink/10 bg-white p-6 text-sm leading-6 text-graphite/70">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {articles.map((article) => (
        <article
          className="flex min-h-[320px] flex-col overflow-hidden rounded-md border border-ink/10 bg-white transition hover:-translate-y-1 hover:border-electric/40 hover:shadow-quiet"
          key={article.slug}
          lang={article.language}
        >
          <Link className="block aspect-[16/10] overflow-hidden border-b border-ink/8 bg-bone" href={article.href}>
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt}
              width={800}
              height={500}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </Link>
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-graphite/52">
                <span>{articleLanguages[article.language]}</span>
                <span>/</span>
                <span>
                  {formatArticleDate(
                    article.originalDate || article.date,
                    article.language,
                  )}
                </span>
              </div>
              <h2 className="mt-5 font-serif text-3xl leading-[1.08] tracking-[-0.01em]">
                <Link href={article.href}>{article.title}</Link>
              </h2>
              <p className="mt-4 line-clamp-4 text-sm leading-6 text-graphite/72">
                {article.excerpt}
              </p>
            </div>
            <div className="mt-8 flex items-end justify-between gap-4">
              <Link
                className="rounded-md bg-ink px-3 py-1.5 text-xs text-white transition hover:bg-electric"
                href={insightCategoryHref(article.category)}
              >
                {article.category}
              </Link>
              <Link className="text-sm font-medium text-electric" href={article.href}>
                Read article
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
