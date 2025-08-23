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

/**
 * 将字节数转换为易读的文件大小格式（B、kB、MB、GB、TB）
 * @param bytes 字节数（number类型）
 * @param decimals 保留的小数位数（默认2位）
 * @returns 格式化后的大小字符串（如 "1.50 kB"、"2.30 MB"）
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  // 处理0字节的特殊情况
  if (bytes === 0) return "0 B";

  // 定义单位及换算系数（1024进制）
  const units = ["B", "kB", "MB", "GB", "TB"];
  const k = 1024;

  // 计算最合适的单位索引（通过对数计算）
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // 计算转换后的值并保留指定小数位数
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));

  // 返回格式化后的字符串（单位自动匹配）
  return `${value} ${units[i]}`;
}

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
};
