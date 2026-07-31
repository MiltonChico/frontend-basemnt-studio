import type { ElementType, HTMLAttributes } from "react";
import { cx } from "@/lib/utils";

type Variant = "h1" | "h2" | "h3" | "body" | "label" | "caption" | "micro" | "eyebrow";
type Tone = "cream" | "ink" | "ink70" | "muted" | "mutedStrong" | "accent";

const variantClasses: Record<Variant, string> = {
  h1: "text-h1 font-semibold",
  h2: "text-h2 font-semibold",
  h3: "text-h3 font-semibold",
  body: "text-body",
  label: "text-label font-mono uppercase tracking-tight",
  caption: "text-caption font-mono",
  micro: "text-micro font-mono uppercase tracking-tight",
  eyebrow: "text-eyebrow font-mono uppercase tracking-tight",
};

const toneClasses: Record<Tone, string> = {
  cream: "text-cream",
  ink: "text-ink",
  ink70: "text-ink/70",
  muted: "text-muted",
  mutedStrong: "text-muted-strong",
  accent: "text-accent",
};

const defaultElement: Record<Variant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  label: "span",
  caption: "p",
  micro: "span",
  eyebrow: "span",
};

export function textClassName(variant: Variant, tone?: Tone, className?: string) {
  return cx(variantClasses[variant], tone && toneClasses[tone], className);
}

type TextProps = {
  variant: Variant;
  tone?: Tone;
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

export function Text({ variant, tone, as, className, ...props }: TextProps) {
  const Component = as ?? defaultElement[variant];
  return <Component className={textClassName(variant, tone, className)} {...props} />;
}
