import { Metadata } from "next";
import React, { PropsWithChildren } from "react";

import { Toolbar } from "@/components/header/toolbar";

export const metadata: Metadata = {
  title: {
    template: "%s - xxgw",
    default: "home",
  },
  description: "xxgw's blog",
};

const PostLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Toolbar />
      {children}
    </>
  );
};

export default PostLayout;
