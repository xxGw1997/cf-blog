"use server";

import { createDb } from "@/lib/db";
import { categories } from "@/lib/db/schema";

export async function getCategoriesTest() {
  const db = createDb();
  
  const data = await db.select().from(categories);

  return data;
}
