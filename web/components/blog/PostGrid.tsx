"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PostCard } from "./PostCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import type { Category, PostSummary } from "@/lib/sanity/types";
import { cx } from "@/lib/utils";

const PAGE_SIZE = 6;
const ALL = "all";

export function PostGrid({
  posts,
  categories,
  heading,
}: {
  posts: PostSummary[];
  categories: Category[];
  heading: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? ALL;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredPosts = useMemo(() => {
    if (activeCategory === ALL) return posts;
    return posts.filter((post) =>
      post.categories?.some((category) => category.slug === activeCategory),
    );
  }, [posts, activeCategory]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  function selectCategory(slug: string) {
    setVisibleCount(PAGE_SIZE);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === ALL) {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    const query = params.toString();
    router.push(query ? `/?${query}` : "/", { scroll: false });
  }

  return (
    // pt-0 at sm+: the gap above this section is owned entirely by BlogHero's pb-[286px]
    <section className="bg-paper pt-16 pb-16 text-ink sm:pt-0">
      <Container>
        <h2 className="max-w-2xl text-h1 font-semibold pt-24 pb-32">{heading}</h2>

        <div role="group" aria-label="Filter posts by category" className="mt-8 flex flex-wrap gap-10">
          <FilterButton
            active={activeCategory === ALL}
            onClick={() => selectCategory(ALL)}
          >
            All posts
          </FilterButton>
          {categories.map((category) => (
            <FilterButton
              key={category._id}
              active={activeCategory === category.slug}
              onClick={() => selectCategory(category.slug)}
            >
              {category.title}
            </FilterButton>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        {visiblePosts.length === 0 && (
          <p className="mt-10 text-body text-ink/60">No posts in this category yet.</p>
        )}

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <Button
              type="button"
              variant="main"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            >
              Load more
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "text-label font-mono uppercase tracking-tight text-ink/50 hover:text-ink",
        active && "text-ink underline underline-offset-4",
      )}
    >
      {children}
    </button>
  );
}
