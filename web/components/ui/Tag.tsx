import { cx } from "@/lib/utils";

export function Tag({
  children,
  active = false,

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
