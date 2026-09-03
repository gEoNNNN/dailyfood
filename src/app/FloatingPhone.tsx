"use client";

import { useLanguage } from "./LanguageProvider";
import styles from "./global-ui.module.css";

export default function FloatingPhone() {
  const { language } = useLanguage();
  const label = language === "ro" ? "Sună și comandă" : "Позвонить и заказать";

  return (
    <a className={styles.floatingPhone} href="tel:+37379199299" aria-label={label} title={label}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.2 3.5 9.7 8l-2 1.7c1.2 2.5 3.2 4.5 5.7 5.7l1.7-2 4.5 2.5-.8 3.3c-.2.8-.9 1.3-1.7 1.3C9.6 20.5 3.5 14.4 3.5 6.9c0-.8.5-1.5 1.3-1.7l2.4-.7Z" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
