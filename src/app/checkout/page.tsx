"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import logoImage from "../../logo.png";
import { useCart } from "../CartProvider";
import LanguageSwitch from "../LanguageSwitch";
import { useLanguage } from "../LanguageProvider";
import styles from "./checkout.module.css";

const text = {
  ro: {
    back: "Înapoi la meniu", title: "Finalizează comanda", intro: "Verifică produsele și completează datele pentru trimiterea comenzii.", details: "Detalii comandă", method: "Metoda de ridicare a produsului", delivery: "Livrare", pickup: "Ridicare", reminder: "Livrarea se execută doar în sectoarele Botanica, Telecentru și Centru din mun. Chișinău și în suburbiile Codru, Băcioi, Bîc, Sîngera și Bubuieci.", minimumDelivery: "Comanda minimă pentru livrare este de 130 MDL.", freeDelivery: "Livrare gratuită în raza orașului pentru comenzi de la 500 MDL.", minimumError: "Mai adaugă produse în valoare de {amount} MDL pentru a putea selecta livrarea.", freeApplied: "Gratuit", deliveryFee: "Taxa de livrare", grandTotal: "Total de plată", name: "Nume și prenume", phone: "Telefon din Moldova", address: "Adresa de livrare", apartment: "Apartament / scară / interfon", notes: "Note pentru comandă (opțional)", payment: "Metoda de plată", cash: "Numerar la curier", card: "Card la curier", required: "Câmp obligatoriu", summary: "Comanda ta", remove: "Elimină", decrease: "Scade cantitatea", increase: "Mărește cantitatea", total: "Total produse", submit: "Plasează comanda", placing: "Se trimite comanda...", successTitle: "Comanda a fost plasată!", successText: "Îți mulțumim! Comanda a ajuns la echipa Daily Kebab. Te vom contacta telefonic pentru confirmare.", orderNumber: "Numărul comenzii", backHome: "Înapoi acasă", newOrder: "Comandă din nou", errorTitle: "Comanda nu a fost trimisă", errorText: "A apărut o problemă la trimiterea comenzii. Încearcă din nou sau sună-ne direct.", retry: "Încearcă din nou", call: "Sună: +373 79 199 299", empty: "Coșul tău este gol", emptyText: "Alege produsele preferate înainte de a plasa comanda.", browse: "Vezi meniul", footer: "Livrare și ridicare Daily Kebab", deliveryInfo: "Informații despre livrare", placeholderName: "Ex. Ana Popescu", placeholderPhone: "+373 79 123 456", placeholderAddress: "Stradă, număr, localitate", placeholderApartment: "Ex. ap. 12, scara 2", placeholderNotes: "Sosuri, alergii sau alte indicații",
  },
  ru: {
    back: "Назад в меню", title: "Оформите заказ", intro: "Проверьте блюда и заполните данные для отправки заказа.", details: "Данные заказа", method: "Способ получения заказа", delivery: "Доставка", pickup: "Самовывоз", reminder: "Доставка выполняется только в секторах Ботаника, Телецентр и Центр мун. Кишинёва, а также в Кодру, Бэчой, Бык, Сынжеру и Бубуечь.", minimumDelivery: "Минимальная сумма заказа для доставки — 130 MDL.", freeDelivery: "Бесплатная доставка по городу при заказе от 500 MDL.", minimumError: "Добавьте товаров ещё на {amount} MDL, чтобы выбрать доставку.", freeApplied: "Бесплатно", deliveryFee: "Стоимость доставки", grandTotal: "Итого к оплате", name: "Имя и фамилия", phone: "Телефон в Молдове", address: "Адрес доставки", apartment: "Квартира / подъезд / домофон", notes: "Примечание к заказу (необязательно)", payment: "Способ оплаты", cash: "Наличными курьеру", card: "Картой курьеру", required: "Обязательное поле", summary: "Ваш заказ", remove: "Удалить", decrease: "Уменьшить количество", increase: "Увеличить количество", total: "Итого за блюда", submit: "Оформить заказ", placing: "Отправляем заказ...", successTitle: "Заказ оформлен!", successText: "Спасибо! Заказ поступил команде Daily Kebab. Мы свяжемся с вами по телефону для подтверждения.", orderNumber: "Номер заказа", backHome: "На главную", newOrder: "Заказать ещё", errorTitle: "Заказ не отправлен", errorText: "При отправке заказа произошла ошибка. Попробуйте ещё раз или позвоните нам.", retry: "Попробовать снова", call: "Позвонить: +373 79 199 299", empty: "Ваша корзина пуста", emptyText: "Выберите любимые блюда, прежде чем оформить заказ.", browse: "Открыть меню", footer: "Доставка и самовывоз Daily Kebab", deliveryInfo: "Информация о доставке", placeholderName: "Например, Анна Попеску", placeholderPhone: "+373 79 123 456", placeholderAddress: "Улица, номер, населённый пункт", placeholderApartment: "Например, кв. 12, подъезд 2", placeholderNotes: "Соусы, аллергии или другие пожелания",
  },
};

