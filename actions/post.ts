"use server";
import z from "zod";
import { eq } from "drizzle-orm";

import { postFormSchema } from "@/types/schema";
import { createDb } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";

export type PostType = {
  id: string;
  slug: string;
  title: string;
  desc: string;
  content: string;
  locale: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

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
    const slug = slugify(data.title);

    const isExistSlug = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug));

    if (isExistSlug.length > 0)
      throw new Error(
        `The slug "${slug}" already exists, please change a different title.`
      );

    await db.insert(posts).values({
      slug,
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

export async function editPost(
  id: string,
  formData: z.infer<typeof postFormSchema>
) {
  const validatedFields = postFormSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const db = createDb();

    const updatedData = {
      ...validatedFields.data,
      slug: slugify(validatedFields.data.title),
      updatedAt: new Date(),
    };
    await db.update(posts).set(updatedData).where(eq(posts.id, id));
  } catch (error) {
    throw error;
  }
}

export async function getAllPosts(): Promise<PostType[]> {
  try {
    const db = createDb();
    return await db.select().from(posts).orderBy(posts.publishedAt);
  } catch (error) {
    return [];
  }
}

export async function getPostById(id: string) {
  try {
    const db = createDb();

    const res = await db.select().from(posts).where(eq(posts.id, id));

    return res[0] || null;
  } catch (error) {
    return null;
  }
}
