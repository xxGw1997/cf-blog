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

    const left = (index + 1) * gap + index * width;
    child.style.left = left + "px";
  }

  const containerMaxHeight = Math.max(...nextTops);
  containerDom.style.height = containerMaxHeight + "px";
}

// 使用 forwardRef 转发 ref，让外部可以访问内部方法
export const Masonry = forwardRef<
  MasonryRef,
  {
    cols: number;
    gap: number;
    items: any[];
    render: (item: any, idx: number) => React.ReactNode;
  }
>(({ cols, gap, items, render }, ref) => {
  const containerDiv = useRef<HTMLDivElement>(null);

  // 定义内部更新布局的方法
  const updateLayout = () => {
    if (containerDiv.current) {
      const width = caculateWidth(containerDiv.current, cols, gap);
      setPositions(containerDiv.current, width, cols, gap);
    }
  };

  // 通过 useImperativeHandle 向外部暴露方法
  useImperativeHandle(
    ref,
    () => ({
      updateLayout, // 暴露 updateLayout 方法
    }),
    [cols, gap]
  ); // 依赖变化时更新暴露的方法

  // 原有自动更新逻辑保留
  useEffect(() => {
    updateLayout();
  }, [cols, gap, updateLayout]);

  return (
    <div className="w-[1200px] relative" ref={containerDiv}>
      {items.map((item, idx) => (
        <div className="absolute" key={idx}>
          {render(item, idx)}
        </div>
      ))}
    </div>
  );
});

// 设置组件显示名称（便于调试）
Masonry.displayName = "Masonry";
