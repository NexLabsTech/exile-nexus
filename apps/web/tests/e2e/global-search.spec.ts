import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("global search is reachable from desktop header, labeled and noindex", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByRole("link", { name: "Open site search" }).click();
  await expect(page).toHaveURL(/\/search\/$/);
  await expect(page.getByRole("heading", { name: "Find your path" })).toBeVisible();
  await expect(page.getByRole("search")).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
  await expect(page.getByText(/No live game data, prices/)).toBeVisible();
});

test("query deep link and keyboard arrows lead to real local destination", async ({ page }) => {
  await page.goto("/search/?q=build");
  const input = page.getByRole("searchbox", { name: "Search local pages and fictional examples" });
  await expect(input).toHaveValue("build");
  const results = page.getByRole("list", { name: "Local search results" });
  await expect(results.getByRole("link", { name: /Build Hub/ })).toBeVisible();
  await input.focus();
  await page.keyboard.press("ArrowDown");
  await expect(results.getByRole("link", { name: /Build Hub/ })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/builds\/$/);
});

test("search form sets URL and makes fictional results unmistakable", async ({ page }) => {
  await page.goto("/search/");
  const input = page.getByRole("searchbox", { name: "Search local pages and fictional examples" });
  await input.fill("imaginary inventory");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page).toHaveURL(/\/search\/\?q=imaginary%20inventory$/);
  await expect(page.getByRole("link", { name: /Imaginary Inventory Entry/ })).toBeVisible();
  await expect(page.getByText("FICTIONAL EXAMPLE · NO REAL GAME DATA")).toBeVisible();
});

test("empty search state, keyboard Escape and clear recovery work", async ({ page }) => {
  await page.goto("/search/?q=unfindable-xxyyzz");
  const input = page.getByRole("searchbox", { name: "Search local pages and fictional examples" });
  await expect(page.getByRole("heading", { name: "Nothing in the local archive" })).toBeVisible();
  await input.focus();
  await page.keyboard.press("Escape");
  await expect(input).toHaveValue("");
  await expect(page).toHaveURL(/\/search\/$/);
  await expect(page.getByRole("heading", { name: "Explore the archives" })).toBeVisible();
});

test("overlong deep link fails closed without escaping or any API", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).hostname !== "127.0.0.1") requests.push(request.url());
  });
  await page.goto(`/search/?q=${"x".repeat(90)}`);
  await expect(page.getByRole("alert")).toContainText("80-character limit");
  await expect(page.getByRole("list", { name: "Local search results" })).toHaveCount(0);
  expect(requests).toEqual([]);
});

test("mobile navigation exposes functional search route", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation", { name: "Mobile primary navigation" }).getByRole("link", { name: /Search/ }).click();
  await expect(page).toHaveURL(/\/search\/$/);
  await expect(page.getByRole("heading", { name: "Find your path" })).toBeVisible();
});

test("axe audits local search with and without matching results", async ({ page }) => {
  await page.goto("/search/");
  const scan = async () => new AxeBuilder({ page }).include(".search-workspace")
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  const first = await scan();
  expect(first.violations, JSON.stringify(first.violations, null, 2)).toEqual([]);
  await page.getByRole("searchbox").fill("not-existing-record");
  const second = await scan();
  expect(second.violations, JSON.stringify(second.violations, null, 2)).toEqual([]);
});

for (const viewport of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
] as const) {
  test(`local search layout and evidence at ${viewport.name}`, async ({ page }, info) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/search/?q=sample");
    await expect(page.getByRole("searchbox")).toHaveValue("sample");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width + 1);
    await page.screenshot({ path: info.outputPath(`search-${viewport.name}.png`), fullPage: true, animations:"disabled" });
    await expect(page.getByRole("list", { name: "Local search results" })).toBeVisible();
  });
}
