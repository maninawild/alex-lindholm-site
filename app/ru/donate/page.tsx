import { localizeMetadata } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import { DonatePageContent } from "@/components/donate-page-content";

const original: Metadata = {
  title: "Благотворительность и инициативы",
  description: "Ценности Алекса Линдхольма, поддерживаемые инициативы и способы помочь.",
  alternates: { canonical: "/ru/donate", languages: { en: "/donate", ru: "/ru/donate" } },
};

export const metadata = localizeMetadata(original, "/donate", "ru");

export default function DonateRuPage() { return <DonatePageContent language="ru" />; }
