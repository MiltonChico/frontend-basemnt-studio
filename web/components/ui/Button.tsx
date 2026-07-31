import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cx } from "@/lib/utils";

type Variant =
  | "main"
  | "light"
  | "outline"
  | "active"
  | "secondaryAccent"
  | "secondaryLight"
  | "secondaryGrey";

type Size = "md" | "lg";

const pillSizes: Record<Size, string> = {
  md: "rounded-full px-5 py-2.5 text-label tracking-tight",
  lg: "rounded-full px-8 py-4 text-label tracking-tight",
};
const compact = "btn-compact text-button-sm font-medium";

const pillVariants: Record<"main" | "light" | "outline" | "active", string> = {
  main: "btn-sheen btn-sheen-dark",
  light: "btn-sheen btn-sheen-light",
  outline:
    "bg-transparent text-cream border border-line hover:border-accent hover:text-accent",
  active: "bg-accent text-cream hover:bg-accent-soft",
};

const compactVariants: Record<"secondaryAccent" | "secondaryLight" | "secondaryGrey", string> = {
  secondaryAccent: "btn-compact-accent",
  secondaryLight: "btn-compact-light",
  secondaryGrey: "btn-compact-grey",
};

const base =
  "inline-flex items-center justify-center gap-2 font-mono uppercase transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed";

export function buttonClassName(
  variant: Variant = "main",
  className?: string,
  size: Size = "md",
) {
  if (variant in compactVariants) {
    return cx(base, compactVariants[variant as keyof typeof compactVariants], compact, className);
  }
  return cx(
    base,
    pillVariants[variant as keyof typeof pillVariants],
    pillSizes[size],
    className,
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button({
  variant = "main",
  size = "md",
  className,
  href,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = buttonClassName(variant, className, size);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={buttonProps.type ?? "button"}
      className={classes}
      {...buttonProps}
    />
  );
}
