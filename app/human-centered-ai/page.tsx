import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo-landing-page";
import { baseUrl, seoPages } from "@/data/seo-pages";

const page = seoPages.humanCenteredAi;

export const metadata: Metadata = {
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

export default function HumanCenteredAiPage() {
  return <SeoLandingPage pageKey="humanCenteredAi" />;
}
