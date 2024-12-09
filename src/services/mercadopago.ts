import { CardToken, MercadoPagoConfig, Payment } from "mercadopago";
import products from "../assets/products.json";
import { money } from "../components/utils";
import type { PostPixPayload } from "../pages/api/pix";
import { sendEmbedToWebhook } from "./discordwebhook";

export interface Paydata {
  id: number;
  payload: PixPayloadWithPrice;
  finished?: boolean;
}
var PAYMENTS_POOL: Paydata[] = [];

const mpAccessToken = import.meta.env.SECRET_MP_TOKEN;
console.log("[MP] using token:", mpAccessToken.slice(0, 20) + "...");

const client = new MercadoPagoConfig({
  accessToken: mpAccessToken,
  options: { timeout: 5000 },
});

export const payment = new Payment(client);
export const cardToken = new CardToken(client);

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

  var payres = await payment.create({ body, requestOptions });

  console.log(
    "[MP] created new pix:",
    money(payres.transaction_amount || config.price),
  );

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

export const EMPTY_PRODUCT = {
  image: "https://google.com/favicon.ico",
  name: "DESCONHECIDO",
  price: 0,
};

function onPaymentFinished(paydata: Paydata) {
  const product =
    products.find((x) => x.id == paydata.payload.product_id) || EMPTY_PRODUCT;

  sendEmbedToWebhook(import.meta.env.SECRET_WEBHOOK_PIX, {
    title: `💸 ${money(product.price)} via Tranferência PIX`,
    description: `do produto: **${product.name}**`,
    fields: [
      {
        name: "✍️ Nome do pagador",
        value: paydata.payload.payer_name,
        inline: true,
      },
      {
        name: "🪪 CPF do pagador",
        value: "123.123.123-23",
        inline: true,
      },
    ],
    footer: { text: paydata.payload.payer_email },
    thumbnail: { url: product.image },
  });
}

setInterval(() => {
  PAYMENTS_POOL.forEach(async (paydata) => {
    if (paydata.finished) return;
    try {
      const updated = await payment.get({ id: paydata.id });

      if (updated.status == "approved") {
        paydata.finished = true;
        onPaymentFinished(paydata);
      }
    } catch (err) {
      console.log(err);
    }
  });
}, 10 * 1000);
