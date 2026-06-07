import { ArrowLink } from "@/components/arrow-link";
import { SiteHeader } from "@/components/site-header";
import {
  profileLinks,
  SeoPageKey,
  seoPages,
  serviceSchema,
  webPageSchema,
  personSchema,
} from "@/data/seo-pages";

type SeoLandingPageProps = {
  pageKey: SeoPageKey;
};

const primaryHrefByPage: Record<SeoPageKey, string> = {
  speaking: profileLinks.consultation,
  humanCenteredAi: profileLinks.consultation,
  startupMentor: profileLinks.consultation,
  consulting: profileLinks.consultation,
  media: profileLinks.linkedin,
};

const allLinks = [
  { href: "/", label: "Home" },
  { href: "/speaking", label: "Speaking" },
  { href: "/human-centered-ai", label: "Human-Centered AI" },
  { href: "/startup-mentor", label: "Startup Mentor" },
  { href: "/consulting", label: "Consulting" },
  { href: "/media", label: "Media" },
];

export function SeoLandingPage({ pageKey }: SeoLandingPageProps) {
  const page = seoPages[pageKey];
  const jsonLd = [personSchema(pageKey), serviceSchema(pageKey), webPageSchema(pageKey)];

  return (
    <main className="bg-bone pt-20 text-ink sm:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader transparentAtTop={false} />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[0.9fr_0.72fr] lg:items-end lg:pt-12">
        <div>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
            {page.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-[1.08] tracking-[-0.03em] text-balance sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite/76">
            {page.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ArrowLink href={primaryHrefByPage[pageKey]} label={page.primaryCta} />
            <ArrowLink href={page.secondaryHref} label={page.secondaryCta} variant="lineDark" />
          </div>
        </div>
        <aside className="rounded-sm border border-ink/10 bg-bone p-6 shadow-quiet">
          <p className="text-sm font-semibold text-ink">Relevant for</p>
          <p className="mt-3 text-base leading-7 text-graphite/72">
            {page.audience}
          </p>
          <div className="mt-6 border-t border-ink/10 pt-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-copper">
              Profile reference
            </p>
            <a
              href={profileLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer me"
              className="mt-3 inline-flex text-sm font-medium text-ink underline decoration-ink/25 underline-offset-8 transition hover:decoration-ink"
            >
              LinkedIn: Alex P. Lindholm
            </a>
          </div>
        </aside>
      </section>

      <section className="section bg-bone">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              Focus Areas
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] text-balance sm:text-4xl">
              Searchable themes, grounded in real operator experience.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {page.topics.map((topic) => (
              <article
                key={topic}
                className="rounded-sm border border-ink/8 bg-bone p-5 shadow-quiet"
              >
                <h3 className="text-lg font-semibold leading-tight tracking-[-0.015em]">
                  {topic}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone pb-16">
        <div className="mx-auto grid max-w-7xl gap-8 border-y border-ink/10 px-5 py-10 sm:px-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              Useful Outcomes
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] text-balance sm:text-4xl">
              Why people usually reach out.
            </h2>
          </div>
          <div className="grid gap-4 text-base leading-7 text-graphite/74 md:grid-cols-2">
            {page.outcomes.map((outcome) => (
              <p className="border-l border-ink/10 pl-4" key={outcome}>
                {outcome}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 rounded-sm border border-ink/10 bg-bone p-6 shadow-quiet sm:p-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
                Internal Links
              </p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] text-balance sm:text-4xl">
                Related pages.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {page.related.map((href) => {
                const label =
                  allLinks.find((link) => link.href === href)?.label ??
                  (href === "/lectures-and-speaking"
                    ? "Lectures & Speaking"
                    : href.replace("/", ""));

                return (
                  <a
                    href={href}
                    key={href}
                    className="rounded-sm border border-ink/8 px-5 py-4 text-sm font-medium text-ink transition hover:border-electric hover:bg-electric/5"
                  >
                    {label} <span aria-hidden="true">→</span>
                  </a>
                );
              })}
              <a
                href={profileLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer me"
                className="rounded-sm border border-ink/8 px-5 py-4 text-sm font-medium text-ink transition hover:border-electric hover:bg-electric/5"
              >
                LinkedIn profile <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
