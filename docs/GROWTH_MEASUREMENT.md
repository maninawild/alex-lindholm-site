# Growth measurement and contact delivery

Owner approved free, anonymous analytics on 27 November 2026. Vercel pageviews and first-party daily action counters are separate from business outcomes. The live dashboard previously showed demo data because Web Analytics was disabled. Hobby does not include custom events: https://vercel.com/docs/analytics/limits-and-pricing . No paid upgrade is part of this change.

## Anonymous actions

`SITE_METRICS_ENABLED=true` enables the first-party counter. The only client dimensions are an allowlisted action, a bounded page category, and placement. Both EN/RU pages use the same categories. Private/API routes, DNT and GPC opt-outs are excluded. No names, emails, message bodies, raw URLs, IPs, cookies, visitor IDs or unique-person estimates are stored. Browser-provided fields outside the contract are rejected.

Counters use the existing server-side Upstash credentials. Daily UTC hashes expire after 63 days. A global daily budget bounds abuse; these counters are useful diagnostics, not audited leads. There is no public read endpoint. Vercel pageview URLs have query strings/fragments stripped; Private paths and DNT/GPC are excluded before sending.

Run `node --env-file=.env.local scripts/report-growth.mjs YYYY-MM-DD YYYY-MM-DD` in a private operator environment. Output contains aggregate counters only. Before the first recorded action, metrics are unknown; a period preceding collection is incomplete. Data is not retroactive. Do not compare these UTC action counts directly to Search Console totals as a conversion rate.

## Contact delivery

Existing `/api/contact` requires CONTACT_PROVIDER=resend, RESEND_API_KEY, CONTACT_FROM, CONTACT_RATE_SECRET and the existing KV credentials. Provider key/sender are not currently connected. The form continues honestly opening an email draft until all requirements exist. No dummy success is shown. No real email is sent by the readiness checks.

A browser cannot claim `contact_provider_accepted`: the server records it only after the email provider returns a successful ID. This means accepted by the provider, not delivered to an inbox. Metrics errors cannot turn an accepted email into a failed-send response. Preserve an accessible direct email fallback. Connect and verify the sender through the owner’s authenticated account; never paste credentials into chat. Owner approval is still needed for DNS changes or new agreements.

## Confirmed outcomes

`.editorial/opportunities.json` is private and ignored by Git. Start with unknown coverage, not a fictional zero baseline. Each opportunity uses an anonymous stable `id`, `kind` (hiring/consultation/partnership/speaking), optional receivedAt/conversationCompletedAt/offerReceivedAt dates and an `evidence` reference for each populated date. Keep personal information and source documents out of this file; evidence references point to the owner’s private records. A proposed call is not a completed conversation; a recruiter message is not an offer.

The report deduplicates opportunity IDs and counts only dated, evidence-backed hiring outcomes. Historical totals remain unknown until the owner confirms complete coverage for the reporting period. Consultation, partnership and speaking records are not rolled into hiring outcomes. An empty ledger is not evidence of no enquiries.
