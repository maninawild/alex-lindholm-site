import fs from "node:fs";
import path from "node:path";
import { articleCategories, type ArticleCategory, type ArticleLanguage } from "@/data/article-taxonomy";

export type ArticleFrontmatter = {
  id?: string;
  title: string;
  slug?: string;
  date?: string;
  tags?: string[];
  category?: ArticleCategory | string;
  language?: ArticleLanguage;
  featuredImage?: string;
  excerpt?: string;
  metaDescription?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  relatedArticles?: string[];
  source?: string;
  sourceUrl?: string;
  contentSource?: ContentSource;
  translatedFrom?: ArticleLanguage;
  originalSlug?: string;
  translationKey?: string;
  telegramMessageId?: string;
  originalDate?: string;
  status?: ArticleStatus;
};

export type ArticleStatus = "published" | "draft";
export type ContentSource = "telegram_ru" | "original_en";

export type Article = {
  id: string;
  title: string;
  slug: string;
  date?: string;
  tags: string[];
  category: ArticleCategory | string;
  language: ArticleLanguage;
  source: string;
  sourceUrl?: string;
  contentSource: ContentSource;
  translatedFrom?: ArticleLanguage;
  originalSlug?: string;
  translationKey?: string;
  telegramMessageId?: string;
  originalDate?: string;
  featuredImage?: string;
  excerpt: string;
  readingTime: number;
  relatedArticles: string[];
  metaDescription: string;
  openGraphTitle: string;
  openGraphDescription: string;
  status: ArticleStatus;
  content: string;
  body: string;
  href: string;
};

export type ArticleSummary = Omit<Article, "body" | "content">;

const articlesRoot = path.join(process.cwd(), "articles");
const fallbackCategory = "Innovation";

export function getAllArticles(): Article[] {
  return (["en", "ru"] as ArticleLanguage[])
    .flatMap((language) => readLanguageArticles(language))
    .filter((article) => article.status === "published")
    .sort((a, b) => {
      const left = a.date ? Date.parse(a.date) : 0;
      const right = b.date ? Date.parse(b.date) : 0;
      return right - left;
    });
}

