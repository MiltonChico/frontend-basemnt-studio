import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { Tag } from "@/components/ui/Tag";
import type { Post } from "@/lib/sanity/types";

export function PostHeader({ post }: { post: Post }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="bg-ink px-6 pb-12 pt-8 text-cream">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-label font-mono text-cream/70 hover:text-accent"
        >
          ← Go back
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-8 border-t border-line pt-8 md:grid-cols-2">
          <h1 className="text-h2 font-semibold">{post.title}</h1>
          {post.excerpt && (
            <p className="text-body text-cream/70">{post.excerpt}</p>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 text-label font-mono text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {date}
            {post.authors && post.authors.length > 0
              ? ` · ${post.authors.map((author) => author.name).join(", ")}`
              : ""}
          </p>
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Tag key={category._id}>{category.title}</Tag>
              ))}
            </div>
          )}
        </div>

        {post.mainImage && (
          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src={urlFor(post.mainImage).width(1600).height(900).url()}
              alt={post.mainImage.alt ?? ""}
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </header>
  );
}
