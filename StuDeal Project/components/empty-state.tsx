import Link from "next/link";

export function EmptyState({
  title,
  body,
  actionHref,
  actionLabel,
  secondaryHref,
  secondaryLabel
}: {
  title: string;
  body: string;
  actionHref?: string;
  actionLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="card-surface mx-auto max-w-xl p-6 text-center">
      <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>
      <p className="mt-2 text-sm text-muted">{body}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {actionHref && actionLabel ? (
          <Link
            href={actionHref}
            className="inline-flex min-h-11 items-center rounded-xl bg-brand-purple px-4 text-sm font-semibold text-white"
          >
            {actionLabel}
          </Link>
        ) : null}
        {secondaryHref && secondaryLabel ? (
          <Link
            href={secondaryHref}
            className="inline-flex min-h-11 items-center rounded-xl border border-border bg-white px-4 text-sm font-semibold text-ink"
          >
            {secondaryLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
