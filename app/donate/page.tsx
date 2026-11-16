import type { Metadata } from "next";
import { DonatePageContent } from "@/components/donate-page-content";

export const metadata: Metadata = {
  title: "Giving & initiatives",
  description: "The values behind Alex Lindholm’s giving and the initiatives he supports.",
  alternates: { canonical: "/donate", languages: { en: "/donate", ru: "/ru/donate" } },
};

export default function DonatePage() { return <DonatePageContent language="en" />; }
