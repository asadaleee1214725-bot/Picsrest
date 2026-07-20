# Picsrest

A visual discovery platform — a clean, modern landing page ready for future development.

## Run & Operate

- `pnpm --filter @workspace/picsrest run dev` — run the Next.js dev server (port 24484)
- `pnpm --filter @workspace/picsrest run build` — static export to `artifacts/picsrest/out/`
- `pnpm --filter @workspace/picsrest run typecheck` — TypeScript check

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Runtime:** React 19, Node.js 24
- **Monorepo:** pnpm workspaces

## Where things live

- `artifacts/picsrest/app/` — Next.js App Router source
  - `layout.tsx` — root layout + metadata
  - `page.tsx` — landing page (navbar + hero)
  - `globals.css` — Tailwind v4 base styles
- `artifacts/picsrest/next.config.ts` — Next.js config (static export, `out/` dir)
- `artifacts/picsrest/postcss.config.mjs` — PostCSS config for Tailwind v4

## Architecture decisions

- **Static export (`output: "export"`)** — no server required; can be hosted as plain files.
- **No extra dependencies** — only Next.js, React, and Tailwind CSS. Kept intentionally minimal for future extensibility.
- **No backend / database / auth** — this is a landing-page-only build; add those incrementally.
- **Tailwind v4 with PostCSS** — uses `@tailwindcss/postcss` (not the Vite plugin) since Next.js uses PostCSS.

## Product

Picsrest is a visual discovery platform. The landing page features:
- Sticky navbar: PR logo (left), search bar (center), Log in + Sign up buttons (right)
- Hero: "Welcome to Picsrest" headline, "Discover • Share • Inspire" subtitle, two CTA buttons
- Category pills: Photography, Art & Design, Architecture, Fashion, Travel, Food, Technology, Nature
- Responsive design with a mobile hamburger menu
- White background with orange (#f97316) accents throughout

## User preferences

_Populate as you build._

## Gotchas

- Tailwind v4 is configured via `postcss.config.mjs` — do NOT add a `tailwind.config.ts`; v4 is config-file-free.
- `NEXT_TELEMETRY_DISABLED=1` is set in `next.config.ts` to suppress telemetry noise.
- Port is injected as `$PORT` by the artifact workflow — do not hardcode it.

## Pointers

- See the `pnpm-workspace` skill for workspace structure and TypeScript setup.
