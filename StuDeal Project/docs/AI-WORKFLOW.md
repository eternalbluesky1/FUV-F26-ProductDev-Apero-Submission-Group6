# Quy trình xây dựng AI-native

Tài liệu này ghi lại cách StuDeal thực sự được xây dựng, không phải một bài luận chung về AI. Mỗi mục nêu việc đã làm, lý do, và nơi có thể kiểm tra. Ngày ghi: 2026-11-15. Kết quả kiểm thử được chép trong `docs/IMPLEMENTATION-STATUS.md`; tài liệu này không chạy lại toàn bộ bộ kiểm thử.

## 1. Tóm tắt

Công việc chia thành năm giai đoạn, theo đúng thứ tự đã xảy ra:

1. **Họp nhóm.** Năm thành viên họp trước để chốt cấu trúc thô: vấn đề, nhóm sinh viên mục tiêu, vòng lặp lướt và lưu ưu đãi, các màn hình sẽ có, và những gì cắt bỏ. Không có nội dung nào được tạo trước cuộc họp này.
2. **PRD và asset ban đầu, dùng GPT-6 Luna ở mức reasoning `max`.** Nhóm dùng ChatGPT với GPT-6 Luna để soạn PRD từ kết quả cuộc họp: phát biểu vấn đề, nhóm người dùng beachhead, danh sách tính năng, copy cho thẻ ưu đãi, các trạng thái rỗng và lỗi, và mô tả cho các hình tham chiếu đầu tiên. Đây là model soạn thảo khối lượng lớn, phù hợp với một tài liệu dài nhiều mục nhỏ. Sau đó nhóm sửa tay, cắt những tính năng không có bằng chứng, và đối chiếu hình tham chiếu với asset archive được cung cấp.
3. **Proofing, dùng GPT-6.1 Terra ở mức reasoning `max`.** Lượt thứ hai dùng GPT-6.1 Terra, chọn vì khả năng đọc tài liệu và hình ảnh, để đối chiếu PRD với đề bài và ba PDF ghi chú. Nó chỉ ra tuyên bố thiếu căn cứ, mâu thuẫn giữa các mục, trạng thái còn thiếu, và chỗ spec hứa hành vi mà nhóm chưa quyết định làm. Kết quả là danh sách sửa lỗi, không phải phạm vi mới. Nhóm áp dụng rồi đóng băng spec.
4. **Phát triển.** Chỉ sau khi spec đóng băng mới bắt đầu code, theo từng slice dọc: hành trình khách, catalog và tìm kiếm, tích hợp Supabase, route Ask Mon, rồi test và deploy. Mỗi slice kết thúc bằng kết quả lệnh, không phải bằng lời khẳng định.
5. **Knowledge base vận hành.** `../llm-wiki/` giữ nguồn đã ingest, index, sổ nguồn và log chỉ ghi thêm. Mỗi phiên bắt đầu bằng việc đọc nó và mỗi mốc kết thúc bằng việc ghi vào đó kèm lệnh đã chứng minh tuyên bố.

Phần lớn công việc build được ghi nhận trong ngày 14 và 15 tháng 11 năm 2026, do một coding agent (OpenCode) và người điều khiển phiên làm việc thực hiện, cùng các subagent chạy nền cho những phần giao diện độc lập, một agent nghiên cứu web, và một script đo khả năng gọi công cụ của các model. Sản phẩm là Next.js App Router, có catalog ưu đãi kèm nguồn và ngày kiểm tra, Supabase cho catalog và log lượt nhấp, PostHog cho sản phẩm, OpenRouter cho Ask Mon, và Vercel cho hosting.

Điểm đáng nói: phần lớn quyết định dưới đây xuất phát từ một lỗi hoặc một ràng buộc đã quan sát được, không phải từ sở thích thiết kế.

## 2. Công cụ đã dùng

