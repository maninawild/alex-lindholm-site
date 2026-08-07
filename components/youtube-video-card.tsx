"use client";

import { useState } from "react";
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
  featured?: boolean;
};

export function YouTubeVideoCard({ video, featured = false }: YouTubeVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <article
      className={`group overflow-hidden rounded-sm border border-ink/10 bg-bone shadow-quiet ${
        featured ? "lg:grid lg:grid-cols-[1.35fr_0.65fr]" : ""
      }`}
    >
      <div className="relative aspect-video overflow-hidden bg-ink">
        {isPlaying ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`${youtubeEmbedUrl(video.youtubeId)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 block h-full w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-bone"
            aria-label={`Play ${video.title} on YouTube`}
          >
            {/* This remote YouTube poster remains outside Next's image optimizer by design. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.thumbnail.src}
              alt={video.thumbnail.alt}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-ink/25 transition group-hover:bg-ink/35" />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 border border-bone/35 bg-ink/85 px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-bone sm:bottom-5 sm:left-5">
              <span className="grid h-5 w-5 place-items-center rounded-full border border-bone/70 text-[0.56rem]" aria-hidden="true">
                ▶
              </span>
              Воспроизвести интервью
            </span>
          </button>
        )}
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
