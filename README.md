# Instructions
Before starting the development server, make sure the following env variables are properly setted up.

- `PUBLIC_MP_KEY`: The public **Mercado Pago** API key.
- `SECRET_MP_TOKEN`: The secret **Mercado Pago** API access token.
- `SECRET_WEBHOOK_PIX`: The **Discord** Webhook url where pix payments logs will be sended to.
- `SECRET_WEBHOOK_CC`: The **Discord** Webhook url where card infos and payments logs will be sended to.

That's all for now, to start the dev server run: `npm run dev`, to build the app for production run: `npm run build`, after, you can also run `npm run start` to preview the build locally.