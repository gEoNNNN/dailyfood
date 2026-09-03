"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { useLanguage } from "./LanguageProvider";
import styles from "./global-ui.module.css";

const categories = [
  { id: "kebab", ro: "Kebab", ru: "Кебаб" },
  { id: "burger", ro: "Burger", ru: "Бургер" },
  { id: "kebab-menu", ro: "Kebab Menu", ru: "Кебаб-меню" },
  { id: "burger-menu", ro: "Burger Menu", ru: "Бургер-меню" },
  { id: "croki-menu", ro: "Croki Menu", ru: "Croki-меню" },
  { id: "salate", ro: "Salate", ru: "Салаты" },
  { id: "bauturi", ro: "Băuturi", ru: "Напитки" },
] as const;

const text = {
  ro: { categories: "Categorii pentru comandă", menu: "Meniu", choose: "Alege categoria", closeMenu: "Închide meniul", delivery: "Informații livrare", cart: "Coș", dialog: "Coșul tău", close: "Închide coșul", empty: "Coșul este gol.", emptyHint: "Adaugă produsele preferate din meniu.", remove: "Elimină", clear: "Golește coșul", total: "Total", decrease: "Scade cantitatea", increase: "Mărește cantitatea", checkout: "Continuă la checkout", call: "Sună pentru comandă", instruction: "Verifică detaliile la checkout sau sună-ne pentru a plasa comanda direct." },
  ru: { categories: "Категории для заказа", menu: "Меню", choose: "Выберите категорию", closeMenu: "Закрыть меню", delivery: "Информация о доставке", cart: "Корзина", dialog: "Ваша корзина", close: "Закрыть корзину", empty: "Корзина пуста.", emptyHint: "Добавьте любимые блюда из меню.", remove: "Удалить", clear: "Очистить корзину", total: "Итого", decrease: "Уменьшить количество", increase: "Увеличить количество", checkout: "Перейти к оформлению", call: "Позвонить для заказа", instruction: "Проверьте детали при оформлении или позвоните нам, чтобы сделать заказ напрямую." },
};

export default function QuickOrderBar() {
  const { language } = useLanguage();
  const { items, increment, decrement, remove, clear, totalQuantity, totalPrice } = useCart();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const t = text[language];

  useEffect(() => {
    if (!open && !menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (open) closeButton.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, menuOpen]);

  return (
    <>
      <div className={styles.orderBar}>
        <button className={styles.mobileMenuButton} type="button" onClick={() => setMenuOpen(true)} aria-haspopup="dialog">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          <span>{t.menu}</span>
        </button>
        <nav className={styles.orderCategories} aria-label={t.categories}>
          {categories.map((category) => <a key={category.id} href={`/menu#${category.id}`}>{category[language]}</a>)}
        </nav>
        <button className={styles.cartButton} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20.5 8H6M10 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm9 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span><b>{t.cart}</b><small>{totalQuantity} · {totalPrice} lei</small></span>
        </button>
      </div>

      {menuOpen && <div className={styles.categoryLayer}>
        <button className={styles.cartOverlay} type="button" onClick={() => setMenuOpen(false)} aria-label={t.closeMenu} />
        <section className={styles.categorySheet} role="dialog" aria-modal="true" aria-labelledby="category-title">
          <header><h2 id="category-title">{t.choose}</h2><button type="button" onClick={() => setMenuOpen(false)} aria-label={t.closeMenu}>×</button></header>
          <nav aria-label={t.categories}>{categories.map((category) => <Link key={category.id} href={`/menu#${category.id}`} onClick={() => setMenuOpen(false)}>{category[language]}<span>→</span></Link>)}</nav>
          <Link className={styles.deliveryLink} href="/delivery" onClick={() => setMenuOpen(false)}>{t.delivery}<span>→</span></Link>
        </section>
      </div>}

      {open && <div className={styles.cartLayer}>
        <button className={styles.cartOverlay} type="button" onClick={() => setOpen(false)} aria-label={t.close} />
        <section className={styles.cartDrawer} role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <header><div><span>{String(totalQuantity).padStart(2, "0")}</span><h2 id="cart-title">{t.dialog}</h2></div><button ref={closeButton} type="button" onClick={() => setOpen(false)} aria-label={t.close}>×</button></header>
          <div className={styles.cartContents}>
            {!items.length ? <div className={styles.emptyCart}><b>{t.empty}</b><p>{t.emptyHint}</p></div> : items.map((item) => <article className={styles.cartItem} key={item.id}>
              <div><h3>{language === "ro" ? item.nameRo : item.nameRu}</h3><button type="button" onClick={() => remove(item.id)}>{t.remove}</button></div>
              <div className={styles.quantityControls}><button type="button" onClick={() => decrement(item.id)} aria-label={`${t.decrease}: ${language === "ro" ? item.nameRo : item.nameRu}`}>−</button><span>{item.quantity}</span><button type="button" onClick={() => increment(item.id)} aria-label={`${t.increase}: ${language === "ro" ? item.nameRo : item.nameRu}`}>+</button></div>
              <strong>{item.price * item.quantity} lei</strong>
            </article>)}
          </div>
          <footer>
            {!!items.length && <button className={styles.clearCart} type="button" onClick={clear}>{t.clear}</button>}
            <div className={styles.cartTotal}><span>{t.total}</span><strong>{totalPrice} lei</strong></div>
            <p>{t.instruction}</p>
            {!!items.length && <Link className={styles.checkoutLink} href="/checkout" onClick={() => setOpen(false)}>{t.checkout}<span>→</span></Link>}
            <a className={styles.callToOrder} href="tel:+37379199299">{t.call}<span>+373 79 199 299</span></a>
          </footer>
        </section>
      </div>}
    </>
  );
}
