import { twMerge } from "tailwind-merge";

export const cn = twMerge;

export function hash(from: string) {
  var hash = 0,
    i,
    chr;
  if (from.length === 0) return hash;
  for (i = 0; i < from.length; i++) {
    chr = from.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
