import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test("home visual baseline", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Deal hay/ })).toBeVisible();
  await expect(page).toHaveScreenshot("home-mobile.png", { fullPage: true });
});

test("deck visual baseline", async ({ page }) => {
  await page.goto("/start");
  await page.getByRole("button", { name: /Phim ảnh/ }).click();
  await page.getByRole("button", { name: /Ăn uống/ }).click();
  await page.getByRole("button", { name: /Phần mềm/ }).click();
  await page.getByRole("button", { name: /Tiếp tục với 3 lĩnh vực/ }).click();
  await expect(page).toHaveURL(/\/deck/);
  await expect(page).toHaveScreenshot("deck-mobile.png", { fullPage: true });
});
