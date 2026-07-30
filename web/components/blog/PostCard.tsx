import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { Tag } from "@/components/ui/Tag";
import type { PostSummary } from "@/lib/sanity/types";

export function PostCard({ post }: { post: PostSummary }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-paper-soft text-ink transition-transform duration-200 hover:-translate-y-1"
    >
      {/* Source images are wide banner-style crops, not 4:3 — matching the container's
          aspect ratio to the Sanity crop request avoids a double-crop that clips the sides */}
      <div className="relative aspect-[2.9/1] w-full overflow-hidden bg-ink-soft">
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).width(640).height(220).url()}
            alt={post.mainImage.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <p className="text-caption font-mono text-ink/60">{date}</p>
        <h3 className="text-xl font-semibold leading-snug">{post.title}</h3>
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Tag key={category._id} className="bg-ink/5 text-ink/70">
                {category.title}
              </Tag>
            ))}
          </div>
        )}
        <span className="mt-2 text-label font-mono text-accent group-hover:underline">
          {post.ctaLabel ?? "Read more"}
        </span>
      </div>
    </Link>
  );
}
