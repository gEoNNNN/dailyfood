const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "http://localhost:3000";

export const siteUrl = new URL(configuredUrl.startsWith("http") ? configuredUrl : `https://${configuredUrl}`);

export const siteConfig = {
  name: "Daily Kebab Burger",
  shortName: "Daily Kebab",
  description: "Kebab, burgeri, gustări și livrare în Chișinău, pregătite proaspăt în fiecare zi la Daily Kebab Burger.",
  phone: "+37379199299",
  address: {
    street: "str. Independenței 50",
    city: "Chișinău",
    country: "MD",
  },
  locale: "ro_MD",
  themeColor: "#f4cd24",
} as const;
