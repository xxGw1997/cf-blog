import { cn, debounce } from "@/lib/utils";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

// 定义暴露给外部的方法类型
export interface MasonryRef {
  // 手动更新布局的方法
  updateLayout: () => void;
}

function caculateWidth(
  containerDom: HTMLDivElement | null,
  cols: number,
  gap: number
) {
  if (!containerDom) return 0;

  const containerWidth = containerDom.clientWidth;
  const totalGapWidth = (cols - 1) * gap;

  const width = (containerWidth - totalGapWidth) / cols;

  return width;
}

function setPositions(
  containerDom: HTMLDivElement,
  width: number,
  cols: number,
  gap: number
) {
  const nextTops = new Array<number>(cols).fill(0);

  for (let i = 0; i < containerDom.children.length; i++) {
    const child = containerDom.children[i] as HTMLElement;
    const minTop = Math.min(...nextTops);
    child.style.top = minTop + "px";
    child.style.width = width + "px";

    const index = nextTops.indexOf(minTop);

    nextTops[index] += child.getBoundingClientRect().height + gap;

    const left = index * (width + gap);
    child.style.left = left + "px";
  }

  const containerMaxHeight = Math.max(...nextTops);
  containerDom.style.height = containerMaxHeight + "px";
}

// 使用 forwardRef 转发 ref，让外部可以访问内部方法
export const Masonry = forwardRef<
  MasonryRef,
  React.ComponentPropsWithoutRef<"div"> & {
    cols: number[];
    gaps: number[];
    medias: number[];
    items: any[];
    render: (item: any, idx: number) => React.ReactNode;
  }
>(({ cols, gaps, items, medias, render, className }, ref) => {
  const containerDiv = useRef<HTMLDivElement>(null);

  const mediaQueries = medias.map((media) =>
    window.matchMedia(`(min-width: ${media}px)`)
  );
  // 定义内部更新布局的方法
  const updateLayout = () => {
    if (containerDiv.current) {
      let matcheIndex = 0;

      mediaQueries.forEach((mediaQuery) => {
        if (mediaQuery.matches) matcheIndex++;
      });

      const idx = Math.min(mediaQueries.length - 1, Math.max(0, matcheIndex));

      const col = cols[idx];
      const gap = gaps[idx];
      const width = caculateWidth(containerDiv.current, col, gap);
      setPositions(containerDiv.current, width, col, gap);
    }
  };

  // 原有自动更新逻辑保留
  useEffect(() => {
    updateLayout();

    const handleResize = debounce(updateLayout, 150);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cols, gaps, updateLayout]);

  // 通过 useImperativeHandle 向外部暴露方法
  useImperativeHandle(
    ref,
    () => ({
      updateLayout, // 暴露 updateLayout 方法
    }),
    [cols, gaps, updateLayout]
  ); // 依赖变化时更新暴露的方法

  return (
    <div className={cn("w-2xl", className)}>
      <div className="w-full relative" ref={containerDiv}>
        {items.map((item, idx) => (
          <div className="absolute" key={idx}>
            {render(item, idx)}
          </div>
        ))}
      </div>
    </div>
  );
});

// 设置组件显示名称（便于调试）
Masonry.displayName = "Masonry";