export function getArticleSummaries(): ArticleSummary[] {
  return getAllArticles().map(({ body, content, ...summary }) => summary);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 3): ArticleSummary[] {
  const allArticles = getArticleSummaries().filter((item) => item.slug !== article.slug);
  const explicit = article.relatedArticles
    .map((slug) => allArticles.find((item) => item.slug === slug))
    .filter(Boolean) as ArticleSummary[];

  const inferred = allArticles
    .filter((item) => !explicit.some((related) => related.slug === item.slug))
    .map((item) => ({
      article: item,
      score:
        (item.category === article.category ? 3 : 0) +
        item.tags.filter((tag) => article.tags.includes(tag)).length +
        (item.language === article.language ? 1 : 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.article);

  return [...explicit, ...inferred].slice(0, limit);
}

export function getArticleTranslations(article: Article): ArticleSummary[] {
  const key = article.translationKey || article.originalSlug || article.slug;
  return getArticleSummaries().filter((item) => {
    if (item.slug === article.slug) return false;
    if (item.contentSource !== article.contentSource) return false;
    if (!item.translationKey && !item.originalSlug) return false;
    return item.translationKey === key || item.originalSlug === article.slug || article.originalSlug === item.slug;
  });
}

export function formatArticleDate(date?: string, language: ArticleLanguage = "en") {
  if (!date) return "Undated";

  return new Intl.DateTimeFormat(language === "ru" ? "ru-RU" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.originalDate || article.date,
    dateModified: article.originalDate || article.date,
    inLanguage: article.language,
    image: article.featuredImage ? [article.featuredImage] : undefined,
    isAccessibleForFree: true,
    articleSection: article.category,
    author: {
      "@type": "Person",
      name: "Alex Lindholm",
      url: "https://alexlindholm.com",
      sameAs: ["https://www.linkedin.com/in/axlindholm/"],
    },
    publisher: {
      "@type": "Person",
      name: "Alex Lindholm",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://alexlindholm.com${article.href}`,
    },
    keywords: article.tags,
  };
}

function readLanguageArticles(language: ArticleLanguage): Article[] {
  const directory = path.join(articlesRoot, language);

  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((fileName) => /\.(md|mdx)$/i.test(fileName))
    .map((fileName) => readArticleFile(directory, fileName, language))
    .filter(Boolean) as Article[];
}

function readArticleFile(directory: string, fileName: string, fallbackLanguage: ArticleLanguage) {
  const filePath = path.join(directory, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { frontmatter, body } = parseFrontmatter(raw);
  const title = frontmatter.title?.trim();

  if (!title) return undefined;

  const language = frontmatter.language || fallbackLanguage;
  const slug = frontmatter.slug || slugify(path.basename(fileName, path.extname(fileName)));
  const id = frontmatter.id || slug;
  const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
  const category = frontmatter.category || inferCategory(tags);
  const excerpt = frontmatter.excerpt || frontmatter.metaDescription || createDescription(body);
  const metaDescription = frontmatter.metaDescription || excerpt;
  const status = frontmatter.status === "draft" ? "draft" : "published";
  const contentSource = frontmatter.contentSource || inferContentSource(language, frontmatter.sourceUrl);
  const source = frontmatter.source || inferSource(frontmatter.sourceUrl, contentSource);

  return {
    id,
    title,
    slug,
    date: frontmatter.date,
    tags,
    category,
    language,
    source,
    sourceUrl: frontmatter.sourceUrl,
    contentSource,
    translatedFrom: frontmatter.translatedFrom,
    originalSlug: frontmatter.originalSlug,
    translationKey: frontmatter.translationKey,
    telegramMessageId: frontmatter.telegramMessageId,
    originalDate: frontmatter.originalDate,
    featuredImage: frontmatter.featuredImage,
    excerpt,
    readingTime: calculateReadingTime(body, language),
    relatedArticles: Array.isArray(frontmatter.relatedArticles) ? frontmatter.relatedArticles : [],
    metaDescription,
    openGraphTitle: frontmatter.openGraphTitle || title,
    openGraphDescription: frontmatter.openGraphDescription || metaDescription,
    status,
    content: body.trim(),
    body: body.trim(),
    href: `/articles/${slug}`,
  } satisfies Article;
}

function parseFrontmatter(raw: string): { frontmatter: ArticleFrontmatter; body: string } {
  if (!raw.startsWith("---")) return { frontmatter: {} as ArticleFrontmatter, body: raw };

  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { frontmatter: {} as ArticleFrontmatter, body: raw };

  const frontmatterText = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();
  const frontmatter: Record<string, string | string[]> = {};
  const lines = frontmatterText.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;

    const [, key, value] = match;
    if (!value && lines[index + 1]?.trim().startsWith("- ")) {
      const list: string[] = [];
      while (lines[index + 1]?.trim().startsWith("- ")) {
        index += 1;
        list.push(unquote(lines[index].trim().replace(/^- /, "")));
      }
      frontmatter[key] = list;
    } else {
      frontmatter[key] = parseValue(value);
    }
  }

  return { frontmatter: frontmatter as ArticleFrontmatter, body };
}

function parseValue(value: string) {
  const trimmed = value.trim();

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => unquote(item.trim()))
      .filter(Boolean);
  }

  return unquote(trimmed);
}

function unquote(value: string) {
  return value.replace(/^["']|["']$/g, "");
}

function inferCategory(tags: string[]) {
  return tags.find((tag) => articleCategories.includes(tag as ArticleCategory)) || fallbackCategory;
}

function inferContentSource(language: ArticleLanguage, sourceUrl?: string): ContentSource {
  if (sourceUrl?.includes("t.me")) return "telegram_ru";
  if (language === "ru") return "telegram_ru";
  return "original_en";
}

function inferSource(sourceUrl: string | undefined, contentSource: ContentSource) {
  if (contentSource === "telegram_ru") return "Telegram @cynicschool";
  if (contentSource === "original_en") return "Alex Lindholm";
  if (!sourceUrl) return "Original article";
  if (sourceUrl.includes("linkedin.com")) return "LinkedIn";
  return "Original source";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

function calculateReadingTime(body: string, language: ArticleLanguage) {
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = language === "ru" ? 170 : 220;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function createDescription(body: string) {
  const plainText = body
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return plainText.length > 158 ? `${plainText.slice(0, 155).trim()}...` : plainText;
}
