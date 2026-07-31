const siteUrl = "https://www.axlindholm.nl";
const key = process.env.INDEXNOW_KEY;
const requestedUrls = process.argv.slice(2);

if (!key) {
  console.error("INDEXNOW_KEY is required.");
  process.exit(1);
}

if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
  console.error("INDEXNOW_KEY must be 8–128 characters using letters, numbers, or hyphens.");
  process.exit(1);
}

if (requestedUrls.length === 0) {
  console.error("Provide at least one deployed article URL.");
  process.exit(1);
}

const urls = requestedUrls.map((value) => {
  const url = new URL(value, siteUrl);

  if (url.protocol !== "https:" || url.hostname !== "www.axlindholm.nl") {
    throw new Error(`Refusing URL outside www.axlindholm.nl: ${url.toString()}`);
  }

  if (!url.pathname.startsWith("/articles/")) {
    throw new Error(`IndexNow submissions are limited to article URLs: ${url.toString()}`);
  }

  return url.toString();
});

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify({
    host: "www.axlindholm.nl",
    key,
    keyLocation: `${siteUrl}/indexnow.txt`,
    urlList: urls,
  }),
});

if (!response.ok) {
  const body = await response.text();
  throw new Error(`IndexNow returned ${response.status}: ${body}`);
}

console.log(`Submitted ${urls.length} deployed article URL(s) to IndexNow.`);
