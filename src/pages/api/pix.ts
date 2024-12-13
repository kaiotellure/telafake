import type { APIRoute } from "astro";
import products from "../../assets/products.json";
import { money } from "../../components/utils";
import { sendEmbedToWebhook } from "../../services/discordwebhook";
import { mercado, session } from "../../services/mercadopago";
import {
  EMPTY_PRODUCT,
  watchPurchase,
  type Purchase,
} from "../../services/mercadopago/purchase";

export const prerender = false;

export interface PostPixResponse {
  id: number;
  kind: "pix";
  status: string;
  interactions: {
    code: string;
    qrcode: string;
  };
}

export const POST: APIRoute = async ({ request }) => {
  const payload: Purchase["infos"] = await request.json();

  const product =
    products.find((x) => x.id == payload.product_id) || EMPTY_PRODUCT;

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
    `${payload.payer_email}-pix-pay-${product.id}-${session}`,
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

  // log to discord webhook when this payment has been completed
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

  return new Response(
    JSON.stringify({
      id: payment.id,
      kind: "pix",
      status: payment.status,
      interactions: {
        code: payment.point_of_interaction.transaction_data.qr_code,
        qrcode: payment.point_of_interaction.transaction_data.qr_code_base64,
      },
    }),
  );
};
