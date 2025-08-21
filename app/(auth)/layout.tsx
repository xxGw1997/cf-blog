import { ReactNode } from "react";

import { checkAuth } from "@/actions/check-auth";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  await checkAuth({ role: "admin" });

  return (
    <div className="flex flex-col items-center pt-20 md:pt-28 px-4 pb-32">
      {children}
    </div>
  );
};

export default AuthLayout;
