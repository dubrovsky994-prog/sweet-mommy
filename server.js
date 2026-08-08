const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const reviewsFile = path.join(root, "reviews.json");
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp" };
const catalog = {
  "gala-bouquet": { title: "Гала-букет «Пионы»", price: 4500 },
  "socvetie-krasoty": { title: "Соцветие красоты", price: 2000 },
  "roses-march": { title: "Букет роз на 8 марта", price: 5500 },
  "flowering-worlds": { title: "Цветущие миры", price: 2900 },
  perseida: { title: "Персеида", price: 2900 },
  fantasmagoria: { title: "Фантасмагория", price: 3800 },
  "pandora-bouquet": { title: "Букет Пандоры", price: 4500 },
  "spring-announcement": { title: "Анонс весны", price: 2950 },
  "eternal-romance": { title: "Вечный роман", price: 6030 },
  "gourmet-bouquet": { title: "Гурман", price: 3500 },
  "spring-breath": { title: "Дыхание весны", price: 5200 },
  "venus-kiss-basket": { title: "Корзина «Поцелуй Венеры»", price: 7349 },
  "neon-dance": { title: "Неоновый танец", price: 2950 },
  "unsolved-puzzle": { title: "Неразгаданная головоломка", price: 16200 },
  "ode-to-aphrodite": { title: "Ода Афродите", price: 14850 },
  "parisian-chic": { title: "Парижский шик", price: 3500 },
      "paradise-garden": { title: "Райский сад", price: 5000 },
      "paris-date": { title: "Свидание в Париже", price: 4600 },
      "neon-pink-chrysanthemum": { title: "Неоновая хризантема", price: 2400 },
      "boundless-gratitude": { title: "Безмерная благодарность", price: 6800 },
      "spring-kaleidoscope": { title: "Весенний калейдоскоп", price: 2970 },
      "tulips-march": { title: "Тюльпаны на 8 марта", price: 3500 },
      "winter-flower-whisper": { title: "Шелест зимних цветов", price: 4770 }
};
const deliveryPrices = { penza_5: 250, penza_10: 350, penza_15: 500, serdobsk_5: 250, serdobsk_10: 350, serdobsk_15: 500 };
const deliveryLabels = { penza_5: "Пенза и район · до 5 км", penza_10: "Пенза и район · 5–10 км", penza_15: "Пенза и район · 10–15 км", serdobsk_5: "Сердобск · до 5 км", serdobsk_10: "Сердобск · 5–10 км", serdobsk_15: "Сердобск · 10–15 км" };
const PREPARATION_HOURS = 12;
const DELIVERY_OPEN_HOUR = 9;
const DELIVERY_CLOSE_HOUR = 20;
const DELIVERY_STEP_MINUTES = 30;

function deliveryDateTime(dateValue, slotValue) {
  if (!dateValue || !slotValue) return null;
  const [year, month, day] = String(dateValue).split("-").map(Number);
  const [hours, minutes] = String(slotValue).split(/[–-]/)[0].trim().split(":").map(Number);
  if (![year, month, day, hours, minutes].every(Number.isFinite)) return null;
  if (
    hours < DELIVERY_OPEN_HOUR ||
    hours > DELIVERY_CLOSE_HOUR ||
    minutes < 0 ||
    minutes >= 60 ||
    minutes % DELIVERY_STEP_MINUTES !== 0 ||
    (hours === DELIVERY_CLOSE_HOUR && minutes !== 0)
  ) return null;
  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

function normalizeOrder(payload) {
  const requestedItems = Array.isArray(payload.items) ? payload.items : [];
  const items = requestedItems.map((item) => {
    const product = catalog[item?.id];
    const quantity = Number(item?.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) throw new Error("В заказе есть некорректный товар или количество");
    return { id: item.id, title: product.title, price: product.price, quantity };
  });
  if (!items.length) throw new Error("Корзина пуста");
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryZone = payload.delivery_zone;
  if (!Object.hasOwn(deliveryPrices, deliveryZone)) throw new Error("Для адресов дальше 15 км стоимость доставки рассчитывается индивидуально в MAX или Telegram до онлайн-оплаты");
  const deliveryAt = deliveryDateTime(payload.delivery_date, payload.delivery_slot);
  if (!deliveryAt || deliveryAt.getTime() < Date.now() + PREPARATION_HOURS * 60 * 60 * 1000) throw new Error("Дата доставки должна учитывать минимум 12 часов на приготовление букета");
  const deliveryPrice = deliveryPrices[deliveryZone];
  return { ...payload, items, subtotal, delivery_price: deliveryPrice, total: subtotal + deliveryPrice };
}

// YooKassa expects receipt item quantity as a JSON number (for example 1.000),
// not a string such as "1". Keep the value numeric before it is serialized.
function receiptQuantity(value) {
  const quantity = Number(value);
  if (!Number.isFinite(quantity) || quantity <= 0 || quantity > 99) {
    throw new Error("Не удалось сверить количество товаров для чека. Обновите корзину и попробуйте ещё раз.");
  }
  return Number(quantity.toFixed(3));
}

function readMaxConfig() {
  try {
    const rawMaxConfig = fs.readFileSync(path.join(root, "max.config.json"), "utf8");
    try { return JSON.parse(rawMaxConfig); } catch {
      const tokenMatch = rawMaxConfig.match(/"bot_token"\s*:\s*"?([^"\r\n,}]+)"?\s*,?/);
      const recipientMatch = rawMaxConfig.match(/"recipient_id"\s*:\s*"?([^"\r\n,}]*)/);
      const typeMatch = rawMaxConfig.match(/"recipient_type"\s*:\s*"?([^"\r\n,}]*)/);
      return { bot_token: tokenMatch?.[1]?.trim() || "", recipient_id: recipientMatch?.[1]?.trim() || "", recipient_type: typeMatch?.[1]?.trim() || "chat" };
    }
  } catch { return {}; }
}

