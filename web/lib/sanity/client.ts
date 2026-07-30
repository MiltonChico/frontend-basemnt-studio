import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "c0507jl1";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // The CDN has its own eventually-consistent edge cache on top of our fetch/webhook
  // revalidation — during active authoring that shows up as "just-published content
  // missing." Querying the origin API directly keeps things simple and immediately
  // consistent; our own revalidate route + fetch tags already handle prod freshness.
  useCdn: false,
});
