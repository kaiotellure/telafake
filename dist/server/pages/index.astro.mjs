export { renderers } from '../renderers.mjs';

const ALL = ({}) => {
  return new Response(null, {
    status: 302,
    // found
    headers: { Location: "https://www.kiwify.com.br" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
