import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CartProvider from "./CartProvider";
import FloatingPhone from "./FloatingPhone";
import LanguageProvider from "./LanguageProvider";
import QuickOrderBar from "./QuickOrderBar";
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
  title: "Daily Kebab Burger | Burgeri și Kebab la Jar",
  description: "Burgeri generoși, kebab rumenit la jar și sosuri pregătite în casă, proaspete în fiecare zi la Daily Kebab Burger.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ro" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
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
