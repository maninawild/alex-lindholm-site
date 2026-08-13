import type { MetadataRoute } from "next";
import { baseUrl } from "@/data/seo-pages";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot"],
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
