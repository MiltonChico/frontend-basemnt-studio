import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { Tag } from "@/components/ui/Tag";
import type { PostSummary } from "@/lib/sanity/types";

export function RelatedPosts({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-line bg-ink px-6 py-16 text-cream">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-h3 font-semibold">Related Posts</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {posts.map((post) => {
            const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            return (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3"
              >
                {post.mainImage && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-ink-soft">
                    <Image
                      src={urlFor(post.mainImage).width(480).height(360).url()}
                      alt={post.mainImage.alt ?? ""}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <p className="text-caption font-mono text-cream/50">{date}</p>
                <h3 className="text-body font-semibold leading-snug group-hover:text-accent">
                  {post.title}
                </h3>
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category) => (
                      <Tag key={category._id}>{category.title}</Tag>
                    ))}
                  </div>
                )}
                <span className="inline-flex w-fit rounded-full bg-accent px-3 py-1 text-caption font-semibold uppercase text-cream">
                  Read more
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
