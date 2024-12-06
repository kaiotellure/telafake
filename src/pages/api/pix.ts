import type { APIRoute } from 'astro';
import { createPIX, type CreatePixConfig } from '../../services/mercadopago';

export const POST: APIRoute = async ({ request }) => {
    const payload: CreatePixConfig = await request.json();
    const payment = await createPIX(payload);

    return new Response(JSON.stringify(payment));
}