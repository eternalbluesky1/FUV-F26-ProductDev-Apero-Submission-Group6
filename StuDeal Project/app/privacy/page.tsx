import Link from "next/link";

export const metadata = { title: "Chính sách riêng tư | StuDeal" };

export default function PrivacyPage() {
  return (
    <article className="page-wrap max-w-3xl py-8">
      <h1 className="font-display text-4xl font-bold text-ink">Chính sách riêng tư</h1>
      <p className="mt-2 text-sm text-muted">Bản nháp cho bản thử nghiệm StuDeal, cập nhật 14/11/2026.</p>
      <div className="mt-6 space-y-6 text-sm leading-6 text-muted">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Dữ liệu trên trình duyệt</h2>
          <p className="mt-2">
            Lựa chọn lĩnh vực, danh sách ưu đãi đã lưu và trạng thái đồng ý được lưu trong localStorage
            của trình duyệt. StuDeal không có tài khoản và không đồng bộ dữ liệu này giữa các thiết bị.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Phân tích</h2>
          <p className="mt-2">
            PostHog chỉ được tải sau khi bạn đồng ý. StuDeal tắt autocapture, pageview tự động, ghi hình
            phiên và khảo sát. Các sự kiện được thiết kế để không chứa nội dung câu hỏi, email, mã sinh
            viên hoặc dữ liệu nhạy cảm.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Nhấp ra nguồn chính thức</h2>
          <p className="mt-2">
            Khi bạn bấm mở nguồn chính thức, máy chủ có thể ghi một bản ghi vận hành gồm mã ưu đãi, vị
            trí nhấp và tên miền đích. Bản ghi này không chứa IP thô, không phải bằng chứng mua hàng và
            không đồng nghĩa với việc bạn đã đổi ưu đãi.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Trợ lý Mon</h2>
          <p className="mt-2">
            Khi dùng Ask Mon, tin nhắn của bạn và một đoạn hội thoại gần đây có thể được gửi tới nhà cung
            cấp mô hình để tạo câu trả lời. Không nhập dữ liệu nhạy cảm. Nếu chưa cấu hình nhà cung cấp,
            StuDeal dùng chế độ đối chiếu danh mục và ghi rõ chế độ đó.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Xóa dữ liệu</h2>
          <p className="mt-2">
            Vào <Link href="/settings" className="font-semibold text-brand-purple underline">Cài đặt</Link>{" "}
            để xóa dữ liệu cục bộ và đổi lựa chọn phân tích. Bản ghi nhấp vận hành không nằm trong
            localStorage và không thể xóa từ trình duyệt.
          </p>
        </section>
      </div>
    </article>
  );
}
