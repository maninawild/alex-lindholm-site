import type { ArticleLanguage } from "@/data/article-taxonomy";
import { getAllArticles } from "@/lib/articles";
import { author, siteName, siteUrl } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function createArticleRss(language: ArticleLanguage) {
  const languageName = language === "ru" ? "Russian" : "English";
  const articles = getAllArticles().filter((article) => article.language === language);
  const lastBuildDate = articles[0]?.date || articles[0]?.originalDate;

  const items = articles
    .map((article) => {
      const url = `${siteUrl}${article.href}`;
      const publicationDate = article.originalDate || article.date;

      return [
        "<item>",
        `<title>${escapeXml(article.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `<description>${escapeXml(article.metaDescription)}</description>`,
        publicationDate ? `<pubDate>${new Date(publicationDate).toUTCString()}</pubDate>` : "",
        `<dc:creator>${escapeXml(author.name)}</dc:creator>`,
        `<dc:language>${language}</dc:language>`,
        "</item>",
      ]
        .filter(Boolean)
        .join("");
    })
    .join("");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "<channel>",
    `<title>${escapeXml(`${siteName} Articles — ${languageName}`)}</title>`,
    `<link>${siteUrl}/articles</link>`,
    `<description>${escapeXml(`${languageName} articles by ${author.name}.`)}</description>`,
    `<language>${language}</language>`,
    lastBuildDate ? `<lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>` : "",
    items,
    "</channel>",
    "</rss>",
  ]
    .filter(Boolean)
    .join("");
}
