import { p as products } from '../../chunks/utils_Cv9ChJpT.mjs';
import { c as createPIX, g as getPayment } from '../../chunks/mercadopago_IiVcFx1V.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const payload = await request.json();
  const product = products.find((x) => x.id == payload.product_id);
  if (!product) return new Response("product not found", { status: 400 });
  const payment = await createPIX({
    ...payload,
    price: product.price
  });
  return new Response(JSON.stringify(payment));
};
const GET = async ({ url }) => {
  const uri = new URL(url);
  const id = uri.searchParams.get("id");
  if (!id) return new Response("missing query param: id", { status: 400 });
  const payment = await getPayment(id);
  return new Response(JSON.stringify(payment));
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
