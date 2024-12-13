import type { APIRoute } from "astro";
import products from "../../assets/products.json";
import { money, nameSplit } from "../../components/utils";
import { mercado, session } from "../../services/mercadopago";
import { EMPTY_PRODUCT } from "../../services/mercadopago/purchase";

export const prerender = false;

export interface PostBoletoPayload {
  product_id: string;
  payer_fullname: string;
  payer_email: string;
  payer_cpf: string;
}

export interface PostBoletoResponse {
  id: number;
  kind: "boleto";
  status: string;
  details: {
    digitable: string;
    pdf_url: string;
  };
}

const staticResponse = {
  id: 1320596996,
  kind: "boleto",
  status: "pending",
  details: {
    digitable: "23793380296060055932628006333307799320000001000",
    pdf_url:
      "https://www.mercadopago.com.br/sandbox/payments/1320596996/ticket?caller_id=1525836996&payment_method_id=bolbradesco&payment_id=1320596996&payment_method_reference_id=6005593228&hash=00bd2fff-824a-4f2d-a9d6-5378ac3613e4",
  },
};

export const POST: APIRoute = async ({ request }) => {
  // while in dev mode, dont spam mp api
  if (import.meta.env.DEV)
    return new Response(JSON.stringify(staticResponse), { status: 302 });

  const payload: PostBoletoPayload = await request.json();

  const product =
    products.find((x) => x.id == payload.product_id) || EMPTY_PRODUCT;

  const [first, last] = nameSplit(payload.payer_fullname);

  const payment = await mercado.createPayment(
    {
      transaction_amount: product.price,
      installments: 1, // cant be more than 1 for boleto payments
      external_reference: session.toString(), // an id, for now a "random" number
      description: "Comprando: " + product.name + " na Kiwify.",
      payment_method_id: "bolbradesco",
      payer: {
        first_name: first,
        last_name: last,
        email: payload.payer_email,
        identification: {
          type: "CPF",
          number: payload.payer_cpf,
        },
      },
    },
    `${payload.payer_email}-boleto-pay-${product.id}-${session}`,
  );

  if (payment.error) {
    console.log("[MP] error creating boleto:", payment);
    return new Response(JSON.stringify(payment), { status: 400 });
  }

  console.log(
    "[MP] created new boleto:",
    money(product.price),
    "for:",
    payload.payer_email,
  );

  // log to discord webhook when this payment has been completed
  /* watchPurchase({
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
  }); */

  return new Response(
    JSON.stringify({
      id: payment.id,
      kind: "boleto",
      status: payment.status,
      details: {
        digitable: payment.transaction_details.digitable_line,
        pdf_url: payment.transaction_details.external_resource_url,
      },
    }),
  );
};
