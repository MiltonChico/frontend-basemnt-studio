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

// Pill shape shared by the "Main Button" family (big, rounded-full, text-label)
const pill = "rounded-full px-5 py-2.5 text-label tracking-tight";
// Compact shape shared by the "Secondary Button" family (small, 4px radius, text-button-sm)
const compact = "btn-compact text-button-sm font-medium";

const variantClasses: Record<Variant, string> = {
  // "Main Button" in Figma — black pill w/ radial sheen + inner shadow, the "Contact Us" button from the nav
  main: `btn-sheen btn-sheen-dark ${pill}`,
  // Off-white pill w/ radial sheen + inner shadow — the light counterpart
  light: `btn-sheen btn-sheen-light ${pill}`,
  outline: `bg-transparent text-cream border border-line hover:border-accent hover:text-accent ${pill}`,
  active: `bg-accent text-cream hover:bg-accent-soft ${pill}`,
  // "Secondary Button" in Figma — small flat pills, no sheen/shadow, 3 color skins
  secondaryAccent: `btn-compact-accent ${compact}`,
  secondaryLight: `btn-compact-light ${compact}`,
  secondaryGrey: `btn-compact-grey ${compact}`,
};

const base =
  "inline-flex items-center justify-center gap-2 font-mono uppercase transition-colors duration-150";

// Exposes the same visual classes the real <Button> renders with, for cases that need a
// button's *look* without its semantics — e.g. a decorative CTA label inside a card that's
// already one big <Link> (nesting an interactive element there would be invalid HTML/a11y).
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

  return (
    <button
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
