import { client } from "./client";
import type { Category, Post, PostSummary, SiteSettings } from "./types";

const postSummaryProjection = `
  _id,
  title,
  "slug": slug.current,
  "description": excerpt,
  mainImage,
  publishedAt,
  ctaLabel,
  categories[]->{_id, title, "slug": slug.current}
`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      title,
      blogHero,
      postGridHeading,
      navLinks,
      contactEmail,
      footerColumns,
      footerCopyrightHolder,
      footerMembershipLabel,
      socialLinks
    }`,
    {},
    { next: { tags: ["siteSettings"], revalidate: 3600 } },
  );
}

export async function getPosts(): Promise<PostSummary[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc){${postSummaryProjection}}`,
    {},
    { next: { tags: ["post"], revalidate: 3600 } },
  );
}

export async function getCategories(): Promise<Category[]> {
  return client.fetch(
    `*[_type == "category"] | order(title asc){_id, title, "slug": slug.current}`,
    {},
    { next: { tags: ["category"], revalidate: 3600 } },
  );
}

export async function getPostSlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`,
    {},
    { next: { tags: ["post"], revalidate: 3600 } },
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      ${postSummaryProjection},
      subtitle,
      intro,
      displayNumber,
      body,
      authors[]->{_id, name, role, image, "slug": slug.current},
      previousPost->{${postSummaryProjection}},
      nextPost->{${postSummaryProjection}}
    }`,
    { slug },
    { next: { tags: ["post", `post:${slug}`], revalidate: 3600 } },
  );
}

export async function getAdjacentPosts(
  publishedAt: string,
  currentId: string,
): Promise<{ previous: PostSummary | null; next: PostSummary | null }> {
  const [previous, next] = await Promise.all([
    client.fetch<PostSummary | null>(
      `*[_type == "post" && publishedAt < $publishedAt && _id != $currentId] | order(publishedAt desc)[0]{${postSummaryProjection}}`,
      { publishedAt, currentId },
      { next: { tags: ["post"], revalidate: 3600 } },
    ),
    client.fetch<PostSummary | null>(
      `*[_type == "post" && publishedAt > $publishedAt && _id != $currentId] | order(publishedAt asc)[0]{${postSummaryProjection}}`,
      { publishedAt, currentId },
      { next: { tags: ["post"], revalidate: 3600 } },
    ),
  ]);
  return { previous, next };
}

export async function getRelatedPosts(
  categoryIds: string[],
  currentId: string,
): Promise<PostSummary[]> {
  if (categoryIds.length === 0) return [];
  return client.fetch(
    `*[_type == "post" && _id != $currentId && count((categories[]->_id)[@ in $categoryIds]) > 0] | order(publishedAt desc)[0...6]{${postSummaryProjection}}`,
    { currentId, categoryIds },
    { next: { tags: ["post"], revalidate: 3600 } },
  );
}
