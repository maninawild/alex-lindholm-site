import type { Metadata } from "next";
import { SafeInvestingCoursePage } from "@/components/safe-investing-course-page";
import { siteUrl } from "@/lib/site";

const title = "Безопасные инвестиции для начинающих";
const description =
  "Базовый курс Алекса Линдхольма: как устроен финансовый рынок, на чём зарабатывают инвесторы и как новичку снизить риск потери денег.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/ru/courses/safe-investing` },
  openGraph: {
    title,
    description,
    url: "/ru/courses/safe-investing",
    type: "website",
    locale: "ru_RU",
  },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: title,
  description,
  inLanguage: "ru",
  provider: {
    "@type": "Person",
    name: "Alex Lindholm",
    url: siteUrl,
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT56M",
  },
  offers: {
    "@type": "Offer",
    price: "19",
    priceCurrency: "EUR",
    availability: "https://schema.org/PreOrder",
    url: `${siteUrl}/ru/courses/safe-investing#access`,
  },
};

const freeVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Введение в инвестиции простыми словами",
  description: "Первый бесплатный урок курса о безопасных инвестициях для начинающих.",
  thumbnailUrl: ["https://i.ytimg.com/vi/B4JWAl1TTDo/hqdefault.jpg"],
  uploadDate: "2026-09-07",
  duration: "PT18M6S",
  inLanguage: "ru",
  embedUrl: "https://www.youtube-nocookie.com/embed/B4JWAl1TTDo",
  contentUrl: "https://www.youtube.com/watch?v=B4JWAl1TTDo",
};

export default function SafeInvestingCourse() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([courseSchema, freeVideoSchema]) }}
      />
      <SafeInvestingCoursePage />
    </>
  );
}
