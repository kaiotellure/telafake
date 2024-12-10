async function sendEmbedToWebhook(url, embed) {
  if (!embed.timestamp) embed.timestamp = (/* @__PURE__ */ new Date()).toISOString();
  if (!embed.color) embed.color = 16721020;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      content: "",
      embeds: [embed],
      attachments: []
    })
  });
  response.status >= 400 && console.log("webhook failed:", embed);
}

export { sendEmbedToWebhook as s };
