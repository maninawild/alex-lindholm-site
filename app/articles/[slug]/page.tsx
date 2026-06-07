import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MarkdownContent } from "@/components/markdown-content";
import { SiteHeader } from "@/components/site-header";
import {
  type ArticleSummary,
  articleJsonLd,
  formatArticleDate,
  getAllArticles,
  getArticleBySlug,
  getArticleTranslations,
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
  const translations = getArticleTranslations(article);
  const isTelegramArticle = article.contentSource === "telegram_ru";
  const articleMedia = getArticleMedia(article);
  const articleContent = isTelegramArticle ? articleMedia.content : article.content;

  return (
    <main className="bg-bone pt-20 text-ink sm:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
      <SiteHeader transparentAtTop={false} />

      <article>
        <header className="mx-auto max-w-4xl px-5 pb-10 pt-8 sm:px-8 lg:pt-12">
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
          <LanguageSwitcher currentArticle={article} translations={translations} />
          <ContentSourceNotice article={article} />
        </header>

        {article.featuredImage && !isTelegramArticle ? (
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-ink/10 bg-white p-3 shadow-quiet sm:aspect-[16/9]">
              <Image src={article.featuredImage} alt={article.title} fill sizes="(min-width: 1024px) 960px, 100vw" className="object-contain p-3" priority />
            </div>
          </div>
        ) : null}

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,720px)_260px] lg:items-start lg:py-16">
          <div>
            <MarkdownContent content={articleContent} />
            {isTelegramArticle ? <RelatedImageSection images={articleMedia.images} /> : null}
          </div>
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

type ArticleImage = {
  alt: string;
  src: string;
};

function getArticleMedia(article: ArticleSummary & { content?: string }) {
  const content = "content" in article && article.content ? article.content : "";
  const images: ArticleImage[] = [];
  const seen = new Set<string>();

  if (article.featuredImage) {
    images.push({ alt: article.title, src: article.featuredImage });
    seen.add(article.featuredImage);
  }

  const textBlocks = content
    .split(/\n{2,}/)
    .map((block) => {
      const image = block.trim().match(/^!\[([^\]]*)]\(([^)]+)\)$/);
      if (!image) return block;

      const [, alt, src] = image;
      if (!seen.has(src)) {
        images.push({ alt: alt || article.title, src });
        seen.add(src);
      }

      return "";
    })
    .filter((block) => block.trim());

  return {
    content: textBlocks.join("\n\n").trim(),
    images,
  };
}

function RelatedImageSection({ images }: { images: ArticleImage[] }) {
  if (images.length === 0) return null;

  const isGallery = images.length > 1;

  return (
    <section className="mt-14 border-t border-ink/10 pt-8">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-copper">
        {isGallery ? "Related images" : "Related image"}
      </p>
      <div className={isGallery ? "mt-5 grid gap-4 sm:grid-cols-2" : "mt-5"}>
        {images.map((image) => (
          <figure key={image.src} className="overflow-hidden rounded-md border border-ink/10 bg-white p-3 shadow-quiet">
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="max-h-[620px] w-full rounded-[3px] object-contain"
            />
            {image.alt ? (
              <figcaption className="mt-3 text-xs leading-5 text-graphite/56">
                {image.alt}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}

function LanguageSwitcher({
  currentArticle,
  translations,
}: {
  currentArticle: ArticleSummary;
  translations: ArticleSummary[];
}) {
  if (translations.length === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2 rounded-md border border-ink/10 bg-white p-3 text-sm">
      <span className="mr-1 text-xs font-medium uppercase tracking-[0.16em] text-graphite/52">Read in</span>
      <span className="rounded-md bg-ink px-3 py-1.5 text-xs text-white">
        {articleLanguages[currentArticle.language]}
      </span>
      {translations.map((translation) => (
        <a
          key={translation.slug}
          href={translation.href}
          className="rounded-md border border-ink/10 px-3 py-1.5 text-xs text-graphite/72 transition hover:border-electric hover:text-electric"
        >
          {articleLanguages[translation.language]}
        </a>
      ))}
    </div>
  );
}

function ContentSourceNotice({ article }: { article: ArticleSummary }) {
  const sourceLink = article.sourceUrl ? (
    <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-electric underline decoration-electric/25 underline-offset-4 transition hover:decoration-electric">
      {article.source}
    </a>
  ) : (
    <span>{article.source}</span>
  );

  let notice = "Originally written and published in English by Alex Lindholm.";

  if (article.contentSource === "telegram_ru" && article.language === "ru") {
    notice = "Originally published in Russian on Telegram @cynicschool. Original publication date preserved.";
  }

  if (article.contentSource === "telegram_ru" && article.language === "en") {
    notice = "Originally published in Russian on Telegram @cynicschool. This English version was translated with AI and edited for readability. Original publication date preserved.";
  }

  return (
    <div className="mt-6 rounded-md border border-ink/10 bg-white p-4 text-sm leading-6 text-graphite/72">
      <span className="font-medium text-ink">Source note:</span> {notice}
      <span className="mt-2 block">
        <span className="font-medium text-ink">Source:</span> {sourceLink}
      </span>
    </div>
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
