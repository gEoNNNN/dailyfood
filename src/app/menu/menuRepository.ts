import { menuCategories, type CategoryId, type MenuCategory, type MenuProduct } from "./menuData";

const cacheDuration = 60_000;
const categoryIds = new Set(menuCategories.map((category) => category.id));
const localProducts = new Map(menuCategories.flatMap((category) => category.items.map((item) => [item.id, item] as const)));
const promotionCategory = menuCategories.find((category) => category.id === "promotii");
const promotionIds = new Set([...(promotionCategory?.items.map((item) => item.id) ?? []), "promo-doi-big-beef"]);
let cachedMenu: { expiresAt: number; categories: MenuCategory[] } | null = null;

function parseCsv(value: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (character === '"') {
      if (quoted && value[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && value[index + 1] === "\n") index += 1;
      row.push(field);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  row.push(field);
  if (row.some((cell) => cell.trim())) rows.push(row);
  return rows;
}

function parseMenu(value: string): MenuCategory[] | null {
  const [headerRow, ...rows] = parseCsv(value);
  if (!headerRow) return null;
  const headers = headerRow.map((header) => header.replace(/^\uFEFF/, "").trim().toLowerCase());
  const requiredHeaders = ["id", "category", "name_ro", "name_ru", "description_ro", "description_ru", "price"];
  if (requiredHeaders.some((header) => !headers.includes(header))) return null;

  const records = rows.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index]?.trim() ?? ""])));
  const productsByCategory = new Map<CategoryId, Array<MenuProduct & { order: number }>>();
  const sheetCategories = new Set<CategoryId>();
  const seenIds = new Set<string>();
  let recognizedRows = 0;
  let enabledRows = 0;

  for (const record of records) {
    const category = record.category as CategoryId;
    if (!/^[a-z0-9-]{2,100}$/.test(record.id) || !categoryIds.has(category) || seenIds.has(record.id)) continue;
    sheetCategories.add(category);
    recognizedRows += 1;
    if (["false", "0", "nu", "no"].includes((record.active ?? "").toLowerCase())) continue;
    enabledRows += 1;

    const price = Number(record.price.replace(",", "."));
    if (!record.name_ro || !record.name_ru || !record.description_ro || !record.description_ru || !Number.isFinite(price) || price <= 0 || price > 10_000) continue;

    const localProduct = localProducts.get(record.id);
    let image = localProduct?.image;
    if (record.image_url) {
      try {
        const imageUrl = new URL(record.image_url);
        if (imageUrl.protocol === "https:" && imageUrl.hostname === "res.cloudinary.com") image = imageUrl.toString();
      } catch {}
    }

    const product: MenuProduct & { order: number } = {
      id: record.id,
      name: { ro: record.name_ro.slice(0, 120), ru: record.name_ru.slice(0, 120) },
      description: { ro: record.description_ro.slice(0, 500), ru: record.description_ru.slice(0, 500) },
      price,
      image,
      imageFit: record.image_fit === "contain" ? "contain" : localProduct?.imageFit ?? "cover",
      order: Number.isFinite(Number(record.order)) ? Number(record.order) : Number.MAX_SAFE_INTEGER,
    };
    if (record.tag_ro || record.tag_ru) product.tag = { ro: record.tag_ro || record.tag_ru, ru: record.tag_ru || record.tag_ro };

    productsByCategory.set(category, [...(productsByCategory.get(category) ?? []), product]);
    seenIds.add(record.id);
  }

  if (!recognizedRows || (enabledRows && !seenIds.size)) return null;
  const hasSheetPromotions = sheetCategories.has("promotii");
  return menuCategories.flatMap((category) => {
    if (category.id === "promotii" && !hasSheetPromotions) return [category];
    const sheetItems = productsByCategory.get(category.id)?.sort((first, second) => first.order - second.order).map((item): MenuProduct => ({ id: item.id, name: item.name, description: item.description, price: item.price, image: item.image, tag: item.tag, imageFit: item.imageFit })) ?? [];
    const items = hasSheetPromotions ? sheetItems : sheetItems.filter((item) => !promotionIds.has(item.id));
    return items.length ? [{ ...category, items }] : [];
  });
}

function getSheetUrl() {
  const value = process.env.MENU_CSV_URL?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "docs.google.com" ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function getMenuCategories() {
  const sheetUrl = getSheetUrl();
  if (!sheetUrl) return menuCategories;
  if (cachedMenu && cachedMenu.expiresAt > Date.now()) return cachedMenu.categories;

  try {
    const response = await fetch(sheetUrl, { cache: "no-store", signal: AbortSignal.timeout(5_000) });
    if (!response.ok) return cachedMenu?.categories ?? menuCategories;
    const categories = parseMenu(await response.text());
    if (!categories) return cachedMenu?.categories ?? menuCategories;
    cachedMenu = { expiresAt: Date.now() + cacheDuration, categories };
    return categories;
  } catch {
    return cachedMenu?.categories ?? menuCategories;
  }
}
