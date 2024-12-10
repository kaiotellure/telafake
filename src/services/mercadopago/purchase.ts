import { mercado } from ".";
import type { Payment } from "./lib";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

export const EMPTY_PRODUCT = {
  image: "https://google.com/favicon.ico",
  name: "DESCONHECIDO",
  id: "unknown",
  price: 0,
};

export interface Purchase {
  payment_id: number;
  payment_status: Payment["status"];

  infos: {
    product_id: string;
    payer_name: string;
    payer_email: string;
    payer_cpf: string;
  };

  // following: state control props
  finished?: boolean;
  callback: (payment: Payment) => void;
}

const PurchasePool: Purchase[] = [];

export function watchPurchase(data: Purchase) {
  PurchasePool.push(data);
}

export function queryPurchase(payment_id: number) {
  return PurchasePool.find((x) => x.payment_id == payment_id);
}

setInterval(() => {
  PurchasePool.forEach(async (purchase) => {
    // skips successful pix payments
    // skips rejected card payments
    if (purchase.finished) return;

    // fetch new state from mercado api
    const updatedPayment = await mercado.fetchPayment(purchase.payment_id);

    if (updatedPayment.error)
      return console.log(
        "[MP] error fetching payment:",
        purchase.payment_id,
        "got:",
        updatedPayment,
      );

    purchase.payment_status = updatedPayment.status;

    if (updatedPayment.status == "approved") {
      purchase.finished = true;
      purchase.callback(updatedPayment);
    } else if (updatedPayment.status == "rejected") {
      purchase.finished = true;
    }
  });
}, 10 * 1000);
