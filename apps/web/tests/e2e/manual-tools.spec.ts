
import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Farm Lab calculates a synthetic scenario, exports it, and restores it locally", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (["http:", "https:"].includes(url.protocol) && url.hostname !== "127.0.0.1") external.push(url.origin);
  });
  await page.goto("/farm/");
  const form = page.getByRole("form", { name: "Farm profitability" });
  await expect(form.getByText("Enter your values and calculate to see results.")).toBeVisible();
  await form.getByRole("button", { name: "Load synthetic example" }).click();
  await expect(form.getByText("Synthetic example. Values are invented for demonstration.")).toBeVisible();
  await form.getByRole("button", { name: "Calculate" }).focus();
  await page.keyboard.press("Enter");
  await expect(form.getByText("90 tokens", { exact: true })).toBeVisible();
  await expect(form.getByText("108 tokens/hour", { exact: true })).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await form.getByRole("button", { name: "Export scenario" }).click();
  const download = await downloadPromise;
  const path = await download.path();
  expect(path).toBeTruthy();
  await form.getByRole("button", { name: "Reset" }).click();
  await form.getByRole("button", { name: "Confirm reset" }).click();
  await expect(form.getByLabel("Cost per run")).toHaveValue("");
  await form.getByLabel("Import scenario").setInputFiles(path!);
  await expect(form.getByText("Synthetic example. Values are invented for demonstration.")).toBeVisible();
  await expect(form.getByLabel("Cost per run")).toHaveValue("10");
  expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze()).violations).toEqual([]);
  expect(await page.context().cookies()).toEqual([]);
  expect(external).toEqual([]);
});

test("Farm Lab rejects an incomplete or malformed scenario and keeps the editable input", async ({ page }) => {
  await page.goto("/farm/");
  const form = page.getByRole("form", { name: "Farm profitability" });
  await form.getByRole("button", { name: "Calculate" }).click();
  await expect(form.getByRole("alert")).toBeVisible();
  await form.getByRole("button", { name: "Load synthetic example" }).click();
  await form.getByLabel("Cost per run").fill("15");
  await form.getByLabel("Import scenario").setInputFiles({
    name: "invalid.json",
    mimeType: "application/json",
    buffer: Buffer.from('{"version":1,"__proto__":{"unexpected":true}}'),
  });
  await expect(form.getByRole("alert")).toBeVisible();
  await expect(form.getByLabel("Cost per run")).toHaveValue("15");
  await expect(form.getByText("Edited synthetic example.")).toBeVisible();
});

test("Build comparison ranks alternatives and marks the budget trade-off", async ({ page }) => {
  await page.goto("/builds/");
  const form = page.getByRole("form", { name: "Build upgrade comparison" });
  await form.getByLabel("Current estimated damage").fill("100");
  await form.getByLabel("Current survivability").fill("200");
  await form.getByLabel("Budget").fill("10");
  await form.getByLabel("Value unit").fill("tokens");
  const first = form.getByRole("group", { name: "Upgrade 1" });
  await first.getByLabel("Upgrade name").fill("Balanced");
  await first.getByLabel("Upgrade cost").fill("8");
  await first.getByLabel("Estimated damage after upgrade").fill("110");
  await first.getByLabel("Survivability after upgrade").fill("260");
  await form.getByRole("button", { name: "Add upgrade" }).click();
  const second = form.getByRole("group", { name: "Upgrade 2" });
  await second.getByLabel("Upgrade name").fill("Heavy hit");
  await second.getByLabel("Upgrade cost").fill("11");
  await second.getByLabel("Estimated damage after upgrade").fill("150");
  await second.getByLabel("Survivability after upgrade").fill("180");
  await form.getByRole("button", { name: "Calculate" }).click();
  const results = form.getByRole("list", { name: "Ranked upgrades" }).getByRole("listitem");
  await expect(results.first()).toContainText("Heavy hit");
  await expect(results.first()).toContainText("Over budget");
  await expect(results.nth(1)).toContainText("Within budget");
  await form.getByLabel("Rank upgrades by").selectOption("survival");
  await form.getByRole("button", { name: "Calculate" }).click();
  await expect(results.first()).toContainText("Balanced");
});

