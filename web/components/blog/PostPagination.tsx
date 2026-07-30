import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import type { PostSummary } from "@/lib/sanity/types";

function shortTitle(title: string) {
  const [head] = title.split(":");
  return head.trim();
}

export function PostPagination({
  previous,
  next,
}: {
  previous?: PostSummary | null;
  next?: PostSummary | null;
}) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="Post navigation" className="bg-ink text-cream">
      <Container className="flex items-center justify-between gap-8 py-8">
        {previous ? (
          <div className="flex items-center gap-4">
         
            <Button
              href={`/blog/${previous.slug}`}
              variant="secondaryGrey"
              aria-label={`Previous: ${previous.title}`}
            >
              Previous
            </Button>
            <span className="text-label font-mono uppercase tracking-tight text-cream">
              {shortTitle(previous.title)}
            </span>
          </div>
        ) : (
          <span />
        )}
        {next ? (
          <div className="flex items-center gap-4">
            <span className="text-label font-mono uppercase tracking-tight text-cream">
              {shortTitle(next.title)}
            </span>
            <Button
              href={`/blog/${next.slug}`}
              variant="secondaryGrey"
              aria-label={`Next: ${next.title}`}
            >
              Next
            </Button>
          </div>
        ) : (
          <span />
        )}
      </Container>
    </nav>
  );
}
