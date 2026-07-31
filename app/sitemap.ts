import type { MetadataRoute } from "next";
import { events } from "@/data/events";
import { baseUrl, seoPages } from "@/data/seo-pages";
import { getAllArticles, getArticleTranslations } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Array.from(new Set([
    "",
    "/lectures-and-speaking",
    "/articles",
    ...events.map((event) => `/events/${event.slug}`),
    ...Object.values(seoPages).map((page) => page.path),
  ]));

  const publicPages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.75,
  }));

  const articles: MetadataRoute.Sitemap = getAllArticles().map((article) => {
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
