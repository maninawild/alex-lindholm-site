export const siteUrl = "https://www.axlindholm.nl";
export const siteName = "Alex Lindholm";

export const author = {
  name: "Alex Lindholm",
  jobTitle: "Product and Venture Mentor",
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
    homeLocation: {
      "@type": "Country",
      name: "Netherlands",
    },
    knowsLanguage: ["English", "Russian", "Hebrew", "Ukrainian", "Dutch"],
    knowsAbout: [
      "Product discovery and validation",
      "Startup incubation and acceleration",
      "Venture building",
      "Investment strategy and portfolio analysis",
      "Business development",
    ],
    worksFor: {
      "@type": "Organization",
      name: "InspireXchange.nl Accelerator",
      url: "https://www.inspirexchange.nl/",
    },
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
