import type { APIRoute } from "astro";
import products from "../../assets/products.json";
import { money } from "../../components/utils";
import { sendEmbedToWebhook } from "../../services/discordwebhook";
import { mercado } from "../../services/mercadopago";
import {
  watchPurchase,
  type Purchase,
} from "../../services/mercadopago/purchase";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const payload: Purchase["infos"] = await request.json();

  const product = products.find((x) => x.id == payload.product_id);
  if (!product) return new Response("product not found", { status: 400 });

  const payment = await mercado.createPayment(
    {
      description: `compra de ${product.name}`,
      transaction_amount: product.price,
      payment_method_id: "pix",
      installments: 1,
      payer: {
        email: payload.payer_email,
      },
    },
    payload.payer_email + "-pix-pay-" + product.id,
  );

  if (payment.error) {
    console.log("[MP] error creating pix:", payment);
    return new Response(JSON.stringify(payment), { status: 400 });
  }

  console.log(
    "[MP] created new pix:",
    money(product.price),
    "for:",
    payload.payer_email,
  );

  watchPurchase({
    payment_id: payment.id,
    payment_status: payment.status,
    infos: payload,
    callback() {
      sendEmbedToWebhook(import.meta.env.SECRET_WEBHOOK_PIX, {
        title: `💸 ${money(product.price)} via Tranferência PIX`,
        description: `do produto: **${product.name}**`,
        fields: [
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
        ],
        footer: { text: payload.payer_email },
        thumbnail: { url: product.image },
      });
    },
  });

  return new Response(JSON.stringify(payment));
};
