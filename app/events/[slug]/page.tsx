import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { events, getEventBySlug } from "@/data/events";
import { SiteHeader } from "@/components/site-header";

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const siteUrl = "https://alexlindholm.com";

export function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {};
  }

  const path = `/events/${event.slug}`;

  return {
    title: event.seo.title,
    description: event.seo.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${event.seo.title} | Alex Lindholm`,
      description: event.seo.description,
      url: path,
      siteName: "Alex Lindholm",
      type: "article",
      images: [
        {
          url: event.images.cover,
          width: 1200,
          height: 630,
          alt: `${event.title} with Alex Lindholm`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: event.seo.title,
      description: event.seo.description,
      images: [event.images.cover],
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const linkedInRecap = event.links.find((link) =>
    link.label.toLowerCase().includes("linkedin recap"),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    eventStatus: "https://schema.org/EventCompleted",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Mollie",
      address: event.location,
    },
    organizer: {
      "@type": "Organization",
      name: event.presentedBy,
      sameAs: "https://www.linkedin.com/company/day42/posts/?feedView=all",
    },
    performer: {
      "@type": "Person",
      name: "Alex Lindholm",
      url: siteUrl,
    },
    description: event.seo.description,
    image: `${siteUrl}${event.images.cover}`,
    url: `${siteUrl}/events/${event.slug}`,
  };

  return (
    <main className="bg-bone text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative min-h-[82vh] overflow-hidden bg-ink text-bone">
        <Image
          src={event.images.cover}
          alt={`${event.title} event at Mollie in Amsterdam`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/42" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,19,26,0.92)_0%,rgba(16,19,26,0.58)_48%,rgba(16,19,26,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,19,26,0.78)_0%,rgba(16,19,26,0.10)_58%,rgba(16,19,26,0.36)_100%)]" />

        <SiteHeader />

        <div className="relative z-10 mx-auto flex min-h-[82vh] max-w-7xl flex-col justify-end px-5 pb-12 pt-28 sm:px-8 lg:pb-16">
          <div className="max-w-4xl">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-bone/70">
              {event.meta}
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.03] tracking-[-0.035em] text-balance sm:text-6xl">
              {event.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-bone/82">
              {event.subtitle}
            </p>
          </div>

          <dl className="mt-10 grid gap-3 border-y border-bone/20 py-5 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <EventFact label="Date" value={event.displayDate} />
            <EventFact label="Location" value={event.location} />
            <EventFact label="Role" value={event.alexRole} />
            <EventFact label="Organizer" value={event.presentedBy} />
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <aside className="lg:sticky lg:top-24">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              Event Recap
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] text-balance sm:text-4xl">
              Testing ideas before they consume years of your life.
            </h2>
            <p className="mt-5 text-base leading-7 text-graphite/72">
              Talk: “{event.talkTitle}”
            </p>

            {linkedInRecap ? (
              <a
                href={linkedInRecap.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-electric bg-electric px-6 text-sm font-medium text-bone transition duration-300 hover:bg-blue-700"
              >
                <span>Read Alex's LinkedIn recap</span>
                <span aria-hidden="true">→</span>
              </a>
            ) : null}
          </aside>

          <div>
            <div className="space-y-6 text-lg leading-8 text-graphite/82">
              {event.recap.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 rounded-sm border border-ink/10 bg-paper p-6 shadow-quiet sm:p-7">
              <h2 className="text-2xl font-semibold tracking-[-0.02em]">
                Key themes
              </h2>
              <ul className="mt-6 grid gap-3 text-base leading-7 text-graphite/76 sm:grid-cols-2">
                {event.keyThemes.map((theme) => (
                  <li className="flex gap-3" key={theme}>
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
                    <span>{theme}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone pb-16 text-ink sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
                Photo Gallery
              </p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] text-balance sm:text-4xl">
                Moments from Build Night.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-graphite/58">
              Local optimized event images only. Lightroom is a source, not a
              hotlinked asset host.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
            <GalleryImage
              src={event.images.gallery[0]}
              alt={`${event.title} gallery image 1`}
              className="min-h-[360px] lg:min-h-[580px]"
            />
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {event.images.gallery.slice(1).map((image, index) => (
                <GalleryImage
                  key={image}
                  src={image}
                  alt={`${event.title} gallery image ${index + 2}`}
                  className="min-h-[220px] lg:min-h-[184px]"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone pb-20 text-ink">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-sm border border-ink/10 bg-paper p-6 shadow-quiet sm:p-8">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              External Links
            </p>
            <div className="mt-6 grid gap-3">
              {event.links.map((link) => (
                <ExternalLink key={link.href} href={link.href} label={link.label} />
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-ink/10 bg-paper p-6 shadow-quiet sm:p-8">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              Partners & Credits
            </p>
            <p className="mt-5 text-base leading-7 text-graphite/76">
              {event.thankYou}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {event.partners.map((partner) =>
                partner.href ? (
                  <a
                    key={partner.name}
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-ink/12 px-4 py-2 text-sm text-graphite/78 transition hover:border-electric hover:text-electric"
                  >
                    {partner.name}
                  </a>
                ) : (
                  <span
                    key={partner.name}
                    className="rounded-full border border-ink/10 px-4 py-2 text-sm text-graphite/62"
                  >
                    {partner.name}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function EventFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-bone/56">
        {label}
      </dt>
      <dd className="mt-2 leading-6 text-bone/88">{value}</dd>
    </div>
  );
}

function GalleryImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-sm bg-ink shadow-quiet ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-h-14 items-center justify-between gap-4 rounded-sm border border-ink/8 px-4 py-3 text-sm font-medium text-ink transition hover:border-electric hover:bg-electric/5"
    >
      <span>{label}</span>
      <span className="text-electric transition group-hover:translate-x-0.5" aria-hidden="true">
        →
      </span>
    </a>
  );
}
