import { describe, expect, test } from "vitest";
import { writeFileSync } from "fs";
import { MercadoPago } from ".";

const mp = new MercadoPago({
  accessToken: import.meta.env.SECRET_MP_TOKEN,
  publicKey: import.meta.env.PUBLIC_MP_KEY,
});

describe("custom mp library", async () => {
  const session = Date.now().toString();

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

  test("should create a card token", async (t) => {
    expect(cardToken.error).toBeUndefined();
  });

  test("should create payment with the card token", async (t) => {
    const payment = await mp.createPayment(
      {
        transaction_amount: 1,
        installments: 1,
        token: cardToken.id,
        payer: { email: "test@test.com" },
      },
      session + "-testing-card"
    );

    t.onTestFinished(() =>
      // saving the response for later analysis.
      writeFileSync("testdata/card-rejected.json", JSON.stringify(payment, null, 4))
    );
    // printing when failing for debuging.
    t.onTestFailed(() => console.log(payment));

    expect(payment.error).toBeUndefined();
  });

  test("should create payment with pix", async (t) => {
    const payment = await mp.createPayment(
      {
        transaction_amount: 0.01,
        installments: 1,
        payment_method_id: "pix",
        payer: { email: "cleber12.soumenr@gmail.com" },
      },
      session + "-testing-pix"
    );

    t.onTestFinished(() =>
      // saving the response for later analysis.
      writeFileSync("testdata/pix-pending.json", JSON.stringify(payment, null, 4))
    );
    // printing when failing for debuging.
    t.onTestFailed(() => console.log(payment));

    expect(payment.error).toBeUndefined();
  });
});
