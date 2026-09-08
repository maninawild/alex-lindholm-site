import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { siteUrl } from "@/lib/site";

const pageUrl = `${siteUrl}/product-venture-leader`;
const linkedinUrl = "https://www.linkedin.com/in/axlindholm/";

const roles = [
  {
    period: "2024 - Present",
    title: "Co-Founder & Managing Partner, InspireXchange.nl Accelerator",
    text: "Startup incubation, product validation and PMF, supporting up to 20 teams in parallel through discovery, research, hypothesis testing and experiments.",
  },
  {
    period: "2021 - 2023",
    title: "Co-Founder & Business Developer, Bear Grid B.V.",
    text: "Led an early-stage product from concept to market validation, coordinating technical, research and business stakeholders.",
  },
  {
    period: "2020 - 2022",
    title: "Co-Founder & Venture Builder, BOXMATE",
    text: "Built a modular housing product line from customer discovery through MVP definition, pricing experiments and fundraising support.",
  },
  {
    period: "2020 - 2022",
    title: "Investment Consultant & Portfolio Analyst, Private Equity",
    text: "Evaluated venture viability, market hypotheses, traction and scalability across a diversified investment portfolio.",
  },
];

const targetRoles = [
  "Product Manager / Product Lead",
  "Venture Builder",
  "Accelerator Program Director",
  "Innovation & Incubation Lead",
  "Entrepreneur in Residence",
  "Business Development or Portfolio roles",
];

const strengths = [
  {
    title: "Product discovery & validation",
    text: "Customer research, problem framing, hypothesis testing, MVP scope, pricing experiments and product-market fit direction.",
  },
  {
    title: "Venture building",
    text: "Moving early-stage ideas from ambiguity to a practical product, business model, team priorities and market evidence.",
  },
  {
    title: "Accelerator leadership",
    text: "Startup diagnostics, program design, founder mentoring, portfolio coordination and investor-readiness work.",
  },
  {
    title: "Business development",
    text: "Cross-border partnerships, stakeholder alignment, market entry, strategic introductions and complex B2B conversations.",
  },
];

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${pageUrl}#profile-page`,
  url: pageUrl,
  name: "Alex Lindholm - Product, Venture and Innovation Leader",
  dateModified: "2026-09-08",
  mainEntity: {
    "@type": "Person",
    "@id": `${siteUrl}/#alex-lindholm`,
    name: "Alex Lindholm",
    alternateName: "Alex P. Lindholm",
    url: siteUrl,
    image: `${siteUrl}/media/alex-portrait.jpg`,
    sameAs: [linkedinUrl],
    jobTitle: "Product and Venture Leader",
    homeLocation: {
      "@type": "Country",
      name: "Netherlands",
    },
    worksFor: {
      "@type": "Organization",
      name: "InspireXchange.nl Accelerator",
      url: "https://www.inspirexchange.nl/",
    },
    hasOccupation: targetRoles.map((name) => ({
      "@type": "Occupation",
      name,
    })),
    knowsLanguage: ["English", "Russian", "Hebrew", "Ukrainian", "Dutch"],
    knowsAbout: [
      "Product discovery and validation",
      "Startup incubation and acceleration",
      "Venture building",
      "Investment strategy and portfolio analysis",
      "Business development",
      "Fundraising readiness",
    ],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Saint Petersburg State University" },
      { "@type": "CollegeOrUniversity", name: "National Research University Higher School of Economics" },
    ],
  },
};

export const metadata: Metadata = {
  title: "Product & Venture Leader in the Netherlands",
  description:
    "Alex Lindholm is a Netherlands-based product and venture leader with 10+ years across product discovery, startup incubation, venture building, accelerator programs, portfolio analysis and business development.",
  keywords: [
    "Product Manager Netherlands",
    "Product Lead Netherlands",
    "Venture Builder Netherlands",
    "Accelerator Program Director",
    "Innovation and Incubation Lead",
    "Entrepreneur in Residence Netherlands",
    "Startup Portfolio Analyst",
    "Alex Lindholm",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Alex Lindholm | Product & Venture Leader",
    description:
      "Professional profile covering product discovery, venture building, startup incubation, accelerator leadership and business development.",
    url: pageUrl,
    type: "profile",
  },
};

