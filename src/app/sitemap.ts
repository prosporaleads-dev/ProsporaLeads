import type { MetadataRoute } from "next";
import { getAppUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getAppUrl().origin;
  const now = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.9 },
    { path: "/how-we-work", changeFrequency: "monthly", priority: 0.85 },
    { path: "/markets", changeFrequency: "monthly", priority: 0.8 },
    { path: "/industries", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.75 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.75 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.4 },
    { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.4 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
