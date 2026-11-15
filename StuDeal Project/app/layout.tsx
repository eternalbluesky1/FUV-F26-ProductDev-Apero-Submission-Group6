import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import "./globals.css";
import { AnalyticsInit } from "@/components/analytics-init";
import { MobileTabBar } from "@/components/mobile-tab-bar";
import { SiteHeader } from "@/components/site-header";

const baloo2 = localFont({
  src: "./fonts/Baloo2-Variable.ttf",
  variable: "--font-baloo2",
  weight: "400 800",
  display: "swap"
});

const beVietnamPro = localFont({
  src: [
    { path: "./fonts/BeVietnamPro-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/BeVietnamPro-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/BeVietnamPro-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/BeVietnamPro-Bold.ttf", weight: "700", style: "normal" }
  ],
  variable: "--font-be-vietnam-pro",
  display: "swap"
});

export const metadata: Metadata = {
  title: "StuDeal | Deal hay, đúng lúc",
  description:
    "StuDeal giúp sinh viên Việt Nam tìm ưu đãi phù hợp, hiểu điều kiện và lưu lại trong Pocket.",
  applicationName: "StuDeal"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${baloo2.variable} ${beVietnamPro.variable}`}>
      <body>
        <SiteHeader />
        <main className="pb-24 sm:pb-12 md:pb-12">{children}</main>
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
        <AnalyticsInit />
        <MobileTabBar />
      </body>
    </html>
  );
}
