import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostHeader } from "@/components/blog/PostHeader";
import { PostBody } from "@/components/blog/PostBody";
import { PostPagination } from "@/components/blog/PostPagination";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import {
  getAdjacentPosts,
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { siteUrl } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `/blog/${slug}`;
  const images = post.mainImage
    ? [urlFor(post.mainImage).width(1200).height(630).url()]
    : undefined;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      siteName: "basement.",
      title: post.title,
      description: post.description,
      url,
      images,
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const categoryIds = post.categories?.map((category) => category._id) ?? [];
  const [{ previous: chronologicalPrevious, next: chronologicalNext }, relatedPosts] =
    await Promise.all([
      getAdjacentPosts(post.publishedAt, post._id),
      getRelatedPosts(categoryIds, post._id),
    ]);
  
  const previous = post.previousPost ?? chronologicalPrevious;
  const next = post.nextPost ?? chronologicalNext;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    mainEntityOfPage: `${siteUrl}/blog/${slug}`,
    image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
    author: post.authors?.map((author) => ({ "@type": "Person", name: author.name })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <PostHeader post={post} />
        <div className="mx-auto max-w-3xl bg-ink px-6 pb-16 text-cream">
          {post.body && <PostBody value={post.body} />}
        </div>
      </article>
      <PostPagination previous={previous} next={next} />
      <RelatedPosts posts={relatedPosts} />
    </>
  );
}
