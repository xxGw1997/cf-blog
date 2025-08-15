import { getAllPosts } from "@/actions/post";
import { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const routes = ["", "/posts"];
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    entries.push({
      url: `${siteUrl}${route}`,
    });
  }

  const posts = await unstable_cache(getAllPosts, [], {
    revalidate: false,
    tags: ["posts"],
  })();

  const postUrls = posts.map((post) => ({
    url: `${siteUrl}/post/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  return [...entries, ...postUrls];
}
