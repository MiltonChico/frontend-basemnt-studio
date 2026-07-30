import type { HTMLAttributes } from "react";
import { cx } from "@/lib/utils";

// Single source of truth for the page's shared left/right edge — every section (Navbar,
// BlogHero, PostGrid, Footer) renders its content through this so they all start and end
// at exactly the same x-position instead of each picking its own max-width/padding.
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  // max-w-[1372px] + px-4 (border-box) == 1340px of content once the gutters are
  // subtracted — matches the Navbar pill's rendered width/edges exactly, on every
  // viewport size, not just on desktop where max-w alone happens to dominate.
  return <div className={cx("mx-auto w-full max-w-[1372px] px-4", className)} {...props} />;
}
