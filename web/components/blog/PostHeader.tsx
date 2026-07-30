import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { Tag } from "@/components/ui/Tag";
import { Container } from "@/components/layout/Container";
import type { Post } from "@/lib/sanity/types";

export function PostHeader({ post }: { post: Post }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="bg-ink pb-12 pt-8 text-cream">
      <Container>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-label font-mono uppercase tracking-tight text-cream hover:text-accent"
        >
          ← Go back
        </Link>

        <div className="mt-4 border-t border-line" />

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <h1 className="text-h2 font-semibold">{post.title}</h1>
       
          <div className="flex flex-col gap-4">
            {post.description && (
              <p className="text-h3">{post.description}</p>
            )}
            {post.intro && <p className="text-body text-muted">{post.intro}</p>}
          </div>
        </div>

     
        <div className="mt-36 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div aria-hidden="true" className="hidden md:block" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-caption font-semibold leading-none text-cream">
              <span>{date}</span>
              {post.authors && post.authors.length > 0 && (
                <>
                  <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-[#666]" />
                  <span>{post.authors.map((author) => author.name).join(", ")}</span>
                </>
              )}
            </p>
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.categories.map((category) => (
                  <Tag key={category._id} flat className="bg-[#2e2e2e] text-[#e6e6e6]">
                    {category.title}
                  </Tag>
                ))}
              </div>
            )}
          </div>
        </div>

    
        {post.mainImage && (
          <div className="relative mt-8 aspect-[2.9/1] w-full overflow-hidden border border-[rgba(230,230,230,0.2)]">
            <Image
              src={urlFor(post.mainImage).width(1600).height(552).url()}
              alt={post.mainImage.alt ?? post.title}
              fill
              sizes="(min-width: 1024px) 1340px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}
      </Container>
    </header>
  );
}
