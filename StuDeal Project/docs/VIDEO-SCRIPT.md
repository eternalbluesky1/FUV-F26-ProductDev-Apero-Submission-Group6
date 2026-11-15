# Video demo: kịch bản quay

Mục tiêu: video 2 đến 3 phút, quay ứng dụng đang chạy, trình bày đúng hành trình lõi. Ngôn ngữ thuyết minh là tiếng Việt. Mỗi cảnh ghi rõ route, viewport, thao tác, lời thoại và điều cảnh đó chứng minh.

Không quay màn hình trích xuất PDF, terminal có biến môi trường, hay bất kỳ cửa sổ nào chứa khóa. Dùng một profile trình duyệt sạch.

## Chuẩn bị trước khi quay

- Trình duyệt: Chrome, zoom 100%, ẩn bookmark bar, tắt thông báo hệ thống.
- Mobile: DevTools device toolbar, `390x844`, device pixel ratio 3. Quay vùng nội dung trang, không cần giả lập điện thoại thật.
- Desktop: cửa sổ `1280x900`, cùng profile.
- Xóa dữ liệu cũ trước mỗi lần quay: Settings, `Xóa dữ liệu cục bộ`, hoặc DevTools, Application, Clear site data.
- Đăng xuất mọi tài khoản cá nhân. Đóng tab khác. Không để lộ tên, email, hay lịch sử duyệt.
- Kiểm tra lại từng ưu đãi sẽ xuất hiện: mỗi thẻ phải có nguồn chính thức và ngày kiểm tra. Nếu một ưu đãi đã hết hạn, đừng đưa vào cảnh quay.
- Quyết định trước sẽ quay bản hosted hay bản local. Bản hosted dùng Supabase và có Ask Mon live. Bản local dùng fixture và phải nói rõ là dữ liệu minh họa.
- Quay 1080p, 30 fps. Có thể quay từng đoạn rồi ghép; không cần một lần liền mạch.
- Tổng thời lượng đích: 2 phút 40 giây. Đừng vượt 3 phút.

## Danh sách cảnh

### 0:00 đến 0:12. Home

- Route: `/`
- Viewport: 390x844
- Thao tác: để trang tải xong, cuộn nhẹ để thấy các lối vào danh mục, rồi bấm `Bắt đầu chọn ưu đãi`.
- Thuyết minh: "StuDeal giúp sinh viên tìm ưu đãi phù hợp, hiểu điều kiện và lưu lại trong một chỗ. Không cần tạo tài khoản."
- Chứng minh: điểm vào rõ ràng, không có tường đăng nhập, có lối tắt theo danh mục.

### 0:12 đến 0:32. Chọn lĩnh vực

- Route: `/start`
- Viewport: 390x844
- Thao tác: chọn `Phim ảnh`, `Ăn uống`, `Phần mềm`; chỉ vào bộ đếm `Đã chọn 3 lĩnh vực`; lia tới nút `Bỏ qua, xem tất cả` nhưng chưa bấm; bấm `Tiếp tục với 3 lĩnh vực`.
- Thuyết minh: "Mình chọn ba lĩnh vực quan tâm. Nút Bỏ qua vẫn luôn có, nếu mình không muốn chọn gì."
- Chứng minh: điều kiện tối thiểu ba lĩnh vực, và đường Bỏ qua tồn tại.

### 0:32 đến 0:58. Bộ thẻ

- Route: `/deck`
- Viewport: 390x844
- Thao tác: thẻ 1 bấm `Lưu vào Pocket`; thẻ 2 bấm `Bỏ qua`; thẻ 3 bấm `Xem chi tiết`, xem nhanh rồi quay lại; tua nhanh phần còn lại bằng cách bấm `Bỏ qua` cho hết bộ thẻ.
- Thuyết minh: "Mỗi thẻ có Lưu, Bỏ qua và Xem chi tiết. Mình lưu một ưu đãi, bỏ qua một ưu đãi, và mở điều kiện của một ưu đãi khác."
- Chứng minh: ba hành động chính hoạt động bằng nút, không phụ thuộc cử chỉ.

### 0:58 đến 1:10. Tổng kết

- Route: `/summary`
- Viewport: 390x844
- Thao tác: dừng ở con số `ưu đãi đã lưu`; chỉ vào dòng `Đây là số ưu đãi đã lưu, không phải số tiền.`
- Thuyết minh: "Tổng kết chỉ đếm số ưu đãi đã lưu. Không cộng thành số tiền tiết kiệm."
- Chứng minh: đếm duy nhất, không có tuyên bố tiền tệ.

### 1:10 đến 1:26. Pocket và tải lại

- Route: `/pocket`
- Viewport: 390x844
- Thao tác: xóa một ưu đãi; chỉ vào danh sách còn lại; tải lại trang; cho thấy danh sách vẫn còn.
- Thuyết minh: "Pocket lưu trên trình duyệt này. Mình xóa một ưu đãi, tải lại trang, phần còn lại vẫn ở đó."
- Chứng minh: xóa được, và trạng thái sống qua reload.

