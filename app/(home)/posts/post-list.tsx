"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

// import { PostData } from "~/features/posts/api/use-posts";

import { BlurFade } from "@/components/magicui/blur-fade";



export const PostList = () => {

  
  return (
    <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-10 max-md:justify-center mt-10">
      {/* {posts.map((post, idx) => (
        <BlurFade key={post.meta.id} delay={idx * 0.1} inView>
          <article className="min-w-[300px] h-full flex-1 bg-card rounded-sm shadow-lg transition-shadow duration-500 card-shadow-hover group px-8 py-5 flex flex-col">
            <Link
              className="hover:underline decoration-primary decoration-2 underline-offset-4 font-bold text-lg"
              style={{ viewTransitionName: `blog-title-${post.meta.id}` }}
              href={`/posts/${post.meta.id}`}
            >
              {post.meta.title}
            </Link>
            <span
              className="text-sm"
              style={{ viewTransitionName: `blog-date-${post.meta.id}` }}
            >
              {post.meta.date}
            </span>
            <p className="flex-1 py-3 overflow-hidden">{post.meta.desc}</p>
            <Link className="flex justify-end" href={`/posts/${post.meta.id}`}>
              <div className="group/view flex items-center gap-x-3">
                <ArrowRight className="text-primary opacity-0 group-hover:opacity-100 group-hover/view:animate-move" />
                View
              </div>
            </Link>
          </article>
        </BlurFade>
      ))} */}
    </div>
  );
};
