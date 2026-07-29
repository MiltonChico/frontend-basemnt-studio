import { cx } from "@/lib/utils";

export function Tag({
  children,
  active = false,
  className,
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-caption font-semibold uppercase",
        active ? "bg-accent text-cream" : "bg-ink-soft text-cream/70",
        className,
      )}
    >
      {children}
    </span>
  );
}
