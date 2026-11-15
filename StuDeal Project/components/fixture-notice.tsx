"use client";

import { useEffect, useState } from "react";

const MODE = process.env.NEXT_PUBLIC_STUDEAL_DATA_MODE;
const FALLBACK_EVENT = "studeal:fixture-fallback";

export function FixtureNotice() {
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const onFallback = () => setFallback(true);
    window.addEventListener(FALLBACK_EVENT, onFallback);
    return () => window.removeEventListener(FALLBACK_EVENT, onFallback);
  }, []);

  if (MODE !== "fixture" && !fallback) return null;

  return (
    <div className="border-b border-[#f2d9a0] bg-warning-surface">
      <p className="page-wrap py-2 text-center text-sm font-medium text-warning">
        Dữ liệu minh họa. Không phải ưu đãi đang hiện hành.
      </p>
    </div>
  );
}
