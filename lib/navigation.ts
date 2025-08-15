"use client";

import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import * as NProgress from "nprogress";
import { useCallback, useEffect } from "react";
import {
  useRouter as useNextRouter,
  usePathname,
  redirect,
} from "next/navigation";

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration

const useRouter = () => {
  const router = useNextRouter();
  const pathname = usePathname();
  useEffect(() => {
    NProgress.done();
  }, [pathname]);
  const replace = useCallback(
    (href: string, options?: NavigateOptions) => {
      if (href !== pathname) {
        NProgress.start();
      }
      router.replace(href, options);
    },
    [router, pathname]
  );

  const push = useCallback(
    (href: string, options?: NavigateOptions) => {
      if (href !== pathname) {
        NProgress.start();
      }
      router.push(href, options);
    },
    [router, pathname]
  );

  return {
    ...router,
    replace,
    push,
  };
};

export { redirect, useRouter, usePathname };
