import type { APIRoute } from "astro";
import { queryPurchase } from "../../services/mercadopago/purchase";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const uri = new URL(url);

  const id = uri.searchParams.get("id");
  if (!id) return new Response("missing query param: id", { status: 400 });

  const purchase = queryPurchase(parseInt(id));

  return new Response(
    purchase &&
      JSON.stringify({
        status: purchase.payment_status,
        finished: purchase.finished,
      }),
    {
      status: purchase ? 200 : 400,
    },
  );
};
