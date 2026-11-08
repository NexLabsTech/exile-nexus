import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const visualBaselines: Record<string, string> = JSON.parse(
  readFileSync(new URL("../visual/ui-kit-baselines.json", import.meta.url), "utf8"),
);

test("component gallery is a static, noindex route", async ({ page }) => {
  await page.goto("/ui-kit/");
  await expect(page.getByRole("heading", { level: 1, name: "The component workshop" })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
  await expect(page.getByRole("heading", { name: "Action buttons" })).toBeVisible();
});

test("button controls announce busy, disabled and action states", async ({ page }) => {
  await page.goto("/ui-kit/");
  await expect(page.getByTestId("loading-action")).toBeDisabled();
  await expect(page.getByTestId("loading-action")).toHaveAttribute("aria-busy", "true");
  await expect(page.getByTestId("disabled-action")).toBeDisabled();
  const action = page.getByTestId("primary-action");
  await action.focus();
  await expect(action).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator('[data-feedback-state="success"]')).toBeVisible();
  await expect(page.getByRole("status")).toContainText("Action confirmed");
});

test("validation errors are described; successful input clears the error", async ({ page }) => {
  await page.goto("/ui-kit/");
  const input = page.getByTestId("preview-input");
  await expect(input).toHaveAttribute("required", "");
  await page.getByRole("button", { name: "Validate locally" }).click();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Enter at least three characters.")).toBeVisible();
  await expect(page.getByRole("alert")).toContainText("Something needs attention");
  await input.fill("route");
  await page.getByRole("button", { name: "Validate locally" }).click();
  await expect(input).toHaveAttribute("aria-invalid", "false");
  await expect(page.getByRole("status")).toContainText("Action confirmed");
});

test("disabled field, retry and all feedback states are operable", async ({ page }) => {
  await page.goto("/ui-kit/");
  const toggle = page.getByRole("checkbox", { name: "Disable the example field" });
  await toggle.check();
  await expect(page.getByRole("textbox", { name: "Disabled field" })).toBeDisabled();
  await toggle.uncheck();
  await expect(page.getByRole("textbox", { name: "Disabled field" })).toBeEnabled();

  await page.getByRole("group", { name: "Choose preview status" }).getByRole("button", { name: "Error" }).click();
  await expect(page.getByRole("alert")).toContainText("Something needs attention");
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.locator('[data-feedback-state="loading"]')).toBeVisible();
  await page.getByRole("button", { name: "Empty" }).click();
  await expect(page.getByRole("status")).toContainText("No results to display");
});

test("axe WCAG 2.2 AA audits default and error/disabled component states", async ({ page }) => {
  await page.goto("/ui-kit/");
  const scan = async () =>
    new AxeBuilder({ page })
      .include("#component-workshop")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
  const defaultResults = await scan();
  expect(defaultResults.violations, JSON.stringify(defaultResults.violations, null, 2)).toEqual([]);
  await page.getByRole("checkbox", { name: "Disable the example field" }).check();
  await page.getByRole("button", { name: "Error" }).click();
  const errorResults = await scan();
  expect(errorResults.violations, JSON.stringify(errorResults.violations, null, 2)).toEqual([]);
});

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
] as const;

for (const viewport of viewports) {
  test(`visual screenshot regression and responsive state at ${viewport.name}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/ui-kit/");
    await expect(page.getByRole("heading", { name: "Action buttons" })).toBeVisible();
    await expect(page.locator("#component-workshop")).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(overflow).toBeLessThanOrEqual(viewport.width + 1);

    await page.screenshot({ path: testInfo.outputPath(`ui-kit-${viewport.name}-full.png`), fullPage: true, animations: "disabled" });
    const digests: Record<string, string> = {};
    for (const state of ["empty", "error"] as const) {
      if (state === "error") await page.getByRole("button", { name: "Error" }).click();
      const cropped = await page.locator("#component-workshop").screenshot({
        path: testInfo.outputPath(`ui-kit-${viewport.name}-${state}.png`),
        animations: "disabled",
        caret: "hide",
      });
      const digest = createHash("sha256").update(cropped).digest("hex");
      console.log(`EXN_VISUAL_DIGEST ${viewport.name}-${state} ${digest}`);
      digests[`${viewport.name}-${state}`] = digest;
    }
    for (const [key, digest] of Object.entries(digests)) {
      expect(digest, `visual snapshot changed: ${key}`).toBe(visualBaselines[key]);
    }
  });
}
