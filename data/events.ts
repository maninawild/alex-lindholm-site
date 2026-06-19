export type EventPartner = {
  name: string;
  url?: string;
};

export type EventSpeaker = {
  name: string;
  role: string;
};

export type EventItem = {
  title: string;
  slug: string;
  date: string;
  endDate?: string;
  displayDate: string;
  status: "past" | "upcoming";
  role: string;
  location: string;
  organizer: string;
  format?: string;
  partners: EventPartner[];
  shortDescription: string;
  eventUrl?: string;
  externalUrl?: string;
  linkedInUrl?: string;
  coverImage: string;
  galleryImages: string[];
  featured: boolean;
  speakers?: EventSpeaker[];
  talkTitle?: string;
  subtitle?: string;
  recap?: string[];
  keyThemes?: string[];
  outcome?: string;
  seo: {
    title: string;
    description: string;
  };
};

export const inviteAlexUrl = "mailto:hello@alexlindholm.com?subject=Invite%20Alex%20for%20an%20event";

export const events: EventItem[] = [
  {
    title: "MEGATHON",
    slug: "megathon-amsterdam-tech-week-2026",
    date: "2026-06-19",
    endDate: "2026-06-21",
    displayDate: "19–21 June 2026",
    status: "upcoming",
    role: "Community / Guest / Ecosystem participant",
    location: "The HUBB, Jacob Bontiusplaats 9, Amsterdam",
    organizer: "TAG",
    format: "Hackathon / Demo weekend / Builder event",
    partners: [
      {
        name: "TAG",
      },
      {
        name: "Amsterdam Tech Week",
        url: "https://amstechweek.com/",
      },
      {
        name: "OpenAI Codex",
        url: "https://openai.com/codex/",
      },
      {
        name: "Mollie",
        url: "https://www.mollie.com/",
      },
      {
        name: "Visa",
        url: "https://www.visa.com/",
      },
      {
        name: "Base44",
        url: "https://base44.com/",
      },
      {
        name: "Cognition",
        url: "https://cognition.ai/",
      },
      {
        name: "Peak",
        url: "https://peak.capital/",
      },
      {
        name: "Miro",
        url: "https://miro.com/",
      },
      {
        name: "Netlify",
        url: "https://www.netlify.com/",
      },
    ],
    shortDescription:
      "A three-day Amsterdam Tech Week builder event with 500 vetted builders, startup teams, investors, sponsor tracks, and main-stage finals.",
    eventUrl: "https://luma.com/zf34oolt",
    externalUrl: "https://megathon.xyz/",
    coverImage: "/images/events/megathon-amsterdam/cover.jpg",
    galleryImages: [
      "/images/events/megathon-amsterdam/gallery-1.jpg",
      "/images/events/megathon-amsterdam/gallery-2.jpg",
      "/images/events/megathon-amsterdam/gallery-3.jpg",
    ],
    featured: false,
    subtitle: "Part of Amsterdam Tech Week",
    keyThemes: [
      "Hackathon and demo weekend",
      "Builder teams and sponsor tracks",
      "Startup ecosystem and main-stage finals",
    ],
    seo: {
      title: "MEGATHON Amsterdam Tech Week 2026",
      description:
        "MEGATHON is a three-day Amsterdam Tech Week builder event at The HUBB with vetted builders, startup teams, investors, sponsor tracks, and main-stage finals.",
    },
  },
  {
    title: "Build Night #4 @ Mollie",
    slug: "build-night-4-mollie-amsterdam-tech-week-2026",
    date: "2026-06-17",
    displayDate: "17 June 2026",
    status: "past",
    role: "Guest Speaker",
    location: "Mollie, Keizersgracht 126, Amsterdam",
    organizer: "DAY42",
    partners: [
      {
        name: "Mollie",
        url: "https://www.mollie.com/",
      },
      {
        name: "Amsterdam Tech Week",
        url: "https://amstechweek.com/",
      },
      {
        name: "Consent Studio CMP",
      },
      {
        name: "Lovable",
        url: "https://lovable.dev/",
      },
      {
        name: "PHAM. Creative",
      },
    ],
    shortDescription:
      "Alex joined DAY42's Build Night during Amsterdam Tech Week with a talk on ADHD founders, idea filtering, and testing before committing years of your life.",
    eventUrl: "https://luma.com/jyqmf0xe",
    linkedInUrl:
      "https://www.linkedin.com/posts/axlindholm_amsterdamtechweek-adhdfounder-startups-ugcPost-7473675430923948034-YZi4/",
    coverImage: "/images/events/build-night-4/cover.jpg",
    galleryImages: [
      "/images/events/build-night-4/gallery-1.jpg",
      "/images/events/build-night-4/gallery-2.jpg",
      "/images/events/build-night-4/gallery-3.jpg",
      "/images/events/build-night-4/gallery-4.jpg",
      "/images/events/build-night-4/gallery-5.jpg",
      "/images/events/build-night-4/gallery-6.jpg",
      "/images/events/build-night-4/gallery-7.jpg",
      "/images/events/build-night-4/gallery-8.jpg",
      "/images/events/build-night-4/gallery-9.jpg",
    ],
    featured: true,
    talkTitle:
      "ADHD Founder Survival Guide: How to Test Ideas Before They Consume (Y)our Life",
    subtitle:
      "A DAY42 builder community event during Amsterdam Tech Week, hosted at Mollie in Amsterdam.",
    recap: [
      "One of the strongest events of Amsterdam Tech Week was not really about AI. It was about people building things, sharing mistakes, testing ideas, and helping each other move forward.",
      "Alex joined the DAY42 community as a guest speaker with the talk “ADHD Founder Survival Guide: How to Test Ideas Before They Consume (Y)our Life.” The session focused on a practical founder problem: not the lack of ideas, but choosing which idea deserves the next three years of your life.",
      "The event brought together founders, students, builders, and startup people in a relaxed setting. The most valuable part was not only the talk, but the conversations after it: people sharing projects, distractions, mistakes, and experiments.",
    ],
    keyThemes: [
      "ADHD founder focus and idea overload",
      "Choosing ideas based on evidence, not obsession",
      "Testing before committing years of work",
      "Building sincere European startup communities",
      "Less startup theatre, more useful experiments",
    ],
    seo: {
      title: "Build Night #4 @ Mollie",
      description:
        "Alex Lindholm joined DAY42's Build Night during Amsterdam Tech Week at Mollie with a talk on ADHD founders, idea filtering, and testing before committing years of work.",
    },
  },
  {
    title: "SeXXXess Night: Digital Intimacy & Dating Apps",
    slug: "sexxxess-night-digital-intimacy-dating-apps",
    date: "2026-02-12",
    displayDate: "12 February 2026",
    status: "past",
    role: "Speaker",
    location: "Świetlica Wolności, Warsaw, Poland",
    organizer: "Ū HUB",
    partners: [
      {
        name: "WeExpert",
        url: "https://weexpert.io",
      },
      {
        name: "Fotando Global",
        url: "https://www.fotando.global",
      },
      {
        name: "Zubr Capital",
        url: "https://zubrcapital.com",
      },
    ],
    shortDescription:
      "An evening in Warsaw about digital intimacy, dating apps, LoveTech business models, and how people meet, flirt, and build relationships in 2026.",
    eventUrl: "https://luma.com/ei6ly3jn",
    coverImage: "/images/events/sexxxess-night-warsaw/cover.jpg",
    galleryImages: [
      "/images/events/sexxxess-night-warsaw/gallery-1.jpg",
      "/images/events/sexxxess-night-warsaw/gallery-2.jpg",
      "/images/events/sexxxess-night-warsaw/gallery-3.jpg",
      "/images/events/sexxxess-night-warsaw/gallery-4.jpg",
      "/images/events/sexxxess-night-warsaw/gallery-5.jpg",
    ],
    featured: false,
    speakers: [
      {
        name: "Vlad Zely",
        role: "Head of Product Design at Feeld",
      },
      {
        name: "Anton Neverov",
        role: "CMO at With",
      },
      {
        name: "Song Kim",
        role: "Founder & CEO at Zeya Social",
      },
      {
        name: "Alex P. Lindholm",
        role: "Founder & Managing Partner at InspireXchange",
      },
    ],
    talkTitle: "Swipe Is Dead. But I Am Not.",
    subtitle: "Experiments in LoveTech Business Models",
    recap: [
      "Ū HUB opened the new event year in Warsaw with SeXXXess Night — a warm February evening about digital intimacy, dating apps, and the future of connection.",
      "Alex joined as a speaker with the talk “Swipe Is Dead. But I Am Not.” The session explored experiments in LoveTech business models and how startup thinking can help redesign the way people meet, flirt, and build relationships in an increasingly digital world.",
      "The evening brought together founders, product people, dating-app operators, and community builders for talks, open conversations, speed dating, networking, wine, and practical discussion around intimacy, loneliness, algorithms, and human connection.",
    ],
    keyThemes: [
      "Digital intimacy and dating apps",
      "LoveTech business models",
      "Loneliness, algorithms, and human connection",
    ],
    seo: {
      title: "SeXXXess Night: Digital Intimacy & Dating Apps",
      description:
        "Alex Lindholm spoke at Ū HUB's SeXXXess Night in Warsaw about digital intimacy, dating apps, LoveTech business models, and the future of connection.",
    },
  },
  {
    title: "Dating is Dead. But I’m Not.",
    slug: "dating-is-dead-locali-hub-inspirexchange",
    date: "",
    displayDate: "Date to confirm",
    status: "past",
    role: "Co-host",
    location: "Locali Hub",
    organizer: "Locali Hub × InspireXchange",
    partners: [
      {
        name: "Locali Hub",
      },
      {
        name: "InspireXchange",
      },
      {
        name: "GUIDE",
      },
      {
        name: "svaha",
      },
    ],
    shortDescription:
      "A Russian-language community event about dating, loneliness after relocation, AI, matchmaking, and new ways people meet.",
    coverImage: "/images/events/dating-is-dead-locali/cover.jpg",
    galleryImages: [
      "/images/events/dating-is-dead-locali/cover.jpg",
      "/images/events/dating-is-dead-locali/gallery-1.jpg",
      "/images/events/dating-is-dead-locali/gallery-2.jpg",
      "/images/events/dating-is-dead-locali/gallery-3.jpg",
    ],
    featured: false,
    outcome:
      "GUIDE founder Sophia Mokhar later received €25K in support and further investment commitment.",
    recap: [
      "A Russian-language community event about dating, loneliness after relocation, AI, matchmaking, and new ways people meet.",
      "The conversation connected personal experience with new social products and the practical question of how communities can help people meet with more trust and less performance.",
    ],
    keyThemes: [
      "Dating and loneliness after relocation",
      "AI, matchmaking, and new meeting patterns",
      "Community trust and practical support",
    ],
    seo: {
      title: "Dating is Dead. But I’m Not.",
      description:
        "A Locali Hub and InspireXchange community event about dating, relocation, AI, matchmaking, and new ways people meet.",
    },
  },
];

export const featuredPastEvent = events.find(
  (event) => event.status === "past" && event.featured,
);

export const upcomingEvents = events
  .filter((event) => event.status === "upcoming")
  .sort((a, b) => a.date.localeCompare(b.date));

export const pastEvents = events
  .filter((event) => event.status === "past")
  .sort((a, b) => (b.date || "0000").localeCompare(a.date || "0000"));

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}
