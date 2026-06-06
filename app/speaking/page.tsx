import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo-landing-page";
import { baseUrl, seoPages } from "@/data/seo-pages";

const page = seoPages.speaking;

export const metadata: Metadata = {
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

export default function SpeakingPage() {
  return <SeoLandingPage pageKey="speaking" />;
}
