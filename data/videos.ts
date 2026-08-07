import { baseUrl } from "@/data/seo-pages";

export type VideoLanguage = "en" | "ru";
export type VideoType = "Interview" | "Conversation" | "Talk" | "Panel" | "Podcast";

export type VideoItem = {
  id: string;
  title: string;
  description: string;
  type: VideoType;
  language: VideoLanguage;
  partner?: string;
  publishedAt?: string;
  topics: string[];
  featured?: boolean;
};

/** Add verified YouTube appearances here. Keep descriptions factual and useful for search. */
export const videos: VideoItem[] = [];

export function youtubeUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function youtubeEmbedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}`;
}

export function youtubeThumbnailUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function videoObjectSchema(video: VideoItem) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${baseUrl}/media#video-${video.id}`,
    name: video.title,
    description: video.description,
    thumbnailUrl: [youtubeThumbnailUrl(video.id)],
    ...(video.publishedAt ? { uploadDate: video.publishedAt } : {}),
    inLanguage: video.language,
    embedUrl: youtubeEmbedUrl(video.id),
    url: youtubeUrl(video.id),
    creator: {
      "@type": "Person",
      "@id": `${baseUrl}/#alex-lindholm`,
      name: "Alex Lindholm",
      url: baseUrl,
    },
    keywords: video.topics.join(", "),
    potentialAction: {
      "@type": "WatchAction",
      target: youtubeUrl(video.id),
    },
  };
}
