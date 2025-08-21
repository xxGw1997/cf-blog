"use server";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { Role, rolePriority } from "@/lib/db/schema";



export async function checkAuth({
  role = "user",
  isRedirect = true,
}: {
  role?: Role;
  isRedirect?: boolean;
}) {
  try {
    const session = await auth();
    const userRole = session?.user?.role;

    if (!userRole || rolePriority[userRole] < rolePriority[role]) {
      if (isRedirect) redirect("/");
      else
        throw new Error(
          `Sorry, you don't have permission to perform this operation.`
        );
    }
  } catch (error) {
    throw error;
  }
}
