import { expect, test, type Page } from "@playwright/test";

async function useProjectViewport(page: Page, projectName: string) {
  if (projectName === "desktop-chrome") {
    await page.setViewportSize({ width: 1280, height: 900 });
  } else {
    await page.setViewportSize({ width: 390, height: 844 });
  }
}

function shotOptions(projectName: string) {
  return { fullPage: projectName === "desktop-chrome" };
}

test("home visual baseline", async ({ page }, testInfo) => {
  await useProjectViewport(page, testInfo.project.name);
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Deal hay/ })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot("home.png", shotOptions(testInfo.project.name));
});

test("deck visual baseline", async ({ page }, testInfo) => {
  await useProjectViewport(page, testInfo.project.name);
  await page.goto("/start");
  await page.getByRole("button", { name: /Phim ảnh/ }).click();
  await page.getByRole("button", { name: /Ăn uống/ }).click();
  await page.getByRole("button", { name: /Phần mềm/ }).click();
  await page.getByRole("button", { name: /Tiếp tục với 3 lĩnh vực/ }).click();
  await expect(page).toHaveURL(/\/deck/);
  await expect(page.getByRole("heading", { name: "Lướt ưu đãi" })).toBeVisible();
  await expect(page.getByText("Thẻ 1 / 10")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot("deck.png", shotOptions(testInfo.project.name));
});

test("discover visual baseline", async ({ page }, testInfo) => {
  await useProjectViewport(page, testInfo.project.name);
  await page.goto("/discover");
  await expect(page.getByRole("heading", { name: "Khám phá ưu đãi" })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot("discover.png", shotOptions(testInfo.project.name));
});

test("ask mon visual baseline", async ({ page }, testInfo) => {
  await useProjectViewport(page, testInfo.project.name);
  await page.goto("/ask-mon");
  await expect(page.getByRole("heading", { name: "Hỏi Mon" })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot("ask-mon.png", shotOptions(testInfo.project.name));
});
