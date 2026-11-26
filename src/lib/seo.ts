import { getAppUrl } from "@/lib/site-url";

export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  const origin = getAppUrl().origin;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
