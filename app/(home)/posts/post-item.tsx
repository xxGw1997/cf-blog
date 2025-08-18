import Link from "next/link";
import { format } from "date-fns";

import { PostType } from "@/actions/post";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Highlighter } from "@/components/magicui/highlighter";

const PostItem = ({ post, idx }: { post: PostType; idx: number }) => {
  return (
    <BlurFade key={post.id} delay={idx * 0.1} inView className="mt-1">
      <article className="min-w-[300px] h-full flex-1 rounded-sm px-8 py-5 max-md:px-0 flex max-md:flex-col max-md:items-start gap-5 max-md:gap-0 items-center">
        <div className="flex">
          <Link
            className="font-bold text-lg"
            style={{ viewTransitionName: `blog-title-${post.slug}` }}
            href={`/post/${post.slug}`}
          >
            <Highlighter action="circle" color="#FF9800">
              {post.title}
            </Highlighter>
          </Link>
        </div>
        <div
          className="text-[13px] opacity-70 flex align-bottom pl-2 max-md:pl-0"
          style={{ viewTransitionName: `blog-date-${post.slug}` }}
        >
          {post.publishedAt
            ? format(post.publishedAt, "M月dd日 yyyy")
            : "future"}
        </div>
      </article>
    </BlurFade>
  );
};

export default PostItem;
