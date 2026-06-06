import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MarkdownContent } from "@/components/markdown-content";
import {
  type ArticleSummary,
  articleJsonLd,
  formatArticleDate,
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/articles";
import { articleLanguages } from "@/data/article-taxonomy";

const linkedinUrl = "https://www.linkedin.com/in/axlindholm/";
const consultationUrl = "https://zcal.co/axlindholm/1hour";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article not found",
    };
  }

  return {
    title: article.title,
    description: article.metaDescription,
    alternates: {
      canonical: article.href,
    },
    openGraph: {
      title: article.openGraphTitle,
      description: article.openGraphDescription,
      url: article.href,
      type: "article",
      publishedTime: article.originalDate || article.date,
      authors: ["Alex Lindholm"],
      tags: article.tags,
      images: article.featuredImage
        ? [
            {
              url: article.featuredImage,
              alt: article.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: article.featuredImage ? "summary_large_image" : "summary",
      title: article.openGraphTitle,
      description: article.openGraphDescription,
      images: article.featuredImage ? [article.featuredImage] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const allArticles = getAllArticles();
  const articleIndex = allArticles.findIndex((item) => item.slug === article.slug);
  const previousArticle = articleIndex >= 0 ? allArticles[articleIndex + 1] : undefined;
  const nextArticle = articleIndex > 0 ? allArticles[articleIndex - 1] : undefined;
  const related = getRelatedArticles(article);

  return (
    <main className="bg-bone text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <a href="/" className="text-lg font-semibold tracking-[-0.01em]">
          Alex Lindholm
        </a>
        <div className="flex items-center gap-5 text-sm text-graphite/70">
          <a href="/articles">Articles</a>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer me">
            LinkedIn
          </a>
        </div>
      </nav>

      <article>
        <header className="mx-auto max-w-4xl px-5 pb-10 pt-12 sm:px-8 lg:pt-20">
          <a href="/articles" className="mb-8 inline-flex rounded-md border border-ink/10 bg-white px-4 py-2 text-sm text-graphite/72 transition hover:border-electric hover:text-electric">
            Back to Articles
          </a>
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-graphite/58">
            <span>{articleLanguages[article.language]}</span>
            <span>/</span>
            <time dateTime={article.originalDate || article.date}>{formatArticleDate(article.originalDate || article.date, article.language)}</time>
            <span>/</span>
            <span>{article.readingTime} min read</span>
            <span>/</span>
            <span>{article.status}</span>
          </div>
          <h1 className="mt-6 font-serif text-5xl font-medium leading-[0.98] tracking-[-0.02em] text-balance sm:text-6xl lg:text-7xl">
            {article.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite/72">{article.metaDescription}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-md bg-ink px-3 py-1.5 text-xs text-white">{article.category}</span>
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-md border border-ink/10 px-3 py-1.5 text-xs text-graphite/68">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 rounded-md border border-ink/10 bg-white p-4 text-sm leading-6 text-graphite/72">
            <span className="font-medium text-ink">Original source:</span>{" "}
            {article.sourceUrl ? (
              <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-electric underline decoration-electric/25 underline-offset-4 transition hover:decoration-electric">
                {article.source}
              </a>
            ) : (
              <span>{article.source}</span>
            )}
          </div>
        </header>

        {article.featuredImage ? (
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-ink/10 bg-white p-3 shadow-quiet sm:aspect-[16/9]">
              <Image src={article.featuredImage} alt={article.title} fill sizes="(min-width: 1024px) 960px, 100vw" className="object-contain p-3" priority />
            </div>
          </div>
        ) : null}

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,720px)_260px] lg:items-start lg:py-16">
          <MarkdownContent content={article.content} />
          <aside className="space-y-5 lg:sticky lg:top-8">
            <ShareBlock title={article.title} href={article.href} />
            <AuthorBlock />
            <CtaBlock />
          </aside>
        </div>
      </article>

      <ArticleNavigation previousArticle={previousArticle} nextArticle={nextArticle} />

      {related.length > 0 ? (
        <section className="border-t border-ink/10 bg-white py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">Related Articles</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <a key={item.slug} href={item.href} className="rounded-md border border-ink/10 p-5 transition hover:border-electric/45 hover:shadow-quiet">
                  <p className="text-xs uppercase tracking-[0.14em] text-graphite/50">{item.category}</p>
                  <h2 className="mt-3 font-serif text-2xl leading-tight">{item.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-graphite/70">{item.metaDescription}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function ArticleNavigation({
  previousArticle,
  nextArticle,
}: {
  previousArticle?: ArticleSummary;
  nextArticle?: ArticleSummary;
}) {
  if (!previousArticle && !nextArticle) return null;

  return (
    <section className="border-t border-ink/10 bg-bone py-12">
      <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:px-8 md:grid-cols-2">
        {previousArticle ? (
          <a href={previousArticle.href} className="rounded-md border border-ink/10 bg-white p-5 transition hover:border-electric/45 hover:shadow-quiet">
            <p className="text-xs uppercase tracking-[0.16em] text-graphite/50">Previous article</p>
            <h2 className="mt-3 font-serif text-2xl leading-tight">{previousArticle.title}</h2>
            <p className="mt-3 text-sm leading-6 text-graphite/70">{formatArticleDate(previousArticle.originalDate || previousArticle.date, previousArticle.language)}</p>
          </a>
        ) : (
          <div />
        )}

        {nextArticle ? (
          <a href={nextArticle.href} className="rounded-md border border-ink/10 bg-white p-5 text-left transition hover:border-electric/45 hover:shadow-quiet md:text-right">
            <p className="text-xs uppercase tracking-[0.16em] text-graphite/50">Next article</p>
            <h2 className="mt-3 font-serif text-2xl leading-tight">{nextArticle.title}</h2>
            <p className="mt-3 text-sm leading-6 text-graphite/70">{formatArticleDate(nextArticle.originalDate || nextArticle.date, nextArticle.language)}</p>
          </a>
        ) : null}
      </div>
    </section>
  );
}

function ShareBlock({ title, href }: { title: string; href: string }) {
  const absoluteUrl = `https://alexlindholm.com${href}`;
  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(absoluteUrl)}`;
  const telegramShare = `https://t.me/share/url?url=${encodeURIComponent(absoluteUrl)}&text=${encodeURIComponent(title)}`;

  return (
    <section className="rounded-md border border-ink/10 bg-white p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-graphite/52">Share</p>
      <div className="mt-4 grid gap-2">
        <a className="rounded-md border border-ink/10 px-4 py-3 text-sm text-graphite/76 transition hover:border-electric" href={linkedInShare} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a className="rounded-md border border-ink/10 px-4 py-3 text-sm text-graphite/76 transition hover:border-electric" href={telegramShare} target="_blank" rel="noopener noreferrer">
          Telegram
        </a>
      </div>
    </section>
  );
}

function AuthorBlock() {
  return (
    <section className="rounded-md border border-ink/10 bg-white p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-graphite/52">Author</p>
      <h2 className="mt-3 text-xl font-semibold">Alex Lindholm</h2>
      <p className="mt-3 text-sm leading-6 text-graphite/72">
        Venture Architect, Human-Centered Technologist, Ecosystem Builder, Lecturer and Founder of InspireXchange.
      </p>
      <a className="mt-4 inline-flex text-sm font-medium text-electric" href={linkedinUrl} target="_blank" rel="noopener noreferrer me">
        Connect with Alex on LinkedIn →
      </a>
    </section>
  );
}

function CtaBlock() {
  return (
    <section className="rounded-md border border-ink/10 bg-ink p-5 text-white">
      <p className="text-xs uppercase tracking-[0.16em] text-white/52">Continue the conversation</p>
      <div className="mt-4 grid gap-2">
        <a className="rounded-md bg-white px-4 py-3 text-center text-sm font-medium text-ink transition hover:bg-white/90" href={linkedinUrl} target="_blank" rel="noopener noreferrer me">
          Connect on LinkedIn
        </a>
        <a className="rounded-md border border-white/18 px-4 py-3 text-center text-sm font-medium text-white transition hover:border-white/42" href={consultationUrl} target="_blank" rel="noopener noreferrer">
          Book a consultation
        </a>
      </div>
    </section>
  );
}
