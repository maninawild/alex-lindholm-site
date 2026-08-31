export const siteUrl = "https://www.axlindholm.nl";
export const siteName = "Alex Lindholm";

export const author = {
  name: "Alex Lindholm",
  jobTitle: "Venture Architect and Founder Advisor",
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
