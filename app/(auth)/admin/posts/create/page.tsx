import CreatePostForm from "@/components/admin/post-form";

const CreatePostPage = () => (
  <CreatePostForm
    formInitValue={{
      title: "",
      desc: "",
      content: "",
      isPublishNow: true,
      publishedAt: new Date(),
    }}
  />
);
export default CreatePostPage;
