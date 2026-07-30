import type { HTMLAttributes } from "react";
import { cx } from "@/lib/utils";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("mx-auto w-full max-w-[1372px] px-4", className)} {...props} />;
}
