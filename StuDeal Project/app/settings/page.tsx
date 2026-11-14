"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getConsent, initAnalytics, setConsent, type Consent } from "@/lib/analytics";
import { clearGuestState } from "@/lib/storage";

const CONSENT_LABELS: Record<Consent, string> = {
  pending: "Chưa chọn",
  granted: "Đang cho phép",
  denied: "Đã từ chối"
};

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsentState] = useState<Consent>("pending");
  const [storageNotice, setStorageNotice] = useState<string | null>(null);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    try {
      setConsentState(getConsent());
    } catch {
      setConsentState("pending");
      setStorageNotice("Trình duyệt đang chặn lưu trữ nên chưa đọc được lựa chọn phân tích.");
    }
    setMounted(true);
  }, []);

  function allow() {
    try {
      setConsent("granted");
    } catch {
      setStorageNotice("Trình duyệt đang chặn lưu trữ, chưa thể lưu lựa chọn phân tích.");
      return;
    }
    setConsentState("granted");
    setStorageNotice(null);
    void initAnalytics();
  }

  function deny() {
    try {
      setConsent("denied");
    } catch {
      setStorageNotice("Trình duyệt đang chặn lưu trữ, chưa thể lưu lựa chọn phân tích.");
      return;
    }
    setConsentState("denied");
    setStorageNotice(null);
  }

  function clearData() {
    clearGuestState();
    setCleared(true);
  }

  return (
    <div className="page-wrap max-w-3xl space-y-6 py-8">
      <header>
        <h1 className="font-display text-4xl font-bold text-ink">Cài đặt</h1>
        <p className="mt-2 text-sm text-muted">
          StuDeal không có tài khoản. Dữ liệu của bạn nằm trên trình duyệt này, và bạn quyết định
          StuDeal có được ghi nhận sự kiện sử dụng ẩn danh hay không.
        </p>
      </header>

      <section aria-labelledby="storage-heading" className="card-surface p-5">
        <h2 id="storage-heading" className="font-display text-2xl font-bold text-ink">
          Dữ liệu trên trình duyệt
        </h2>
        <p className="mt-2 text-sm text-muted">
          Lĩnh vực bạn chọn, danh sách ưu đãi đã lưu và trạng thái đồng ý được giữ trong
          localStorage của trình duyệt. Dữ liệu này không được đồng bộ giữa các thiết bị. Nếu bạn
          xóa dữ liệu trình duyệt hoặc dùng chế độ riêng tư, lựa chọn và Pocket có thể mất.
        </p>
        <ul className="mt-3 space-y-1 text-sm text-muted">
          <li>Không có tài khoản, không có đồng bộ trên máy chủ.</li>
          <li>Xóa dữ liệu cục bộ sẽ làm mới lựa chọn lĩnh vực, deck và Pocket trên máy này.</li>
          <li>Bản ghi lượt nhấp nguồn chính thức là bản ghi vận hành ẩn danh, tách khỏi dữ liệu này.</li>
        </ul>
        <button
          type="button"
          onClick={clearData}
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-danger/40 bg-white px-4 text-sm font-semibold text-danger transition hover:bg-danger-surface"
        >
          Xóa dữ liệu cục bộ
        </button>
        {cleared ? (
          <p role="status" className="mt-3 rounded-xl bg-success-surface p-3 text-sm text-success">
            Đã xóa dữ liệu cục bộ trên trình duyệt này. Lựa chọn phân tích được giữ riêng, bạn đổi
            bằng nút bên dưới.
          </p>
        ) : null}
      </section>

      <section aria-labelledby="analytics-heading" className="card-surface p-5">
        <h2 id="analytics-heading" className="font-display text-2xl font-bold text-ink">
          Phân tích ẩn danh
        </h2>
        <p className="mt-2 text-sm text-muted">
          PostHog chỉ được tải sau khi bạn đồng ý. StuDeal tắt ghi hình phiên, khảo sát và tự động
          thu thập. Sự kiện không chứa nội dung câu hỏi, email, mã sinh viên hoặc dữ liệu nhạy cảm.
        </p>
        <p className="mt-3 rounded-xl bg-surface-lilac p-3 text-sm text-ink">
          Trạng thái hiện tại:{" "}
          <strong aria-live="polite">{mounted ? CONSENT_LABELS[consent] : "Đang kiểm tra..."}</strong>
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={allow}
            disabled={!mounted}
            aria-pressed={mounted && consent === "granted"}
            className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold transition ${
              mounted && consent === "granted"
                ? "bg-brand-purple text-white"
                : "border border-border bg-white text-ink hover:border-brand-purple hover:text-brand-purple"
            }`}
          >
            Cho phép phân tích
          </button>
          <button
            type="button"
            onClick={deny}
            disabled={!mounted}
            aria-pressed={mounted && consent === "denied"}
            className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold transition ${
              mounted && consent === "denied"
                ? "bg-ink text-white"
                : "border border-border bg-white text-ink hover:border-ink"
            }`}
          >
            Từ chối phân tích
          </button>
        </div>
        {storageNotice ? (
          <p className="mt-3 rounded-xl bg-warning-surface p-3 text-sm text-warning">{storageNotice}</p>
        ) : null}
      </section>

      <section aria-labelledby="legal-heading" className="card-surface p-5">
        <h2 id="legal-heading" className="font-display text-2xl font-bold text-ink">
          Chính sách và điều khoản
        </h2>
        <p className="mt-2 text-sm text-muted">
          Đọc cách StuDeal xử lý dữ liệu, vai trò của ứng dụng và giới hạn của thông tin ưu đãi.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/privacy"
            className="inline-flex min-h-11 items-center rounded-xl border border-border bg-white px-4 text-sm font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
          >
            Chính sách riêng tư
          </Link>
          <Link
            href="/terms"
            className="inline-flex min-h-11 items-center rounded-xl border border-border bg-white px-4 text-sm font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
          >
            Điều khoản sử dụng
          </Link>
        </div>
      </section>
    </div>
  );
}
