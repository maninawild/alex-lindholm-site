import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const articleDirs = ["articles/en", "articles/ru"];
const localMediaPattern = /\/media\/articles\/[^"')\s]+?\.(?:webp|png|jpe?g|svg)/gi;

function isValidRaster(filePath, buffer) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".webp") {
    return buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP";
  }

  if (ext === ".png") {
    return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }

  if (ext === ".jpg" || ext === ".jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[buffer.length - 2] === 0xff && buffer[buffer.length - 1] === 0xd9;
  }

  return true;
}

function isValidSvg(buffer) {
  const text = buffer.subarray(0, 512).toString("utf8").trimStart();
  return text.startsWith("<svg") || text.startsWith("<?xml");
}

async function getMarkdownFiles(dir) {
  const entries = await readdir(path.join(root, dir), { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join(dir, entry.name));
}

const failures = [];
const checked = new Set();

for (const dir of articleDirs) {
  let files = [];

  try {
    files = await getMarkdownFiles(dir);
  } catch {
    continue;
  }

  for (const file of files) {
    const markdown = await readFile(path.join(root, file), "utf8");
    const refs = [...new Set(markdown.match(localMediaPattern) || [])];

    for (const ref of refs) {
      const publicPath = path.join(root, "public", ref.replace(/^\/+/, ""));
      const key = `${file}:${ref}`;

      try {
        const info = await stat(publicPath);
        if (!info.isFile()) {
          failures.push(`${key} is not a file`);
          continue;
        }

        if (checked.has(ref)) {
          continue;
        }

        const buffer = await readFile(publicPath);
        checked.add(ref);

        if (path.extname(publicPath).toLowerCase() === ".svg") {
          if (!isValidSvg(buffer)) {
            failures.push(`${ref} is not a valid SVG`);
          }
        } else if (!isValidRaster(publicPath, buffer)) {
          failures.push(`${ref} is not a valid ${path.extname(publicPath).slice(1).toUpperCase()} image`);
        }
      } catch (error) {
        failures.push(`${key} cannot be read: ${error.message}`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Article image validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Article image validation passed: ${checked.size} local article image(s) checked.`);
