"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { Mascot } from "@/components/mascot";
import { OfferCard } from "@/components/offer-card";
import { getPublicDeals } from "@/lib/catalog";
import { loadGuestState, saveGuestState } from "@/lib/storage";
import type { GuestState, PublicDeal } from "@/lib/types";

interface PocketItem {
  id: string;
  deal: PublicDeal | null;
}

export default function PocketPage() {
  const [state, setState] = useState<GuestState | null>(null);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const catalog = useMemo(() => getPublicDeals(), []);
  const dealById = useMemo(() => new Map(catalog.map((deal) => [deal.id, deal])), [catalog]);

  useEffect(() => {
    const loaded = loadGuestState();
    setState(loaded.state);
    setStorageAvailable(loaded.storageAvailable);
    setHydrated(true);
  }, []);

  const items = useMemo<PocketItem[]>(() => {
    if (!state) return [];
    const ids = Array.from(new Set(state.savedIds));
    return ids.map((id) => ({ id, deal: dealById.get(id) ?? null }));
  }, [state, dealById]);

  const savedCount = items.length;
  const unavailableCount = items.filter((item) => item.deal === null).length;

  if (!hydrated || !state) {
    return (
      <div className="page-wrap py-10">
        <h1 className="sr-only">Pocket</h1>
        <div className="card-surface mx-auto max-w-xl p-6" aria-live="polite">
          <p className="text-sm font-semibold text-ink">Đang tải Pocket...</p>
          <p className="mt-1 text-sm text-muted">StuDeal đang đọc các ưu đãi đã lưu trên trình duyệt này.</p>
        </div>
      </div>
    );
  }

  const currentState = state;

  function remove(id: string) {
    const next: GuestState = {
      ...currentState,
      savedIds: currentState.savedIds.filter((savedId) => savedId !== id)
    };
    setState(next);
    setAnnouncement("Đã xóa ưu đãi khỏi Pocket");
    if (!saveGuestState(next)) setStorageAvailable(false);
  }

  return (
    <div className="page-wrap py-8 sm:py-10">
      <header className="flex items-start gap-3 sm:gap-5">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand-mint/15 sm:h-20 sm:w-20">
          <Mascot pose={savedCount > 0 ? "found" : "thinking"} className="h-auto w-14 sm:w-16" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple">Ưu đãi của bạn</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Pocket</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Bạn đã lưu {savedCount} ưu đãi. Xem lại điều kiện, mở nguồn chính thức hoặc xóa khi không còn cần.
          </p>
        </div>
      </header>

      {!storageAvailable ? (
        <p className="mt-4 rounded-xl border border-warning/30 bg-warning-surface px-4 py-3 text-sm font-semibold text-warning">
          Trình duyệt đang chặn lưu trữ. Thay đổi chỉ được giữ trong phiên này và sẽ mất khi tải lại.
        </p>
      ) : null}

      <section className="card-surface mt-5 p-4 sm:p-5" aria-labelledby="storage-heading">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="storage-heading" className="font-display text-lg font-bold text-ink">
              Lưu trên trình duyệt này
            </h2>
            <p className="mt-1 text-sm text-muted">
              Pocket dùng bộ nhớ của trình duyệt. Đổi thiết bị, dùng chế độ riêng tư hoặc xóa dữ liệu trình duyệt sẽ
              không thấy ưu đãi đã lưu.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/settings"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-white px-4 text-sm font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
            >
              Cài đặt dữ liệu
            </Link>
            <Link
              href="/discover"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-purple px-4 text-sm font-semibold text-white transition hover:bg-brand-purple-hover"
            >
              Khám phá thêm
            </Link>
          </div>
        </div>
      </section>

      {savedCount === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="Pocket đang trống"
            body="Lưu ưu đãi khi lướt bộ thẻ hoặc khám phá danh mục. Ưu đãi đã lưu sẽ nằm trong trình duyệt này."
            actionHref="/deck"
            actionLabel="Xem bộ thẻ"
            secondaryHref="/discover"
            secondaryLabel="Khám phá ưu đãi"
          />
        </div>
      ) : (
        <section className="mt-6" aria-labelledby="pocket-heading">
          <div className="flex items-center justify-between gap-3">
            <h2 id="pocket-heading" className="font-display text-2xl font-bold text-ink">
              Ưu đãi đã lưu
            </h2>
            <p className="text-sm text-muted">{savedCount} ưu đãi</p>
          </div>
          {unavailableCount > 0 ? (
            <p className="mt-3 rounded-xl border border-warning/30 bg-warning-surface px-4 py-3 text-sm text-warning">
              {unavailableCount} ưu đãi không còn công khai. Bạn có thể xóa khỏi Pocket để danh sách gọn hơn.
            </p>
          ) : null}
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-2">
                {item.deal ? (
                  <OfferCard deal={item.deal} compact />
                ) : (
                  <div className="card-surface flex h-full flex-col gap-2 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Không còn khả dụng</p>
                    <p className="font-display text-xl font-bold text-ink">Ưu đãi này không còn công khai</p>
                    <p className="text-sm text-muted">
                      Ưu đãi đã được gỡ khỏi danh mục hiện tại. Bạn có thể xóa khỏi Pocket hoặc tìm ưu đãi khác.
                    </p>
                    <Link
                      href="/discover"
                      className="mt-auto inline-flex min-h-11 items-center text-sm font-semibold text-brand-purple underline"
                    >
                      Tìm ưu đãi khác
                    </Link>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  aria-label={`Xóa ${item.deal ? item.deal.title : "ưu đãi này"} khỏi Pocket`}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-danger/30 bg-danger-surface px-4 text-sm font-semibold text-danger transition hover:border-danger"
                >
                  Xóa khỏi Pocket
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
