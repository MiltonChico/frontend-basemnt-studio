import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { Tag } from "@/components/ui/Tag";
import type { PostSummary } from "@/lib/sanity/types";

export function BlogHero({
  heading,
  featuredPost,
}: {
  heading: string;
  featuredPost?: PostSummary;
}) {
  const date = featuredPost
    ? new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <section className="relative overflow-hidden bg-ink px-6 pb-24 pt-16 text-cream">
      <h1 className="mx-auto max-w-4xl text-h1 font-semibold">{heading}</h1>

      {featuredPost && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-40 mx-auto h-[420px] max-w-4xl rounded-full bg-accent/40 blur-[120px]"
        />
      )}

      {featuredPost && (
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="group relative mx-auto mt-16 flex max-w-2xl flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-ink-soft/80 p-4 backdrop-blur sm:flex-row"
        >
          {featuredPost.mainImage && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:w-56 sm:shrink-0">
              <Image
                src={urlFor(featuredPost.mainImage).width(480).height(360).url()}
                alt={featuredPost.mainImage.alt ?? ""}
                fill
                sizes="(min-width: 640px) 224px, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          )}
          <div className="flex flex-col justify-center gap-2 p-2">
            {date && <p className="text-caption font-mono text-cream/60">{date}</p>}
            <h2 className="text-2xl font-semibold leading-snug">{featuredPost.title}</h2>
            {featuredPost.categories && featuredPost.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {featuredPost.categories.map((category) => (
                  <Tag key={category._id}>{category.title}</Tag>
                ))}
              </div>
            )}
            {featuredPost.excerpt && (
              <p className="text-body text-cream/70">{featuredPost.excerpt}</p>
            )}
            <span className="mt-1 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-caption font-semibold uppercase text-cream">
              Read full blog post
            </span>
          </div>
        </Link>
      )}
    </section>
  );
}
