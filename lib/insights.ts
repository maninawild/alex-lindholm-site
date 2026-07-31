import {
  insightAuthor,
  insightCategoryDefinitions,
  insightClusters,
  type InsightCluster,
} from "@/data/insights-taxonomy";
import {
  getArticleSummaries,
  type Article,
  type ArticleSummary,
} from "@/lib/articles";
import { absoluteUrl } from "@/lib/site";

export type InsightCategory = {
  name: string;
  slug: string;
  description: string;
  articleCount: number;
};

export type InsightTopic = InsightCluster & {
  articleCount: number;
};

export function toInsightSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

export function getInsightCategories(): InsightCategory[] {
  const articles = getArticleSummaries();
  const definitions = new Map(
    insightCategoryDefinitions.map((category) => [category.name, category.description]),
  );
  const names = new Set([
    ...insightCategoryDefinitions.map((category) => category.name),
    ...articles.map((article) => article.category),
  ]);

  return [...names]
    .map((name) => ({
      name,
      slug: toInsightSlug(name),
      description:
        definitions.get(name) ||
        `Articles and field notes filed under ${name}.`,
      articleCount: articles.filter((article) => article.category === name).length,
    }))
    .sort((left, right) => {
      if (left.articleCount !== right.articleCount) {
        return right.articleCount - left.articleCount;
      }
      return left.name.localeCompare(right.name);
    });
}

export function getInsightCategory(slug: string) {
  return getInsightCategories().find((category) => category.slug === slug);
}

export function getArticlesForCategory(slug: string) {
  const category = getInsightCategory(slug);
  if (!category) return [];
  return getArticleSummaries().filter((article) => article.category === category.name);
}

export function getInsightTopics(): InsightTopic[] {
  const articles = getArticleSummaries();

  return insightClusters.map((cluster) => ({
    ...cluster,
    articleCount: articles.filter((article) => articleMatchesCluster(article, cluster)).length,
  }));
}

export function getInsightTopic(slug: string) {
  return getInsightTopics().find((topic) => topic.slug === slug);
}

export function getArticlesForTopic(slug: string) {
  const topic = insightClusters.find((cluster) => cluster.slug === slug);
  if (!topic) return [];
  return getArticleSummaries()
    .filter((article) => articleMatchesCluster(article, topic))
    .sort((left, right) => {
      const scoreDifference = clusterScore(right, topic) - clusterScore(left, topic);
      return scoreDifference || dateValue(right) - dateValue(left);
    });
}

export function getPrimaryTopic(article: ArticleSummary | Article) {
  return getInsightTopics()
    .filter((topic) => articleMatchesCluster(article, topic))
    .sort((left, right) => clusterScore(article, right) - clusterScore(article, left))[0];
}

export function getTopicsForArticle(article: ArticleSummary | Article, limit = 3) {
  return getInsightTopics()
    .filter((topic) => articleMatchesCluster(article, topic))
    .sort((left, right) => clusterScore(article, right) - clusterScore(article, left))
    .slice(0, limit);
}

export function getFurtherReading(
  article: Article,
  excludedSlugs: string[] = [],
  limit = 3,
) {
  const excluded = new Set([article.slug, ...excludedSlugs]);
  const primaryTopic = getPrimaryTopic(article);

  return getArticleSummaries()
    .filter((candidate) => !excluded.has(candidate.slug))
    .map((candidate) => ({
      article: candidate,
      score:
        (candidate.language === article.language ? 3 : 0) +
        (primaryTopic && articleMatchesCluster(candidate, primaryTopic) ? 5 : 0) +
        (candidate.category !== article.category ? 1 : 0) +
        candidate.tags.filter((tag) => article.tags.includes(tag)).length,
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((left, right) => {
      if (left.score !== right.score) return right.score - left.score;
      return dateValue(right.article) - dateValue(left.article);
    })
    .map((candidate) => candidate.article)
    .slice(0, limit);
}

export function insightCategoryHref(category: string) {
  return `/articles/categories/${toInsightSlug(category)}`;
}

export function insightTopicHref(topic: Pick<InsightCluster, "slug">) {
  return `/articles/topics/${topic.slug}`;
}

export function insightAuthorHref() {
  return `/articles/authors/${insightAuthor.slug}`;
}

export function insightBreadcrumbJsonLd(
  items: Array<{ name: string; href: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

function articleMatchesCluster(
  article: ArticleSummary | Article,
  cluster: InsightCluster,
) {
  const searchableTitle = `${article.title} ${article.metaDescription}`.toLowerCase();
  const matchesTag = article.tags.some((tag) => cluster.tags.includes(tag));
  const matchesTitle = Boolean(
    cluster.titleTerms?.some((term) => searchableTitle.includes(term.toLowerCase())),
  );

  if (cluster.focused) {
    return matchesTag || matchesTitle;
  }

  return (
    cluster.categories.includes(article.category) ||
    matchesTag ||
    matchesTitle
  );
}

function clusterScore(
  article: ArticleSummary | Article,
  cluster: InsightCluster,
) {
  const searchableTitle = `${article.title} ${article.metaDescription}`.toLowerCase();
  return (
    (cluster.categories.includes(article.category) ? 4 : 0) +
    article.tags.filter((tag) => cluster.tags.includes(tag)).length * 2 +
    (cluster.titleTerms?.some((term) => searchableTitle.includes(term.toLowerCase()))
      ? 6
      : 0)
  );
}

function dateValue(article: ArticleSummary) {
  const value = article.date || article.originalDate;
  return value ? Date.parse(value) || 0 : 0;
}
