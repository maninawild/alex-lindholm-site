import fs from "node:fs";
import path from "node:path";

const articlesRoot = path.join(process.cwd(), "articles");
const articleFiles = ["en", "ru"].flatMap((language) => {
  const directory = path.join(articlesRoot, language);

  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((fileName) => /\.(md|mdx)$/i.test(fileName))
    .map((fileName) => path.join(directory, fileName));
});

const articles = articleFiles
  .map(readArticleMetadata)
  .filter((article) => article.status !== "draft");

const duplicateTitles = findDuplicates(articles, "title");
const duplicateDescriptions = findDuplicates(articles, "description");

console.log(`Audited ${articles.length} published article metadata records.`);
printDuplicates("Duplicate titles", duplicateTitles);
printDuplicates("Duplicate descriptions", duplicateDescriptions);
console.log("Metadata audit is informational and does not modify content or fail the build.");

function readArticleMetadata(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { frontmatter, body } = parseFrontmatter(raw);
  const description =
    frontmatter.metaDescription ||
    frontmatter.excerpt ||
    createDescription(body);

  return {
    filePath: path.relative(process.cwd(), filePath),
    title: frontmatter.title?.trim() || "",
    description,
    status: frontmatter.status || "published",
  };
}

function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) return { frontmatter: {}, body: raw };

  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { frontmatter: {}, body: raw };

  const frontmatter = {};
  const frontmatterText = raw.slice(3, end).trim();

  for (const line of frontmatterText.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;

    const [, key, value] = match;
    frontmatter[key] = value.trim().replace(/^["']|["']$/g, "");
  }

  return {
    frontmatter,
    body: raw.slice(end + 4).trim(),
  };
}

function createDescription(body) {
  const plainText = body
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return plainText.length > 158
    ? `${plainText.slice(0, 155).trim()}...`
    : plainText;
}

function findDuplicates(records, field) {
  const groups = new Map();

  for (const record of records) {
    const value = record[field];
    if (!value) continue;
    const group = groups.get(value) || [];
    group.push(record.filePath);
    groups.set(value, group);
  }

  return [...groups.entries()]
    .filter(([, files]) => files.length > 1)
    .sort(([left], [right]) => left.localeCompare(right));
}

function printDuplicates(label, duplicates) {
  console.log(`\n${label}: ${duplicates.length}`);

  for (const [value, files] of duplicates) {
    console.log(`- ${JSON.stringify(value)}`);
    for (const file of files) console.log(`  - ${file}`);
  }
}
