import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo-landing-page";
import { baseUrl, seoPages } from "@/data/seo-pages";

const page = seoPages.media;

export const metadata: Metadata = {
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

export default function MediaPage() {
  return <SeoLandingPage pageKey="media" />;
}
