const ENDPOINT = "https://api.mercadopago.com";
class MercadoPago {
  config;
  constructor(config) {
    this.config = config;
  }
  async fetch(options) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.config.accessToken}`
    };
    if (options.idempotencyKey)
      headers["X-Idempotency-Key"] = options.idempotencyKey;
    const response = await fetch(ENDPOINT + options.path, {
      body: options.body && JSON.stringify(options.body),
      method: options.method,
      headers
    });
    return await response.json();
  }
  // theres is probably a anti-fraud system running on theirs server
  // that might be blocking this call from working properly
  // since we're not sending a device.meli parameter
  // containing a device identification token
  async createCardToken(card, idempotencyKey) {
    return await this.fetch({
      path: `/v1/card_tokens?public_key=${this.config.publicKey}`,
      method: "POST",
      idempotencyKey,
      body: card
    });
  }
  async createPayment(options, idempotencyKey) {
    return await this.fetch({
      path: `/v1/payments`,
      method: "POST",
      body: options,
      idempotencyKey
    });
  }
  async fetchPayment(id) {
    return await this.fetch({
      path: `/v1/payments/${id}`,
      method: "GET"
    });
  }
}

const mpAccessToken = "TEST-5860457647630463-120823-70ce04db13dda138906b5504a8066711-521253923";
console.log("[MP] using token:", mpAccessToken.slice(0, 20) + "...");
const mercado = new MercadoPago({
  accessToken: "TEST-5860457647630463-120823-70ce04db13dda138906b5504a8066711-521253923",
  publicKey: "TEST-3ad4df97-7039-4672-bc05-dbab6c804b79"
});
const session = Date.now();

const EMPTY_PRODUCT = {
  image: "https://google.com/favicon.ico",
  name: "DESCONHECIDO",
  id: "unknown",
  price: 0
};
const PurchasePool = [];
function watchPurchase(data) {
  PurchasePool.push(data);
}
function queryPurchase(payment_id) {
  return PurchasePool.find((x) => x.payment_id == payment_id);
}
setInterval(() => {
  PurchasePool.forEach(async (purchase) => {
    if (purchase.finished) return;
    const updatedPayment = await mercado.fetchPayment(purchase.payment_id);
    if (updatedPayment.error)
      return console.log(
        "[MP] error fetching payment:",
        purchase.payment_id,
        "got:",
        updatedPayment
      );
    purchase.payment_status = updatedPayment.status;
    if (updatedPayment.status == "approved") {
      purchase.finished = true;
      purchase.callback(updatedPayment);
    } else if (updatedPayment.status == "rejected") {
      purchase.finished = true;
    }
  });
}, 10 * 1e3);

export { EMPTY_PRODUCT as E, mercado as m, queryPurchase as q, session as s, watchPurchase as w };
