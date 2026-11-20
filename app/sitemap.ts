import { publicLocaleRoutes, localizedHref } from "@/lib/i18n";
import type { MetadataRoute } from "next";
import { events } from "@/data/events";
import { baseUrl, seoPages } from "@/data/seo-pages";
import { getArticleTranslations, getIndexableArticles } from "@/lib/articles";
import {
  getInsightCategories,
  getInsightTopics,
  insightAuthorHref,
} from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Array.from(new Set([
    "",
    "/links",
    ...publicLocaleRoutes.map(path => localizedHref(path,"ru")),
    "/donate",
    "/donate/anya-tishinskaya",
    "/ru/donate",
    "/ru/donate/anya-tishinskaya",
    "/product-venture-leader",
    "/lectures-and-speaking",
    "/trips",
    "/ru/trips",
    "/ru/trips/hoge-veluwe",
    "/ru/courses/safe-investing",
    "/articles",
    ...getInsightCategories()
      .filter((category) => category.articleCount > 0)
      .map((category) => `/articles/categories/${category.slug}`),
    ...getInsightTopics()
      .filter((topic) => topic.articleCount > 0)
      .map((topic) => `/articles/topics/${topic.slug}`),
    insightAuthorHref(),
    ...events.map((event) => `/events/${event.slug}`),
    ...Object.values(seoPages).map((page) => page.path),
  ]));

  const publicPages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    ...((publicLocaleRoutes as readonly string[]).includes(route || "/") || publicLocaleRoutes.some(path => localizedHref(path,"ru")===route) ? {alternates:{languages:{en: `${baseUrl}${route.replace(/^\/ru(?=\/|$)/,"") || "/"}`,ru:`${baseUrl}${localizedHref(route.replace(/^\/ru(?=\/|$)/,"") || "/","ru")}`}}} : {}),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.75,
  }));

  const articles: MetadataRoute.Sitemap = getIndexableArticles().map((article) => {
    const translations = getArticleTranslations(article);
    const languages = Object.fromEntries(
      [article, ...translations].map((translation) => [
        translation.language,
        `${baseUrl}${translation.href}`,
      ]),
    );

    return {
      url: `${baseUrl}${article.href}`,
      lastModified: article.date || article.originalDate,
      changeFrequency: "monthly",
      priority: 0.7,
      ...(Object.keys(languages).length > 1
        ? {
            alternates: {
              languages,
            },
          }
        : {}),
    };
  });

  return [...publicPages, ...articles];
}
