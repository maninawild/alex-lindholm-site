import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { localeAlternates } from "@/lib/i18n";
export const metadata: Metadata = { title: {absolute:"Алекс Линдхольм — венчурный архитектор и советник основателей"}, description:"Развитие продуктов и бизнесов, менторство основателей, управление акселератором, инвестиционный анализ и международные партнёрства.", alternates:localeAlternates("/ru"), openGraph:{title:"Алекс Линдхольм",description:"Развитие продуктов и бизнесов, работа с основателями и международными партнёрами.",url:"/ru",locale:"ru_RU"},twitter:{title:"Алекс Линдхольм",description:"Развитие продуктов, бизнесов и международных партнёрств."} };
export default function Page(){return <HomePage locale="ru" />;}
