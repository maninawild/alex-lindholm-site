import { readFile } from "node:fs/promises";

const siteUrl = "https://www.axlindholm.nl";
const key = (await readFile(new URL("../public/indexnow.txt", import.meta.url), "utf8")).trim();
const requestedUrls = process.argv.slice(2);

if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
  console.error("public/indexnow.txt must contain an 8–128 character IndexNow key.");
  process.exit(1);
}

if (requestedUrls.length === 0) {
  console.error("Provide at least one deployed public URL.");
  process.exit(1);
}

const urls = requestedUrls.map((value) => {
  const url = new URL(value, siteUrl);

  if (url.protocol !== "https:" || url.hostname !== "www.axlindholm.nl") {
    throw new Error(`Refusing URL outside www.axlindholm.nl: ${url.toString()}`);
  }

  if (url.username || url.password || url.port || url.search || url.hash) {
    throw new Error(`Refusing URL with credentials, port, query or fragment: ${url.toString()}`);
  }

  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/private")) {
    throw new Error(`Refusing non-public URL: ${url.toString()}`);
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

console.log(`Submitted ${urls.length} deployed public URL(s) to IndexNow.`);
