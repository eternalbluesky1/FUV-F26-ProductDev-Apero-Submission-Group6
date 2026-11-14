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

test("discover search and category filter work", async ({ page }) => {
  await page.goto("/discover");
  await page.getByLabel("Tìm ưu đãi").fill("highlands");
  await page.getByRole("button", { name: "Tìm ưu đãi" }).click();
  await expect(page.getByText("Highlands Coffee / HighlandsĐI")).toBeVisible();
  await expect(page.getByText(/1 ưu đãi/)).toBeVisible();
});

test("ask mon falls back to catalog matching when no provider is configured", async ({ page }) => {
  await page.goto("/ask-mon");
  await page.getByRole("button", { name: "Tìm vé phim cho sinh viên" }).click();
  await expect(page.getByText("Đối chiếu danh mục").first()).toBeVisible();
  await expect(page.getByText("Galaxy Cinema").first()).toBeVisible();
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
