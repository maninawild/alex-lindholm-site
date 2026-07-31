import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightArticleGrid } from "@/components/insights/article-grid";
import { InsightsLandingHeader } from "@/components/insights/landing-header";
import { SiteHeader } from "@/components/site-header";
import {
  getArticlesForTopic,
  getInsightTopic,
  getInsightTopics,
  insightBreadcrumbJsonLd,
} from "@/lib/insights";

type TopicPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getInsightTopics().map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getInsightTopic(slug);
  if (!topic) return {};

  const path = `/articles/topics/${topic.slug}`;
  return {
    title: topic.name,
    description: topic.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${topic.name} | Alex Lindholm Insights`,
      description: topic.description,
      url: path,
      type: "website",
    },
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = getInsightTopic(slug);
  if (!topic) notFound();

  const articles = getArticlesForTopic(slug);
  const breadcrumbs = [
    { name: "Insights", href: "/articles" },
    { name: "Topics", href: "/articles#topics" },
    { name: topic.name, href: `/articles/topics/${topic.slug}` },
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
          { label: "Topics", href: "/articles#topics" },
          { label: topic.name },
        ]}
        description={topic.description}
        eyebrow="Knowledge path"
        meta={`${articles.length} ${articles.length === 1 ? "article" : "articles"}`}
        title={topic.name}
      />
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <InsightArticleGrid articles={articles} />
      </section>
    </main>
  );
}
