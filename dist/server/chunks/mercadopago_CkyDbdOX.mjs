import { MercadoPagoConfig, Payment, CardToken } from 'mercadopago';
import { p as products, m as money } from './utils_Cv9ChJpT.mjs';

async function sendEmbedToWebhook(url, embed) {
  return;
}

var PAYMENTS_POOL = [];
const client = new MercadoPagoConfig({
  accessToken: "TEST-5860457647630463-120823-70ce04db13dda138906b5504a8066711-521253923",
  options: { timeout: 5e3, idempotencyKey: "initializing" }
});
const payment = new Payment(client);
new CardToken(client);
async function createPIX(config) {
  const body = {
    transaction_amount: config.price,
    description: "this product has no description.",
    payment_method_id: "pix",
    payer: {
      email: config.payer_email
    }
  };
  const requestOptions = {
    idempotencyKey: config.payer_email + "-pix-creation"
  };
  var payres;
  {
    console.log("creating a new pix payment into MP API.");
    payres = await payment.create({ body, requestOptions });
  }
  payres.id && PAYMENTS_POOL.push({
    id: payres.id,
    payload: config
  });
  return payres;
}
async function getPayment(id) {
  for (let i = 0; i < PAYMENTS_POOL.length; i++) {
    const paydata = PAYMENTS_POOL[i];
    if (paydata.id.toString() == id) return paydata;
  }
}
const EMPTY_PRODUCT = {
  image: "https://google.com/favicon.ico",
  name: "DESCONHECIDO",
  price: 0
};
function onPaymentFinished(paydata) {
  const product = products.find((x) => x.id == paydata.payload.product_id) || EMPTY_PRODUCT;
  sendEmbedToWebhook("https://discord.com/api/webhooks/1314688649874374778/_Mrgy4E8OAE9MCFx8NDWRQHhGKnX3fKyMSNKX9bsmDmekU0dcBd6szJCXGp4J9WbpcpY", {
    title: `💸 ${money(product.price)} via Tranferência PIX`,
    description: `do produto: **${product.name}**`,
    fields: [
      {
        name: "✍️ Nome do pagador",
        value: paydata.payload.payer_name,
        inline: true
      },
      {
        name: "🪪 CPF do pagador",
        value: "123.123.123-23",
        inline: true
      }
    ],
    footer: { text: paydata.payload.payer_email },
    thumbnail: { url: product.image }
  });
}
setInterval(() => {
  PAYMENTS_POOL.forEach(async (paydata) => {
    if (paydata.finished) return;
    const updated = await payment.get({ id: paydata.id });
    if (updated.status == "approved") {
      paydata.finished = true;
      onPaymentFinished(paydata);
    }
  });
}, 5e3);

export { EMPTY_PRODUCT as E, createPIX as c, getPayment as g, sendEmbedToWebhook as s };
