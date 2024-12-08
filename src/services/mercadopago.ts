import { MercadoPagoConfig, Payment } from "mercadopago";
import { logToWebhook } from "./discordwebhook";

import pix_testdata from "../assets/pix-gerado.json";
import products from "../assets/products.json";

import type { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import type { PostPixPayload } from "../pages/api/pix";
import { money } from "../components/utils";

export interface Paydata {
  id: number;
  payload: PixPayloadWithPrice;
  finished?: boolean;
}
var PAYMENTS_POOL: Paydata[] = [];

const client = new MercadoPagoConfig({
  accessToken: import.meta.env.SECRET_TOKEN,
  options: { timeout: 5000, idempotencyKey: "initializing" },
});

const payment = new Payment(client);

type PixPayloadWithPrice = PostPixPayload & { price: number };

export async function createPIX(config: PixPayloadWithPrice) {
  const body = {
    transaction_amount: config.price,
    description: "this product has no description.",
    payment_method_id: "pix",
    payer: {
      email: config.payer_email,
    },
  };

  const requestOptions = {
    idempotencyKey: config.payer_email + "-pix-creation",
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
      payload: config,
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
  const product = products.find((x) => x.id == paydata.payload.product_id);

  logToWebhook(
    import.meta.env.SECRET_PIX_WEBHOOK,
    "Novo pagamento PIX concluído!",
    [
      {
        name: "Nome",
        value: paydata.payload.payer_name,
      },
      {
        name: "Email",
        value: paydata.payload.payer_email,
      },
      {
        name: "Produto",
        value: product?.name || "Produto Desconhecido",
      },
      {
        name: "Valor",
        value: money(product?.price || 0),
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
