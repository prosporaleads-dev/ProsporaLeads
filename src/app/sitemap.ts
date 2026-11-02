import type { MetadataRoute } from "next";
import { getAppUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getAppUrl().origin;
  const paths = [
    "",
    "/about",
    "/services",
    "/industries",
    "/markets",
    "/how-we-work",
    "/faq",
    "/contact",
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority:
      path === "" ? 1 : path === "/services" || path === "/contact" ? 0.9 : 0.7,
  }));
}
