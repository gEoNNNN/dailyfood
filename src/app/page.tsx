"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import burgerImage from "../burger.png";
import kebabImage from "../kebab.png";
import logoImage from "../logo.png";
import nuggetsImage from "../nuggets.png";
import { useCart } from "./CartProvider";
import LanguageSwitch from "./LanguageSwitch";
import ScrollAnimations from "./ScrollAnimations";
import { Language, useLanguage } from "./LanguageProvider";
import { useMenuCategories } from "./menu/useMenuCategories";
import styles from "./page.module.css";

const content = {
  ro: {
    navLabel: "Navigare principală", homeLabel: "Daily Kebab Burger - Acasă", menu: "Meniu", story: "Povestea noastră", reviews: "Recenzii", delivery: "Livrare", location: "Locație", orderNow: "Comandă acum",
    eyebrow: "BURGERI. KEBAB. FOC ADEVĂRAT.", heroTitle: <>GUST MARE.<br /><em>POFTĂ ȘI MAI MARE.</em></>, heroText: "Burgeri generoși, kebab rumenit la flacără și sosuri pregătite în casă. Fără scurtături. Doar mâncare bună, făcută proaspăt.", discover: "Descoperă meniul", happy: "Peste 1.200 de clienți mulțumiți", greatTaste: <>SUPER<br />GUST!</>, fresh: <>100%<br />PROASPĂT</>, ticker: ["PREGĂTIT PROASPĂT", "RUMENIT LA JAR", "SOSURI DE CASĂ", "POFTĂ BUNĂ"],
    favoritesKicker: "PREFERATELE CLIENȚILOR", favoritesTitle: <>ALEGE-ȚI<br /><em>FAVORITUL.</em></>, favoritesText: "Pregătite de la zero, pline de gust și gătite întotdeauna la comandă. Descoperă vedetele meniului nostru.", seeMenu: "Vezi în meniu", fullMenu: "Vezi meniul complet", addToCart: "Adaugă în coș", added: "Adăugat",
    fireFirst: <>FOCUL<br />ÎNTÂI</>, dailyTaste: "GUSTUL DAILY", storyTitle: <>ÎNCEPE CU<br /><em>FOC ADEVĂRAT.</em></>, storyText: "Ingrediente proaspete, carne marinată cu răbdare și jar încins. Atât ne trebuie pentru un gust pe care îl recunoști de la prima îmbucătură.", benefits: [["Proaspăt, în fiecare zi", "Pregătim zilnic carnea, legumele și sosurile casei."], ["Rumenit pe jar", "Focul adevărat adaugă aroma afumată care ne definește."], ["Rapid și fierbinte", "Gătit la comandă și servit exact când trebuie."]],
    reviewsKicker: "DIRECT DE LA MASĂ", reviewsTitle: <>LUMEA E<br /><em>ÎNCÂNTATĂ.</em></>, reviewCount: "Din peste 1.200 de recenzii",
    visitKicker: "VINO CU POFTĂ", visitTitle: <>MASA TA<br /><em>TE AȘTEAPTĂ.</em></>, visitText: "Treci pe la noi, ia loc sau comandă din timp și sari peste așteptare.", findUs: "NE GĂSEȘTI", address: "str. Independentei 50", schedule: "PROGRAM", days: <>Luni–Duminică<br />11:00–22:30</>, callOrder: "Sună și comandă", seeLocation: "Vezi locația", bagText: <>MÂNCARE BUNĂ.<br />STARE BUNĂ.</>,
    faqKicker: "PE SCURT", faqTitle: <>ÎNTREBĂRI?<br /><em>REZOLVAT.</em></>, footerTagline: "BURGERI & KEBAB, FĂCUȚI ALTFEL.", footerStory: "Poveste", contact: "Contact", privacy: "Confidențialitate",
    imageAlts: { kebab: "Kebab Daily cu carne la grătar și legume proaspete", nuggets: "Nuggets Daily crocanți din piept de pui", burger: "Burger Daily cu vită și cheddar", hero: "Burger Daily cu vită, cheddar și legume proaspete" },
  },
  ru: {
    navLabel: "Основная навигация", homeLabel: "Daily Kebab Burger — Главная", menu: "Меню", story: "Наша история", reviews: "Отзывы", delivery: "Доставка", location: "Адрес", orderNow: "Заказать",
    eyebrow: "БУРГЕРЫ. КЕБАБ. НАСТОЯЩИЙ ОГОНЬ.", heroTitle: <>БОЛЬШОЙ ВКУС.<br /><em>ЕЩЁ БОЛЬШЕ АППЕТИТА.</em></>, heroText: "Щедрые бургеры, обжаренный на огне кебаб и домашние соусы. Никаких компромиссов. Только вкусная еда, приготовленная на месте.", discover: "Открыть меню", happy: "Более 1 200 довольных гостей", greatTaste: <>СУПЕР<br />ВКУС!</>, fresh: <>100%<br />СВЕЖЕЕ</>, ticker: ["ГОТОВИМ СВЕЖИМ", "ЖАРИМ НА УГЛЯХ", "ДОМАШНИЕ СОУСЫ", "ПРИЯТНОГО АППЕТИТА"],
    favoritesKicker: "ВЫБОР НАШИХ ГОСТЕЙ", favoritesTitle: <>ВЫБЕРИ<br /><em>ЛЮБИМОЕ.</em></>, favoritesText: "Готовим с нуля, щедро наполняем вкусом и всегда делаем на заказ. Познакомьтесь с хитами нашего меню.", seeMenu: "Смотреть в меню", fullMenu: "Посмотреть всё меню", addToCart: "Добавить в корзину", added: "Добавлено",
    fireFirst: <>ОГОНЬ<br />ПРЕЖДЕ ВСЕГО</>, dailyTaste: "ВКУС DAILY", storyTitle: <>ВСЁ НАЧИНАЕТСЯ<br /><em>С НАСТОЯЩЕГО ОГНЯ.</em></>, storyText: "Свежие продукты, терпеливо маринованное мясо и раскалённые угли. Всё, что нужно для вкуса, который узнаёшь с первого кусочка.", benefits: [["Свежесть каждый день", "Каждый день подготавливаем мясо, овощи и домашние соусы."], ["Обжарено на углях", "Настоящий огонь придаёт нам фирменный аромат дымка."], ["Быстро и горячо", "Готовим по заказу и подаём именно тогда, когда нужно."]],
    reviewsKicker: "ПРЯМО ИЗ-ЗА СТОЛА", reviewsTitle: <>ГОСТИ<br /><em>В ВОСТОРГЕ.</em></>, reviewCount: "На основе более 1 200 отзывов",
    visitKicker: "ПРИХОДИТЕ С АППЕТИТОМ", visitTitle: <>ВАШ СТОЛИК<br /><em>УЖЕ ЖДЁТ.</em></>, visitText: "Заходите к нам, располагайтесь или закажите заранее, чтобы не ждать.", findUs: "НАШ АДРЕС", address: "str. Independentei 50", schedule: "РЕЖИМ РАБОТЫ", days: <>Понедельник–Воскресенье<br />11:00–22:30</>, callOrder: "Позвонить и заказать", seeLocation: "Посмотреть адрес", bagText: <>ВКУСНАЯ ЕДА.<br />ХОРОШЕЕ НАСТРОЕНИЕ.</>,
    faqKicker: "КОРОТКО О ГЛАВНОМ", faqTitle: <>ЕСТЬ ВОПРОСЫ?<br /><em>ЕСТЬ ОТВЕТЫ.</em></>, footerTagline: "БУРГЕРЫ И КЕБАБ — ПО-НАШЕМУ.", footerStory: "История", contact: "Контакты", privacy: "Конфиденциальность",
    imageAlts: { kebab: "Кебаб Daily с мясом на гриле и свежими овощами", nuggets: "Хрустящие наггетсы Daily из куриной грудки", burger: "Бургер Daily с говядиной и чеддером", hero: "Бургер Daily с говядиной, чеддером и свежими овощами" },
  },
};

