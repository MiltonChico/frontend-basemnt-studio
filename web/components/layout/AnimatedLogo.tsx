"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function AnimatedLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.6 } });
      tl.from("[data-logo-left]", { y: -48, opacity: 0 }).from(
        "[data-logo-right]",
        { y: -48, opacity: 0 },
        "-=0.35",
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} aria-hidden="true" className="relative h-[46px] w-[123px] shrink-0">
      <div data-logo-left className="absolute inset-0 [clip-path:inset(0_50%_0_0)]">
        <Image src="/logo.svg" alt="" width={123} height={46} priority />
      </div>
      <div data-logo-right className="absolute inset-0 [clip-path:inset(0_0_0_50%)]">
        <Image src="/logo.svg" alt="" width={123} height={46} priority />
      </div>
    </div>
  );
}
