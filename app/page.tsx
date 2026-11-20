import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { localeAlternates } from "@/lib/i18n";
export const metadata: Metadata = { alternates: localeAlternates("/") };
export default function Page(){return <HomePage locale="en" />;}