const featuredProducts = [
  { id: "big-daily-burger", type: "burger", color: "orange" },
  { id: "kebab-pui", type: "kebab", color: "red" },
  { id: "nuggets-pui", type: "nuggets", color: "green" },
] as const;

const reviews = {
  ro: [
    { quote: "Burgerul a avut marginile perfect rumenite, iar kebabul avea gustul acela autentic de grătar cu cărbuni.", name: "Maria R.", order: "Big Daily Burger + Kebab de Pui" },
    { quote: "Fierbinte, rapid și delicios. Sosul Daily merită propriul lui fan club.", name: "Ion Pop", order: "Client fidel din 2022" },
    { quote: "Nuggets crocanți la exterior și fragezi în interior. Au dispărut de pe masă în câteva minute.", name: "Teodora A.", order: "Nuggets de Pui" },
  ],
  ru: [
    { quote: "У бургера была идеальная поджаристая корочка, а кебаб пах настоящим грилем на углях.", name: "Мария Р.", order: "Big Daily Burger + кебаб с курицей" },
    { quote: "Горячо, быстро и очень вкусно. Соус Daily достоин собственного фан-клуба.", name: "Ион Поп", order: "Постоянный гость с 2022 года" },
    { quote: "Наггетсы хрустящие снаружи и нежные внутри. Со стола исчезли за несколько минут.", name: "Теодора А.", order: "Куриные наггетсы" },
  ],
};

