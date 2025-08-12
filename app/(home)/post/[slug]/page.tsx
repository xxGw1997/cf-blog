import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";

import { formatDate } from "@/lib/utils";
import { getPostBySlug } from "@/actions/post";
import BlogBody from "@/components/blog/blog-body";
import TOC from "@/components/blog/toc";

type PostSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PostSlugPageProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post)
    return {
      title: "Post not found",
      description: "Post not found~",
    };

  return {
    title: post.title,
    description: post.desc,
  };
}

const PostPage = async ({ params }: PostSlugPageProps) => {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <main className="w-3xl mx-auto my-14 px-20 py-10 overflow-x-hidden prose dark:prose-invert prose-code:before:hidden prose-code:after:hidden max-w-none group">
        <h1>{post.title}</h1>
        <p className="mb-8 text-sm opacity-50 -mt-5 flex items-center gap-2">
          <CalendarDays size={18} /> {formatDate(post.publishedAt)}
        </p>
        <TOC className="fixed top-24 bottom-0 left-5 z-50" content={post.content} />
        <BlogBody className="mt-20 group/content" content={post.content} />
      </main>
    </>
  );
};

export default PostPage;
