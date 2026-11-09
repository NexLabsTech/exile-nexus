import { expect, test } from "@playwright/test";

const editorialAndPreview = [
  { pathname: "/", name: "Home" },
  { pathname: "/builds/", name: "Builds preview" },
  { pathname: "/items/", name: "Items preview" },
  { pathname: "/economy/", name: "Economy preview" },
  { pathname: "/farm/", name: "Farm preview" },
  { pathname: "/patches/", name: "Patches preview" },
  { pathname: "/advisor/", name: "Advisor preview" },
  { pathname: "/guides/", name: "Guides preview" },
  { pathname: "/search/", name: "Search demo" },
  { pathname: "/ui-kit/", name: "UI kit demo" },
  { pathname: "/404.html", name: "404 page" },
] as const;

test("robots and sitemap fail closed until site origin and publication approved", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toBe("User-agent: *\nDisallow: /\n");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  expect(xml).not.toContain("<loc>");
});

test("all existing pages have distinct metadata and remain noindex without approval", async ({ page }) => {
  const titles: string[] = [];
  const descriptions: string[] = [];
  for (const entry of editorialAndPreview) {
    await page.goto(entry.pathname);
    const robots = page.locator('meta[name="robots"]');
    await expect(robots, entry.name).toHaveAttribute("content", "noindex,nofollow");
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
    const title = await page.title();
    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(title.length).toBeGreaterThan(8);
    expect(desc?.length ?? 0).toBeGreaterThan(25);
    titles.push(title);
    descriptions.push(desc ?? "");
  }
  expect(new Set(titles).size).toBe(editorialAndPreview.length);
  expect(new Set(descriptions).size).toBe(editorialAndPreview.length);
});

test("SEO metadata never inserts fabricated game data or remote assets", async ({ page }) => {
  const externalRequests: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (!["127.0.0.1", "localhost"].includes(url.hostname)) externalRequests.push(url.href);
  });
  await page.goto("/");
  await expect(page.locator('html[lang="en"]')).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(externalRequests).toEqual([]);
});

for (const viewport of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
] as const) {
  test(`original Home remains accessible and noindex on ${viewport.name}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
    await expect(page.getByRole("main")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width + 1);
    await page.screenshot({ path: testInfo.outputPath(`seo-home-${viewport.name}.png`), fullPage:true, animations:"disabled" });
  });
}