const faqs = {
  ro: [
    ["Ce găsesc în meniul Daily Kebab?", "Meniul include kebaburi, burgeri, meniuri combo, hot dog, gustări, salate, sosuri și băuturi. Produsele și prețurile actuale sunt afișate în pagina Meniu."],
    ["Aveți opțiuni vegetariene sau de post?", "Da. Poți alege Daily Falafel Kebab, Daily Kebab de Post și variantele lor de meniu, precum și Salata Grecească."],
    ["În ce zone livrați?", "Livrăm în Botanica, Centru și Telecentru, precum și în Codru, Băcioi, Bîc, Sîngera și Bubuieci. Tariful depinde de zona selectată."],
    ["Care este comanda minimă și când livrarea este gratuită?", "Comanda minimă pentru livrare este de 130 MDL. Livrarea în oraș este gratuită pentru comenzile de minimum 500 MDL, iar ridicarea din local este gratuită."],
    ["Cum plasez și achit o comandă?", "Adaugă produsele în coș și finalizează comanda online sau sună la +373 79 199 299. Comanda online devine valabilă după confirmarea telefonică și poate fi achitată curierului în numerar sau cu cardul."],
    ["Care este programul?", "Localul este deschis zilnic între 11:00 și 22:30, iar programul de livrare este 11:00–22:30. Ne găsești pe str. Independenței 50, Chișinău."],
  ],
  ru: [
    ["Что есть в меню Daily Kebab?", "В меню представлены кебабы, бургеры, комбо-меню, хот-доги, закуски, салаты, соусы и напитки. Актуальные блюда и цены указаны на странице меню."],
    ["Есть ли вегетарианские или постные блюда?", "Да. Можно выбрать Daily Falafel Kebab, постный Daily Kebab и наборы с ними, а также греческий салат."],
    ["В какие районы вы доставляете?", "Мы доставляем на Ботанику, в Центр и Телецентр, а также в Кодру, Бэчой, Бык, Сынжеру и Бубуечь. Стоимость зависит от выбранной зоны."],
    ["Какая минимальная сумма заказа и когда доставка бесплатная?", "Минимальная сумма заказа для доставки — 130 MDL. Доставка по городу бесплатная при заказе от 500 MDL, самовывоз всегда бесплатный."],
    ["Как оформить и оплатить заказ?", "Добавьте блюда в корзину и оформите заказ онлайн или позвоните по номеру +373 79 199 299. Онлайн-заказ принимается после подтверждения по телефону. Курьеру можно оплатить наличными или картой."],
    ["Какой у вас график работы?", "Ресторан открыт ежедневно с 11:00 до 22:30, доставка работает с 11:00 до 22:30. Наш адрес: ул. Индепенденцей, 50, Кишинёв."],
  ],
};

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function FlameIcon() {
  return <svg viewBox="0 0 32 40" aria-hidden="true"><path d="M17.8 1.8c1.3 7.8-5.1 10.6-3.2 16.1 1-2.6 3.1-4 5.2-5.8 4.7 4.4 7.3 8.8 6.5 14.4C25.5 33.1 21.2 38 15 38 8.1 38 3 33.1 3 26.5c0-5.7 3.3-10.9 9.7-16.2-.4 4.3.2 6.9 1.9 8.7C14 11.4 20.5 8.6 17.8 1.8Z" fill="currentColor" /><path d="M15.3 35c-3.2 0-5.5-2.2-5.5-5.2 0-2.4 1.4-4.7 4.1-7.1-.2 2.3.3 3.8 1.4 4.8.3-2.1 1.5-3.6 3.3-5.2 1.6 1.9 2.4 4 2.1 6.3-.4 3.7-2.5 6.4-5.4 6.4Z" fill="#ffcf3f" /></svg>;
}

