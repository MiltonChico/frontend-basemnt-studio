"use client";

import { useRef, type PointerEvent } from "react";
import { cx } from "@/lib/utils";

const DRAG_THRESHOLD = 5;

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
  const dragState = useRef({
    isDragging: false,
    dragged: false,
    startX: 0,
    startScrollLeft: 0,
  });

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse" || event.button !== 0) return;
    dragState.current = {
      isDragging: true,
      dragged: false,
      startX: event.clientX,
      startScrollLeft: el.scrollLeft,
    };
    el.setPointerCapture(event.pointerId);
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    const state = dragState.current;
    if (!el || !state.isDragging) return;
    const delta = event.clientX - state.startX;
    if (Math.abs(delta) > DRAG_THRESHOLD) state.dragged = true;
    el.scrollLeft = state.startScrollLeft - delta;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    const state = dragState.current;
    if (!el || !state.isDragging) return;
    state.isDragging = false;
    el.style.cursor = "";
    el.style.userSelect = "";
    if (el.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
  }

  function handleClickCapture(event: React.MouseEvent<HTMLDivElement>) {
    if (dragState.current.dragged) {
      event.preventDefault();
      event.stopPropagation();
      dragState.current.dragged = false;
    }
  }

  return (
    <div
      ref={ref}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={handleClickCapture}
      style={leadingInset ? { paddingLeft: leadingInset } : undefined}
      className={cx("scrollbar-hidden sm:cursor-grab sm:overflow-x-auto", className)}
    >
      {children}
    </div>
  );
}
