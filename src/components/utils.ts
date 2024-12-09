import { twMerge } from "tailwind-merge";

export function money(value: number) {
  return "R$ " + value.toFixed(2).toString().replaceAll(".", ",");
}

export const cn = twMerge;
