import { getMenuCategories } from "../../menu/menuRepository";

export async function GET() {
  const categories = await getMenuCategories();
  return Response.json(categories, {
    headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
  });
}
