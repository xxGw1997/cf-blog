"use client";

import useMasonry from "@/hooks/use-masonry";

export const Masonry = ({ children }: React.PropsWithChildren) => {
  const masonryContainer = useMasonry();

  return (
    <div
      ref={masonryContainer}
      className="grid items-start gap-4 sm:grid-cols-5 md:gap-6"
    >
      {children}
    </div>
  );
};
