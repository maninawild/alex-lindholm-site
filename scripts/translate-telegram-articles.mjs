import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const ruDir = path.join(projectRoot, "articles", "ru");
const enDir = path.join(projectRoot, "articles", "en");
const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.TRANSLATION_MODEL || "gpt-4.1-mini";

if (!apiKey) {
  console.error("Missing OPENAI_API_KEY. Refusing to create fake Telegram translations.");
  process.exit(2);
}

fs.mkdirSync(enDir, { recursive: true });

const existingEnglish = new Set(
  fs
    .readdirSync(enDir)
    .filter((fileName) => /\.mdx?$/i.test(fileName))
    .map((fileName) => {
      const article = readMarkdown(path.join(enDir, fileName));
      return article.frontmatter.originalSlug || article.frontmatter.translationKey || article.frontmatter.slug;
    })
    .filter(Boolean),
);

let created = 0;
let skipped = 0;

for (const fileName of fs.readdirSync(ruDir).sort()) {
  if (!/\.mdx?$/i.test(fileName)) continue;
  const filePath = path.join(ruDir, fileName);
  const article = readMarkdown(filePath);

  if (article.frontmatter.contentSource !== "telegram_ru" || article.frontmatter.language !== "ru") continue;
  if (existingEnglish.has(article.frontmatter.slug)) {
    skipped += 1;
    continue;
  }

  const translated = await translateArticle(article);
  const enSlug = uniqueSlug(`${article.frontmatter.slug}-en`);
  const markdown = buildEnglishMarkdown(article, translated, enSlug);
  fs.writeFileSync(path.join(enDir, `${enSlug}.md`), markdown, "utf8");
  existingEnglish.add(article.frontmatter.slug);
  created += 1;
}

console.log(JSON.stringify({ created, skipped, model }, null, 2));

async function translateArticle(article) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "Translate Russian Telegram essays into natural English. Preserve links, markdown formatting, paragraph structure, irony, tone, and author voice. Do not summarize. Do not add facts. Return strict JSON.",
        },
        {
          role: "user",
          content: JSON.stringify({
            title: article.frontmatter.title,
            excerpt: article.frontmatter.excerpt || article.frontmatter.metaDescription,
            body: article.body,
            requiredJsonShape: {
              title: "translated title",
              excerpt: "translated SEO excerpt under 158 characters if possible",
              body: "full translated markdown body",
            },
          }),
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Translation request failed: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content;
  if (!content) throw new Error("Translation response did not include content.");
  const parsed = JSON.parse(content);
  if (!parsed.title || !parsed.body) throw new Error("Translation JSON missing title or body.");
  return parsed;
}

function buildEnglishMarkdown(original, translated, slug) {
  const fm = original.frontmatter;
  const description = translated.excerpt || createDescription(translated.body);
  const featuredImageLine = fm.featuredImage ? `featuredImage: ${yamlString(fm.featuredImage)}\n` : "";
  const telegramMessageIdLine = fm.telegramMessageId ? `telegramMessageId: ${yamlString(fm.telegramMessageId)}\n` : "";

  return `---\ntitle: ${yamlString(translated.title)}\nslug: ${yamlString(slug)}\ndate: ${yamlString(fm.date || fm.originalDate)}\noriginalDate: ${yamlString(fm.originalDate || fm.date)}\ntags:\n${(fm.tags || []).map((tag) => `  - ${yamlString(tag)}`).join("\n")}\ncategory: ${yamlString(fm.category || "Society")}\nlanguage: "en"\ncontentSource: "telegram_ru"\ntranslatedFrom: "ru"\noriginalSlug: ${yamlString(fm.slug)}\ntranslationKey: ${yamlString(fm.translationKey || fm.slug)}\n${telegramMessageIdLine}source: "Telegram @cynicschool"\nsourceUrl: ${yamlString(fm.sourceUrl)}\n${featuredImageLine}excerpt: ${yamlString(description)}\nmetaDescription: ${yamlString(description)}\nopenGraphTitle: ${yamlString(translated.title)}\nopenGraphDescription: ${yamlString(description)}\nrelatedArticles: []\nstatus: "published"\n---\n\n${translated.body.trim()}\n`;
}

function readMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const end = raw.indexOf("\n---", 3);
  const frontmatterText = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();
  return {
    frontmatter: parseFrontmatter(frontmatterText),
    body,
  };
}

function parseFrontmatter(text) {
  const frontmatter = {};
  const lines = text.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, value] = match;

    if (!value && lines[index + 1]?.trim().startsWith("- ")) {
      const list = [];
      while (lines[index + 1]?.trim().startsWith("- ")) {
        index += 1;
        list.push(unquote(lines[index].trim().replace(/^- /, "")));
      }
      frontmatter[key] = list;
    } else {
      frontmatter[key] = unquote(value.trim());
    }
  }

  return frontmatter;
}

function uniqueSlug(slug) {
  let candidate = slug;
  let index = 2;
  while (fs.existsSync(path.join(enDir, `${candidate}.md`))) {
    candidate = `${slug}-${index}`;
    index += 1;
  }
  return candidate;
}

function createDescription(body) {
  const plainText = body
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return plainText.length > 158 ? `${plainText.slice(0, 155).trim()}...` : plainText;
}

function unquote(value) {
  return value.replace(/^["']|["']$/g, "");
}

function yamlString(value) {
  return JSON.stringify(value || "");
}
