import { expect, test } from "@playwright/test";
import budgets from "../../performance-budgets.json";

test("reduced-motion keeps content accessible and removes active animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: budgets.lowEnd.viewportWidth, height: budgets.lowEnd.viewportHeight });
  await page.goto("/ui-kit/");
  await expect(page.getByRole("heading", { name: "The component workshop" })).toBeVisible();

  const state = await page.evaluate(() => {
    const animated = document.querySelector(".ui-action__spinner");
    const button = document.querySelector(".ui-action");
    const root = document.documentElement;
    if (!animated || !button) throw new Error("Missing motion elements");
    return {
      animationDuration: getComputedStyle(animated).animationDuration,
      animationName: getComputedStyle(animated).animationName,
      transitionDuration: getComputedStyle(button).transitionDuration,
      scrollBehavior: getComputedStyle(root).scrollBehavior,
    };
  });
  const durations = (input: string) => input.split(",").map((value) => {
    const trimmed = value.trim();
    return trimmed.endsWith("ms") ? Number.parseFloat(trimmed) : Number.parseFloat(trimmed) * 1000;
  });
  expect(durations(state.animationDuration).every((x) => x <= budgets.motion.reducedMotionMaxAnimationMs)).toBe(true);
  expect(durations(state.transitionDuration).every((x) => x <= budgets.motion.reducedMotionMaxTransitionMs)).toBe(true);
  expect(state.animationName).toBe("none");
  expect(state.scrollBehavior).toBe("auto");

  await page.getByRole("button", { name: "Error" }).click();
  await expect(page.getByRole("alert")).toContainText("Something needs attention");
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.locator('[data-feedback-state="loading"]')).toBeVisible();
});

test("normal-motion hover is bounded and never required for navigation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const link = page.getByRole("link", { name: "Browse the Archives" });
  await expect(link).toBeVisible();
  const duration = await link.evaluate((element) => getComputedStyle(element).transitionDuration);
  const durations = duration.split(",").map((value) => {
    const text = value.trim();
    return text.endsWith("ms") ? Number.parseFloat(text) : Number.parseFloat(text) * 1000;
  });
  expect(durations.every((ms) => ms <= budgets.motion.maximumHoverTransitionMs)).toBe(true);
  await link.focus();
  await expect(link).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/items\/$/);
});

test("low-end phone with CPU/network throttling keeps mobile navigation responsive", async ({ page }, testInfo) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: budgets.lowEnd.viewportWidth, height: budgets.lowEnd.viewportHeight });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const session = await page.context().newCDPSession(page);
  try {
    await session.send("Emulation.setCPUThrottlingRate", { rate: budgets.lowEnd.cpuSlowdownFactor });
    await session.send("Network.enable");
    await session.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: budgets.lowEnd.latencyMs,
      downloadThroughput: budgets.lowEnd.downloadBytesPerSecond,
      uploadThroughput: budgets.lowEnd.uploadBytesPerSecond,
    });
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Open menu" });
    await expect(trigger).toBeVisible();
    const started = Date.now();
    await trigger.click();
    await expect(page.getByRole("navigation", { name: "Mobile primary navigation" })).toBeVisible();
    const elapsedMs = Date.now() - started;
    console.log(`EXN_LOW_END_MENU_RESPONSE_MS ${elapsedMs}`);
    expect(elapsedMs, `throttled menu exceeded ${budgets.lowEnd.maximumMenuResponseMs} ms`).toBeLessThanOrEqual(
      budgets.lowEnd.maximumMenuResponseMs,
    );
    await page.screenshot({ path: testInfo.outputPath("slow-phone-menu.png"), fullPage: true });
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      budgets.lowEnd.viewportWidth + 1,
    );
  } finally {
    await session.detach();
  }
});