function maxSetting(name, configName) { return process.env[name] || readMaxConfig()[configName]; }

function validateMaxInitData(initData) {
  if (!initData) return null;
  const token = maxSetting("MAX_BOT_TOKEN", "bot_token");
  if (!token) return null;
  const params = new URLSearchParams(initData);
  const receivedHash = params.get("hash");
  if (!receivedHash) return null;
  const checkString = [...params.entries()].filter(([key]) => key !== "hash").sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => `${key}=${value}`).join("\n");
  const secret = crypto.createHmac("sha256", "WebAppData").update(token).digest();
  const calculatedHash = crypto.createHmac("sha256", secret).update(checkString).digest("hex");
  if (calculatedHash !== receivedHash) return null;
  const authDate = Number(params.get("auth_date"));
  if (!authDate || Date.now() / 1000 - authDate > 86400) return null;
  let user = {};
  let chat = {};
  try { user = JSON.parse(params.get("user") || "{}"); } catch {}
  try { chat = JSON.parse(params.get("chat") || "{}"); } catch {}
  return { userId: user.id ? String(user.id) : "", chatId: chat.id ? String(chat.id) : user.id ? String(user.id) : "" };
}

const followupsFile = path.join(root, "followups.json");
function readFollowups() {
  try { const data = JSON.parse(fs.readFileSync(followupsFile, "utf8")); return Array.isArray(data) ? data : []; } catch { return []; }
}
function writeFollowups(data) { try { fs.writeFileSync(followupsFile, `${JSON.stringify(data, null, 2)}\n`, "utf8"); } catch {} }
const notifiedMaxPaymentIds = new Set();
const notifiedSmsPaymentIds = new Set();
function rememberNotification(set, key) {
  set.add(key);
  if (set.size > 500) set.delete(set.values().next().value);
}
function scheduleReviewFollowup(order) {
  if (!order.chat_id) return;
  const followups = readFollowups();
  followups.push({ id: crypto.randomUUID(), order_id: order.order_id, chat_id: order.chat_id, due_at: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), sent: false });
  writeFollowups(followups.slice(-500));
}

function json(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 700000) reject(new Error("payload too large"));
    });
    req.on("end", () => {
      try { resolve(JSON.parse(body || "{}")); } catch { reject(new Error("invalid json")); }
    });
    req.on("error", reject);
  });
}

function readReviews() {
  try {
    const reviews = JSON.parse(fs.readFileSync(reviewsFile, "utf8"));
    return Array.isArray(reviews) ? reviews : [];
  } catch { return []; }
}

function writeReviews(reviews) {
  fs.writeFileSync(reviewsFile, `${JSON.stringify(reviews, null, 2)}\n`, "utf8");
}

function reviewPhotoData(photo) {
  if (!photo || typeof photo.data !== "string") return "";
  if (!/^data:image\/(jpeg|png|webp);base64,/i.test(photo.data) || photo.data.length > 520000) return "";
  return photo.data;
}

function requestedReviewPath(url) { return (url || "").split("?")[0] === "/api/reviews"; }

function paymentMetadataText(value, maxLength = 512) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function buildPaymentMetadata(payload, orderId) {
  const metadata = {
    order_id: paymentMetadataText(orderId, 128),
    max_chat_id: paymentMetadataText(payload.max_chat_id, 128),
    max_user_id: paymentMetadataText(payload.max_user_id, 128),
    customer_name: paymentMetadataText(payload.customer_name, 120),
    customer_phone: paymentMetadataText(payload.customer_phone, 64),
    customer_email: paymentMetadataText(payload.customer_email, 160),
    recipient_name: paymentMetadataText(payload.recipient_name, 120),
    recipient_phone: paymentMetadataText(payload.recipient_phone, 64),
    address: paymentMetadataText(payload.address, 512),
    delivery_date: paymentMetadataText(payload.delivery_date, 32),
    delivery_slot: paymentMetadataText(payload.delivery_slot, 64),
    delivery_zone: paymentMetadataText(payload.delivery_zone, 64),
    delivery_price: paymentMetadataText(payload.delivery_price, 32),
    total: paymentMetadataText(payload.total, 32),
    comment: paymentMetadataText([
      payload.comment,
      payload.order_photo_name ? `Фото-пример: ${payload.order_photo_name}` : ""
    ].filter(Boolean).join("\n"), 512),
    items: JSON.stringify((payload.items || []).map((item) => ({ id: item.id, quantity: item.quantity })))
  };
  return Object.fromEntries(Object.entries(metadata).filter(([, value]) => value !== ""));
}

