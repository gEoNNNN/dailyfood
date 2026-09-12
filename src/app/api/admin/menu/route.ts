import { getAllProducts, addProduct, updateProduct, deleteProduct, type StoredProduct } from "../../../../lib/menuStore";
import { verifySessionToken, getSessionCookieName } from "../../../../lib/auth";
import type { CategoryId } from "../../../menu/menuData";

export const runtime = "nodejs";

function isAuthenticated(request: Request): boolean {
  const cookies = request.headers.get("cookie") ?? "";
  const token = cookies
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${getSessionCookieName()}=`))
    ?.split("=")[1];
  return verifySessionToken(token);
}

function json(body: object, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

const categoryIds: string[] = ["kebab", "burger", "kebab-menu", "burger-menu", "promotii", "croki-menu", "salate", "bauturi"];

function parseProduct(body: unknown): StoredProduct | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const id = typeof b.id === "string" ? b.id.trim().toLowerCase().replace(/\s+/g, "-") : "";
  const categoryRaw = typeof b.category === "string" ? b.category : "";
  const name_ro = typeof b.name_ro === "string" ? b.name_ro.trim() : "";
  const name_ru = typeof b.name_ru === "string" ? b.name_ru.trim() : "";
  const description_ro = typeof b.description_ro === "string" ? b.description_ro.trim() : "";
  const description_ru = typeof b.description_ru === "string" ? b.description_ru.trim() : "";
  const price = typeof b.price === "number" ? b.price : Number(b.price);
  const image_url = typeof b.image_url === "string" ? b.image_url.trim() : "";
  const tag_ro = typeof b.tag_ro === "string" ? b.tag_ro.trim() : "";
  const tag_ru = typeof b.tag_ru === "string" ? b.tag_ru.trim() : "";
  const image_fit = b.image_fit === "contain" ? "contain" : "cover";
  const active = b.active !== false && b.active !== "false" && b.active !== "0";
  const order = typeof b.order === "number" ? b.order : Number(b.order) || 0;

  if (!id || !categoryIds.includes(categoryRaw as CategoryId) || !name_ro || !name_ru || !Number.isFinite(price) || price <= 0) return null;

  const category = categoryRaw as CategoryId;
  return { id, category, name_ro, name_ru, description_ro, description_ru, price, image_url, tag_ro, tag_ru, image_fit, active, order };
}

export async function GET(request: Request) {
  if (!isAuthenticated(request)) return json({ error: "unauthorized" }, 401);
  const products = await getAllProducts();
  return json({ products });
}

export async function POST(request: Request) {
  if (!isAuthenticated(request)) return json({ error: "unauthorized" }, 401);
  let body: unknown;
  try { body = await request.json(); } catch { return json({ error: "invalid_request" }, 400); }
  const product = parseProduct(body);
  if (!product) return json({ error: "invalid_product" }, 400);
  const added = await addProduct(product);
  return added ? json({ ok: true }) : json({ error: "duplicate_id" }, 409);
}

export async function PUT(request: Request) {
  if (!isAuthenticated(request)) return json({ error: "unauthorized" }, 401);
  let body: unknown;
  try { body = await request.json(); } catch { return json({ error: "invalid_request" }, 400); }
  const product = parseProduct(body);
  if (!product) return json({ error: "invalid_product" }, 400);
  const updated = await updateProduct(product.id, product);
  return updated ? json({ ok: true }) : json({ error: "not_found" }, 404);
}

export async function DELETE(request: Request) {
  if (!isAuthenticated(request)) return json({ error: "unauthorized" }, 401);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return json({ error: "missing_id" }, 400);
  const deleted = await deleteProduct(id);
  return deleted ? json({ ok: true }) : json({ error: "not_found" }, 404);
}
