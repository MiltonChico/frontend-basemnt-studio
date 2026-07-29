import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cx } from "@/lib/utils";

type Variant = "primary" | "secondary" | "active";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-cream text-ink hover:bg-accent hover:text-cream",
  secondary:
    "bg-transparent text-cream border border-line hover:border-accent hover:text-accent",
  active: "bg-accent text-cream hover:bg-accent-soft",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-label font-mono uppercase tracking-tight transition-colors duration-150";

type CommonProps = {
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button({
  variant = "primary",
  className,
  href,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cx(base, variantClasses[variant], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return (
    <button
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