function orderFromPaymentMetadata(paymentObject) {
  const metadata = paymentObject?.metadata || {};
  if (!metadata.order_id || !metadata.items) return null;
  let rawItems;
  try { rawItems = JSON.parse(metadata.items); } catch { return null; }
  if (!Array.isArray(rawItems)) return null;
  const items = rawItems.map((item) => {
    const product = catalog[item?.id];
    const quantity = Number(item?.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) return null;
    return { id: item.id, title: product.title, price: product.price, quantity };
  }).filter(Boolean);
  if (!items.length || items.length !== rawItems.length) return null;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryPrice = Number(metadata.delivery_price) || 0;
  return {
    max_chat_id: metadata.max_chat_id || "",
    max_user_id: metadata.max_user_id || "",
    customer_name: metadata.customer_name || "",
    customer_phone: metadata.customer_phone || "",
    customer_email: metadata.customer_email || "",
    recipient_name: metadata.recipient_name || "",
    recipient_phone: metadata.recipient_phone || "",
    address: metadata.address || "",
    delivery_date: metadata.delivery_date || "",
    delivery_slot: metadata.delivery_slot || "",
    delivery_zone: metadata.delivery_zone || "",
    delivery_price: deliveryPrice,
    total: Number(metadata.total) || subtotal + deliveryPrice,
    comment: metadata.comment || "",
    order_photo_name: metadata.order_photo_name || "",
    items,
    subtotal
  };
}

async function createPayment(payload) {
  const orderId = `SM-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
  const hasYooKassa = process.env.YOO_KASSA_SHOP_ID && process.env.YOO_KASSA_SECRET_KEY && process.env.YOO_KASSA_RETURN_URL;
  if (!hasYooKassa) {
    if (process.env.VERCEL) throw new Error("Онлайн-оплата ещё не подключена в ЮKassa. Заказ не создан и деньги не списывались.");
    return { demo: true, order_id: orderId, status: "pending" };
  }
  const taxMode = process.env.YOO_KASSA_TAX_MODE || "self_employed";
  if (!["self_employed", "company"].includes(taxMode)) throw new Error("Проверьте YOO_KASSA_TAX_MODE: self_employed или company");
  if (taxMode === "company" && !process.env.YOO_KASSA_VAT_CODE) throw new Error("Для режима company укажите проверенный YOO_KASSA_VAT_CODE");

  const items = (payload.items || []).map((item) => ({
    description: item.title,
    quantity: receiptQuantity(item.quantity),
    amount: { value: Number(item.price).toFixed(2), currency: "RUB" },
    vat_code: Number(process.env.YOO_KASSA_VAT_CODE || 1),
    payment_subject: "commodity",
    payment_mode: "full_payment"
  }));
  if (Number(payload.delivery_price) > 0) items.push({
    description: "Доставка",
    quantity: 1,
    amount: { value: Number(payload.delivery_price).toFixed(2), currency: "RUB" },
    vat_code: Number(process.env.YOO_KASSA_VAT_CODE || 1),
    payment_subject: "service",
    payment_mode: "full_payment"
  });

  const requestBody = {
    amount: { value: Number(payload.total).toFixed(2), currency: "RUB" },
    capture: true,
    confirmation: { type: "redirect", return_url: process.env.YOO_KASSA_RETURN_URL },
    description: `Sweet Mommy заказ ${orderId}`,
    metadata: buildPaymentMetadata(payload, orderId)
  };
  if (taxMode === "company") {
    const receiptTotal = items.reduce((sum, item) => sum + Number(item.amount.value) * Number(item.quantity), 0);
    if (Math.abs(receiptTotal - Number(payload.total)) > 0.005) {
      throw new Error("Не удалось сверить сумму чека. Обновите корзину и попробуйте ещё раз.");
    }
    requestBody.receipt = { customer: { email: payload.customer_email, phone: payload.customer_phone }, items };
  }
  console.info("Creating YooKassa payment", {
    order_id: orderId,
    tax_mode: taxMode,
    item_count: items.length,
    quantities: items.map((item) => item.quantity),
    total: requestBody.amount.value
  });
  const auth = Buffer.from(`${process.env.YOO_KASSA_SHOP_ID}:${process.env.YOO_KASSA_SECRET_KEY}`).toString("base64");
  const response = await fetch("https://api.yookassa.ru/v3/payments", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json", "Idempotence-Key": crypto.randomUUID() },
    body: JSON.stringify(requestBody)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const details = [
      result.description,
      result.code ? `код ${result.code}` : "",
      result.parameter ? `параметр ${result.parameter}` : ""
    ].filter(Boolean).join("; ");
    console.error("YooKassa create payment failed", {
      status: response.status,
      type: result.type,
      code: result.code,
      parameter: result.parameter,
      description: result.description
    });
    throw new Error(details || "YooKassa error");
  }
  return { demo: false, order_id: orderId, payment_id: result.id, confirmation_url: result.confirmation?.confirmation_url, status: result.status, receipt_mode: taxMode === "company" ? "yookassa" : "my_tax_manual" };
}

async function sendMaxMessageTo(text, recipientId, recipientType = "user", attachments = []) {
  const token = maxSetting("MAX_BOT_TOKEN", "bot_token");
  if (!token || !recipientId) return { demo: true, status: "max_not_configured" };
  const apiBase = maxSetting("MAX_API_BASE_URL", "api_base") || "https://platform-api2.max.ru";
  const queryKey = recipientType === "chat" ? "chat_id" : "user_id";
  const body = { text };
  if (attachments.length) body.attachments = attachments;
  const response = await fetch(`${apiBase}/messages?${queryKey}=${encodeURIComponent(recipientId)}`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || result.description || "MAX API error");
  return { demo: false, status: "sent" };
}

async function sendMaxMessage(text) {
  const recipientId = maxSetting("MAX_RECIPIENT_ID", "recipient_id");
  const recipientType = maxSetting("MAX_RECIPIENT_TYPE", "recipient_type") === "chat" ? "chat" : "user";
  return sendMaxMessageTo(text, recipientId, recipientType);
}

function normalizeSmsPhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 10) return `7${digits}`;
  if (digits.length === 11 && digits.startsWith("8")) return `7${digits.slice(1)}`;
  if (digits.length === 11 && digits.startsWith("7")) return digits;
  return "";
}

async function sendPaidOrderSms(order, payment) {
  const apiId = process.env.SMSRU_API_ID;
  const recipient = normalizeSmsPhone(process.env.SMS_NOTIFY_TO);
  if (!apiId || !recipient) return { demo: true, status: "sms_not_configured" };

  const message = [
    "Sweet Mommy: оплачен заказ",
    payment.order_id,
    `${Number(order.total || 0).toLocaleString("ru-RU")} ₽`,
    `${order.delivery_date || "дата уточняется"} ${order.delivery_slot || ""}`,
    order.customer_name ? `Клиент: ${order.customer_name}` : ""
  ].filter(Boolean).join(". ");
  const query = new URLSearchParams({ api_id: apiId, to: recipient, msg: message, json: "1" });
  if (process.env.SMSRU_FROM) query.set("from", process.env.SMSRU_FROM);
  const response = await fetch(`https://sms.ru/sms/send?${query.toString()}`);
  const result = await response.json().catch(() => ({}));
  const smsResult = result.sms?.[recipient];
  if (!response.ok || result.status !== "OK" || (smsResult && smsResult.status !== "OK")) {
    throw new Error(smsResult?.status_text || result.status_text || `SMS.ru error ${result.status_code || response.status}`);
  }
  return { demo: false, status: "sent", sms_id: smsResult?.sms_id || "" };
}

