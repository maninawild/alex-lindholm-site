export const baseUrl = "https://alexlindholm.com";

export const profileLinks = {
  linkedin: "https://www.linkedin.com/in/axlindholm/",
  consultation: "https://zcal.co/axlindholm/1hour",
  whatsapp: "https://wa.me/message/4OIGQ3FHUZQSD1",
  email: "mailto:hello@alexlindholm.com",
};

export const sharedKeywords = [
  "human-centered innovation",
  "ethical technology",
  "responsible AI",
  "venture ecosystems",
  "startup mentor",
  "innovation leadership",
  "digital humanism",
  "ecosystem design",
  "founder psychology",
  "European innovation",
  "technology ethics",
  "strategic foresight",
];

export const seoPages = {
  speaking: {
    path: "/speaking",
    eyebrow: "Speaking",
    title: "Interactive talks on technology, culture, venture systems and the human future.",
    description:
      "Invite Alex Lindholm for lectures, workshops, university sessions, private salons and corporate conversations on AI, society, Jewish culture, ethics, entrepreneurship and human systems.",
    audience:
      "For conference organizers, universities, cultural communities, innovation hubs, founder groups and corporate teams.",
    primaryCta: "Discuss a lecture",
    secondaryCta: "View lecture topics",
    secondaryHref: "/lectures-and-speaking",
    topics: [
      "AI, power and personal freedom",
      "LoveTech, matching markets and human behavior",
      "Jewish culture, ethics and communities",
      "Entrepreneurship, ecosystems and innovation",
      "Cities, justice and public responsibility",
      "Digital humanism and responsible technology",
    ],
    outcomes: [
      "A clear topic adapted to the audience",
      "Interactive room design, not passive slides",
      "Discussion prompts, cases and audience questions",
      "Follow-up routes for workshops or deeper collaboration",
    ],
    related: ["/lectures-and-speaking", "/human-centered-ai", "/media"],
    schemaService: "Speaking, lectures and workshops",
  },
  humanCenteredAi: {
    path: "/human-centered-ai",
    eyebrow: "Human-Centered AI",
    title: "Responsible AI conversations for teams that care about people, context and consequences.",
    description:
      "Human-centered AI guidance, talks and strategic sessions for organizations exploring responsible AI, digital humanism, product ethics and practical innovation decisions.",
    audience:
      "For corporate innovation teams, universities, founders, HR leaders, accelerators and public-interest technology groups.",
    primaryCta: "Book a strategic session",
    secondaryCta: "Explore speaking topics",
    secondaryHref: "/speaking",
    topics: [
      "Responsible AI and human-centric product decisions",
      "AI, media, power and personal freedom",
      "Technology ethics without empty slogans",
      "Digital humanism and stakeholder-driven innovation",
      "AI adoption inside real organizations",
      "Human networks, trust and automated decision-making",
    ],
    outcomes: [
      "Sharper framing for AI initiatives",
      "Better questions before implementation",
      "Human-centered positioning for products and programs",
      "A practical bridge between strategy, ethics and execution",
    ],
    related: ["/consulting", "/speaking", "/startup-mentor"],
    schemaService: "Human-centered AI advisory and responsible technology sessions",
  },
  startupMentor: {
    path: "/startup-mentor",
    eyebrow: "Startup Mentor",
    title: "Founder crash-testing, investor readiness and practical venture direction.",
    description:
      "Startup mentoring with Alex Lindholm for founders who need sharper validation, fundraising preparation, ecosystem access, investor-founder matching and practical venture strategy.",
    audience:
      "For founders, accelerators, startup visa programs, investors, ecosystem builders and early-stage venture teams.",
    primaryCta: "Book founder sparring",
    secondaryCta: "Explore venture work",
    secondaryHref: "/#work",
    topics: [
      "Startup and venture crash-test",
      "Product validation and PMF direction",
      "Fundraising and investor readiness",
      "Investor-founder matching",
      "Startup visas and cross-border positioning",
      "Founder psychology and narrative clarity",
    ],
    outcomes: [
      "Clearer next steps before wasting time or capital",
      "Sharper investor narrative and readiness signals",
      "Better fit between founder, market, capital and ecosystem",
      "Practical introductions when the context is right",
    ],
    related: ["/consulting", "/human-centered-ai", "/speaking"],
    schemaService: "Startup mentoring and venture advisory",
  },
  consulting: {
    path: "/consulting",
    eyebrow: "Consulting",
    title: "Strategic perspective for complex venture, ecosystem and innovation decisions.",
    description:
      "Selective consulting with Alex Lindholm across venture strategy, ecosystem design, ethical technology, cross-border collaboration, stakeholder innovation and partnership development.",
    audience:
      "For founders, investors, municipalities, universities, innovation hubs, corporate teams and private communities.",
    primaryCta: "Book a strategic call",
    secondaryCta: "Connect on LinkedIn",
    secondaryHref: profileLinks.linkedin,
    topics: [
      "Venture strategy and ecosystem design",
      "Cross-border partnerships and localization",
      "Human-centered innovation positioning",
      "Responsible AI and technology ethics",
      "Founder/investor readiness and introductions",
      "Private formats, salons and stakeholder rooms",
    ],
    outcomes: [
      "A clear external perspective",
      "Sharper options for complex decisions",
      "Better alignment between people, incentives and execution",
      "A practical route toward collaboration or introductions",
    ],
    related: ["/startup-mentor", "/human-centered-ai", "/speaking"],
    schemaService: "Strategic consulting for venture ecosystems and human-centered innovation",
  },
  media: {
    path: "/media",
    eyebrow: "Media",
    title: "Commentary on startups, AI, ecosystems, culture and human-centered technology.",
    description:
      "Media and interview page for Alex Lindholm: venture architect, human-centered technologist, ecosystem builder, speaker and founder/investor connector.",
    audience:
      "For journalists, podcast hosts, event producers, university media teams, innovation publications and ecosystem partners.",
    primaryCta: "Connect on LinkedIn",
    secondaryCta: "Discuss an interview",
    secondaryHref: profileLinks.consultation,
    topics: [
      "Responsible AI and digital humanism",
      "Future of entrepreneurship in Europe",
      "Startup ecosystems and founder psychology",
      "LoveTech, matching markets and human behavior",
      "Ethical technology and innovation leadership",
      "Cross-border human networks and communities",
    ],
    outcomes: [
      "Founder/operator perspective with cultural context",
      "Clear commentary without hype language",
      "Topics that connect technology with real human behavior",
      "LinkedIn-first profile for ongoing public thinking",
    ],
    related: ["/speaking", "/human-centered-ai", "/startup-mentor"],
    schemaService: "Media commentary and interviews",
  },
} as const;

