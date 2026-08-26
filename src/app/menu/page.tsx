import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logoImage from "../../logo.png";
import styles from "./menu.module.css";

export const metadata: Metadata = {
  title: "Meniu | Daily Kebab Burger",
  description: "Descoperă meniul Daily: kebab, burgeri, meniuri complete, croki, salate și băuturi răcoritoare.",
};

const categories = [
  {
    id: "kebab",
    number: "01",
    name: "Kebab",
    note: "Lipie caldă, carne rumenită și sosuri de casă.",
    items: [
      { name: "Kebab Pui", description: "Pui, cartofi, salată, roșii, ceapă și două sosuri la alegere", price: "28 lei", tag: "Popular" },
      { name: "Kebab Vită", description: "Vită, cartofi, salată crocantă, castraveți murați și sos Daily", price: "31 lei" },
      { name: "Kebab Mixt", description: "Pui și vită, cartofi, legume proaspete și două sosuri", price: "32 lei" },
      { name: "Kebab Halloumi", description: "Halloumi la grătar, cartofi, salată, roșii și sos verde", price: "30 lei", tag: "Veggie" },
    ],
  },
  {
    id: "burger",
    number: "02",
    name: "Burger",
    note: "Chifle rumenite și burgeri făcuți la comandă.",
    items: [
      { name: "Daily Burger", description: "Vită, cheddar, salată, roșii, ceapă, castraveți și sos Daily", price: "32 lei", tag: "Semnătura casei" },
      { name: "Double Trouble", description: "Dublă vită, dublu cheddar, ceapă caramelizată, castraveți și sos afumat", price: "42 lei" },
      { name: "Crispy Chicken", description: "Pui crocant, cheddar, salată coleslaw, castraveți și sos picant", price: "31 lei" },
      { name: "Halloumi Burger", description: "Halloumi, ardei copt, rucola, roșii și sos verde cu tahini", price: "30 lei", tag: "Veggie" },
    ],
  },
  {
    id: "kebab-menu",
    number: "03",
    name: "Kebab Menu",
    note: "Kebabul preferat, cartofi și o băutură rece.",
    items: [
      { name: "Meniu Kebab Pui", description: "Kebab pui + cartofi prăjiți + băutură 330 ml", price: "39 lei", tag: "Avantajos" },
      { name: "Meniu Kebab Vită", description: "Kebab vită + cartofi prăjiți + băutură 330 ml", price: "42 lei" },
      { name: "Meniu Kebab Mixt", description: "Kebab mixt + cartofi prăjiți + băutură 330 ml", price: "43 lei" },
    ],
  },
  {
    id: "burger-menu",
    number: "04",
    name: "Burger Menu",
    note: "Burger, cartofi crocanți și băutură la alegere.",
    items: [
      { name: "Meniu Daily Burger", description: "Daily Burger + cartofi prăjiți + băutură 330 ml", price: "43 lei", tag: "Cel mai vândut" },
      { name: "Meniu Double Trouble", description: "Double Trouble + cartofi prăjiți + băutură 330 ml", price: "53 lei" },
      { name: "Meniu Crispy Chicken", description: "Crispy Chicken + cartofi prăjiți + băutură 330 ml", price: "42 lei" },
    ],
  },
  {
    id: "croki-menu",
    number: "05",
    name: "Croki Menu",
    note: "Crocant pe dinafară, delicios până la ultima îmbucătură.",
    items: [
      { name: "Croki Pui", description: "Fâșii de pui crocant, cartofi, sos de usturoi și băutură 330 ml", price: "38 lei", tag: "Crocant" },
      { name: "Croki Cașcaval", description: "Cașcaval pane, cartofi, sos Daily și băutură 330 ml", price: "36 lei" },
      { name: "Croki Mix", description: "Pui crocant, cașcaval pane, cartofi, două sosuri și băutură", price: "45 lei" },
    ],
  },
  {
    id: "salate",
    number: "06",
    name: "Salate",
    note: "Proaspete, colorate și suficient de consistente.",
    items: [
      { name: "Salată Daily", description: "Mix verde, pui la grătar, roșii, castravete, porumb și dressing de iaurt", price: "29 lei", tag: "Fresh" },
      { name: "Salată Halloumi", description: "Halloumi, rucola, roșii cherry, ardei copt, măsline și dressing de lămâie", price: "31 lei" },
      { name: "Salată Coleslaw", description: "Varză albă și roșie, morcov și dressing cremos de casă", price: "12 lei" },
    ],
  },
  {
    id: "bauturi",
    number: "07",
    name: "Băuturi Răcoritoare",
    note: "Reci, exact cum trebuie lângă ceva fierbinte.",
    items: [
      { name: "Băutură carbogazoasă", description: "Cola, portocale, lămâie-lime sau tonic — 330 ml", price: "9 lei" },
      { name: "Limonadă de casă", description: "Lămâie proaspătă, mentă și sirop de zahăr — 400 ml", price: "14 lei", tag: "De casă" },
      { name: "Apă plată / minerală", description: "Apă rece — 500 ml", price: "7 lei" },
      { name: "Ayran", description: "Băutură rece pe bază de iaurt — 330 ml", price: "10 lei" },
    ],
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MenuPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.logo} href="/" aria-label="Daily Kebab Burger - Acasă">
          <Image src={logoImage} alt="Daily Kebab Burger" priority />
        </Link>
        <nav aria-label="Navigare meniu">
          <Link href="/">Acasă</Link>
          <a href="#categorii">Categorii</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className={styles.orderButton} href="tel:+37379199299">Comandă <ArrowIcon /></a>
      </header>

      <section className={styles.hero}>
        <span className={styles.kicker}>TOT CE-ȚI FACE POFTĂ</span>
        <h1>MENIUL<br /><em>DAILY.</em></h1>
        <p>De la kebab rumenit la jar și burgeri generoși până la salate proaspete. Alege categoria și găsește-ți favoritul.</p>
        <div className={styles.heroStamp}><b>7</b><span>CATEGORII<br />PENTRU ORICE POFTĂ</span></div>
      </section>

      <nav className={styles.categoryNav} id="categorii" aria-label="Categorii meniu">
        {categories.map((category) => <a key={category.id} href={`#${category.id}`}>{category.name}</a>)}
      </nav>

      <div className={styles.menuContent}>
        {categories.map((category, categoryIndex) => (
          <section className={styles.category} id={category.id} key={category.id}>
            <div className={styles.categoryHeading}>
              <span>{category.number}</span>
              <div><h2>{category.name}</h2><p>{category.note}</p></div>
            </div>
            <div className={styles.itemsGrid}>
              {category.items.map((item) => (
                <article className={styles.item} key={item.name}>
                  <div className={styles.itemTop}>
                    <h3>{item.name}</h3>
                    {item.tag && <span>{item.tag}</span>}
                  </div>
                  <p>{item.description}</p>
                  <strong>{item.price}</strong>
                </article>
              ))}
              {categoryIndex === 1 && (
                <aside className={styles.promoCard}>
                  <span>EXTRA POFTĂ?</span>
                  <b>FĂ-L DUBLU.</b>
                  <p>Adaugă încă o porție de carne la orice burger pentru doar 10 lei.</p>
                </aside>
              )}
            </div>
          </section>
        ))}
      </div>

      <section className={styles.orderSection} id="contact">
        <div><span className={styles.kicker}>GATA DE COMANDĂ?</span><h2>SUNĂ. ALEGE.<br /><em>BUCURĂ-TE.</em></h2></div>
        <div className={styles.orderDetails}>
          <p>Comandă pentru ridicare, iar noi pregătim totul proaspăt și fierbinte.</p>
          <a href="tel:+37379199299">+373 79 199 299 <ArrowIcon /></a>
          <small>Luni–Duminică · 11:00–23:00</small>
        </div>
      </section>

      <footer className={styles.footer}>
        <Link href="/"><Image src={logoImage} alt="Daily Kebab Burger" /></Link>
        <p>BURGERI &amp; KEBAB, FĂCUȚI ALTFEL.</p>
        <Link href="/">Înapoi la pagina principală</Link>
        <small>© 2026 Daily Kebab Burger</small>
      </footer>
    </main>
  );
}
