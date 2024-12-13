import { p as products } from '../../chunks/products_oRNW7Rs9.mjs';
import { m as money } from '../../chunks/utils_B7eI5-JE.mjs';
import { s as sendEmbedToWebhook } from '../../chunks/discordwebhook_BjaVtYvQ.mjs';
import { E as EMPTY_PRODUCT, m as mercado, s as session, w as watchPurchase } from '../../chunks/purchase_D7wy5O5a.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const payload = await request.json();
  const product = products.find((x) => x.id == payload.product_id) || EMPTY_PRODUCT;
  const payment = await mercado.createPayment(
    {
      description: `compra de ${product.name}`,
      transaction_amount: product.price,
      payment_method_id: "pix",
      installments: 1,
      payer: {
        email: payload.payer_email
      }
    },
    `${payload.payer_email}-pix-pay-${product.id}-${session}`
  );
  if (payment.error) {
    console.log("[MP] error creating pix:", payment);
    return new Response(JSON.stringify(payment), { status: 400 });
  }
  console.log(
    "[MP] created new pix:",
    money(product.price),
    "for:",
    payload.payer_email
  );
  watchPurchase({
    payment_id: payment.id,
    payment_status: payment.status,
    infos: payload,
    callback() {
      sendEmbedToWebhook("https://discord.com/api/webhooks/1314688649874374778/_Mrgy4E8OAE9MCFx8NDWRQHhGKnX3fKyMSNKX9bsmDmekU0dcBd6szJCXGp4J9WbpcpY", {
        title: `💸 ${money(product.price)} via Tranferência PIX`,
        description: `do produto: **${product.name}**`,
        fields: [
          {
            name: "✍️ Nome do pagador",
            value: payload.payer_name,
            inline: true
          },
          {
            name: "🪪 CPF do pagador",
            value: payload.payer_cpf,
            inline: true
          }
        ],
        footer: { text: payload.payer_email },
        thumbnail: { url: product.image }
      });
    }
  });
  return new Response(
    JSON.stringify({
      id: payment.id,
      kind: "pix",
      status: payment.status,
      interactions: {
        code: payment.point_of_interaction.transaction_data.qr_code,
        qrcode: payment.point_of_interaction.transaction_data.qr_code_base64
      }
    })
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
