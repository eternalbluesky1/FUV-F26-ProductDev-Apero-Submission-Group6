# Quy trình xây dựng AI-native

Tài liệu này ghi lại cách StuDeal thực sự được xây dựng, không phải một bài luận chung về AI. Mỗi mục nêu việc đã làm, lý do, và nơi có thể kiểm tra. Ngày ghi: 2026-11-14. Kết quả kiểm thử được chép trong `docs/IMPLEMENTATION-STATUS.md`; tài liệu này không chạy lại toàn bộ bộ kiểm thử.

## 1. Tóm tắt

Phần lớn công việc build được ghi nhận trong ngày 14 tháng 11 năm 2026, do một coding agent (OpenCode) và người điều khiển phiên làm việc thực hiện, cùng các subagent chạy nền cho những phần giao diện độc lập, một agent nghiên cứu web, và một script đo khả năng gọi công cụ của các model. Sản phẩm là Next.js App Router, có catalog ưu đãi kèm nguồn và ngày kiểm tra, Supabase cho catalog và log lượt nhấp, PostHog cho sản phẩm, OpenRouter cho Ask Mon, và Vercel cho hosting.

Điểm đáng nói: phần lớn quyết định dưới đây xuất phát từ một lỗi hoặc một ràng buộc đã quan sát được, không phải từ sở thích thiết kế.

## 2. Công cụ đã dùng

| Công cụ hoặc cơ chế | Dùng cho | Bằng chứng trong repo |
|---|---|---|
| OpenCode coding agent | Đọc repo, lập kế hoạch, viết và sửa code, refactor, chạy kiểm tra | `package.json`, `docs/IMPLEMENTATION-STATUS.md`, `git log --oneline` |
| Subagent chạy nền | Sáu workstream giao diện độc lập | Kết quả nằm trong `app/`, `components/`, `public/brand/`; repo không lưu transcript đầy đủ của từng phiên |
| Agent nghiên cứu web (Exa) | Tìm trang ưu đãi chính thức đang hiện hành | `assets/verified-offer-snapshot.csv`, danh sách nguồn ở PRD trang 41, `docs/ASSET-SOURCES.md` |
| Script đo model | Đo tool-calling, độ trễ và chất lượng gợi ý của các model OpenRouter | `tests/unit/model-probe.test.ts`, `lib/ask-mon-models.ts` |
| Vitest, Playwright, axe | Kiểm thử đơn vị, hành trình, accessibility, visual regression | `vitest.config.ts`, `playwright.config.ts`, `tests/` |

### 2.1 OpenCode coding agent

Agent đọc `guide.md`, PRD, ba PDF ghi chú, asset archive và code hiện có trước khi sửa. Nó giữ một ledger bằng chứng trong `docs/IMPLEMENTATION-STATUS.md`, cập nhật sau mỗi mốc, và không đánh dấu PASS khi chưa chạy lệnh. Các commit trong `git log` cho thấy thứ tự: wiki và scaffold, dựng journey với fixture, thêm schema Supabase và test, ghi nhận deploy và analytics, sửa cấu hình seed.

### 2.2 Subagent chạy nền

Các phần giao diện được tách thành workstream độc lập để chạy song song: home và header, offer card và brand asset, discover và summary, swipe deck, Ask Mon, analytics. Mỗi workstream nhận một phạm vi file riêng để tránh ghi đè. Cách này hợp lý vì các bề mặt đó ít phụ thuộc lẫn nhau và đều cần đọc cùng một bộ design token.

Giới hạn: repo không có bản ghi hội thoại của từng subagent. Bằng chứng còn lại là file đã thay đổi và kết quả kiểm thử, không phải một bản log đầy đủ.

### 2.3 Agent nghiên cứu web

Agent dùng Exa để tìm kiếm và mở trang, nhằm xác định trang ưu đãi chính thức thay vì dựa vào bài tổng hợp hoặc trí nhớ của model. Kết quả được dùng cho snapshot ưu đãi và cho danh sách nguồn chính thức. Ngày kiểm tra nguồn của catalog hiện tại là `2026-11-14`; snapshot CSV ban đầu ghi `2026-11-13`.

Điều agent không làm: không tự động crawl toàn web, không tự publish một ưu đãi, và không thay người kiểm tra nguồn.

