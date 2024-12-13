import { p as products } from '../../chunks/products_oRNW7Rs9.mjs';
import { n as nameSplit, m as money } from '../../chunks/utils_B7eI5-JE.mjs';
import { E as EMPTY_PRODUCT, m as mercado, s as session } from '../../chunks/purchase_D7wy5O5a.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const payload = await request.json();
  const product = products.find((x) => x.id == payload.product_id) || EMPTY_PRODUCT;
  const [first, last] = nameSplit(payload.payer_fullname);
  const payment = await mercado.createPayment(
    {
      transaction_amount: product.price,
      installments: 1,
      // cant be more than 1 for boleto payments
      external_reference: session.toString(),
      // an id, for now a "random" number
      description: "Comprando: " + product.name + " na Kiwify.",
      payment_method_id: "bolbradesco",
      payer: {
        first_name: first,
        last_name: last,
        email: payload.payer_email,
        identification: {
          type: "CPF",
          number: payload.payer_cpf
        }
      }
    },
    `${payload.payer_email}-boleto-pay-${product.id}-${session}`
  );
  if (payment.error) {
    console.log("[MP] error creating boleto:", payment);
    return new Response(JSON.stringify(payment), { status: 400 });
  }
  console.log(
    "[MP] created new boleto:",
    money(product.price),
    "for:",
    payload.payer_email
  );
  return new Response(
    JSON.stringify({
      id: payment.id,
      kind: "boleto",
      status: payment.status,
      details: {
        digitable: payment.transaction_details.digitable_line,
        pdf_url: payment.transaction_details.external_resource_url
      }
    })
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
