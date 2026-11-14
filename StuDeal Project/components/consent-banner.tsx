"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { capture, getConsent, initAnalytics, setConsent, type Consent } from "@/lib/analytics";

export function ConsentBanner() {
  const [consent, setLocalConsent] = useState<Consent>("pending");

  useEffect(() => {
    setLocalConsent(getConsent());
  }, []);

  if (consent !== "pending") return null;

  function grant() {
    setConsent("granted");
    setLocalConsent("granted");
    void initAnalytics().then(() => capture("landing_viewed", { referrer: "direct" }));
  }

  function deny() {
    setConsent("denied");
    setLocalConsent("denied");
  }

  return (
    <aside
      aria-label="Lựa chọn phân tích"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-border bg-white p-4 shadow-raised sm:inset-x-auto sm:right-4 sm:bottom-4"
    >
      <p className="text-sm font-semibold text-ink">StuDeal có thể ghi nhận sự kiện sử dụng ẩn danh?</p>
      <p className="mt-1 text-sm text-muted">
        Chúng tôi chỉ bật PostHog sau khi bạn đồng ý. Bạn có thể đổi lựa chọn trong Cài đặt.{" "}
        <Link href="/privacy" className="font-semibold text-brand-purple underline">
          Chính sách riêng tư
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={grant}
          className="min-h-11 rounded-xl bg-brand-purple px-4 text-sm font-semibold text-white"
        >
          Cho phép
        </button>
        <button
          type="button"
          onClick={deny}
          className="min-h-11 rounded-xl border border-border bg-white px-4 text-sm font-semibold text-ink"
        >
          Từ chối
        </button>
      </div>
    </aside>
  );
}
