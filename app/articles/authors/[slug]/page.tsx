import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InsightArticleGrid } from "@/components/insights/article-grid";
import { InsightsLandingHeader } from "@/components/insights/landing-header";
import { SiteHeader } from "@/components/site-header";
import { insightAuthor } from "@/data/insights-taxonomy";
import { getArticleSummaries } from "@/lib/articles";
import { insightBreadcrumbJsonLd } from "@/lib/insights";
import { absoluteUrl, author } from "@/lib/site";

type AuthorPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [{ slug: insightAuthor.slug }];
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== insightAuthor.slug) return {};

  const path = `/articles/authors/${insightAuthor.slug}`;
  return {
    title: `${insightAuthor.name}, ${insightAuthor.role}`,
    description: insightAuthor.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${insightAuthor.name} | Insights`,
      description: insightAuthor.description,
      url: path,
      type: "profile",
      images: [{ url: author.image, alt: insightAuthor.name }],
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  if (slug !== insightAuthor.slug) notFound();

  const articles = getArticleSummaries();
  const breadcrumbs = [
    { name: "Insights", href: "/articles" },
    { name: "Authors", href: `/articles/authors/${insightAuthor.slug}` },
    { name: insightAuthor.name, href: `/articles/authors/${insightAuthor.slug}` },
  ];

  return (
    <main className="bg-bone pt-20 text-ink sm:pt-24">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(insightBreadcrumbJsonLd(breadcrumbs)),
        }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${author.url}#alex-lindholm`,
            name: insightAuthor.name,
            jobTitle: insightAuthor.role,
            url: absoluteUrl(`/articles/authors/${insightAuthor.slug}`),
            image: author.image,
            knowsAbout: insightAuthor.expertise,
            sameAs: [author.linkedIn],
          }),
        }}
        type="application/ld+json"
      />
      <SiteHeader transparentAtTop={false} />
      <InsightsLandingHeader
        breadcrumbs={[
          { label: "Insights", href: "/articles" },
          { label: "Authors" },
          { label: insightAuthor.name },
        ]}
        description={insightAuthor.description}
        eyebrow="Author"
        meta={`${insightAuthor.role} · ${articles.length} published articles`}
        title={insightAuthor.name}
      />
      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-copper">
          Areas of expertise
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {insightAuthor.expertise.map((expertise) => (
            <span
              className="rounded-md border border-ink/10 bg-white px-4 py-2 text-sm text-graphite/72"
              key={expertise}
            >
              {expertise}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link className="font-medium text-electric" href="/articles/topics/startup-visa-netherlands">
            Startup Visa knowledge path →
          </Link>
          <Link className="font-medium text-electric" href="/articles/topics/startup-strategy">
            Startup strategy knowledge path →
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <InsightArticleGrid articles={articles} />
      </section>
    </main>
  );
}
