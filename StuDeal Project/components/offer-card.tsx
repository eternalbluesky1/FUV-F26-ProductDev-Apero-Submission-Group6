"use client";

import Link from "next/link";
import { CATEGORY_LABELS } from "@/lib/catalog-data";
import type { PublicDeal } from "@/lib/types";
import { EligibilityBadge } from "./eligibility-badge";
import { SourceStamp } from "./source-stamp";

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
  return (
    <article className={`card-surface flex h-full flex-col gap-3 p-4 ${compact ? "" : "sm:p-5"}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {CATEGORY_LABELS[deal.category] ?? deal.category}
          </p>
          <p className="text-sm font-bold text-ink">{deal.brand_name}</p>
        </div>
        <EligibilityBadge kind={deal.eligibility_kind} />
      </div>
      <div className="space-y-2">
        <h3 className="font-display text-xl leading-7 font-bold text-ink">
          <Link href={`/deal/${deal.slug}`} className="underline-offset-4 hover:underline">
            {deal.title}
          </Link>
        </h3>
        <p className="text-lg font-bold text-brand-purple">{deal.benefit_label}</p>
        <p className="line-clamp-3 text-sm text-muted">{deal.eligibility_text}</p>
      </div>
      <div className="mt-auto space-y-3">
        <SourceStamp checkedAt={deal.source_checked_at} sourceUrl={deal.source_url} />
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/deal/${deal.slug}`}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-white px-4 text-sm font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
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
                  ? "bg-brand-mint/15 text-success"
                  : "bg-brand-purple text-white hover:bg-brand-purple-hover"
              }`}
            >
              {saved ? "Đã lưu" : "Lưu vào Pocket"}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
