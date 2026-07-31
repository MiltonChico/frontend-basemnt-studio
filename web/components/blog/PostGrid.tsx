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
  const hasLoadedMore = visibleCount > PAGE_SIZE;

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
    <section className="bg-paper pb-16 text-ink">
      <Container>
        <h2 className="max-w-2xl text-h1 font-semibold pt-8 pb-32 sm:pt-24">{heading}</h2>

        <div
          role="group"
          aria-label="Filter posts by category"
          className="mt-8 flex flex-nowrap gap-10 overflow-x-auto scrollbar-hidden"
        >
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

        <div className="mt-10 flex flex-wrap gap-8">
          {visiblePosts.map((post, index) => {
            const showImage = hasLoadedMore || index < 3;
            return (
              <div
                key={post._id}
                className={cx(
                  "w-full sm:w-[436px] sm:shrink-0",
                  showImage ? "sm:h-[400px]" : "sm:h-[250px]",
                )}
              >
                <PostCard post={post} showImage={showImage} />
              </div>
            );
          })}
        </div>

        {visiblePosts.length === 0 && (
          <p className="mt-10 text-body text-ink/70">No posts in this category yet.</p>
        )}

        {visiblePosts.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Button
              type="button"
              variant="main"
              disabled={!hasMore}
              className="disabled:pointer-events-none disabled:opacity-40"
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
        "shrink-0 whitespace-nowrap text-label font-mono uppercase tracking-tight text-ink/70 hover:text-ink",
        active && "text-ink font-bold underline underline-offset-4",
      )}
    >
      {children}
    </button>
  );
}
