"use client";

import { useLanguage } from "./LanguageProvider";
import styles from "./global-ui.module.css";

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  const label = language === "ro" ? "Alege limba" : "Выберите язык";

  return (
    <div className={styles.languageSwitch} role="group" aria-label={label}>
      <button type="button" className={language === "ro" ? styles.active : ""} onClick={() => setLanguage("ro")} aria-pressed={language === "ro"}>RO</button>
      <span aria-hidden="true">/</span>
      <button type="button" className={language === "ru" ? styles.active : ""} onClick={() => setLanguage("ru")} aria-pressed={language === "ru"}>RU</button>
    </div>
  );
}