export type SeoPageKey = keyof typeof seoPages;

export function personSchema(pageKey?: SeoPageKey) {
  const page = pageKey ? seoPages[pageKey] : null;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#alex-lindholm`,
    name: "Alex P. Lindholm",
    url: baseUrl,
    sameAs: [profileLinks.linkedin],
    image: `${baseUrl}/media/alex-portrait.jpg`,
    jobTitle: [
      "Venture Architect",
      "Human-Centered Technologist",
      "Ecosystem Builder",
      "Speaker",
      "Startup Mentor",
    ],
    worksFor: {
      "@type": "Organization",
      name: "InspireXchange.nl Accelerator",
      url: "https://inspirexchange.nl",
    },
    affiliation: [
      { "@type": "Organization", name: "Erasmus University Rotterdam" },
      { "@type": "Organization", name: "Paideia - The European Institute for Jewish Studies in Sweden" },
      { "@type": "Organization", name: "Yad Vashem" },
      { "@type": "Organization", name: "Ziering Brandeis Collegiate Institute / BCI" },
      { "@type": "Organization", name: "ANU Museum of the Jewish People" },
    ],
    knowsAbout: page ? [...sharedKeywords, ...page.topics] : sharedKeywords,
  };
}

export function serviceSchema(pageKey: SeoPageKey) {
  const page = seoPages[pageKey];

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}${page.path}#service`,
    name: page.schemaService,
    description: page.description,
    url: `${baseUrl}${page.path}`,
    provider: { "@id": `${baseUrl}/#alex-lindholm` },
    audience: {
      "@type": "Audience",
      audienceType: page.audience,
    },
    areaServed: ["Europe", "Netherlands", "International"],
    sameAs: [profileLinks.linkedin],
  };
}

export function webPageSchema(pageKey: SeoPageKey) {
  const page = seoPages[pageKey];

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}${page.path}#webpage`,
    url: `${baseUrl}${page.path}`,
    name: `${page.eyebrow} | Alex Lindholm`,
    description: page.description,
    mainEntity: { "@id": `${baseUrl}/#alex-lindholm` },
    isPartOf: {
      "@type": "WebSite",
      name: "Alex Lindholm",
      url: baseUrl,
    },
  };
}
