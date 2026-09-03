import { menuCategories } from "../../menu/menuData";

type OrderRequest = {
  language?: unknown;
  fulfilment?: unknown;
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
  const fulfilment = body.fulfilment === "pickup" ? "pickup" : body.fulfilment === "delivery" ? "delivery" : null;
  const payment = body.payment === "card" ? "card" : body.payment === "cash" ? "cash" : null;
  const name = text(body.name, 80);
  const phone = text(body.phone, 30);
  const address = text(body.address, 180);
  const apartment = text(body.apartment, 100);
  const notes = text(body.notes, 500);

  if (!fulfilment || !payment || name.length < 2 || !/^(?:\+373|0)\s?\d{2}(?:\s?\d{3}){2}$/.test(phone) || (fulfilment === "delivery" && address.length < 4)) {
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
  const total = validItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const orderId = `DK-${Date.now().toString(36).toUpperCase()}`;
  const fulfilmentLabel = fulfilment === "delivery" ? "Livrare / Доставка" : "Ridicare / Самовывоз";
  const paymentLabel = payment === "card" ? "Card / Карта" : "Numerar / Наличные";
  const itemLines = validItems.map(({ product, quantity }) => `• ${quantity} × ${escapeHtml(product.name[language])} — <b>${product.price * quantity} MDL</b>`).join("\n");
  const locationLines = fulfilment === "delivery" ? `\n<b>Adresă:</b> ${escapeHtml(address)}${apartment ? `\n<b>Detalii adresă:</b> ${escapeHtml(apartment)}` : ""}` : "";
  const noteLine = notes ? `\n<b>Note:</b> ${escapeHtml(notes)}` : "";
  const message = `<b>COMANDĂ NOUĂ ${orderId}</b>\n\n${itemLines}\n\n<b>Total produse: ${total} MDL</b>\n\n<b>Client:</b> ${escapeHtml(name)}\n<b>Telefon:</b> ${escapeHtml(phone)}\n<b>Tip:</b> ${fulfilmentLabel}\n<b>Plată:</b> ${paymentLabel}${locationLines}${noteLine}`;

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
