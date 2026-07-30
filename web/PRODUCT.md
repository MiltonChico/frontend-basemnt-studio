# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: readers of a basement.studio-style design/dev agency blog — designers, developers, and prospective clients discovering the studio through its writing on web design, development, and branding. They browse a filtered post grid, land on a featured post from the hero, and read individual articles (portable-text body, related posts).

Secondary: technical challenge reviewers at basement.studio evaluating this submission for code quality, fidelity to their Figma brief, and engineering judgment. Their evaluation shapes constraints (see below), not the primary design audience.

## Product Purpose

A blog surface for a design/engineering studio, recreated from basement.studio's "Frontend Dev Challenge 2026" Figma brief and wired to a real Sanity content backend. Success is a blog that reads as production-quality basement.studio output: faithful to the source design system, fast (Lighthouse ~100 target), accessible, and backed by live, editable content rather than static mocks.

## Positioning

The mechanism a neighboring clone could not truthfully copy: pixel-accurate execution of basement.studio's specific design system (exact color/type/button tokens pulled from Figma Dev Mode, not approximated) combined with real Sanity-driven content (categories, authors, portable text, per-post CTA labels) rather than hardcoded placeholder posts. The differentiator is fidelity + engineering craft on someone else's design language, not a new visual direction.

## Operating Context

- Built as a ~4-business-day take-home technical exercise; the Figma brief is the source of visual truth (Milton's duplicated copy of `Dev-Challenge-2026`, connected via Figma Dev Mode MCP).
- Content is authored in Sanity Studio (`studio/`, same monorepo) and consumed by the Next.js frontend (`web/`) via `next-sanity`; a revalidate webhook keeps production fresh.
- Deployment target is Vercel.
- Repo: `MiltonChico/frontend-basemnt-studio` on GitHub, npm workspaces monorepo (`studio/` + `web/`).

## Capabilities and Constraints

- Next.js 16 App Router, Tailwind v4, Turbopack, React 19.
- Sanity content model: `post` (title, slug, excerpt, mainImage+alt, categories[], authors[], publishedAt, portable-text body with custom `quote` block, optional per-post `ctaLabel`), `author`, `category`, `siteSettings` singleton (nav links, footer columns, social links, contact email, blog hero copy).
- Home route (`/`) IS the blog index; nav's "Blog" link points to `/`, not `/blog`.
- Non-blog nav items (Showcase/Services/People/Laboratory/Ventures) are intentional placeholder links (`href: "#"`) — explicitly out of scope for this exercise.
- Target: Lighthouse ~100, accessible (keyboard nav), deployed and live — not just a local demo.
- Undecided/open: category filter ordering currently alphabetical vs. Figma's Web Design/Development/Branding order (flagged, not yet resolved).

## Brand Commitments

Visual identity is basement.studio's, not Milton's own — every color, type, and component decision should trace back to the Figma brief or a documented, flagged approximation where the brief was ambiguous. Known committed tokens (see DESIGN.md/tokens for current values): accent `#FF4D00`, ink `#0a0a0a` page background (kept distinct from pure black), paper `#ededed`.

## Evidence on Hand

- Figma brief: `Dev-Challenge-2026` (agency-owned, Milton's duplicated copy, live via Figma Dev Mode MCP).
- 2 real Sanity-authored posts loaded and verified live against the API.
- No testimonials, pricing, or case-study content beyond what basement.studio's Figma brief and the Sanity-authored posts actually contain — do not fabricate additional evidence.

## Product Principles

1. Figma is the source of truth — when the brief is ambiguous, approximate and flag it rather than guessing silently.
2. Content is real and Sanity-driven, not hardcoded placeholders; null vs. undefined array fields from Sanity are a known trap (`?? []` in component body, not default params).
3. Craft and fidelity are the deliverable — this is a technical exercise judged on execution quality against someone else's design system, not an invitation to redesign.
4. Ship production-realistic: deployed to Vercel, revalidation wired, performance and accessibility are in scope, not optional polish.

## Accessibility & Inclusion

Keyboard navigation audit is an explicit pending item (see project status). No other product-specific accessibility requirement has been established beyond general best practice.
