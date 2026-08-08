function newCatalogProduct({ id, title, folder, count, description, bg, badge = "Новинка", price = null }) {
  const gallery = Array.from({ length: count }, (_, index) => `assets/products/new/${folder}/${folder}-${String(index + 1).padStart(2, "0")}.jpg?v=20260728-1`);
  return {
    id, title, description, price, priceLabel: price == null ? "Цена по запросу" : "", emoji: "💐", image: gallery[0], gallery,
    badge, filters: ["all", "new", "mom", "love", "corporate"], bg,
    composition: "Точный состав уточняется перед заказом",
    size: "Размер согласуем по выбранной композиции",
    country: "Уточняется перед заказом",
    storage: "Срок годности и условия хранения сообщим перед заказом",
    fullDescription: "Фотографии реальной композиции из архива Sweet Mommy. Стоимость, состав, размер и цветовую гамму согласуем в MAX или Telegram до заказа.",
    orderOnly: true,
    newProduct: true
  };
}

const products = [
  { id: "gala-bouquet", title: "Гала-букет «Пионы»", description: "Нежная авторская композиция с пионовидными зефирными цветами и воздушной текстурой.", price: 2890, emoji: "🌸", image: "assets/products/gala-peonies.jpg", badge: "Авторский", flowwowUrl: "https://flowwow.com/edible-bouquets/gala-buket-3354/", filters: ["all", "mom", "love", "corporate"], bg: "#d6c9ff", composition: "Зефирные цветы в форме пионов; сладкие лепестки; авторская упаковка.", size: "Ширина 35 см · высота 45 см", country: "Россия", storage: "Хранить в сухом прохладном месте; срок годности уточняется перед заказом.", fullDescription: "Авторская композиция с мягкими пионовидными формами и воздушной текстурой зефира. Подходит для дня рождения, годовщины, благодарности и красивого сюрприза." },
  { id: "socvetie-krasoty", title: "Соцветие красоты", description: "Нежная сладкая композиция из воздушных зефирных цветов в авторской упаковке.", price: 1890, emoji: "🌷", image: "assets/products/zephyr-tulips.jpg", badge: "Хит", flowwowUrl: "https://flowwow.com/edible-bouquets/socvetie-krasoty-8107/", filters: ["all", "mom", "love", "teacher"], bg: "#ffd0bd", composition: "Зефирные цветы; подбукетница; дизайнерская упаковка.", size: "Параметры уточняются по выбранному размеру композиции", country: "Россия", storage: "Хранить в сухом прохладном месте; срок годности уточняется перед заказом.", fullDescription: "Подарок, который сочетает красоту букета и нежный вкус зефира. Оттенки, открытку и размер можно согласовать в MAX или Telegram." },
  { id: "roses-march", title: "Букет роз на 8 марта", description: "Праздничная композиция в розовой гамме для мамы, любимой, подруги или коллеги.", price: 1590, emoji: "🌹", image: "assets/products/roses-march.jpg", badge: "К празднику", flowwowUrl: "https://flowwow.com/edible-bouquets/buket-roz-na-8-marta-9210/", filters: ["all", "mom", "love", "corporate"], bg: "#ffc0d2", composition: "Сладкие цветы в форме роз; оформление; праздничная упаковка.", size: "Параметры уточняются по выбранному размеру композиции", country: "Россия", storage: "Изготовление и свежесть согласуем перед доставкой.", fullDescription: "Подарочный вариант к 8 Марта и другим весенним поводам. Для компании можно собрать серию букетов в едином стиле или разных оттенках." },
  { id: "flowering-worlds", title: "Цветущие миры", description: "Большой разноцветный букет, который сначала удивляет видом, а потом радует вкусом.", price: 3190, emoji: "🌺", image: "assets/products/flowering-worlds.jpg", badge: "Premium", flowwowUrl: "https://flowwow.com/edible-bouquets/cvetushchie-miry-9527/", filters: ["all", "love", "mom", "corporate"], bg: "#c7baff", composition: "Микс зефирных цветов; оформительская упаковка; открытка по желанию.", size: "Параметры уточняются по выбранному размеру композиции", country: "Россия", storage: "Хранить в сухом прохладном месте; рекомендации дадим перед заказом.", fullDescription: "Премиальная композиция для важного события или серии подарков. Гамму можно адаптировать под бренд, праздник или стиль получателя." },
  { id: "perseida", title: "Персеида", description: "Креативный разноцветный зефирный букет — заметный подарок для любого повода.", price: 2490, emoji: "💜", image: "assets/products/perseida.jpg", badge: "Новинка", flowwowUrl: "https://flowwow.com/edible-bouquets/perseida-9528/", filters: ["all", "love", "teacher", "corporate"], bg: "#e4d7ff", composition: "Разноцветные зефирные цветы; подбукетница; декоративная упаковка.", size: "Параметры уточняются по выбранному размеру композиции", country: "Россия", storage: "Сухое прохладное место; не оставлять под прямыми солнечными лучами.", fullDescription: "Персеиду можно подарить на праздник или как знак внимания близкому человеку. Цветовую палитру, открытку и количество букетов обсуждаем в мессенджере." },
  { id: "fantasmagoria", title: "Фантасмагория", description: "Выразительный букет из зефирных цветов с яркими оттенками и праздничным настроением.", price: 2790, emoji: "💐", image: "assets/products/fantasmagoria.jpg", badge: "Яркий акцент", flowwowUrl: "https://flowwow.com/edible-bouquets/fantasmagoriya/", filters: ["all", "love", "mom", "corporate"], bg: "#f5c5dc", composition: "Ассорти зефирных цветов; декоративная зелень; дизайнерская упаковка.", size: "Параметры уточняются по выбранному размеру композиции", country: "Россия", storage: "Условия хранения и срок годности уточняются для даты заказа.", fullDescription: "Композиция для яркого поздравления, клиентского комплимента или корпоративного события. Цвет и количество букетов можно согласовать в MAX или Telegram." },
  newCatalogProduct({ id: "neon-pink-chrysanthemum", title: "Неоновая хризантема", folder: "neon-pink-chrysanthemum", count: 5, description: "Яркая розовая композиция с выразительными цветами и мягкой упаковкой.", bg: "#ffc4d8", price: 2400 }),
  newCatalogProduct({ id: "spring-announcement", title: "Анонс весны", folder: "spring-announcement", count: 4, description: "Лёгкая весенняя композиция в персиковой гамме для тёплого поздравления.", bg: "#ffd0bd", price: 2950 }),
  newCatalogProduct({ id: "boundless-gratitude", title: "Безмерная благодарность", folder: "boundless-gratitude", count: 3, description: "Нежный букет со смыслом — для благодарности, поддержки и особенного внимания.", bg: "#f0d4df", price: 6800 }),
  newCatalogProduct({ id: "pandora-bouquet", title: "Букет Пандоры", folder: "pandora-bouquet", count: 6, description: "Многоцветная авторская композиция с неожиданными оттенками и деталями.", bg: "#d7c6f5", badge: "Авторский", price: 4500 }),
  newCatalogProduct({ id: "spring-kaleidoscope", title: "Весенний калейдоскоп", folder: "spring-kaleidoscope", count: 4, description: "Сочная композиция с весенним настроением и живой палитрой.", bg: "#e7d3ee", price: 2970 }),
  newCatalogProduct({ id: "eternal-romance", title: "Вечный роман", folder: "eternal-romance", count: 5, description: "Романтичный букет в мягких оттенках для любимого человека.", bg: "#f3c5d8", price: 6030 }),
  newCatalogProduct({ id: "gourmet-bouquet", title: "Гурман", folder: "gourmet-bouquet", count: 4, description: "Необычная композиция для тех, кто любит красивые и вкусные сюрпризы.", bg: "#e6d6bb", price: 3500 }),
  newCatalogProduct({ id: "spring-breath", title: "Дыхание весны", folder: "spring-breath", count: 6, description: "Свежая весенняя композиция с лёгким настроением и нежной подачей.", bg: "#d5e4cd", price: 5200 }),
  newCatalogProduct({ id: "venus-kiss-basket", title: "Корзина «Поцелуй Венеры»", folder: "venus-kiss-basket", count: 4, description: "Подарочная корзина с романтичным настроением и ручным оформлением.", bg: "#f2cbd8", price: 7349 }),
  newCatalogProduct({ id: "neon-dance", title: "Неоновый танец", folder: "neon-dance", count: 5, description: "Яркий цветочный акцент для праздника, сюрприза или важной встречи.", bg: "#d9c8f4", price: 2950 }),
  newCatalogProduct({ id: "unsolved-puzzle", title: "Неразгаданная головоломка", folder: "unsolved-puzzle", count: 5, description: "Креативная композиция с необычным сочетанием цветов и форм.", bg: "#e5d4ed", price: 16200 }),
  newCatalogProduct({ id: "ode-to-aphrodite", title: "Ода Афродите", folder: "ode-to-aphrodite", count: 4, description: "Элегантная композиция для красивого признания и особенного повода.", bg: "#f6d4dc", price: 14850 }),
  newCatalogProduct({ id: "parisian-chic", title: "Парижский шик", folder: "parisian-chic", count: 5, description: "Утончённый букет с лёгким парижским настроением.", bg: "#e9d6d1", price: 3500 }),
  newCatalogProduct({ id: "paradise-garden", title: "Райский сад", folder: "paradise-garden", count: 5, description: "Объёмная композиция с ощущением цветущего сада и ручной сборкой.", bg: "#d9e3c7", price: 5000 }),
  newCatalogProduct({ id: "paris-date", title: "Свидание в Париже", folder: "paris-date", count: 4, description: "Романтичный сладкий букет для свидания, годовщины или сюрприза.", bg: "#f4cbd5", price: 4600 }),
  newCatalogProduct({ id: "tulips-march", title: "Тюльпаны на 8 марта", folder: "tulips-march", count: 5, description: "Праздничная композиция с весенним настроением и нежной упаковкой.", bg: "#ffd2c4", badge: "К празднику", price: 3500 }),
  newCatalogProduct({ id: "winter-flower-whisper", title: "Шелест зимних цветов", folder: "winter-flower-whisper", count: 7, description: "Спокойная сезонная композиция с мягкими оттенками и уютной подачей.", bg: "#ddd8ed", badge: "Сезонный", price: 4770 }),
  newCatalogProduct({ id: "babylonian-gardens", title: "Вавилонские сады", folder: "babylonian-gardens", count: 3, description: "Пышная авторская композиция с ощущением сада и выразительной подачей.", bg: "#ffd2c4", price: 8900 }),
  newCatalogProduct({ id: "wine-peonies", title: "Винные пионы", folder: "wine-peonies", count: 3, description: "Глубокая цветочная композиция с благородным настроением и мягкой фактурой.", bg: "#e0c3d4", price: 5800 }),
  newCatalogProduct({ id: "royal-rose", title: "Королевская роза", folder: "royal-rose", count: 2, description: "Элегантный букет с акцентом на форму, цвет и красивую подачу.", bg: "#f2c5d1", price: 3680 }),
  newCatalogProduct({ id: "cupid", title: "Купидон", folder: "cupid", count: 7, description: "Романтичная композиция для признания, сюрприза и особенного повода.", bg: "#ffc5d1", price: 1800 }),
  newCatalogProduct({ id: "tender-glance", title: "Ласковый взгляд", folder: "tender-glance", count: 2, description: "Нежный подарок в мягкой гамме для тёплого знака внимания.", bg: "#f6d2c9", price: 3680 }),
  newCatalogProduct({ id: "interflower-consolidation", title: "Межцветковая консолидация", folder: "interflower-consolidation", count: 6, description: "Необычная авторская композиция для тех, кто любит детали и характер.", bg: "#d8c8ef", price: 1800 }),
  newCatalogProduct({ id: "full-moon", title: "Полнолуние", folder: "full-moon", count: 1, description: "Выразительная композиция с атмосферным настроением и мягким светом.", bg: "#d7c8e8", price: 2400 }),
  newCatalogProduct({ id: "roses-white-kimono", title: "Розы в белых кимоно", folder: "roses-white-kimono", count: 3, description: "Светлая композиция с аккуратной формой и спокойной элегантностью.", bg: "#f0d9d6", price: 2400 }),
  newCatalogProduct({ id: "nymph-garden", title: "Сад нимф", folder: "nymph-garden", count: 4, description: "Воздушный букет с настроением цветущего сада и природной лёгкостью.", bg: "#d9e3cf", price: 3380 }),
  newCatalogProduct({ id: "tulips-round-box", title: "Тюльпаны в круглой коробке", folder: "tulips-round-box", count: 4, description: "Компактная композиция в коробке — нежный подарок с аккуратной подачей.", bg: "#ffd0bd", price: 1800 }),
  newCatalogProduct({ id: "violets-box", title: "Фиалки в коробке", folder: "violets-box", count: 2, description: "Небольшой сладкий подарок в коробке для уютного и красивого жеста.", bg: "#ddd1eb", price: 850 }),
  newCatalogProduct({ id: "shadow-kingdom", title: "Царство теней", folder: "shadow-kingdom", count: 4, description: "Контрастная композиция с глубоким цветом и выразительным характером.", bg: "#cdbbdc", price: 2400 }),
  newCatalogProduct({ id: "flower-element", title: "Цветочная стихия", folder: "flower-element", count: 2, description: "Сочная композиция для заметного подарка и большого впечатления.", bg: "#f4c6d2", price: 3680 }),
  newCatalogProduct({ id: "flower-artifact", title: "Цветочный артефакт", folder: "flower-artifact", count: 6, description: "Авторский букет с необычной подачей — для тех, кому хочется вау-эффекта.", bg: "#d7c2dd", price: 2400 }),
  newCatalogProduct({ id: "flower-imaginarium", title: "Цветочный Воображариум", folder: "flower-imaginarium", count: 3, description: "Фантазийная композиция с акцентом на цвет, форму и настроение.", bg: "#d8c9f0", price: 1800 }),
  newCatalogProduct({ id: "eco-aesthetics", title: "Эко-эстетика", folder: "eco-aesthetics", count: 3, description: "Спокойная композиция с естественным настроением и деликатной подачей.", bg: "#dbe3cf", price: 2400 })
];

