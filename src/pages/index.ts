import type { APIRoute } from "astro";

export const ALL: APIRoute = ({}) => {
  return new Response(null, {
    status: 302, // found
    headers: import.meta.env.DEV
      ? {} // do not redirect when in dev mode
      : { Location: "https://www.kiwify.com.br" },
  });
};
