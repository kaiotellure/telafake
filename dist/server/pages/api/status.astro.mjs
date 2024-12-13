import { q as queryPurchase } from '../../chunks/purchase_D7wy5O5a.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ url }) => {
  const uri = new URL(url);
  const id = uri.searchParams.get("id");
  if (!id) return new Response("missing query param: id", { status: 400 });
  const purchase = queryPurchase(parseInt(id));
  return new Response(
    purchase && JSON.stringify({
      status: purchase.payment_status,
      finished: purchase.finished
    }),
    {
      status: purchase ? 200 : 400
    }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
