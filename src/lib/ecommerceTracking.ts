"use client";

import { useEffect, useRef } from "react";
import type { CartItem } from "../app/CartProvider";
import type { MenuCategory } from "../app/menu/menuData";

export type EcommerceItem = {
  item_id: string;
  item_name: string;
  item_category?: string;
  price: number;
  quantity: number;
};

export type PurchaseData = {
  transaction_id: string;
  value: number;
  tax: number;
  shipping: number;
  currency: "MDL";
  coupon?: string;
  items: EcommerceItem[];
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const trackedPurchasesKey = "daily-tracked-purchases";
const consentKey = "daily-cookie-consent";

function pushEcommerce(event: string, ecommerce: Record<string, unknown>) {
  if (typeof window === "undefined") return false;
  try {
    if (window.localStorage.getItem(consentKey) !== "accepted") return false;
  } catch {
    return false;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({ event, ecommerce });
  return true;
}

export function cartItemToEcommerce(item: CartItem): EcommerceItem {
  return {
    item_id: item.id,
    item_name: item.nameRo,
    ...(item.itemCategory ? { item_category: item.itemCategory } : {}),
    price: item.price,
    quantity: item.quantity,
  };
}

export function trackAddToCart(item: CartItem, quantity = 1) {
  const ecommerceItem = { ...cartItemToEcommerce(item), quantity };
  pushEcommerce("add_to_cart", {
    currency: "MDL",
    value: ecommerceItem.price * quantity,
    items: [ecommerceItem],
  });
}

export function trackBeginCheckout(items: CartItem[]) {
  return pushEcommerce("begin_checkout", {
    currency: "MDL",
    value: items.reduce((total, item) => total + item.price * item.quantity, 0),
    items: items.map(cartItemToEcommerce),
  });
}

export function trackPurchaseOnce(purchase: PurchaseData) {
  if (typeof window === "undefined") return;
  let tracked: string[] = [];
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(trackedPurchasesKey) ?? "[]");
    if (Array.isArray(stored)) tracked = stored.filter((id): id is string => typeof id === "string");
  } catch {}
  if (tracked.includes(purchase.transaction_id)) return;
  if (!pushEcommerce("purchase", purchase)) return;
  try {
    window.localStorage.setItem(trackedPurchasesKey, JSON.stringify([...tracked, purchase.transaction_id].slice(-100)));
  } catch {}
}

export function useViewItemTracking(categories: MenuCategory[]) {
  const seen = useRef(new Set<string>());

  useEffect(() => {
    const products = new Map(categories.flatMap((category) => category.items.map((item) => [item.id, {
      item_id: item.id,
      item_name: item.name.ro,
      item_category: category.name.ro,
      price: item.price,
      quantity: 1,
    }] as const)));
    const trackElement = (element: HTMLElement) => {
      const id = element.dataset.ecommerceProductId;
      const item = id ? products.get(id) : undefined;
      if (!id || !item || seen.current.has(id)) return false;
      if (!pushEcommerce("view_item", { currency: "MDL", value: item.price, items: [item] })) return false;
      seen.current.add(id);
      return true;
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && trackElement(entry.target as HTMLElement)) observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    const elements = document.querySelectorAll<HTMLElement>("[data-ecommerce-product-id]");
    const handleConsent = () => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        if (visibleHeight >= Math.min(rect.height, window.innerHeight) * 0.5 && trackElement(element)) observer.unobserve(element);
      });
    };

    elements.forEach((element) => observer.observe(element));
    window.addEventListener("daily-cookie-consent-change", handleConsent);
    return () => {
      observer.disconnect();
      window.removeEventListener("daily-cookie-consent-change", handleConsent);
    };
  }, [categories]);
}
