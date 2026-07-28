const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const config = JSON.parse(fs.readFileSync(path.join(root, "max.config.json"), "utf8"));
const apiBase = process.env.MAX_API_BASE_URL || config.api_base || "https://platform-api2.max.ru";
const webhookUrl = process.env.MAX_WEBHOOK_URL;
const secret = process.env.MAX_WEBHOOK_SECRET;

if (!webhookUrl || !/^https:\/\//i.test(webhookUrl)) {
  console.error("Укажите MAX_WEBHOOK_URL с публичным HTTPS-адресом, например https://site.ru/api/max/webhook");
  process.exit(1);
}

(async () => {
const response = await fetch(`${apiBase}/subscriptions`, {
  method: "POST",
  headers: { Authorization: config.bot_token, "Content-Type": "application/json" },
  body: JSON.stringify({ url: webhookUrl, update_types: ["message_created", "message_callback", "bot_started"], ...(secret ? { secret } : {}) })
});
const result = await response.json().catch(() => ({}));
if (!response.ok) throw new Error(result.message || result.description || "Не удалось подключить webhook MAX");
console.log("Webhook MAX подключён:", result);
})().catch((error) => { console.error(error.message); process.exit(1); });
