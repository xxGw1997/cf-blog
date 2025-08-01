"use client";

import { ThemeProvider, ThemeProviderProps } from "next-themes";

import ActiveSectionContextProvider from "./active-section";

const Providers = ({ children }: ThemeProviderProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <ActiveSectionContextProvider>{children}</ActiveSectionContextProvider>
    </ThemeProvider>
  );
};

export default Providers;
