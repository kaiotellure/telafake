import { MercadoPago } from "./lib";

const mpAccessToken = import.meta.env.SECRET_MP_TOKEN;
console.log("[MP] using token:", mpAccessToken.slice(0, 20) + "...");

export const mercado = new MercadoPago({
  accessToken: import.meta.env.SECRET_MP_TOKEN,
  publicKey: import.meta.env.PUBLIC_MP_KEY,
});

export const session = Date.now();
