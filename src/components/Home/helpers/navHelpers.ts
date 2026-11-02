export type NavItem = {
  href: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/markets", label: "Markets" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/about", label: "About" },
];

export function getActiveItem(pathname: string): NavItem | null {
  return (
    NAV_ITEMS.find((nav) => {
      if (nav.href === "/") return pathname === "/";
      return pathname.startsWith(nav.href);
    }) ?? null
  );
}

export function isActive(item: NavItem, pathname: string): boolean {
  if (item.href === "/") return pathname === "/";
  return pathname.startsWith(item.href);
}
