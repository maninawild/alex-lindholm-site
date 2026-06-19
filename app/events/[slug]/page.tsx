import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { events, getEventBySlug, inviteAlexUrl } from "@/data/events";
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
          url: event.coverImage,
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
      images: [event.coverImage],
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    ...(event.date ? { startDate: event.date } : {}),
    eventStatus:
      event.status === "past"
        ? "https://schema.org/EventCompleted"
        : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location,
      address: event.location,
    },
    organizer: {
      "@type": "Organization",
      name: event.organizer,
    },
    performer: {
      "@type": "Person",
      name: "Alex Lindholm",
      url: siteUrl,
    },
    description: event.seo.description,
    image: `${siteUrl}${event.coverImage}`,
    url: `${siteUrl}/events/${event.slug}`,
  };

  return (
    <main className="bg-bone text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative min-h-[78vh] overflow-hidden bg-ink text-bone">
        <Image
          src={event.coverImage}
          alt={`${event.title} event`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_24%]"
        />
        <div className="absolute inset-0 bg-ink/42" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,19,26,0.92)_0%,rgba(16,19,26,0.58)_48%,rgba(16,19,26,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,19,26,0.78)_0%,rgba(16,19,26,0.10)_58%,rgba(16,19,26,0.36)_100%)]" />

        <SiteHeader />

        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-5 pb-12 pt-28 sm:px-8 lg:pb-16">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-bone/70">
            {event.organizer} · {event.displayDate}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.03] tracking-[-0.035em] text-balance sm:text-6xl">
            {event.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-bone/82">
            {event.subtitle ?? event.shortDescription}
          </p>
        </div>
      </section>

      <section className="bg-bone py-12 text-ink sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              Event Details
            </p>
            <dl className="mt-6 grid gap-4 border-y border-ink/10 py-5 text-sm sm:grid-cols-2">
              <EventFact label="Date" value={event.displayDate} />
              <EventFact label="Location" value={event.location} />
              <EventFact label="Role" value={event.role} />
              <EventFact label="Organizer" value={event.organizer} />
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              {event.eventUrl ? (
                <ExternalButton href={event.eventUrl} label="Main event link" />
              ) : null}
              {event.linkedInUrl ? (
                <ExternalButton
                  href={event.linkedInUrl}
                  label="Read Alex's LinkedIn recap"
                  primary
                />
              ) : null}
            </div>
          </div>

          <div>
            <p className="text-base leading-7 text-graphite/78">
              {event.shortDescription}
            </p>
            {event.talkTitle ? (
              <p className="mt-5 border-l border-electric/45 pl-4 text-base leading-7 text-graphite/72">
                Talk: “{event.talkTitle}”
              </p>
            ) : null}
            {event.outcome ? (
              <p className="mt-5 rounded-sm border border-ink/10 bg-paper p-4 text-sm leading-6 text-graphite/72 shadow-quiet">
                {event.outcome}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-bone pb-16 text-ink sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
            Photos
          </p>
          <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] text-balance sm:text-4xl">
            Event moments.
          </h2>

          <div className="mt-7 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
            <GalleryImage
              src={event.galleryImages[0]}
              alt={`${event.title} gallery image 1`}
              className="min-h-[360px] lg:min-h-[580px]"
            />
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {event.galleryImages.slice(1).map((image, index) => (
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
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              Short Recap
            </p>
            <div className="mt-6 space-y-5 text-base leading-7 text-graphite/78">
              {(event.recap ?? [event.shortDescription]).slice(0, 2).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {event.keyThemes && event.keyThemes.length > 0 ? (
              <ul className="mt-7 grid gap-3 text-sm leading-6 text-graphite/70">
                {event.keyThemes.slice(0, 5).map((theme) => (
                  <li className="flex gap-3" key={theme}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
                    <span>{theme}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              Partners
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {event.partners.map((partner) =>
                partner.url ? (
                  <a
                    key={partner.name}
                    href={partner.url}
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

            <div className="mt-10 rounded-sm border border-ink/10 bg-paper p-6 shadow-quiet">
              <h2 className="text-2xl font-semibold tracking-[-0.02em]">
                Want to host a session with Alex?
              </h2>
              <a
                href={inviteAlexUrl}
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-3 rounded-md border border-electric bg-electric px-5 text-sm font-medium text-bone transition duration-300 hover:bg-blue-700"
              >
                <span>Invite Alex</span>
                <span aria-hidden="true">→</span>
              </a>
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
      <dt className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-graphite/48">
        {label}
      </dt>
      <dd className="mt-2 leading-6 text-graphite/84">{value}</dd>
    </div>
  );
}

function ExternalButton({
  href,
  label,
  primary = false,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center justify-center gap-3 rounded-md border px-5 text-sm font-medium transition duration-300 ${
        primary
          ? "border-electric bg-electric text-bone hover:bg-blue-700"
          : "border-ink/15 text-ink hover:border-electric hover:bg-electric/5"
      }`}
    >
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </a>
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
        className="object-cover object-[50%_24%]"
      />
    </div>
  );
}
