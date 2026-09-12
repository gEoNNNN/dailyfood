import { menuCategories, type MenuCategory } from "./menuData";
import { getActiveProducts, buildMenuFromStore } from "../../lib/menuStore";

export async function getMenuCategories(): Promise<MenuCategory[]> {
  try {
    const products = await getActiveProducts();
    if (products.length > 0) return buildMenuFromStore(products);
  } catch {
    // fall through to local menu
  }
  return menuCategories;
}
