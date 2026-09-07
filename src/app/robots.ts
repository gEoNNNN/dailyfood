import type { MetadataRoute } from "next";
import { siteUrl } from "./siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/checkout"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl.origin,
  };
}
