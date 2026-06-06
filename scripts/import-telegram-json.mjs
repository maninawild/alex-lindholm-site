import fs from "node:fs";
import path from "node:path";

const [, , inputFile, channel = "@cynicschool"] = process.argv;

if (!inputFile) {
  console.error("Usage: node scripts/import-telegram-json.mjs /path/to/result.json [@channel]");
  process.exit(1);
}

const projectRoot = process.cwd();
const outputDir = path.join(projectRoot, "articles", "ru");
const raw = JSON.parse(fs.readFileSync(inputFile, "utf8"));
const messages = Array.isArray(raw.messages) ? raw.messages : [];
const usedSlugs = new Set();

fs.mkdirSync(outputDir, { recursive: true });

let imported = 0;

for (const message of messages) {
  if (message.type && message.type !== "message") continue;
  if (!message.date) continue;

  const body = telegramTextToMarkdown(message.text_entities || message.text || []);
  if (!body || body.length < 120) continue;

  const date = new Date(message.date).toISOString();
  const title = extractTitle(body);
  const slug = uniqueSlug(slugify(`${date.slice(0, 10)}-${title}`));
  const tags = deriveRussianTags(body);
  const category = tags[0] || "Society";
  const metaDescription = descriptionFromBody(body);
  const sourceUrl = message.id ? `https://t.me/${channel.replace(/^@/, "")}/${message.id}` : `https://t.me/${channel.replace(/^@/, "")}`;

  const markdown = `---\ntitle: ${yamlString(title)}\nslug: ${yamlString(slug)}\ndate: ${yamlString(date)}\ntags:\n${tags.map((tag) => `  - ${yamlString(tag)}`).join("\n")}\ncategory: ${yamlString(category)}\nlanguage: "ru"\nmetaDescription: ${yamlString(metaDescription)}\nopenGraphTitle: ${yamlString(title)}\nopenGraphDescription: ${yamlString(metaDescription)}\nrelatedArticles: []\nsourceUrl: ${yamlString(sourceUrl)}\n---\n\n${body}\n`;

  fs.writeFileSync(path.join(outputDir, `${slug}.md`), markdown, "utf8");
  imported += 1;
}

console.log(`Imported ${imported} Russian Telegram posts to ${path.relative(projectRoot, outputDir)}`);

function telegramTextToMarkdown(text) {
  if (typeof text === "string") return text.trim();
  if (!Array.isArray(text)) return "";

  return text
    .map((entity) => {
      const value = entity.text || "";
      if (entity.type === "bold") return `**${value}**`;
      if (entity.type === "italic") return `*${value}*`;
      if (entity.type === "code") return `\`${value}\``;
      if (entity.type === "pre") return `\n\`\`\`\n${value}\n\`\`\`\n`;
      if (entity.type === "text_link" && entity.href) return `[${value}](${entity.href})`;
      if (entity.type === "link") return value;
      return value;
    })
    .join("")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

function extractTitle(body) {
  const firstLine = body
    .split(/\n/)
    .map((line) => line.replace(/^[#>*\-\s]+/, "").trim())
    .find((line) => line && !/^https?:\/\//.test(line));

  if (!firstLine) return "Telegram post";
  return firstLine.length > 82 ? `${firstLine.slice(0, 79).trim()}...` : firstLine;
}

function deriveRussianTags(body) {
  const tags = new Set();
  const checks = [
    ["Human-Centered AI", /ИИ|искусственн|нейросет|AI|алгоритм/i],
    ["Ethical Technology", /этик|ценност|довер|ответствен/i],
    ["Startup Ecosystems", /стартап|экосистем|акселератор|фаундер/i],
    ["Fundraising", /инвест|венчур|фандрайз|раунд|капитал/i],
    ["Founder Psychology", /фаундер|основател|психолог|выгоран|мотивац/i],
    ["Digital Humanism", /гуманизм|человек|человеч/i],
    ["Future of Work", /работ|карьер|професс|будущее/i],
    ["Communities", /сообществ|комьюнити|community/i],
    ["Jewish Culture", /еврей|иудаизм|Израил|евреев/i],
    ["Travel", /путешеств|город|стран|дорог/i],
    ["Society", /общество|социум|культур|полит/i],
    ["Innovation", /инновац|технолог|продукт/i],
  ];

  for (const [tag, pattern] of checks) {
    if (pattern.test(body)) tags.add(tag);
  }

  return [...tags].slice(0, 5);
}

function descriptionFromBody(body) {
  const text = body
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > 158 ? `${text.slice(0, 155).trim()}...` : text;
}

function slugify(value) {
  const translit = value
    .toLowerCase()
    .replace(/а/g, "a")
    .replace(/б/g, "b")
    .replace(/в/g, "v")
    .replace(/г/g, "g")
    .replace(/д/g, "d")
    .replace(/е|ё/g, "e")
    .replace(/ж/g, "zh")
    .replace(/з/g, "z")
    .replace(/и|й/g, "i")
    .replace(/к/g, "k")
    .replace(/л/g, "l")
    .replace(/м/g, "m")
    .replace(/н/g, "n")
    .replace(/о/g, "o")
    .replace(/п/g, "p")
    .replace(/р/g, "r")
    .replace(/с/g, "s")
    .replace(/т/g, "t")
    .replace(/у/g, "u")
    .replace(/ф/g, "f")
    .replace(/х/g, "h")
    .replace(/ц/g, "ts")
    .replace(/ч/g, "ch")
    .replace(/ш/g, "sh")
    .replace(/щ/g, "sch")
    .replace(/ы/g, "y")
    .replace(/э/g, "e")
    .replace(/ю/g, "yu")
    .replace(/я/g, "ya")
    .replace(/[ъь]/g, "");

  return translit
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 86);
}

function uniqueSlug(slug) {
  let candidate = slug || "telegram-post";
  let suffix = 2;

  while (usedSlugs.has(candidate)) {
    candidate = `${slug}-${suffix}`;
    suffix += 1;
  }

  usedSlugs.add(candidate);
  return candidate;
}

function yamlString(value) {
  return JSON.stringify(value);
}
