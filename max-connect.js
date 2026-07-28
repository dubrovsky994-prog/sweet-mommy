const fs = require("node:fs");
const path = require("node:path");

const configPath = path.join(__dirname, "max.config.json");
let config;
try {
  const rawConfig = fs.readFileSync(configPath, "utf8");
  try {
    config = JSON.parse(rawConfig);
  } catch {
    const tokenMatch = rawConfig.match(/"bot_token"\s*:\s*"?([^"\r\n,}]+)"?\s*,?/);
    config = { bot_token: tokenMatch?.[1]?.trim() || "", recipient_id: "", recipient_type: "chat" };
  }
} catch { config = {}; }

const token = config.bot_token;
const apiBase = process.env.MAX_API_BASE_URL || config.api_base || "https://platform-api2.max.ru";
if (!token || token.startsWith("ВСТАВЬТЕ_")) {
  console.log("MAX: вставьте токен в файл max.config.json и запустите start-demo.bat снова.");
  process.exit(0);
}

function findRecipient(update) {
  const message = update?.message || {};
  const recipient = message.recipient || update?.recipient || {};
  if (recipient.chat_id !== undefined) return { id: String(recipient.chat_id), type: "chat" };
  if (update?.chat_id !== undefined) return { id: String(update.chat_id), type: "chat" };
  if (recipient.user_id !== undefined) return { id: String(recipient.user_id), type: "user" };
  if (update?.user_id !== undefined) return { id: String(update.user_id), type: "user" };
  return null;
}

(async () => {
  try {
    const response = await fetch(`${apiBase}/updates`, { headers: { Authorization: token } });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || result.description || "MAX API error");
    const updates = Array.isArray(result) ? result : (result.updates || []);
    const recipient = [...updates].reverse().map(findRecipient).find(Boolean);
    if (!recipient) {
      console.log("MAX: не найден чат. Откройте бота, нажмите «Начать», напишите «тест» и перезапустите start-demo.bat.");
      process.exit(0);
    }
    const nextConfig = { ...config, recipient_id: recipient.id, recipient_type: recipient.type };
    fs.writeFileSync(configPath, `${JSON.stringify(nextConfig, null, 2)}\n`, "utf8");
    const recipientParam = recipient.type === "chat" ? "chat_id" : "user_id";
    const testResponse = await fetch(`${apiBase}/messages?${recipientParam}=${encodeURIComponent(recipient.id)}`, {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({ text: "✅ MAX подключён к сайту Sweet Mommy. Заявки и заказы будут приходить сюда." })
    });
    if (!testResponse.ok) throw new Error("получатель найден, но тестовое сообщение не отправилось");
    console.log(`MAX: получатель сохранён (${recipient.type}), тестовое сообщение отправлено.`);
  } catch (error) {
    console.log(`MAX: не удалось получить чат. Проверьте токен и доступ бота. ${error.message}`);
  }
})();
