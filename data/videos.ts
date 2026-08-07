import { baseUrl } from "@/data/seo-pages";

export type VideoLanguage = "en" | "ru";
export type VideoType = "Interview" | "Conversation" | "Talk" | "Panel" | "Podcast";

export type VideoItem = {
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: {
    src: string;
    alt: string;
  };
  type: VideoType;
  language: VideoLanguage;
  series?: string;
  publisher?: string;
  date?: string;
  topics: string[];
  featured?: boolean;
};

/** Add verified YouTube appearances here. Keep descriptions factual and useful for search. */
export const videos: VideoItem[] = [
  {
    title: "Что отличает стартапера от бизнесмена: разговор о готовности строить стартап",
    description:
      "В выпуске Tulip Business Talks Алекс Линдхольм говорит о том, что происходит до поиска инвестиций: готов ли сам основатель к среде стартапов и к пути, который ему предстоит пройти. В разговоре — различия между стартапом и традиционным бизнесом, психологическая готовность фаундера, отношение к ошибкам и реальные сложности предпринимательского пути. Это разговор не столько о привлечении инвестиций, сколько о готовности строить компанию и выдерживать неопределённость.",
    youtubeId: "3wVHD-z2ocs",
    thumbnail: {
      src: "https://i.ytimg.com/vi/3wVHD-z2ocs/hqdefault.jpg",
      alt: "Обложка интервью Tulip Business Talks с Алексом Линдхольмом",
    },
    type: "Interview",
    language: "ru",
    series: "Tulip Business Talks",
    publisher: "Tulip Business Talks",
    topics: [
      "Startup readiness",
      "Founder mindset",
      "Startup vs business",
      "Failure and entrepreneurship",
      "Dutch startup ecosystem",
    ],
    featured: true,
  },
];

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
    "@id": `${baseUrl}/media#video-${video.youtubeId}`,
    name: video.title,
    description: video.description,
    thumbnailUrl: [video.thumbnail.src],
    ...(video.date ? { uploadDate: video.date } : {}),
    inLanguage: video.language,
    embedUrl: youtubeEmbedUrl(video.youtubeId),
    contentUrl: youtubeUrl(video.youtubeId),
    ...(video.publisher
      ? {
          publisher: {
            "@type": "Organization",
            name: video.publisher,
          },
        }
      : {}),
    keywords: video.topics.join(", "),
    potentialAction: {
      "@type": "WatchAction",
      target: youtubeUrl(video.youtubeId),
    },
  };
}
