import { Metadata } from "next";
import { PropsWithChildren } from "react";

import BackgroundLight from "@/components/background-light";
import ActiveSectionContextProvider from "@/components/providers/active-section";
import { Toolbar } from "@/components/header/toolbar";

export const metadata: Metadata = {
  title: {
    template: "%s - xxgw",
    default: "home",
  },
  description: "xxgw's blog",
};

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <ActiveSectionContextProvider>
      <BackgroundLight />
      <Toolbar />
      {children}
    </ActiveSectionContextProvider>
  );
};

export default HomeLayout;
