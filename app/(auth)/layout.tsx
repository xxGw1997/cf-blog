import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  // TODO Whether user session has auth

  return (
    <div className="flex flex-col items-center pt-20 md:pt-28 px-4 pb-32">
      {children}
    </div>
  );
};

export default AuthLayout;
