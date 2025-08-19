import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isValid } from "date-fns";
import { zhCN } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with and
    .replace(/-{2,}/g, "-"); // Replace multiple - with single -
}

/**
 * 格式化日期为易读的字符串
 * @param date 日期对象、日期字符串或时间戳
 * @param formatString 日期格式字符串，默认为 'yyyy年MM月dd日 HH:mm'
 * @returns 格式化后的日期字符串，如果输入无效则返回空字符串
 */
export function formatDate(
  date: Date | string | number | null | undefined,
  formatString: string = "yyyy年MM月dd日 HH:mm"
): string {
  if (!date) return "";

  // 如果是字符串，尝试转换为日期对象
  const dateObj = typeof date === "string" ? new Date(date) : date;

  // 检查日期是否有效
  if (!isValid(dateObj)) return "";

  // 使用 date-fns 格式化日期，使用中文本地化
  return format(dateObj, formatString, { locale: zhCN });
}

/**
 * 防抖函数
 * @param func 需要防抖的函数
 * @param wait 等待时间（毫秒）
 * @param immediate 是否立即执行（true 表示先执行后等待，false 表示先等待后执行）
 * @returns 经过防抖处理的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 500,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>): void {
    // 清除已有定时器
    if (timeout) {
      clearTimeout(timeout);
    }

    if (immediate) {
      // 立即执行模式
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);

      if (callNow) {
        func(...args);
      }
    } else {
      // 延迟执行模式
      timeout = setTimeout(() => {
        func(...args);
        timeout = null;
      }, wait);
    }
  };
}