const catalogUpdates = {
  "gala-bouquet": { price: 4500, gallery: ["assets/products/gala-peonies.jpg", "assets/products/gala-peonies-2.jpg", "assets/products/gala-peonies-3.jpg", "assets/products/gala-peonies-4.jpg", "assets/products/gala-peonies-5.jpg", "assets/products/gala-peonies-6.jpg", "assets/products/gala-peonies-7.jpg"], reviewImage: "assets/reviews/gala-bouquet-review.jpg" },
  "socvetie-krasoty": { price: 2000, gallery: ["assets/products/zephyr-tulips.jpg", "assets/products/zephyr-tulips-2.jpg", "assets/products/zephyr-tulips-3.jpg"] },
  "flowering-worlds": { price: 2900, gallery: ["assets/products/flowering-worlds.jpg", "assets/products/flowering-worlds-2.jpg", "assets/products/flowering-worlds-3.jpg", "assets/products/flowering-worlds-4.jpg", "assets/products/flowering-worlds-5.jpg", "assets/products/flowering-worlds-6.jpg", "assets/products/flowering-worlds-7.jpg"], reviewImage: "assets/reviews/flowering-worlds-review.jpg" },
  "perseida": { price: 2900, gallery: ["assets/products/perseida.jpg", "assets/products/perseida-2.jpg", "assets/products/perseida-3.jpg", "assets/products/perseida-4.jpg", "assets/products/perseida-5.jpg"], reviewImage: "assets/reviews/perseida-review.jpg" },
  "fantasmagoria": { price: 3800, gallery: ["assets/products/fantasmagoria.jpg", "assets/products/fantasmagoria-2.jpg", "assets/products/fantasmagoria-3.jpg", "assets/products/fantasmagoria-4.jpg", "assets/products/fantasmagoria-5.jpg", "assets/products/fantasmagoria-6.jpg"], reviewImage: "assets/reviews/fantasmagoria-review.jpg" },
  "roses-march": { price: 5500, gallery: ["assets/products/roses-march.jpg", "assets/products/roses-march-2.jpg"] }
};
products.forEach((product) => Object.assign(product, catalogUpdates[product.id] || {}, { gallery: catalogUpdates[product.id]?.gallery || product.gallery || [product.image] }));
products.forEach((product) => {
  product.prepTime = "12+ часов";
  if (product.id === "socvetie-krasoty") product.stock = 3;
  if (product.id === "flowering-worlds") product.image = "assets/products/flowering-worlds-2.jpg";
});

