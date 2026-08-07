import {
  type VideoItem,
  youtubeEmbedUrl,
  youtubeUrl,
} from "@/data/videos";

const languageLabel: Record<VideoItem["language"], string> = {
  en: "English",
  ru: "Russian",
};

type YouTubeVideoCardProps = {
  video: VideoItem;
};

export function YouTubeVideoCard({ video }: YouTubeVideoCardProps) {
  return (
    <article className="overflow-hidden rounded-sm border border-ink/10 bg-bone shadow-quiet lg:grid lg:grid-cols-[minmax(0,1.28fr)_minmax(20rem,0.72fr)]">
      <div className="relative aspect-video overflow-hidden bg-ink">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`${youtubeEmbedUrl(video.youtubeId)}?rel=0&modestbranding=1&playsinline=1`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <div className="flex flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-copper">
          {video.series ? <span>{video.series}</span> : null}
          {video.series ? <span aria-hidden="true">·</span> : null}
          <span>{languageLabel[video.language]}</span>
          <span aria-hidden="true">·</span>
          <span>{video.type}</span>
        </div>

        <h3 className="mt-3 text-xl font-medium leading-tight tracking-[-0.015em] text-ink sm:text-2xl">
          {video.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-graphite/74 sm:text-base">
          {video.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {video.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-ink/10 px-3 py-1 text-xs text-graphite/70"
            >
              {topic}
            </span>
          ))}
        </div>

        <a
          href={youtubeUrl(video.youtubeId)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-fit text-sm font-medium text-ink underline decoration-ink/20 underline-offset-8 transition hover:decoration-ink"
        >
          Смотреть на YouTube →
        </a>
      </div>
    </article>
  );
}
