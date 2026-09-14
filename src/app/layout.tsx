import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import CartProvider from "./CartProvider";
import CookieConsent from "./CookieConsent";
import FloatingPhone from "./FloatingPhone";
import LanguageProvider from "./LanguageProvider";
import QuickOrderBar from "./QuickOrderBar";
import { siteConfig, siteUrl } from "./siteConfig";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Daily Kebab Burger Chișinău | Kebab, burgeri și livrare",
    template: "%s | Daily Kebab Burger",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "restaurant",
  keywords: [
    "kebab Chișinău",
    "burgeri Chișinău",
    "fast food Chișinău",
    "livrare mâncare Chișinău",
    "kebab Botanica",
    "burger Moldova",
    "Daily Kebab Burger",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    alternateLocale: ["ru_MD"],
    url: "/",
    siteName: siteConfig.name,
    title: "Daily Kebab Burger Chișinău",
    description: siteConfig.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Daily Kebab Burger Chișinău" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Kebab Burger Chișinău",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/apple-icon",
  },
  manifest: "/manifest.webmanifest",
  formatDetection: { address: false, email: false, telephone: false },
  other: {
    "geo.region": "MD-CU",
    "geo.placename": siteConfig.address.city,
  },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "FastFoodRestaurant",
  "@id": new URL("/#restaurant", siteUrl).toString(),
  name: siteConfig.name,
  url: siteUrl.toString(),
  logo: new URL("/icon.svg", siteUrl).toString(),
  image: new URL("/opengraph-image", siteUrl).toString(),
  telephone: siteConfig.phone,
  priceRange: "$$",
  currenciesAccepted: "MDL",
  servesCuisine: ["Kebab", "Burger", "Fast food"],
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressCountry: siteConfig.address.country,
  },
  areaServed: ["Chișinău", "Botanica", "Centru", "Telecentru", "Codru", "Băcioi", "Sîngera", "Bubuieci"],
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "11:00",
    closes: "22:30",
  }],
  potentialAction: {
    "@type": "OrderAction",
    target: new URL("/menu", siteUrl).toString(),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ro" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script id="cookie-consent-default" strategy="beforeInteractive">
          {`(function(w,d,l,i,k){w[l]=w[l]||[];w.gtag=w.gtag||function(){w[l].push(arguments)};var granted=false;try{granted=w.localStorage.getItem(k)==='accepted'}catch(e){}w.gtag('consent','default',{ad_storage:granted?'granted':'denied',analytics_storage:granted?'granted':'denied',ad_user_data:granted?'granted':'denied',ad_personalization:granted?'granted':'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});w.loadDailyGtm=w.loadDailyGtm||function(){if(d.getElementById('daily-gtm'))return;w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName('script')[0],j=d.createElement('script'),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.id='daily-gtm';j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f)};if(granted)w.loadDailyGtm()})(window,document,'dataLayer','GTM-KFXN8FF','daily-cookie-consent');`}
        </Script>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd).replace(/</g, "\\u003c") }}
        />
        <LanguageProvider>
          <CartProvider>
            {children}
            <FloatingPhone />
            <QuickOrderBar />
            <CookieConsent />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
