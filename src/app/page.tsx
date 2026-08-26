import Image from "next/image";
import burgerImage from "../burger.png";
import kebabImage from "../kebab.png";
import logoImage from "../logo.png";
import nuggetsImage from "../nuggets.png";
import styles from "./page.module.css";

const menuItems = [
  {
    tag: "CEL MAI VÂNDUT",
    name: "Burger Daily",
    description: "Vită fragedă, cheddar topit, ceapă crocantă, castraveți murați și sosul casei.",
    price: "89 lei",
    type: "burger",
    color: "orange",
  },
  {
    tag: "LA JAR",
    name: "Kebab Adana",
    description: "Carne condimentată, ardei copți, ceapă cu sumac, verdeață și lipie caldă.",
    price: "85 lei",
    type: "kebab",
    color: "red",
  },
  {
    tag: "SUPER CROCANT",
    name: "Nuggets Daily",
    description: "Bucăți fragede de pui în crustă aurie, servite cu sosul Daily la alegere.",
    price: "82 lei",
    type: "nuggets",
    color: "green",
  },
];

const reviews = [
  {
    quote: "Burgerul a avut marginile perfect rumenite, iar kebabul avea gustul acela autentic de grătar cu cărbuni.",
    name: "Maria R.",
    order: "Burger Daily + Adana",
  },
  {
    quote: "Fierbinte, rapid și delicios. Sosul Daily merită propriul lui fan club.",
    name: "Ion Pop",
    order: "Client fidel din 2022",
  },
  {
    quote: "Nuggets crocanți la exterior și fragezi în interior. Au dispărut de pe masă în câteva minute.",
    name: "Teodora A.",
    order: "Nuggets Daily",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 32 40" aria-hidden="true">
      <path d="M17.8 1.8c1.3 7.8-5.1 10.6-3.2 16.1 1-2.6 3.1-4 5.2-5.8 4.7 4.4 7.3 8.8 6.5 14.4C25.5 33.1 21.2 38 15 38 8.1 38 3 33.1 3 26.5c0-5.7 3.3-10.9 9.7-16.2-.4 4.3.2 6.9 1.9 8.7C14 11.4 20.5 8.6 17.8 1.8Z" fill="currentColor" />
      <path d="M15.3 35c-3.2 0-5.5-2.2-5.5-5.2 0-2.4 1.4-4.7 4.1-7.1-.2 2.3.3 3.8 1.4 4.8.3-2.1 1.5-3.6 3.3-5.2 1.6 1.9 2.4 4 2.1 6.3-.4 3.7-2.5 6.4-5.4 6.4Z" fill="#ffcf3f" />
    </svg>
  );
}

