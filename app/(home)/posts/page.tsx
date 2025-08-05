import { Metadata } from "next";

// import { CategorySelect } from "./category-select";
import { PostList } from "./post-list";
import { getCategoriesTest } from "@/actions/test";

export const metadata: Metadata = {
  title: {
    template: "%s - xxgw",
    default: "posts",
  },
  description: "xxgw's blog",
};

const PostsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const category = (await searchParams).category;
  // const posts = await getAllPosts(category);

  const categories = await getCategoriesTest();

  return (
    <div className="mx-auto max-w-5xl px-10 pt-20">
      POST LIST
      <br />
      {JSON.stringify(categories)}
      {/* <CategorySelect /> */}
      {/* <PostList posts={posts ?? []} /> */}
    </div>
  );
};

export default PostsPage;
