# Search and AI Discoverability

This document describes the technical discovery infrastructure for the public website. It does not imply or guarantee rankings, inclusion in AI answers, or citations.

## Crawler access

`/robots.txt` allows public crawling by Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, and other standards-compliant crawlers. API routes are excluded. The file points to the absolute sitemap URL at `https://www.axlindholm.nl/sitemap.xml`.

## Sitemap

`/sitemap.xml` is generated through the Next.js App Router. It includes public static pages, events, and every published English and Russian article returned by the existing article registry. Drafts are excluded by that registry. Article dates are used as `lastModified` values when available. Published translations receive language alternates only when both versions exist.

New published article files are included automatically at the next production build. No manual article list is maintained.

## Immutable article publishing

Approved Markdown article bodies remain the source of truth and are not rewritten by this infrastructure. When a file is marked as published in the existing English or Russian article directories, the shared article registry automatically makes it available to the Insights index, sitemap, matching language alternates, language-specific RSS feed, canonical metadata, and server-rendered Article and Breadcrumb JSON-LD. Drafts remain excluded.

## Metadata and structured data

The canonical site origin is `https://www.axlindholm.nl`. Indexable pages expose canonical metadata through the existing Next.js metadata implementation. Published articles expose their existing title and description as HTML, Open Graph, and Twitter metadata, together with article dates, author, locale, and available social images.

The root layout exposes reusable `WebSite` and `Person` entities. Published article pages expose `Article` and `BreadcrumbList` JSON-LD. The central author entity is Alex Lindholm, Startup Visa & Facilitator Advocate, and links only to the existing public LinkedIn profile.

Article language alternates are generated only for matching published translations. No `x-default` alternate is emitted because the site has a single bilingual article index rather than a default translated article route.

## Feeds

Published articles are available from:

- English: `https://www.axlindholm.nl/feeds/articles-en.xml`
- Russian: `https://www.axlindholm.nl/feeds/articles-ru.xml`

Each RSS feed is generated from the existing article registry and excludes drafts.

## IndexNow

IndexNow is intentionally manual so URLs are submitted only after a successful production deployment.

1. Create an IndexNow key outside the repository.
2. Add it to the production environment as `INDEXNOW_KEY`.
3. Confirm that `https://www.axlindholm.nl/indexnow.txt` returns the key in production.
4. After a successful deployment, submit only URLs that were created, materially updated, or removed:

```sh
INDEXNOW_KEY=... npm run indexnow -- https://www.axlindholm.nl/articles/example
```

The script rejects non-HTTPS URLs, URLs outside `www.axlindholm.nl`, and non-article routes. The key is never stored in the repository. No submission runs during local development or builds.

## Search-engine verification

The root metadata reads optional deployment-only values:

- `GOOGLE_SITE_VERIFICATION` for Google Search Console;
- `BING_SITE_VERIFICATION` for Bing Webmaster Tools.

Add the values in Vercel project settings for the Production environment, then redeploy. When a value is absent, no empty verification tag is emitted and the build continues normally. Verification tokens must not be committed to the repository.

## llms.txt

No `/llms.txt` route is added. The current architecture does not have separate English and Russian index routes or an approved cornerstone-article registry, so adding one would require inventing or duplicating content. Search engines and AI answer engines can use the standard sitemap, feeds, metadata, linked HTML, and structured data.

## Post-deployment checks

- Confirm `robots.txt`, `sitemap.xml`, both feeds, and representative English and Russian articles return HTTP 200.
- Confirm a missing article returns HTTP 404.
- Inspect canonical and language-alternate tags in the deployed HTML.
- Validate `WebSite`, `Person`, `Article`, and `BreadcrumbList` JSON-LD.
- Confirm article titles, descriptions, headings, and body text are present in the initial HTML response.
- Confirm the canonical host redirects are configured once at the hosting or DNS layer, without redirect chains.
- Confirm `indexnow.txt` returns the production key before running the manual submission command.

Google Search Console is required to verify the domain, submit and monitor the sitemap, inspect Google indexing, and review enhancements. Bing Webmaster Tools is required to verify Bing ownership, submit and monitor the sitemap, inspect Bing indexing, and review IndexNow status. Those external account tasks cannot be completed from the repository alone.

Vercel or the active CDN must also be checked after deployment to confirm that `http` and non-`www` requests resolve to the canonical HTTPS `www` host without a redirect chain, and that legitimate search crawlers are not presented with authentication, bot challenges, HTTP 401, or HTTP 403 responses.
