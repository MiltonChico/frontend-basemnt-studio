import { cx } from "@/lib/utils";

export function Tag({
  children,
  active = false,
  // "flat" matches the small, unrounded category chip from Figma (bg #2e2e2e or #e6e6e6,
  // 2px horizontal padding, 13px text) used on post cards — a fully separate class set
  // rather than an override, since conflicting Tailwind utilities (rounded-full vs
  // rounded-none, px-2.5 vs px-[2px]) don't reliably cascade in a predictable direction
  // when merged via string concatenation.
  flat = false,
  className,
}: {
  children: React.ReactNode;
  active?: boolean;
  flat?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cx(
        flat
          ? "inline-flex items-center px-[2px] text-caption font-semibold leading-none"
          : "inline-flex items-center rounded-full px-2.5 py-1 text-caption font-semibold uppercase",
        !className && (active ? "bg-accent text-cream" : "bg-ink-soft text-cream/70"),
        className,
      )}
    >
      {children}
    </span>
  );
}
