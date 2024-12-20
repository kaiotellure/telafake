import type { BasicPayment } from ".";
import type { PostBoletoPayload, PostBoletoResponse } from "../../pages/api/boleto";
import type { PostCardPayload } from "../../pages/api/card";
import type { PostPixResponse } from "../../pages/api/pix";
import type { CardToken } from "../../services/mercadopago/lib";
import type { Purchase } from "../../services/mercadopago/purchase";

export async function createPIXPayment(payload: Purchase["infos"]) {
  const response = await fetch("/api/pix", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return (await response.json()) as PostPixResponse;
}

export async function createBoletoPayment(payload: PostBoletoPayload) {
  const response = await fetch("/api/boleto", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return (await response.json()) as PostBoletoResponse;
}

export async function createCardPayment(payload: PostCardPayload) {
  //@ts-expect-error
  const MP = new MercadoPago(import.meta.env.PUBLIC_MP_KEY);

  const token = (await MP.createCardToken({
    cardNumber: payload.card_number.replace(/\D/g, ""),
    cardholderName: payload.payer_name,
    cardExpirationMonth: payload.card_month,
    cardExpirationYear: payload.card_year,
    securityCode: payload.card_cvv,
    identificationType: "CPF",
    identificationNumber: payload.payer_cpf.replace(/\D/g, ""),
  })) as CardToken;

  console.log("generated card token:", token);

  const response = await fetch("/api/card", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      card_token_id: token.id,
    }),
  });

  return (await response.json()) as BasicPayment;
}