### 2.4 Script đo model

`tests/unit/model-probe.test.ts` chạy cùng hai câu hỏi tiếng Việt trên sáu model, hai lần mỗi câu, và in ra `mode`, thời gian, số gợi ý, thương hiệu, và phần đầu câu trả lời. Danh sách thử gồm năm model miễn phí và `google/gemini-2.5-flash`. Script có timeout 600 giây và gọi provider thật, nên không nằm trong CI.

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
| Một model miễn phí trả lời câu hỏi phim bằng một ưu đãi không có trong catalog | Không thể tin tool-calling của model miễn phí | Đo bằng script probe thay vì giả định; chọn `google/gemini-2.5-flash` cho route live |
| Clearbit Logo API không truy cập được | Không lấy logo qua Clearbit | Dùng Wikimedia Commons và Simple Icons |
| Trang CGV và Highlands không truy cập được từ mạng build | Không lấy logo từ site thương hiệu | Dùng Wikimedia Commons, ghi rõ nguồn và giấy phép |
| Pillow không cài | Không tạo được `.ico` | Dùng `app/icon.png` và `app/apple-icon.png` của App Router |
| Asset archive thiếu `studeal-theme.css` và `SEED-IMPORT.md` | Không có theme/seed import có sẵn | Dựng CSS từ `assets/design-tokens.json`; seed từ CSV và dữ liệu đã kiểm tra |
| Trang cuối PRD chứa thông tin riêng tư | Không thể đưa vào bản trích xuất hay commit | Bỏ toàn bộ trang cuối khỏi mọi lần đọc PRD; không chép vào wiki, README hay tài liệu |

Về model miễn phí: kết quả probe không được lưu thành file log trong repo. Bằng chứng còn lại là script, danh sách model, và việc route live dùng Gemini. Không nên đọc mục này như một đánh giá xếp hạng model.

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

Trạng thái ghi ngày 2026-11-14: lint, typecheck, 46 unit test, build 15 route, 8 E2E, 8 lượt quét accessibility, và 4 baseline visual đều PASS. Tài liệu này không chạy lại các lệnh đó.

### 5.3 Chạy lại probe model

```bash
cd "StuDeal Project"
pnpm vitest run tests/unit/model-probe.test.ts
```

Lệnh này gọi OpenRouter thật, cần `OPENROUTER_API_KEY` trong `.env.local`, và có thể tiêu quota. Không chạy trong CI.

### 5.4 Bản đồ bằng chứng

| Câu hỏi của người đánh giá | Xem ở đâu |
|---|---|
| Mốc nào đã xong, mốc nào bị chặn | `docs/IMPLEMENTATION-STATUS.md` |
| Sự kiện analytics nào có thật | `TRACKING-PLAN.md` |
| Logo lấy từ đâu, giấy phép gì | `docs/ASSET-SOURCES.md` |
| Cách đo model | `tests/unit/model-probe.test.ts` |
| Viewport và dev indicator | `playwright.config.ts`, `tests/visual/core.spec.ts`, `next.config.ts` |
| Catalog và schema | `lib/catalog-data.ts`, `supabase/migrations/`, `supabase/seeds/seed.sql` |
| Lịch sử thay đổi | `git log --oneline` |

### 5.5 Ranh giới của bằng chứng

Người đánh giá có thể kiểm tra code, test, cấu hình, catalog và lịch sử commit. Người đánh giá không thể tái tạo từ repo: transcript của từng subagent, một buổi nghiên cứu người dùng, một buổi review gate của Apero, video demo, hay biên nhận nộp Canvas. Những mục đó phải được ghi là TBD hoặc NOT RUN cho đến khi có artefact thật.

## 6. Những gì tài liệu này không tuyên bố

- Không có nghiên cứu người dùng hoàn chỉnh, không có phỏng vấn sinh viên, không có số liệu người dùng thật.
- Không có bằng chứng đã qua vòng gating của Apero.
- Không có video demo và không có biên nhận nộp Canvas.
- Không có tên hay phân công thành viên, vì dữ liệu đó chưa được cung cấp.
- Không có quan hệ đối tác, hoa hồng, hay giao dịch mua trong bất kỳ phần nào ở trên.
