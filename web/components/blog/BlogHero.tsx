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

    <section className="relative overflow-hidden bg-ink pb-16 pt-16 text-cream sm:pb-[286px]">
      <Container>
        <h1 className="max-w-3xl text-h1 font-semibold">{heading}</h1>
      </Container>

      {featuredPost && (
        <Container className="relative mt-24 flow-root">
          <img
            aria-hidden="true"
            alt=""
            src="/hero-glow.svg"
            className="pointer-events-none absolute left-1/2 top-0 w-[2448px] max-w-none -translate-x-1/2 select-none"
          />

          <div className="relative mt-[198px]">
            <FeaturedPostCard post={featuredPost} />
          </div>
        </Container>
      )}
    </section>
  );
}