function FoodArtwork({ type, language }: { type: string; language: Language }) {
  const alt = content[language].imageAlts;
  if (type === "kebab") return <Image className={styles.kebabImage} src={kebabImage} alt={alt.kebab} />;
  if (type === "nuggets") return <Image className={styles.menuFoodImage} src={nuggetsImage} alt={alt.nuggets} />;
  return <Image className={styles.menuFoodImage} src={burgerImage} alt={alt.burger} />;
}

function FeaturedImage({ image, alt }: { image: StaticImageData | string; alt: string }) {
  if (typeof image === "string") {
    return <img className={styles.menuFoodImage} src={image} alt={alt} loading="lazy" />;
  }
  return <Image className={styles.menuFoodImage} src={image} alt={alt} sizes="(max-width: 640px) calc(100vw - 70px), (max-width: 960px) 50vw, 420px" placeholder="blur" />;
}

export default function Home() {
  const { language } = useLanguage();
  const { items: cartItems, add } = useCart();
  const menuCategories = useMenuCategories();
  const t = content[language];
  const products = new Map(menuCategories.flatMap((category) => category.items.map((item) => [item.id, item] as const)));
  const items = featuredProducts.flatMap((featured) => {
    const product = products.get(featured.id);
    return product ? [{ ...featured, product }] : [];
  });
  const currentReviews = reviews[language];

  return (
    <main className={styles.page}>
      <ScrollAnimations />
      <section className={styles.hero} id="acasa">
        <nav className={styles.nav} aria-label={t.navLabel} data-reveal="down">
          <a className={styles.brand} href="#acasa" aria-label={t.homeLabel}><Image className={styles.logoImage} src={logoImage} alt="Daily Kebab Burger" priority /></a>
          <div className={styles.navLinks}><a href="/menu">{t.menu}</a><a href="#poveste">{t.story}</a><a href="#recenzii">{t.reviews}</a><a href="/delivery">{t.delivery}</a><a href="#locatie">{t.location}</a></div>
          <div className={styles.navActions}><LanguageSwitch /><a className={styles.navCta} href="/menu">{t.orderNow} <ArrowIcon /></a></div>
        </nav>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy} data-reveal="left">
            <div className={styles.eyebrow}><span /> {t.eyebrow}</div><h1>{t.heroTitle}</h1><p>{t.heroText}</p>
            <div className={styles.heroActions}><a className={styles.primaryCta} href="/menu">{t.discover} <ArrowIcon /></a><span><b>4.9</b><span className={styles.stars}>★★★★★</span><small>{t.happy}</small></span></div>
          </div>
          <div className={styles.heroVisual} data-reveal="scale" data-reveal-delay="1"><div className={styles.sunburst} /><div className={styles.heroFood}><Image src={burgerImage} alt={t.imageAlts.hero} loading="eager" /></div><div className={`${styles.doodle} ${styles.doodleOne}`}>{t.greatTaste}</div><div className={`${styles.doodle} ${styles.doodleTwo}`}>{t.fresh}</div></div>
        </div>
        <div className={styles.heroTicker}>{t.ticker.map((text) => <span key={text}>{text}</span>).reduce<React.ReactNode[]>((all, item, index) => index ? [...all, <i key={`star-${index}`}>✦</i>, item] : [item], [])}</div>
      </section>

      <section className={styles.menuSection} id="favorite">
        <div className={styles.sectionIntro} data-reveal="up"><div><span className={styles.kicker}>{t.favoritesKicker}</span><h2>{t.favoritesTitle}</h2></div><p>{t.favoritesText}</p></div>
        <div className={styles.menuGrid}>{items.map(({ product, type, color }, index) => {
          const quantity = cartItems.find((cartItem) => cartItem.id === product.id)?.quantity ?? 0;
          return <article className={styles.menuCard} key={product.id} data-reveal="up" data-reveal-delay={String(index + 1)}><div className={`${styles.cardVisual} ${styles[color]}`}><span>{product.tag?.[language] ?? product.name[language]}</span>{product.image ? <FeaturedImage image={product.image} alt={product.name[language]} /> : <FoodArtwork type={type} language={language} />}</div><div className={styles.cardInfo}><div><h3>{product.name[language]}</h3><p>{product.description[language]}</p></div><strong>{product.price} MDL</strong></div><button className={styles.addButton} type="button" onClick={() => add({ id: product.id, nameRo: product.name.ro, nameRu: product.name.ru, price: product.price })}>{quantity ? `${t.added} · ${quantity}` : t.addToCart}<span>+</span></button></article>;
        })}</div>
        <a className={styles.textLink} href="/menu">{t.fullMenu} <ArrowIcon /></a>
      </section>

      <section className={styles.storySection} id="poveste">
        <div className={styles.storyVisual} data-reveal="left"><div className={styles.grillLines} /><div className={styles.fireBadge}><FlameIcon /><b>{t.fireFirst}</b></div><FoodArtwork type="kebab" language={language} /></div>
        <div className={styles.storyCopy} data-reveal="right" data-reveal-delay="1"><span className={styles.kicker}>{t.dailyTaste}</span><h2>{t.storyTitle}</h2><p>{t.storyText}</p><ul>{t.benefits.map((benefit, index) => <li key={benefit[0]}><span>0{index + 1}</span><div><b>{benefit[0]}</b><small>{benefit[1]}</small></div></li>)}</ul></div>
      </section>

      <section className={styles.reviewsSection} id="recenzii">
        <div className={styles.reviewsHeading} data-reveal="left"><span className={styles.kicker}>{t.reviewsKicker}</span><h2>{t.reviewsTitle}</h2><div className={styles.rating}><strong>4.9</strong><span className={styles.stars}>★★★★★</span><small>{t.reviewCount}</small></div><blockquote className={styles.leftReview}><span className={styles.quoteMark}>“</span><p>{currentReviews[0].quote}</p><footer><b>{currentReviews[0].name}</b><small>{currentReviews[0].order}</small></footer></blockquote></div>
        <div className={styles.reviewGrid}>{currentReviews.slice(1).map((review, index) => <blockquote key={review.name} className={index === 0 ? styles.featuredReview : ""} data-reveal="right" data-reveal-delay={String(index + 1)}><span className={styles.quoteMark}>“</span><p>{review.quote}</p><footer><b>{review.name}</b><small>{review.order}</small></footer></blockquote>)}</div>
      </section>

      <section className={styles.visitSection} id="locatie">
        <div className={styles.visitCopy} data-reveal="left"><span className={styles.kicker}>{t.visitKicker}</span><h2>{t.visitTitle}</h2><p>{t.visitText}</p><div className={styles.visitDetails}><div><small>{t.findUs}</small><b>{t.address}</b></div><div><small>{t.schedule}</small><b>{t.days}</b></div></div><div className={styles.visitActions}><a className={styles.darkCta} href="tel:+37379199299">{t.callOrder} <ArrowIcon /></a><a href="mailto:contact@dailykebab.ro">{t.seeLocation}</a></div></div>
        <div className={styles.visitArt} data-reveal="scale" data-reveal-delay="1"><div className={styles.takeawayBag}><Image className={styles.bagLogo} src={logoImage} alt="Daily Kebab Burger" /><small>{t.bagText}</small></div><span className={styles.smoke}>~ ~ ~</span></div>
      </section>

      <section className={styles.faqSection}><div data-reveal="left"><span className={styles.kicker}>{t.faqKicker}</span><h2>{t.faqTitle}</h2></div><div className={styles.faqList}>{faqs[language].map((faq, index) => <details key={faq[0]} data-reveal="right" data-reveal-delay={index ? String(index) : undefined}><summary>{faq[0]}<span>+</span></summary><p>{faq[1]}</p></details>)}</div></section>

      <footer className={styles.footer} data-reveal="up"><a className={styles.brand} href="#acasa"><Image className={styles.logoImage} src={logoImage} alt="Daily Kebab Burger" /></a><p>{t.footerTagline}</p><div><a href="/menu">{t.menu}</a><a href="/delivery">{t.delivery}</a><a href="#poveste">{t.footerStory}</a><a href="#locatie">{t.contact}</a><a href="/privacy">{t.privacy}</a></div><small>© 2026 Daily Kebab Burger</small></footer>
    </main>
  );
}
