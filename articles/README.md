# Article Content Library

Real article imports live here.

- English articles: `articles/en`
- Russian articles: `articles/ru`

Each article should be a Markdown file with frontmatter:

```md
---
id: "stable-article-id"
title: "Original title"
slug: "original-title"
date: "2026-05-01T10:00:00.000Z"
tags:
  - "Human-Centered AI"
category: "Innovation"
language: "en"
featuredImage: "/media/articles/image.jpg"
source: "Google Docs import"
sourceUrl: "https://..."
excerpt: "Short article-card summary."
metaDescription: "Short search description."
openGraphTitle: "Optional OpenGraph title"
openGraphDescription: "Optional OpenGraph description"
relatedArticles:
  - "another-article-slug"
status: "published"
---

Original article body in the original language.
```

Do not translate articles during import. Keep English articles in English and Russian articles in Russian.

## Import Helpers

English Google Docs exports:

```sh
node scripts/import-english-docs.mjs
```

Russian Telegram Desktop export from `@cynicschool`:

```sh
node scripts/import-telegram-json.mjs /path/to/result.json @cynicschool
```

The Telegram importer expects Telegram Desktop's JSON export format and preserves Telegram text entities such as bold, italic, code, text links, and raw links as Markdown.

Manual Russian Telegram staging should use `content/articles/telegram-ru/` first. See `docs/telegram-article-import.md`.
