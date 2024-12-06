
import { MercadoPagoConfig, Payment } from "mercadopago";
import { logToWebhook } from "./discordwebhook";

import pix_testdata from "../assets/pix-gerado.json";
import type { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

var PAYMENTS_POOL: { id: number; email: string }[] = [];

const client = new MercadoPagoConfig({
  accessToken: import.meta.env.SECRET_TOKEN,
  options: { timeout: 5000, idempotencyKey: "initializing" },
});

const payment = new Payment(client);

export interface CreatePixConfig {
  price: number;
  email: string;
  name: string;
}

export async function createPIX(config: CreatePixConfig) {
  const body = {
    transaction_amount: config.price,
    description: "this product has no description.",
    payment_method_id: "pix",
    payer: {
      email: config.email,
    },
  };

  const requestOptions = {
    idempotencyKey: config.email + "-pix-creation",
  };

  const payres = !import.meta.env.DEV
    ? pix_testdata
    : await payment.create({ body, requestOptions });

  payres.id &&
    PAYMENTS_POOL.push({
      id: payres.id,
      email: config.email,
    });
}

function onPaymentFinished(payment: PaymentResponse) {
  // PAYMENTS_POOL = PAYMENTS_POOL.filter((x) => x.id != id);
  console.log(payment);
}

setInterval(() => {
  PAYMENTS_POOL.forEach(async (paydata) => {
    const updated = await payment.get({ id: paydata.id });
    console.log(updated.id, updated.status);
    updated.status != "pending" && onPaymentFinished(updated);
  });
}, 5000);

/* logToWebhook(
    import.meta.env.SECRET_PIX_WEBHOOK,
    "Novo pagamento PIX concluído!",
    [
      {
        name: "Nome",
        value: "Cleber Pereira Mendes",
      },
      {
        name: "Email",
        value: "clebinho@gmail.com",
      },
      {
        name: "Produto",
        value: "SOAP FRIDAY",
      },
      {
        name: "Valor",
        value: "R$ 97,00",
      },
    ]
  ); */
