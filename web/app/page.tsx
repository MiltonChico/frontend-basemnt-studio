import { Suspense } from "react";
import { BlogHero } from "@/components/blog/landing/BlogHero";
import { PostGrid } from "@/components/blog/landing/PostGrid";
import { getCategories, getPosts, getSiteSettings } from "@/lib/sanity/queries";

export default async function Home() {
  const [posts, categories, siteSettings] = await Promise.all([
    getPosts(),
    getCategories(),
    getSiteSettings(),
  ]);

  const [featuredPost, ...restPosts] = posts;

  return (
    <>
      <BlogHero
        heading={
          siteSettings?.blogHero ??
          "Research, insights, and the science behind building brands & websites."
        }
        featuredPost={featuredPost}
      />
      <Suspense>
        <PostGrid
          posts={restPosts}
          categories={categories}
          heading={siteSettings?.postGridHeading ?? "Knowledge Is Meant to Be Shared"}
        />
      </Suspense>
    </>
  );
}
