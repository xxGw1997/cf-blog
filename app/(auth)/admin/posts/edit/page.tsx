import { redirect } from "next/navigation";

import { getPostById } from "@/actions/post";

import CreatePostForm from "@/components/admin/post-form";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const EditPostPage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const id = searchParams.id;

  if (!id) redirect("/admin/posts");

  const post = await getPostById(id);

  if (!post) redirect("/admin/posts");

  return (
    <CreatePostForm
      formInitValue={{
        id: post.id,
        title: post.title,
        desc: post.desc,
        content: post.content,
        isPublishNow: false,
        publishedAt: post.publishedAt || new Date(),
      }}
    />
  );
};

export default EditPostPage;