const deliveryOptions = {
  ro: [
    { id: "pickup", label: "Ridicarea produsului din local", fee: 0 },
    { id: "botanica", label: "Livrare Botanica", fee: 50 },
    { id: "centru-telecentru", label: "Livrare Centru / Telecentru", fee: 60 },
    { id: "suburbii-apropiate", label: "Livrare Codru / Băcioi / Bîc / Bubuieci", fee: 70 },
    { id: "singera", label: "Livrare Sîngera", fee: 90 },
  ],
  ru: [
    { id: "pickup", label: "Самовывоз из ресторана", fee: 0 },
    { id: "botanica", label: "Доставка на Ботанику", fee: 50 },
    { id: "centru-telecentru", label: "Доставка в Центр / Телецентр", fee: 60 },
    { id: "suburbii-apropiate", label: "Доставка в Кодру / Бэчой / Бык / Бубуечь", fee: 70 },
    { id: "singera", label: "Доставка в Сынжеру", fee: 90 },
  ],
} as const;

type DeliveryOption = typeof deliveryOptions.ro[number]["id"];
type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function CheckoutPage() {
  const { language } = useLanguage();
  const { items, increment, decrement, remove, clear, totalPrice } = useCart();
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption | "">("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [orderId, setOrderId] = useState("");
  const t = text[language];
  const currentDeliveryOptions = deliveryOptions[language];
  const baseDeliveryFee = deliveryOptions.ro.find((option) => option.id === deliveryOption)?.fee ?? 0;
  const requiresAddress = deliveryOption !== "" && deliveryOption !== "pickup";
  const isCityDelivery = deliveryOption === "botanica" || deliveryOption === "centru-telecentru";
  const deliveryFee = isCityDelivery && totalPrice >= 500 ? 0 : baseDeliveryFee;
  const deliveryMinimumMissing = requiresAddress ? Math.max(0, 130 - totalPrice) : 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || deliveryMinimumMissing > 0) return;

    const form = new FormData(event.currentTarget);
    setStatus("submitting");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          deliveryOption,
          payment: form.get("payment"),
          name: form.get("name"),
          phone: form.get("phone"),
          address: form.get("address"),
          apartment: form.get("apartment"),
          notes: form.get("notes"),
          website: form.get("website"),
          items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
        }),
      });
      const result = await response.json() as { ok?: boolean; orderId?: string };
      if (!response.ok || !result.ok || !result.orderId) throw new Error("order_failed");
      setOrderId(result.orderId);
      setStatus("success");
      clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      window.setTimeout(() => document.getElementById("order-error")?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.logo} href="/" aria-label="Daily Kebab Burger"><Image src={logoImage} alt="Daily Kebab Burger" priority /></Link>
        <div className={styles.headerActions}><Link href="/menu">← {t.back}</Link><LanguageSwitch /></div>
      </header>

      {status === "success" ? (
        <section className={styles.successState} aria-live="polite">
          <div className={styles.successBurst}><span>✓</span></div>
          <span className={styles.successKicker}>DAILY KEBAB</span>
          <h1>{t.successTitle}</h1>
          <p>{t.successText}</p>
          <div className={styles.orderNumber}><small>{t.orderNumber}</small><strong>{orderId}</strong></div>
          <div className={styles.successActions}><Link href="/">{t.backHome}</Link><Link href="/menu">{t.newOrder}</Link></div>
        </section>
      ) : !items.length ? (
        <section className={styles.emptyState}>
          <span>00</span><h1>{t.empty}</h1><p>{t.emptyText}</p><Link href="/menu">{t.browse} →</Link>
        </section>
      ) : (
        <>
          <section className={styles.intro}><span>CHECKOUT</span><h1>{t.title}</h1><p>{t.intro}</p></section>
          <form className={styles.checkoutGrid} onSubmit={handleSubmit} aria-busy={status === "submitting"}>
            <section className={styles.formPanel}>
              <h2><span>01</span>{t.details}</h2>
              <fieldset className={styles.choiceGroup}>
                <legend>{t.method} <b aria-label={t.required}>*</b></legend>
                {currentDeliveryOptions.map((option) => {
                  const optionIsFree = totalPrice >= 500 && (option.id === "botanica" || option.id === "centru-telecentru");
                  return <label key={option.id} className={deliveryOption === option.id ? styles.selectedChoice : ""}><input type="radio" name="deliveryOption" value={option.id} checked={deliveryOption === option.id} onChange={() => setDeliveryOption(option.id)} required /><span><b>{option.label}</b><strong>{optionIsFree ? t.freeApplied : `${option.fee} MDL`}</strong></span></label>;
                })}
              </fieldset>
              <div className={styles.deliveryPolicies}><strong>{t.minimumDelivery}</strong><strong>{t.freeDelivery}</strong><p>{t.reminder}</p></div>
              {!!deliveryMinimumMissing && <p className={styles.minimumWarning}>{t.minimumError.replace("{amount}", String(deliveryMinimumMissing))}</p>}
              <div className={styles.fields}>
                <label><span>{t.name} <b aria-label={t.required}>*</b></span><input name="name" autoComplete="name" placeholder={t.placeholderName} maxLength={80} required /></label>
                <label><span>{t.phone} <b aria-label={t.required}>*</b></span><input type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder={t.placeholderPhone} pattern="(?:\+373|0)\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{3}" maxLength={30} required /></label>
                {requiresAddress && <>
                  <label className={styles.fullField}><span>{t.address} <b aria-label={t.required}>*</b></span><input name="address" autoComplete="street-address" placeholder={t.placeholderAddress} maxLength={180} required /></label>
                  <label className={styles.fullField}><span>{t.apartment}</span><input name="apartment" autoComplete="address-line2" placeholder={t.placeholderApartment} maxLength={100} /></label>
                </>}
                <label className={styles.fullField}><span>{t.notes}</span><textarea name="notes" rows={4} placeholder={t.placeholderNotes} maxLength={500} /></label>
                <label className={styles.honeypot} aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <fieldset className={styles.paymentGroup}>
                <legend>{t.payment}</legend>
                <label><input type="radio" name="payment" value="cash" defaultChecked /><span>{t.cash}</span></label>
                <label><input type="radio" name="payment" value="card" /><span>{t.card}</span></label>
              </fieldset>
            </section>

            <aside className={styles.summaryPanel}>
              <h2><span>02</span>{t.summary}</h2>
              <div className={styles.orderItems}>{items.map((item) => {
                const name = language === "ro" ? item.nameRo : item.nameRu;
                return <article key={item.id} className={styles.orderItem}><div><h3>{name}</h3><button type="button" onClick={() => remove(item.id)}>{t.remove}</button></div><div className={styles.quantity}><button type="button" onClick={() => decrement(item.id)} aria-label={`${t.decrease}: ${name}`}>−</button><span>{item.quantity}</span><button type="button" onClick={() => increment(item.id)} aria-label={`${t.increase}: ${name}`}>+</button></div><strong>{item.price * item.quantity} MDL</strong></article>;
              })}</div>
              <div className={styles.totals}><div className={styles.total}><span>{t.total}</span><strong>{totalPrice} MDL</strong></div><div className={styles.total}><span>{t.deliveryFee}</span><strong>{deliveryFee} MDL</strong></div><div className={`${styles.total} ${styles.grandTotal}`}><span>{t.grandTotal}</span><strong>{totalPrice + deliveryFee} MDL</strong></div></div>
              <button className={styles.submitButton} type="submit" disabled={status === "submitting" || deliveryMinimumMissing > 0}>{status === "submitting" ? t.placing : t.submit}<span>{status === "submitting" ? "···" : "→"}</span></button>
              {status === "error" && <div className={styles.errorNotice} id="order-error" role="alert"><b>{t.errorTitle}</b><p>{t.errorText}</p><div><button type="button" onClick={() => setStatus("idle")}>{t.retry}</button><a href="tel:+37379199299">{t.call}</a></div></div>}
            </aside>
          </form>
        </>
      )}

      <footer className={styles.footer}><span>{t.footer}</span><div><Link href="/delivery">{t.deliveryInfo}</Link><Link href="/menu">{t.browse}</Link></div><small>© 2026 Daily Kebab Burger</small></footer>
    </main>
  );
}
