"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PostCard } from "../PostCard";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
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
  const gridRef = useRef<HTMLDivElement>(null);
  const animatedIdsRef = useRef<Set<string>>(new Set());
  const previousCategoryRef = useRef(activeCategory);
  const previousHasLoadedMoreRef = useRef(false);

  const filteredPosts = useMemo(() => {
    if (activeCategory === ALL) return posts;
    return posts.filter((post) =>
      post.categories?.some((category) => category.slug === activeCategory),
    );
  }, [posts, activeCategory]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;
  const hasLoadedMore = visibleCount > PAGE_SIZE;

  useGSAP(
    () => {
      const isFirstRun = animatedIdsRef.current.size === 0;

      if (previousCategoryRef.current !== activeCategory) {
        animatedIdsRef.current = new Set();
        previousCategoryRef.current = activeCategory;
        previousHasLoadedMoreRef.current = false;
      }

      const allCards = gsap.utils.toArray<HTMLElement>("[data-post-card]");
      const newCards = allCards.filter(
        (card) => !animatedIdsRef.current.has(card.dataset.postId!),
      );
      newCards.forEach((card) => animatedIdsRef.current.add(card.dataset.postId!));

      const imagesJustRevealed = !previousHasLoadedMoreRef.current && hasLoadedMore;
      previousHasLoadedMoreRef.current = hasLoadedMore;

      if (isFirstRun) return;

      if (newCards.length > 0) {
        gsap.from(newCards, {
          y: 32,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
        });
      }

      if (imagesJustRevealed) {
        const revealedImages = allCards
          .filter((card) => !newCards.includes(card))
          .map((card) => card.querySelector("[data-post-image]"))
          .filter((image): image is HTMLElement => image !== null);

        if (revealedImages.length > 0) {
          gsap.from(revealedImages, {
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
          });
        }
      }
    },
    { scope: gridRef, dependencies: [visiblePosts.length, activeCategory] },
  );

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

        <div ref={gridRef} className="mt-16 flex flex-wrap gap-8">
          {visiblePosts.map((post, index) => {
            const showImage = hasLoadedMore || index < 3;
            return (
              <div
                key={post._id}
                data-post-card
                data-post-id={post._id}
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
          <Text as="p" variant="body" tone="ink70" className="mt-10">
            No posts in this category yet.
          </Text>
        )}

        {visiblePosts.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Button
              type="button"
              variant="main"
              size="lg"
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
