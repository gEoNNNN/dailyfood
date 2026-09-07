import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Livrare kebab și burgeri în Chișinău",
  description: "Comandă kebab, burgeri și gustări cu livrare în Botanica, Centru, Telecentru, Codru, Băcioi, Bîc, Sîngera și Bubuieci. Vezi zonele și tarifele.",
  alternates: { canonical: "/delivery" },
  openGraph: {
    title: "Livrare fast food în Chișinău",
    description: "Daily Kebab Burger livrează preparate proaspete în Chișinău și suburbiile disponibile.",
    url: "/delivery",
  },
};

export default function DeliveryLayout({ children }: LayoutProps<"/delivery">) {
  return children;
}
