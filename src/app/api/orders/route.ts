import { menuCategories } from "../../menu/menuData";

type OrderRequest = {
  language?: unknown;
  deliveryOption?: unknown;
  payment?: unknown;
  name?: unknown;
  phone?: unknown;
  address?: unknown;
  apartment?: unknown;
  notes?: unknown;
  website?: unknown;
  items?: unknown;
};

type RequestedItem = { id?: unknown; quantity?: unknown };

const products = new Map(menuCategories.flatMap((category) => category.items.map((item) => [item.id, item] as const)));
const deliveryOptions = {
  pickup: { label: "Ridicare din local / Самовывоз", fee: 0, requiresAddress: false },
  botanica: { label: "Botanica / Ботаника", fee: 50, requiresAddress: true },
  "centru-telecentru": { label: "Centru / Telecentru", fee: 60, requiresAddress: true },
  "suburbii-apropiate": { label: "Codru / Băcioi / Bîc / Bubuieci", fee: 70, requiresAddress: true },
  singera: { label: "Sîngera / Сынжера", fee: 90, requiresAddress: true },
} as const;

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function json(body: object, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json({ error: "invalid_origin" }, 403);
    } catch {
      return json({ error: "invalid_origin" }, 403);
    }
  }

  let body: OrderRequest;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_request" }, 400);
  }

  if (text(body.website, 100)) return json({ ok: true });

  const language = body.language === "ru" ? "ru" : "ro";
  const deliveryOptionId = text(body.deliveryOption, 50);
  const deliveryOption = deliveryOptions[deliveryOptionId as keyof typeof deliveryOptions];
  const payment = body.payment === "card" ? "card" : body.payment === "cash" ? "cash" : null;
  const name = text(body.name, 80);
  const phone = text(body.phone, 30);
  const address = text(body.address, 180);
  const apartment = text(body.apartment, 100);
  const notes = text(body.notes, 500);

  if (!deliveryOption || !payment || name.length < 2 || !/^(?:\+373|0)\s?\d{2}(?:\s?\d{3}){2}$/.test(phone) || (deliveryOption.requiresAddress && address.length < 4)) {
    return json({ error: "invalid_customer_details" }, 400);
  }

  if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 30) {
    return json({ error: "invalid_items" }, 400);
  }

  const orderItems = (body.items as RequestedItem[]).map((requested) => {
    const id = text(requested.id, 100);
    const quantity = typeof requested.quantity === "number" && Number.isInteger(requested.quantity) ? requested.quantity : 0;
    const product = products.get(id);
    return product && quantity > 0 && quantity <= 20 ? { product, quantity } : null;
  });

  if (orderItems.some((item) => item === null)) return json({ error: "invalid_items" }, 400);

  const validItems = orderItems.filter((item): item is NonNullable<typeof item> => item !== null);
  const subtotal = validItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  if (deliveryOption.requiresAddress && subtotal < 130) return json({ error: "delivery_minimum_not_met" }, 400);
  const cityDelivery = deliveryOptionId === "botanica" || deliveryOptionId === "centru-telecentru";
  const deliveryFee = cityDelivery && subtotal >= 500 ? 0 : deliveryOption.fee;
  const grandTotal = subtotal + deliveryFee;
  const orderId = `DK-${Date.now().toString(36).toUpperCase()}`;
  const paymentLabel = payment === "card" ? "Card / Карта" : "Numerar / Наличные";
  const itemLines = validItems.map(({ product, quantity }) => `• ${quantity} × ${escapeHtml(product.name[language])} — <b>${product.price * quantity} MDL</b>`).join("\n");
  const locationLines = deliveryOption.requiresAddress ? `\n<b>Adresă:</b> ${escapeHtml(address)}${apartment ? `\n<b>Detalii adresă:</b> ${escapeHtml(apartment)}` : ""}` : "";
  const noteLine = notes ? `\n<b>Note:</b> ${escapeHtml(notes)}` : "";
  const message = `<b>COMANDĂ NOUĂ ${orderId}</b>\n\n${itemLines}\n\n<b>Produse: ${subtotal} MDL</b>\n<b>Livrare: ${deliveryFee} MDL</b>\n<b>TOTAL: ${grandTotal} MDL</b>\n\n<b>Client:</b> ${escapeHtml(name)}\n<b>Telefon:</b> ${escapeHtml(phone)}\n<b>Metoda de ridicare:</b> ${deliveryOption.label}\n<b>Plată:</b> ${paymentLabel}${locationLines}${noteLine}`;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (!botToken || !chatId) return json({ error: "telegram_not_configured" }, 503);

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML", disable_web_page_preview: true }),
      cache: "no-store",
    });

    if (!telegramResponse.ok) return json({ error: "telegram_delivery_failed" }, 502);
    return json({ ok: true, orderId });
  } catch {
    return json({ error: "telegram_unavailable" }, 502);
  }
}
