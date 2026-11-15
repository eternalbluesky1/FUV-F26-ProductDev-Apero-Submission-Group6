"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  href: string;
  label: string;
  short: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Trang chủ", short: "Trang chủ" },
  { href: "/discover", label: "Khám phá", short: "Khám phá" },
  { href: "/ask-mon", label: "Ask Mon", short: "Ask Mon" },
  { href: "/deck", label: "Bộ ưu đãi", short: "Bộ ưu đãi" },
  { href: "/pocket", label: "Pocket", short: "Pocket" }
];

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 md:flex">
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-10 items-center rounded-xl px-3 text-sm font-semibold transition ${
              active
                ? "bg-brand-purple/10 text-brand-purple"
                : "text-muted hover:bg-surface hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
