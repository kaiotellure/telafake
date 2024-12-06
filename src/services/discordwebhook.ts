export async function logToWebhook(
  url: string,
  title: string,
  fields: { name: string; value: string }[]
) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      content: null,
      embeds: [
        {
          title: title,
          fields: fields,
          color: 2424691,
        },
      ],
      attachments: [],
    }),
  });

  console.log("webhook got:", response.status);
}
