import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/utils";
import type { PostSummary } from "@/lib/sanity/types";

type Tone = "light" | "dark";

const toneStyles: Record<
  Tone,
  {
    card: string;
    padding: string;
    date: string;
    tag: string;
    button: "secondaryLight" | "secondaryAccent";
  }
> = {
  light: {
    card: "bg-[rgba(252,252,252,0.25)] text-ink",
    padding: "p-6",
    date: "text-ink/70",
    tag: "bg-[#e6e6e6] text-ink/70",
    button: "secondaryLight",
  },
  dark: {
    card: "text-cream",
    padding: "p-4",
    date: "text-muted-strong",
    tag: "bg-[#2e2e2e] text-[#c4c4c4]",
    button: "secondaryAccent",
  },
};

export function PostCard({
  post,
  tone = "light",
  showImage = true,
}: {
  post: PostSummary;
  tone?: Tone;
  showImage?: boolean;
}) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const ctaLabel = post.ctaLabel ?? "Read more";
  const s = toneStyles[tone];

  return (
    <article
      className={cx(
        "flex h-full w-full flex-col items-start justify-between overflow-hidden rounded-2xl",
        s.padding,
        s.card,
      )}
    >
      <div className="flex w-full flex-col items-start gap-6">
        {showImage && post.mainImage && (
          <div className="relative h-[137px] w-full shrink-0 overflow-hidden rounded-md bg-ink-soft">
            <Image
              src={urlFor(post.mainImage).width(436).height(137).url()}
              alt={post.mainImage.alt ?? post.title}
              fill
              sizes="436px"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col items-start gap-4">
          <p className={cx("text-caption font-mono", s.date)}>
            <time dateTime={post.publishedAt}>{date}</time>
          </p>
          <h3 className="text-h3 font-semibold">{post.title}</h3>
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.categories.map((category) => (
                <Tag key={category._id} flat className={s.tag}>
                  {category.title}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </div>
      <Button
        href={`/blog/${post.slug}`}
        variant={s.button}
        aria-label={`${ctaLabel}: ${post.title}`}
      >
        {ctaLabel}
      </Button>
    </article>
  );
}
