"use client";

import Image from "next/image";
import Link from "next/link";
import logoImage from "../../logo.png";
import LanguageSwitch from "../LanguageSwitch";
import { useLanguage } from "../LanguageProvider";
import styles from "./delivery.module.css";

const standardPrices = [
  ["Râșcani", 50], ["Ciocana 1", 55], ["Ciocana 2", 60], ["Centru", 55], ["Buiucani", 50], ["Sculeanca 1", 55], ["Sculeanca 2", 60], ["Sculeanca 3", 65], ["Sculeanca 4", 70], ["Botanica 1", 50], ["Botanica 2", 55], ["Botanica 3", 60], ["Botanica 4", 70], ["Botanica 5", 75], ["Telecentru", 65], ["Malina Mică", 65], ["Codru", 70], ["Schinoasa", 80], ["Poșta Veche", 55], ["Petricani 1", 55], ["Petricani 2", 60], ["Durlești 1", 50], ["Durlești 2", 65], ["Durlești 3", 70], ["Aeroport", 85], ["Stăuceni", 75],
] as const;

const reducedPrices = [
  ["Codru", 45], ["Dumbrava", 45], ["Stăuceni", 45], ["Schinoasa", 45], ["Botanica 3", 35], ["Botanica 4", 45], ["Botanica 5", 45], ["Aeroport", 45],
] as const;

const suburbPrices = [
  ["Dumbrava", 70], ["Băcioi", 110], ["Frumușica", 120], ["Sîngera", 130], ["Revaca", 140], ["Floreni", 130], ["Bubuieci", 110], ["Ciorescu", 110], ["Grătiești", 110], ["Colonița", 110], ["Vatra", 110], ["Ghidighici", 120], ["Cricova", 110], ["Trușeni", 120], ["Tohatin", 110],
] as const;