function FoodArtwork({ type }: { type: string }) {
  if (type === "kebab") {
    return <Image className={styles.kebabImage} src={kebabImage} alt="Kebab Daily cu carne la grătar și legume proaspete" />;
  }

  if (type === "nuggets") {
    return <Image className={styles.menuFoodImage} src={nuggetsImage} alt="Nuggets Daily crocanți din piept de pui" />;
  }

  return <Image className={styles.menuFoodImage} src={burgerImage} alt="Burger Daily cu vită și cheddar" />;
}

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} id="acasa">
        <nav className={styles.nav} aria-label="Navigare principală">
          <a className={styles.brand} href="#acasa" aria-label="Daily Kebab Burger - Acasă">
            <Image className={styles.logoImage} src={logoImage} alt="Daily Kebab Burger" priority />
          </a>
          <div className={styles.navLinks}>
            <a href="/menu">Meniu</a>
            <a href="#poveste">Povestea noastră</a>
            <a href="#recenzii">Recenzii</a>
            <a href="#locatie">Locație</a>
          </div>
          <a className={styles.navCta} href="/menu">Comandă acum <ArrowIcon /></a>
        </nav>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span /> BURGERI. KEBAB. FOC ADEVĂRAT.</div>
            <h1>GUST MARE.<br /><em>POFTĂ ȘI MAI MARE.</em></h1>
            <p>Burgeri generoși, kebab rumenit la flacără și sosuri pregătite în casă. Fără scurtături. Doar mâncare bună, făcută proaspăt.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryCta} href="/menu">Descoperă meniul <ArrowIcon /></a>
              <span><b>4.9</b> <span className={styles.stars}>★★★★★</span><small>Peste 1.200 de clienți mulțumiți</small></span>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.sunburst} />
            <div className={styles.heroFood}>
              <Image src={burgerImage} alt="Burger Daily cu vită, cheddar și legume proaspete" priority />
            </div>
            <div className={styles.kebabCard}><FoodArtwork type="kebab" /></div>
            <div className={`${styles.doodle} ${styles.doodleOne}`}>SUPER<br />GUST!</div>
            <div className={`${styles.doodle} ${styles.doodleTwo}`}>100%<br />PROASPĂT</div>
          </div>
        </div>
        <div className={styles.heroTicker}>
          <span>PREGĂTIT PROASPĂT</span><i>✦</i><span>RUMENIT LA JAR</span><i>✦</i><span>SOSURI DE CASĂ</span><i>✦</i><span>POFTĂ BUNĂ</span>
        </div>
      </section>

      <section className={styles.menuSection} id="favorite">
        <div className={styles.sectionIntro}>
          <div>
            <span className={styles.kicker}>PREFERATELE CLIENȚILOR</span>
            <h2>ALEGE-ȚI<br /><em>FAVORITUL.</em></h2>
          </div>
          <p>Pregătite de la zero, pline de gust și gătite întotdeauna la comandă. Descoperă vedetele meniului nostru.</p>
        </div>

        <div className={styles.menuGrid}>
          {menuItems.map((item) => (
            <article className={styles.menuCard} key={item.name}>
              <div className={`${styles.cardVisual} ${styles[item.color]}`}>
                <span>{item.tag}</span>
                <FoodArtwork type={item.type} />
              </div>
              <div className={styles.cardInfo}>
                <div><h3>{item.name}</h3><p>{item.description}</p></div>
                <strong>{item.price}</strong>
              </div>
              <a href="/menu" aria-label={`Vezi ${item.name} în meniu`}>Vezi în meniu <span>+</span></a>
            </article>
          ))}
        </div>
        <a className={styles.textLink} href="/menu">Vezi meniul complet <ArrowIcon /></a>
      </section>

      <section className={styles.storySection} id="poveste">
        <div className={styles.storyVisual}>
          <div className={styles.grillLines} />
          <div className={styles.fireBadge}><FlameIcon /><b>FOCUL<br />ÎNTÂI</b></div>
          <FoodArtwork type="kebab" />
        </div>
        <div className={styles.storyCopy}>
          <span className={styles.kicker}>GUSTUL DAILY</span>
          <h2>ÎNCEPE CU<br /><em>FOC ADEVĂRAT.</em></h2>
          <p>Ingrediente proaspete, carne marinată cu răbdare și jar încins. Atât ne trebuie pentru un gust pe care îl recunoști de la prima îmbucătură.</p>
          <ul>
            <li><span>01</span><div><b>Proaspăt, în fiecare zi</b><small>Pregătim zilnic carnea, legumele și sosurile casei.</small></div></li>
            <li><span>02</span><div><b>Rumenit pe jar</b><small>Focul adevărat adaugă aroma afumată care ne definește.</small></div></li>
            <li><span>03</span><div><b>Rapid și fierbinte</b><small>Gătit la comandă și servit exact când trebuie.</small></div></li>
          </ul>
        </div>
      </section>

      <section className={styles.reviewsSection} id="recenzii">
        <div className={styles.reviewsHeading}>
          <span className={styles.kicker}>DIRECT DE LA MASĂ</span>
          <h2>LUMEA E<br /><em>ÎNCÂNTATĂ.</em></h2>
          <div className={styles.rating}><strong>4.9</strong><span className={styles.stars}>★★★★★</span><small>Din peste 1.200 de recenzii</small></div>
          <blockquote className={styles.leftReview}>
            <span className={styles.quoteMark}>“</span><p>{reviews[0].quote}</p>
            <footer><b>{reviews[0].name}</b><small>{reviews[0].order}</small></footer>
          </blockquote>
        </div>
        <div className={styles.reviewGrid}>
          {reviews.slice(1).map((review, index) => (
            <blockquote key={review.name} className={index === 0 ? styles.featuredReview : ""}>
              <span className={styles.quoteMark}>“</span><p>{review.quote}</p>
              <footer><b>{review.name}</b><small>{review.order}</small></footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className={styles.visitSection} id="locatie">
        <div className={styles.visitCopy}>
          <span className={styles.kicker}>VINO CU POFTĂ</span>
          <h2>MASA TA<br /><em>TE AȘTEAPTĂ.</em></h2>
          <p>Treci pe la noi, ia loc sau comandă din timp și sari peste așteptare.</p>
          <div className={styles.visitDetails}>
            <div><small>NE GĂSEȘTI</small><b>Strada Pieței 28<br />Centru</b></div>
            <div><small>PROGRAM</small><b>Luni–Duminică<br />11:00–23:00</b></div>
          </div>
          <div className={styles.visitActions}>
            <a className={styles.darkCta} href="tel:+40123456789">Sună și comandă <ArrowIcon /></a>
            <a href="mailto:contact@dailykebab.ro">Vezi locația</a>
          </div>
        </div>
        <div className={styles.visitArt}>
          <div className={styles.takeawayBag}>
            <Image className={styles.bagLogo} src={logoImage} alt="Daily Kebab Burger" />
            <small>MÂNCARE BUNĂ.<br />STARE BUNĂ.</small>
          </div>
          <span className={styles.smoke}>~ ~ ~</span>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div>
          <span className={styles.kicker}>PE SCURT</span>
          <h2>ÎNTREBĂRI?<br /><em>REZOLVAT.</em></h2>
        </div>
        <div className={styles.faqList}>
          <details><summary>Aveți opțiuni vegetariene?<span>+</span></summary><p>Desigur. Încearcă Halloumi Crocant, legumele la grătar, cartofii cu topping și salatele proaspete.</p></details>
          <details><summary>Pot comanda pentru ridicare?<span>+</span></summary><p>Da. Sună-ne, comandă din timp, iar noi vom avea totul fierbinte și pregătit când ajungi.</p></details>
          <details><summary>Carnea este halal?<span>+</span></summary><p>Carnea de pui și miel provine de la furnizori certificați halal. Întreabă echipa noastră pentru detalii.</p></details>
          <details><summary>Pregătiți comenzi pentru grupuri?<span>+</span></summary><p>Da. Pentru grupuri de minimum opt persoane, contactează-ne din timp și te ajutăm cu meniul potrivit.</p></details>
        </div>
      </section>

      <footer className={styles.footer}>
        <a className={styles.brand} href="#acasa"><Image className={styles.logoImage} src={logoImage} alt="Daily Kebab Burger" /></a>
        <p>BURGERI &amp; KEBAB, FĂCUȚI ALTFEL.</p>
        <div><a href="/menu">Meniu</a><a href="#poveste">Poveste</a><a href="#locatie">Contact</a></div>
        <small>© 2026 Daily Kebab Burger</small>
      </footer>
    </main>
  );
}
