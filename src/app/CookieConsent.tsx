"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { useLanguage } from "./LanguageProvider";
import styles from "./global-ui.module.css";

type Consent = "accepted" | "rejected" | "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    loadDailyGtm?: () => void;
  }
}

const consentKey = "daily-cookie-consent";
const consentEvent = "daily-cookie-consent-change";

const copy = {
  ro: {
    title: "Preferințe cookie",
    text: "Folosim stocare esențială pentru limbă și coș. Cu acordul tău, folosim Google Analytics și instrumente publicitare pentru statistici și măsurarea comenzilor.",
    accept: "Accept toate",
    reject: "Refuz opționale",
    policy: "Politica de confidențialitate",
    settings: "Cookie-uri",
  },
  ru: {
    title: "Настройки cookie",
    text: "Мы используем обязательное хранилище для языка и корзины. С вашего согласия Google Analytics и рекламные инструменты используются для статистики и измерения заказов.",
    accept: "Принять все",
    reject: "Отклонить необязательные",
    policy: "Политика конфиденциальности",
    settings: "Cookie",
  },
} as const;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(consentEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(consentEvent, callback);
  };
}

function getConsent(): Consent {
  const value = window.localStorage.getItem(consentKey);
  return value === "accepted" || value === "rejected" ? value : "";
}

function getServerConsent(): Consent {
  return "";
}

function updateGoogleConsent(granted: boolean) {
  window.gtag?.("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });
}

function clearTrackingCookies() {
  const names = document.cookie.split(";").map((part) => part.split("=")[0].trim()).filter((name) => name === "_fbp" || name === "_gid" || name === "_gat" || name.startsWith("_ga"));
  const rootDomain = window.location.hostname.replace(/^www\./, "");
  names.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${rootDomain}; SameSite=Lax`;
  });
}

export default function CookieConsent() {
  const { language } = useLanguage();
  const consent = useSyncExternalStore(subscribe, getConsent, getServerConsent);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const t = copy[language];
  const visible = !consent || settingsOpen;

  function choose(nextConsent: Exclude<Consent, "">) {
    const wasAccepted = consent === "accepted";
    window.localStorage.setItem(consentKey, nextConsent);
    updateGoogleConsent(nextConsent === "accepted");
    if (nextConsent === "accepted") window.loadDailyGtm?.();
    if (nextConsent === "rejected") clearTrackingCookies();
    window.dispatchEvent(new Event(consentEvent));
    setSettingsOpen(false);
    if (wasAccepted && nextConsent === "rejected") window.location.reload();
  }

  if (!visible) return <button className={styles.cookieSettings} type="button" onClick={() => setSettingsOpen(true)}>{t.settings}</button>;

  return (
    <section className={styles.cookieBanner} role="region" aria-labelledby="cookie-consent-title">
      <div>
        <strong id="cookie-consent-title">{t.title}</strong>
        <p>{t.text} <Link href="/privacy">{t.policy}</Link>.</p>
      </div>
      <div className={styles.cookieActions}>
        <button type="button" className={styles.cookieReject} onClick={() => choose("rejected")}>{t.reject}</button>
        <button type="button" className={styles.cookieAccept} onClick={() => choose("accepted")}>{t.accept}</button>
      </div>
    </section>
  );
}
