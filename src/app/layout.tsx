import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CartProvider from "./CartProvider";
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
  areaServed: ["Chișinău", "Botanica", "Centru", "Telecentru", "Codru", "Băcioi", "Bîc", "Sîngera", "Bubuieci"],
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "11:00",
    closes: "23:00",
  }],
  potentialAction: {
    "@type": "OrderAction",
    target: new URL("/menu", siteUrl).toString(),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ro" className={`${geistSans.variable} ${geistMono.variable}`}>
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
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
