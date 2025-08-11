import { getAllPosts } from "@/actions/post";
import { Metadata } from "next";
import PostItem from "./post-item";

export const metadata: Metadata = {
  title: {
    template: "%s - xxgw",
    default: "posts",
  },
  description: "xxgw's blog",
};

const PostsPage = async () => {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-10 pt-20">
      {posts.length === 0 ? (
        <div>no articles</div>
      ) : (
        <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-10 max-md:justify-center mt-10">
          {posts.map((post, idx) => (
            <PostItem key={post.slug} post={post} idx={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsPage;
