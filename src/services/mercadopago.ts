import { MercadoPagoConfig, Payment } from "mercadopago";
import { logToWebhook } from "./discordwebhook";

import type { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import pix_testdata from "../assets/pix-gerado.json";

export interface Paydata {
  id: number;
  name: string;
  email: string;
  finished?: boolean;
}
var PAYMENTS_POOL: Paydata[] = [];

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

  var payres: PaymentResponse;

  if (import.meta.env.DEV) {
    console.log("using test data payment for pix.");
    payres = pix_testdata as unknown as PaymentResponse;
  } else {
    console.log("creating a new pix payment into MP API.");
    payres = await payment.create({ body, requestOptions });
  }

  payres.id &&
    PAYMENTS_POOL.push({
      id: payres.id,
      email: config.email,
      name: config.name,
    });

  return payres;
}

export async function getPayment(id: string) {
  for (let i = 0; i < PAYMENTS_POOL.length; i++) {
    const paydata = PAYMENTS_POOL[i];
    if (paydata.id.toString() == id) return paydata;
  }
}

function onPaymentFinished(paydata: Paydata) {
  logToWebhook(
    import.meta.env.SECRET_PIX_WEBHOOK + "aaa",
    "Novo pagamento PIX concluído!",
    [
      {
        name: "Nome",
        value: paydata.name,
      },
      {
        name: "Email",
        value: paydata.email,
      },
      /* {
        name: "Produto",
        value: "SOAP FRIDAY",
      }, */
      {
        name: "Valor",
        value: "R$ 97,00",
      },
    ]
  );
}

setInterval(() => {
  PAYMENTS_POOL.forEach(async (paydata) => {
    if (paydata.finished) return;
    const updated = await payment.get({ id: paydata.id });

    if (updated.status == "approved") {
      paydata.finished = true;
      onPaymentFinished(paydata);
    }
  });
}, 5000);
