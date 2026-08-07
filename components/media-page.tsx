import { SiteHeader } from "@/components/site-header";
import { YouTubeVideoCard } from "@/components/youtube-video-card";
import { videos, videoObjectSchema } from "@/data/videos";
import { personSchema, webPageSchema } from "@/data/seo-pages";

export function MediaPageContent() {
  const jsonLd = [
    personSchema("media"),
    webPageSchema("media"),
    ...videos.map(videoObjectSchema),
  ];

  return (
    <main className="min-h-screen bg-bone pt-20 text-ink sm:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader transparentAtTop={false} />

      <section className="mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-8 lg:pt-12">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
          Media
        </p>
        <div className="mt-4 flex flex-col gap-4 border-b border-ink/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="max-w-3xl text-4xl font-medium leading-[1.08] tracking-[-0.03em] text-balance sm:text-5xl">
            Interviews, conversations and talks with Alex Lindholm.
          </h1>
          <p className="max-w-xl text-base leading-7 text-graphite/74">
            Selected discussions on founder readiness, startups, technology and the people building through uncertainty.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 sm:pb-16" aria-labelledby="video-appearances-heading">
        <h2 id="video-appearances-heading" className="sr-only">
          Video appearances
        </h2>
        <div className="grid gap-6">
          {videos.map((video) => (
            <YouTubeVideoCard key={video.youtubeId} video={video} />
          ))}
        </div>
        <p className="mt-8 text-sm leading-6 text-graphite/65">
          Explore Alex’s <a href="/startup-mentor" className="font-medium text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink">startup mentoring</a> and <a href="/lectures-and-speaking" className="font-medium text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink">speaking work</a>.
        </p>
      </section>
    </main>
  );
}
