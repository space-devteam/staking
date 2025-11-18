import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num) {
  if (num < 1000) {
    return num.toString();
  }

  const suffixes = ['K+', 'M+', 'B+', 'T+']; // You can extend this for larger numbers
  const suffixIndex = Math.floor(Math.log10(num) / 3) - 1;
  const divisor = Math.pow(10, (suffixIndex + 1) * 3);
  const formattedNumber = (num / divisor).toFixed();

  return `${formattedNumber}${suffixes[suffixIndex]}`;
}