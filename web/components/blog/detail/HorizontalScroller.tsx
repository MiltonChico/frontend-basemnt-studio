"use client";

import { useRef, type WheelEvent } from "react";
import { cx } from "@/lib/utils";

export function HorizontalScroller({
  children,
  className,
  leadingInset,
}: {
  children: React.ReactNode;
  className?: string;
  leadingInset?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const canScrollX = el.scrollWidth > el.clientWidth;
    if (!canScrollX) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    el.scrollLeft += event.deltaY;
    event.preventDefault();
  }

  return (
    <div
      ref={ref}
      onWheel={handleWheel}
      style={leadingInset ? { paddingLeft: leadingInset } : undefined}
      className={cx("scrollbar-hidden sm:overflow-x-auto", className)}
    >
      {children}
    </div>
  );
}
