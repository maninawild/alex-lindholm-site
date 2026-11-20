import { localizedSchema } from "@/lib/i18n/schema";
import { translator, localizedHref, type Locale } from "@/lib/i18n";
import { CountUp } from "@/components/count-up";
import { CompanyMentions } from "@/components/company-mentions";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { siteUrl } from "@/lib/site";
export function ProductProfilePage({locale="en"}:{locale?:Locale}) {
 const t=translator(locale); const href=(v:string)=>localizedHref(v,locale);


const pageUrl = `${siteUrl}/product-venture-leader`;
const linkedinUrl = "https://www.linkedin.com/in/axlindholm/";

const roles = [
  {
    period: t("2024 - Present"),
    title: t("Co-Founder & Managing Partner, InspireXchange.nl Accelerator"),
    text: t("Startup incubation, product validation and PMF, supporting up to 20 teams in parallel through discovery, research, hypothesis testing and experiments."),
  },
  {
    period: "2021 - 2023",
    title: t("Co-Founder & Business Developer, Bear Grid B.V."),
    text: t("Led an early-stage product from concept to market validation, coordinating technical, research and business stakeholders."),
  },
  {
    period: "2020 - 2022",
    title: t("Co-Founder & Venture Builder, BOXMATE"),
    text: t("Built a modular housing product line from customer discovery through MVP definition, pricing experiments and fundraising support."),
  },
  {
    period: "2020 - 2022",
    title: t("Investment Consultant & Portfolio Analyst, Private Equity"),
    text: t("Evaluated venture viability, market hypotheses, traction and scalability across a diversified investment portfolio."),
  },
];

const targetRoles = [
  t("Product Manager / Product Lead"),
  t("Venture Builder"),
  t("Accelerator Program Director"),
  t("Innovation & Incubation Lead"),
  t("Entrepreneur in Residence"),
  t("Business Development or Portfolio roles"),
];

const strengths = [
  {
    title: t("Product discovery & validation"),
    text: t("Customer research, problem framing, hypothesis testing, MVP scope, pricing experiments and product-market fit direction."),
  },
  {
    title: t("Venture building"),
    text: t("Moving early-stage ideas from ambiguity to a practical product, business model, team priorities and market evidence."),
  },
  {
    title: t("Accelerator leadership"),
    text: t("Startup diagnostics, program design, founder mentoring, portfolio coordination and investor-readiness work."),
  },
  {
    title: t("Business development"),
    text: t("Cross-border partnerships, stakeholder alignment, market entry, strategic introductions and complex B2B conversations."),
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
      name: t("Netherlands"),
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
    knowsLanguage: [t("English"), t("Russian"), t("Hebrew"), t("Ukrainian"), t("Dutch")],
    knowsAbout: [
      t("Product discovery and validation"),
      t("Startup incubation and acceleration"),
      t("Venture building"),
      t("Investment strategy and portfolio analysis"),
      t("Business development"),
      t("Fundraising readiness"),
    ],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Saint Petersburg State University" },
      { "@type": "CollegeOrUniversity", name: "National Research University Higher School of Economics" },
    ],
  },
};






  return (
    <main lang={locale} className="min-h-screen bg-bone pt-20 text-ink sm:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedSchema(profileJsonLd,locale)) }}
      />
      <SiteHeader transparentAtTop={false} contentLanguage={locale} languageSwitch={{href: locale === "ru" ? "/product-venture-leader" : "/ru/product-venture-leader",label:locale === "ru" ? "EN" : "RU",ariaLabel:locale === "ru" ? "Read in English" : "Читать по-русски"}} />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1.22fr_0.78fr] lg:items-end lg:pt-14">
        <div>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
            {t("For hiring teams")}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-[1.06] tracking-[-0.035em] text-balance sm:text-6xl">
            {t("Product, venture and programme leadership.")}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-graphite/76">
            {t("I help teams test product ideas, build ventures and run startup programmes. 10+ years across startups, product discovery and business development. Based in the Netherlands.")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:alex@inspirexchange.nl?subject=Role%20or%20project%20for%20Alex"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-electric bg-electric px-6 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              {t("Discuss a role or project")}</a>
            <Link
              href={href("/#work")}
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-ink/15 px-6 text-sm font-medium text-ink transition hover:border-electric hover:bg-electric/5"
            >
              {t("View selected work")}</Link>
          </div>
        </div>

        <aside className="rounded-sm border border-ink/10 bg-white p-6 shadow-quiet sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
            {t("Open to")}</p>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-graphite/78">
            {targetRoles.map((role) => (
              <li className="border-l border-ink/12 pl-4" key={t(role)}>{t(role)}</li>
            ))}
          </ul>
          <p className="mt-6 border-t border-ink/10 pt-5 text-sm leading-6 text-graphite/70">
            {t("Netherlands or remote · Full-time or contract")}</p>
        </aside>
      </section>

      <section className="border-y border-ink/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-px sm:grid-cols-3">
          {[
            [t("10+ years"), t("product, venture and innovation work")],
            ["1000+", t("founder problem-solving sessions")],
            ["500+", t("lectures, workshops and strategy sessions")],
          ].map(([value, label]) => (
            <div className="px-5 py-7 sm:border-l sm:border-ink/10 sm:px-8" key={t(label)}>
              <p className="text-3xl font-semibold tracking-[-0.025em]"><CountUp value={t(value)} /></p>
              <p className="mt-2 text-sm leading-6 text-graphite/66">{t(label)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-bone">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.68fr_1.32fr]">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">{t("Experience")}</p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.025em] text-balance sm:text-4xl">
              {t("Building products, ventures and programs.")}</h2>
          </div>
          <div className="grid gap-3">
            {roles.map((role) => (
              <article className="rounded-sm border border-ink/8 bg-white p-5 shadow-quiet sm:p-6" key={t(role.title)}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-copper">{t(role.period)}</p>
                <h3 className="mt-2 text-lg font-semibold leading-tight tracking-[-0.015em]"><CompanyMentions text={t(role.title)} /></h3>
                <p className="mt-3 text-sm leading-6 text-graphite/72"><CompanyMentions text={t(role.text)} /></p>
              </article>
            ))}
            <p className="mt-3 text-sm leading-6 text-graphite/66">
              {t("Earlier leadership: Development Director, World Federation of Georgian Jewry (2019 - 2020); Director of Business Development, KIDZ Design (2015 - 2017); Program Director and Product Manager, Hillel St. Petersburg (2011 - 2015).")}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.68fr_1.32fr]">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">{t("Core Strengths")}</p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.025em] text-balance sm:text-4xl">
              {t("Where I add value.")}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {strengths.map((strength) => (
              <article className="border-l border-copper/40 pl-5" key={t(strength.title)}>
                <h3 className="text-lg font-semibold tracking-[-0.015em]">{t(strength.title)}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite/70">{t(strength.text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-bone">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-2">
          <article className="rounded-sm border border-ink/8 bg-white p-6 shadow-quiet">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">{t("Education & Programs")}</p>
            <p className="mt-4 text-base leading-7 text-graphite/76"><CompanyMentions text={t("Saint Petersburg State University, National Research University Higher School of Economics, Masterschool, Paideia, Yad Vashem, BCI and ANU Museum of the Jewish People.")} /></p>
          </article>
          <article className="rounded-sm border border-ink/8 bg-white p-6 shadow-quiet">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">{t("Languages")}</p>
            <p className="mt-4 text-base leading-7 text-graphite/76">
              {t("English fluent · Russian native · Hebrew intermediate · Ukrainian intermediate · Dutch beginner")}</p>
          </article>
        </div>
      </section>

      <section className="bg-ink px-5 py-16 text-bone sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">{t("Recruitment & Collaboration")}</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.025em] text-balance sm:text-4xl">
              {t("Looking for product, venture or innovation leadership?")}</h2>
          </div>
          <a
            href="mailto:alex@inspirexchange.nl?subject=Role%20or%20project%20for%20Alex"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/20 bg-white px-6 text-sm font-medium text-ink transition hover:bg-bone"
          >
            {t("Email Alex")}</a>
        </div>
      </section>
    </main>
  );

}
