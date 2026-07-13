#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const sourceUrl = process.argv[2];

if (!sourceUrl) {
  console.error('Usage: npm run import:url -- "https://example.com/post"');
  process.exit(1);
}

let url;
try {
  url = new URL(sourceUrl);
} catch {
  console.error("Invalid URL.");
  process.exit(1);
}

const response = await fetch(url, {
  headers: {
    "user-agent":
      "Mozilla/5.0 (compatible; AlexLindholmArticleImporter/1.0; +https://www.axlindholm.nl)",
    accept: "text/html,application/xhtml+xml",
  },
  redirect: "follow",
});

if (!response.ok) {
  console.error(`Could not fetch URL: ${response.status} ${response.statusText}`);
  process.exit(1);
}

const html = await response.text();
const decoded = decodeEntities(html);
const title = cleanText(
  meta(decoded, "property", "og:title") ||
    meta(decoded, "name", "twitter:title") ||
    match(decoded, /<title[^>]*>([\s\S]*?)<\/title>/i) ||
    "Imported article",
);
const description = cleanText(
  meta(decoded, "property", "og:description") ||
    meta(decoded, "name", "description") ||
    meta(decoded, "name", "twitter:description") ||
    "",
);
const featuredImage =
  meta(decoded, "property", "og:image") || meta(decoded, "name", "twitter:image") || "";
const publishedDate =
  meta(decoded, "property", "article:published_time") ||
  jsonLdValue(decoded, "datePublished") ||
  new Date().toISOString();
const language = detectLanguage(`${title} ${description} ${decoded}`);
const source = sourceName(url.hostname);
const slug = slugify(title) || `article-${Date.now()}`;
const body = extractBody(decoded, description);
const directory = path.join(process.cwd(), "articles", language);
const filePath = uniquePath(directory, slug);

fs.mkdirSync(directory, { recursive: true });

const frontmatter = [
  "---",
  `title: ${yamlString(title)}`,
  `slug: ${path.basename(filePath, path.extname(filePath))}`,
  `date: ${new Date(publishedDate).toISOString()}`,
  `language: ${language}`,
  `source: ${yamlString(source)}`,
  `sourceUrl: ${yamlString(sourceUrl)}`,
  `contentSource: original_en`,
  `status: draft`,
  description ? `excerpt: ${yamlString(description.slice(0, 300))}` : null,
  description ? `metaDescription: ${yamlString(description.slice(0, 158))}` : null,
  featuredImage ? `featuredImage: ${yamlString(featuredImage)}` : null,
  "tags:",
  "  - Imported",
  "---",
]
  .filter(Boolean)
  .join("\n");

fs.writeFileSync(filePath, `${frontmatter}\n\n${body}\n`, "utf8");

console.log(`Created draft: ${path.relative(process.cwd(), filePath)}`);
console.log("Review title, body, image, tags and category, then change status to published.");
if (url.hostname.includes("linkedin.com")) {
  console.log(
    "LinkedIn may expose only preview metadata. If the body is incomplete, paste the post text into the generated draft before publishing.",
  );
}

function meta(htmlText, attribute, value) {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta[^>]+${attribute}=["']${escaped}["'][^>]+content=["']([^"']*)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${attribute}=["']${escaped}["'][^>]*>`, "i"),
  ];
  return patterns.map((pattern) => match(htmlText, pattern)).find(Boolean) || "";
}

function jsonLdValue(htmlText, key) {
  const scripts = [...htmlText.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const script of scripts) {
    try {
      const data = JSON.parse(script[1]);
      const values = Array.isArray(data) ? data : [data];
      for (const item of values) {
        if (item?.[key]) return item[key];
      }
    } catch {
      // Ignore invalid JSON-LD blocks.
    }
  }
  return "";
}

function extractBody(htmlText, fallback) {
  const article =
    match(htmlText, /<article[^>]*>([\s\S]*?)<\/article>/i) ||
    match(htmlText, /<main[^>]*>([\s\S]*?)<\/main>/i) ||
    "";
  const paragraphs = [...article.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((item) => cleanText(item[1]))
    .filter((item) => item.length > 35)
    .filter((item, index, items) => items.indexOf(item) === index)
    .slice(0, 80);

  if (paragraphs.length) return paragraphs.join("\n\n");
  if (fallback) return `${fallback}\n\n[Review and replace this preview text with the complete post before publishing.]`;
  return "[Paste the complete post text here before publishing.]";
}

function sourceName(hostname) {
  if (hostname.includes("linkedin.com")) return "LinkedIn";
  return hostname.replace(/^www\./, "");
}

function detectLanguage(text) {
  const cyrillic = (text.match(/[А-Яа-яЁё]/g) || []).length;
  const latin = (text.match(/[A-Za-z]/g) || []).length;
  return cyrillic > latin * 0.25 ? "ru" : "en";
}

function uniquePath(directory, baseSlug) {
  let candidate = path.join(directory, `${baseSlug}.md`);
  let suffix = 2;
  while (fs.existsSync(candidate)) {
    candidate = path.join(directory, `${baseSlug}-${suffix}.md`);
    suffix += 1;
  }
  return candidate;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function yamlString(value) {
  return JSON.stringify(String(value).replace(/\s+/g, " ").trim());
}

function cleanText(value) {
  return decodeEntities(String(value || "").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function match(value, pattern) {
  return value.match(pattern)?.[1]?.trim() || "";
}
