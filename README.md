# basement.studio — Frontend Dev Challenge

A blog built to recreate basement.studio's Figma design, wired to Sanity as a headless CMS, animated with GSAP, and built with an eye on accessibility and performance.

Monorepo: `web/` (Next.js 16, Tailwind v4, GSAP) + `studio/` (Sanity Studio).

## Features

- Full blog: homepage (hero + featured post + filterable/paginated grid) and post detail page (header, rich-text body, prev/next pagination, related posts).
- All content editable from Sanity: posts, authors, categories, and site-wide settings (nav links, hero copy, grid heading, footer columns, contact email, social links) — nothing content-related is hardcoded.
- Design system: `Button` (pill/compact variants, sizes) and `Text` (typographic variants mapped to CSS tokens, with `tone` and `weight` props) used across the site instead of one-off Tailwind strings.
- Accessibility: skip link, keyboard-reachable nav, layered focus-visible ring, dialogs with correct focus handling, contrast-checked color tokens, semantic landmarks.
- SEO: robots/sitemap, per-post OpenGraph/Twitter metadata, canonical URLs, JSON-LD.

## Technical decisions

- **`Container`** is the single source of truth for the site's horizontal edge, reverse-engineered from Figma's page margins. The article body uses its own narrower, independently-centered width.
- **`PostCard`** is one component with a `tone` prop ("light"/"dark") instead of two near-duplicates, keeping the grid and related-posts styles in sync.
- **Type-kit tokens grew incrementally**: `Text` variants were added as real usages needed them (e.g. `prose` for long-form copy vs. `body` for UI copy) rather than guessing a full scale up front — avoids forcing content into a token that silently changes its size or weight.
- **UI microcopy stays in code, not Sanity**: labels like "Previous"/"Next"/"Go back" are interaction affordances tied to component behavior, not editorial content — only real content is CMS-driven.
- **Assets are downloaded, not hand-recreated**: SVGs are exported from Figma and committed as static files rather than redrawn in code.
- **Trade-off**: no real OG image/app icons yet, `NEXT_PUBLIC_SITE_URL` isn't pinned to a deployment, and Sanity revalidation relies on the 1-hour tag-based window rather than a webhook.

## Animation details (GSAP)

- Navbar logo splits into two halves via `clip-path` (no new artwork) and drops in on load, left piece first, right piece overlapping in.
- Hero heading, glow, and featured card fade in on load, staggered.
- Post grid cards animate only on "Load more": new cards slide in, and existing cards that gain an image on that click fade just the image in — intentionally not scroll-triggered, so it never fires off-screen.
- Hamburger icon does a quick rotation punch on click; the mobile nav slides in from the right and reverses on every close path (button, backdrop, Escape).
- Contact modal opens/closes with a fade + scale, consistent across Escape/backdrop/close-button.
- Related posts is a wheel-scrollable horizontal carousel on desktop, plain vertical stack on mobile.
