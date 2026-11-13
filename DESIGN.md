# Alex Lindholm — design canon

Updated 13 November 2026. This is the working canon for incremental changes, not a mandate to redesign every existing page. Preserve approved content and established identity. Article rules below implement Alex’s request to make reading the primary activity.

## Identity and hierarchy

- Inter for body text and navigation; Newsreader for editorial titles and quotations. Use existing font loading.
- Ink `#10131A`, graphite, white/paper backgrounds and blue `#2563EB`; retain existing copper accents. Do not introduce another palette, type family or component library for a small change.
- Each page has one primary purpose and one visible H1. Its useful content comes before taxonomies, institutional descriptions, source administration and sales cards.
- Use whitespace to separate ideas, not to manufacture a full-screen introduction. Avoid duplicate headings, descriptions and navigation. Every framed card must justify its visual weight.
- Keep direct, concrete language. Preserve the author’s complexity through the actual work, not long lists of roles or generic claims.

## Article layout

1. **Reading first.** Compact Articles/category navigation → H1 → author/date/reading time → language/original-or-translation/counterpart → body. Do not add publication-status badges, repeated full-title breadcrumbs, a second Back button, tag clouds, source boxes or a pillar card before the body.
2. **Title proportional to text.** 32px mobile, 44px tablet, 52px desktop, line height 1.08. Long titles wrap naturally; never truncate or shrink body type to compensate.
3. **One reading column.** Outer maximum 832px including 20–32px side padding; desktop text width 768px. No sticky share/author/sales sidebar squeezing the article. Do not expand paragraphs to full desktop width.
4. **Text has weight.** Body 18px mobile / 20px desktop, line height 1.75; opening paragraph 19px / 22px. Dark legible text, paragraph spacing, clear headings and underlined links. Tables scroll inside the column, not the page.
5. **Illustration supports reading.** Existing approved cover appears after the opening blocks, at most 320px high, without forced cropping or a large shadow. Never separate a sentence ending in a colon from its immediately following quotation/list. Telegram galleries stay after their text. New photos still require approval for each image.
6. **Language is visible, provenance remains available.** Show actual content language in header and article; offer only real translations with ordinary links and hreflang. Move explicit introductory translation boilerplate intact to the source footer, while keeping a concise translation label above. Do not move substantive quotations or edit source Markdown.
7. **After reading.** Source/translation disclosure, topic links, tags and update history follow the text. Author, share and contact actions follow the article; related reading follows those. Avoid duplicating metadata as large cards.
8. **SEO stays complete.** Retain canonical URLs, language alternates, Article/BreadcrumbList structured data, descriptions and social images even when their information is no longer repeated visually. Do not change robots flags or dates as part of layout work.

## Interaction, consent and evidence

- Visible keyboard focus; descriptive links; comfortable touch targets. Respect reduced motion. Core reading must work without client JavaScript.
- Only verified statements and existing source dates. Do not manufacture translations, results, source attribution or photo permission.
- Retain approved contact paths and distinguish an intent click from a sent message or received enquiry.
- Implement improvements in shared templates rather than hand-fixing individual articles. Scope article typography under `.article-reading` so unrelated Markdown pages retain their current layout.

## Acceptance checks for future changes

- Inspect a long RU title, its EN counterpart, a long guide, a Telegram article, tables and a single-language page.
- Check 360/390px mobile, 768px tablet and 1280px desktop; no horizontal page overflow or header overlap.
- Reference case: `/articles/2026-11-22-ai-native-startups-and-incumbents-ru`. At 1280×720 the body should begin within approximately 450px; at 390×844 within approximately 500px. Exceptionally long titles may need more room, but supporting UI must never push the article offscreen.
- Compare before/after screenshots and actual body start position. Check real language navigation, source links, one H1 and preserved schema/canonical/robots. Run lint/type/build checks appropriate to the diff.

## Current implementation

Shared route: `app/articles/[slug]/page.tsx`. Typography: scoped `.article-reading` rules in `app/globals.css`. Markdown insertion slot: `components/markdown-content.tsx`. Exact source article files and photo assets remain unchanged by the reading-layout release.
