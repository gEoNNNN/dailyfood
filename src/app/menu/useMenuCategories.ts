"use client";

import { useEffect, useState } from "react";
import { menuCategories, type MenuCategory } from "./menuData";

export function useMenuCategories() {
  const [categories, setCategories] = useState<MenuCategory[]>(menuCategories);

  useEffect(() => {
    let active = true;

    async function refresh() {
      try {
        const response = await fetch("/api/menu");
        if (!response.ok) return;
        const nextCategories: unknown = await response.json();
        if (active && Array.isArray(nextCategories)) setCategories(nextCategories as MenuCategory[]);
      } catch {}
    }

    void refresh();
    const interval = window.setInterval(refresh, 60_000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return categories;
}
