export type EventLink = {
  label: string;
  href: string;
};

export type EventPartner = {
  name: string;
  href?: string;
};

export type EventItem = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  location: string;
  status: "past" | "upcoming";
  presentedBy: string;
  hosts: EventLink[];
  alexRole: string;
  talkTitle: string;
  meta: string;
  homepageDescription: string;
  subtitle: string;
  recap: string[];
  keyThemes: string[];
  thankYou: string;
  images: {
    cover: string;
    gallery: string[];
    todo: string;
  };
  links: EventLink[];
  partners: EventPartner[];
  seo: {
    title: string;
    description: string;
  };
};

export const events: EventItem[] = [
  {
    slug: "build-night-4-mollie-amsterdam-tech-week-2026",
    title: "Build Night #4 @ Mollie",
    date: "2026-06-17",
    displayDate: "17 June 2026",
    location: "Mollie, Keizersgracht 126, Amsterdam",
    status: "past",
    presentedBy: "DAY42",
    hosts: [
      {
        label: "Rick Bossenbroek",
        href: "https://www.linkedin.com/in/rick-bossenbroek/",
      },
      {
        label: "Robbin Jansen",
        href: "https://www.linkedin.com/in/robbin-jansen/",
      },
      {
        label: "AMS Tech Week",
        href: "https://amstechweek.com/",
      },
    ],
    alexRole: "Guest Speaker",
    talkTitle:
      "ADHD Founder Survival Guide: How to Test Ideas Before They Consume (Y)our Life",
    meta: "Amsterdam Tech Week · DAY42 · 17 June 2026",
    homepageDescription:
      "Alex joined DAY42's Build Night during Amsterdam Tech Week with a talk on ADHD founders, idea filtering, and how to test ideas before they consume years of your life.",
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
    thankYou:
      "Huge thanks to DAY42, Rick Bossenbroek and Robbin Jansen for creating one of the most genuine builder communities in Amsterdam. Thanks also to Mollie, AMS Tech Week, Consent Studio CMP, Lovable, and PHAM. Creative for supporting and capturing the event.",
    images: {
      cover: "/images/events/build-night-4/cover.jpg",
      gallery: [
        "/images/events/build-night-4/cover.jpg",
        "/images/events/build-night-4/gallery-1.jpg",
        "/images/events/build-night-4/gallery-2.jpg",
        "/images/events/build-night-4/gallery-3.jpg",
      ],
      // TODO: Replace with selected high-quality photos from Lightroom gallery.
      todo: "Replace with selected high-quality photos from Lightroom gallery.",
    },
    links: [
      {
        label: "Original Luma event",
        href: "https://luma.com/jyqmf0xe",
      },
      {
        label: "Alex's LinkedIn recap",
        href: "https://www.linkedin.com/posts/axlindholm_amsterdamtechweek-adhdfounder-startups-ugcPost-7473675430923948034-YZi4/",
      },
      {
        label: "DAY42 LinkedIn",
        href: "https://www.linkedin.com/company/day42/posts/?feedView=all",
      },
      {
        label: "Rick Bossenbroek",
        href: "https://www.linkedin.com/in/rick-bossenbroek/",
      },
      {
        label: "Robbin Jansen",
        href: "https://www.linkedin.com/in/robbin-jansen/",
      },
    ],
    partners: [
      {
        name: "Mollie",
        href: "https://www.mollie.com/",
      },
      {
        name: "AMS Tech Week",
        href: "https://amstechweek.com/",
      },
      {
        name: "Consent Studio CMP",
      },
      {
        name: "Lovable",
        href: "https://lovable.dev/",
      },
      {
        name: "PHAM. Creative",
      },
    ],
    seo: {
      title: "Build Night #4 @ Mollie",
      description:
        "Alex Lindholm joined DAY42's Build Night during Amsterdam Tech Week at Mollie with a talk on ADHD founders, idea filtering, and testing before committing years of work.",
    },
  },
];

export const featuredPastEvent = events.find(
  (event) =>
    event.status === "past" &&
    event.slug === "build-night-4-mollie-amsterdam-tech-week-2026",
);

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}
