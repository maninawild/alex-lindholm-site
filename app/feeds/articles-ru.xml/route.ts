import { createArticleRss } from "@/lib/rss";

export const dynamic = "force-static";

export function GET() {
  return new Response(createArticleRss("ru"), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
