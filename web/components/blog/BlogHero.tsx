import { FeaturedPostCard } from "@/components/blog/FeaturedPostCard";
import { Container } from "@/components/layout/Container";
import type { PostSummary } from "@/lib/sanity/types";

export function BlogHero({
  heading,
  featuredPost,
}: {
  heading: string;
  featuredPost?: PostSummary;
}) {
  return (

    <section className="relative overflow-hidden bg-ink pb-3 pt-4 text-cream sm:pb-[286px] sm:pt-24">
      <Container>
        <h1 className="max-w-3xl text-h1 font-semibold">{heading}</h1>
      </Container>

      {featuredPost && (
        <Container className="relative mt-16 sm:mb-6 mb-14 flow-root sm:mt-24">
          <img
            aria-hidden="true"
            alt=""
            src="/hero-glow.svg"
            className="pointer-events-none absolute left-1/2 top-0 w-[2448px] max-w-none -translate-x-1/2 select-none"
          />

          <div className="relative mt-9 sm:mt-[198px]">
            <FeaturedPostCard post={featuredPost} />
          </div>
        </Container>
      )}
    </section>
  );
}
