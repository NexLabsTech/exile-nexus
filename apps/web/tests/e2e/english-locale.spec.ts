import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { URL } from "node:url";

const messages = JSON.parse(readFileSync(new URL("../../src/i18n/en.json", import.meta.url), "utf8"));
const routes = JSON.parse(readFileSync(new URL("../../src/data/routes.json", import.meta.url), "utf8"));

test("English headings and metadata remain stable across 11 static pages", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level:1 })).toContainText(messages.home.heroFirst);
  await expect(page.getByRole("navigation", { name:messages.common.mainNavigation })).toBeVisible();
  await expect(page.getByRole("link", { name:messages.common.openSearch })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content","noindex,nofollow");
  for (const route of routes) {
    await page.goto(route.href);
    await expect(page.getByRole("heading", { level:1 })).toHaveText(route.title);
    await expect(page.getByText(messages.section.emptyBody)).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang","en");
  }
});

test("English-first default is stable even with pt-BR browser settings", async ({ browser }) => {
  const context = await browser.newContext({ locale:"pt-BR", viewport:{ width:390, height:844 } });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang","en");
    const toggle = page.getByRole("button", { name:messages.common.openMenu });
    await toggle.click();
    await expect(page.getByRole("navigation", { name:messages.common.mobileNavigation })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await page.goto("/search/?q=imaginary%20inventory");
    await expect(page.getByRole("searchbox", { name:messages.search.label })).toHaveValue("imaginary inventory");
    await expect(page.getByRole("status")).toContainText("1 local result found.");
    await expect(page.getByText(messages.search.fictionalSource)).toBeVisible();
  } finally {
    await context.close();
  }
});

test("failure and empty search messages originate in English catalog with local-only UI", async ({ page }) => {
  await page.goto("/search/?q=nonexistent-local-example-999");
  await expect(page.getByRole("status")).toContainText(messages.search.noResults);
  await expect(page.getByRole("heading", { name:messages.search.emptyTitle })).toBeVisible();
  await page.goto(`/search/?q=${"x".repeat(81)}`);
  await expect(page.getByRole("alert")).toContainText(messages.search.queryTooLong);
  await expect(page.getByRole("button", { name:messages.search.clearQuery })).toBeVisible();
});

for (const viewport of [
  { name:"desktop", width:1440, height:900 },
  { name:"mobile", width:390, height:844 },
] as const) {
  test(`English catalog snapshots retain public UI at ${viewport.name}`, async ({ page }, info) => {
    await page.setViewportSize({ width:viewport.width, height:viewport.height });
    await page.emulateMedia({ reducedMotion:"reduce" });
    await page.goto("/");
    await expect(page.getByRole("heading", { level:1 })).toContainText(messages.home.heroFirst);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width+1);
    await page.screenshot({ path:info.outputPath(`english-home-${viewport.name}.png`), fullPage:true, animations:"disabled" });
    await page.goto("/ui-kit/");
    await expect(page.getByRole("heading", { name:messages.kitPage.heading })).toBeVisible();
    await page.screenshot({ path:info.outputPath(`english-ui-kit-${viewport.name}.png`), fullPage:true, animations:"disabled" });
  });
}
