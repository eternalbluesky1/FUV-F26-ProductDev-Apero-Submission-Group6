"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { Mascot } from "@/components/mascot";
import { OfferCard } from "@/components/offer-card";
import { capture } from "@/lib/analytics";
import { useCatalog } from "@/lib/use-catalog";
import { CATEGORY_LABELS } from "@/lib/catalog-data";
import { loadGuestState } from "@/lib/storage";
import type { Category, GuestState, PublicDeal } from "@/lib/types";

const CATEGORY_ORDER: Category[] = [
  "cinema",
  "food",
  "software",
  "learning",
  "shopping",
  "transport"
];

function isFreeBenefit(label: string): boolean {
  const value = label.toLowerCase();
  return value.includes("miễn phí") || value.includes("free");
}

function isDiscountBenefit(label: string): boolean {
  const value = label.toLowerCase();
  return value.includes("%") || value.includes("giảm") || value.includes("voucher");
}

export default function SummaryPage() {
  const [state, setState] = useState<GuestState | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const captured = useRef(false);

  const catalog = useCatalog();
  const dealById = useMemo(() => new Map(catalog.map((deal) => [deal.id, deal])), [catalog]);

  useEffect(() => {
    const loaded = loadGuestState();
    setState(loaded.state);
    setHydrated(true);
  }, []);

  const savedIds = useMemo(() => (state ? Array.from(new Set(state.savedIds)) : []), [state]);
  const savedDeals = useMemo<PublicDeal[]>(() => {
    return savedIds
      .map((id) => dealById.get(id))
      .filter((deal): deal is PublicDeal => deal !== undefined);
  }, [savedIds, dealById]);
  const savedCount = savedIds.length;
  const unavailableCount = savedCount - savedDeals.length;

  const benefitStats = useMemo(() => {
    let free = 0;
    let discount = 0;
    for (const deal of savedDeals) {
      if (isFreeBenefit(deal.benefit_label)) free += 1;
      if (isDiscountBenefit(deal.benefit_label)) discount += 1;
    }
    return { free, discount, other: Math.max(savedDeals.length - free - discount, 0) };
  }, [savedDeals]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<Category, number>();
    for (const deal of savedDeals) {
      counts.set(deal.category, (counts.get(deal.category) ?? 0) + 1);
    }
    return CATEGORY_ORDER.map((key) => ({
      key,
      label: CATEGORY_LABELS[key] ?? key,
      count: counts.get(key) ?? 0
    })).filter((row) => row.count > 0);
  }, [savedDeals]);

  useEffect(() => {
    if (!hydrated || !state || captured.current) return;
    captured.current = true;
    capture("offers_summary_shown", {
      cards_seen: new Set(state.seenIds).size,
      unique_saved_count: savedCount
    });
  }, [hydrated, state, savedCount]);

  if (!hydrated || !state) {
    return (
      <div className="page-wrap py-10">
        <h1 className="sr-only">Tổng kết</h1>
        <div className="card-surface mx-auto max-w-xl p-6" aria-live="polite">
          <p className="text-sm font-semibold text-ink">Đang tải tổng kết...</p>
          <p className="mt-1 text-sm text-muted">StuDeal đang đọc các ưu đãi đã lưu trên trình duyệt này.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap py-8 sm:py-10">
      <header className="flex items-start gap-3 sm:gap-5">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-surface-lilac sm:h-20 sm:w-20">
          <Mascot pose={savedCount > 0 ? "found" : "thinking"} className="h-auto w-14 sm:w-16" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple">Kết quả bộ thẻ</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Tổng kết</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Các ưu đãi bạn đã lưu trong Pocket. Ưu đãi chỉ được giữ trên trình duyệt này, không cần tài khoản.
          </p>
        </div>
      </header>

      {savedCount > 0 ? (
        <section
          className="mt-6 overflow-hidden rounded-panel border border-brand-purple/25 bg-white shadow-raised"
          aria-labelledby="saved-value-heading"
        >
          <div className="bg-brand-purple px-5 py-4 text-white sm:px-6">
            <p className="text-xs font-bold tracking-[0.16em] uppercase text-white/80">
              Tóm tắt ưu đãi đã lưu
            </p>
            <h2 id="saved-value-heading" className="mt-1 font-display text-2xl font-bold">
              Bức tranh ưu đãi của bạn
            </h2>
          </div>
          <div className="p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-surface-lilac p-4">
                <p className="font-display text-4xl font-bold text-brand-purple">{savedCount}</p>
                <p className="mt-1 text-sm font-semibold text-ink">ưu đãi đã lưu</p>
                <p className="text-xs text-muted">Không tính trùng, khớp với số ưu đãi trong Pocket.</p>
              </div>
              <div className="rounded-2xl bg-brand-mint/10 p-4">
                <p className="font-display text-4xl font-bold text-success">{benefitStats.free}</p>
                <p className="mt-1 text-sm font-semibold text-ink">ưu đãi miễn phí</p>
                <p className="text-xs text-muted">Nhãn lợi ích có chữ miễn phí hoặc free.</p>
              </div>
              <div className="rounded-2xl bg-warning-surface p-4">
                <p className="font-display text-4xl font-bold text-warning">{benefitStats.discount}</p>
                <p className="mt-1 text-sm font-semibold text-ink">ưu đãi giảm giá</p>
                <p className="text-xs text-muted">Nhãn lợi ích có phần trăm, chữ giảm hoặc voucher.</p>
              </div>
            </div>

            {benefitStats.other > 0 ? (
              <p className="mt-3 text-sm text-muted">
                {benefitStats.other} ưu đãi còn lại thuộc dạng giá hoặc quyền lợi khác.
              </p>
            ) : null}

            <div className="mt-5">
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-muted">
                Theo lĩnh vực
              </p>
              {categoryCounts.length > 0 ? (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {categoryCounts.map((row) => (
                    <li
                      key={row.key}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-sm font-semibold text-ink"
                    >
                      {row.label}
                      <span className="rounded-full bg-brand-purple/10 px-2 py-0.5 text-xs font-bold text-brand-purple">
                        {row.count}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-muted">Chưa phân loại được ưu đãi nào.</p>
              )}
            </div>

            {unavailableCount > 0 ? (
              <p className="mt-4 text-sm text-muted">
                {unavailableCount} ưu đãi đã lưu không còn công khai nên không nằm trong phân loại
                bên trên.
              </p>
            ) : null}

            <p className="mt-4 rounded-xl bg-surface px-4 py-3 text-sm text-muted">
              Đây là giá trị của các ưu đãi bạn đã lưu, không phải số tiền bạn đã tiết kiệm. StuDeal
              không cộng các loại ưu đãi khác nhau thành một tổng tiền mặt.
            </p>
          </div>
        </section>
      ) : (
        <section className="mt-6 rounded-2xl bg-brand-purple/10 p-5 sm:p-6" aria-labelledby="saved-count-heading">
          <h2 id="saved-count-heading" className="text-sm font-semibold text-ink">
            Số ưu đãi đã lưu
          </h2>
          <p className="font-display text-4xl font-bold text-brand-purple">{savedCount}</p>
          <p className="mt-1 text-sm text-muted">Đây là số ưu đãi đã lưu, không phải số tiền.</p>
        </section>
      )}

      {savedCount === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="Chưa có ưu đãi nào"
            body="Bạn chưa lưu ưu đãi nào trong bộ thẻ. Khám phá danh mục để tìm ưu đãi phù hợp hoặc xem lại bộ thẻ."
            actionHref="/discover"
            actionLabel="Khám phá ưu đãi"
            secondaryHref="/pocket"
            secondaryLabel="Mở Pocket"
          />
        </div>
      ) : (
        <section className="mt-6" aria-labelledby="saved-offers-heading">
          <h2 id="saved-offers-heading" className="font-display text-2xl font-bold text-ink">
            Ưu đãi đã lưu
          </h2>
          {savedDeals.length > 0 ? (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {savedDeals.map((deal) => (
                <li key={deal.id}>
                  <OfferCard deal={deal} compact />
                </li>
              ))}
            </ul>
          ) : null}
          {unavailableCount > 0 ? (
            <p className="mt-4 rounded-xl border border-warning/30 bg-warning-surface px-4 py-3 text-sm text-warning">
              {unavailableCount} ưu đãi đã lưu không còn công khai. Mở Pocket để xem trạng thái và xóa.
            </p>
          ) : null}
        </section>
      )}

      {savedCount > 0 ? (
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Đi tiếp">
          <Link
            href="/pocket"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-purple px-5 font-semibold text-white transition hover:bg-brand-purple-hover"
          >
            Mở Pocket
          </Link>
          <Link
            href="/discover"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-white px-5 font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
          >
            Khám phá danh mục
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
