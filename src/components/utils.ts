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

export function nameSplit(fullname: string) {
  // remove extras spaces (also trims, thanks to the \B nature)
  // then separete words by spaces
  const splited = fullname.replace(/\B\s+/g, "").split(" ");

  const first = splited.shift();
  const last = splited.join(" ");

  return [first, last];
}

export const cn = twMerge;