export default function ProductVentureLeaderPage() {
  return (
    <main className="min-h-screen bg-bone pt-20 text-ink sm:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <SiteHeader transparentAtTop={false} />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1.22fr_0.78fr] lg:items-end lg:pt-14">
        <div>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
            Professional Profile
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-[1.06] tracking-[-0.035em] text-balance sm:text-6xl">
            Product, venture and innovation leader based in the Netherlands.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-graphite/76">
            I bring 10+ years of experience across product discovery, startup
            incubation, venture building, accelerator programs, portfolio analysis
            and business development. I work best where the market is uncertain,
            the problem is complex and a team needs a practical route forward.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-electric bg-electric px-6 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Discuss a role or contract
            </a>
            <Link
              href="/#work"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-ink/15 px-6 text-sm font-medium text-ink transition hover:border-electric hover:bg-electric/5"
            >
              View selected work
            </Link>
          </div>
        </div>

        <aside className="rounded-sm border border-ink/10 bg-white p-6 shadow-quiet sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
            Open to
          </p>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-graphite/78">
            {targetRoles.map((role) => (
              <li className="border-l border-ink/12 pl-4" key={role}>{role}</li>
            ))}
          </ul>
          <p className="mt-6 border-t border-ink/10 pt-5 text-sm leading-6 text-graphite/70">
            Netherlands or remote · Full-time or contract
          </p>
        </aside>
      </section>

      <section className="border-y border-ink/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-px sm:grid-cols-3">
          {[
            ["10+ years", "product, venture and innovation work"],
            ["1000+", "founder problem-solving sessions"],
            ["500+", "lectures, workshops and strategy sessions"],
          ].map(([value, label]) => (
            <div className="px-5 py-7 sm:border-l sm:border-ink/10 sm:px-8" key={label}>
              <p className="text-3xl font-semibold tracking-[-0.025em]">{value}</p>
              <p className="mt-2 text-sm leading-6 text-graphite/66">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-bone">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.68fr_1.32fr]">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">Experience</p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.025em] text-balance sm:text-4xl">
              Building products, ventures and programs.
            </h2>
          </div>
          <div className="grid gap-3">
            {roles.map((role) => (
              <article className="rounded-sm border border-ink/8 bg-white p-5 shadow-quiet sm:p-6" key={role.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-copper">{role.period}</p>
                <h3 className="mt-2 text-lg font-semibold leading-tight tracking-[-0.015em]">{role.title}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite/72">{role.text}</p>
              </article>
            ))}
            <p className="mt-3 text-sm leading-6 text-graphite/66">
              Earlier leadership: Development Director, World Federation of Georgian Jewry (2019 - 2020); Director of Business Development, KIDZ Design (2015 - 2017); Program Director and Product Manager, Hillel St. Petersburg (2011 - 2015).
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.68fr_1.32fr]">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">Core Strengths</p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.025em] text-balance sm:text-4xl">
              Where I add value.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {strengths.map((strength) => (
              <article className="border-l border-copper/40 pl-5" key={strength.title}>
                <h3 className="text-lg font-semibold tracking-[-0.015em]">{strength.title}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite/70">{strength.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-bone">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-2">
          <article className="rounded-sm border border-ink/8 bg-white p-6 shadow-quiet">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">Education & Programs</p>
            <p className="mt-4 text-base leading-7 text-graphite/76">
              Saint Petersburg State University, National Research University Higher School of Economics, Masterschool, Paideia, Yad Vashem, BCI and ANU Museum of the Jewish People.
            </p>
          </article>
          <article className="rounded-sm border border-ink/8 bg-white p-6 shadow-quiet">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">Languages</p>
            <p className="mt-4 text-base leading-7 text-graphite/76">
              English fluent · Russian native · Hebrew intermediate · Ukrainian intermediate · Dutch beginner
            </p>
          </article>
        </div>
      </section>

      <section className="bg-ink px-5 py-16 text-bone sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">Recruitment & Collaboration</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.025em] text-balance sm:text-4xl">
              Looking for product, venture or innovation leadership?
            </h2>
          </div>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer me"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/20 bg-white px-6 text-sm font-medium text-ink transition hover:bg-bone"
          >
            Contact Alex on LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}
