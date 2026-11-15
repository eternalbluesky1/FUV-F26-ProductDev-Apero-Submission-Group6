import Link from "next/link";
import { SiteNav } from "./site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-surface/90 backdrop-blur">
      <div className="page-wrap flex min-h-14 items-center justify-between gap-4 py-2">
        <Link href="/" className="flex items-center" aria-label="StuDeal, về trang chủ">
          <span className="font-display text-2xl font-bold tracking-tight text-ink">studeal</span>
        </Link>
        <div className="flex items-center gap-2">
          <SiteNav />
          <Link
            href="/ask-mon"
            className="inline-flex min-h-10 items-center rounded-xl bg-brand-purple px-3 text-sm font-semibold text-white transition hover:bg-brand-purple-hover md:hidden"
          >
            Ask Mon
          </Link>
          <Link
            href="/start"
            className="inline-flex min-h-10 items-center rounded-xl bg-ink px-3 text-sm font-semibold text-white transition hover:bg-brand-purple"
          >
            Bắt đầu
          </Link>
        </div>
      </div>
    </header>
  );
}
