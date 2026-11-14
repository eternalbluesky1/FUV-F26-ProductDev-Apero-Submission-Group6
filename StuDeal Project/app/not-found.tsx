import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-wrap py-16 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-purple">404</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">Không tìm thấy ưu đãi</h1>
      <p className="mt-2 text-muted">Ưu đãi có thể đã hết hoặc đường dẫn không đúng.</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Link href="/discover" className="inline-flex min-h-11 items-center rounded-xl bg-brand-purple px-4 text-sm font-semibold text-white">
          Xem danh mục
        </Link>
        <Link href="/" className="inline-flex min-h-11 items-center rounded-xl border border-border bg-white px-4 text-sm font-semibold text-ink">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