| Công cụ hoặc cơ chế | Dùng cho | Bằng chứng trong repo |
|---|---|---|
| Họp nhóm | Chốt cấu trúc thô trước khi tạo bất kỳ nội dung nào | Phần 1, bước 1; `../llm-wiki/log.md` |
| GPT-6 Luna (`max`) trong ChatGPT | Soạn PRD, copy thẻ ưu đãi, trạng thái rỗng và lỗi, mô tả hình tham chiếu | Phần 1, bước 2; PRD và `assets/` |
| GPT-6.1 Terra (`max`) trong ChatGPT | Proofing PRD: tuyên bố thiếu căn cứ, mâu thuẫn, trạng thái thiếu | Phần 1, bước 3 |
| OpenCode coding agent | Đọc repo, lập kế hoạch, viết và sửa code, refactor, chạy kiểm tra | `package.json`, `docs/IMPLEMENTATION-STATUS.md`, `git log --oneline` |
| Subagent chạy nền | Sáu workstream giao diện độc lập | Kết quả nằm trong `app/`, `components/`, `public/brand/`; repo không lưu transcript đầy đủ của từng phiên |
| Agent nghiên cứu web (Exa) | Tìm trang ưu đãi chính thức đang hiện hành | `assets/verified-offer-snapshot.csv`, danh sách nguồn ở PRD trang 41, `docs/ASSET-SOURCES.md` |
| Script đo model | Đo tool-calling, độ trễ và chất lượng gợi ý của các model OpenRouter | Script đã chạy một lần rồi xoá khỏi repo để CI không gọi provider thật; allowlist ở `lib/ask-mon-models.ts` |
| Vitest, Playwright, axe | Kiểm thử đơn vị, hành trình, accessibility, visual regression | `vitest.config.ts`, `playwright.config.ts`, `tests/` |

### 2.0 Giai đoạn PRD và proofing

**Cuộc họp.** Nhóm chốt cấu trúc thô trước: vấn đề, nhóm sinh viên mục tiêu, vòng lặp lướt rồi lưu, danh sách màn hình, và ranh giới cắt bỏ. Quyết định ở bước này là của nhóm, không phải của model.

**GPT-6 Luna ở mức `max`.** Dùng để soạn PRD và nội dung đi kèm: phát biểu vấn đề, chân dung người dùng, danh sách tính năng MVP, luồng người dùng, phần monetization, copy tiếng Việt cho thẻ ưu đãi, các trạng thái rỗng và lỗi, và mô tả cho hình tham chiếu đầu tiên. Luna là model soạn thảo khối lượng lớn, phù hợp với một tài liệu dài gồm nhiều mục nhỏ; nhóm chọn nó vì tốc độ và chi phí, không phải vì nó giỏi nhất.

Sau lượt này, nhóm sửa tay: cắt những tính năng không có bằng chứng, bỏ hứa hẹn về "tiết kiệm tiền" khi chưa có số liệu, và đối chiếu hình tham chiếu với asset archive được cung cấp. Asset archive vẫn là nguồn của mascot và design token dùng trong bản build.

**GPT-6.1 Terra ở mức `max`.** Lượt proofing chạy PRD ngược lại với đề bài Apero và ba PDF ghi chú. Terra được chọn vì khả năng đọc tài liệu dài kèm hình ảnh và vì nó xử lý được việc đối chiếu chéo. Nó chỉ ra bốn loại lỗi: tuyên bố thiếu căn cứ, mâu thuẫn giữa các mục, trạng thái còn thiếu, và chỗ spec hứa hành vi mà nhóm chưa quyết định làm.

Kết quả là một danh sách sửa lỗi, không phải phạm vi mới. Nhóm áp dụng, rồi đóng băng spec trước khi viết code. Đây là lý do các tính năng như tài khoản, đồng bộ đa thiết bị và điểm thưởng không có trong bản build: chúng bị cắt ở bước proofing, có ghi lại trong `../llm-wiki/wiki/requirements.md`, chứ không phải bị bỏ dở giữa chừng.

### 2.1 OpenCode coding agent

