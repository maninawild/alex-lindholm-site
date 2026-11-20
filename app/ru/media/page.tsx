import { localizeMetadata } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import { MediaPageContent } from "@/components/media-page";
import { baseUrl, seoPages } from "@/data/seo-pages";

const page = seoPages.media;

const original: Metadata = {
  title: "Media | Commentary on AI, Startups & Human-Centered Technology",
  description: page.description,
  alternates: { canonical: `${baseUrl}${page.path}` },
  openGraph: {
    title: "Media | Alex Lindholm",
    description: page.description,
    url: page.path,
    type: "profile",
  },
};

export const metadata = localizeMetadata(original, "/media", "ru");

export default function MediaPage() {
  return <MediaPageContent locale="ru" />;
}
