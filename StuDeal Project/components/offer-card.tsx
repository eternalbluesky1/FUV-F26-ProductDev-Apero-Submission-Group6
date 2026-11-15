"use client";

import Link from "next/link";
import { CATEGORY_LABELS } from "@/lib/catalog-data";
import { getBrandAsset } from "@/lib/brand-assets";
import type { PublicDeal } from "@/lib/types";
import { BrandMark } from "./brand-mark";
import { EligibilityBadge } from "./eligibility-badge";
import { SourceStamp } from "./source-stamp";

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\u0111/g, "d")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function isRedundantBenefit(title: string, benefit: string) {
  const normalizedTitle = normalizeText(title);
  const normalizedBenefit = normalizeText(benefit);

  if (!normalizedBenefit) {
    return true;
  }

  return (
    normalizedTitle === normalizedBenefit ||
    normalizedTitle.includes(normalizedBenefit) ||
    normalizedBenefit.includes(normalizedTitle)
  );
}

export function OfferCard({
  deal,
  saved = false,
  onSave,
  compact = false
}: {
  deal: PublicDeal;
  saved?: boolean;
  onSave?: (deal: PublicDeal) => void;
  compact?: boolean;
}) {
  const brand = getBrandAsset(deal.slug, deal.brand_name, deal.brand_slug);
  const showBenefit = !isRedundantBenefit(deal.title, deal.benefit_label);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/70 bg-white/70 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_24px_48px_-30px_rgba(34,27,74,0.55)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-1 hover:border-white hover:shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_32px_64px_-30px_rgba(91,61,245,0.45)] supports-[backdrop-filter]:bg-white/50 motion-reduce:hover:translate-y-0 ${
        compact ? "" : "sm:shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_28px_56px_-32px_rgba(34,27,74,0.6)]"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-12 h-40 w-40 rounded-full opacity-50 blur-3xl"
        style={{ backgroundColor: brand.accent.glow }}
      />

      <BrandMark brand={brand} compact={compact} />

      <div
        className={`relative flex flex-1 flex-col gap-3 ${compact ? "p-4" : "p-5 sm:p-6"}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              {CATEGORY_LABELS[deal.category] ?? deal.category}
            </p>
            <p className="truncate text-sm font-bold text-ink">{deal.brand_name}</p>
          </div>
          <span className="shrink-0">
            <EligibilityBadge kind={deal.eligibility_kind} />
          </span>
        </div>

        <div className="space-y-2">
          <h3
            className={`text-balance font-display font-bold text-ink ${
              compact ? "text-lg leading-6" : "text-xl leading-7"
            }`}
          >
            <Link
              href={`/deal/${deal.slug}`}
              className="decoration-brand-purple/40 underline-offset-4 transition hover:text-brand-purple hover:underline"
            >
              {deal.title}
            </Link>
          </h3>

          {showBenefit ? (
            <p className="inline-flex items-center gap-1.5 rounded-lg bg-brand-purple/10 px-2.5 py-1 text-xs font-semibold text-brand-purple">
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
              {deal.benefit_label}
            </p>
          ) : null}

          <p
            className={`text-sm leading-6 text-muted ${
              compact ? "line-clamp-2" : "line-clamp-3"
            }`}
          >
            {deal.eligibility_text}
          </p>
        </div>

        <div className="mt-auto space-y-3 pt-1">
          <SourceStamp checkedAt={deal.source_checked_at} sourceUrl={deal.source_url} />
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/deal/${deal.slug}`}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/80 bg-white/70 px-4 text-sm font-semibold text-ink shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] backdrop-blur transition hover:border-brand-purple/40 hover:text-brand-purple"
            >
              Xem điều kiện
            </Link>
            {onSave ? (
              <button
                type="button"
                onClick={() => onSave(deal)}
                aria-pressed={saved}
                className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold transition ${
                  saved
                    ? "bg-brand-mint/20 text-success shadow-[0_1px_0_rgba(255,255,255,0.6)_inset]"
                    : "bg-linear-to-br from-brand-purple to-[#7c5cff] text-white shadow-[0_12px_24px_-14px_rgba(91,61,245,0.95)] hover:from-brand-purple-hover hover:to-[#6b4bff]"
                }`}
              >
                {saved ? "Đã lưu" : "Lưu vào Pocket"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
