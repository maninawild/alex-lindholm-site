import { ArticlesContent } from "@/components/articles-content";
import { translator, type Locale } from "@/lib/i18n";
import { localizeMetadata } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import { ArticleLibrary } from "@/components/article-library";
import { Breadcrumbs } from "@/components/insights/breadcrumbs";
import { InsightsDirectory } from "@/components/insights/directory";
import { SiteHeader } from "@/components/site-header";
import { getArticleSummaries } from "@/lib/articles";
import {
  getInsightCategories,
  getInsightTopics,
  insightBreadcrumbJsonLd,
  validateInsightsAuthorityGraph,
} from "@/lib/insights";

const original: Metadata = {
  title: "Articles",
  description:
    "Essays and field notes by Alex Lindholm on startup ecosystems, human-centered AI, innovation, founder psychology, Jewish culture, society, and venture building.",
  openGraph: {
    title: "Articles | Alex Lindholm",
    description:
      "A bilingual article library for essays and field notes by Alex Lindholm, preserving each article in its original language.",
    url: "/articles",
    type: "website",
  },
  alternates: {
    canonical: "/articles",
    types: {
      "application/rss+xml": [
        { url: "/feeds/articles-en.xml", title: "English articles RSS" },
        { url: "/feeds/articles-ru.xml", title: "Russian articles RSS" },
      ],
    },
  },
};

export const metadata = localizeMetadata(original, "/articles", "en");

export default function Page(){return <ArticlesContent locale="en"/>;}
