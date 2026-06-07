import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const outputDir = path.join(projectRoot, "articles", "en");

const sources = [
  {
    file: "/private/tmp/alex_doc_may_2026.txt",
    sourceUrl:
      "https://docs.google.com/document/d/15bah8HCEKXEnATr9w_hWrCwSfC5eK2pItrCnUSZXLfg/edit?usp=sharing",
  },
  {
    file: "/private/tmp/alex_doc_q1_q2_2026.txt",
    sourceUrl:
      "https://docs.google.com/document/d/1U3NPtGkMS2MRiuN3qBY95BdCBuVxc7t_v-3N2W_0Mds/edit?tab=t.xe4dgo9p4egz",
  },
];

const tagMap = [
  ["Human-Centered AI", /\bAI\b|artificial intelligence|Claude|Anthropic|NVIDIA|LLM|agents?/i],
  ["Ethical Technology", /ethics?|human[- ]centric|human[- ]centered|trust|governance/i],
  ["Startup Ecosystems", /ecosystem|accelerator|The Hague|YC|Techstars|Antler/i],
  ["Innovation", /innovation|technology|tech\b|product/i],
  ["Fundraising", /fundraising|raising capital|investors?|VC\b|venture capital|capital/i],
  ["Founder Psychology", /founder|burnout|ADHD|cofounder|psychology/i],
  ["Future of Work", /future of work|jobs?|hiring|consulting|workflows?/i],
  ["Venture Building", /venture|startup|building|build/i],
  ["Entrepreneurship", /entrepreneur|business|startup/i],
  ["Digital Humanism", /human[- ]first|human life|people/i],
  ["Matching Systems", /matching|deal room|pipeline/i],
];

const categoryPriority = [
  "Human-Centered AI",
  "Startup Ecosystems",
  "Fundraising",
  "Founder Psychology",
  "Future of Work",
  "Ethical Technology",
  "Innovation",
  "Venture Building",
  "Entrepreneurship",
];

fs.mkdirSync(outputDir, { recursive: true });
clearPriorImports();

let imported = 0;
const usedSlugs = new Set();

for (const source of sources) {
  if (!fs.existsSync(source.file)) {
    console.warn(`Missing source export: ${source.file}`);
    continue;
  }

  const text = fs.readFileSync(source.file, "utf8").replace(/^\uFEFF/, "");
  const entries = splitEntries(text);

  for (const entry of entries) {
    const article = toArticle(entry, source.sourceUrl);
    if (!article) continue;

    const slug = uniqueSlug(article.slug);
    const filePath = path.join(outputDir, `${slug}.md`);
    const markdown = article.markdown.replace(
      /^slug: ".*"$/m,
      `slug: ${yamlString(slug)}`,
    );
    fs.writeFileSync(filePath, markdown, "utf8");
    imported += 1;
  }
}

console.log(`Imported ${imported} English articles to ${path.relative(projectRoot, outputDir)}`);

function splitEntries(text) {
  const lines = text.split(/\r?\n/);
  const starts = [];
  const boundary =
    /^\*?\s*(?<date>(?:\d{1,2}\.\d{1,2}\.\d{4})|(?:[A-Z][a-z]+ \d{1,2}, 2026))(?:\s*-\s*(?<title>.+))?$/;

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].trim().match(boundary);
    if (match) {
      starts.push({
        index,
        dateLabel: match.groups.date,
        titleLabel: match.groups.title?.trim(),
      });
    }
  }

  return starts.map((start, position) => {
    const end = starts[position + 1]?.index ?? lines.length;
    return {
      dateLabel: start.dateLabel,
      titleLabel: start.titleLabel,
      body: lines.slice(start.index + 1, end).join("\n").trim(),
    };
  });
}

function clearPriorImports() {
  const sourceUrls = new Set(sources.map((source) => source.sourceUrl));

  for (const fileName of fs.readdirSync(outputDir)) {
    if (!fileName.endsWith(".md")) continue;
    const filePath = path.join(outputDir, fileName);
    const text = fs.readFileSync(filePath, "utf8");
    const match = text.match(/^sourceUrl:\s*"([^"]+)"/m);
    if (match && sourceUrls.has(match[1])) {
      fs.unlinkSync(filePath);
    }
  }
}

function toArticle(entry, sourceUrl) {
  const body = normalizeBody(entry.body);
  if (!body || body.length < 180) return undefined;

  const firstLine = body.split(/\n/).map((line) => line.trim()).find(Boolean);
  const title = cleanTitle(entry.titleLabel || firstLine || "Untitled");
  const date = parseDate(entry.dateLabel);
  const slug = slugify(`${date.slice(0, 10)}-${title}`);
  const tags = deriveTags(`${title}\n${body}`);
  const category = categoryPriority.find((tag) => tags.includes(tag)) || tags[0] || "Innovation";
  const metaDescription = descriptionFromBody(body);

  return {
    slug,
    markdown: `---\ntitle: ${yamlString(title)}\nslug: ${yamlString(slug)}\ndate: ${yamlString(date)}\ntags:\n${tags.map((tag) => `  - ${yamlString(tag)}`).join("\n")}\ncategory: ${yamlString(category)}\nlanguage: "en"\ncontentSource: "original_en"\nsource: "Alex Lindholm"\nmetaDescription: ${yamlString(metaDescription)}\nopenGraphTitle: ${yamlString(title)}\nopenGraphDescription: ${yamlString(metaDescription)}\nrelatedArticles: []\nsourceUrl: ${yamlString(sourceUrl)}\n---\n\n${body}\n`,
  };
}

function normalizeBody(body) {
  return body
    .replace(/\n{4,}/g, "\n\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

function cleanTitle(title) {
  return title
    .replace(/^["“”]+|["“”]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDate(label) {
  if (/^\d{1,2}\.\d{1,2}\.\d{4}$/.test(label)) {
    const [day, month, year] = label.split(".");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T09:00:00.000Z`;
  }

  return `${new Date(`${label} 09:00:00 UTC`).toISOString()}`;
}

function deriveTags(text) {
  const hashtags = [...text.matchAll(/#([A-Za-z][A-Za-z0-9]+)/g)].map((match) => match[1].toLowerCase());
  const tags = new Set();

  for (const [tag, pattern] of tagMap) {
    if (pattern.test(text)) tags.add(tag);
  }

  if (hashtags.some((tag) => tag.includes("founder"))) tags.add("Founder Psychology");
  if (hashtags.some((tag) => tag.includes("fund") || tag === "vc" || tag.includes("invest"))) tags.add("Fundraising");
  if (hashtags.some((tag) => tag.includes("futureofwork"))) tags.add("Future of Work");
  if (hashtags.some((tag) => tag.includes("human"))) tags.add("Digital Humanism");
  if (hashtags.some((tag) => tag.includes("ecosystem"))) tags.add("Startup Ecosystems");

  return [...tags].slice(0, 5);
}

function descriptionFromBody(body) {
  const firstParagraph = body
    .split(/\n{2,}/)
    .map((part) => part.replace(/\n/g, " ").trim())
    .find((part) => part && !/^#/.test(part));

  const text = (firstParagraph || body)
    .replace(/https?:\/\/\S+/g, "")
    .replace(/#[A-Za-z0-9]+/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > 158 ? `${text.slice(0, 155).trim()}...` : text;
}

function yamlString(value) {
  return JSON.stringify(value);
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 86);
}

function uniqueSlug(slug) {
  let candidate = slug;
  let suffix = 2;

  while (usedSlugs.has(candidate)) {
    candidate = `${slug}-${suffix}`;
    suffix += 1;
  }

  usedSlugs.add(candidate);
  return candidate;
}
