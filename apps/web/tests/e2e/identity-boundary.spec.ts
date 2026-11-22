import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { URL } from "node:url";

const policy=JSON.parse(readFileSync(new URL("../../src/data/identity-security-policy.json",import.meta.url),"utf8"));

test("anonymous visitor can browse approved pages without any login, cookie or stored identity",async ({page,context})=>{
  for(const path of policy.publicPaths.filter((p:string)=>p!=="/404.html")) {
    const response=await page.goto(path);
    expect(response?.ok(),path).toBe(true);
    await expect(page.getByRole("main")).toBeVisible();
    expect(await context.cookies(),path).toEqual([]);
    const storage=await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}));
    expect(storage.local,path).toBe(0);
    expect(storage.session,path).toBe(0);
  }
});
test("forged role, account or bearer parameter cannot reveal private controls",async ({page,context})=>{
  await page.goto("/?role=admin&userId=superuser&token=fake-jwt&sessionId=forged");
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.locator('form input[type="password"]')).toHaveCount(0);
  await expect(page.locator('a[href^="/admin"], a[href^="/account"], a[href^="/login"]')).toHaveCount(0);
  expect(await context.cookies()).toEqual([]);
  const storage=await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}));
  expect(storage).toEqual({local:0,session:0});
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content","noindex,nofollow");
});
test("reserved auth routes do not exist or grant a real identity",async ({request})=>{
  for(const path of policy.reservedAuthPaths) {
    const response=await request.get(path);
    expect(response.status(),path).toBe(404);
    const cookie=response.headers()["set-cookie"];
    expect(cookie,path).toBeUndefined();
  }
});
test("no external auth endpoint or identity provider is contacted from public home",async ({page,context})=>{
  const remote:string[]=[];
  page.on("request",(r)=>{
    const hostname=new URL(r.url()).hostname;
    if(!["127.0.0.1","localhost"].includes(hostname))remote.push(r.url());
  });
  await page.goto("/");
  await page.getByRole("link",{name:"Open site search"}).click();
  await expect(page).toHaveURL(/\/search\/$/);
  expect(remote).toEqual([]);
  expect(await context.cookies()).toEqual([]);
});
