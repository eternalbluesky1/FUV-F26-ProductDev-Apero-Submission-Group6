import Link from "next/link";
import { notFound } from "next/navigation";
import { Mascot } from "@/components/mascot";
import { EligibilityBadge } from "@/components/eligibility-badge";
import { SourceStamp } from "@/components/source-stamp";
import { DealTracker } from "@/components/deal-tracker";
import { OutboundForm } from "@/components/outbound-form";
import { CATEGORY_LABELS } from "@/lib/catalog-data";
import { getCatalog } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DealPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const deals = await getCatalog().catch(() => []);
  const deal = deals.find((item) => item.slug === slug);
  if (!deal) notFound();

  return (
    <div className="page-wrap grid gap-6 py-8 lg:grid-cols-[1fr_0.7fr] lg:items-start">
      <DealTracker dealId={deal.id} />
      <article className="card-surface p-5 sm:p-8">
        <Link href="/discover" className="text-sm font-semibold text-brand-purple underline">
          Quay lại khám phá
        </Link>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-muted">
          {CATEGORY_LABELS[deal.category] ?? deal.category}
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold text-ink">{deal.brand_name}</h1>
        <p className="mt-2 text-xl font-bold text-brand-purple">{deal.title}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <EligibilityBadge kind={deal.eligibility_kind} />
          <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-muted">
            {deal.offer_type}
          </span>
        </div>

        <section className="mt-6">
          <h2 className="font-display text-2xl font-bold text-ink">Ai có thể dùng?</h2>
          <p className="mt-2 text-base text-muted">{deal.eligibility_text}</p>
        </section>

        <section className="mt-6">
          <h2 className="font-display text-2xl font-bold text-ink">Điều kiện quan trọng</h2>
          <ul className="mt-2 space-y-2 text-sm text-muted">
            <li>Giá và điều kiện có thể thay đổi theo chi nhánh, thời điểm và chương trình của đối tác.</li>
            <li>Ưu đãi không phải quan hệ đối tác hay xác nhận của StuDeal.</li>
            <li>Kiểm tra lại trang nguồn trước khi mua hoặc đăng ký.</li>
            {deal.redemption_steps ? <li>{deal.redemption_steps}</li> : <li>Xem hướng dẫn sử dụng trên nguồn chính thức.</li>}
          </ul>
        </section>

        <section className="mt-6 rounded-2xl bg-surface-lilac p-4">
          <h2 className="font-display text-xl font-bold text-ink">Nguồn và độ mới</h2>
          <p className="mt-1 text-sm text-muted">
            Ngày kiểm tra nguồn: {formatDate(deal.source_checked_at)}. Ngày rà soát tiếp theo:{" "}
            {formatDate(deal.review_by)}.
          </p>
          <div className="mt-3">
            <SourceStamp checkedAt={deal.source_checked_at} sourceUrl={deal.source_url} />
          </div>
        </section>

        <OutboundForm dealId={deal.id} />
        <p className="mt-3 text-xs text-muted">
          StuDeal không bán ưu đãi này. Nút mở trang chính thức của đối tác và có thể ghi nhận một lượt
          nhấp ẩn danh.
        </p>
      </article>

      <aside className="space-y-4">
        <div className="card-surface p-5">
          <Mascot pose="thinking" className="mx-auto h-auto w-40" />
          <h2 className="mt-3 font-display text-xl font-bold text-ink">Mon nhắc nhẹ</h2>
          <p className="mt-1 text-sm text-muted">
            Lưu ưu đãi vào Pocket để xem lại. Một lượt lưu không phải là đã mua hoặc đã đổi ưu đãi.
          </p>
          <Link
            href="/pocket"
            className="mt-4 inline-flex min-h-11 items-center rounded-xl border border-border bg-white px-4 text-sm font-semibold text-ink"
          >
            Mở Pocket
          </Link>
        </div>
        <div className="card-surface p-5">
          <h2 className="font-display text-xl font-bold text-ink">Thông tin nguồn</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div>
              <dt className="font-semibold text-ink">Loại nguồn</dt>
              <dd className="text-muted">{deal.source_type}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Quan hệ đối tác</dt>
              <dd className="text-muted">{deal.relationship_label}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Trạng thái dữ liệu</dt>
              <dd className="text-muted">{deal.content_status}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>
  );
}
