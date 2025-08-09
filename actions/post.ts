"use server";
import z from "zod";

import { postFormSchema } from "@/types/schema";
import { createDb } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";

export async function createPost(formData: z.infer<typeof postFormSchema>) {
  // TODO: Only admin can create post, check user session role


  const validatedFields = postFormSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const db = createDb();

    const data = validatedFields.data;
    await db.insert(posts).values({
      slug: slugify(data.title),
      title: data.title,
      desc: data.desc,
      content: data.content,
      publishedAt: data.isPublishNow ? new Date() : data.publishedAt,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    throw error;
  }
}

export async function getAllPosts() {
  try {
    const db = createDb();
    return await db.select().from(posts).orderBy(posts.publishedAt);
  } catch (error) {
    return [];
  }
}