async function processFollowups() {
  const followups = readFollowups();
  let changed = false;
  for (const followup of followups.filter((item) => !item.sent && Date.parse(item.due_at) <= Date.now())) {
    try {
      await sendMaxMessageTo("Спасибо, что выбрали Sweet Mommy 💗 Как вам букет? Будем рады отзыву — его можно оставить в мини-приложении MAX, добавив фото.", followup.chat_id, "user");
      followup.sent = true;
      followup.sent_at = new Date().toISOString();
    } catch (error) {
      followup.last_error = error.message;
    }
    changed = true;
  }
  if (changed) writeFollowups(followups);
}
setInterval(() => { processFollowups().catch(() => {}); }, 60 * 1000);

async function sendMaxRequest(payload) {
  payload.lead_message = [payload.lead_message, payload.lead_comment && `Комментарий: ${payload.lead_comment}`, payload.lead_photo_name && `Фото-пример: ${payload.lead_photo_name}`].filter(Boolean).join("\n");
  return sendMaxMessage([
    "Новая заявка с сайта Sweet Mommy",
    `Имя: ${payload.lead_name}`,
    `Контакт: ${payload.lead_contact}`,
    `Запрос: ${payload.lead_message || "не указан"}`
  ].join("\n"));
}

async function sendMaxReview(review) {
  const product = catalog[review.product_id];
  return sendMaxMessage([
    "Новый отзыв на сайте Sweet Mommy",
    `Букет: ${product?.title || review.product_id}`,
    `Имя: ${review.name}`,
    `Оценка: ${review.rating}/5`,
    `Отзыв: ${review.text}`,
    review.photo ? "К отзыву прикреплено фото на сайте" : "Фото к отзыву нет"
  ].join("\n"));
}

const maxDialogsFile = path.join(root, "max-dialogs.json");
function readMaxDialogs() {
  try {
    const data = JSON.parse(fs.readFileSync(maxDialogsFile, "utf8"));
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  } catch { return {}; }
}
function writeMaxDialogs(data) {
  // Vercel functions have an ephemeral/read-only filesystem. Button payloads
  // carry the wizard context, so this file is only a local-dev convenience.
  try { fs.writeFileSync(maxDialogsFile, `${JSON.stringify(data, null, 2)}\n`, "utf8"); } catch {}
}
function saveMaxDialog(chatId, value) {
  const dialogs = readMaxDialogs();
  dialogs[String(chatId)] = { ...value, updated_at: new Date().toISOString() };
  writeMaxDialogs(dialogs);
}
function clearMaxDialog(chatId) {
  const dialogs = readMaxDialogs();
  delete dialogs[String(chatId)];
  writeMaxDialogs(dialogs);
}

const maxProductProfiles = {
  "gala-bouquet": ["mom", "love", "birthday", "premium"],
  "socvetie-krasoty": ["mom", "tender", "birthday", "gratitude"],
  "roses-march": ["mom", "love", "corporate", "spring"],
  "flowering-worlds": ["birthday", "premium", "corporate", "wow"],
  perseida: ["love", "friend", "creative", "birthday"],
  fantasmagoria: ["birthday", "friend", "creative", "corporate"],
  "pandora-bouquet": ["love", "premium", "creative", "wow"],
  "spring-announcement": ["mom", "spring", "tender", "friend"],
  "eternal-romance": ["love", "romantic", "premium"],
  "gourmet-bouquet": ["friend", "birthday", "creative", "wow"],
  "spring-breath": ["mom", "spring", "tender", "friend"],
  "venus-kiss-basket": ["love", "premium", "wow", "birthday"],
  "neon-dance": ["friend", "creative", "birthday", "corporate"],
  "unsolved-puzzle": ["creative", "premium", "birthday"],
  "ode-to-aphrodite": ["love", "romantic", "premium"],
  "parisian-chic": ["love", "romantic", "friend"],
  "paradise-garden": ["mom", "spring", "premium", "birthday"],
  "paris-date": ["love", "romantic", "birthday"],
  "tulips-march": ["mom", "spring", "tender", "corporate"],
  "winter-flower-whisper": ["mom", "tender", "premium", "birthday"],
  "neon-pink-chrysanthemum": ["friend", "creative", "birthday"],
  "boundless-gratitude": ["gratitude", "mom", "teacher", "corporate"],
  "spring-kaleidoscope": ["spring", "friend", "creative", "birthday"]
};

