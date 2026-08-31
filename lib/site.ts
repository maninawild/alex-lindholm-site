export const siteUrl = "https://www.axlindholm.nl";
export const siteName = "Alex Lindholm";

export const author = {
  name: "Alex Lindholm",
  alternateName: "Alex P. Lindholm",
  jobTitle: "Venture Architect & Human-Centered Technologist",
  url: `${siteUrl}/`,
  linkedIn: "https://www.linkedin.com/in/axlindholm/",
  image: `${siteUrl}/media/alex-portrait.jpg`,
} as const;

export function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#alex-lindholm`,
    name: author.name,
    alternateName: author.alternateName,
    jobTitle: author.jobTitle,
    url: author.url,
    image: author.image,
    sameAs: [author.linkedIn],
  };
}

export function websiteJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: `${siteUrl}/`,
    description,
    inLanguage: ["en", "ru"],
    author: { "@id": `${siteUrl}/#alex-lindholm` },
  };
}
