import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InsightArticleGrid } from "@/components/insights/article-grid";
import { InsightsLandingHeader } from "@/components/insights/landing-header";
import { SiteHeader } from "@/components/site-header";
import {
  getArticlesForCategory,
  getInsightCategories,
  getInsightCategory,
  getTopicsForCategory,
  insightBreadcrumbJsonLd,
} from "@/lib/insights";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getInsightCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getInsightCategory(slug);
  if (!category) return {};

  const path = `/articles/categories/${category.slug}`;
  return {
    title: `${category.name} Insights`,
    description: category.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${category.name} Insights | Alex Lindholm`,
      description: category.description,
      url: path,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getInsightCategory(slug);
  if (!category) notFound();

  const articles = getArticlesForCategory(slug);
  const topics = getTopicsForCategory(category.name);
  const breadcrumbs = [
    { name: "Insights", href: "/articles" },
    { name: "Categories", href: "/articles#categories" },
    { name: category.name, href: `/articles/categories/${category.slug}` },
  ];

  return (
    <main className="bg-bone pt-20 text-ink sm:pt-24">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(insightBreadcrumbJsonLd(breadcrumbs)),
        }}
        type="application/ld+json"
      />
      <SiteHeader transparentAtTop={false} />
      <InsightsLandingHeader
        breadcrumbs={[
          { label: "Insights", href: "/articles" },
          { label: "Categories", href: "/articles#categories" },
          { label: category.name },
        ]}
        description={category.description}
        eyebrow="Insights category"
        meta={`${articles.length} ${articles.length === 1 ? "article" : "articles"}`}
        title={category.name}
      />
      {topics.length > 0 ? (
        <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-copper">
            Related knowledge paths
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {topics.map((topic) => (
              <Link
                className="rounded-md border border-ink/10 bg-white px-4 py-3 text-sm font-medium transition hover:border-electric hover:text-electric"
                href={`/articles/topics/${topic.slug}`}
                key={topic.slug}
              >
                {topic.name} · {topic.articleCount}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <InsightArticleGrid articles={articles} />
      </section>
    </main>
  );
}
