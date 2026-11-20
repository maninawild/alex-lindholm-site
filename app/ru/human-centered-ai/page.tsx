import { localizeMetadata } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo-landing-page";
import { baseUrl, seoPages } from "@/data/seo-pages";

const page = seoPages.humanCenteredAi;

const original: Metadata = {
  title: "Human-Centered AI | Responsible AI & Digital Humanism",
  description: page.description,
  alternates: { canonical: `${baseUrl}${page.path}` },
  openGraph: {
    title: "Human-Centered AI | Alex Lindholm",
    description: page.description,
    url: page.path,
    type: "profile",
  },
};

export const metadata = localizeMetadata(original, "/human-centered-ai", "ru");

export default function HumanCenteredAiPage() {
  return <SeoLandingPage pageKey="humanCenteredAi" locale="ru" />;
}
