import { twMerge } from "tailwind-merge";

export const cn = twMerge;

export function money(value: number) {
  return "R$ " + value.toFixed(2).toString().replaceAll(".", ",");
}