Agent đọc `guide.md`, PRD, ba PDF ghi chú, asset archive và code hiện có trước khi sửa. Nó giữ một ledger bằng chứng trong `docs/IMPLEMENTATION-STATUS.md`, cập nhật sau mỗi mốc, và không đánh dấu PASS khi chưa chạy lệnh. Các commit trong `git log` cho thấy thứ tự: wiki và scaffold, dựng journey với fixture, thêm schema Supabase và test, ghi nhận deploy và analytics, sửa cấu hình seed.

### 2.2 Subagent chạy nền

Các phần giao diện được tách thành workstream độc lập để chạy song song: home và header, offer card và brand asset, discover và summary, swipe deck, Ask Mon, analytics. Mỗi workstream nhận một phạm vi file riêng để tránh ghi đè. Cách này hợp lý vì các bề mặt đó ít phụ thuộc lẫn nhau và đều cần đọc cùng một bộ design token.

Giới hạn: repo không có bản ghi hội thoại của từng subagent. Bằng chứng còn lại là file đã thay đổi và kết quả kiểm thử, không phải một bản log đầy đủ.

### 2.3 Agent nghiên cứu web

Agent dùng Exa để tìm kiếm và mở trang, nhằm xác định trang ưu đãi chính thức thay vì dựa vào bài tổng hợp hoặc trí nhớ của model. Kết quả được dùng cho snapshot ưu đãi và cho danh sách nguồn chính thức. Ngày kiểm tra nguồn của catalog hiện tại là `2026-11-14`; snapshot CSV ban đầu ghi `2026-11-13`.

Điều agent không làm: không tự động crawl toàn web, không tự publish một ưu đãi, và không thay người kiểm tra nguồn.

### 2.4 Script đo model

Script probe chạy cùng hai câu hỏi tiếng Việt trên nhiều model, hai lần mỗi câu, và in ra `mode`, thời gian, số gợi ý, thương hiệu, và phần đầu câu trả lời. Danh sách thử gồm các model miễn phí và `google/gemini-2.5-flash` để so sánh. Script có timeout 600 giây và gọi provider thật, nên không nằm trong CI; file test đã được xoá khỏi repo sau khi đo.

Kết luận từ lần đo: một model miễn phí từng trả về một ưu đãi không có trong catalog ở lần gọi thô, nên route live chỉ nhận model trong allowlist và luôn lọc gợi ý theo catalog trước khi trả về. Model mặc định hiện tại là `baidu/ernie-5.5-flash-preview:free`; `Ling 3.2 Flash` và `Nemotron 3.5 Super VL` là lựa chọn thay thế. Không nên đọc mục này như một bảng xếp hạng model.

Mục đích không phải chọn model mạnh nhất trên giấy, mà kiểm tra model nào thực sự gọi được công cụ `search_deals` và trả về ID có trong catalog.

## 3. Quyết định kỹ thuật và bằng chứng

### 3.1 Ask Mon giữ fallback có nhãn

Vấn đề: một câu chào bằng plain text từ provider bị code cũ coi là lỗi provider, nên giao diện hiện fallback dù model đã trả lời bình thường.

Cách sửa: chỉ dùng `fallback` khi provider thật sự lỗi hoặc trả output không dùng được. Một câu trả lời text hợp lệ, không có tool call, vẫn là `mode=ai` với 0 gợi ý.

Bằng chứng: `docs/IMPLEMENTATION-STATUS.md` ghi `hello` trả `mode=ai`, câu hỏi phim trả `mode=ai` với 3 gợi ý; `llm-wiki/log.md` ghi cùng kết quả. Fallback vẫn tồn tại vì provider có thể timeout, hết hạn mức, hoặc trả JSON sai.

### 3.2 Khóa Supabase không hợp lệ và production ở fixture mode

Hai lỗi độc lập, cùng che mất việc ghi lượt nhấp.

Thứ nhất, `SUPABASE_SECRET_KEY` trong môi trường không hợp lệ. Lệnh ghi server-side thất bại với `Invalid API key`, nhưng lỗi không chặn giao diện nên trông như đã ghi.

