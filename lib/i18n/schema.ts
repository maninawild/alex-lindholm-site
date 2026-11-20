import { translator, localizedHref, type Locale } from './index';
export function localizedSchema(value: unknown, locale: Locale): unknown {
 const t=translator(locale);
 if(Array.isArray(value)) return value.map(v=>localizedSchema(v,locale));
 if(!value || typeof value!=='object') return value;
 const obj=value as Record<string,unknown>;
 if(obj['@type']==='Person') return obj;
 const result=Object.fromEntries(Object.entries(obj).map(([key,v])=>{
 if(typeof v==='string' && ['name','description','serviceType','headline'].includes(key))return [key,t(v)];
 if(typeof v==='string' && ['url','@id'].includes(key) && v.startsWith('https://www.axlindholm.nl/'))return [key,'https://www.axlindholm.nl'+localizedHref(v.slice('https://www.axlindholm.nl'.length),locale)];
 return [key,localizedSchema(v,locale)];
 }));
 return ['WebPage','ProfilePage'].includes(String(obj['@type'])) ? {...result,inLanguage:locale}:result;
}
