import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { URL } from "node:url";

const matrix = JSON.parse(readFileSync(new URL("../fixtures/accessibility-matrix.json", import.meta.url), "utf8")) as {
  routes: Array<{ path:string; kind:string }>;
  viewports: Array<{ name:string; width:number; height:number }>;
  axeTags: string[];
};

async function checkAxe(page:Page, note:string) {
  const result = await new AxeBuilder({ page }).withTags(matrix.axeTags).analyze();
  const failures = result.violations.map(({ id, impact, nodes }) => ({
    id, impact, nodes: nodes.map((n) => n.target).slice(0,5),
  }));
  expect(failures, `${note} WCAG automated accessibility violations`).toEqual([]);
}

for (const route of matrix.routes) {
  for (const viewport of [{ name:"desktop", width:1440, height:900 }, { name:"mobile", width:390, height:844 }]) {
    test(`WCAG 2.2 AA full page ${route.path} in ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route.path);
      await expect(page.getByRole("main")).toBeVisible();
      await checkAxe(page, `${route.path} ${viewport.name}`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth))
        .toBeLessThanOrEqual(viewport.width + 1);
    });
  }
}

test("empty and invalid search states are accessible and never trigger external requests", async ({ page }) => {
  const remote: string[] = [];
  page.on("request", (request) => {
    const hostname = new URL(request.url()).hostname;
    if (!["127.0.0.1","localhost"].includes(hostname)) remote.push(request.url());
  });
  await page.goto("/search/?q=never-matches-exn-009");
  await expect(page.getByRole("heading", { name:"Nothing in the local archive" })).toBeVisible();
  await checkAxe(page, "empty search");
  await page.goto(`/search/?q=${"z".repeat(95)}`);
  await expect(page.getByRole("alert")).toBeVisible();
  await checkAxe(page, "invalid search");
  expect(remote).toEqual([]);
});

test("UI kit error, disabled and loading states retain accessible semantics", async ({ page }) => {
  await page.goto("/ui-kit/");
  await page.getByRole("button", { name:"Validate locally" }).click();
  await expect(page.getByRole("alert")).toContainText("Something needs attention");
  await checkAxe(page, "invalid form and error");
  await page.getByRole("checkbox", { name:"Disable the example field" }).check();
  await expect(page.getByRole("textbox", { name:"Disabled field" })).toBeDisabled();
  await checkAxe(page, "disabled field");
  await page.getByRole("button", { name:"Loading", exact:true }).click();
  await expect(page.locator('[data-feedback-state="loading"]')).toBeVisible();
  await checkAxe(page, "loading feedback");
});

test("keyboard skip link, visible focus, mobile menu and Escape recovery", async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip=page.getByRole("link", {name:"Skip to content"});
  await expect(skip).toBeFocused();
  const focusStyle=await skip.evaluate((el)=>getComputedStyle(el).outlineStyle);
  expect(focusStyle).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
  const menu=page.getByRole("button",{name:"Open menu"});
  await menu.focus();
  await page.keyboard.press("Enter");
  const mobile=page.getByRole("navigation",{name:"Mobile primary navigation"});
  await expect(mobile).toBeVisible();
  await expect(mobile.getByRole("link",{name:/Search/})).toBeFocused();
  await checkAxe(page, "mobile navigation expanded");
  await page.keyboard.press("Escape");
  await expect(mobile).toBeHidden();
  await expect(menu).toBeFocused();
});

test("keyboard-only search result navigation and recovery",async ({page})=>{
  await page.goto("/search/?q=build");
  const input=page.getByRole("searchbox",{name:"Search local pages and fictional examples"});
  await input.focus();
  await page.keyboard.press("ArrowDown");
  const result=page.getByRole("list",{name:"Local search results"}).getByRole("link",{name:/Build Hub/});
  await expect(result).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(input).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(input).toHaveValue("");
  await expect(page).toHaveURL(/\/search\/$/);
});

test("reduced motion removes decorative animations and keeps loading text",async ({page})=>{
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/ui-kit/");
  await page.getByRole("button",{name:"Loading",exact:true}).click();
  const symbol=page.locator('.ui-feedback--loading .ui-feedback__symbol');
  await expect(symbol).toBeVisible();
  const motion=await symbol.evaluate((el)=>({name:getComputedStyle(el).animationName,duration:getComputedStyle(el).animationDuration}));
  expect(motion.name).toBe("none");
  await expect(page.getByRole("status")).toContainText("Preparing your view");
});

test("forced-colors preserves navigability, focus rings and feedback distinctions",async ({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.emulateMedia({forcedColors:"active",reducedMotion:"reduce"});
  await page.goto("/ui-kit/");
  const action=page.getByTestId("primary-action");
  await action.focus();
  await expect(action).toBeFocused();
  const outline=await action.evaluate((el)=>getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe("none");
  await action.click();
  await expect(page.getByRole("status")).toContainText("Action confirmed");
  await page.screenshot({path:test.info().outputPath("forced-colors-ui-kit.png"),fullPage:true,animations:"disabled"});
});

for(const viewport of matrix.viewports){
  for(const path of ["/","/builds/","/search/","/ui-kit/"]){
    test(`responsive readable release matrix ${path} at ${viewport.name}`,async ({page},info)=>{
      await page.setViewportSize({width:viewport.width,height:viewport.height});
      await page.emulateMedia({reducedMotion:"reduce"});
      await page.goto(path);
      await expect(page.getByRole("main")).toBeVisible();
      const dimensions=await page.evaluate(()=>({width:document.documentElement.scrollWidth,main:document.querySelector("main")?.getBoundingClientRect().width ?? 0}));
      expect(dimensions.width).toBeLessThanOrEqual(viewport.width+1);
      expect(dimensions.main).toBeGreaterThan(0);
      if(viewport.name==="desktop"||viewport.name==="mobile"||viewport.name==="reflow-320"){
        await page.screenshot({path:info.outputPath(`accessibility-${path.replaceAll("/","")||"home"}-${viewport.name}.png`),fullPage:true,animations:"disabled"});
      }
    });
  }
}

test("200 percent text resize retains core navigation and no horizontal overflow on desktop",async ({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto("/");
  await page.evaluate(()=>{document.documentElement.style.fontSize="200%";});
  await expect(page.getByRole("heading",{level:1})).toBeVisible();
  await expect(page.getByRole("link",{name:"Open site search"})).toBeVisible();
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth);
  expect(overflow).toBeLessThanOrEqual(1441);
  await page.screenshot({path:test.info().outputPath("text-200-percent-desktop.png"),fullPage:true,animations:"disabled"});
});
