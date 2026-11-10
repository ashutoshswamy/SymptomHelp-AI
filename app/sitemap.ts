import type { MetadataRoute } from "next";

const base = "https://symptomhelpai.in";
const pages = ["", "/about", "/faq", "/contact", "/terms", "/privacy", "/cookies", "/disclaimer"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({ url: `${base}${p}` }));
}
