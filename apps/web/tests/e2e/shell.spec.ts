import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const screenSizes = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
] as const;

for (const viewport of screenSizes) {
  test(`home rendering at ${viewport.name}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("PLAN. BUILD.");
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.locator(".feature-card")).toHaveCount(6);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(viewport.width + 1);
    await page.screenshot({ path: testInfo.outputPath(`home-${viewport.name}.png`), fullPage: true });
  });

  test(`section deep link at ${viewport.name}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/builds/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Shape your next build");
    await expect(page.getByRole("status")).toContainText("No verified content is available");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width + 1);
    await page.screenshot({ path: testInfo.outputPath(`builds-${viewport.name}.png`), fullPage: true });
  });
}

test("desktop navigation uses stable deep links", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Items" }).click();
  await expect(page).toHaveURL(/\/items\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("A catalogue worth exploring");
  await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Items" })).toHaveAttribute("aria-current", "page");
});

test("mobile menu supports keyboard Escape and closes after navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const openMenu = page.getByRole("button", { name: "Open menu" });
  await expect(openMenu).toBeVisible();
  await openMenu.click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile primary navigation" });
  await expect(mobileNav).toBeVisible();
  await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(mobileNav).toBeHidden();
  await expect(openMenu).toBeFocused();
  await openMenu.click();
  await mobileNav.getByRole("link", { name: /Build Hub/ }).click();
  await expect(page).toHaveURL(/\/builds\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Shape your next build");
});

test("skip navigation reaches main landmark", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
});

test("unavailable route produces custom 404 with recovery", async ({ page }) => {
  await page.goto("/404.html");
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Return to Home/ })).toHaveAttribute("href", "/");
});

test("no off-domain assets or data calls on home page", async ({ page }) => {
  const urls: string[] = [];
  page.on("request", (request) => {
    if (/^https?:/.test(request.url()) && !new URL(request.url()).hostname.match(/^(127\.0\.0\.1|localhost)$/)) {
      urls.push(request.url());
    }
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(urls).toEqual([]);
});
