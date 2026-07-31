"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FeaturedPostCard } from "@/components/blog/landing/FeaturedPostCard";
import { Container } from "@/components/layout/Container";
import type { PostSummary } from "@/lib/sanity/types";

export function BlogHero({
  heading,
  featuredPost,
}: {
  heading: string;
  featuredPost?: PostSummary;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-heading]", { y: 24, opacity: 0, duration: 0.7 })
        .from("[data-hero-glow]", { opacity: 0, duration: 1 }, "-=0.4")
        .from("[data-hero-card]", { y: 32, opacity: 0, duration: 0.7 }, "-=0.6");
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-ink pb-3 pt-4 text-cream sm:pb-[286px] sm:pt-24"
    >
      <Container>
        <h1 data-hero-heading className="max-w-3xl text-h1 font-semibold">
          {heading}
        </h1>
      </Container>

      {featuredPost && (
        <Container className="relative mt-16 sm:mb-6 mb-14 flow-root sm:mt-24">
          <img
            data-hero-glow
            aria-hidden="true"
            alt=""
            src="/hero-glow.svg"
            className="pointer-events-none absolute left-1/2 top-0 w-[2448px] max-w-none -translate-x-1/2 select-none"
          />

          <div data-hero-card className="relative mt-9 sm:mt-[198px]">
            <FeaturedPostCard post={featuredPost} />
          </div>
        </Container>
      )}
    </section>
  );
}
