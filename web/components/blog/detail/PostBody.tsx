import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/lib/sanity/image";
import { Text } from "@/components/ui/Text";
import type { PullQuote } from "@/lib/sanity/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 text-h2 font-semibold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-h3 font-semibold">{children}</h3>
    ),
    normal: ({ children }) => (
      <Text as="p" variant="prose" className="mt-4">
        {children}
      </Text>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="underline decoration-accent underline-offset-2 hover:text-accent"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <div className="relative my-8 aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={urlFor(value).width(1200).height(675).url()}
          alt={value.alt ?? "Article image"}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>
    ),
    pullQuote: ({ value }) => (
      <blockquote className="my-10 border-l-2 border-accent pl-6">
        <Text as="p" variant="quote">
          “{value.quote}”
        </Text>
        {(value.attributionName || value.attributionRole) && (
          <footer className="mt-3 text-label font-mono text-muted-strong">
            {value.attributionName}
            {value.attributionRole ? `, ${value.attributionRole}` : ""}
          </footer>
        )}
      </blockquote>
    ),
  },
};

export function PostBody({ value }: { value: (PortableTextBlock | PullQuote)[] }) {
  return (
    <div className="prose-invert max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
