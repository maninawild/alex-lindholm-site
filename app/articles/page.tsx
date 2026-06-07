import type { Metadata } from "next";
import { ArticleLibrary } from "@/components/article-library";
import { SiteHeader } from "@/components/site-header";
import { getArticleSummaries } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Essays and field notes by Alex Lindholm on startup ecosystems, human-centered AI, innovation, founder psychology, Jewish culture, society, and venture building.",
  openGraph: {
    title: "Articles | Alex Lindholm",
    description:
      "A bilingual article library for essays and field notes by Alex Lindholm, preserving each article in its original language.",
    url: "/articles",
    type: "website",
  },
};

export default function ArticlesPage() {
  const articles = getArticleSummaries();

  return (
    <main className="bg-bone pt-20 text-ink sm:pt-24">
      <SiteHeader transparentAtTop={false} />
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 lg:pb-16 lg:pt-12">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
          Article Library
        </p>
        <div className="mt-5 grid gap-6 lg:grid-cols-[0.9fr_0.55fr] lg:items-end">
          <h1 className="max-w-4xl font-serif text-5xl font-medium leading-[0.98] tracking-[-0.02em] text-balance sm:text-6xl lg:text-7xl">
            Essays, field notes, and long-form thinking.
          </h1>
          <p className="max-w-xl text-base leading-7 text-graphite/72 lg:pb-2">
            A clean archive for Alex Lindholm's writing in English and Russian. Every piece remains in its original language,
            with source dates, links, and formatting preserved where reasonable.
          </p>
        </div>
      </section>
      <ArticleLibrary articles={articles} />
    </main>
  );
}
