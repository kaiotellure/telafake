import type { APIRoute } from "astro";
import {
  createPIX,
  getPayment,
  type CreatePixConfig,
} from "../../services/mercadopago";

export const POST: APIRoute = async ({ request }) => {
  const payload: CreatePixConfig = await request.json();
  const payment = await createPIX(payload);

  return new Response(JSON.stringify(payment));
};

export const GET: APIRoute = async ({ url }) => {
  const uri = new URL(url);

  const id = uri.searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });

  const payment = await getPayment(id);
  return new Response(JSON.stringify(payment));
};