Thứ hai, Vercel production vẫn đặt `NEXT_PUBLIC_STUDEAL_DATA_MODE=fixture`, nên ứng dụng chạy bằng catalog tĩnh và không hề gọi Supabase. Vì vậy không có lượt nhấp nào được ghi.

Cách sửa: thay khóa ở local và trên Vercel, đổi production sang `supabase`, deploy lại, rồi gửi một POST outbound thật. Kết quả: 303 và đúng một dòng `deal_clicks`; dòng kiểm tra đã bị xóa sau đó.

Bằng chứng: `docs/IMPLEMENTATION-STATUS.md` mục Environment và dòng Supabase click logging; `llm-wiki/log.md` mục `verify | service audit and production mode`.

### 3.3 Phân tích bật mặc định, có opt-out

`guide.md` ban đầu yêu cầu consent gate trước PostHog. Ngày 2026-11-14, người viết PRD và là product owner chỉ đạo bật analytics mặc định. Banner consent cố định bị bỏ; Settings có nút `Tắt phân tích`; trang Privacy mô tả hành vi mới.

Đây là thay đổi có chủ đích, không phải bỏ sót. `TRACKING-PLAN.md` ghi rõ quyết định này thay thế yêu cầu cũ trong `guide.md`.

Bằng chứng: `TRACKING-PLAN.md` mục Analytics choice; `docs/IMPLEMENTATION-STATUS.md` mục Analytics decision; một lượt truy cập production tạo `landing_viewed` mà không có `$opt_in`.

### 3.4 Logo thương hiệu tải về và cache cục bộ

Logo được tải một lần, lưu trong `public/brand/logos/`, và phục vụ từ chính ứng dụng. Không hotlink tại runtime.

Lý do: giảm phụ thuộc mạng bên thứ ba, tránh logo vỡ khi trang thương hiệu đổi CDN, và giữ một chỗ ghi credit/giấy phép. `docs/ASSET-SOURCES.md` ghi nguồn, giấy phép và ngày tải cho từng file. Khi thiếu asset, `BrandMark` hiển thị monogram chứ không vẽ lại logo.

### 3.5 Visual regression cần hai viewport và tắt dev indicator

`playwright.config.ts` khai báo hai project: `mobile-chrome` dùng Pixel 7 và `desktop-chrome` dùng Desktop Chrome. `tests/visual/core.spec.ts` đặt lại kích thước chính xác `390x844` cho mobile và `1280x900` cho desktop trước khi chụp.

Lý do: nếu chỉ dùng viewport mặc định của Playwright, baseline mobile và desktop chồng nhau và không phản ánh bố cục thật.

`next.config.ts` đặt `devIndicators: false`. Lý do: indicator của Next dev xuất hiện trong ảnh chụp và làm baseline nhiễu. Đây là cấu hình phục vụ kiểm thử, không phải thay đổi giao diện sản phẩm.

## 4. Những gì không chạy hoặc bị loại

| Vấn đề | Hệ quả | Cách xử lý |
|---|---|---|
| Docker không có | Không chạy được Supabase local và pgTAP | Dùng Supabase hosted làm đường chính; ghi BLOCKED cho local stack |
| Một model miễn phí trả lời câu hỏi phim bằng một ưu đãi không có trong catalog | Không thể tin tool-calling của model miễn phí | Đo bằng script probe thay vì giả định; giới hạn model bằng allowlist và chọn `baidu/ernie-5.5-flash-preview:free` cho route live |
| Clearbit Logo API không truy cập được | Không lấy logo qua Clearbit | Dùng Wikimedia Commons và Simple Icons |
| Trang CGV và Highlands không truy cập được từ mạng build | Không lấy logo từ site thương hiệu | Dùng Wikimedia Commons, ghi rõ nguồn và giấy phép |
| Pillow không cài | Không tạo được `.ico` | Dùng `app/icon.png` và `app/apple-icon.png` của App Router |
| Asset archive thiếu `studeal-theme.css` và `SEED-IMPORT.md` | Không có theme/seed import có sẵn | Dựng CSS từ `assets/design-tokens.json`; seed từ CSV và dữ liệu đã kiểm tra |
| Trang cuối PRD chứa thông tin riêng tư | Không thể đưa vào bản trích xuất hay commit | Bỏ toàn bộ trang cuối khỏi mọi lần đọc PRD; không chép vào wiki, README hay tài liệu |

