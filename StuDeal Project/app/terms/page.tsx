export const metadata = { title: "Điều khoản | StuDeal" };

export default function TermsPage() {
  return (
    <article className="page-wrap max-w-3xl py-8">
      <h1 className="font-display text-4xl font-bold text-ink">Điều khoản sử dụng</h1>
      <p className="mt-2 text-sm text-muted">Bản nháp cho bản thử nghiệm StuDeal, cập nhật 14/11/2026.</p>
      <div className="mt-6 space-y-6 text-sm leading-6 text-muted">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Vai trò của StuDeal</h2>
          <p className="mt-2">
            StuDeal là công cụ khám phá ưu đãi. StuDeal không phải nhà cung cấp sản phẩm, không xác nhận
            tư cách thành viên của bạn và không đảm bảo một ưu đãi sẽ còn hiệu lực. Điều kiện cuối cùng
            thuộc về trang chính thức của đối tác.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Không có quan hệ đối tác</h2>
          <p className="mt-2">
            Tên thương hiệu được dùng để nhận diện ưu đãi. Trừ khi có thông báo riêng, StuDeal không có
            quan hệ đối tác, tài trợ hay đại lý với các thương hiệu trong danh mục.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Lưu và nhấp</h2>
          <p className="mt-2">
            Lưu một ưu đãi chỉ thay đổi Pocket trên trình duyệt. Một lượt nhấp mở nguồn chính thức không
            phải bằng chứng mua hàng, thanh toán hoặc đổi ưu đãi.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Dữ liệu minh họa</h2>
          <p className="mt-2">
            Khi ứng dụng hiển thị dữ liệu minh họa, nhãn cảnh báo sẽ xuất hiện. Không dùng dữ liệu minh
            họa làm bằng chứng về ưu đãi đang hiện hành hoặc tích hợp trực tiếp.
          </p>
        </section>
      </div>
    </article>
  );
}
