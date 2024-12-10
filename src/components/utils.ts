import { twMerge } from "tailwind-merge";

export function money(value: number) {
  return "R$ " + value.toFixed(2).toString().replaceAll(".", ",");
}

export function alwaysTwo(number: number) {
  if (number < 10) return "0" + number;
  return number;
}

export function applyTax(total: number, tax: number, installments: number) {
  return (total * tax) / (1 - (1 + tax) ** -installments);
}

export function prettyMinutes(seconds: number) {
  return `${alwaysTwo(Math.floor(seconds / 60))}:${alwaysTwo(seconds % 60)}`;
}

export const cn = twMerge;
