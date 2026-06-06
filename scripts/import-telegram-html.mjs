import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const exportDir = path.join(projectRoot, "imports", "telegram", "cynicschool");
const htmlPath = path.join(exportDir, "messages.html");
const articleDir = path.join(projectRoot, "articles", "ru");
const mediaDir = path.join(projectRoot, "public", "media", "articles", "cynicschool");
const sourceName = "Telegram @cynicschool";
const channel = "cynicschool";
const minCyrillicChars = 700;
const minCyrillicCharsWithMedia = 50;

const stats = {
  imported: 0,
  imagesCopied: 0,
  skipped: {
    serviceOrUi: 0,
    short: 0,
    notRussian: 0,
    noDate: 0,
    missingMedia: 0,
  },
  titles: [],
};

if (!fs.existsSync(htmlPath)) {
  console.error(`Missing Telegram export HTML: ${htmlPath}`);
  process.exit(1);
}

fs.mkdirSync(articleDir, { recursive: true });
fs.mkdirSync(mediaDir, { recursive: true });
clearPreviousImports();

const html = fs.readFileSync(htmlPath, "utf8");
const messages = parseMessages(html);
const groups = groupMessages(messages);
const usedSlugs = new Set();
const copiedMedia = new Set();

for (const group of groups) {
  const article = buildArticle(group, copiedMedia);
  if (!article) continue;

  fs.writeFileSync(path.join(articleDir, `${article.slug}.md`), article.markdown, "utf8");
  stats.imported += 1;
  if (stats.titles.length < 10) {
    stats.titles.push({ title: article.title, date: article.originalDate });
  }
}

console.log(JSON.stringify(stats, null, 2));

function parseMessages(documentHtml) {
  const startPattern = /<div class="message ([^"]*)" id="message(-?\d+)">/g;
  const starts = [];
  let match;

  while ((match = startPattern.exec(documentHtml)) !== null) {
    starts.push({
      start: match.index,
      className: match[1],
      id: match[2],
      opening: match[0],
    });
  }

  return starts
    .map((item, index) => ({
      ...item,
      html: documentHtml.slice(item.start, starts[index + 1]?.start ?? documentHtml.length),
    }))
    .filter((item) => item.className.includes("default"))
    .map((item) => {
      const dateTitle = item.html.match(/<div class="pull_right date details" title="([^"]+)">/);
      const textHtml = item.html.match(/<div class="text">\s*([\s\S]*?)\s*<\/div>/);
      const media = [...item.html.matchAll(/<a class="photo_wrap[^"]*" href="([^"]+)"/g)]
        .map((mediaMatch) => decodeHtml(mediaMatch[1]))
        .filter((href) => !href.includes("_thumb."));

      return {
        id: item.id,
        joined: item.className.includes("joined"),
        date: dateTitle ? parseTelegramDate(decodeHtml(dateTitle[1])) : undefined,
        text: textHtml ? htmlToMarkdown(textHtml[1]) : "",
        media,
      };
    });
}

function groupMessages(messages) {
  const groups = [];
  let current;

  for (const message of messages) {
    if (!message.date) {
      stats.skipped.noDate += 1;
      continue;
    }

    if (!message.joined || !current) {
      if (current) groups.push(current);
      current = {
        id: message.id,
        originalDate: message.date,
        textParts: [],
        media: [],
      };
    }

    if (message.text) current.textParts.push(message.text);
    current.media.push(...message.media);
  }

  if (current) groups.push(current);
  return groups;
}

function buildArticle(group, copiedMedia) {
  const bodyText = group.textParts.filter(Boolean).join("\n\n").trim();
  const cyrillicCount = (bodyText.match(/[А-Яа-яЁё]/g) || []).length;
  const hasMedia = group.media.length > 0;

  if (!bodyText && group.media.length === 0) {
    stats.skipped.serviceOrUi += 1;
    return undefined;
  }

  const requiredCyrillicCount = hasMedia ? minCyrillicCharsWithMedia : minCyrillicChars;

  if (cyrillicCount < requiredCyrillicCount) {
    if (bodyText.length < minCyrillicChars) stats.skipped.short += 1;
    else stats.skipped.notRussian += 1;
    return undefined;
  }

  const title = extractTitle(bodyText);
  const slug = uniqueSlug(slugify(`${group.originalDate.slice(0, 10)}-${title}`));
  const copiedImages = copyMedia(group.media, copiedMedia);
  const tags = deriveTags(bodyText);
  const category = tags[0] || "Society";
  const description = createDescription(bodyText);
  const sourceUrl = `https://t.me/${channel}/${group.id}`;
  const imageMarkdown = copiedImages.map((image, index) => `![${title}${copiedImages.length > 1 ? `, image ${index + 1}` : ""}](${image.publicPath})`).join("\n\n");
  const content = imageMarkdown ? `${bodyText}\n\n${imageMarkdown}` : bodyText;
  const featuredImage = copiedImages[0]?.publicPath;

  return {
    slug,
    title,
    originalDate: group.originalDate,
    markdown: `---\ntitle: ${yamlString(title)}\nslug: ${yamlString(slug)}\ndate: ${yamlString(group.originalDate)}\noriginalDate: ${yamlString(group.originalDate)}\ntags:\n${tags.map((tag) => `  - ${yamlString(tag)}`).join("\n")}\ncategory: ${yamlString(category)}\nlanguage: "ru"\nsource: ${yamlString(sourceName)}\nsourceUrl: ${yamlString(sourceUrl)}\n${featuredImage ? `featuredImage: ${yamlString(featuredImage)}\n` : ""}excerpt: ${yamlString(description)}\nmetaDescription: ${yamlString(description)}\nopenGraphTitle: ${yamlString(title)}\nopenGraphDescription: ${yamlString(description)}\nrelatedArticles: []\nstatus: "published"\n---\n\n${content}\n`,
  };
}

