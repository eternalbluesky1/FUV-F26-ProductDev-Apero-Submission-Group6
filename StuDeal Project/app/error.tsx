"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div className="page-wrap py-16 text-center">
      <h1 className="font-display text-4xl font-bold text-ink">Có lỗi xảy ra</h1>
      <p className="mt-2 text-muted">Ứng dụng chưa tải được phần này. Dữ liệu đã lưu vẫn còn trên trình duyệt.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-brand-purple px-4 text-sm font-semibold text-white"
      >
        Thử lại
      </button>
    </div>
  );
}
