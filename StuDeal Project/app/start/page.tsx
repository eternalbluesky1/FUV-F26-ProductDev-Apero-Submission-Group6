"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mascot } from "@/components/mascot";
import { rankDeck } from "@/lib/catalog";
import { CATEGORY_LABELS } from "@/lib/catalog-data";
import { loadGuestState, saveGuestState } from "@/lib/storage";
import { useCatalog } from "@/lib/use-catalog";
import type { Category, GuestState } from "@/lib/types";

const options: Array<{ key: Category; title: string; body: string }> = [
  { key: "cinema", title: "Phim ảnh", body: "Vé rạp, suất chiếu, ưu đãi U22." },
  { key: "food", title: "Ăn uống", body: "Cà phê, voucher, ưu đãi thành viên." },
  { key: "software", title: "Phần mềm", body: "Công cụ học tập và sáng tạo." },
  { key: "learning", title: "Học tập", body: "Khóa học, tài nguyên, chứng chỉ." },
  { key: "shopping", title: "Mua sắm", body: "Giảm giá thiết bị, voucher mua sắm." },
  { key: "transport", title: "Di chuyển", body: "Vé xe buýt, giá vé sinh viên." }
];

export default function StartPage() {
  const router = useRouter();
  const [state, setState] = useState<GuestState | null>(null);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [selected, setSelected] = useState<Category[]>([]);

  useEffect(() => {
    const loaded = loadGuestState();
    setState(loaded.state);
    setStorageAvailable(loaded.storageAvailable);
    setSelected(loaded.state.selectedInterests);
  }, []);

  const deals = useCatalog();
  const canContinue = selected.length >= 3;

  function toggle(key: Category) {
    setSelected((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );
  }

  function continueToDeck() {
    if (!state || !canContinue) return;
    const next: GuestState = {
      ...state,
      selectedInterests: selected,
      onboarding: "done",
      deckIds: rankDeck(deals, selected).slice(0, 10).map((deal) => deal.id),
      seenIds: [],
      savedIds: state.savedIds.filter((id) => deals.some((deal) => deal.id === id))
    };
    saveGuestState(next);
    router.push("/deck");
  }

  function skip() {
    if (!state) return;
    const next: GuestState = {
      ...state,
      selectedInterests: [],
      onboarding: "skipped",
      deckIds: [...deals].sort((a, b) => a.slug.localeCompare(b.slug)).slice(0, 10).map((deal) => deal.id),
      seenIds: [],
      savedIds: state.savedIds.filter((id) => deals.some((deal) => deal.id === id))
    };
    saveGuestState(next);
    router.push("/deck");
  }

  return (
    <div className="page-wrap grid gap-6 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      <aside className="card-surface p-5">
        <Mascot pose="guide" className="mx-auto h-auto w-48" />
        <h1 className="mt-4 font-display text-3xl font-bold text-ink">Bạn quan tâm gì?</h1>
        <p className="mt-2 text-sm text-muted">
          Chọn ít nhất 3 lĩnh vực để Mon xếp ưu đãi phù hợp lên trước. Bạn luôn có thể bỏ qua.
        </p>
        <div className="mt-4 rounded-xl bg-surface-lilac p-3 text-sm text-ink">
          Đã chọn <strong>{selected.length}</strong> lĩnh vực
        </div>
        {!storageAvailable ? (
          <p className="mt-3 rounded-xl bg-warning-surface p-3 text-sm text-warning">
            Trình duyệt đang chặn lưu trữ. Lựa chọn sẽ không được giữ sau khi tải lại.
          </p>
        ) : null}
        <Link href="/" className="mt-5 inline-flex text-sm font-semibold text-brand-purple underline">
          Về trang chủ
        </Link>
      </aside>

      <section aria-labelledby="interest-heading">
        <h2 id="interest-heading" className="sr-only">
          Chọn lĩnh vực
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {options.map((option) => {
            const active = selected.includes(option.key);
            return (
              <button
                key={option.key}
                type="button"
                aria-pressed={active}
                onClick={() => toggle(option.key)}
                className={`min-h-32 rounded-2xl border p-5 text-left transition ${
                  active
                    ? "border-brand-purple bg-brand-purple text-white shadow-card"
                    : "border-border bg-white text-ink hover:border-brand-purple"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-[0.14em] opacity-70">
                  {CATEGORY_LABELS[option.key]}
                </span>
                <span className="mt-3 block font-display text-2xl font-bold">{option.title}</span>
                <span className={`mt-1 block text-sm ${active ? "text-white/80" : "text-muted"}`}>
                  {option.body}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={continueToDeck}
            disabled={!canContinue}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-purple px-5 font-semibold text-white transition hover:bg-brand-purple-hover disabled:cursor-not-allowed disabled:bg-border disabled:text-muted"
          >
            Tiếp tục với {selected.length} lĩnh vực
          </button>
          <button
            type="button"
            onClick={skip}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-white px-5 font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
          >
            Bỏ qua, xem tất cả
          </button>
        </div>
        {!canContinue ? (
          <p className="mt-2 text-sm text-muted">Chọn thêm {3 - selected.length} lĩnh vực để tiếp tục.</p>
        ) : null}
      </section>
    </div>
  );
}
