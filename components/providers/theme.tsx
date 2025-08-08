"use client";

import { ThemeProvider, ThemeProviderProps } from "next-themes";

const Providers = ({ children }: ThemeProviderProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
};

export default Providers;
