import Link from "next/link";
import type { PostSummary } from "@/lib/sanity/types";

export function PostPagination({
  previous,
  next,
}: {
  previous?: PostSummary | null;
  next?: PostSummary | null;
}) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Post navigation"
      className="mx-auto flex max-w-5xl items-center justify-between gap-4 border-t border-line px-6 py-8 text-label font-mono text-cream/70"
    >
      {previous ? (
        <Link
          href={`/blog/${previous.slug}`}
          className="rounded-full border border-line px-4 py-2 hover:border-accent hover:text-accent"
        >
          ← {previous.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="rounded-full border border-line px-4 py-2 hover:border-accent hover:text-accent"
        >
          {next.title} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
