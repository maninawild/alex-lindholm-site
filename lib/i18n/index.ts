import { ruCopy } from './ru';
export type Locale = 'en' | 'ru';
export const publicLocaleRoutes = ['/', '/product-venture-leader', '/lectures-and-speaking', '/speaking', '/human-centered-ai', '/startup-mentor', '/consulting', '/articles', '/media', '/trips', '/donate', '/donate/anya-tishinskaya'] as const;
const ruLower = new Map(Object.entries(ruCopy).map(([key,value]) => [key.toLowerCase(),value]));
export function translator(locale: Locale) {
  return (text: string) => {
    if (locale === 'en') return text;
    const key=text.replace(/\s+/g,' ').trim();
    const translated=ruCopy[key] ?? ruLower.get(key.toLowerCase());
    if (!translated) return text;
    return `${text.match(/^\s*/)?.[0] ?? ''}${translated.trim()}${text.match(/\s*$/)?.[0] ?? ''}`;
  };
}
export function localizedHref(href: string, locale: Locale) {
  if (locale !== 'ru' || !href.startsWith('/') || href.startsWith('//') || href.startsWith('/ru/')) return href;
  const [path, fragment] = href.split('#');
  if(path === "/private") return `/private?lang=ru${fragment ? `#${fragment}` : ""}`;
  if (!(publicLocaleRoutes as readonly string[]).includes(path || '/')) return href;
  return `${!path || path === '/' ? '/ru' : `/ru${path}`}${fragment ? `#${fragment}` : ''}`;
}
export function localeAlternates(path: string) {
  return { canonical: path, languages: { en: path.startsWith('/ru') ? path.slice(3) || '/' : path, ru: path.startsWith('/ru') ? path : localizedHref(path, 'ru'), 'x-default': path.startsWith('/ru') ? path.slice(3) || '/' : path } };
}
