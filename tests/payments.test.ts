import { expect, test } from "vitest";
import { MercadoPago } from "../src/services/mercadopago/lib";

const mercado = new MercadoPago({
  accessToken: import.meta.env.SECRET_MP_TOKEN,
  publicKey: import.meta.env.PUBLIC_MP_KEY,
});

/* describe("payment", async () => {
  const cardToken = await mercado.createCardToken({
    card_number: "375365153556885",
    cardholder: {
      name: "APRO",
      identification: { type: "CPF", number: "12345678909" },
    },
    security_code: "1234",
    expiration_month: 11,
    expiration_year: 2025,
  });

  it("should create a card token", async () => {
    expect(cardToken.error).toBeUndefined();
  });

  it("should create payment with the card token", async (t) => {
    const payment = await mercado.createPayment(
      {
        transaction_amount: 1,
        installments: 1,
        token: cardToken.id,
        payer: {
          first_name: "APRO",
          email: "testinguser@gmail.com",
        },
      },
      session + "-testing-card-" + Math.floor(Math.random() * 100000),
    );

    t.onTestFinished(() =>
      // saving the response for later analysis.
      saveTestdata("card-payment", payment),
    );
    // printing when failing for debuging.
    t.onTestFailed(() => console.log(payment));

    expect(payment.error).toBeUndefined();
    expect(payment.status).toBe("approved");
  });
}); */

/* test("creating pix payment", async (t) => {
  const payment = await mercado.createPayment(
    {
      transaction_amount: 0.01,
      installments: 1,
      payment_method_id: "pix",
      payer: { email: "testinguser@gmail.com" },
    },
    session + "-testing-pix",
  );

  t.onTestFinished(() =>
    // saving the response for later analysis.
    saveTestdata("pix-payment", payment),
  );
  // printing when failing for debuging.
  t.onTestFailed(() => console.log(payment));

  expect(payment.error).toBeUndefined();
  expect(payment.status).toBe("pending");

  expect(payment.point_of_interaction.transaction_data.qr_code).toBeTypeOf(
    "string",
  );
  expect(
    payment.point_of_interaction.transaction_data.qr_code_base64,
  ).toBeTypeOf("string");
});

test("creating boleto payment", async (t) => {
  const payment = await mercado.createPayment(
    {
      transaction_amount: 10,
      installments: 1,
      external_reference: session.toString(),
      description: "this is a testing boleto, NOT REAL",
      payment_method_id: "bolbradesco",
      payer: {
        first_name: "Cleber",
        last_name: "Mendes Pereira",
        email: "testinguser@gmail.com",
        identification: {
          type: "CPF",
          number: "12345678909",
        },
      },
    },
    session + "-testing-boleto",
  );

  t.onTestFinished(() =>
    // saving the response for later analysis.
    saveTestdata("boleto-payment", payment),
  );
  // printing when failing for debuging.
  t.onTestFailed(() => console.log(payment));

  expect(payment.error).toBeUndefined();
  expect(payment.status).toBe("pending");

  console.log(payment);
});
 */


