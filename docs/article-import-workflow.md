# Article import workflow

Import any public post or article URL as a reviewable draft:

```bash
npm run import:url -- "https://example.com/post"
```

The importer:

1. fetches the public page;
2. extracts title, publication date, description and social image where available;
3. extracts article paragraphs when the source exposes them;
4. detects English or Russian;
5. creates a duplicate-safe Markdown draft in `articles/en` or `articles/ru`;
6. preserves the original URL and source;
7. leaves `status: draft` so incomplete imports cannot publish accidentally.

Before publishing, review the generated file, correct the text and metadata, add category/tags, and change:

```yaml
status: published
```

The article archive and the homepage **Latest from Alex** widget then update automatically on the next deployment.

## LinkedIn limitation

LinkedIn often returns only Open Graph preview metadata to automated requests. The importer still creates a structured draft with the original URL, title, description and image when available, but the complete post text may need to be pasted into the generated draft. This avoids fragile scraping and accidental publication of incomplete text.
