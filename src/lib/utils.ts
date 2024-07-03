import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const readingTime = (characterCount: number) => {
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(characterCount / wordsPerMinute);

  return readingTime;
};
