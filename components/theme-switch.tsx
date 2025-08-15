"use client";

import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ThemeSwitch = ({ className, onClick: callback }: ButtonProps) => {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  });

  if (!isClient) return "";

  const isAppearanceTransition =
    document &&
    // @ts-expect-error experimental API
    document.startViewTransition &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const toggleTheme = async () => {
    if (!isAppearanceTransition) {
      if (theme === "light") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        if (theme === "light") {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {},
        {
          duration: 500,
          easing: "ease-in",
          pseudoElement:
            theme === "dark"
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <>
      <button
        className={cn(className, "cursor-pointer")}
        onClick={(e) => {
          callback && callback(e);
          setTimeout(() => {
            toggleTheme();
          }, 100);
        }}
      >
        {theme === "light" ? <SunIcon size={24} /> : <MoonIcon size={24} />}
      </button>
    </>
  );
};
