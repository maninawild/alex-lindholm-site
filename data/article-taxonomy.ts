export const articleCategories = [
  "Startup Ecosystems",
  "Human-Centered AI",
  "Ethical Technology",
  "Innovation",
  "Fundraising",
  "Founder Psychology",
  "Digital Humanism",
  "Future of Work",
  "Communities",
  "Jewish Culture",
  "Travel",
  "Society",
  "Matching Systems",
  "LoveTech",
  "Entrepreneurship",
  "Venture Building",
] as const;

export type ArticleCategory = (typeof articleCategories)[number];

export const articleLanguages = {
  en: "English",
  ru: "Russian",
} as const;

export type ArticleLanguage = keyof typeof articleLanguages;
