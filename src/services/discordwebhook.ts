interface Embed {
  title?: string;
  color?: number;
  timestamp?: string;
  description?: string;
  fields: { name: string; value: string; inline?: boolean }[];
  footer?: {
    text: string;
  };
  thumbnail?: {
    url: string;
  };
}

export async function sendEmbedToWebhook(url: string, embed: Embed) {
  if (!embed.timestamp) embed.timestamp = new Date().toISOString();
  if (!embed.color) embed.color = 16721020;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      content: "",
      embeds: [embed],
      attachments: [],
    }),
  });

  response.status >= 400 && console.log("webhook failed:", embed);
}