const copy = {
  ro: {
    back: "Acasă", menu: "Vezi meniul", call: "Sună și comandă", kicker: "Livrare Daily Kebab", title: <>Pofta vine.<br /><em>Noi o aducem.</em></>, heroText: "Comandă preparatele preferate, iar noi le aducem calde la ușa ta, în Chișinău și suburbii.",
    scheduleLabel: "Program livrare", schedule: "08:00–22:00", timeLabel: "Timp estimativ", time: "aprox. 1h30", paymentLabel: "Plată la curier", payment: "Numerar sau card",
    freeEyebrow: "Comenzi de minimum 500 MDL", freeTitle: "Livrare gratuită în raza orașului", freeText: "Pentru comenzile de cel puțin 500 MDL, livrarea este gratuită în zonele orașului. Pentru anumite zone periferice se aplică tarifele reduse de mai jos.",
    howKicker: "Simplu și sigur", howTitle: "Cum comanzi", steps: [
      ["Alege produsele", "Adaugă în coș tot ce îți face poftă și verifică atent conținutul comenzii."],
      ["Confirmă comanda", "Comenzile plasate online devin valabile numai după confirmarea telefonică din partea echipei noastre."],
      ["Primește livrarea", "Verifică produsele împreună cu bonul fiscal înainte ca livratorul să plece și achită numerar sau cu cardul."],
    ],
    phoneTitle: "Preferi telefonul?", phoneText: "Poți plasa comanda direct la telefon, zilnic în intervalul de livrare.",
    warningTitle: "Număr corect, livrare fără întârzieri", warningText: "Introdu un număr de telefon corect și disponibil. Dacă nu reușim să te contactăm pentru confirmare, comanda online nu poate fi procesată.",
    pricesKicker: "Tarife transparente", pricesTitle: "Zone și prețuri", standardTitle: "Chișinău · tarif standard", standardText: "Costul livrării pentru comenzi sub 500 MDL.", reducedTitle: "Zone periferice · comandă de la 500 MDL", reducedText: "Tarif redus aplicat comenzilor de minimum 500 MDL.", suburbTitle: "Suburbii · tarif integral", suburbText: "Tarifele de livrare în localitățile din afara orașului.", zone: "Zonă", price: "MDL",
    checkTitle: "Verifică înainte de plecarea curierului", checkText: "La primire, confruntă produsele și cantitățile cu bonul fiscal. Dacă lipsește ceva sau observi o neconcordanță, anunță livratorul pe loc. Păstrează bonul până la verificarea completă a comenzii.",
    finalKicker: "Ți-e poftă?", finalTitle: "Alege. Sună. Savurează.", finalText: "Descoperă meniul Daily Kebab sau comandă direct prin telefon.", footer: "Livrare Daily Kebab · zilnic 08:00–22:00",
  },
  ru: {
    back: "Главная", menu: "Открыть меню", call: "Позвонить и заказать", kicker: "Доставка Daily Kebab", title: <>Аппетит приходит.<br /><em>Мы привозим.</em></>, heroText: "Закажите любимые блюда, а мы доставим их горячими до вашей двери в Кишинёве и пригородах.",
    scheduleLabel: "Время доставки", schedule: "08:00–22:00", timeLabel: "Примерное время", time: "около 1 ч 30 мин", paymentLabel: "Оплата курьеру", payment: "Наличными или картой",
    freeEyebrow: "Заказы от 500 MDL", freeTitle: "Бесплатная доставка по городу", freeText: "При заказе на сумму от 500 MDL доставка в городских зонах бесплатна. Для некоторых отдалённых зон действуют сниженные тарифы, указанные ниже.",
    howKicker: "Просто и надёжно", howTitle: "Как заказать", steps: [
      ["Выберите блюда", "Добавьте в корзину всё, что хочется, и внимательно проверьте состав заказа."],
      ["Подтвердите заказ", "Онлайн-заказ считается принятым только после телефонного подтверждения от нашей команды."],
      ["Получите доставку", "До ухода курьера сверьте блюда с кассовым чеком и оплатите заказ наличными или картой."],
    ],
    phoneTitle: "Удобнее по телефону?", phoneText: "Заказ можно оформить напрямую по телефону каждый день в часы доставки.",
    warningTitle: "Верный номер — доставка без задержек", warningText: "Укажите правильный и доступный номер телефона. Если мы не сможем связаться с вами для подтверждения, онлайн-заказ не будет обработан.",
    pricesKicker: "Понятные тарифы", pricesTitle: "Зоны и стоимость", standardTitle: "Кишинёв · стандартный тариф", standardText: "Стоимость доставки для заказов до 500 MDL.", reducedTitle: "Отдалённые зоны · заказ от 500 MDL", reducedText: "Сниженный тариф для заказов на сумму от 500 MDL.", suburbTitle: "Пригороды · полный тариф", suburbText: "Стоимость доставки в населённые пункты за пределами города.", zone: "Зона", price: "MDL",
    checkTitle: "Проверьте заказ до ухода курьера", checkText: "При получении сверьте блюда и их количество с кассовым чеком. Если чего-то не хватает или есть несоответствие, сразу сообщите курьеру. Сохраняйте чек до полной проверки заказа.",
    finalKicker: "Уже хочется?", finalTitle: "Выбирайте. Звоните. Наслаждайтесь.", finalText: "Откройте меню Daily Kebab или оформите заказ по телефону.", footer: "Доставка Daily Kebab · ежедневно 08:00–22:00",
  },
};

function PriceList({ items, zoneLabel, priceLabel }: { items: ReadonlyArray<readonly [string, number]>; zoneLabel: string; priceLabel: string }) {
  return (
    <div className={styles.priceList}>
      <div className={styles.priceHead}><span>{zoneLabel}</span><span>{priceLabel}</span></div>
      {items.map(([zone, price]) => <div className={styles.priceRow} key={zone}><span>{zone}</span><strong>{price}</strong></div>)}
    </div>
  );
}

