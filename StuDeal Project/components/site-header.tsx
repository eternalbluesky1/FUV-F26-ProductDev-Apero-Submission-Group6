"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Trang chủ" },
  { href: "/discover", label: "Khám phá" },
  { href: "/ask-mon", label: "Hỏi Mon" },
  { href: "/pocket", label: "Pocket" }
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-surface/90 backdrop-blur">
      <div className="page-wrap flex min-h-14 items-center justify-between gap-4 py-2">
        <Link href="/" className="flex items-center gap-2" aria-label="StuDeal, về trang chủ">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-purple text-sm font-bold text-white">
            S
          </span>
          <span className="font-display text-2xl font-bold tracking-tight text-ink">studeal</span>
        </Link>
        <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                  active ? "bg-brand-purple text-white" : "text-muted hover:bg-white hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/start"
          className="inline-flex min-h-10 items-center rounded-xl bg-ink px-3 text-sm font-semibold text-white transition hover:bg-brand-purple"
        >
          Bắt đầu
        </Link>
      </div>
      <nav aria-label="Điều hướng di động" className="page-wrap flex gap-1 overflow-x-auto pb-2 md:hidden">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-full px-3 py-2 text-sm font-semibold ${
                active ? "bg-brand-purple text-white" : "bg-white text-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
