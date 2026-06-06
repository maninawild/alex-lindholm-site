import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo-landing-page";
import { baseUrl, seoPages } from "@/data/seo-pages";

const page = seoPages.startupMentor;

export const metadata: Metadata = {
  title: "Startup Mentor | Founder Crash-Test & Investor Readiness",
  description: page.description,
  alternates: { canonical: `${baseUrl}${page.path}` },
  openGraph: {
    title: "Startup Mentor | Alex Lindholm",
    description: page.description,
    url: page.path,
    type: "profile",
  },
};

export default function StartupMentorPage() {
  return <SeoLandingPage pageKey="startupMentor" />;
}
