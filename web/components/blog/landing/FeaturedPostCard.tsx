import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import type { PostSummary } from "@/lib/sanity/types";


export function FeaturedPostCard({ post }: { post: PostSummary }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const ctaLabel = post.ctaLabel ?? "Read full blog post";

  return (
  
    <article className="relative mx-auto flex w-full max-w-[902px] flex-col gap-4 overflow-hidden rounded-xl border border-line bg-ink-soft/55 p-4 backdrop-blur sm:h-[394px] sm:gap-12 sm:rounded-2xl sm:pt-2 sm:pr-2 sm:pb-2 sm:pl-4 sm:flex-row">
      {post.mainImage && (
        <div className="relative h-[110px] w-full shrink-0 overflow-hidden rounded-md sm:h-full sm:w-[360px] sm:rounded-xl">
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
      <div className="flex flex-col justify-center gap-2 sm:w-[325px] sm:shrink-0 sm:gap-4 sm:p-2">
        <Text as="p" variant="caption" tone="mutedStrong" className="font-mono">
          <time dateTime={post.publishedAt}>{date}</time>
        </Text>
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
        {post.description && (
          <Text as="p" variant="bodyResponsive" tone="muted">
            {post.description}
          </Text>
        )}
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
