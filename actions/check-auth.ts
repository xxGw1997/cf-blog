import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function checkAuth() {
  const session = await auth();

  if (!session?.user) redirect("/");
}
