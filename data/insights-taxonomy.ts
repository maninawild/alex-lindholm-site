import type { ArticleCategory } from "@/data/article-taxonomy";

export type InsightCluster = {
  slug: string;
  name: string;
  description: string;
  categories: string[];
  tags: string[];
  titleTerms?: string[];
  focused?: boolean;
};

export type InsightCategoryDefinition = {
  name: ArticleCategory | string;
  description: string;
};

export const insightCategoryDefinitions: InsightCategoryDefinition[] = [
  {
    name: "Startup Ecosystems",
    description: "Startup environments, founder mobility, support systems, and the institutions that help ventures grow.",
  },
  {
    name: "Entrepreneurship",
    description: "Practical perspectives on starting, operating, and developing an entrepreneurial company.",
  },
  {
    name: "Venture Building",
    description: "Methods for turning early opportunities into validated, durable ventures.",
  },
  {
    name: "Fundraising",
    description: "Capital strategy, investor relationships, and the realities of financing new ventures.",
  },
  {
    name: "Founder Psychology",
    description: "Decision-making, resilience, incentives, and the human pressures of building companies.",
  },
  {
    name: "Human-Centered AI",
    description: "Artificial intelligence viewed through human needs, organizational choices, and practical use.",
  },
  {
    name: "Ethical Technology",
    description: "Accountability, trust, and responsible choices in the design and deployment of technology.",
  },
  {
    name: "Innovation",
    description: "How emerging ideas, products, and institutions move from possibility to practical impact.",
  },
  {
    name: "Digital Humanism",
    description: "Technology’s relationship with autonomy, dignity, culture, and civic life.",
  },
  {
    name: "Future of Work",
    description: "How technology, organizations, and changing expectations reshape professional life.",
  },
  {
    name: "Communities",
    description: "The relationships, networks, and local structures that make collaboration possible.",
  },
  {
    name: "Cities & Communities",
    description: "Cities, regions, and communities as environments for entrepreneurship and innovation.",
  },
  {
    name: "Society",
    description: "Social change, institutions, and the wider consequences of technological development.",
  },
  {
    name: "Media & Algorithms",
    description: "How platforms, recommendation systems, and digital media shape attention and public life.",
  },
  {
    name: "Jewish Culture",
    description: "Essays on Jewish identity, history, culture, and contemporary experience.",
  },
  {
    name: "Travel",
    description: "Observations from places, journeys, and encounters across cultures.",
  },
  {
    name: "Matching Systems",
    description: "The design of systems that connect people, opportunities, and compatible interests.",
  },
  {
    name: "LoveTech",
    description: "Technology, intimacy, relationships, and the products built around human connection.",
  },
];

export const insightClusters: InsightCluster[] = [
  {
    slug: "startup-visa-netherlands",
    name: "Startup Visa Netherlands",
    description: "Founder guidance on the Dutch Startup Visa, facilitators, eligibility, preparation, and the wider Netherlands startup ecosystem.",
    categories: ["Startup Ecosystems"],
    tags: ["Startup Visa", "Dutch Startup Visa", "Netherlands", "Facilitators"],
    titleTerms: ["startup visa", "netherlands", "dutch startup", "facilitator", "the hague", "south holland"],
    focused: true,
  },
  {
    slug: "startup-strategy",
    name: "Startup Strategy",
    description: "Validation, venture design, market choices, and the practical work of building a company.",
    categories: ["Venture Building", "Entrepreneurship", "Founder Psychology"],
    tags: ["Venture Building", "Entrepreneurship", "Startups", "Founders"],
  },
  {
    slug: "fundraising-and-investment",
    name: "Fundraising & Investment",
    description: "Fundraising strategy, venture capital, investor behavior, and capital allocation.",
    categories: ["Fundraising"],
    tags: ["Fundraising", "VC", "Investing", "Венчурный капитал", "Инвестиции"],
  },
  {
    slug: "founder-psychology",
    name: "Founder Psychology",
    description: "Judgment, motivation, pressure, and the behavioral patterns that shape founder outcomes.",
    categories: ["Founder Psychology"],
    tags: ["Founder Psychology", "Founders", "Основатели"],
  },
  {
    slug: "human-centered-ai",
    name: "Human-Centered AI",
    description: "AI strategy and adoption grounded in human needs, organizational reality, and responsible design.",
    categories: ["Human-Centered AI"],
    tags: ["Human-Centered AI", "AI", "ИИ", "Human-Centered Tech", "Человекоцентричные технологии"],
  },
  {
    slug: "responsible-technology",
    name: "Responsible Technology",
    description: "Ethics, trust, governance, and the social consequences of digital systems.",
    categories: ["Ethical Technology", "Digital Humanism", "Society"],
    tags: ["Ethical Technology", "Digital Humanism", "Society", "Media & Algorithms"],
  },
  {
    slug: "future-of-work",
    name: "Future of Work",
    description: "Changing roles, organizations, skills, and professional life in an AI-shaped economy.",
    categories: ["Future of Work"],
    tags: ["Future of Work", "Будущее работы"],
  },
  {
    slug: "ecosystems-and-communities",
    name: "Ecosystems & Communities",
    description: "How cities, regions, networks, and institutions create the conditions for collaboration and growth.",
    categories: ["Startup Ecosystems", "Communities", "Cities & Communities"],
    tags: ["Startup Ecosystems", "Communities", "Cities & Communities"],
  },
];

export const insightAuthor = {
  slug: "alex-lindholm",
  name: "Alex Lindholm",
  role: "Startup Visa & Facilitator Advocate",
  description:
    "Alex Lindholm writes about startup ecosystems, founder strategy, human-centered technology, and venture building.",
} as const;
