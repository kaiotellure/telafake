import { twMerge } from 'tailwind-merge';

function money(value) {
  return "R$ " + value.toFixed(2).toString().replaceAll(".", ",");
}
function alwaysTwo(number) {
  if (number < 10) return "0" + number;
  return number;
}
function applyTax(total, tax, installments) {
  return total * tax / (1 - (1 + tax) ** -installments);
}
function prettyMinutes(seconds) {
  return `${alwaysTwo(Math.floor(seconds / 60))}:${alwaysTwo(seconds % 60)}`;
}
const cn = twMerge;

export { alwaysTwo as a, applyTax as b, cn as c, money as m, prettyMinutes as p };
