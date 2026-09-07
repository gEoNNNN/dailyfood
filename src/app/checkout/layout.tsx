import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finalizează comanda",
  description: "Finalizează comanda ta la Daily Kebab Burger.",
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: LayoutProps<"/checkout">) {
  return children;
}
