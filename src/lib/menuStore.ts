import { promises as fs } from "fs";
import path from "path";
import { menuCategories, type CategoryId, type MenuProduct } from "../app/menu/menuData";

export type StoredProduct = {
  id: string;
  category: CategoryId;
  name_ro: string;
  name_ru: string;
  description_ro: string;
  description_ru: string;
  price: number;
  image_url: string;
  tag_ro: string;
  tag_ru: string;
  image_fit: "cover" | "contain";
  active: boolean;
  order: number;
};

type StoreData = { products: StoredProduct[] };

const STORE_PATH = path.join(process.cwd(), "data", "menu.json");

function localProductsToStore(): StoredProduct[] {
  const products: StoredProduct[] = [];
  let order = 0;
  for (const category of menuCategories) {
    for (const item of category.items) {
      order += 1;
      products.push({
        id: item.id,
        category: category.id,
        name_ro: item.name.ro,
        name_ru: item.name.ru,
        description_ro: item.description.ro,
        description_ru: item.description.ru,
        price: item.price,
        image_url: "",
        tag_ro: item.tag?.ro ?? "",
        tag_ru: item.tag?.ru ?? "",
        image_fit: item.imageFit ?? "cover",
        active: true,
        order,
      });
    }
  }
  return products;
}

async function ensureStore(): Promise<StoreData> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    const data = JSON.parse(raw.replace(/^\uFEFF/, "")) as StoreData;
    if (data && Array.isArray(data.products)) return data;
  } catch {}
  const initial: StoreData = { products: localProductsToStore() };
  await writeStore(initial);
  return initial;
}

async function writeStore(data: StoreData) {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function getAllProducts(): Promise<StoredProduct[]> {
  const store = await ensureStore();
  return [...store.products].sort((a, b) => a.order - b.order);
}

export async function getActiveProducts(): Promise<StoredProduct[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.active);
}

export async function addProduct(product: StoredProduct): Promise<boolean> {
  const store = await ensureStore();
  if (store.products.some((p) => p.id === product.id)) return false;
  store.products.push(product);
  await writeStore(store);
  return true;
}

export async function updateProduct(id: string, updates: Partial<StoredProduct>): Promise<boolean> {
  const store = await ensureStore();
  const index = store.products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  store.products[index] = { ...store.products[index], ...updates, id: store.products[index].id };
  await writeStore(store);
  return true;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const store = await ensureStore();
  const before = store.products.length;
  store.products = store.products.filter((p) => p.id !== id);
  if (store.products.length === before) return false;
  await writeStore(store);
  return true;
}

export function buildMenuFromStore(products: StoredProduct[]): typeof menuCategories {
  const localImages = new Map<string, MenuProduct["image"]>();
  for (const category of menuCategories) {
    for (const item of category.items) {
      if (item.image) localImages.set(item.id, item.image);
    }
  }

  return menuCategories.flatMap((category) => {
    const items = products
      .filter((p) => p.category === category.id)
      .map((p): MenuProduct => {
        const image = p.image_url || localImages.get(p.id) || undefined;
        return {
          id: p.id,
          name: { ro: p.name_ro, ru: p.name_ru },
          description: { ro: p.description_ro, ru: p.description_ru },
          price: p.price,
          ...(image ? { image } : {}),
          ...(p.tag_ro || p.tag_ru ? { tag: { ro: p.tag_ro || p.tag_ru, ru: p.tag_ru || p.tag_ro } } : {}),
          imageFit: p.image_fit,
        };
      });
    return items.length ? [{ ...category, items }] : [];
  });
}
