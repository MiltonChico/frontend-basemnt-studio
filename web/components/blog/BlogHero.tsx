import { FeaturedPostCard } from "@/components/blog/FeaturedPostCard";
import type { PostSummary } from "@/lib/sanity/types";

export function BlogHero({
  heading,
  featuredPost,
}: {
  heading: string;
  featuredPost?: PostSummary;
}) {
  return (
    // Bottom padding is the sole source of the gap before PostGrid starts (measured from
    // Figma: featured card bottom 1064.63px, next section top 1350.47px → 286px). PostGrid
    // deliberately carries no matching top padding at this breakpoint — two independent
    // paddings stacking unpredictably is exactly what produced the oversized gap before.
    <section className="relative overflow-hidden bg-ink px-6 pb-16 pt-16 text-cream sm:pb-[286px]">
      {/* Shares the navbar's container width (1340px) and left edge */}
      <div className="mx-auto max-w-[1340px]">
        <h1 className="max-w-3xl text-h1 font-semibold">{heading}</h1>
      </div>

      {featuredPost && (
        // This whole block sits in normal flow AFTER the heading (mt-24 below), so the gap
        // is guaranteed regardless of how many lines the heading wraps to — the glow is
        // absolutely positioned relative to THIS wrapper, not the section, so it can never
        // creep up into the heading text above. flow-root stops the mt-24 (wrapper) /
        // mt-[198px] (card) margins from collapsing into a single margin — without it only
        // the larger one applied, crushing the gap the glow needs to be visible above the
        // card (measured from Figma: heading bottom ~375px, glow top 472px, card top 670px).
        <div className="relative mt-24 flow-root">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[480px] w-full rounded-full bg-accent/40 blur-[140px]"
          />

          {/* Centered on the full page width (not the 1340px container) — measured from
              Figma: card left:509 with width:902 implies a 1920px reference frame. */}
          <div className="relative mt-[198px]">
            <FeaturedPostCard post={featuredPost} />
          </div>
        </div>
      )}
    </section>
  );
}