function maxCallbackKeyboard(rows) {
  return [{ type: "inline_keyboard", payload: { buttons: rows.map((row) => row.map((button) => ({ type: "callback", text: button.text, payload: button.payload }))) } }];
}
function maxAppUrl(productId = "") {
  const configured = process.env.MAX_APP_URL || process.env.SITE_URL;
  if (!configured || !/^https:\/\//i.test(configured)) return "";
  try {
    const url = new URL(configured);
    url.searchParams.set("miniapp", "preview");
    if (productId) url.searchParams.set("product", productId);
    url.hash = "catalog";
    return url.toString();
  } catch { return ""; }
}
function maxAppAttachment(productId = "") {
  const url = maxAppUrl(productId);
  if (!url) return [];
  return [{ type: "inline_keyboard", payload: { buttons: [[{ type: "link", text: productId ? "Открыть букет в мини‑приложении" : "Открыть каталог и заказать", url }]] } }];
}
function maxRecommendationAttachments(recommendations) {
  const rows = recommendations.map((product) => {
    const url = maxAppUrl(product.id);
    return [{ type: url ? "link" : "callback", text: `${product.title} · ${product.price} ₽`, ...(url ? { url } : { payload: `wizard:product:${product.id}` }) }];
  });
  return rows.length ? [{ type: "inline_keyboard", payload: { buttons: rows } }] : maxAppAttachment();
}
function maxBudgetRange(value) {
  if (value === "low") return { min: 0, max: 3000 };
  if (value === "mid") return { min: 3000, max: 6000 };
  if (value === "high") return { min: 6000, max: Number.POSITIVE_INFINITY };
  const amount = Number(String(value).replace(/\D/g, ""));
  return Number.isFinite(amount) && amount > 0 ? { min: 0, max: amount } : null;
}
function recommendMaxProducts(dialog) {
  const occasionTags = { birthday: ["birthday", "wow"], love: ["love", "romantic"], gratitude: ["gratitude", "tender"], corporate: ["corporate", "creative"], surprise: ["wow", "universal"] }[dialog.occasion] || ["universal"];
  const recipientTags = { mom: ["mom", "tender"], love: ["love", "romantic"], friend: ["friend", "creative"], colleague: ["corporate", "creative"], self: ["creative", "premium"] }[dialog.recipient] || [];
  const range = maxBudgetRange(dialog.budget);
  return Object.entries(catalog).map(([id, product]) => {
    const tags = maxProductProfiles[id] || [];
    const inBudget = !range || (product.price >= range.min && product.price <= range.max);
    const score = (inBudget ? 6 : 0) + occasionTags.filter((tag) => tags.includes(tag)).length * 3 + recipientTags.filter((tag) => tags.includes(tag)).length * 2;
    return { id, ...product, score, inBudget };
  }).sort((a, b) => b.score - a.score || a.price - b.price).slice(0, 4);
}
function maxWizardStart() {
  return {
    text: "Помогу выбрать букет за минуту 💗 Сначала подскажите, для какого повода подарок?",
    attachments: maxCallbackKeyboard([[{ text: "День рождения", payload: "wizard:occasion:birthday" }, { text: "Для любимого человека", payload: "wizard:occasion:love" }], [{ text: "Спасибо и забота", payload: "wizard:occasion:gratitude" }, { text: "Корпоративный подарок", payload: "wizard:occasion:corporate" }], [{ text: "Просто удивить", payload: "wizard:occasion:surprise" }]])
  };
}

function maxRecipientKeyboard(occasion = "surprise") {
  const payload = (recipient) => `wizard:recipient:${occasion}:${recipient}`;
  return maxCallbackKeyboard([
    [{ text: "Маме", payload: payload("mom") }, { text: "Любимой", payload: payload("love") }],
    [{ text: "Подруге", payload: payload("friend") }, { text: "Коллеге или клиенту", payload: payload("colleague") }],
    [{ text: "Себе", payload: payload("self") }]
  ]);
}

function maxBudgetKeyboard(occasion = "surprise", recipient = "friend") {
  const payload = (budget) => `wizard:budget:${occasion}:${recipient}:${budget}`;
  return maxCallbackKeyboard([
    [{ text: "До 3 000 ₽", payload: payload("low") }, { text: "3 000–6 000 ₽", payload: payload("mid") }],
    [{ text: "От 6 000 ₽", payload: payload("high") }, { text: "Не знаю — подберите", payload: payload("mid") }]
  ]);
}

async function sendMaxReply(update, text, recipientId, recipientType = "user", attachments = []) {
  const callbackId = update?.callback?.callback_id || update?.callback?.id || update?.callback_id;
  if (!callbackId) return sendMaxMessageTo(text, recipientId, recipientType, attachments);
  const token = maxSetting("MAX_BOT_TOKEN", "bot_token");
  if (!token) return { demo: true, status: "max_not_configured" };
  const apiBase = maxSetting("MAX_API_BASE_URL", "api_base") || "https://platform-api2.max.ru";
  const message = { text, ...(attachments.length ? { attachments } : {}) };
  const response = await fetch(`${apiBase}/answers?callback_id=${encodeURIComponent(callbackId)}`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || result.description || "MAX callback error");
  return { demo: false, status: "answered" };
}

async function handleMaxUpdate(update) {
  const message = update?.message || {};
  const callback = update?.callback || {};
  const chatId = update?.chat_id || message?.recipient?.chat_id || message?.chat_id || callback?.message?.recipient?.chat_id || update?.user_id || message?.sender?.user_id || callback?.user?.user_id || callback?.user_id;
  if (!chatId) return { status: "ignored" };
  const recipientType = update?.is_channel || message?.recipient?.chat_id || message?.chat_id || callback?.message?.recipient?.chat_id || update?.chat_id ? "chat" : "user";
  const callbackPayload = String(callback?.payload || "").trim();
  const rawText = String(message?.body?.text || message?.text || "").trim();
  const text = rawText.toLowerCase();
  const input = callbackPayload || text;
  const dialogs = readMaxDialogs();
  const current = dialogs[String(chatId)] || {};
  let dialog = current;
  let response;
  const chooseRecipient = (occasion = dialog.occasion || "surprise") => ({ text: "Кому выбираем подарок?", attachments: maxRecipientKeyboard(occasion) });
  const chooseBudget = (occasion = dialog.occasion || "surprise", recipient = dialog.recipient || "friend") => ({ text: "Какой бюджет закладываем на букет?", attachments: maxBudgetKeyboard(occasion, recipient) });

  if (!input || /^(\/start|начать|привет|меню|выбрать)$/.test(input)) {
    dialog = { stage: "occasion" };
    saveMaxDialog(chatId, dialog);
    response = maxWizardStart();
  } else if (input === "wizard:start") {
    dialog = { stage: "occasion" };
    saveMaxDialog(chatId, dialog);
    response = maxWizardStart();
  } else if (input.startsWith("wizard:occasion:")) {
    const occasion = input.split(":")[2] || "surprise";
    dialog = { ...dialog, stage: "recipient", occasion };
    saveMaxDialog(chatId, dialog);
    response = chooseRecipient(occasion);
  } else if (input.startsWith("wizard:recipient:")) {
    const parts = input.split(":");
    const occasion = parts[2] || dialog.occasion || "surprise";
    const recipient = parts[3] || parts[2] || dialog.recipient || "friend";
    dialog = { ...dialog, stage: "budget", occasion, recipient };
    saveMaxDialog(chatId, dialog);
    response = chooseBudget(occasion, recipient);
  } else if (input.startsWith("wizard:budget:")) {
    const parts = input.split(":");
    const occasion = parts[2] || dialog.occasion || "surprise";
    const recipient = parts[3] || dialog.recipient || "friend";
    const budget = parts[4] || parts[2] || dialog.budget || "mid";
    dialog = { ...dialog, stage: "recommendations", occasion, recipient, budget };
    const recommendations = recommendMaxProducts(dialog);
    clearMaxDialog(chatId);
    response = {
      text: `Вот что может подойти 💐\n\n${recommendations.map((product, index) => `${index + 1}. ${product.title} — ${product.price.toLocaleString("ru-RU")} ₽`).join("\n")}\n\nНажмите на подходящий букет — откроется его карточка в мини‑приложении. Там останется выбрать доставку, заполнить данные и оплатить онлайн.`,
      attachments: maxRecommendationAttachments(recommendations)
    };
  } else if (input.startsWith("wizard:product:")) {
    const productId = input.split(":").pop();
    const product = catalog[productId];
    response = product ? { text: `Открываю «${product.title}». В мини‑приложении можно посмотреть фото, выбрать доставку и оплатить заказ онлайн.`, attachments: maxAppAttachment(productId) } : { text: "Откройте каталог — я помогу выбрать другой букет.", attachments: maxAppAttachment() };
  } else if (dialog.stage === "occasion" && /(рожд|юбиле|празд|день)/.test(text)) {
    dialog = { ...dialog, stage: "recipient", occasion: "birthday" }; saveMaxDialog(chatId, dialog); response = chooseRecipient("birthday");
  } else if (dialog.stage === "occasion" && /(люб|свидан|романт)/.test(text)) {
    dialog = { ...dialog, stage: "recipient", occasion: "love" }; saveMaxDialog(chatId, dialog); response = chooseRecipient("love");
  } else if (dialog.stage === "occasion" && /(спасибо|благодар|поддерж)/.test(text)) {
    dialog = { ...dialog, stage: "recipient", occasion: "gratitude" }; saveMaxDialog(chatId, dialog); response = chooseRecipient("gratitude");
  } else if (dialog.stage === "occasion" && /(корп|коллег|клиент|сотруд)/.test(text)) {
    dialog = { ...dialog, stage: "recipient", occasion: "corporate" }; saveMaxDialog(chatId, dialog); response = chooseRecipient("corporate");
  } else if (dialog.stage === "recipient" && /(мам|мама)/.test(text)) {
    dialog = { ...dialog, stage: "budget", recipient: "mom" }; saveMaxDialog(chatId, dialog); response = chooseBudget(dialog.occasion, "mom");
  } else if (dialog.stage === "recipient" && /(любим|жене|девуш|муж|парн)/.test(text)) {
    dialog = { ...dialog, stage: "budget", recipient: "love" }; saveMaxDialog(chatId, dialog); response = chooseBudget(dialog.occasion, "love");
  } else if (dialog.stage === "recipient" && /(подруг|друг|себе)/.test(text)) {
    dialog = { ...dialog, stage: "budget", recipient: text.includes("себе") ? "self" : "friend" }; saveMaxDialog(chatId, dialog); response = chooseBudget(dialog.occasion, dialog.recipient);
  } else if (dialog.stage === "recipient" && /(коллег|клиент|сотруд)/.test(text)) {
    dialog = { ...dialog, stage: "budget", recipient: "colleague" }; saveMaxDialog(chatId, dialog); response = chooseBudget(dialog.occasion, "colleague");
  } else if (dialog.stage === "budget") {
    const amount = Number(text.replace(/\D/g, ""));
    const budget = text.includes("не знаю") ? "mid" : amount ? amount : text.includes("6") ? "high" : text.includes("3") ? "mid" : null;
    if (budget) {
      dialog = { ...dialog, stage: "recommendations", budget };
      const recommendations = recommendMaxProducts(dialog);
      clearMaxDialog(chatId);
      response = { text: `Подобрала варианты в вашем бюджете 💗\n\n${recommendations.map((product, index) => `${index + 1}. ${product.title} — ${product.price.toLocaleString("ru-RU")} ₽`).join("\n")}\n\nВыберите букет кнопкой ниже — дальше заказ оформляется в мини‑приложении.`, attachments: maxRecommendationAttachments(recommendations) };
    }
  }
  if (!response) {
    if (text.includes("достав")) response = { text: "По Пензе и району действует тариф, Сердобск, районы и область — по согласованию. Откройте мини‑приложение, чтобы выбрать адрес и увидеть стоимость.", attachments: maxAppAttachment() };
    else if (text.includes("каталог") || text.includes("букет") || text.includes("заказ") || text.includes("цен")) response = { text: "Давайте подберём букет по поводу, получателю и бюджету.", attachments: maxCallbackKeyboard([[{ text: "Подобрать букет", payload: "wizard:start" }]]) };
    else response = { text: "Я помогу выбрать букет по поводу, получателю и бюджету. Нажмите кнопку ниже или напишите «каталог».", attachments: maxCallbackKeyboard([[{ text: "Подобрать букет", payload: "wizard:start" }]]) };
  }
  return sendMaxReply(update, response.text, String(chatId), recipientType, response.attachments || []);
}

async function sendMaxOrder(payload, payment) {
  const customerNote = [payload.comment && `Комментарий: ${payload.comment}`, payload.order_photo_name && `Фото-пример: ${payload.order_photo_name}`].filter(Boolean).join("\n");
  const items = (payload.items || []).map((item) => `${item.title} × ${item.quantity}`).join("\n");
  const delivery = `${deliveryLabels[payload.delivery_zone] || "зона не указана"} · ${payload.delivery_price || 0} ₽`;
  return sendMaxMessage([
    "Новый заказ Sweet Mommy",
    `Заказ: ${payment.order_id}`,
    `Покупатель: ${payload.customer_name || "—"}`,
    `Телефон: ${payload.customer_phone || "—"}`,
    `Email: ${payload.customer_email || "—"}`,
    `Получатель: ${payload.recipient_name || "—"}`,
    `Телефон получателя: ${payload.recipient_phone || "—"}`,
    `Адрес: ${payload.address || "—"}`,
    `Дата и интервал: ${payload.delivery_date || "—"}, ${payload.delivery_slot || "—"}`,
    "Состав:",
    items || "—",
    `Доставка: ${delivery}`,
    `Итого: ${payload.total || 0} ₽`,
    "Оплата: только онлайн",
    `Статус оплаты: ${payment.status || "pending"}`
  ].join("\n"));
}

const requestHandler = async (req, res) => {
  try {
    if (req.method === "GET" && requestedReviewPath(req.url)) {
      const query = new URL(req.url, `http://127.0.0.1:${port}`).searchParams;
      const productId = query.get("product_id");
      const reviews = readReviews().filter((review) => !productId || review.product_id === productId);
      return json(res, 200, { reviews });
    }
    if (req.method === "POST" && req.url === "/api/reviews") {
      const payload = await readBody(req);
      if (payload.max_init_data && !validateMaxInitData(payload.max_init_data)) return json(res, 401, { error: "Не удалось подтвердить запуск мини-приложения MAX" });
      if (!catalog[payload.product_id]) return json(res, 400, { error: "Неизвестный букет" });
      const name = String(payload.name || "").trim().slice(0, 60);
      const text = String(payload.text || "").trim().slice(0, 1200);
      const rating = Number(payload.rating);
      if (name.length < 2 || text.length < 10 || !Number.isInteger(rating) || rating < 1 || rating > 5) return json(res, 400, { error: "Заполните имя, отзыв и оценку от 1 до 5" });
      const reviews = readReviews();
      const review = { id: crypto.randomUUID(), product_id: payload.product_id, name, rating, text, photo: reviewPhotoData(payload.photo), created_at: new Date().toISOString() };
      reviews.unshift(review);
      writeReviews(reviews.slice(0, 500));
      let maxNotification;
      try { maxNotification = await sendMaxReview(review); } catch (error) { maxNotification = { status: "error", error: error.message }; }
      return json(res, 201, { review: { ...review, photo: review.photo || "" }, max_notification: maxNotification });
    }
    if (req.method === "POST" && req.url === "/api/max/webhook") {
      const payload = await readBody(req);
      const webhookSecret = process.env.MAX_WEBHOOK_SECRET;
      if (webhookSecret && req.headers["x-max-webhook-secret"] !== webhookSecret) return json(res, 403, { error: "Forbidden" });
      const updates = Array.isArray(payload.updates) ? payload.updates : [payload];
      const errors = [];
      for (const update of updates) {
        try { await handleMaxUpdate(update); } catch (error) { errors.push(error.message); }
      }
      return json(res, 200, { ok: true, errors });
    }
    if (req.method === "POST" && req.url === "/api/yookassa/webhook") {
      const payload = await readBody(req);
      const paymentObject = payload.object || {};
      if (payload.event === "payment.succeeded") {
        const paidOrder = orderFromPaymentMetadata(paymentObject);
        if (paidOrder) {
          const payment = {
            order_id: paymentObject.metadata.order_id || paymentObject.id,
            payment_id: paymentObject.id || "",
            status: paymentObject.status || "succeeded"
          };
          const notificationKey = payment.payment_id || payment.order_id;
          let notificationSent = false;
          const notificationErrors = [];
          if (!notifiedMaxPaymentIds.has(notificationKey)) {
            try {
              const maxNotification = await sendMaxOrder(paidOrder, payment);
              if (maxNotification.status === "sent") {
                rememberNotification(notifiedMaxPaymentIds, notificationKey);
                notificationSent = true;
              }
            } catch (error) {
              notificationErrors.push(`MAX: ${error.message}`);
            }
          }
          if (!notifiedSmsPaymentIds.has(notificationKey)) {
            try {
              const smsNotification = await sendPaidOrderSms(paidOrder, payment);
              if (smsNotification.status === "sent") rememberNotification(notifiedSmsPaymentIds, notificationKey);
            } catch (error) {
              notificationErrors.push(`SMS: ${error.message}`);
            }
          }
          if (notificationErrors.length) console.error("Paid order notification errors", { order_id: payment.order_id, errors: notificationErrors });
          if (notificationSent && paymentObject.metadata.max_chat_id) {
            scheduleReviewFollowup({ order_id: payment.order_id, chat_id: paymentObject.metadata.max_chat_id });
          }
        }
      }
      return json(res, 200, { ok: true });
    }
    if (req.method === "POST" && req.url === "/api/create-payment") {
      const payload = await readBody(req);
      const maxIdentity = payload.max_init_data ? validateMaxInitData(payload.max_init_data) : null;
      if (payload.max_init_data && !maxIdentity) return json(res, 401, { error: "Не удалось подтвердить запуск мини-приложения MAX" });
      if (!payload.customer_name || !payload.customer_email || !payload.customer_phone || !payload.recipient_name || !payload.recipient_phone || !payload.address || !payload.delivery_date || !payload.delivery_slot || payload.offer_consent !== "on" || payload.privacy_consent !== "on") return json(res, 400, { error: "Не заполнены обязательные данные или согласия заказа" });
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.customer_email)) return json(res, 400, { error: "Проверьте email для электронного чека" });
      if (payload.payment_method !== "online") return json(res, 400, { error: "Доступна только онлайн-оплата картой или через СБП" });
      let orderPayload;
      try {
        orderPayload = normalizeOrder(payload);
      } catch (error) {
        return json(res, 400, { error: error.message });
      }
      if (maxIdentity?.chatId) orderPayload.max_chat_id = maxIdentity.chatId;
      if (maxIdentity?.userId) orderPayload.max_user_id = maxIdentity.userId;
      const payment = await createPayment(orderPayload);
      return json(res, 200, payment);
    }
    if (req.method === "POST" && req.url === "/api/contact-request") {
      const payload = await readBody(req);
      if (!payload.lead_name || !payload.lead_contact || payload.privacy_consent !== "on") return json(res, 400, { error: "Заполните имя, контакт и подтвердите согласие" });
      return json(res, 200, await sendMaxRequest(payload));
    }
    if (req.method !== "GET" && req.method !== "HEAD") return json(res, 405, { error: "Method not allowed" });
    const requested = decodeURIComponent((req.url || "/").split("?")[0]);
    const relative = requested === "/" ? "index.html" : requested.replace(/^\/+/, "");
    const filePath = path.resolve(root, relative);
    if (!filePath.startsWith(root + path.sep)) return json(res, 403, { error: "Forbidden" });
    if (requested === "/favicon.ico") {
      res.writeHead(204, { "Cache-Control": "public, max-age=86400" });
      return res.end();
    }
    if (!fs.existsSync(filePath)) return json(res, 404, { error: "Not found" });
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) return json(res, 404, { error: "Not found" });
    const extension = path.extname(filePath).toLowerCase();
    const cacheControl = [".html", ".css", ".js", ".json", ".jpg", ".jpeg", ".png", ".webp"].includes(extension) ? "no-store" : "public, max-age=86400";
    res.writeHead(200, { "Content-Type": mime[extension] || "application/octet-stream", "Cache-Control": cacheControl, "X-Content-Type-Options": "nosniff" });
    if (req.method === "HEAD") return res.end();
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    json(res, 500, { error: error.message || "Server error" });
  }
};

/* server startup is defined below so Vercel can use requestHandler directly */
/* server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.log(`Sweet Mommy уже запущен на http://127.0.0.1:${port}`);
    return;
  }
  throw error;
}); */

// Vercel invokes the exported handler directly. Locally we keep the small
// Node server so the demo remains launchable with start-demo.bat.
if (process.env.VERCEL) {
  module.exports = requestHandler;
} else {
  const server = http.createServer(requestHandler);
  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.log(`Sweet Mommy уже запущен на http://127.0.0.1:${port}`);
      return;
    }
    throw error;
  });
  server.listen(port, "127.0.0.1", () => console.log(`Sweet Mommy demo: http://127.0.0.1:${port}`));
}
