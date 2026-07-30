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
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[480px] w-full rounded-full bg-accent/40 blur-[140px]"
          />


          <div className="relative mt-[198px]">
            <FeaturedPostCard post={featuredPost} />
          </div>
        </Container>
      )}
    </section>
  );
}
