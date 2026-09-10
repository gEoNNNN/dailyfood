import { menuCategories, type MenuCategory } from "./menuData";

// Google Sheet integration is temporarily disabled: the published sheet has
// outdated products/prices and corrupted Russian text (mojibake), which caused
// order validation to reject products that exist only in the local menu.
// The local menu (menuData.ts) is the single source of truth for now.
// To re-enable: restore the CSV parsing + fetch logic and MENU_CSV_URL env var.

export async function getMenuCategories(): Promise<MenuCategory[]> {
  return menuCategories;
}
