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

  return {
    title: post.title,
    description: post.description,
    openGraph: post.mainImage
      ? { images: [urlFor(post.mainImage).width(1200).height(630).url()] }
      : undefined,
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

  return (
    <article>
      <PostHeader post={post} />
      <div className="mx-auto max-w-3xl bg-ink px-6 pb-16 text-cream">
        {post.body && <PostBody value={post.body} />}
      </div>
      <PostPagination previous={previous} next={next} />
      <RelatedPosts posts={relatedPosts} />
    </article>
  );
}
