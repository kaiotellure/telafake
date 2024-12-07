import type { APIRoute } from "astro";
import products from "../../assets/products.json";

import { createPIX, getPayment } from "../../services/mercadopago";

export interface PostPixPayload {
  product_id: string;
  payer_name: string;
  payer_email: string;
}

export const POST: APIRoute = async ({ request }) => {
  const payload: PostPixPayload = await request.json();

  const product = products.find((x) => x.id == payload.product_id);
  if (!product) return new Response("product not found", { status: 400 });

  const payment = await createPIX({
    ...payload, price: product.price
  });
  
  return new Response(JSON.stringify(payment));
};

export const GET: APIRoute = async ({ url }) => {
  const uri = new URL(url);

  const id = uri.searchParams.get("id");
  if (!id) return new Response("missing query param: id", { status: 400 });

  const payment = await getPayment(id);
  return new Response(JSON.stringify(payment));
};
