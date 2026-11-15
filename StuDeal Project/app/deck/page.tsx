"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { Mascot } from "@/components/mascot";
import { OfferCard } from "@/components/offer-card";
import { SwipeCard } from "@/components/swipe-card";
import { capture } from "@/lib/analytics";
import { useCatalog } from "@/lib/use-catalog";
import { loadGuestState, saveGuestState } from "@/lib/storage";
import type { GuestState, PublicDeal } from "@/lib/types";

export default function DeckPage() {
  const [state, setState] = useState<GuestState | null>(null);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const catalog = useCatalog();
  const dealById = useMemo(() => new Map(catalog.map((deal) => [deal.id, deal])), [catalog]);

  useEffect(() => {
    const loaded = loadGuestState();
    setState(loaded.state);
    setStorageAvailable(loaded.storageAvailable);
    setHydrated(true);
  }, []);

  const deck = useMemo<PublicDeal[]>(() => {
    if (!state) return [];
    const ids = Array.from(new Set(state.deckIds));
    return ids
      .map((id) => dealById.get(id))
      .filter((deal): deal is PublicDeal => deal !== undefined);
  }, [state, dealById]);

  const nextIndex = state ? deck.findIndex((deal) => !state.seenIds.includes(deal.id)) : -1;
  const current = nextIndex >= 0 ? deck[nextIndex] : null;
  const uniqueSavedCount = state ? new Set(state.savedIds).size : 0;

  if (!hydrated || !state) {
    return (
      <div className="page-wrap py-10">
        <h1 className="sr-only">Bộ thẻ ưu đãi</h1>
        <div className="card-surface mx-auto max-w-xl p-6" aria-live="polite">
          <p className="text-sm font-semibold text-ink">Đang tải bộ thẻ...</p>
          <p className="mt-1 text-sm text-muted">StuDeal đang đọc lựa chọn đã lưu trên trình duyệt này.</p>
        </div>
      </div>
    );
  }

  const currentState = state;

  function recordAction(action: "save" | "skip") {
    if (!current) return;
    const id = current.id;
    const isNewSave = action === "save" && !currentState.savedIds.includes(id);
    const seenIds = currentState.seenIds.includes(id)
      ? currentState.seenIds
      : [...currentState.seenIds, id];
    const savedIds = isNewSave ? [...currentState.savedIds, id] : currentState.savedIds;
    const next: GuestState = { ...currentState, seenIds, savedIds };
    const position = nextIndex + 1;
    setState(next);
    setAnnouncement(action === "save" ? `Đã lưu ${current.title}` : `Đã bỏ qua ${current.title}`);
    if (!saveGuestState(next)) setStorageAvailable(false);
    capture("deck_card_action", { deal_id: id, action, position });
    if (isNewSave) {
      capture("deal_saved", { deal_id: id, source_surface: "deck" });
    }
    const remaining = deck.filter((deal) => !seenIds.includes(deal.id)).length;
    if (remaining === 0) {
      capture("deck_completed", {
        cards_seen: deck.filter((deal) => seenIds.includes(deal.id)).length,
        unique_saved_count: new Set(savedIds).size
      });
    }
  }

  if (deck.length === 0) {
    if (catalog.length > 0 && currentState.deckIds.length === 0) {
      return (
        <div className="page-wrap py-10">
          <h1 className="sr-only">Bộ thẻ ưu đãi</h1>
          <EmptyState
            title="Chưa có bộ thẻ"
            body="Chọn lĩnh vực bạn quan tâm để Mon xếp ưu đãi phù hợp vào bộ thẻ. Bạn luôn có thể bỏ qua bước chọn."
            actionHref="/start"
            actionLabel="Chọn lĩnh vực"
            secondaryHref="/discover"
            secondaryLabel="Xem danh mục"
          />
        </div>
      );
    }
    return (
      <div className="page-wrap py-10">
        <h1 className="sr-only">Bộ thẻ ưu đãi</h1>
        <EmptyState
          title="Chưa tải được ưu đãi"
          body={
            catalog.length === 0
              ? "Danh mục hiện chưa có ưu đãi công khai. Thử lại sau hoặc xem danh mục để biết khi có ưu đãi mới."
              : "Các ưu đãi trong bộ thẻ không còn công khai hoặc đã hết hạn. Chọn lại lĩnh vực hoặc thử tải lại."
          }
          actionHref="/start"
          actionLabel="Chọn lĩnh vực"
          secondaryHref="/discover"
          secondaryLabel="Xem danh mục"
        />
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-white px-4 text-sm font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="page-wrap flex items-start gap-3 py-6 sm:gap-5 sm:py-10">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand-yellow/25 sm:h-20 sm:w-20">
          <Mascot pose="thinking" className="h-auto w-14 sm:w-16" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple">Bộ thẻ ưu đãi</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Lướt ưu đãi</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Lưu ưu đãi bạn thích, bỏ qua ưu đãi không hợp. Mọi lựa chọn được giữ trên trình duyệt này.
          </p>
        </div>
      </header>

      {!storageAvailable ? (
        <div className="page-wrap">
          <p className="rounded-xl border border-warning/30 bg-warning-surface px-4 py-3 text-sm font-semibold text-warning">
            Trình duyệt đang chặn lưu trữ. Lựa chọn chỉ được giữ trong phiên này và sẽ mất khi tải lại.
          </p>
        </div>
      ) : null}

      {current ? (
        <div className="page-wrap grid gap-5 pb-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(17rem,0.6fr)] lg:items-start">
          <section aria-labelledby="deck-card-heading">
            <h2 id="deck-card-heading" className="sr-only">
              Ưu đãi hiện tại
            </h2>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-ink">
                Thẻ {nextIndex + 1} / {deck.length}
              </p>
              <p className="text-sm text-muted">{uniqueSavedCount} ưu đãi đã lưu</p>
            </div>
            <div
              role="progressbar"
              aria-label="Tiến độ bộ thẻ"
              aria-valuemin={1}
              aria-valuemax={deck.length}
              aria-valuenow={nextIndex + 1}
              aria-valuetext={`Thẻ ${nextIndex + 1} trên ${deck.length}`}
              className="mt-2 h-2.5 overflow-hidden rounded-full bg-border"
            >
              <div
                className="h-full rounded-full bg-brand-purple transition-all"
                style={{ width: `${((nextIndex + 1) / deck.length) * 100}%` }}
              />
            </div>
            <p aria-live="polite" className="sr-only">
              {announcement}
            </p>

            <div className="mt-4">
              <SwipeCard key={current.id} onSwipe={recordAction}>
                <OfferCard deal={current} saved={currentState.savedIds.includes(current.id)} compact />
              </SwipeCard>
            </div>
            <p className="mt-2 text-center text-xs text-muted sm:hidden">
              Vuốt phải để lưu, vuốt trái để bỏ qua.
            </p>

            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => recordAction("save")}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-purple px-5 font-semibold text-white transition hover:bg-brand-purple-hover"
              >
                Lưu vào Pocket
              </button>
              <button
                type="button"
                onClick={() => recordAction("skip")}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-white px-5 font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
              >
                Bỏ qua
              </button>
              <Link
                href={`/deal/${current.slug}`}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-surface px-5 font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
              >
                Xem chi tiết
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted">
              Dùng phím Tab để chọn nút và Enter để xác nhận. Một lượt lưu không phải là đã mua hoặc đã đổi ưu đãi.
            </p>
          </section>

          <aside className="space-y-4">
            <div className="card-surface p-5">
              <Mascot pose="found" className="mx-auto h-auto w-28" />
              <h2 className="mt-2 font-display text-xl font-bold text-ink">Mon đang theo dõi</h2>
              <p className="mt-1 text-sm text-muted">
                Bạn đã lưu {uniqueSavedCount} ưu đãi. Không cần tài khoản, mọi thứ nằm trong trình duyệt này.
              </p>
              <Link
                href="/pocket"
                className="mt-4 inline-flex min-h-11 items-center rounded-xl border border-border bg-white px-4 text-sm font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
              >
                Mở Pocket
              </Link>
            </div>
            <div className="card-surface p-5">
              <h2 className="font-display text-xl font-bold text-ink">Trước khi dùng</h2>
              <p className="mt-1 text-sm text-muted">
                Đọc điều kiện và mở nguồn chính thức. StuDeal không bán ưu đãi và không xác nhận thay đối tác.
              </p>
              <Link href="/discover" className="mt-3 inline-flex text-sm font-semibold text-brand-purple underline">
                Xem toàn bộ danh mục
              </Link>
            </div>
          </aside>
        </div>
      ) : (
        <div className="page-wrap pb-10">
          <section className="card-surface mx-auto max-w-xl p-6 text-center sm:p-8">
            <Mascot pose="found" className="mx-auto h-auto w-36" />
            <h2 className="mt-4 font-display text-3xl font-bold text-ink">Bạn đã xem hết {deck.length} thẻ</h2>
            <p className="mt-2 text-sm text-muted">
              Đã lưu {uniqueSavedCount} ưu đãi. Xem tổng kết để mở Pocket hoặc khám phá thêm.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Link
                href="/summary"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-purple px-5 font-semibold text-white transition hover:bg-brand-purple-hover"
              >
                Xem tổng kết
              </Link>
              <Link
                href="/pocket"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-white px-5 font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
              >
                Mở Pocket
              </Link>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
