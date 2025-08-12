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
    <div className="mx-auto px-10 pt-20">
      {posts.length === 0 ? (
        <div>no articles</div>
      ) : (
        <div className="w-2xl">
          {posts.map((post, idx) => (
            <PostItem key={post.slug} post={post} idx={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsPage;
