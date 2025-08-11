import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PostType } from "@/actions/post";
import { BlurFade } from "@/components/magicui/blur-fade";

const PostItem = ({ post, idx }: { post: PostType; idx: number }) => {
  return (
    <BlurFade key={post.id} delay={idx * 0.1} inView>
      <article className="min-w-[300px] h-full flex-1 bg-card rounded-sm shadow-lg transition-shadow duration-500 card-shadow-hover group px-8 py-5 flex flex-col">
        <Link
          className="hover:underline decoration-primary decoration-2 underline-offset-4 font-bold text-lg"
          style={{ viewTransitionName: `blog-title-${post.slug}` }}
          href={`/posts/${post.slug}`}
        >
          {post.title}
        </Link>
        <span
          className="text-sm"
          style={{ viewTransitionName: `blog-date-${post.slug}` }}
        >
          {JSON.stringify(post.publishedAt)}
        </span>
        <p className="flex-1 py-3 overflow-hidden">{post.desc}</p>
        <Link className="flex justify-end" href={`/posts/${post.slug}`}>
          <div className="group/view flex items-center gap-x-3">
            <ArrowRight className="text-primary opacity-0 group-hover:opacity-100 group-hover/view:animate-move" />
            View
          </div>
        </Link>
      </article>
    </BlurFade>
  );
};

export default PostItem;
