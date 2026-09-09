"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import type { MenuCategory } from "./menu/menuData";

export type CartItem = {
  id: string;
  nameRo: string;
  nameRu: string;
  price: number;
  quantity: number;
};

type NewCartItem = Omit<CartItem, "quantity">;
type CartContextValue = {
  items: CartItem[];
  add: (item: NewCartItem) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  totalQuantity: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const cartKey = "daily-shopping-cart";
const cartEvent = "daily-cart-change";
const emptySnapshot = "[]";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(cartEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(cartEvent, callback);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(cartKey) ?? emptySnapshot;
}

function getServerSnapshot() {
  return emptySnapshot;
}

function parseItems(value: string): CartItem[] {
  try {
    const items: unknown = JSON.parse(value);
    if (!Array.isArray(items)) return [];
    return items.filter((item): item is CartItem => {
      if (!item || typeof item !== "object") return false;
      const candidate = item as Partial<CartItem>;
      return typeof candidate.id === "string" && typeof candidate.nameRo === "string" && typeof candidate.nameRu === "string" && typeof candidate.price === "number" && Number.isFinite(candidate.price) && typeof candidate.quantity === "number" && Number.isInteger(candidate.quantity) && candidate.quantity > 0;
    });
  } catch {
    return [];
  }
}

function updateCart(updater: (items: CartItem[]) => CartItem[]) {
  const nextItems = updater(parseItems(getSnapshot()));
  window.localStorage.setItem(cartKey, JSON.stringify(nextItems));
  window.dispatchEvent(new Event(cartEvent));
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const items = useMemo(() => parseItems(snapshot), [snapshot]);

  useEffect(() => {
    let active = true;
    async function syncMenu() {
      try {
        const response = await fetch("/api/menu");
        if (!response.ok || !active) return;
        const categories = await response.json() as MenuCategory[];
        const products = new Map(categories.flatMap((category) => category.items.map((item) => [item.id, item] as const)));
        updateCart((current) => current.flatMap((item) => {
          const product = products.get(item.id);
          return product ? [{ ...item, nameRo: product.name.ro, nameRu: product.name.ru, price: product.price }] : [];
        }));
      } catch {}
    }
    void syncMenu();
    return () => { active = false; };
  }, []);

  const add = useCallback((item: NewCartItem) => updateCart((current) => {
    const existing = current.find((entry) => entry.id === item.id);
    return existing ? current.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry) : [...current, { ...item, quantity: 1 }];
  }), []);
  const increment = useCallback((id: string) => updateCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)), []);
  const decrement = useCallback((id: string) => updateCart((current) => current.flatMap((item) => item.id !== id ? [item] : item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [])), []);
  const remove = useCallback((id: string) => updateCart((current) => current.filter((item) => item.id !== id)), []);
  const clear = useCallback(() => updateCart(() => []), []);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const value = useMemo(() => ({ items, add, increment, decrement, remove, clear, totalQuantity, totalPrice }), [items, add, increment, decrement, remove, clear, totalQuantity, totalPrice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
