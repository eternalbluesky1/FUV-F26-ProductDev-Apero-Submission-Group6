import Link from "next/link";
import { Mascot } from "@/components/mascot";
import { OfferCard } from "@/components/offer-card";
import { CATEGORY_LABELS } from "@/lib/catalog-data";
import { getCatalog } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const CATEGORY_STYLES: Record<string, { gradient: string; text: string; subtext: string }> = {
  cinema: {
    gradient: "bg-linear-to-br from-brand-purple to-brand-purple-hover",
    text: "text-white",
    subtext: "text-white"
  },
  food: {
    gradient: "bg-linear-to-br from-brand-yellow to-[#ffb703]",
    text: "text-ink",
    subtext: "text-ink/70"
  },
  software: {
    gradient: "bg-linear-to-br from-brand-mint to-[#0e9e79]",
    text: "text-white",
    subtext: "text-white"
  },
  learning: {
    gradient: "bg-linear-to-br from-brand-pink to-[#ff4d94]",
    text: "text-white",
    subtext: "text-white"
  },
  shopping: {
    gradient: "bg-linear-to-br from-[#22c55e] to-[#15803d]",
    text: "text-white",
    subtext: "text-white"
  },
  transport: {
    gradient: "bg-linear-to-br from-[#0ea5e9] to-[#0369a1]",
    text: "text-white",
    subtext: "text-white"
  }
};

const DEFAULT_CATEGORY_STYLE = {
  gradient: "bg-linear-to-br from-brand-purple to-brand-purple-hover",
  text: "text-white",
  subtext: "text-white"
};

export default async function HomePage() {
  const deals = await getCatalog().catch(() => []);
  const featured = deals.filter((deal) =>
    [
      "galaxy-u22-2d",
      "highlands-vietcombank-jcb",
      "github-pro-student",
      "figma-education",
      "shopee-sinh-vien",
      "bhd-star-u22"
    ].includes(deal.slug)
  );

  return (
    <div>
      <section className="page-wrap grid gap-8 py-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:items-center lg:py-14">
        <div className="min-w-0">
          <h1 className="whitespace-nowrap font-display text-[clamp(1.5rem,7.5vw,3.25rem)] leading-[1.05] font-bold tracking-tight text-ink">
            Deal hay, đúng lúc.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Không có tiền nhưng mà không biết khuyến mãi nằm đâu? Đừng lo, vào studeal, tìm 1 phát là
            ra!
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/start"
              className="inline-flex min-h-12 items-center rounded-xl bg-brand-purple px-5 font-semibold text-white shadow-card transition hover:bg-brand-purple-hover"
            >
              Bắt đầu chọn ưu đãi
            </Link>
            <Link
              href="/discover"
              className="inline-flex min-h-12 items-center rounded-xl border border-border bg-white px-5 font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
            >
              Khám phá danh mục
            </Link>
            <Link
              href="/ask-mon"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-border bg-white px-5 font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
            >
              <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden">
                <Mascot pose="thinking" className="h-7 w-7" alt="" />
              </span>
              Hỏi Mon
            </Link>
          </div>
        </div>
        <div className="relative mx-auto w-full min-w-0 max-w-sm">
          <div className="absolute inset-6 rounded-[2.5rem] bg-brand-yellow/30 blur-2xl" aria-hidden />
          <Mascot pose="welcome" className="relative mx-auto h-auto w-full max-w-xs drop-shadow-xl" />
        </div>
      </section>

      <section className="page-wrap py-10">
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-3xl font-bold text-ink">Danh mục</h2>
          <p className="text-sm text-muted">
            Chọn một lĩnh vực để xem ưu đãi phù hợp với bạn.
          </p>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
            const style = CATEGORY_STYLES[key] ?? DEFAULT_CATEGORY_STYLE;
            return (
              <Link
                key={key}
                href={`/discover?category=${key}`}
                className={`group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-3xl p-6 shadow-card transition hover:-translate-y-1 hover:shadow-raised ${style.gradient} ${style.text}`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full bg-white/15"
                />
                <span className="font-display text-2xl leading-tight font-bold sm:text-3xl">
                  {label}
                </span>
                <span
                  className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold ${style.subtext}`}
                >
                  Xem ưu đãi
                  <span aria-hidden className="transition group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="page-wrap pb-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink">Ưu đãi nổi bật</h2>
            <p className="mt-1 text-sm text-muted">Chọn lọc từ danh mục hiện tại.</p>
          </div>
          <Link href="/discover" className="text-sm font-semibold text-brand-purple underline">
            Xem tất cả
          </Link>
        </div>
        {featured.length ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((deal) => (
              <OfferCard key={deal.id} deal={deal} compact />
            ))}
          </div>
        ) : (
          <div className="card-surface mt-5 p-6 text-sm text-muted">
            Danh mục chưa tải được. Kiểm tra cấu hình dữ liệu hoặc thử lại sau.
          </div>
        )}
      </section>
    </div>
  );
}