### 1:26 đến 1:42. Khám phá

- Route: `/discover`
- Viewport: 1280x900
- Thao tác: gõ `Highlands` vào ô tìm, bấm `Tìm ưu đãi`; chọn chip lĩnh vực `Ăn uống`.
- Thuyết minh: "Ở Khám phá, mình tìm theo thương hiệu và lọc theo lĩnh vực. Kết quả chỉ gồm ưu đãi đang hiện hành."
- Chứng minh: tìm kiếm có dấu hoặc không dấu, lọc danh mục, và bố cục desktop.

### 1:42 đến 2:08. Ask Mon

- Route: `/ask-mon`
- Viewport: 390x844
- Thao tác: bấm gợi ý `Tìm vé phim cho sinh viên` hoặc gõ cùng câu đó; bấm `Gửi`; đợi câu trả lời; chỉ vào nhãn chế độ và các thẻ ưu đãi.
- Thuyết minh: "Mon trả lời bằng tiếng Việt và chỉ gợi ý ưu đãi có trong danh mục. Thẻ gợi ý lấy dữ liệu từ danh mục, không phải chữ do model tự nghĩ."
- Chứng minh: chat nhiều lượt, câu trả lời live qua OpenRouter, thẻ có nguồn từ catalog.

Nếu nhãn là `AI`: nói "Câu trả lời này đang chạy qua OpenRouter." Nếu nhãn là `Danh mục`: nói "Provider không phản hồi, nên Mon đang dùng cách khớp danh mục có nhãn." Không được gọi chế độ khớp danh mục là AI live.

### 2:08 đến 2:22. Chi tiết ưu đãi

- Route: `/deal/[slug]`
- Viewport: 390x844
- Thao tác: mở từ thẻ gợi ý hoặc từ Pocket; cuộn qua `Điều kiện quan trọng`, `Nguồn và độ mới`, và dòng `Quan hệ đối tác`.
- Thuyết minh: "Trang chi tiết cho biết ai đủ điều kiện, nguồn chính thức, ngày kiểm tra, và việc StuDeal không phải đối tác của thương hiệu."
- Chứng minh: điều kiện, nguồn, ngày kiểm tra, không có quan hệ đối tác.

### 2:22 đến 2:32. Mở nguồn chính thức

- Route: `/deal/[slug]`, nút `Mở nguồn chính thức`
- Viewport: 390x844
- Thao tác: bấm nút; để tab mới mở trang thương hiệu vài giây; quay lại tab StuDeal.
- Thuyết minh: "Nút này mở trang chính thức của thương hiệu. Đây không phải giao dịch mua hay đổi ưu đãi."
- Chứng minh: route outbound hoạt động và điều hướng đúng nguồn, không phải trang thanh toán.

### 2:32 đến 2:46. Cài đặt

- Route: `/settings`
- Viewport: 390x844
- Thao tác: bấm `Tắt phân tích`, cho thấy trạng thái đã tắt; bấm `Xóa dữ liệu cục bộ`.
- Thuyết minh: "Trong Cài đặt, mình tắt phân tích ẩn danh và xóa dữ liệu cục bộ bất cứ lúc nào."
- Chứng minh: opt-out analytics và quyền xóa dữ liệu trình duyệt.

### 2:46 đến 3:00. Kết

- Route: `/`
- Viewport: 390x844
- Thao tác: về trang chủ, giữ nguyên phần chân trang có tên sản phẩm và mô tả giới hạn.
- Thuyết minh: "Đây là bản demo với ưu đãi đã kiểm tra ngày 14 tháng 11. Không có tổng tiền tiết kiệm, không có giao dịch, và không có quan hệ đối tác."
- Chứng minh: kết thúc trung thực về phạm vi.

## Lời thuyết minh không được nói

- Không nói "tiết kiệm được X đồng" hay bất kỳ tổng tiền nào.
- Không nói "mua", "thanh toán", "đặt vé thành công", "đổi ưu đãi thành công".
- Không nói "đối tác", "hợp tác", "được tài trợ", "được thương hiệu uỷ quyền".
- Không nói "chắc chắn đủ điều kiện". Chỉ nói nguồn ghi điều kiện gì.
- Không trình bày dữ liệu fixture như dữ liệu live.
- Không nói "người dùng thật", "tỷ lệ chuyển đổi", hay số liệu tăng trưởng.
- Không nói "đã qua vòng gating của Apero" hay "đã được duyệt".
- Không đọc tên thành viên chưa được xác nhận.

## Ghi chú hậu kỳ

- Chèn nhãn nhỏ ở góc khi cảnh dùng fixture: `Dữ liệu minh họa`.
- Chèn ngày `2026-11-14` ở cảnh chi tiết ưu đãi để khớp với ngày kiểm tra nguồn.
- Giữ con trỏ chuột lớn và chuyển động chậm. Cắt bỏ đoạn chờ mạng.
- Không tăng tốc đoạn Ask Mon đến mức không đọc được câu trả lời.
- Kiểm tra lại video trên một máy khác trước khi dán link vào README.
