import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import type { PostSummary } from "@/lib/sanity/types";

export function PostCard({ post }: { post: PostSummary }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const ctaLabel = post.ctaLabel ?? "Read more";

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-[rgba(252,252,252,0.25)] text-ink">
      <div className="relative aspect-[2.9/1] w-full overflow-hidden bg-ink-soft">
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).width(640).height(220).url()}
            alt={post.mainImage.alt ?? post.title}
            fill
            sizes="(min-width: 1024px) 457px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <p className="text-caption font-mono text-ink/70">
          <time dateTime={post.publishedAt}>{date}</time>
        </p>
        <h3 className="text-h3 font-semibold">{post.title}</h3>
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Tag key={category._id} flat className="bg-[#e6e6e6] text-ink/70">
                {category.title}
              </Tag>
            ))}
          </div>
        )}
        <Button
          href={`/blog/${post.slug}`}
          variant="secondaryLight"
          className="mt-2 w-fit"
          aria-label={`${ctaLabel}: ${post.title}`}
        >
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
