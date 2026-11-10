import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/", // ponytail: private pages use noindex, which needs crawl access
    },
    sitemap: "https://symptomhelpai.in/sitemap.xml",
  };
}
