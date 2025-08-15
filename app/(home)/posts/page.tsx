import { getAllPosts } from "@/actions/post";
import { Metadata } from "next";
import PostItem from "./post-item";

export const metadata: Metadata = {
  title: {
    template: "my blogs - xxgw",
    default: "posts",
  },
  description: "将技术上总结的经验、对于事情的感想、平时的碎碎念记录下来。",
};

const PostsPage = async () => {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto px-10 pt-20">
      {posts.length === 0 ? (
        <div>no articles</div>
      ) : (
        <div className="w-2xl max-md:w-auto">
          {posts.map((post, idx) => (
            <PostItem key={post.slug} post={post} idx={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsPage;
