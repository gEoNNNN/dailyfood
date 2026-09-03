"use client";

import Image from "next/image";
import Link from "next/link";
import logoImage from "../../logo.png";
import { useCart } from "../CartProvider";
import LanguageSwitch from "../LanguageSwitch";
import ScrollAnimations from "../ScrollAnimations";
import { useLanguage } from "../LanguageProvider";
import { menuCategories, type Language } from "./menuData";
import styles from "./menu.module.css";

const text = {
  ro: { backgroundLabel: "MENIU", homeLabel: "Daily Kebab Burger - Acasă", navLabel: "Navigare meniu", home: "Acasă", categories: "Categorii", delivery: "Livrare", contact: "Contact", order: "Comandă", kicker: "TOT CE-ȚI FACE POFTĂ", title: <>MENIUL<br /><em>DAILY.</em></>, intro: "De la kebab rumenit și burgeri generoși până la gustări și salate proaspete. Alege categoria și găsește-ți favoritul.", stamp: <>CATEGORII<br />PENTRU ORICE POFTĂ</>, promoKicker: "EXTRA POFTĂ?", promoTitle: "FĂ-L DUBLU.", promoText: "Adaugă încă o porție de carne la orice burger pentru doar 10 MDL.", orderKicker: "GATA DE COMANDĂ?", orderTitle: <>SUNĂ. ALEGE.<br /><em>BUCURĂ-TE.</em></>, orderText: "Comandă pentru ridicare, iar noi pregătim totul proaspăt și fierbinte.", days: "Luni–Duminică · 11:00–23:00", footer: "BURGERI & KEBAB, FĂCUȚI ALTFEL.", back: "Înapoi la pagina principală", addToCart: "Adaugă în coș", added: "Adăugat", productPhoto: "fotografie produs", noPhoto: "Băutură rece" },
  ru: { backgroundLabel: "МЕНЮ", homeLabel: "Daily Kebab Burger — Главная", navLabel: "Навигация по меню", home: "Главная", categories: "Категории", delivery: "Доставка", contact: "Контакты", order: "Заказать", kicker: "ВСЁ, ЧТО ПРОБУЖДАЕТ АППЕТИТ", title: <>МЕНЮ<br /><em>DAILY.</em></>, intro: "От кебабов и сытных бургеров до закусок и свежих салатов. Выберите категорию и найдите своё любимое блюдо.", stamp: <>КАТЕГОРИЙ<br />НА ЛЮБОЙ ВКУС</>, promoKicker: "ХОЧЕТСЯ БОЛЬШЕ?", promoTitle: "СДЕЛАЙ ДВОЙНЫМ.", promoText: "Добавьте ещё одну порцию мяса в любой бургер всего за 10 MDL.", orderKicker: "ГОТОВЫ ЗАКАЗАТЬ?", orderTitle: <>ЗВОНИТЕ. ВЫБИРАЙТЕ.<br /><em>НАСЛАЖДАЙТЕСЬ.</em></>, orderText: "Закажите навынос, а мы приготовим всё свежим и горячим.", days: "Понедельник–Воскресенье · 11:00–23:00", footer: "БУРГЕРЫ И КЕБАБ — ПО-НАШЕМУ.", back: "Вернуться на главную", addToCart: "Добавить в корзину", added: "Добавлено", productPhoto: "фотография блюда", noPhoto: "Холодный напиток" },
} satisfies Record<Language, Record<string, React.ReactNode>>;

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function MenuPage() {
  const { language } = useLanguage();
  const { items: cartItems, add } = useCart();
  const currentLanguage: Language = language;
  const t = text[currentLanguage];

  return (
    <main className={styles.page}>
      <ScrollAnimations />
      <header className={styles.header} data-reveal="down">
        <Link className={styles.logo} href="/" aria-label={String(t.homeLabel)}><Image src={logoImage} alt="Daily Kebab Burger" priority /></Link>
        <nav aria-label={String(t.navLabel)}><Link href="/">{t.home}</Link><a href="#categorii">{t.categories}</a><Link href="/delivery">{t.delivery}</Link><a href="#contact">{t.contact}</a></nav>
        <div className={styles.headerActions}><LanguageSwitch /><a className={styles.orderButton} href="tel:+37379199299">{t.order} <ArrowIcon /></a></div>
      </header>

      <section className={styles.hero} data-label={t.backgroundLabel}><span className={styles.kicker} data-reveal="left">{t.kicker}</span><h1 data-reveal="left" data-reveal-delay="1">{t.title}</h1><p data-reveal="up" data-reveal-delay="2">{t.intro}</p><div className={styles.heroStamp} data-reveal="scale" data-reveal-delay="3"><b>7</b><span>{t.stamp}</span></div></section>

      <div className={styles.menuContent} id="categorii">
        {menuCategories.map((category, categoryIndex) => (
          <section className={styles.category} id={category.id} key={category.id}>
            <div className={styles.categoryHeading} data-reveal="left"><span>{category.number}</span><div><h2>{category.name[currentLanguage]}</h2><p>{category.note[currentLanguage]}</p></div></div>
            <div className={styles.itemsGrid}>
              {category.items.map((item, itemIndex) => {
                const quantity = cartItems.find((cartItem) => cartItem.id === item.id)?.quantity ?? 0;
                const localizedName = item.name[currentLanguage];
                return (
                  <article className={styles.item} key={item.id} data-reveal="right" data-reveal-delay={String((itemIndex % 3) + 1)}>
                    <div className={styles.itemVisual}>
                      {item.image ? <Image className={item.imageFit === "contain" ? styles.containImage : undefined} src={item.image} alt={`${localizedName} — ${String(t.productPhoto)}`} sizes="(max-width: 640px) calc(100vw - 36px), (max-width: 960px) 50vw, 425px" placeholder="blur" /> : <div className={styles.itemPlaceholder}><span>Daily</span><b>{t.noPhoto}</b></div>}
                      {item.tag && <span className={styles.itemTag}>{item.tag[currentLanguage]}</span>}
                    </div>
                    <div className={styles.itemBody}>
                      <h3>{localizedName}</h3>
                      <p>{item.description[currentLanguage]}</p>
                      <div className={styles.itemOrder}><strong>{item.price} MDL</strong><button type="button" onClick={() => add({ id: item.id, nameRo: item.name.ro, nameRu: item.name.ru, price: item.price })}>{quantity ? `${String(t.added)} · ${quantity}` : t.addToCart}</button></div>
                    </div>
                  </article>
                );
              })}
              {categoryIndex === 1 && <aside className={styles.promoCard} data-reveal="scale" data-reveal-delay="2"><span>{t.promoKicker}</span><b>{t.promoTitle}</b><p>{t.promoText}</p></aside>}
            </div>
          </section>
        ))}
      </div>

      <section className={styles.orderSection} id="contact"><div data-reveal="left"><span className={styles.kicker}>{t.orderKicker}</span><h2>{t.orderTitle}</h2></div><div className={styles.orderDetails} data-reveal="right" data-reveal-delay="1"><p>{t.orderText}</p><a href="tel:+37379199299">+373 79 199 299 <ArrowIcon /></a><small>{t.days}</small></div></section>
      <footer className={styles.footer} data-reveal="up"><Link href="/"><Image src={logoImage} alt="Daily Kebab Burger" /></Link><p>{t.footer}</p><div><Link href="/delivery">{t.delivery}</Link><Link href="/">{t.back}</Link></div><small>© 2026 Daily Kebab Burger</small></footer>
    </main>
  );
}
