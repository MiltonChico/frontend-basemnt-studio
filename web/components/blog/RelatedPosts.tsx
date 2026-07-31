import { PostCard } from "./PostCard";
import { Container } from "@/components/layout/Container";
import { HorizontalScroller } from "./HorizontalScroller";
import type { PostSummary } from "@/lib/sanity/types";

export function RelatedPosts({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-line bg-ink py-16 text-cream">
      <Container>
        <h2 className="text-h2 font-semibold sm:leading-[0.95]">
          <span className="sm:block">Related</span>{" "}
          <span className="sm:block">Posts</span>
        </h2>
      </Container>
      <HorizontalScroller
        className="mt-8 sm:[mask-image:linear-gradient(to_right,black_92%,transparent_100%)]"
        leadingInset="max(1.5rem, calc((100vw - 904px) / 2))"
      >
        <div className="flex flex-col gap-3 pr-6 sm:w-max sm:flex-row sm:gap-8">
          {posts.map((post) => (
            <div key={post._id} className="w-full sm:h-[400px] sm:w-[436px] sm:shrink-0">
              <PostCard post={post} tone="dark" />
            </div>
          ))}
        </div>
      </HorizontalScroller>
    </section>
  );
}
