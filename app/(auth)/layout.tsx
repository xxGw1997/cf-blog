import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  // TODO: Check user session role

  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <div className="flex flex-col items-center pt-20 md:pt-28 px-4 pb-32">
      {children}
    </div>
  );
};

export default AuthLayout;
