import type { APIRoute } from "astro";

export const ALL: APIRoute = ({}) => {
  return new Response(null, {
    status: 302, // found
    headers: { Location: "https://www.kiwify.com.br" },
  });
};
