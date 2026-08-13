import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Projects | Alex Lindholm",
  description:
    "Private and emerging projects by Alex Lindholm across venture, communities, housing, and human-centered innovation.",
  alternates: { canonical: "https://www.axlindholm.nl/private" },
  openGraph: {
    title: "Private Projects | Alex Lindholm",
    description:
      "Private and emerging projects by Alex Lindholm across venture, communities, housing, and human-centered innovation.",
    url: "/private",
    type: "website",
  },
};

export default function PrivateProjectsPage() {
  return (
    <main className="min-h-screen bg-bone text-ink">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-5 py-20 sm:px-8">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
          Private Projects
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-medium leading-tight tracking-[-0.025em] text-balance sm:text-5xl">
          Private initiatives, early formats, and collaborations in progress.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-graphite/75 sm:text-lg">
          A quieter space for emerging work around venture experiments,
          curated rooms, housing concepts, and human-centered technology
          projects.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#work"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-ink/15 bg-white px-6 text-sm font-medium text-ink transition duration-300 hover:border-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
          >
            <span>Back to Projects</span>
            <span aria-hidden="true">→</span>
          </Link>
          <a
            href="https://zcal.co/axlindholm/1hour"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-electric bg-electric px-6 text-sm font-medium text-bone transition duration-300 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
          >
            <span>Discuss a Project</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
