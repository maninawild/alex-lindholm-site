import type { Metadata } from "next";
import { ArticlesContent } from "@/components/articles-content";
import { localeAlternates } from "@/lib/i18n";
export const metadata:Metadata={title:"Статьи",description:"Эссе и заметки Алекса Линдхольма о стартапах, технологиях, культуре и обществе.",alternates:localeAlternates("/ru/articles"),openGraph:{title:"Статьи | Алекс Линдхольм",description:"Библиотека текстов на русском и английском с сохранением оригиналов.",url:"/ru/articles",locale:"ru_RU"},twitter:{title:"Статьи | Алекс Линдхольм",description:"Эссе и заметки о стартапах, технологиях, культуре и обществе."}};
export default function Page(){return <ArticlesContent locale="ru"/>;}
