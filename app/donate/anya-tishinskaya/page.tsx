import type { Metadata } from "next";
import { AnyaGrantPage } from "@/components/anya-grant-page";

export const metadata: Metadata = {
  title: "Anya Tishinskaya Grant",
  description: "Anya Tishinskaya’s story, letter, the memorial microgrant created by her friends, and its public reports.",
  alternates: { canonical: "/donate/anya-tishinskaya", languages: { en: "/donate/anya-tishinskaya", ru: "/ru/donate/anya-tishinskaya" } },
};

export default function Page() { return <AnyaGrantPage language="en" />; }
