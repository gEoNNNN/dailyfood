import { getPendingOrders, removePendingOrder } from "../../../lib/pendingOrders";
import { verifySessionToken, getSessionCookieName } from "../../../lib/auth";

const TELEGRAM_API = "https://api.telegram.org/bot";

let lastUpdateId = 0;

function parseCookie(cookie: string, name: string): string | null {
  const match = cookie.match(new RegExp(`${name}=([^;]+)`));
  return match ? match[1] : null;
}

async function checkTelegramForPin(botToken: string, pin: string): Promise<boolean> {
  try {
    const url = `${TELEGRAM_API}${botToken}/getUpdates?offset=${lastUpdateId}&timeout=0`;
    const resp = await fetch(url, { cache: "no-store" });
    if (!resp.ok) return false;
    const data = await resp.json() as { ok: boolean; result?: Array<{ update_id: number; message?: { text?: string } }> };
    if (!data.ok || !data.result) return false;

    let found = false;
    for (const update of data.result) {
      lastUpdateId = update.update_id + 1;
      const text = update.message?.text?.trim() ?? "";
      if (text === pin) found = true;
    }
    return found;
  } catch {
    return false;
  }
}

async function sendOrderToTelegram(botToken: string, chatId: string, message: string): Promise<boolean> {
  try {
    const resp = await fetch(`${TELEGRAM_API}${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML", disable_web_page_preview: true }),
      cache: "no-store",
    });
    return resp.ok;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const token = parseCookie(cookie, getSessionCookieName());
  if (!verifySessionToken(token)) return Response.json({ error: "unauthorized" }, { status: 401 });

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  const pin = process.env.ORDER_PIN;
  if (!botToken || !chatId || !pin) return Response.json({ error: "config_missing" }, { status: 503 });

  const pending = await getPendingOrders();
  if (pending.length === 0) return Response.json({ pending: 0, confirmed: 0 });

  const pinMatched = await checkTelegramForPin(botToken, pin);
  if (!pinMatched) return Response.json({ pending: pending.length, confirmed: 0 });

  let confirmed = 0;
  for (const order of pending) {
    const sent = await sendOrderToTelegram(botToken, chatId, order.message);
    if (sent) {
      await removePendingOrder(order.orderId);
      confirmed += 1;
    }
  }

  return Response.json({ pending: pending.length - confirmed, confirmed });
}