const newProductPresentation = {
  "neon-pink-chrysanthemum": { cover: 2, reviewImage: "assets/products/new/neon-pink-chrysanthemum/neon-pink-chrysanthemum-05.jpg?v=20260729-1" },
  "spring-announcement": { cover: 3 },
  "boundless-gratitude": { cover: 1, reviewImage: "assets/products/new/boundless-gratitude/boundless-gratitude-03.jpg?v=20260729-1" },
  "pandora-bouquet": { cover: 1 },
  "spring-kaleidoscope": { cover: 1, reviewImage: "assets/products/new/spring-kaleidoscope/spring-kaleidoscope-04.jpg?v=20260729-1" },
  "eternal-romance": { cover: 3 },
  "gourmet-bouquet": { cover: 3 },
  "spring-breath": { cover: 1 },
  "venus-kiss-basket": { cover: 2 },
  "neon-dance": { cover: 4, reviewImage: "assets/products/new/neon-dance/neon-dance-01.jpg?v=20260729-1" },
  "unsolved-puzzle": { cover: 1 },
  "ode-to-aphrodite": { cover: 1 },
  "parisian-chic": { cover: 1 },
  "paradise-garden": { cover: 3 },
  "paris-date": { cover: 2 },
  "tulips-march": { cover: 1, reviewImage: "assets/products/new/tulips-march/tulips-march-05.jpg?v=20260729-1" },
  "winter-flower-whisper": { cover: 1, reviewImage: "assets/products/new/winter-flower-whisper/winter-flower-whisper-07.jpg?v=20260729-1" }
};
products.forEach((product) => {
  const presentation = newProductPresentation[product.id];
  if (!presentation) return;
  product.gallery = (product.gallery || [product.image]).slice(0, -1);
  product.image = product.gallery[(presentation.cover || 1) - 1] || product.gallery[0];
  if (presentation.reviewImage) product.reviewImage = presentation.reviewImage;
  else delete product.reviewImage;
});

const catalogHooks = {
  "gala-bouquet": "Пионы, которые хочется рассматривать — и пробовать по лепестку.",
  "socvetie-krasoty": "Нежный знак внимания, который выглядит как букет, а запоминается как десерт.",
  "roses-march": "Розы для момента, когда обычных слов недостаточно.",
  "flowering-worlds": "Сначала удивляет цветом, потом — вкусом и деталями.",
  perseida: "Маленькая вселенная из сладких цветов для большого впечатления.",
  fantasmagoria: "Яркая композиция для тех, кто любит подарки с характером.",
  "neon-pink-chrysanthemum": "Розовый акцент, который сразу поднимает настроение.",
  "spring-announcement": "Весна, собранная в один тёплый и съедобный жест.",
  "boundless-gratitude": "Когда хочется сказать «спасибо» красиво, тепло и без лишних слов.",
  "pandora-bouquet": "Откройте букет — и найдите внутри свой неожиданный цветочный сюжет.",
  "spring-kaleidoscope": "Каждый лепесток — новый оттенок весеннего настроения.",
  "eternal-romance": "Романтика, которая остаётся на фото и растворяется во вкусе.",
  "gourmet-bouquet": "Для тех, кто любит, когда подарок удивляет с первого взгляда.",
  "spring-breath": "Свежий цветочный воздух, который можно подарить.",
  "venus-kiss-basket": "Большой жест с эффектом «вау» — от корзины до последнего цветка.",
  "neon-dance": "Цветочный танец для яркого человека и заметного повода.",
  "unsolved-puzzle": "Подарок-загадка: разглядывать хочется дольше, чем выбирать слова.",
  "ode-to-aphrodite": "Композиция для признания, которое должно остаться в памяти.",
  "parisian-chic": "Немного Парижа, много нежности и ни одной случайной детали.",
  "paradise-garden": "Цветущий сад, который появляется прямо в руках у получателя.",
  "paris-date": "Свидание начинается с букета, который можно разделить на двоих.",
  "tulips-march": "Весенний букет, который говорит о заботе ярче открытки.",
  "winter-flower-whisper": "Тихая зимняя история в цветах, которые тают во вкусе."
};
products.forEach((product) => {
  if (catalogHooks[product.id]) product.description = catalogHooks[product.id];
});

