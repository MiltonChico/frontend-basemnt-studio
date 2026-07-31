import { PostCard } from "./PostCard";
import { Container } from "@/components/layout/Container";
import type { PostSummary } from "@/lib/sanity/types";

export function RelatedPosts({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-line bg-ink py-16 text-cream">
      <Container>
        <h2 className="text-h2 font-semibold">
          <span className="block leading-[0.95]">Related</span>
          <span className="block leading-[0.95]">Posts</span>
        </h2>
        <div className="mt-8 flex flex-wrap gap-8">
          {posts.map((post) => (
            <div key={post._id} className="w-full sm:h-[400px] sm:w-[436px] sm:shrink-0">
              <PostCard post={post} tone="dark" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
