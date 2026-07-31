# Production Search Indexing Checklist

Production validation performed on 2026-08-01 against `https://www.axlindholm.nl`.

## Verified production state

- [x] `/robots.txt` returns HTTP 200.
- [x] `/sitemap.xml` returns HTTP 200 and valid XML.
- [x] `/feeds/articles-en.xml` returns HTTP 200 and contains 56 published articles.
- [x] `/feeds/articles-ru.xml` returns HTTP 200 and contains 70 published articles.
- [x] All 138 canonical sitemap URLs return HTTP 200 without redirect chains.
- [x] All 126 published article URLs are present in the sitemap.
- [x] Every sitemap page has a self-referencing canonical URL on `https://www.axlindholm.nl`.
- [x] No sitemap page references the old `alexlindholm.com` domain.
- [x] No public sitemap page contains `noindex`.
- [x] All 126 article pages contain valid JSON-LD with `Article` and `BreadcrumbList` data.
- [x] Published English/Russian translation pairs expose reciprocal `hreflang` metadata and sitemap alternates.
- [x] Googlebot, Bingbot, OAI-SearchBot, and PerplexityBot receive HTTP 200 for a public article.

## Vercel environment variables

Add these values in **Vercel → Project Settings → Environment Variables** for the Production environment:

- [ ] `GOOGLE_SITE_VERIFICATION` — Google Search Console HTML verification token.
- [ ] `BING_SITE_VERIFICATION` — Bing Webmaster Tools `msvalidate.01` token.
- [ ] `INDEXNOW_KEY` — an IndexNow key containing 8–128 letters, numbers, or hyphens.

After adding or changing these variables:

1. [ ] Redeploy the production branch.
2. [ ] Confirm the production homepage contains `google-site-verification`.
3. [ ] Confirm the production homepage contains `msvalidate.01`.
4. [ ] Confirm `https://www.axlindholm.nl/indexnow.txt` returns the configured IndexNow key with HTTP 200.

Current validation status: the Google and Bing verification tags are absent, and `/indexnow.txt` returns HTTP 404. This is expected until the variables are configured and production is redeployed.

## Google Search Console

1. [ ] Add or select the `axlindholm.nl` domain property.
2. [ ] Complete ownership verification using the preferred DNS method or `GOOGLE_SITE_VERIFICATION`.
3. [ ] Submit `https://www.axlindholm.nl/sitemap.xml`.
4. [ ] Use URL Inspection on the homepage, `/articles`, one English article, and one Russian article.
5. [ ] Request indexing only when necessary; allow the sitemap to handle routine discovery.
6. [ ] Review Page Indexing, Crawl Stats, and structured-data reports after Google processes the deployment.

## Bing Webmaster Tools

1. [ ] Add `https://www.axlindholm.nl` or import the verified Google Search Console property.
2. [ ] Complete ownership verification using `BING_SITE_VERIFICATION` if required.
3. [ ] Submit `https://www.axlindholm.nl/sitemap.xml`.
4. [ ] Verify that Bing discovers both RSS feeds.
5. [ ] Inspect representative English and Russian article URLs.
6. [ ] Review IndexNow submission history after the first manual submission.

## IndexNow

IndexNow submission is manual and must only be run after a production deployment for URLs that were created, materially updated, or removed.

1. [ ] Configure `INDEXNOW_KEY` in Vercel and redeploy.
2. [ ] Verify the key endpoint returns HTTP 200.
3. [ ] Configure the same key in the local environment used for submission.
4. [ ] Submit each changed article URL:

```sh
INDEXNOW_KEY=... npm run indexnow -- https://www.axlindholm.nl/articles/example
```

5. [ ] Confirm the command succeeds.
6. [ ] Check Bing Webmaster Tools for the submitted URL.

Do not submit the full website on every deployment.

## CDN and domain verification

- [ ] Confirm `http://axlindholm.nl`, `http://www.axlindholm.nl`, and `https://axlindholm.nl` redirect directly to `https://www.axlindholm.nl` without a chain.
- [ ] Confirm Vercel or any upstream CDN does not return authentication pages, bot challenges, HTTP 401, or HTTP 403 to legitimate search crawlers.
- [ ] Re-run the endpoint and sitemap checks after DNS, domain, CDN, or environment-variable changes.

Current validation status:

- `http://www.axlindholm.nl` redirects directly to the canonical HTTPS host.
- `https://axlindholm.nl` redirects directly to the canonical HTTPS host.
- `http://axlindholm.nl` currently uses two redirects: first to `https://axlindholm.nl`, then to `https://www.axlindholm.nl`. Update the Vercel domain redirect so it points directly to the canonical HTTPS `www` URL.
- Googlebot, Bingbot, OAI-SearchBot, and PerplexityBot received HTTP 200 for a public production article without an authentication or challenge response.

## Routine publishing verification

After publishing an immutable article file:

1. [ ] Confirm the article returns HTTP 200 at its canonical URL.
2. [ ] Confirm it appears in `/articles`.
3. [ ] Confirm it appears in `/sitemap.xml`.
4. [ ] Confirm it appears in the correct language RSS feed.
5. [ ] Confirm canonical, Open Graph, Twitter, and Article JSON-LD use the approved metadata.
6. [ ] Confirm no accidental `noindex` is present.
7. [ ] Confirm reciprocal `hreflang` appears only when a genuine published translation exists.
8. [ ] Run `npm run audit:article-metadata` and review duplicate groups editorially.
9. [ ] Run IndexNow for the deployed article URL when appropriate.
