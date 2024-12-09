import { expect, test } from "vitest";
import { MercadoPago } from ".";

test("createCardToken should return an card-token id", async (t) => {
  const mp = new MercadoPago({
    accessToken: import.meta.env.SECRET_MP_TOKEN,
    publicKey: import.meta.env.PUBLIC_MP_KEY,
  });

  const cardToken = await mp.createCardToken({
    card_number: "379256003445765",
    cardholder: {
      name: "Cleber Mendes del Rey",
      identification: { type: "CPF", number: "28940393791" },
    },
    security_code: "4321",
    expiration_month: 3,
    expiration_year: 2029,
  });

  expect(cardToken.id).toBeDefined();
});
