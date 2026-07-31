import fs from "node:fs";
import path from "node:path";

const articlesRoot = path.join(process.cwd(), "articles");
const files = ["en", "ru"].flatMap((language) => {
  const directory = path.join(articlesRoot, language);
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((fileName) => /\.(md|mdx)$/i.test(fileName))
    .map((fileName) => path.join(directory, fileName));
});

const records = files.map((filePath) => {
  const source = fs.readFileSync(filePath, "utf8");
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || "";
  return {
    filePath,
    slug: field(frontmatter, "slug"),
    title: field(frontmatter, "title"),
    category: field(frontmatter, "category"),
    language: field(frontmatter, "language"),
    lastReviewed: field(frontmatter, "lastReviewed"),
    updateHistory: list(frontmatter, "updateHistory"),
    relatedArticles: list(frontmatter, "relatedArticles"),
  };
});

const publishedSlugs = new Set(records.map((record) => record.slug).filter(Boolean));
const issues = [];
const seenSlugs = new Map();

for (const record of records) {
  const relativePath = path.relative(process.cwd(), record.filePath);
  for (const requiredField of ["slug", "title", "category", "language"]) {
    if (!record[requiredField]) {
      issues.push(`${relativePath}: missing ${requiredField}`);
    }
  }

  if (record.slug) {
    if (seenSlugs.has(record.slug)) {
      issues.push(
        `${relativePath}: duplicate slug "${record.slug}" also used by ${seenSlugs.get(record.slug)}`,
      );
    } else {
      seenSlugs.set(record.slug, relativePath);
    }
  }

  for (const relatedSlug of record.relatedArticles) {
    if (!publishedSlugs.has(relatedSlug)) {
      issues.push(`${relativePath}: related article "${relatedSlug}" does not exist`);
    }
  }

  if (
    record.lastReviewed &&
    Number.isNaN(Date.parse(record.lastReviewed))
  ) {
    issues.push(`${relativePath}: invalid lastReviewed date "${record.lastReviewed}"`);
  }

  for (const update of record.updateHistory) {
    const [date] = update.split("|");
    if (!date?.trim() || Number.isNaN(Date.parse(date.trim()))) {
      issues.push(`${relativePath}: updateHistory entry needs a valid date: "${update}"`);
    }
  }
}

const categories = new Set(records.map((record) => record.category).filter(Boolean));
console.log(
  `Insights architecture audit: ${records.length} articles, ${categories.size} active categories, ${publishedSlugs.size} unique slugs.`,
);

if (issues.length > 0) {
  console.error(`Found ${issues.length} content architecture issue(s):`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log("All article relationships and required taxonomy fields are valid.");
}

function field(frontmatter, name) {
  const match = frontmatter.match(
    new RegExp(`^${name}:\\s*(.+)$`, "m"),
  );
  return match ? unquote(match[1].trim()) : "";
}

function list(frontmatter, name) {
  const inline = frontmatter.match(
    new RegExp(`^${name}:\\s*\\[([^\\]]*)\\]`, "m"),
  );
  if (inline) {
    return inline[1]
      .split(",")
      .map((value) => unquote(value.trim()))
      .filter(Boolean);
  }

  const block = frontmatter.match(
    new RegExp(`^${name}:\\s*\\n((?:\\s+-\\s+.*(?:\\n|$))*)`, "m"),
  );
  return block
    ? [...block[1].matchAll(/^\s+-\s+(.+)$/gm)].map((match) =>
        unquote(match[1].trim()),
      )
    : [];
}

function unquote(value) {
  return value.replace(/^["']|["']$/g, "");
}
