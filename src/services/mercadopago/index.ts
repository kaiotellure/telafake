import products from "../../assets/products.json";
import { money } from "../../components/utils";
import { sendEmbedToWebhook } from "../discordwebhook";
import { MercadoPago } from "./lib";
import type { Purchase } from "./purchase";

const mpAccessToken = import.meta.env.SECRET_MP_TOKEN;
console.log("[MP] using token:", mpAccessToken.slice(0, 20) + "...");

export const mercado = new MercadoPago({
  accessToken: import.meta.env.SECRET_MP_TOKEN,
  publicKey: import.meta.env.PUBLIC_MP_KEY,
});
