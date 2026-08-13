"use client";

import { usePathname } from "next/navigation";
import { ConsultationClarity } from "@/components/consultation-clarity";
import { DiscoveryCallCta } from "@/components/discovery-call-cta";
import { LatestArticleWidget } from "@/components/latest-article-widget";
import { ArticlePresentationCleanup } from "@/components/article-presentation-cleanup";

export function PublicOnlyEnhancements() {
  const pathname = usePathname();
  if (pathname.startsWith("/private")) return null;

  return (
    <>
      <ConsultationClarity />
      <DiscoveryCallCta />
      <LatestArticleWidget />
      <ArticlePresentationCleanup />
    </>
  );
}
