import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meniu kebab și burgeri în Chișinău",
  description: "Descoperă meniul Daily Kebab Burger: kebab de pui și porc, burgeri, hot dog, gustări, salate și combo-uri în Chișinău. Prețuri în MDL și comandă online.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Meniu kebab și burgeri în Chișinău",
    description: "Kebab, burgeri, combo-uri și gustări pregătite proaspăt la Daily Kebab Burger.",
    url: "/menu",
  },
};

export default function MenuLayout({ children }: LayoutProps<"/menu">) {
  return children;
}
