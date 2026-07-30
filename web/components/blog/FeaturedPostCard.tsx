import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import type { PostSummary } from "@/lib/sanity/types";

// The large, dark, image-left "hero" card (Figma node 19:1008) — visually distinct from
// the light PostCard used in the grid below (different tag colors, 38px title, and the
// accent-filled "secondaryAccent" button skin instead of the light one).
export function FeaturedPostCard({ post }: { post: PostSummary }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const ctaLabel = post.ctaLabel ?? "Read full blog post";

  return (
    // Only the CTA button below is a link — image/title/tags/excerpt are presentational.
    // A card-wide link is easy to misclick and gives every card an identical, ambiguous
    // accessible name; one clearly-labelled link per card is unambiguous for screen
    // reader and keyboard users, at the cost of a slightly smaller click target.
    <article className="relative mx-auto flex w-full max-w-[902px] flex-col gap-12 overflow-hidden rounded-2xl border border-line bg-ink-soft/80 pt-2 pr-2 pb-2 pl-4 backdrop-blur sm:h-[394px] sm:flex-row">
      {post.mainImage && (
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl sm:h-full sm:w-[360px] sm:aspect-auto">
          <Image
            src={urlFor(post.mainImage).width(720).height(720).url()}
            alt={post.mainImage.alt ?? post.title}
            fill
            sizes="(min-width: 640px) 360px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="flex flex-col justify-center gap-4 p-2 sm:w-[325px] sm:shrink-0">
        <p className="text-caption font-mono text-cream/60">
          <time dateTime={post.publishedAt}>{date}</time>
        </p>
        <h2 className="text-h2 font-semibold leading-snug">{post.title}</h2>
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.categories.map((category) => (
              <Tag key={category._id} flat className="bg-[#2e2e2e] text-[#c4c4c4]">
                {category.title}
              </Tag>
            ))}
          </div>
        )}
        {post.excerpt && <p className="text-body font-normal text-cream/70">{post.excerpt}</p>}
        {/* Visible label stays short, but the accessible name includes the post title —
            otherwise a screen reader user has no way to distinguish this link from every
            other "Read full blog post" link on the page. */}
        <Button
          href={`/blog/${post.slug}`}
          variant="secondaryAccent"
          className="mt-1 w-fit"
          aria-label={`${ctaLabel}: ${post.title}`}
        >
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
