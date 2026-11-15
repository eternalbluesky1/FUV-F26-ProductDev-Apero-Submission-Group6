"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { OfferCard } from "@/components/offer-card";
import { capture } from "@/lib/analytics";
import { normalize } from "@/lib/catalog";
import { useCatalog } from "@/lib/use-catalog";
import { CATEGORY_LABELS } from "@/lib/catalog-data";
import type { Category, PublicDeal } from "@/lib/types";

const CATEGORY_KEYS: Category[] = [
  "cinema",
  "food",
  "software",
  "learning",
  "shopping",
  "transport"
];

const CATEGORY_OPTIONS: Array<{ value: Category | "all"; label: string }> = [
  { value: "all", label: "Tất cả" },
  ...CATEGORY_KEYS.map((key) => ({ value: key, label: CATEGORY_LABELS[key] ?? key }))
];

const CATEGORY_HINTS: Record<Category | "all", string> = {
  all: "Toàn bộ danh mục",
  cinema: "Vé rạp, ưu đãi U22",
  food: "Cà phê, voucher",
  software: "Công cụ học tập",
  learning: "Khóa học, tài nguyên",
  shopping: "Giảm giá thiết bị, mua sắm",
  transport: "Vé điện, đi lại"
};

function isCategory(value: string | null): value is Category {
  return value !== null && (CATEGORY_KEYS as string[]).includes(value);
}

function matchesQuery(deal: PublicDeal, needle: string): boolean {
  if (!needle) return true;
  return normalize(
    [
      deal.brand_name,
      deal.title,
      deal.benefit_label,
      deal.eligibility_text,
      deal.category
    ].join(" ")
  ).includes(needle);
}

function DiscoverView() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const deals = useCatalog();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">(
    isCategory(categoryParam) ? categoryParam : "all"
  );

  useEffect(() => {
    if (isCategory(categoryParam)) setCategory(categoryParam);
  }, [categoryParam]);

  const results = useMemo(() => {
    const needle = normalize(query);
    return deals.filter(
      (deal) => (category === "all" || deal.category === category) && matchesQuery(deal, needle)
    );
  }, [deals, query, category]);

  const noCatalog = deals.length === 0;
  const countText = noCatalog
    ? "Danh mục chưa có ưu đãi hiện hành"
    : results.length === 0
      ? "Không có ưu đãi phù hợp"
      : category === "all"
        ? `${results.length} ưu đãi đang hiện hành`
        : `${results.length} ưu đãi trong ${CATEGORY_LABELS[category] ?? category}`;

  function recordSearch(resultCount: number) {
    capture("search_performed", {
      query_length: query.trim().length,
      result_count: resultCount
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    recordSearch(results.length);
  }

  function selectCategory(next: Category | "all") {
    setCategory(next);
    const needle = normalize(query);
    const nextResults = deals.filter(
      (deal) => (next === "all" || deal.category === next) && matchesQuery(deal, needle)
    );
    recordSearch(nextResults.length);
  }

  function resetFilters() {
    setQuery("");
    setCategory("all");
  }

  return (
    <div className="page-wrap py-8">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl leading-tight font-bold text-ink sm:text-5xl">
          Khám phá ưu đãi
        </h1>
      </header>

      <div
        className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4"
        role="group"
        aria-label="Lọc theo lĩnh vực"
      >
        {CATEGORY_OPTIONS.map((option) => {
          const active = category === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              aria-label={option.label}
              onClick={() => selectCategory(option.value)}
              className={`flex min-h-20 flex-col justify-between rounded-2xl border p-4 text-left transition ${
                option.value === "all" ? "col-span-2 sm:col-span-4" : ""
              } ${
                active
                  ? "border-brand-purple bg-brand-purple text-white shadow-card"
                  : "border-border bg-white text-ink hover:border-brand-purple hover:text-brand-purple"
              }`}
            >
              <span className="font-display text-lg leading-tight font-bold sm:text-xl">
                {option.label}
              </span>
              <span
                className={`mt-1 text-xs font-semibold ${active ? "text-white" : "text-muted"}`}
              >
                {CATEGORY_HINTS[option.value]}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 max-w-2xl text-base text-muted">
        Tìm theo tên thương hiệu, mức giảm hoặc điều kiện. Kết quả chỉ gồm ưu đãi đang hiện hành
        trong danh mục.
      </p>

      <form
        role="search"
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-2 sm:flex-row"
      >
        <div className="flex-1">
          <label htmlFor="discover-search" className="sr-only">
            Tìm ưu đãi
          </label>
          <input
            id="discover-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            maxLength={120}
            placeholder="Thử cà phê, vé phim, phần mềm..."
            className="min-h-12 w-full rounded-xl border border-border bg-white px-4 text-base text-ink placeholder:text-muted"
          />
        </div>
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-purple px-5 font-semibold text-white transition hover:bg-brand-purple-hover"
        >
          Tìm ưu đãi
        </button>
      </form>

      <p className="mt-5 text-sm font-semibold text-ink" aria-live="polite">
        {countText}
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((deal) => (
            <OfferCard key={deal.id} deal={deal} compact />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          {noCatalog ? (
            <EmptyState
              title="Chưa có ưu đãi hiện hành"
              body="Danh mục đang trống hoặc các ưu đãi đã hết hạn. Bạn thử lại sau hoặc hỏi Mon để được gợi ý."
              actionHref="/ask-mon"
              actionLabel="Hỏi Mon"
            />
          ) : (
            <>
              <EmptyState
                title="Chưa tìm thấy ưu đãi phù hợp"
                body="Thử từ khóa ngắn hơn, chọn lĩnh vực khác hoặc hỏi Mon để được gợi ý."
                actionHref="/ask-mon"
                actionLabel="Hỏi Mon"
              />
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex min-h-11 items-center rounded-xl border border-border bg-white px-4 text-sm font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function DiscoverFallback() {
  return (
    <div className="page-wrap py-8">
      <h1 className="font-display text-4xl font-bold text-ink">Khám phá ưu đãi</h1>
      <p className="mt-2 text-sm text-muted">Đang tải danh mục...</p>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<DiscoverFallback />}>
      <DiscoverView />
    </Suspense>
  );
}
