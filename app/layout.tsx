import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/components/providers/theme";
import SiteLogo from "@/components/site-logo";
import { ThemeSwitch } from "@/components/theme-switch";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "@/components/top-loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - xxgw",
    default: "xxgw",
  },
  description: "xxgw's blog",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col relative`}
      >
        <NextTopLoader />
        <ThemeProvider>
          <Toaster />
          <SiteLogo />
          <ThemeSwitch className="fixed right-5 top-5 hidden md:flex" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
