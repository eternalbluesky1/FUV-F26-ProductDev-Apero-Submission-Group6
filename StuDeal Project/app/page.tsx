import Link from "next/link";
import { Mascot } from "@/components/mascot";
import { OfferCard } from "@/components/offer-card";
import { CATEGORY_LABELS } from "@/lib/catalog-data";
import { getCatalog, getDataMode } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const deals = await getCatalog().catch(() => []);
  const featured = deals.filter((deal) =>
    ["galaxy-u22-2d", "highlands-referral", "github-pro-student", "datacamp-student-pack"].includes(
      deal.slug
    )
  );
  const fixture = getDataMode() === "fixture";

  return (
    <div>
      <section className="page-wrap grid gap-8 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-14">
        <div>
          <p className="inline-flex rounded-full bg-brand-purple/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-purple">
            Dành cho sinh viên
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] font-bold tracking-tight text-ink sm:text-5xl">
            Deal hay,
            <br />
            đúng lúc.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Tìm ưu đãi thật, hiểu điều kiện, lưu vào Pocket. Không tài khoản, không vòng vo.
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
          </div>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
            <span>Không cần đăng nhập</span>
            <span>Nguồn chính thức</span>
            <span>Lưu trên trình duyệt</span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-6 rounded-[2.5rem] bg-brand-yellow/30 blur-2xl" aria-hidden />
          <Mascot pose="welcome" className="relative mx-auto h-auto w-full max-w-xs drop-shadow-xl" />
          <div className="card-surface relative -mt-6 mx-4 p-4">
            <p className="text-sm font-semibold text-ink">Mon sẽ giúp bạn chọn nhanh</p>
            <p className="mt-1 text-sm text-muted">
              Chọn ít nhất 3 lĩnh vực, hoặc bỏ qua để xem danh mục theo thứ tự.
            </p>
          </div>
        </div>
      </section>

      {fixture ? (
        <div className="page-wrap">
          <p className="rounded-xl border border-warning/30 bg-warning-surface px-4 py-3 text-sm font-semibold text-warning">
            Dữ liệu minh họa: các ưu đãi đang dùng snapshot ngày 13/11/2026, chưa phải danh mục live.
          </p>
        </div>
      ) : null}

      <section className="page-wrap py-10">
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

      <section className="page-wrap py-8">
        <div className="rounded-[2rem] bg-ink p-6 text-white sm:p-10">
          <h2 className="font-display text-3xl font-bold">Ba bước, không lê thê</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["1", "Chọn lĩnh vực", "Hoặc bỏ qua nếu bạn muốn xem hết."],
              ["2", "Lướt ưu đãi", "Lưu món bạn quan tâm, bỏ qua món không hợp."],
              ["3", "Giữ trong Pocket", "Xem lại điều kiện và mở nguồn chính thức."]
            ].map(([step, title, body]) => (
              <div key={step} className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm font-bold text-brand-yellow">Bước {step}</p>
                <p className="mt-2 text-lg font-bold">{title}</p>
                <p className="mt-1 text-sm text-white/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-wrap py-8">
        <h2 className="font-display text-3xl font-bold text-ink">Danh mục</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <Link
              key={key}
              href={`/discover?category=${key}`}
              className="inline-flex min-h-11 items-center rounded-full border border-border bg-white px-4 text-sm font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
