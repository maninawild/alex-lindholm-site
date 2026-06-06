# Telegram Article Import

This site is prepared for future Russian Telegram article imports, but no Telegram scraping or fake import has been performed.

## Source

Record the exact Telegram source for each imported article:

- Source Telegram channel: for example `@channelname`
- Post URL: for example `https://t.me/channelname/123`
- Import date

## Target Folder

Stage Russian Telegram imports in:

```text
content/articles/telegram-ru/
```

After review, publish-ready articles can be moved into the live article library:

```text
articles/ru/
```

## Expected Format

Each Telegram post should become one Markdown file with this structure:

```md
---
id: "telegram-ru-2026-05-30-short-slug"
title: "Original or lightly edited title"
slug: "telegram-ru-2026-05-30-short-slug"
language: "ru"
date: "2026-05-30T12:00:00.000Z"
source: "Telegram"
sourceUrl: "https://t.me/channelname/123"
tags:
  - "Human-Centered AI"
  - "Technology Ethics"
excerpt: "One or two sentence summary."
metaDescription: "SEO-ready description under roughly 155 characters."
status: "draft"
---

Original Telegram text in Russian.

Links from the post should remain as Markdown links:

[Link label](https://example.com)
```

## Required Fields

- `id`
- `title`
- `slug`
- `language: "ru"`
- `date`
- `source: "Telegram"`
- `sourceUrl`
- `tags`
- `excerpt`
- `metaDescription`
- `status: "draft"` or `status: "published"`

## Import Rules

- Do not invent Russian articles.
- Do not translate Russian Telegram posts into English during import.
- Preserve original meaning, links, and source URL.
- Start new imports as `draft`.
- Move a file to `articles/ru/` only after editorial review.

