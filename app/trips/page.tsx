import type { Metadata } from "next";
import { TripsPage } from "@/components/trips-page";
import { siteUrl } from "@/lib/site";

const description =
  "Small-group cultural, nature and discovery trips with Alex Lindholm in the Netherlands and beyond.";

export const metadata: Metadata = {
  title: "Trips with Alex",
  description,
  alternates: {
    canonical: `${siteUrl}/trips`,
    languages: { en: `${siteUrl}/trips`, ru: `${siteUrl}/ru/trips` },
  },
  openGraph: { title: "Trips with Alex Lindholm", description, url: "/trips", type: "website" },
};

export default function Trips() {
  return <TripsPage locale="en" />;
}
