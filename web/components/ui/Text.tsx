import type { ElementType, HTMLAttributes } from "react";
import { cx } from "@/lib/utils";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "bodyResponsive"
  | "label"
  | "caption"
  | "micro"
  | "eyebrow"
  | "prose"
  | "quote";
type Tone = "cream" | "ink" | "ink70" | "muted" | "mutedStrong" | "accent";
type Weight = "normal" | "medium" | "semibold" | "bold";

const variantClasses: Record<Variant, string> = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  body: "text-body",
  bodyResponsive: "text-sm font-normal sm:text-body",
  label: "text-label font-mono uppercase tracking-tight",
  caption: "text-caption",
  micro: "text-micro font-mono uppercase tracking-tight",
  eyebrow: "text-eyebrow font-mono uppercase tracking-tight",
  prose: "text-prose",
  quote: "text-quote",
};

const defaultWeight: Partial<Record<Variant, Weight>> = {
  h1: "semibold",
  h2: "semibold",
  h3: "semibold",
  quote: "semibold",
};

const weightClasses: Record<Weight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
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
  bodyResponsive: "p",
  label: "span",
  caption: "p",
  micro: "span",
  eyebrow: "span",
  prose: "p",
  quote: "p",
};

export function textClassName(
  variant: Variant,
  tone?: Tone,
  className?: string,
  weight?: Weight,
) {
  const resolvedWeight = weight ?? defaultWeight[variant];
  return cx(
    variantClasses[variant],
    resolvedWeight && weightClasses[resolvedWeight],
    tone && toneClasses[tone],
    className,
  );
}

type TextProps = {
  variant: Variant;
  tone?: Tone;
  weight?: Weight;
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

export function Text({ variant, tone, weight, as, className, ...props }: TextProps) {
  const Component = as ?? defaultElement[variant];
  return <Component className={textClassName(variant, tone, className, weight)} {...props} />;
}
