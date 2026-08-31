"use client";

import { usePathname } from "next/navigation";
import { LatestArticleWidget } from "@/components/latest-article-widget";
import { ArticlePresentationCleanup } from "@/components/article-presentation-cleanup";

export function PublicOnlyEnhancements() {
  const pathname = usePathname();
  if (pathname.startsWith("/private")) return null;

  return (
    <>
      <LatestArticleWidget />
      <ArticlePresentationCleanup />
    </>
  );
}
