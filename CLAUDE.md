# CLAUDE.md — axlindholm.nl (alex-lindholm-site)

Personal site and article platform of Alex Lindholm. Production: https://axlindholm.nl (Vercel project `alex-lindholm-site`, branch `main` deploys to production).

## Stack
- Next.js (App Router), TypeScript, Tailwind CSS 3, ESLint.
- Vercel Analytics and Speed Insights; Upstash Redis for private-access features.
- Content: Markdown in `articles/` and `content/`; data in `data/`; media in `public/`.

## Commands
- `npm install`, `npm run dev` (http://localhost:3000), `npm run build`, `npm run lint`
- `npm run build` runs `validate:article-images` first (prebuild); fix image errors, do not bypass.
- Audits: `npm run audit:article-metadata`, `npm run audit:insights`
- Import tools: `npm run import:url`, `import:telegram`, `translate:telegram` (see `docs/article-import-workflow.md`, `docs/telegram-article-import.md`)
- Private content: `docs/private-content.md`; do not print or commit secrets or `.env.local`.

## Rules
- Read `DESIGN.md` before changing layouts, typography or article templates. It is the design canon (reading-first articles, one 768px column, scoped `.article-reading` styles in `app/globals.css`).
- Make incremental changes. Do not redesign pages or introduce new palettes, fonts or component libraries.
- Fix issues in shared templates (`app/articles/[slug]/page.tsx`, `components/markdown-content.tsx`), not by hand-editing individual articles.
- Do not edit source article Markdown, invent translations, results, sources or photo permissions. New photos need approval per image.
- Keep SEO intact: canonical URLs, hreflang alternates, JSON-LD, descriptions, social images, robots flags, dates.
- All code and content are in English unless a file is an existing Russian-language article.
- Before finishing a UI change: run lint and build, and check 360/390px, 768px and 1280px widths for overflow (acceptance checks are in `DESIGN.md`).

## Workflow
- Work on a branch and open a pull request; do not push directly to `main` unless Alex says so.
