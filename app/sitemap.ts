import type { MetadataRoute } from "next";
import { baseUrl, seoPages } from "@/data/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/lectures-and-speaking",
    "/articles",
    ...Object.values(seoPages).map((page) => page.path),
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.75,
  }));
}
