import { NextResponse } from "next/server";
import { getArticleSummaries } from "@/lib/articles";

export const dynamic = "force-static";

export function GET() {
  const article = getArticleSummaries()[0];

  if (!article) {
    return NextResponse.json({ article: null }, { status: 200 });
  }

  return NextResponse.json({
    article: {
      title: article.title,
      href: article.href,
      date: article.date,
      excerpt: article.excerpt,
      coverImage: article.coverImage,
      coverImageAlt: article.coverImageAlt,
      source: article.source,
      sourceUrl: article.sourceUrl,
    },
  });
}
