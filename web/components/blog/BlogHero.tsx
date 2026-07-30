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
      {/* Shares the navbar's container width (1340px) and left edge */}
      <div className="mx-auto max-w-[1340px]">
        <h1 className="max-w-3xl text-h1 font-semibold">{heading}</h1>
      </div>

      {featuredPost && (
        // This whole block sits in normal flow AFTER the heading (mt-24 below), so the gap
        // is guaranteed regardless of how many lines the heading wraps to — the glow is
        // absolutely positioned relative to THIS wrapper, not the section, so it can never
        // creep up into the heading text above.
        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[420px] w-full rounded-full bg-accent/40 blur-[120px]"
          />

          {/* Centered on the full page width (not the 1340px container) — measured from
              Figma: card left:509 with width:902 implies a 1920px reference frame. */}
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group relative mx-auto mt-16 flex w-full max-w-[902px] flex-col gap-16 overflow-hidden rounded-2xl border border-line bg-ink-soft/80 pt-2 pr-2 pb-2 pl-4 backdrop-blur sm:h-[394px] sm:flex-row"
          >
            {featuredPost.mainImage && (
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl sm:h-full sm:w-[360px] sm:aspect-auto">
                <Image
                  src={urlFor(featuredPost.mainImage).width(720).height(720).url()}
                  alt={featuredPost.mainImage.alt ?? ""}
                  fill
                  sizes="(min-width: 640px) 360px, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            )}
            <div className="flex flex-col justify-center gap-4 p-2">
              {date && <p className="text-caption font-mono text-cream/60">{date}</p>}
              <h2 className="text-h2 font-semibold leading-snug">{featuredPost.title}</h2>
              {featuredPost.categories && featuredPost.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {featuredPost.categories.map((category) => (
                    <Tag key={category._id}>{category.title}</Tag>
                  ))}
                </div>
              )}
              {featuredPost.excerpt && (
                <p className="text-body font-normal text-cream/70">{featuredPost.excerpt}</p>
              )}
              {/* Visually the "secondaryAccent" Button variant, but a plain span: the whole
                  card above is already a <Link>, so a nested interactive element would be
                  invalid HTML (link/button inside a link) and break keyboard/tab order. */}
              <span className="btn-compact btn-compact-accent text-button-sm mt-1 inline-flex w-fit items-center justify-center gap-2 font-mono font-medium uppercase transition-colors duration-150">
                {featuredPost.ctaLabel ?? "Read full blog post"}
              </span>
            </div>
          </Link>
        </div>
      )}
    </section>
  );
}
