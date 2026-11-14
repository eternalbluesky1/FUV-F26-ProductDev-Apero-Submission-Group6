import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ConsentBanner } from "@/components/consent-banner";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "StuDeal | Deal hay, đúng lúc",
  description:
    "StuDeal giúp sinh viên Việt Nam tìm ưu đãi phù hợp, hiểu điều kiện và lưu lại trong Pocket.",
  applicationName: "StuDeal"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <SiteHeader />
        <main className="pb-40 sm:pb-24">{children}</main>
        <footer className="mt-16 border-t border-border bg-white">
          <div className="page-wrap flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="font-display text-lg font-bold text-ink">studeal</span> · Deal hay, đúng lúc.
            </p>
            <nav aria-label="Liên kết chân trang" className="flex flex-wrap gap-4">
              <Link href="/privacy" className="hover:text-ink">
                Chính sách riêng tư
              </Link>
              <Link href="/terms" className="hover:text-ink">
                Điều khoản
              </Link>
              <Link href="/settings" className="hover:text-ink">
                Cài đặt
              </Link>
            </nav>
          </div>
        </footer>
        <ConsentBanner />
      </body>
    </html>
  );
}
