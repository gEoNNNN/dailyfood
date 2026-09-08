import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logoImage from "../../logo.png";
import { siteConfig } from "../siteConfig";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Politica de confidențialitate",
  description: "Află cum Daily Kebab Burger colectează, utilizează și protejează datele personale atunci când navighezi pe site sau plasezi o comandă.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  ["operator", "Cine suntem"],
  ["date", "Ce date colectăm"],
  ["scopuri", "Cum utilizăm datele"],
  ["partajare", "Cui transmitem datele"],
  ["drepturi", "Drepturile tale"],
  ["cookies", "Cookie-uri și stocare locală"],
  ["retentie", "Cât timp păstrăm datele"],
  ["securitate", "Securitate"],
  ["minori", "Minori"],
  ["contact", "Contact și reclamații"],
] as const;

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" aria-label="Daily Kebab Burger — pagina principală"><Image src={logoImage} alt="Daily Kebab Burger" priority /></Link>
        <Link href="/">← Înapoi acasă</Link>
      </header>

      <section className={styles.hero}>
        <span>LEGAL · CONFIDENȚIALITATE</span>
        <h1>Politica de<br /><em>confidențialitate.</em></h1>
        <p>Ultima actualizare: 8 septembrie 2026</p>
      </section>

      <div className={styles.legalNotice} role="note">
        <strong>De completat înainte de publicare</strong>
        <p>Denumirea juridică și IDNO-ul operatorului sunt marcate mai jos. Aceste informații trebuie completate și validate de jurist înainte ca pagina să fie publicată.</p>
      </div>

      <div className={styles.content}>
        <aside className={styles.toc}>
          <span>Cuprins</span>
          <nav aria-label="Cuprins politica de confidențialitate">
            {sections.map(([id, label], index) => <a href={`#${id}`} key={id}><b>{String(index + 1).padStart(2, "0")}</b>{label}</a>)}
          </nav>
        </aside>

        <article className={styles.policy}>
          <section id="operator">
            <span>Secțiunea 01</span>
            <h2>Cine suntem</h2>
            <p>Site-ul Daily Kebab Burger este operat de <mark>[DENUMIREA JURIDICĂ A FIRMEI]</mark>, IDNO <mark>[IDNO]</mark>, cu sediul în {siteConfig.address.street}, {siteConfig.address.city}, Republica Moldova („Daily Kebab Burger”, „operatorul”, „noi”).</p>
            <p>Prelucrăm datele cu caracter personal în conformitate cu Legea Republicii Moldova nr. 195/2024 privind protecția datelor cu caracter personal și cu celelalte norme aplicabile.</p>
          </section>

          <section id="date">
            <span>Secțiunea 02</span>
            <h2>Ce date colectăm</h2>
            <p>Când plasezi o comandă online, putem colecta:</p>
            <ul>
              <li>numele și prenumele;</li>
              <li>numărul de telefon;</li>
              <li>metoda de primire a comenzii și zona de livrare;</li>
              <li>adresa, apartamentul, scara sau interfonul, dacă soliciți livrare;</li>
              <li>produsele, cantitățile, valoarea comenzii și metoda de plată la curier;</li>
              <li>observațiile opționale introduse în formular;</li>
              <li>limba selectată și produsele păstrate local în coș.</li>
            </ul>
            <p>Nu colectăm prin site numărul cardului, codul CVV sau alte date bancare. Plata cu cardul, dacă este aleasă, se efectuează la curier. Site-ul nu creează conturi de utilizator și nu desfășoară profilare sau decizii automate.</p>
            <p>Serverul de găzduire poate prelucra date tehnice precum adresa IP, data și ora solicitării, URL-ul accesat, tipul browserului și informații despre erori, în jurnalele tehnice și de securitate.</p>
          </section>

          <section id="scopuri">
            <span>Secțiunea 03</span>
            <h2>Cum utilizăm datele</h2>
            <p>Utilizăm datele numai pentru:</p>
            <ul>
              <li>preluarea, confirmarea, pregătirea, livrarea și încasarea comenzii;</li>
              <li>contactarea ta în legătură cu disponibilitatea, adresa sau livrarea;</li>
              <li>soluționarea întrebărilor, reclamațiilor și disputelor;</li>
              <li>prevenirea abuzurilor și protejarea securității site-ului;</li>
              <li>respectarea obligațiilor fiscale, contabile și legale aplicabile.</li>
            </ul>
            <p>Temeiurile prelucrării sunt executarea demersurilor solicitate de tine și a comenzii, îndeplinirea obligațiilor legale și interesele legitime privind securitatea și apărarea drepturilor. În prezent, datele din formular nu sunt utilizate pentru newslettere sau marketing direct.</p>
          </section>

          <section id="partajare">
            <span>Secțiunea 04</span>
            <h2>Cui transmitem datele</h2>
            <p>Nu vindem și nu închiriem datele tale. Accesul poate fi acordat numai:</p>
            <ul>
              <li>personalului autorizat al restaurantului și curierului care execută comanda;</li>
              <li>furnizorului de hosting, în măsura necesară operării și securizării site-ului;</li>
              <li>Telegram, deoarece detaliile comenzii sunt transmise prin Telegram Bot API către contul administrativ al restaurantului;</li>
              <li>autorităților publice, atunci când există o obligație legală.</li>
            </ul>
            <p>Utilizarea Telegram poate implica prelucrarea datelor pe infrastructură aflată în alte jurisdicții. Transmitem prin acest serviciu doar informațiile necesare gestionării comenzii, iar accesul la conversația administrativă trebuie limitat la personalul autorizat.</p>
          </section>

          <section id="drepturi">
            <span>Secțiunea 05</span>
            <h2>Drepturile tale</h2>
            <p>În condițiile prevăzute de lege, poți solicita accesul la date, rectificarea, ștergerea sau restricționarea prelucrării, portabilitatea datelor și te poți opune anumitor prelucrări. Dacă o prelucrare viitoare se va baza pe consimțământ, îl vei putea retrage fără a afecta legalitatea prelucrării anterioare.</p>
            <p>De asemenea, ai dreptul să depui o plângere la Centrul Național pentru Protecția Datelor cu Caracter Personal sau să te adresezi instanței competente.</p>
          </section>

          <section id="cookies">
            <span>Secțiunea 06</span>
            <h2>Cookie-uri și stocare locală</h2>
            <p>În versiunea actuală, site-ul nu setează cookie-uri și nu folosește instrumente de analiză, publicitate sau urmărire. Folosim exclusiv stocarea locală a browserului pentru funcții solicitate de utilizator:</p>
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>Denumire</th><th>Tehnologie</th><th>Scop</th><th>Furnizor</th><th>Durată</th></tr></thead>
                <tbody>
                  <tr><td><code>daily-language</code></td><td>localStorage</td><td>Reține limba română sau rusă selectată.</td><td>Daily Kebab Burger</td><td>Până la modificare sau ștergerea datelor browserului.</td></tr>
                  <tr><td><code>daily-shopping-cart</code></td><td>localStorage</td><td>Reține produsele, cantitățile și prețurile din coș.</td><td>Daily Kebab Burger</td><td>Până la golirea coșului, finalizarea comenzii sau ștergerea datelor browserului.</td></tr>
                </tbody>
              </table>
            </div>
            <p>Aceste elemente nu urmăresc activitatea pe alte site-uri și nu sunt utilizate pentru publicitate. Dacă vom integra în viitor servicii care setează cookie-uri neesențiale, vom actualiza această politică și vom solicita opțiunea utilizatorului înainte de activarea lor, atunci când legea o impune.</p>
          </section>

          <section id="retentie">
            <span>Secțiunea 07</span>
            <h2>Cât timp păstrăm datele</h2>
            <ul>
              <li>Mesajele cu detaliile comenzilor din Telegram: cel mult 90 de zile de la finalizarea comenzii, exceptând situațiile în care sunt necesare pentru o reclamație, un litigiu sau o obligație legală.</li>
              <li>Datele din coș: până la golirea coșului, finalizarea comenzii sau ștergerea datelor browserului.</li>
              <li>Preferința de limbă: până când o modifici sau ștergi datele browserului.</li>
              <li>Documentele fiscale și contabile: pe durata impusă de legislația aplicabilă.</li>
              <li>Jurnalele tehnice ale infrastructurii: conform configurației și termenelor furnizorului de hosting, care trebuie confirmate înainte de lansarea site-ului.</li>
            </ul>
            <p>La expirarea perioadelor aplicabile, datele sunt șterse sau anonimizate, cu excepția cazurilor în care legea solicită păstrarea lor.</p>
          </section>

          <section id="securitate">
            <span>Secțiunea 08</span>
            <h2>Securitate</h2>
            <p>Limităm datele solicitate la cele necesare comenzii, validăm cererile primite de server și păstrăm cheile de acces ale integrărilor exclusiv în mediul securizat al serverului. Accesul la comenzile primite trebuie acordat numai persoanelor autorizate. Nicio transmisie sau metodă de stocare nu poate garanta securitate absolută.</p>
          </section>

          <section id="minori">
            <span>Secțiunea 09</span>
            <h2>Minori</h2>
            <p>Site-ul nu este conceput pentru colectarea intenționată a datelor copiilor. Dacă ești părinte sau reprezentant legal și consideri că un minor ne-a transmis date fără autorizarea corespunzătoare, contactează-ne pentru verificare și, după caz, ștergere.</p>
          </section>

          <section id="contact">
            <span>Secțiunea 10</span>
            <h2>Contact și reclamații</h2>
            <p>Pentru întrebări sau pentru exercitarea drepturilor privind datele tale, contactează operatorul la:</p>
            <div className={styles.contactCard}>
              <strong>Daily Kebab Burger</strong>
              <a href={`tel:${siteConfig.phone}`}>+373 79 199 299</a>
              <span>{siteConfig.address.street}, {siteConfig.address.city}, Republica Moldova</span>
            </div>
            <p>Poți depune o plângere și la Centrul Național pentru Protecția Datelor cu Caracter Personal, folosind informațiile publicate pe <a href="https://datepersonale.md" rel="noreferrer" target="_blank">datepersonale.md</a>.</p>
          </section>
        </article>
      </div>

      <footer className={styles.footer}><Image src={logoImage} alt="Daily Kebab Burger" /><span>Confidențialitatea datelor tale contează.</span><Link href="/">Pagina principală →</Link></footer>
    </main>
  );
}
