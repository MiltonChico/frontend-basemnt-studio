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

const pill = "rounded-full px-5 py-2.5 text-label tracking-tight";
const compact = "btn-compact text-button-sm font-medium";

const variantClasses: Record<Variant, string> = {
  main: `btn-sheen btn-sheen-dark ${pill}`,
  light: `btn-sheen btn-sheen-light ${pill}`,
  outline: `bg-transparent text-cream border border-line hover:border-accent hover:text-accent ${pill}`,
  active: `bg-accent text-cream hover:bg-accent-soft ${pill}`,
  secondaryAccent: `btn-compact-accent ${compact}`,
  secondaryLight: `btn-compact-light ${compact}`,
  secondaryGrey: `btn-compact-grey ${compact}`,
};

const base =
  "inline-flex items-center justify-center gap-2 font-mono uppercase transition-colors duration-150";

export function buttonClassName(variant: Variant = "main", className?: string) {
  return cx(base, variantClasses[variant], className);
}

type CommonProps = {
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button({
  variant = "main",
  className,
  href,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = buttonClassName(variant, className);

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
