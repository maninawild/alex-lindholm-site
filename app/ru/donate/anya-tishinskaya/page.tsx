import type { Metadata } from "next";
import { AnyaGrantPage } from "@/components/anya-grant-page";

export const metadata: Metadata = {
  title: "Грант Ани Тишинской",
  description: "История и письмо Ани Тишинской, созданный друзьями мемориальный микрогрант и открытые отчёты.",
  alternates: { canonical: "/ru/donate/anya-tishinskaya", languages: { en: "/donate/anya-tishinskaya", ru: "/ru/donate/anya-tishinskaya" } },
};

export default function Page() { return <AnyaGrantPage language="ru" />; }
