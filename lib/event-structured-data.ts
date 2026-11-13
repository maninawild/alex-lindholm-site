import type { EventItem } from "@/data/events";
import { siteUrl } from "@/lib/site";

export function eventStructuredData(event: EventItem) {
  const page = {
    "@context": "https://schema.org",
    name: event.title,
    description: event.seo.description,
    image: `${siteUrl}${event.coverImage}`,
    url: `${siteUrl}/events/${event.slug}`,
  };
  // An undated recap remains a page; never invent a date to qualify for rich results.
  if (!event.date || !Number.isFinite(Date.parse(event.date))) {
    return { ...page, "@type": "WebPage" };
  }
  return {
    ...page,
    "@type": "Event",
    startDate: event.date,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    // EventCompleted is not a supported EventStatusType; past dates express timing.
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: event.location, address: event.location },
    organizer: { "@type": "Organization", name: event.organizer },
    performer: { "@type": "Person", name: "Alex Lindholm", url: siteUrl },
  };
}