export default function DeliveryPage() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.logo} href="/" aria-label="Daily Kebab Burger"><Image src={logoImage} alt="Daily Kebab Burger" priority /></Link>
        <nav className={styles.nav} aria-label={language === "ro" ? "Navigare principală" : "Основная навигация"}><Link href="/">{t.back}</Link><Link href="/menu">{t.menu}</Link><LanguageSwitch /></nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>{t.kicker}</span>
          <h1>{t.title}</h1>
          <p>{t.heroText}</p>
          <div className={styles.actions}><Link className={styles.primaryButton} href="/menu">{t.menu}<span>→</span></Link><a className={styles.phoneButton} href="tel:+37379199299">+373 79 199 299</a></div>
        </div>
        <div className={styles.heroPanel}>
          <div><span>01</span><p>{t.scheduleLabel}</p><strong>{t.schedule}</strong></div>
          <div><span>02</span><p>{t.timeLabel}</p><strong>{t.time}</strong></div>
          <div><span>03</span><p>{t.paymentLabel}</p><strong>{t.payment}</strong></div>
        </div>
      </section>

      <section className={styles.freeBanner}>
        <div><span>{t.freeEyebrow}</span><h2>{t.freeTitle}</h2></div><p>{t.freeText}</p><strong>500 <small>MDL</small></strong>
      </section>

      <section className={styles.processSection}>
        <div className={styles.sectionHeading}><span>{t.howKicker}</span><h2>{t.howTitle}</h2></div>
        <div className={styles.steps}>{t.steps.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        <div className={styles.noticeGrid}>
          <article className={styles.phoneCard}><span>CALL</span><h3>{t.phoneTitle}</h3><p>{t.phoneText}</p><a href="tel:+37379199299">+373 79 199 299</a></article>
          <article className={styles.warningCard}><span>!</span><div><h3>{t.warningTitle}</h3><p>{t.warningText}</p></div></article>
        </div>
      </section>

      <section className={styles.pricesSection}>
        <div className={styles.sectionHeading}><span>{t.pricesKicker}</span><h2>{t.pricesTitle}</h2></div>
        <div className={styles.priceCards}>
          <article className={`${styles.priceCard} ${styles.standardCard}`}><div className={styles.cardTitle}><span>01</span><div><h3>{t.standardTitle}</h3><p>{t.standardText}</p></div></div><PriceList items={standardPrices} zoneLabel={t.zone} priceLabel={t.price} /></article>
          <article className={`${styles.priceCard} ${styles.reducedCard}`}><div className={styles.cardTitle}><span>02</span><div><h3>{t.reducedTitle}</h3><p>{t.reducedText}</p></div></div><PriceList items={reducedPrices} zoneLabel={t.zone} priceLabel={t.price} /></article>
          <article className={`${styles.priceCard} ${styles.suburbCard}`}><div className={styles.cardTitle}><span>03</span><div><h3>{t.suburbTitle}</h3><p>{t.suburbText}</p></div></div><PriceList items={suburbPrices} zoneLabel={t.zone} priceLabel={t.price} /></article>
        </div>
      </section>

      <section className={styles.checkSection}><span>✓</span><div><h2>{t.checkTitle}</h2><p>{t.checkText}</p></div></section>

      <section className={styles.finalCta}><span>{t.finalKicker}</span><h2>{t.finalTitle}</h2><p>{t.finalText}</p><div className={styles.actions}><Link className={styles.primaryButton} href="/menu">{t.menu}<span>→</span></Link><a className={styles.lightButton} href="tel:+37379199299">{t.call}<strong>+373 79 199 299</strong></a></div></section>

      <footer className={styles.footer}><Image src={logoImage} alt="Daily Kebab Burger" /><span>{t.footer}</span><Link href="/menu">{t.menu} →</Link></footer>
    </main>
  );
}
