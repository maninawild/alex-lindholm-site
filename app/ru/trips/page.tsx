import type { Metadata } from "next";
import { TripsPage } from "@/components/trips-page";
import { siteUrl } from "@/lib/site";

const description =
  "Культурные, природные и исследовательские поездки небольшими группами с Алексом Линдхольмом.";

export const metadata: Metadata = {
  title: "Поездки с еврейским акцентом",
  description,
  alternates: {
    canonical: `${siteUrl}/ru/trips`,
    languages: { en: `${siteUrl}/trips`, ru: `${siteUrl}/ru/trips` },
  },
  openGraph: { title: "Поездки с еврейским акцентом", description, url: "/ru/trips", type: "website" },
};

export default function RussianTrips() {
  return <TripsPage locale="ru" />;
}
