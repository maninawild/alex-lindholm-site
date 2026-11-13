import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MarkdownContent } from "@/components/markdown-content";
import { SiteHeader } from "@/components/site-header";
import {
  type ArticleSummary,
  articleBreadcrumbJsonLd,
  articleJsonLd,
  formatArticleDate,
  getAllArticles,
  getArticleBySlug,
  getArticleTranslations,
} from "@/lib/articles";
import { insightAuthor } from "@/data/insights-taxonomy";
import { absoluteUrl, author } from "@/lib/site";
import {
  getFurtherReading,
  getPillarForArticle,
  getSupportingArticles,
  getTopicsForArticle,
  insightAuthorHref,
  insightCategoryHref,
  insightTopicHref,
} from "@/lib/insights";

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
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const translations = getArticleTranslations(article);
  const languageAlternates = Object.fromEntries(
    [article, ...translations].map((translation) => [
      translation.language,
      translation.href,
    ]),
  );

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    robots: {
      index: article.robots === "index",
      follow: true,
    },
    alternates: {
      canonical: article.href,
      ...(Object.keys(languageAlternates).length > 1
        ? {
            languages: languageAlternates,
          }
        : {}),
    },
    openGraph: {
      title: article.openGraphTitle,
      description: article.openGraphDescription,
      url: article.href,
      type: "article",
      publishedTime: article.originalDate || article.date,
      modifiedTime: article.lastReviewed || article.date || article.originalDate,
      authors: [author.name],
      tags: article.tags,
      locale: article.language === "ru" ? "ru_RU" : "en_US",
      images: [
        {
          url: article.coverImage,
          alt: article.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.openGraphTitle,
      description: article.openGraphDescription,
      images: [article.coverImage],
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
  const related = getSupportingArticles(article);
  const furtherReading = getFurtherReading(
    article,
    related.map((item) => item.slug),
  );
  const pillar = getPillarForArticle(article);
  const topics = getTopicsForArticle(article);
  const categoryHref = insightCategoryHref(article.category);
  const translations = getArticleTranslations(article);
  const isTelegramArticle = article.contentSource === "telegram_ru";
  const articleMedia = getArticleMedia(article);
  const articleContent = isTelegramArticle ? articleMedia.content : article.content;
  const preparedContent = removeLeadingTitleHeading(articleContent, article.title);
  const { body: renderedArticleContent, translationNote } = splitTranslationNote(preparedContent);
  const ru = article.language === "ru";
  const originalLanguage = article.translatedFrom || (isTelegramArticle ? "ru" : "en");
  const isTranslation = originalLanguage !== article.language;
  const counterpart = translations[0];

  return (
    <main className="bg-bone pt-20 text-ink sm:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleBreadcrumbJsonLd(article, categoryHref)),
        }}
      />
      <SiteHeader
        transparentAtTop={false}
        contentLanguage={article.language}
        languageSwitch={counterpart ? {
          href: counterpart.href,
          label: counterpart.language.toUpperCase(),
          ariaLabel: counterpart.language === "ru" ? "Читать по-русски" : "Read in English",
        } : undefined}
      />

      <article lang={article.language} className="article-reading">
        <header className="mx-auto max-w-[52rem] px-5 pb-6 pt-5 sm:px-8 sm:pt-8">
          <nav aria-label={ru ? "Навигация статьи" : "Article navigation"} className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-graphite/65">
            <Link className="inline-flex min-h-11 items-center transition hover:text-electric" href="/articles">
              {ru ? "← Все статьи" : "← Articles"}
            </Link>
            <span aria-hidden="true">/</span>
            <Link className="inline-flex min-h-11 items-center transition hover:text-electric" href={categoryHref}>{article.category}</Link>
          </nav>
          <h1 className="mt-3 font-serif text-[2rem] font-medium leading-[1.08] tracking-[-0.02em] text-balance sm:text-[2.75rem] lg:text-[3.25rem]">
            {article.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm leading-6 text-graphite/70">
            <Link className="font-medium text-ink hover:text-electric" href={insightAuthorHref()}>Alex Lindholm</Link>
            <span aria-hidden="true">·</span>
            <time dateTime={article.originalDate || article.date}>{formatArticleDate(article.originalDate || article.date, article.language)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime} {ru ? "мин чтения" : "min read"}</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-graphite/65">
            <span>{ru ? "Русский" : "English"}{isTranslation ? (ru ? " · перевод с английского" : " · translated from Russian") : (ru ? " · оригинал" : " · original")}</span>
            <LanguageSwitcher currentArticle={article} translations={translations} />
          </div>
        </header>

        <div className="mx-auto max-w-[52rem] px-5 pb-12 sm:px-8 sm:pb-16">
          <div className="article-body" id="article-body">
            <MarkdownContent content={renderedArticleContent} afterLead={!isTelegramArticle ? (
              <figure className="article-cover">
                <Image
                  src={article.coverImage}
                  alt={article.coverImageAlt}
                  width={960}
                  height={540}
                  sizes="(min-width: 832px) 768px, 100vw"
                  className="h-auto max-h-[20rem] w-full rounded-md object-contain"
                />
              </figure>
            ) : undefined} />
            {isTelegramArticle ? <RelatedImageSection images={articleMedia.images} /> : null}
          </div>

          <footer className="mt-10 space-y-6 border-t border-ink/10 pt-6">
            <ContentSourceNotice article={article} translationNote={translationNote} />
            <div className="text-sm leading-7 text-graphite/70">
              <p>
                <span className="font-medium text-ink">{ru ? "По теме: " : "Explore: "}</span>
                <Link className="text-electric underline underline-offset-4" href={pillar.href}>{pillar.name}</Link>
                {topics.slice(1).map((topic) => (
                  <span key={topic.slug}> · <Link className="text-electric underline underline-offset-4" href={insightTopicHref(topic)}>{topic.name}</Link></span>
                ))}
              </p>
              <p className="mt-2">{article.tags.join(" · ")}</p>
            </div>
            <ArticleUpdateHistory article={article} />
          </footer>
        </div>
      </article>

      <section aria-label={ru ? "Об авторе и контакты" : "Author and contact"} className="border-t border-ink/10 bg-white py-8">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:px-8 md:grid-cols-3">
          <AuthorBlock />
          <ShareBlock title={article.title} href={article.href} />
          <CtaBlock />
        </div>
      </section>

      <ArticleNavigation previousArticle={previousArticle} nextArticle={nextArticle} />

      {related.length > 0 ? (
        <section className="border-t border-ink/10 bg-white py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              Related Articles
            </p>
            <p className="mt-3 text-sm leading-6 text-graphite/68">
              Supporting reading from the {pillar.name} knowledge path.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      {furtherReading.length > 0 ? (
        <section className="border-t border-ink/10 bg-bone py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              Further Reading
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {furtherReading.map((item) => (
                <Link
                  className="rounded-md border border-ink/10 bg-white p-5 transition hover:border-electric/45 hover:shadow-quiet"
                  href={item.href}
                  key={item.slug}
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-graphite/50">
                    {item.category}
                  </p>
                  <h2 className="mt-3 font-serif text-2xl leading-tight">{item.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-graphite/70">
                    {item.metaDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function removeLeadingTitleHeading(content: string, title: string) {
  const [firstLine, ...remainingLines] = content.split("\n");
  return firstLine === `# ${title}` ? remainingLines.join("\n").trimStart() : content;
}

function ArticleUpdateHistory({ article }: { article: ArticleSummary }) {
  if (!article.lastReviewed && article.updateHistory.length === 0) return null;

  return (
    <section className="mt-14 border-t border-ink/10 pt-8">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-copper">
        Article history
      </p>
      {article.lastReviewed ? (
        <p className="mt-4 text-sm leading-6 text-graphite/72">
          <span className="font-medium text-ink">Last reviewed:</span>{" "}
          <time dateTime={article.lastReviewed}>
            {formatReviewDate(article.lastReviewed, article.language)}
          </time>
        </p>
      ) : null}
      {article.updateHistory.length > 0 ? (
        <ol className="mt-5 space-y-3 border-l border-ink/12 pl-5">
          {article.updateHistory.map((entry, index) => {
            const [date, ...noteParts] = entry.split("|");
            const note = noteParts.join("|").trim();
            return (
              <li className="text-sm leading-6 text-graphite/72" key={`${entry}-${index}`}>
                <time className="font-medium text-ink" dateTime={date.trim()}>
                  {formatReviewDate(date.trim(), article.language)}
                </time>
                {note ? ` — ${note}` : null}
              </li>
            );
          })}
        </ol>
      ) : null}
    </section>
  );
}

function formatReviewDate(
  date: string,
  language: ArticleSummary["language"],
) {
  return Number.isNaN(Date.parse(date))
    ? date
    : formatArticleDate(date, language);
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

function LanguageSwitcher({ currentArticle, translations }: { currentArticle: ArticleSummary; translations: ArticleSummary[] }) {
  if (translations.length === 0) return null;
  return (
    <nav aria-label={currentArticle.language === "ru" ? "Другие языки" : "Other languages"} className="flex flex-wrap gap-3">
      {translations.map((translation) => (
        <Link key={translation.slug} href={translation.href} hrefLang={translation.language} lang={translation.language}
          className="inline-flex min-h-11 items-center text-electric underline decoration-electric/30 underline-offset-4 hover:decoration-electric">
          {translation.language === "ru" ? "Читать по-русски" : "Read in English"}
        </Link>
      ))}
    </nav>
  );
}

function ContentSourceNotice({ article, translationNote }: { article: ArticleSummary; translationNote?: string }) {
  const ru = article.language === "ru";
  return (
    <section className="article-source text-sm leading-6 text-graphite/70" aria-label={ru ? "Источник и перевод" : "Source and translation"}>
      {translationNote ? <MarkdownContent content={translationNote.replace(/^>\s?/gm, "")} /> : null}
      <p className={translationNote ? "mt-3" : ""}>
        <span className="font-medium text-ink">{ru ? "Источник: " : "Source: "}</span>
        {article.sourceUrl ? (
          <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-electric underline decoration-electric/25 underline-offset-4">{article.source}</a>
        ) : article.source}
      </p>
    </section>
  );
}

// Relocate only explicit editorial translation disclosures, never a quoted argument.
function splitTranslationNote(content: string) {
  const blocks = content.trimStart().split(/\n{2,}/);
  if (/^> (?:Перевод с английского|Translated (?:from|with)|Translation (?:from|into))/i.test(blocks[0] || "")) {
    return { translationNote: blocks[0], body: blocks.slice(1).join("\n\n") };
  }
  return { body: content, translationNote: undefined };
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
  const articleUrl = absoluteUrl(href);
  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
  const telegramShare = `https://t.me/share/url?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(title)}`;

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
      <h2 className="mt-3 text-xl font-semibold">
        <Link className="transition hover:text-electric" href={insightAuthorHref()}>
          Alex Lindholm
        </Link>
      </h2>
      <p className="mt-3 text-sm leading-6 text-graphite/72">
        {insightAuthor.role}. Expertise in{" "}
        {insightAuthor.expertise.slice(0, 3).join(", ")}.
      </p>
      <Link className="mt-4 block text-sm font-medium text-electric" href={insightAuthorHref()}>
        View expertise and articles →
      </Link>
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
