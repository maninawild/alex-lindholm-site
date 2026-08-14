import { baseUrl } from "@/data/seo-pages";

export type VideoLanguage = "en" | "ru";
export type VideoType = "Interview" | "Conversation" | "Talk" | "Panel" | "Podcast";

export type VideoThumbnail = {
  src: string;
  alt: string;
};

export type VideoItem = {
  title: string;
  description: string;
  homepageDescription?: string;
  youtubeId: string;
  thumbnail: VideoThumbnail;
  homepageThumbnail?: VideoThumbnail;
  homepageLanguageNote?: string;
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
    homepageDescription:
      "In this Tulip Business Talks interview, Alex Lindholm discusses what comes before the search for investment: whether a founder is ready for the startup environment and the uncertainty that comes with building a company. The conversation looks at the difference between a startup and a traditional business, founder mindset, learning from mistakes, and the real pressures of the entrepreneurial path.",
    youtubeId: "3wVHD-z2ocs",
    thumbnail: {
      src: "https://i.ytimg.com/vi/3wVHD-z2ocs/hqdefault.jpg",
      alt: "Обложка интервью Tulip Business Talks с Алексом Линдхольмом",
    },
    homepageThumbnail: {
      src: "/media/videos/tulip-business-talks-startup-cemetery.png",
      alt: "Tulip Business Talks interview with Alex Lindholm",
    },
    homepageLanguageNote: "Russian · English CC",
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
  {
    title: "Плюсы и минусы жизни в Нидерландах после США и Израиля",
    description:
      "Алекс Линдхольм делится личным опытом жизни в Нидерландах после США, Израиля, Швеции и России. В разговоре — причины переезда, преимущества и ограничения жизни в стране, а также практический взгляд на адаптацию и предпринимательство в Нидерландах.",
    youtubeId: "4aWk_cRlS7U",
    thumbnail: {
      src: "https://i.ytimg.com/vi/4aWk_cRlS7U/hqdefault.jpg",
      alt: "Плюсы и минусы жизни в Нидерландах после США и Израиля",
    },
    type: "Talk",
    language: "ru",
    date: "2024-11-17T06:47:08-08:00",
    topics: ["Relocation to the Netherlands", "Founder experience", "Life in the Netherlands"],
  },
  {
    title: "Фасилитатор для проекта в Нидерландах: как попасть на программу, нюансы работы и инновационность",
    description:
      "Алекс объясняет, как основателям подготовиться к работе с фасилитаторами в Нидерландах: какие проекты получают внимание, как подтверждать инновационность и какие ошибки в питч-деке чаще всего мешают пройти отбор.",
    youtubeId: "1cS-r8FC3OM",
    thumbnail: {
      src: "https://i.ytimg.com/vi/1cS-r8FC3OM/hqdefault.jpg",
      alt: "Разговор о фасилитаторах и инновационных проектах в Нидерландах",
    },
    type: "Interview",
    language: "ru",
    date: "2024-05-24T07:59:00-07:00",
    topics: ["Startup visa", "Innovation", "Pitch deck"],
  },
  {
    title: "Создание Digital-акселератора Нидерландах: получение стартап-визы и удаленное обучение",
    description:
      "Разговор о запуске InspireXchange и о том, как устроена программа акселератора: от преодоления ранних рисков и проверки PMF до онлайн- и офлайн-встреч, стартап-визы и отбора в программу.",
    youtubeId: "TnOutMGGqGs",
    thumbnail: {
      src: "https://i.ytimg.com/vi/TnOutMGGqGs/hqdefault.jpg",
      alt: "Разговор о создании digital-акселератора в Нидерландах",
    },
    type: "Interview",
    language: "ru",
    date: "2024-03-18T08:00:32-07:00",
    topics: ["InspireXchange", "Startup accelerator", "Product-market fit"],
  },
  {
    title: "Русские стартапы в Нидерландах: сотрудник акселератора отвечает на вопросы",
    description:
      "Q&A о внутренней логике голландской стартап-экосистемы: отбор в акселераторы, роль фасилитаторов, иммиграционные программы, налоговые условия и выход на международные рынки из Нидерландов.",
    youtubeId: "9RGJLAwug8I",
    thumbnail: {
      src: "https://i.ytimg.com/vi/9RGJLAwug8I/hqdefault.jpg",
      alt: "Вопросы и ответы о стартапах в Нидерландах",
    },
    type: "Interview",
    language: "ru",
    date: "2023-08-15T06:22:45-07:00",
    topics: ["Dutch startup ecosystem", "Startup visa", "Market entry"],
  },
  {
    title: "США vs Нидерланды: лучшая страна для развития стартапа!",
    description:
      "Алекс сравнивает США и Нидерланды с позиции основателя: возможности для развития стартапа, бюрократию, особенности стартап-визы, культурный контекст и практические плюсы и ограничения обеих стран.",
    youtubeId: "YWA8k69-L5c",
    thumbnail: {
      src: "https://i.ytimg.com/vi/YWA8k69-L5c/hqdefault.jpg",
      alt: "Сравнение США и Нидерландов для развития стартапа",
    },
    type: "Talk",
    language: "ru",
    date: "2023-09-06T08:21:32-07:00",
    topics: ["Startup ecosystems", "United States", "Netherlands"],
  },
  {
    title: "Грузия и Нидерланды - сравнение стран для жизни и бизнеса!",
    description:
      "Сравнение Грузии и Нидерландов для жизни и ведения бизнеса: безопасность, интеграция, государственные процессы, налоги, образование, уровень комфорта и долгосрочные стратегии переезда.",
    youtubeId: "f3wDRRfuAaI",
    thumbnail: {
      src: "https://i.ytimg.com/vi/f3wDRRfuAaI/hqdefault.jpg",
      alt: "Сравнение Грузии и Нидерландов для жизни и бизнеса",
    },
    type: "Talk",
    language: "ru",
    date: "2024-08-25T03:45:29-07:00",
    topics: ["Relocation", "Georgia", "Netherlands"],
  },
  {
    title: "Личный опыт: как я переехал в Нидерланды по стартап-визе",
    description:
      "Личный рассказ Алекса о переезде в Нидерланды по стартап-визе: выбор страны, первый неудавшийся переезд, повторная попытка, работа с фасилитаторами и возможности для привлечения инвестиций на ранней стадии.",
    youtubeId: "fHezcrqI_vw",
    thumbnail: {
      src: "https://i.ytimg.com/vi/fHezcrqI_vw/hqdefault.jpg",
      alt: "Личный опыт переезда в Нидерланды по стартап-визе",
    },
    type: "Talk",
    language: "ru",
    date: "2023-09-26T08:07:06-07:00",
    topics: ["Startup visa", "Relocation to the Netherlands", "Founder journey"],
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
