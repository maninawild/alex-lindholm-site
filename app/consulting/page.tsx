import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo-landing-page";
import { baseUrl, seoPages } from "@/data/seo-pages";

const page = seoPages.consulting;

export const metadata: Metadata = {
  title: "Consulting | Venture Strategy & Ecosystem Design",
  description: page.description,
  alternates: { canonical: `${baseUrl}${page.path}` },
  openGraph: {
    title: "Consulting | Alex Lindholm",
    description: page.description,
    url: page.path,
    type: "profile",
  },
};

export default function ConsultingPage() {
  return <SeoLandingPage pageKey="consulting" />;
}