test("Build upgrade editing keeps keyboard focus in the active row", async ({ page }) => {
  await page.goto("/builds/");
  const form = page.getByRole("form", { name: "Build upgrade comparison" });
  const add = form.getByRole("button", { name: "Add upgrade" });
  await expect(add).toBeEnabled();
  await add.press("Enter");

  const second = form.getByRole("group", { name: "Upgrade 2" });
  await expect(second.getByRole("textbox", { name: "Upgrade name" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(second.getByRole("textbox", { name: "Upgrade cost" })).toBeFocused();

  await second.getByRole("button", { name: "Remove upgrade" }).press("Enter");
  await expect(second).toHaveCount(0);
  const first = form.getByRole("group", { name: "Upgrade 1" });
  await expect(first.getByRole("textbox", { name: "Upgrade name" })).toBeFocused();
});

test("Economy tools use the manually entered rate, prices, and estimates", async ({ page }) => {
  await page.goto("/economy/");
  const form = page.getByRole("form", { name: "Manual economy tools" });
  await expect(form.getByText("No real-time market feed.")).toBeVisible();
  for (const [label, value] of [
    ["Source unit", "shards"], ["Target unit", "tokens"], ["Amount to convert", "2.5"],
    ["Target units per source unit", "4"], ["Price A", "4"], ["Price B", "5"],
    ["Estimated gross benefit", "20"], ["Total cost", "15"],
  ]) await form.getByLabel(label, { exact: true }).fill(value);
  await form.getByRole("button", { name: "Calculate" }).click();
  await expect(form.getByText("10 tokens", { exact: true })).toBeVisible();
  await expect(form.getByText("Price A is lower", { exact: true })).toBeVisible();
  await expect(form.getByText("25%", { exact: true }).first()).toBeVisible();
});

for (const width of [320, 768, 1440]) {
  test(`manual tools reflow at ${width}px with reduced motion`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const path of ["/farm/", "/builds/", "/economy/"]) {
      await page.goto(path);
      await expect(page.getByRole("button", { name: "Calculate" })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
      if (path === "/farm/") {
        await page.getByRole("button", { name: "Load synthetic example" }).click();
        await page.getByRole("button", { name: "Calculate" }).click();
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: testInfo.outputPath(`farm-${width}.png`), fullPage: true });
      }
    }
  });
}

test("preview tools expose no auth routes and do not consume URL input", async ({ page, request }) => {
  const response = await page.goto("/farm/?cost=77&token=not-a-credential");
  expect(response?.headers()["set-cookie"]).toBeUndefined();
  await expect(page.getByLabel("Cost per run")).toHaveValue("");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
  for (const path of ["/login/", "/logout/", "/signup/", "/register/", "/account/", "/profile/", "/admin/", "/settings/", "/auth/", "/api/auth/"]) {
    expect((await request.get(path)).status()).toBe(404);
  }
  expect(await page.evaluate(() => ({ persistent: localStorage.length, session: sessionStorage.length })))
    .toEqual({ persistent: 0, session: 0 });
});

test.describe("Static tool layout without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("Build comparison reserves its finished layout and keeps actions disabled", async ({ page }) => {
    const response = await page.goto("/builds/");
    const form = page.getByRole("form", { name: "Build upgrade comparison" });
    await expect(form.getByLabel("Current estimated damage")).toBeVisible();
    await expect(form.getByRole("button", { name: "Calculate" })).toBeDisabled();
    expect(await response?.text()).toContain("<noscript><p>Enable JavaScript to run this calculator on your device.</p></noscript>");
  });
});
