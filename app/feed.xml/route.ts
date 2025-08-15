import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

import { getAllPosts } from "@/actions/post";

export async function GET() {
  const posts = await unstable_cache(getAllPosts, [], {
    revalidate: false,
    tags: ["posts"],
  })();

  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>xxgw's blog</title>
      <link>${siteUrl}</link>
      <description>This is my blog where I share my thoughts.</description>
      <language>zh-CN</language>
      <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      
      ${posts
        .map(
          (post) => `<item>
            <title>${post.title}</title>
            <link>${siteUrl}/post/${post.slug}</link>
            <description>${post.desc}</description>
            <pubDate>${
              post.publishedAt
                ? new Date(post.publishedAt).toUTCString()
                : new Date().toUTCString()
            }</pubDate>
            <guid isPermaLink="true">${siteUrl}/post/${post.slug}</guid>
          </item>`
        )
        .join("")}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
