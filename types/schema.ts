import z from "zod";

export const postFormSchema = z
  .object({
    title: z
      .string()
      .min(1, {
        error: "请填写文章标题",
      })
      .max(30, {
        error: "文章标题最多不能超过30个字符.",
      }),
    desc: z.string().min(1, { error: "请填写描述" }).max(50, {
      error: "描述最多不能超过50个字符.",
    }),
    content: z.string().min(1, { error: "请填写文章内容" }),
    isPublishNow: z.boolean(),
    publishedAt: z.date().optional(),
  })
  .refine(
    (data) => {
      if (!data.isPublishNow && !data.publishedAt) {
        return false;
      }
      return true;
    },
    {
      error: "请选择发布时间",
      path: ["publishedAt"],
    }
  );
