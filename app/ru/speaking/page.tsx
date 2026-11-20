import { localizeMetadata } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo-landing-page";
import { baseUrl, seoPages } from "@/data/seo-pages";

const page = seoPages.speaking;

const original: Metadata = {
  title: "Speaking | Interactive Lectures, Salons & Workshops",
  description: page.description,
  alternates: { canonical: `${baseUrl}${page.path}` },
  openGraph: {
    title: "Speaking | Alex Lindholm",
    description: page.description,
    url: page.path,
    type: "profile",
  },
};

export const metadata = localizeMetadata(original, "/speaking", "ru");

export default function SpeakingPage() {
  return <SeoLandingPage pageKey="speaking" locale="ru" />;
}