function copyMedia(mediaItems, copiedMedia) {
  const copied = [];

  for (const relativePath of mediaItems) {
    const source = path.join(exportDir, relativePath);
    if (!fs.existsSync(source)) {
      stats.skipped.missingMedia += 1;
      continue;
    }

    const fileName = path.basename(relativePath).replace(/[^A-Za-z0-9@._-]/g, "-");
    const destination = path.join(mediaDir, fileName);
    fs.copyFileSync(source, destination);

    if (!copiedMedia.has(fileName)) {
      copiedMedia.add(fileName);
      stats.imagesCopied += 1;
    }

    copied.push({
      publicPath: `/media/articles/cynicschool/${fileName}`,
    });
  }

  return copied;
}

function clearPreviousImports() {
  for (const fileName of fs.readdirSync(articleDir)) {
    if (!fileName.endsWith(".md")) continue;
    const filePath = path.join(articleDir, fileName);
    const text = fs.readFileSync(filePath, "utf8");
    if (/^source:\s*"Telegram @cynicschool"$/m.test(text)) {
      fs.unlinkSync(filePath);
    }
  }

  if (fs.existsSync(mediaDir)) {
    for (const fileName of fs.readdirSync(mediaDir)) {
      fs.unlinkSync(path.join(mediaDir, fileName));
    }
  }
}

function htmlToMarkdown(value) {
  return decodeHtml(
    value
      .replace(/<a\b([^>]*)href="([^"]*)"([^>]*)>([\s\S]*?)<\/a>/gi, (_full, _before, href, _after, label) => {
        const text = stripTags(label).trim();
        const cleanHref = decodeHtml(href);
        if (!cleanHref || cleanHref.startsWith("#")) return text;
        return `[${text}](${cleanHref})`;
      })
      .replace(/<strong>([\s\S]*?)<\/strong>/gi, (_full, inner) => `**${stripTags(inner).trim()}**${/<br/i.test(inner) ? "\n\n" : ""}`)
      .replace(/<em>([\s\S]*?)<\/em>/gi, (_full, inner) => `*${stripTags(inner).trim()}*${/<br/i.test(inner) ? "\n\n" : ""}`)
      .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, "\n\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>\s*<p>/gi, "\n\n")
      .replace(/<[^>]+>/g, "")
  )
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

function stripTags(value) {
  return value.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "");
}

function decodeHtml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function parseTelegramDate(value) {
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}:\d{2}:\d{2}) UTC([+-]\d{2}):?(\d{2})$/);
  if (!match) return undefined;
  const [, day, month, year, time, offsetHour, offsetMinute] = match;
  return new Date(`${year}-${month}-${day}T${time}${offsetHour}:${offsetMinute}`).toISOString();
}

function extractTitle(body) {
  const firstLine =
    body
      .split(/\n/)
      .map((line) =>
        line
          .replace(/\[([^\]]+)]\(([^)]+)\)/g, "$1")
          .replace(/^[#>*_\s]+|[#>*_\s]+$/g, "")
          .trim()
      )
      .find((line) => line && !line.startsWith("http")) || "Публикация Telegram";

  return firstLine.length > 88 ? `${firstLine.slice(0, 85).trim()}...` : firstLine;
}

function deriveTags(body) {
  const tags = new Set();
  const checks = [
    ["Human-Centered AI", /ИИ|искусственн|нейросет|AI|алгоритм|диджитал/i],
    ["Ethical Technology", /этик|ценност|довер|ответствен|слежк|свобод/i],
    ["Startup Ecosystems", /стартап|экосистем|акселератор|фаундер|предприним/i],
    ["Fundraising", /инвест|венчур|фандрайз|капитал/i],
    ["Founder Psychology", /фаундер|основател|психолог|страх|тревог|выгоран/i],
    ["Digital Humanism", /гуманн|человек|человеч|общество/i],
    ["Future of Work", /работ|професс|офис|удален|экономик/i],
    ["Media & Algorithms", /медиа|алгоритм|соцсет|телеграм|интернет|facebook|instagram|новост/i],
    ["Cities & Communities", /город|сообществ|коммун|урбан|страна|израил|беларус|родствен|близк/i],
    ["Communities", /сообществ|родствен|близк|людей/i],
    ["Jewish Culture", /еврей|иудаизм|Израил|Побед|лехаим|Холокост/i],
    ["Travel", /границ|путешеств|аэропорт|стран/i],
    ["Society", /общество|государств|власть|полит|медиа|Россия/i],
    ["Innovation", /технолог|инновац|приложен|электрон/i],
  ];

  for (const [tag, pattern] of checks) {
    if (pattern.test(body)) tags.add(tag);
  }

  return [...tags].slice(0, 5);
}

function createDescription(body) {
  const text = body
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, "$1")
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
    .slice(0, 92);
}

function uniqueSlug(slug) {
  let candidate = slug || "telegram-post";
  let suffix = 2;

  while (usedSlugs.has(candidate) || fs.existsSync(path.join(articleDir, `${candidate}.md`))) {
    candidate = `${slug}-${suffix}`;
    suffix += 1;
  }

  usedSlugs.add(candidate);
  return candidate;
}

function yamlString(value) {
  return JSON.stringify(value);
}
