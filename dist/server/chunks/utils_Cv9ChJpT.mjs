import { twMerge } from 'tailwind-merge';

const products = [
	{
		id: "znyDR0E",
		name: "SOAP FRIDAY - PROMOÇÃO EXCLUSIVA",
		image: "https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=256/PHgolGxRRL29RnX/SOAP_96d9244ae2274cf681429aef4625e19a.jpg",
		price: 0.01
	}
];

function money(value) {
  return "R$ " + value.toFixed(2).toString().replaceAll(".", ",");
}
const cn = twMerge;

export { cn as c, money as m, products as p };
