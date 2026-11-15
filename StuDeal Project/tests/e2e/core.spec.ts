import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test("guest can complete the core journey", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Deal hay/ })).toBeVisible();
  await page.getByRole("link", { name: /Bắt đầu chọn ưu đãi/ }).click();
  await expect(page).toHaveURL(/\/start/);
  await page.getByRole("button", { name: /Phim ảnh/ }).click();
  await page.getByRole("button", { name: /Ăn uống/ }).click();
  await page.getByRole("button", { name: /Phần mềm/ }).click();
  await page.getByRole("button", { name: /Tiếp tục với 3 lĩnh vực/ }).click();
  await expect(page).toHaveURL(/\/deck/);
  await page.getByRole("button", { name: "Lưu vào Pocket" }).click();
  await page.getByRole("link", { name: "Mở Pocket" }).click();
  await expect(page.getByRole("heading", { name: "Pocket" })).toBeVisible();
  await expect(page.getByText(/Bạn đã lưu 1 ưu đãi/)).toBeVisible();
});

test("skip path reaches the deck without selecting categories", async ({ page }) => {
  await page.goto("/start");
  await page.getByRole("button", { name: /Bỏ qua, xem tất cả/ }).click();
  await expect(page).toHaveURL(/\/deck/);
  await expect(page.getByRole("heading", { name: /ưu đãi/ }).first()).toBeVisible();
});

test("ask mon is reachable from the home page and the top navigation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Hỏi Mon/ }).click();
  await expect(page).toHaveURL(/\/ask-mon/);
  await expect(page.getByRole("heading", { name: "Hỏi Mon" })).toBeVisible();

  await page.goto("/discover");
  await page.getByRole("link", { name: "Ask Mon", exact: true }).first().click();
  await expect(page).toHaveURL(/\/ask-mon/);
});

test("every primary route is reachable from the top navigation", async ({ page }) => {
  await page.goto("/");
  for (const [name, pattern] of [
    ["Khám phá", /\/discover/],
    ["Ask Mon", /\/ask-mon/],
    ["Bộ ưu đãi", /\/deck/],
    ["Pocket", /\/pocket/]
  ] as const) {
    await page.getByRole("link", { name, exact: true }).first().click();
    await expect(page).toHaveURL(pattern);
  }
});

test("discover search and category filter work", async ({ page }) => {
  await page.goto("/discover");
  await page.getByLabel("Tìm ưu đãi").fill("highlands");
  await page.getByRole("button", { name: "Tìm ưu đãi" }).click();
  await expect(page.getByText("Highlands Coffee / HighlandsĐI").first()).toBeVisible();
  await expect(page.getByText(/^\d+ ưu đãi đang hiện hành$/)).toBeVisible();
});

test("discover exposes every catalog category", async ({ page }) => {
  await page.goto("/discover");
  for (const label of ["Phim ảnh", "Ăn uống", "Phần mềm", "Học tập", "Mua sắm", "Di chuyển"]) {
    await expect(page.getByRole("button", { name: label, exact: true })).toBeVisible();
  }
});

test("ask mon uses catalog matching when no provider is configured", async ({ page }) => {
  await page.goto("/ask-mon");
  await page.getByRole("button", { name: "Tìm vé phim cho sinh viên" }).click();
  await expect(page.getByText("Danh mục", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("PHIM ẢNH").first()).toBeVisible();
});

test("ask mon exposes a model selector", async ({ page }) => {
  await page.goto("/ask-mon");
  await expect(page.getByLabel("Mô hình AI")).toBeVisible();
});

test("deal detail shows the brand logo and the source stamp", async ({ page }) => {
  await page.goto("/deal/cgv-student-ticket");
  await expect(page.getByRole("heading", { name: "CGV Cinemas Vietnam" })).toBeVisible();
  await expect(page.getByRole("img", { name: /Logo CGV Cinemas/ })).toBeVisible();
  await expect(page.getByText(/Ngày kiểm tra nguồn/)).toBeVisible();
  await expect(page.getByText(/Không có quan hệ đối tác/)).toBeVisible();
});

test("outbound route validates the surface and redirects with 303", async ({ page }) => {
  const invalid = await page.request.post("/api/deals/00000000-0000-4000-8000-000000000001/outbound", {
    form: { source_surface: "unknown" },
    maxRedirects: 0
  });
  expect(invalid.status()).toBe(400);

  const valid = await page.request.post("/api/deals/00000000-0000-4000-8000-000000000001/outbound", {
    form: { source_surface: "detail" },
    maxRedirects: 0
  });
  expect(valid.status()).toBe(303);
  expect(valid.headers().location).toBe("https://www.galaxycine.vn/u22/");
});

test("ask mon rejects a model that is not allowlisted", async ({ page }) => {
  const response = await page.request.post("/api/ask-mon", {
    data: { query: "vé phim", model: "evil/model" }
  });
  expect(response.status()).toBe(400);
});

test("the cron recheck route refuses unauthenticated calls", async ({ page }) => {
  const response = await page.request.get("/api/cron/recheck-sources");
  expect(response.status()).toBe(401);
});