const state = { cart: loadCart(), filter: "all" };
const pendingPaymentStorageKey = "sweet-mommy-pending-payment-v1";
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const rub = (value) => `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;
const bouquetWord = (value) => {
  const count = Number(value) % 100;
  if (count >= 11 && count <= 14) return "букетов";
  const last = count % 10;
  if (last === 1) return "букет";
  if (last >= 2 && last <= 4) return "букета";
  return "букетов";
};
const getProduct = (id) => products.find((product) => product.id === id);

function loadCart() {
  try {
    const stored = JSON.parse(localStorage.getItem("sweet-mommy-cart") || "[]");
    if (!Array.isArray(stored)) return [];
    return stored
      .filter((item) => getProduct(item?.id) && Number.isFinite(Number(item.quantity)) && Number(item.quantity) > 0)
      .map((item) => ({ id: item.id, quantity: Math.min(99, Math.max(1, Math.floor(Number(item.quantity)))) }));
  } catch { return []; }
}
function saveCart() { localStorage.setItem("sweet-mommy-cart", JSON.stringify(state.cart)); }
function subtotal() { return state.cart.reduce((sum, item) => { const product = getProduct(item.id); return product ? sum + product.price * item.quantity : sum; }, 0); }
const deliveryPrices = { penza_5: 250, penza_10: 350, penza_15: 500, serdobsk_5: 250, serdobsk_10: 350, serdobsk_15: 500 };
function deliveryPrice(zone = "penza_5") { return deliveryPrices[zone] ?? 0; }
const PREPARATION_HOURS = 12;
const PREPARATION_MS = PREPARATION_HOURS * 60 * 60 * 1000;
function localDateValue(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
function deliveryDateTime(dateValue, slotValue) {
  if (!dateValue || !slotValue) return null;
  const [year, month, day] = String(dateValue).split("-").map(Number);
  const [hours, minutes] = String(slotValue).split(/[–-]/)[0].trim().split(":").map(Number);
  if (![year, month, day, hours, minutes].every(Number.isFinite)) return null;
  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}
function formatDeliveryDateTime(date) {
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }).format(date);
}
function syncDeliveryCalendar() {
  const dateInput = $("input[name=delivery_date]");
  const slotInput = $("input[name=delivery_slot]");
  if (!dateInput || !slotInput) return true;
  const earliest = new Date(Date.now() + PREPARATION_MS);
  const earliestSelectable = new Date(earliest);
  earliestSelectable.setMinutes(Math.ceil(earliestSelectable.getMinutes() / 30) * 30, 0, 0);
  if (earliestSelectable.getHours() > 20 || (earliestSelectable.getHours() === 20 && earliestSelectable.getMinutes() > 0)) {
    earliestSelectable.setDate(earliestSelectable.getDate() + 1);
    earliestSelectable.setHours(9, 0, 0, 0);
  }
  const minimumDate = localDateValue(earliestSelectable);
  dateInput.min = minimumDate;
  if (!dateInput.value || dateInput.value < minimumDate) dateInput.value = minimumDate;
  let selected = deliveryDateTime(dateInput.value, slotInput.value);
  if (selected && selected < earliest && dateInput.value === minimumDate) {
    slotInput.value = [earliestSelectable.getHours(), earliestSelectable.getMinutes()].map((value) => String(value).padStart(2, "0")).join(":");
    selected = deliveryDateTime(dateInput.value, slotInput.value);
  }
  const valid = Boolean(selected && selected >= earliest);
  const note = $("[data-delivery-availability]");
  if (note) note.textContent = valid ? "Подготовка занимает 12 часов · ближайшее доступное время — " + formatDeliveryDateTime(earliestSelectable) + "." : "Выберите дату и время не раньше чем через 12 часов после заказа.";
  dateInput.setCustomValidity(valid ? "" : "Дата и время должны учитывать 12 часов на приготовление.");
  slotInput.setCustomValidity(valid ? "" : "Выберите время доставки с 09:00 до 20:00 не раньше чем через 12 часов.");
  return valid;
}

function renderProductsLegacy() {
  const root = $("[data-products]");
  const visible = products.filter((product) => product.filters.includes(state.filter));
  root.innerHTML = visible.map((product) => `
    <article class="product-card">
      <div class="product-art" style="--product-bg:${product.bg}">
        <img class="product-image" src="${product.image}" alt="${product.title}" loading="lazy">
        <span class="product-badge">${product.badge}</span>
      </div>
      <div class="product-body"><h3 class="product-title">${product.title}</h3><p class="product-description">${product.description}</p><details class="product-details"><summary>Состав и параметры</summary><p>${product.fullDescription}</p><dl><div><dt>Состав</dt><dd>${product.composition}</dd></div><div><dt>Размер</dt><dd>${product.size}</dd></div><div><dt>Производство</dt><dd>${product.country}</dd></div><div><dt>Хранение</dt><dd>${product.storage}</dd></div></dl><a class="product-flowwow-link" href="${product.flowwowUrl}" target="_blank" rel="noopener">Открыть карточку на Flowwow ↗</a></details><div class="product-meta"><strong class="product-price">${rub(product.price)}</strong><button class="add-button" type="button" data-add="${product.id}">В корзину</button></div></div>
    </article>`).join("");
  $$('details.product-details summary', root).forEach((summary) => { summary.textContent = "Открыть описание и параметры"; });
  $$('[data-add]', root).forEach((button) => button.addEventListener("click", () => addToCart(button.dataset.add)));
}

function addToCart(id) {
  const existing = state.cart.find((item) => item.id === id);
  if (existing) existing.quantity += 1; else state.cart.push({ id, quantity: 1 });
  saveCart(); renderCart(); openCart();
}
function updateQuantity(id, delta) {
  const item = state.cart.find((entry) => entry.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) state.cart = state.cart.filter((entry) => entry.id !== id);
  saveCart(); renderCart();
}
function renderCart() {
  const itemsRoot = $("[data-cart-items]");
  const isEmpty = state.cart.length === 0;
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  $("[data-cart-empty]").hidden = !isEmpty;
  $("[data-cart-count]").textContent = itemCount;
  $("[data-cart-total]").textContent = rub(subtotal());
  $("[data-checkout]").disabled = isEmpty;
  const miniCartBar = $("[data-mini-cart-bar]");
  if (miniCartBar) {
    miniCartBar.classList.toggle("is-visible", !isEmpty);
    $("[data-mini-cart-label]").textContent = `${itemCount} ${itemCount === 1 ? "букет" : itemCount < 5 ? "букета" : "букетов"}`;
    $("[data-mini-cart-total]").textContent = rub(subtotal());
    document.documentElement.classList.toggle("has-mini-cart", !isEmpty);
  }
  itemsRoot.innerHTML = state.cart.map((item) => {
    const product = getProduct(item.id);
    return `<div class="cart-row"><div class="cart-thumb" aria-hidden="true"><img class="cart-thumb-image" src="${product.image}" alt="" loading="lazy"></div><div><strong>${product.title}</strong><small>${rub(product.price)} за букет</small><div class="cart-qty"><button type="button" data-qty="${product.id}" data-delta="-1" aria-label="Уменьшить количество">−</button><span>${item.quantity}</span><button type="button" data-qty="${product.id}" data-delta="1" aria-label="Увеличить количество">+</button><button class="cart-remove" type="button" data-remove="${product.id}">Удалить</button></div></div><b>${rub(product.price * item.quantity)}</b></div>`;
  }).join("");
  $$('[data-qty]', itemsRoot).forEach((button) => button.addEventListener("click", () => updateQuantity(button.dataset.qty, Number(button.dataset.delta))));
  $$('[data-remove]', itemsRoot).forEach((button) => button.addEventListener("click", () => { state.cart = state.cart.filter((item) => item.id !== button.dataset.remove); saveCart(); renderCart(); }));
  renderCheckoutSummary();
}

function renderCheckoutSummary() {
  const root = $("[data-checkout-items]");
  if (!root) return;
  root.innerHTML = state.cart.map((item) => { const product = getProduct(item.id); return `<div class="summary-product"><span>${product.title} × ${item.quantity}<small>${product.description}</small></span><b>${rub(product.price * item.quantity)}</b></div>`; }).join("");
  const zone = $("[data-delivery-zone]")?.value || "penza_5";
  const delivery = deliveryPrice(zone);
  $("[data-checkout-subtotal]").textContent = rub(subtotal());
  $("[data-checkout-delivery]").textContent = zone === "outside" ? "Индивидуальный расчёт" : rub(delivery);
  $("[data-checkout-total]").textContent = zone === "outside" ? "Уточним после согласования" : rub(subtotal() + delivery);
}

function readPendingPayment() {
  try {
    const item = JSON.parse(localStorage.getItem(pendingPaymentStorageKey) || "null");
    return item?.payment_id && item?.order_id ? item : null;
  } catch {
    return null;
  }
}

function savePendingPayment(payment) {
  localStorage.setItem(pendingPaymentStorageKey, JSON.stringify({
    payment_id: payment.payment_id,
    order_id: payment.order_id,
    created_at: new Date().toISOString()
  }));
}

function clearPendingPayment() {
  localStorage.removeItem(pendingPaymentStorageKey);
}

function showPaymentNotice(status, text, orderId = "") {
  let notice = $("[data-payment-status-notice]");
  if (!notice) {
    notice = document.createElement("aside");
    notice.className = "payment-status-notice";
    notice.dataset.paymentStatusNotice = "";
    notice.setAttribute("role", "status");
    notice.setAttribute("aria-live", "polite");
    notice.innerHTML = `<button type="button" aria-label="Закрыть уведомление" data-close-payment-notice>×</button><p data-payment-status-text></p>`;
    document.body.append(notice);
    notice.querySelector("[data-close-payment-notice]").addEventListener("click", () => notice.remove());
  }
  notice.dataset.status = status;
  $("[data-payment-status-text]", notice).innerHTML = `${text}${orderId ? `<br><b>Заказ № ${orderId}</b>` : ""}`;
  notice.hidden = false;
}

async function checkPendingPayment() {
  const pendingPayment = readPendingPayment();
  if (!pendingPayment) return false;
  showPaymentNotice("checking", "Проверяем статус оплаты в ЮKassa…", pendingPayment.order_id);
  try {
    const response = await fetch("/api/payment-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payment_id: pendingPayment.payment_id })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Не удалось проверить оплату");
    if (result.paid) {
      clearPendingPayment();
      state.cart = [];
      saveCart();
      renderCart();
      showPaymentNotice("success", "Оплата получена. Заказ передан в работу, уведомление отправлено владельцу.", result.order_id || pendingPayment.order_id);
      return true;
    }
    if (result.status === "canceled") {
      clearPendingPayment();
      showPaymentNotice("error", "Оплата была отменена. Товары остались в корзине — можно попробовать ещё раз.", result.order_id || pendingPayment.order_id);
      return false;
    }
    showPaymentNotice("pending", "Платёж ещё подтверждается. Проверим его автоматически — не оформляйте заказ повторно.", result.order_id || pendingPayment.order_id);
  } catch {
    showPaymentNotice("error", "Не удалось проверить оплату сейчас. Если деньги списались, заказ будет подтверждён автоматически.", pendingPayment.order_id);
  }
  return false;
}

function checkPaymentAfterReturn() {
  if (window.location.pathname !== "/payment/success") return;
  [0, 3000, 9000].forEach((delay) => window.setTimeout(checkPendingPayment, delay));
}

function openCart() { $("[data-cart-drawer]").classList.add("is-open"); $("[data-cart-drawer]").setAttribute("aria-hidden", "false"); document.body.classList.add("is-locked"); }
function closeCart() { $("[data-cart-drawer]").classList.remove("is-open"); $("[data-cart-drawer]").setAttribute("aria-hidden", "true"); document.body.classList.remove("is-locked"); }
function openCheckout() { if (!state.cart.length) return; closeCart(); renderCheckoutSummary(); $("[data-checkout-modal]").classList.add("is-open"); $("[data-checkout-modal]").setAttribute("aria-hidden", "false"); document.body.classList.add("is-locked"); }
function closeCheckout() { $("[data-checkout-modal]").classList.remove("is-open"); $("[data-checkout-modal]").setAttribute("aria-hidden", "true"); document.body.classList.remove("is-locked"); }

function showPaymentFallback(url) {
  const submitButton = $("[data-checkout-form] button[type=\"submit\"]");
  if (!submitButton || !url) return;
  let link = $("[data-payment-fallback]");
  if (!link) {
    link = document.createElement("a");
    link.className = "button button-secondary payment-fallback";
    link.dataset.paymentFallback = "";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Если оплата не открылась — открыть страницу оплаты";
    submitButton.insertAdjacentElement("afterend", link);
  }
  link.href = url;
  link.hidden = false;
}

function openPaymentUrl(url) {
  showPaymentFallback(url);
  const maxApp = window.WebApp;
  const isMaxRuntime = document.documentElement.classList.contains("is-max-miniapp") && Boolean(String(maxApp?.initData || "").trim());
  if (isMaxRuntime && typeof maxApp?.openLink === "function") {
    try {
      maxApp.openLink(url);
      return;
    } catch {
      // Если MAX не смог открыть внешний адрес, оставляем резервную ссылку.
    }
  }
  window.location.assign(url);
}

async function submitOrder(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector('button[type="submit"]');
  const message = $("[data-form-message]");
  const requiredLabels = {
    customer_name: "имя заказчика",
    customer_phone: "телефон заказчика",
    customer_email: "email для чека",
    recipient_name: "имя получателя",
    recipient_phone: "телефон получателя",
    address: "адрес доставки",
    delivery_date: "дату доставки",
    delivery_slot: "время доставки",
    offer_consent: "принятие оферты",
    privacy_consent: "согласие на обработку данных"
  };
  const invalidField = [...form.querySelectorAll("[required]")].find((field) => {
    if (field.type === "checkbox") return !field.checked;
    return !String(field.value || "").trim();
  });
  if (invalidField) {
    const fieldName = requiredLabels[invalidField.name] || "обязательное поле";
    message.className = "form-message error";
    message.textContent = `Заполните: ${fieldName}.`;
    invalidField.setAttribute("aria-invalid", "true");
    const fieldGroup = invalidField.closest("fieldset") || invalidField.closest("label") || invalidField;
    fieldGroup.scrollIntoView?.({ behavior: "smooth", block: "center" });
    window.setTimeout(() => invalidField.focus({ preventScroll: true }), 260);
    return;
  }
  form.querySelectorAll("[aria-invalid='true']").forEach((field) => field.removeAttribute("aria-invalid"));
  message.className = "form-message";
  message.textContent = "Проверяем данные и готовим защищённую оплату…";
  if (submitButton) submitButton.disabled = true;
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  const maxApp = window.WebApp;
  if (maxApp?.initData) {
    payload.max_init_data = maxApp.initData;
    payload.max_app = "MAX Mini App";
  }
  payload.items = state.cart.map((item) => {
    const product = getProduct(item.id);
    if (!product) return null;
    return {
      id: item.id,
      quantity: Math.min(99, Math.max(1, Math.floor(Number(item.quantity) || 1))),
      title: product.title,
      price: product.price
    };
  }).filter(Boolean);
  payload.subtotal = subtotal();
  payload.delivery_price = deliveryPrice(payload.delivery_zone);
  payload.total = subtotal() + payload.delivery_price;
  payload.consent_at = new Date().toISOString();
  try {
    if (!syncDeliveryCalendar()) throw new Error("Дата доставки должна учитывать минимум 12 часов на приготовление букета");
    if (payload.delivery_zone === "outside") throw new Error("Для доставки дальше 15 км сначала согласуем индивидуальную стоимость в MAX или Telegram. После этого оформим онлайн-оплату на точную сумму.");
    const response = await fetch("/api/create-payment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Не удалось создать заказ");
    if (result.confirmation_url) {
      savePendingPayment(result);
      message.className = "form-message success";
      message.textContent = "Открываем защищённую оплату… Если переход не сработал, используйте кнопку ниже.";
      openPaymentUrl(result.confirmation_url);
      return;
    }
    showSuccess(result.demo ? "Заказ принят. Мы свяжемся с вами, чтобы уточнить детали оплаты." : "Заказ создан. Мы свяжемся с вами для подтверждения.", result.order_id);
  } catch (error) {
    message.className = "form-message error";
    message.textContent = error.message || "Не удалось создать заказ. Проверьте соединение или напишите нам в MAX/Telegram.";
    message.scrollIntoView?.({ behavior: "smooth", block: "center" });
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}
async function submitLead(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector('button[type="submit"]');
  const message = $("[data-lead-message]");
  message.className = "form-message";
  message.textContent = "Отправляем заявку в MAX…";
  if (submitButton) submitButton.disabled = true;
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  const leadPhoto = formData.get("lead_photo");
  if (leadPhoto instanceof File && leadPhoto.size) {
    if (leadPhoto.size > 5 * 1024 * 1024) {
      message.className = "form-message error";
      message.textContent = "Фото должно быть не больше 5 МБ";
      if (submitButton) submitButton.disabled = false;
      return;
    }
    payload.lead_photo_name = leadPhoto.name;
    payload.lead_photo_type = leadPhoto.type;
    payload.lead_photo_size = leadPhoto.size;
    delete payload.lead_photo;
  }
  payload.source = "website";
  payload.created_at = new Date().toISOString();
  try {
    const response = await fetch("/api/contact-request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Не удалось отправить заявку");
    message.className = "form-message success";
    message.textContent = result.demo ? "Заявка принята. Мы скоро ответим." : "Заявка отправлена в MAX. Мы скоро ответим.";
    form.reset();
  } catch (error) {
    message.className = "form-message error";
    message.textContent = error.message || "Не удалось отправить заявку. Напишите нам напрямую в MAX или Telegram.";
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}
function showSuccess(text, orderId) { const message = $("[data-form-message]"); message.className = "form-message success"; message.innerHTML = `${text}<br><b>Номер заказа: ${orderId}</b>`; state.cart = []; saveCart(); renderCart(); $("[data-checkout-form]").reset(); }

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>\"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char]));
}

function renderCustomerReviews(modal, reviews) {
  const list = $("[data-review-list]", modal);
  if (!list) return;
  if (!reviews.length) {
    list.innerHTML = `<p class="review-empty">Пока отзывов на сайте нет. Ваш может стать первым.</p>`;
    return;
  }
  list.innerHTML = reviews.map((review) => `<article class="customer-review"><div class="customer-review-head"><strong>${escapeHtml(review.name)}</strong><span>${"★".repeat(Number(review.rating) || 5)}</span></div><p>${escapeHtml(review.text)}</p>${review.photo ? `<img src="${review.photo}" alt="Фото отзыва" loading="lazy">` : ""}<small>${new Date(review.created_at).toLocaleDateString("ru-RU")}</small></article>`).join("");
}

async function loadCustomerReviews(productId, modal) {
  try {
    const response = await fetch(`/api/reviews?product_id=${encodeURIComponent(productId)}`, { cache: "no-store" });
    const result = await response.json();
    renderCustomerReviews(modal, response.ok && Array.isArray(result.reviews) ? result.reviews : []);
  } catch {
    renderCustomerReviews(modal, []);
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function compressReviewPhoto(file) {
  const source = await readFileAsDataUrl(file);
  const image = new Image();
  image.src = source;
  await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; });
  const scale = Math.min(1, 1000 / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", .76);
}

async function submitReview(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const modal = form.closest("[data-gallery-modal]");
  const message = $("[data-review-message]", form);
  const submitButton = form.querySelector('button[type="submit"]');
  const photo = form.elements.review_photo.files?.[0];
  if (photo && photo.size > 5 * 1024 * 1024) { message.textContent = "Фото должно быть не больше 5 МБ"; return; }
  if (submitButton) submitButton.disabled = true;
  message.className = "form-message";
  message.textContent = "Отправляем отзыв…";
  try {
    const payload = { product_id: modal.dataset.product, name: form.elements.review_name.value.trim(), rating: Number(form.elements.review_rating.value), text: form.elements.review_text.value.trim() };
    if (window.WebApp?.initData) payload.max_init_data = window.WebApp.initData;
    if (photo) payload.photo = { name: photo.name, type: photo.type, data: await compressReviewPhoto(photo) };
    const response = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Не удалось отправить отзыв");
    form.reset();
    message.className = "form-message success";
    message.textContent = result.message || "Спасибо! Отзыв отправлен владельцу.";
    if (result.published) await loadCustomerReviews(modal.dataset.product, modal);
  } catch (error) {
    message.className = "form-message error";
    message.textContent = error.message || "Не удалось отправить отзыв";
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

function ensureGalleryModal() {
  let modal = $("[data-gallery-modal]");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.className = "gallery-modal";
  modal.dataset.galleryModal = "";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `<div class="gallery-backdrop" data-gallery-close></div><section class="gallery-panel" role="dialog" aria-modal="true" aria-labelledby="gallery-title"><div class="gallery-header"><div><p class="eyebrow">ФОТО КОМПОЗИЦИИ</p><h2 id="gallery-title" data-gallery-title></h2></div><button class="close-button" type="button" data-gallery-close aria-label="Закрыть галерею">×</button></div><div class="gallery-layout"><div class="gallery-stage"><img data-gallery-main alt=""></div><div class="gallery-info"><p data-gallery-description></p><div class="gallery-thumbs" data-gallery-thumbs></div><button class="button button-primary button-wide" type="button" data-gallery-order>Заказать этот букет</button></div></div></section>`;
  document.body.append(modal);
  modal.querySelector("[data-gallery-thumbs]").insertAdjacentHTML("beforebegin", `<dl class="gallery-facts" data-gallery-facts></dl>`);
  const review = document.createElement("div");
  review.className = "gallery-review";
  review.dataset.galleryReview = "";
  review.hidden = true;
  review.innerHTML = `<div><p class="gallery-review-label">ОТЗЫВ FLOWWOW</p><p class="gallery-review-meta" data-gallery-review-meta></p><blockquote data-gallery-review-quote></blockquote></div><img data-gallery-review-image alt="Скрин отзыва покупателя">`;
  modal.querySelector(".gallery-panel").append(review);
  const customerReviews = document.createElement("section");
  customerReviews.className = "customer-reviews";
  customerReviews.innerHTML = `<div class="customer-reviews-heading"><div><p class="eyebrow">ВАШИ ВПЕЧАТЛЕНИЯ</p><h3>Оставьте отзыв о букете</h3></div><span>Можно добавить фото</span></div><div class="review-list" data-review-list></div><form class="review-form" data-review-form><div class="review-form-grid"><label>Ваше имя<input name="review_name" required maxlength="60" placeholder="Как к вам обращаться"></label><label>Оценка<select name="review_rating"><option value="5">5 — превосходно</option><option value="4">4 — очень хорошо</option><option value="3">3 — хорошо</option><option value="2">2 — есть пожелания</option><option value="1">1 — расскажите, что улучшить</option></select></label></div><label>Ваш отзыв<textarea name="review_text" required minlength="10" maxlength="1200" rows="3" placeholder="Поделитесь впечатлениями о букете и доставке"></textarea></label><label class="file-field">Фото букета<input name="review_photo" type="file" accept="image/jpeg,image/png,image/webp" data-review-photo><small>JPG, PNG или WEBP · до 5 МБ</small></label><button class="button button-secondary" type="submit">Опубликовать отзыв</button><div class="form-message" data-review-message role="status" aria-live="polite"></div></form>`;
  modal.querySelector(".gallery-panel").append(customerReviews);
  customerReviews.querySelector("[data-review-form]").addEventListener("submit", submitReview);
  modal.querySelectorAll("[data-gallery-close]").forEach((button) => button.addEventListener("click", closeProductGallery));
  modal.querySelector("[data-gallery-order]").addEventListener("click", () => {
    const product = getProduct(modal.dataset.product);
    closeProductGallery();
    if (product) addToCart(product.id);
  });
  return modal;
}

function closeProductGallery() {
  const modal = $("[data-gallery-modal]");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");
}

function openProductGallery(product) {
  const modal = ensureGalleryModal();
  const gallery = product.gallery || [product.image];
  modal.dataset.product = product.id;
  modal.classList.toggle("is-new-product", Boolean(product.newProduct));
  $("[data-gallery-title]", modal).textContent = product.title;
  $("[data-gallery-description]", modal).textContent = product.fullDescription;
  $("[data-gallery-facts]", modal).innerHTML = [
    ["Цена", product.price == null ? (product.priceLabel || "по запросу") : rub(product.price)],
    ["Состав", product.composition],
    ["Размер", product.size],
    ["Изготовление", `${product.prepTime}; букет индивидуален`],
    ["Хранение", product.storage]
  ].map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("");
  const review = $("[data-gallery-review]", modal);
  if (product.reviewImage) {
    review.hidden = false;
    $("[data-gallery-review-image]", review).src = product.reviewImage;
    $("[data-gallery-review-meta]", review).textContent = "Скриншот отзыва покупателя на Flowwow";
    $("[data-gallery-review-quote]", review).textContent = "Текст и оценка видны на оригинальном скриншоте."; 
  } else {
    review.hidden = true;
  }
  const main = $("[data-gallery-main]", modal);
  const thumbs = $("[data-gallery-thumbs]", modal);
  const showImage = (src, button) => {
    main.src = src;
    main.alt = product.title;
    thumbs.querySelectorAll("button").forEach((item) => item.classList.toggle("is-active", item === button));
  };
  thumbs.innerHTML = gallery.map((src, index) => `<button class="gallery-thumb${index === 0 ? " is-active" : ""}" type="button" data-gallery-src="${src}" aria-label="Фото ${index + 1}"><img src="${src}" alt="" loading="lazy"></button>`).join("");
  thumbs.querySelectorAll("[data-gallery-src]").forEach((button) => button.addEventListener("click", () => showImage(button.dataset.gallerySrc, button)));
  showImage(gallery[0], thumbs.querySelector("button"));
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");
  loadCustomerReviews(product.id, modal);
}

const miniCatalogGroups = [
  { id: "new-arrivals", title: "Новые букеты", hint: "Свежие композиции из последней подборки", ids: products.filter((product) => product.newProduct).map((product) => product.id) },
  { id: "under-2000", title: "До 2 000 ₽", hint: "Нежный подарок без лишнего выбора", ids: ["socvetie-krasoty"] },
  { id: "popular", title: "Хиты и готовые подарки", hint: "Самые универсальные композиции", ids: ["gala-bouquet", "flowering-worlds", "perseida", "fantasmagoria"] },
  { id: "close", title: "Маме и близким", hint: "Нежные букеты с тёплым настроением", ids: ["roses-march", "spring-kaleidoscope", "paradise-garden", "boundless-gratitude"] },
  { id: "love", title: "Для двоих", hint: "Романтика и вау-эффект", ids: ["eternal-romance", "paris-date", "venus-kiss-basket", "ode-to-aphrodite"] },
  { id: "bright", title: "Яркие и необычные", hint: "Для характера и большого впечатления", ids: ["neon-pink-chrysanthemum", "neon-dance", "gourmet-bouquet", "unsolved-puzzle", "pandora-bouquet"] },
  { id: "season", title: "Сезонные композиции", hint: "Весенние и зимние настроения", ids: ["spring-announcement", "spring-breath", "tulips-march", "winter-flower-whisper", "parisian-chic"] }
];

function renderMiniProductCards(root, visible) {
  root.innerHTML = visible.map((product) => {
    const gallery = product.gallery || [product.image];
    const priceLabel = product.price == null ? (product.priceLabel || "Цена по запросу") : rub(product.price);
    const orderAction = product.price == null
      ? `<a class="add-button product-contact-link" href="https://max.ru/id583607809709_bot" target="_blank" rel="noopener">Уточнить цену</a>`
      : `<button class="add-button" type="button" data-add="${product.id}">Заказать</button>`;
    const flowwowLink = product.flowwowUrl ? `<a class="product-flowwow-link" href="${product.flowwowUrl}" target="_blank" rel="noopener">Открыть карточку на Flowwow ↗</a>` : "";
    return `<article class="product-card${product.newProduct ? " new-product-card" : ""}"><div class="product-art" style="--product-bg:${product.bg}"><img class="product-image" src="${product.image}" alt="${product.title}" loading="lazy"><span class="product-badge">${product.badge}</span><button class="gallery-open" type="button" data-gallery-product="${product.id}">Фото · ${gallery.length}</button></div><div class="product-body"><div class="product-heading"><h3 class="product-title">${product.title}</h3><span class="product-min-order">${product.price == null ? "цена по запросу" : "от 1 500 ₽"}</span></div><p class="product-description">${product.description}</p><p class="product-handmade-note">Полностью ручная работа · от ${product.prepTime}${product.stock ? ` · в наличии ${product.stock} шт.` : ""}</p><details class="product-details"><summary>Открыть описание и параметры</summary><p>${product.fullDescription}</p><dl><div><dt>Состав</dt><dd>${product.composition}</dd></div><div><dt>Размер</dt><dd>${product.size}</dd></div><div><dt>Производство</dt><dd>${product.country}</dd></div><div><dt>Изготовление</dt><dd>${product.prepTime}; букет индивидуален</dd></div><div><dt>Хранение</dt><dd>${product.storage}</dd></div></dl>${flowwowLink}</details><div class="product-meta"><strong class="product-price">${priceLabel}</strong>${orderAction}</div></div></article>`;
  }).join("");
  $$(".product-min-order", root).forEach((node, index) => { const product = visible[index]; node.textContent = product?.price == null ? "цена по запросу" : product?.stock ? `в наличии: ${product.stock} шт.` : "под заказ"; });
  visible.forEach((product, index) => {
    if (!product.reviewImage) return;
    const chip = document.createElement("span");
    chip.className = "review-chip";
    chip.textContent = "✦ Отзыв Flowwow";
    root.children[index]?.querySelector(".product-art")?.append(chip);
  });
  $$('[data-add]', root).forEach((button) => button.addEventListener("click", () => addToCart(button.dataset.add)));
  $$('[data-gallery-product]', root).forEach((button) => button.addEventListener("click", () => openProductGallery(getProduct(button.dataset.galleryProduct))));
  $$(".product-image", root).forEach((image) => image.addEventListener("click", () => {
    const trigger = image.parentElement.querySelector("[data-gallery-product]");
    if (trigger) openProductGallery(getProduct(trigger.dataset.galleryProduct));
  }));
  $$(".product-art", root).forEach((art) => art.addEventListener("click", (event) => {
    if (event.target.closest("[data-gallery-product]")) return;
    const trigger = art.querySelector("[data-gallery-product]");
    if (trigger) openProductGallery(getProduct(trigger.dataset.galleryProduct));
  }));
  $$('details.product-details', root).forEach((details) => details.addEventListener("toggle", () => {
    if (!details.open) return;
    $$('details.product-details[open]', root).forEach((other) => { if (other !== details) other.open = false; });
  }));
}

function renderMiniCatalog(root) {
  root.classList.add("mini-category-list");
  const quickIds = ["socvetie-krasoty", "gala-bouquet", "fantasmagoria", "perseida"];
  const quickProducts = quickIds.map((id) => getProduct(id)).filter(Boolean);
  const miniWelcomeMarkup = `<section class="mini-welcome"><div class="mini-welcome-kicker">SWEET MOMMY · ПЕНЗА</div><h1>Подарок, который хочется вручить</h1><p>Зефирные букеты и сладкие композиции — под повод, человека и настроение.</p><div class="mini-welcome-meta"><span>натуральные продукты</span><span>доставка Пенза · Сердобск</span><span>фото перед отправкой</span></div><a class="mini-welcome-cta" href="https://max.ru/id583607809709_bot" target="_blank" rel="noopener">Помочь выбрать букет <b>↗</b></a></section>`;
  const choiceIds = ["spring-announcement", "paradise-garden", "eternal-romance"];
  const choiceProducts = choiceIds.map((id) => getProduct(id)).filter(Boolean);
  const choiceLabels = [
    ["Под повод", "День рождения, признание или сюрприз", "Анонс весны"],
    ["Для человека", "Маме, любимой, подруге или коллеге", "Райский сад"],
    ["По настроению", "Нежно, ярко или с эффектом вау", "Вечный роман"]
  ];
  const miniChoiceMarkup = `<aside class="mini-choice-stack" aria-label="Подборка букетов по поводу, человеку и настроению">${choiceProducts.map((product, index) => { const [label] = choiceLabels[index]; return `<button class="mini-choice-card mini-choice-card-${index + 1}" type="button" data-mini-choice="${product.id}" aria-label="Открыть букет ${product.title}: ${label}"><img src="${product.image}" alt="${product.title}" loading="lazy"></button>`; }).join("")}</aside>`;
  const quickMarkup = `<section class="mini-top-offers"><div class="mini-top-heading"><span>БЫСТРЫЙ ВЫБОР</span><b>Красивый подарок — без долгих поисков</b><small>Нажмите на букет: сначала откроются фото и описание, затем его можно заказать.</small></div><div class="mini-top-grid">${quickProducts.map((product, index) => `<button class="mini-top-card mini-top-card-${index + 1}" type="button" data-mini-top-add="${product.id}" aria-label="Открыть карточку букета ${product.title}"><span class="mini-top-photo"><img src="${product.image}" alt="${product.title}" loading="lazy"><i>${String(index + 1).padStart(2, "0")}</i></span><span class="mini-top-info"><b>${product.title}</b><strong>${rub(product.price)}</strong><small>Фото и описание ↗</small></span></button>`).join("")}</div></section>`;
  const categoriesMarkup = miniCatalogGroups.map((group, index) => {
    const groupProducts = group.ids.map((id) => getProduct(id)).filter(Boolean);
    const previewNames = groupProducts.map((product) => product.title).join(", ");
    const preview = groupProducts.slice(0, 4).map((product) => `<img src="${product.image}" alt="" title="${product.title}" loading="lazy">`).join("");
    return `<details class="mini-category"><summary><span class="mini-folder-preview" aria-label="Внутри: ${previewNames}" title="Внутри: ${previewNames}">${preview}</span><span class="mini-folder-copy"><b>${group.title}</b><small>${group.hint}</small></span><em>${group.ids.length} ${bouquetWord(group.ids.length)}</em></summary><div class="product-grid mini-category-grid" data-mini-group="${group.id}"></div></details>`;
  }).join("");
  root.innerHTML = miniWelcomeMarkup + miniChoiceMarkup + quickMarkup + `<div class="mini-catalog-label"><span>КАТАЛОГ</span><b>Выберите настроение подарка</b></div>` + categoriesMarkup;
  $$('details.mini-category', root).forEach((details) => { details.open = false; });
  $$('[data-mini-top-add]', root).forEach((button) => button.addEventListener("click", () => openProductGallery(getProduct(button.dataset.miniTopAdd))));
  $$('[data-mini-choice]', root).forEach((button) => button.addEventListener("click", () => openProductGallery(getProduct(button.dataset.miniChoice))));
  miniCatalogGroups.forEach((group) => {
    const groupRoot = $(`[data-mini-group="${group.id}"]`, root);
    const groupProducts = group.ids.map((id) => getProduct(id)).filter(Boolean);
    renderMiniProductCards(groupRoot, groupProducts);
    const extraCards = [...groupRoot.querySelectorAll(".product-card")].slice(4);
    extraCards.forEach((card) => card.classList.add("mini-extra-product"));
    if (extraCards.length) {
      const moreButton = document.createElement("button");
      moreButton.className = "mini-more-card";
      moreButton.type = "button";
      moreButton.innerHTML = `<strong>+</strong><b>Ещё ${extraCards.length}</b><small>Показать в этой папке</small>`;
      groupRoot.append(moreButton);
      moreButton.addEventListener("click", () => { groupRoot.classList.add("is-expanded"); moreButton.remove(); });
    }
  });
  $$('details.mini-category', root).forEach((details) => {
    const grid = $(".mini-category-grid", details);
    let pauseUntil = 0;
    const stopAutoScroll = () => {
      if (details._miniAutoTimer) window.clearInterval(details._miniAutoTimer);
      details._miniAutoTimer = null;
    };
    const startAutoScroll = () => {
      stopAutoScroll();
      if (!grid) return;
      pauseUntil = Date.now() + 1100;
      details._miniAutoTimer = window.setInterval(() => {
        if (!details.open || Date.now() < pauseUntil) return;
        const maxScroll = grid.scrollWidth - grid.clientWidth;
        if (maxScroll <= 12) return;
        const step = Math.max(120, Math.round(grid.clientWidth * .52));
        const nextScroll = grid.scrollLeft + step;
        grid.scrollTo({ left: nextScroll >= maxScroll - 10 ? 0 : nextScroll, behavior: "smooth" });
      }, 3400);
    };
    grid?.addEventListener("pointerdown", () => { pauseUntil = Date.now() + 7000; });
    grid?.addEventListener("wheel", () => { pauseUntil = Date.now() + 7000; }, { passive: true });
    details.addEventListener("toggle", () => {
      if (!details.open) { stopAutoScroll(); return; }
      $$('details.mini-category[open]', root).forEach((other) => { if (other !== details) other.open = false; });
      startAutoScroll();
    });
  });
  const requestedProductId = new URLSearchParams(window.location.search).get("product");
  if (requestedProductId) {
    const requestedButton = [...root.querySelectorAll("[data-gallery-product]")].find((button) => button.dataset.galleryProduct === requestedProductId);
    const requestedCard = requestedButton?.closest(".product-card");
    const requestedCategory = requestedCard?.closest("details.mini-category");
    if (requestedCategory && requestedCard) {
      requestedCategory.open = true;
      if (requestedCard.classList.contains("mini-extra-product")) requestedCategory.querySelector(".mini-more-card")?.click();
      requestAnimationFrame(() => {
        requestedCard.classList.add("is-mini-recommended");
        requestedCard.scrollIntoView({ block: "center", behavior: "smooth" });
        setTimeout(() => requestedCard.classList.remove("is-mini-recommended"), 2400);
      });
    } else {
      const requestedTopCard = [...root.querySelectorAll("[data-mini-top-add]")].find((button) => button.dataset.miniTopAdd === requestedProductId);
      if (requestedTopCard) requestAnimationFrame(() => { requestedTopCard.classList.add("is-mini-recommended"); requestedTopCard.scrollIntoView({ block: "center", behavior: "smooth" }); setTimeout(() => requestedTopCard.classList.remove("is-mini-recommended"), 2400); });
    }
  }
}

function renderProducts() {
  const root = $("[data-products]");
  const visible = state.filter === "under-2000"
    ? products.filter((product) => Number.isFinite(product.price) && product.price <= 2000)
    : products.filter((product) => product.filters.includes(state.filter));
  const sectionNote = $("#catalog .section-note");
  if (sectionNote) sectionNote.textContent = "От 1 500 ₽ · ручная работа · Пенза, Сердобск и область по согласованию";
  $$('a[href*="t.me/"]').forEach((link) => { link.href = "https://t.me/DVLADI58"; });
  if (document.documentElement.classList.contains("is-max-miniapp")) {
    renderMiniCatalog(root);
    return;
  }
  root.innerHTML = visible.map((product) => {
    const gallery = product.gallery || [product.image];
    const priceLabel = product.price == null ? (product.priceLabel || "Цена по запросу") : rub(product.price);
    const orderAction = product.price == null
      ? `<a class="add-button product-contact-link" href="https://max.ru/id583607809709_bot" target="_blank" rel="noopener">Уточнить цену</a>`
      : `<button class="add-button" type="button" data-add="${product.id}">Заказать</button>`;
    const flowwowLink = product.flowwowUrl ? `<a class="product-flowwow-link" href="${product.flowwowUrl}" target="_blank" rel="noopener">Открыть карточку на Flowwow ↗</a>` : "";
    return `<article class="product-card${product.newProduct ? " new-product-card" : ""}"><div class="product-art" style="--product-bg:${product.bg}"><img class="product-image" src="${product.image}" alt="${product.title}" loading="lazy"><span class="product-badge">${product.badge}</span><button class="gallery-open" type="button" data-gallery-product="${product.id}">Фото · ${gallery.length}</button></div><div class="product-body"><div class="product-heading"><h3 class="product-title">${product.title}</h3><span class="product-min-order">${product.price == null ? "цена по запросу" : "от 1 500 ₽"}</span></div><p class="product-description">${product.description}</p><p class="product-handmade-note">Полностью ручная работа · от ${product.prepTime}${product.stock ? ` · в наличии ${product.stock} шт.` : ""}</p><details class="product-details"><summary>Описание и параметры</summary><p>${product.fullDescription}</p><dl><div><dt>Состав</dt><dd>${product.composition}</dd></div><div><dt>Размер</dt><dd>${product.size}</dd></div><div><dt>Производство</dt><dd>${product.country}</dd></div><div><dt>Изготовление</dt><dd>${product.prepTime}; букет индивидуален</dd></div><div><dt>Хранение</dt><dd>${product.storage}</dd></div></dl>${flowwowLink}</details><div class="product-meta"><strong class="product-price">${priceLabel}</strong>${orderAction}</div></div></article>`;
  }).join("");
  $$(".product-min-order", root).forEach((node, index) => { const product = visible[index]; node.textContent = product?.price == null ? "цена по запросу" : product?.stock ? `в наличии: ${product.stock} шт.` : "под заказ"; });
  $$('details.product-details', root).forEach((details) => details.addEventListener('toggle', () => {
    if (!details.open) return;
    $$('details.product-details[open]', root).forEach((other) => {
      if (other !== details) other.open = false;
    });
  }));
  $$('details.product-details summary', root).forEach((summary) => { summary.textContent = "Открыть описание и параметры"; });
  visible.forEach((product, index) => {
    if (!product.reviewImage) return;
    const chip = document.createElement("span");
    chip.className = "review-chip";
    chip.textContent = "✦ Отзыв Flowwow";
    root.children[index]?.querySelector(".product-art")?.append(chip);
  });
  $$('[data-add]', root).forEach((button) => button.addEventListener("click", () => addToCart(button.dataset.add)));
  $$('[data-gallery-product]', root).forEach((button) => button.addEventListener("click", () => openProductGallery(getProduct(button.dataset.galleryProduct))));
  $$(".product-image", root).forEach((image) => image.addEventListener("click", () => {
    const trigger = image.parentElement.querySelector("[data-gallery-product]");
    if (trigger) openProductGallery(getProduct(trigger.dataset.galleryProduct));
  }));
  $$(".product-art", root).forEach((art) => art.addEventListener("click", (event) => {
    if (event.target.closest("[data-gallery-product]")) return;
    const trigger = art.querySelector("[data-gallery-product]");
    if (trigger) openProductGallery(getProduct(trigger.dataset.galleryProduct));
  }));
}

function initPhotoPreviews() {
  $$('[data-photo-input]').forEach((input) => {
    input.addEventListener("change", () => {
      const preview = input.closest(".file-field")?.querySelector("[data-photo-preview]");
      if (!preview) return;
      preview.replaceChildren();
      const file = input.files?.[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        input.value = "";
        preview.textContent = "Фото больше 5 МБ — выберите другой файл.";
        return;
      }
      const image = document.createElement("img");
      image.alt = "Предпросмотр фото";
      image.src = URL.createObjectURL(file);
      preview.append(image, document.createTextNode(file.name));
    });
  });
}

function configureMiniAppShell() {
  document.documentElement.classList.add("is-max-miniapp");
  const catalogTitle = $("#catalog .section-heading h2");
  const catalogNote = $("#catalog .section-note");
  const careNote = $("#catalog .catalog-care-note");
  if (catalogTitle) catalogTitle.textContent = "Удивите близких красивым и вкусным букетом";
  if (catalogNote) catalogNote.textContent = "От 1 500 ₽ · ручная работа · Пенза, Сердобск и область по согласованию";
  if (careNote) {
    careNote.innerHTML = `<strong>Ручная работа</strong><span>Каждая композиция собирается индивидуально и может отличаться от фото оригинала на сайте оттенком, размером, формой и составом.</span><span>Изготовление — от 12 часов.</span>`;
  }
  const filters = $(".filters");
  if (filters) filters.hidden = true;
  const resetMiniScroll = () => window.scrollTo({ top: 0, behavior: "auto" });
  requestAnimationFrame(resetMiniScroll);
  setTimeout(resetMiniScroll, 220);
}

function initMaxMiniApp() {
  const maxApp = window.WebApp;
  const params = new URLSearchParams(window.location.search);
  const isPreview = params.get("miniapp") === "preview";
  const isSitePreview = params.get("site") === "1";
  const isMaxRuntime = Boolean(maxApp?.initData);
  if (isSitePreview || (!isPreview && !isMaxRuntime)) return;
  configureMiniAppShell();
  maxApp?.ready?.();
  maxApp?.expand?.();
}

let deferredPwaPrompt = null;
let pwaHintTimer = null;

function showPwaHint(message) {
  const hint = $("[data-pwa-hint]");
  if (!hint) return;
  hint.textContent = message;
  hint.hidden = false;
  clearTimeout(pwaHintTimer);
  pwaHintTimer = setTimeout(() => { hint.hidden = true; }, 6500);
}

function initPwa() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => undefined), { once: true });
  }
  const installButtons = $$('[data-pwa-install]');
  if (!installButtons.length) return;
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPwaPrompt = event;
  });
  window.addEventListener("appinstalled", () => {
    deferredPwaPrompt = null;
    installButtons.forEach((button) => { button.hidden = true; });
    showPwaHint("Sweet Mommy добавлен на главный экран.");
  });
  installButtons.forEach((installButton) => installButton.addEventListener("click", async () => {
    if (!deferredPwaPrompt) {
      showPwaHint("Android: выберите «Установить приложение» в меню браузера. iPhone: «Поделиться» → «На экран Домой».");
      return;
    }
    deferredPwaPrompt.prompt();
    const choice = await deferredPwaPrompt.userChoice;
    if (choice?.outcome === "accepted") showPwaHint("Готово — приложение можно открыть с главного экрана.");
    deferredPwaPrompt = null;
  }));
}

function init() {
  initPwa();
  initMaxMiniApp();
  renderProducts(); renderCart();
  checkPaymentAfterReturn();
  initPhotoPreviews();
  $("[data-lead-form]")?.addEventListener("submit", submitLead);
  $$("[data-filter]").forEach((button) => button.addEventListener("click", () => { state.filter = button.dataset.filter; $$("[data-filter]").forEach((item) => item.classList.toggle("is-active", item === button)); renderProducts(); }));
  $$("[data-open-cart]").forEach((button) => button.addEventListener("click", openCart)); $$("[data-close-cart]").forEach((button) => button.addEventListener("click", closeCart)); $("[data-checkout]").addEventListener("click", openCheckout); $("[data-mini-checkout]")?.addEventListener("click", openCheckout); $("[data-close-checkout]").addEventListener("click", closeCheckout); $("[data-checkout-form]").addEventListener("submit", submitOrder); $("[data-checkout-form]").addEventListener("input", (event) => { event.target.removeAttribute("aria-invalid"); }); $("[data-checkout-form]").addEventListener("change", (event) => { event.target.removeAttribute("aria-invalid"); }); $("[data-delivery-zone]").addEventListener("change", renderCheckoutSummary);
  const dateInput = $("input[name=delivery_date]");
  const slotInput = $("input[name=delivery_slot]");
  if (dateInput && slotInput) {
    const availabilityNote = document.createElement("small");
    availabilityNote.className = "delivery-availability-note";
    availabilityNote.dataset.deliveryAvailability = "";
    slotInput.parentElement?.after(availabilityNote);
    dateInput.addEventListener("change", syncDeliveryCalendar);
    slotInput.addEventListener("change", syncDeliveryCalendar);
    slotInput.addEventListener("input", syncDeliveryCalendar);
    syncDeliveryCalendar();
  }
  if (localStorage.getItem("sweet-mommy-cookie-ok") === "1") {
    $("[data-cookie-banner]").hidden = true;
  }
  $("[data-cookie-ok]").addEventListener("click", () => { localStorage.setItem("sweet-mommy-cookie-ok", "1"); $("[data-cookie-banner]").hidden = true; });
  document.addEventListener("click", (event) => {
    if (event.target.closest("details.product-details")) return;
    document.querySelectorAll("details.product-details[open]").forEach((details) => { details.open = false; });
  });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") { closeCart(); closeCheckout(); } });
}
document.addEventListener("DOMContentLoaded", init);
