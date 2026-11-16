import type { Metadata } from "next";
import { DonatePageContent } from "@/components/donate-page-content";

export const metadata: Metadata = {
  title: "Благотворительность и инициативы",
  description: "Ценности Алекса Линдхольма, поддерживаемые инициативы и способы помочь.",
  alternates: { canonical: "/ru/donate", languages: { en: "/donate", ru: "/ru/donate" } },
};

export default function DonateRuPage() { return <DonatePageContent language="ru" />; }