Về model miễn phí: kết quả probe không được lưu thành file log trong repo. Bằng chứng còn lại là allowlist model, kết quả route live trong `docs/IMPLEMENTATION-STATUS.md`, và quy tắc lọc gợi ý theo catalog trong `lib/ask-mon.ts`.

## 5. Cách tái lập và những gì người đánh giá có thể kiểm tra

### 5.1 Chạy ứng dụng

```bash
cd "StuDeal Project"
pnpm install
pnpm dev
```

Mở `http://localhost:3000`. Local mặc định là `fixture`. Muốn dùng Supabase, đặt `NEXT_PUBLIC_STUDEAL_DATA_MODE=supabase` và cấu hình các biến trong `.env.example`; không dùng giá trị thật trong repo.

Bản hosted: https://fuv-f26-productdev-apero-submission.vercel.app

### 5.2 Chạy kiểm tra

```bash
cd "StuDeal Project"
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm build
pnpm test:e2e
pnpm test:a11y
pnpm test:visual
```

Trạng thái ghi ngày 2026-11-15: lint, typecheck, 65 unit test, build 16 route, 24 E2E, 16 lượt quét accessibility, và 8 baseline visual đều PASS. Tài liệu này không chạy lại các lệnh đó.

### 5.3 Probe model

Script probe đã chạy một lần trên máy local với `OPENROUTER_API_KEY` trong `.env.local` và đã bị xoá khỏi repo để CI không gọi provider thật. Không có lệnh tái lập nào được giữ lại; bằng chứng là allowlist, kết quả route live và lịch sử quyết định ở mục 4.

### 5.4 Bản đồ bằng chứng

| Câu hỏi của người đánh giá | Xem ở đâu |
|---|---|
| Mốc nào đã xong, mốc nào bị chặn | `docs/IMPLEMENTATION-STATUS.md` |
| Sự kiện analytics nào có thật | `TRACKING-PLAN.md` |
| Logo lấy từ đâu, giấy phép gì | `docs/ASSET-SOURCES.md` |
| Cách chọn model | `lib/ask-mon-models.ts`, mục 4 của tài liệu này |
| Viewport và dev indicator | `playwright.config.ts`, `tests/visual/core.spec.ts`, `next.config.ts` |
| Catalog và schema | `lib/catalog-data.ts`, `supabase/migrations/`, `supabase/seeds/seed.sql` |
| Lịch sử thay đổi | `git log --oneline` |

### 5.5 Ranh giới của bằng chứng

Người đánh giá có thể kiểm tra code, test, cấu hình, catalog và lịch sử commit. Người đánh giá không thể tái tạo từ repo: transcript của từng subagent, một buổi nghiên cứu người dùng, một buổi review gate của Apero, video demo, hay biên nhận nộp Canvas. Những mục đó phải được ghi là TBD hoặc NOT RUN cho đến khi có artefact thật.

## 6. Những gì tài liệu này không tuyên bố

- Không có nghiên cứu người dùng hoàn chỉnh, không có phỏng vấn sinh viên, không có số liệu người dùng thật.
- Không có bằng chứng đã qua vòng gating của Apero.
- Không có video demo và không có biên nhận nộp Canvas.
- Tên và phân công thành viên nằm trong `README.md`; tài liệu này không đánh giá mức đóng góp của từng người.
- Không có quan hệ đối tác, hoa hồng, hay giao dịch mua trong bất kỳ phần nào ở trên.
