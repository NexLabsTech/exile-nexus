import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { URL } from "node:url";
import test from "node:test";
import { verifyIdentityArtifacts } from "../../scripts/verify-auth-boundary.mjs";

const policy=JSON.parse(readFileSync(new URL("../../src/data/identity-security-policy.json",import.meta.url),"utf8"));
const routes=JSON.parse(readFileSync(new URL("../../src/data/routes.json",import.meta.url),"utf8"));
const validator=(p)=>{if(p.mode!=="ANONYMOUS_ONLY" || p.allowCookieSessions!==false || p.allowPrivilegedOperations!==false)throw Error("invalid policy")};
const clone=(p)=>JSON.parse(JSON.stringify(p));
function fixture() {
  const root=mkdtempSync(join(tmpdir(),"exn-identity-"));
  const paths=policy.publicPaths;
  for(const p of paths){
    const rel=p==="/"?"index.html":p==="/404.html"?"404.html":p.slice(1)+"index.html";
    const name=join(root,rel);mkdirSync(dirname(name),{recursive:true});
    writeFileSync(name,'<!doctype html><html><head><meta name="robots" content="noindex,nofollow"></head><body><main>Anonymous only</main></body></html>');
  }
  return root;
}
function audit(dir,p=policy,r=routes){
  return verifyIdentityArtifacts({policy:p,routes:r,distDir:dir,validator});
}

test("static anonymous output has all 11 pages and zero privileged surface",t=>{
  const dir=fixture();t.after(()=>rmSync(dir,{recursive:true,force:true}));
  const r=audit(dir);
  assert.equal(r.passed,true,r.failures.join("\n"));
  assert.equal(r.publicRoutesVerified,11);
  assert.equal(r.sessionBackendVerified,false);
  assert.equal(r.logoutVerified,false);
  assert.equal(r.csrfVerified,false);
  assert.equal(r.rateLimiterVerified,false);
  assert.equal(r.manualSecurityReview,"NOT_RUN");
});
test("an accidentally generated login or admin page rejects release",t=>{
  const dir=fixture();t.after(()=>rmSync(dir,{recursive:true,force:true}));
  mkdirSync(join(dir,"login"));writeFileSync(join(dir,"login/index.html"),"auth");
  assert.ok(audit(dir).failures.some(x=>x.includes("Unapproved auth/account route")));
});
test("password capture form, login action or cookie design is not allowed in the static preview",t=>{
  const dir=fixture();t.after(()=>rmSync(dir,{recursive:true,force:true}));
  const file=join(dir,"index.html");
  const original=readFileSync(file,"utf8");
  writeFileSync(file,original.replace("</body>",'<input type="password" autocomplete="current-password"></body>'));
  assert.ok(audit(dir).failures.some(x=>x.includes("Unapproved password input")));
  writeFileSync(file,original.replace("</body>",'<form action="/api/auth/login"></form></body>'));
  assert.ok(audit(dir).failures.some(x=>x.includes("Unapproved login form")));
});
test("missing public page, rogue HTML page and new public route without contract fail",t=>{
  const dir=fixture();t.after(()=>rmSync(dir,{recursive:true,force:true}));
  writeFileSync(join(dir,"rogue.html"),"extra");
  assert.ok(audit(dir).failures.some(x=>x.includes("Unexpected HTML route count")));
  const bad=clone(policy);bad.publicPaths=bad.publicPaths.filter(p=>p!=="/guides/");
  assert.ok(audit(dir,bad).failures.some(x=>x.includes("contract differs")));
});
test("the SEO PREVIEW_ONLY noindex invariant cannot be removed by auth groundwork",t=>{
  const dir=fixture();t.after(()=>rmSync(dir,{recursive:true,force:true}));
  const page=join(dir,"index.html");
  writeFileSync(page,readFileSync(page,"utf8").replace("noindex,nofollow","index,follow"));
  assert.ok(audit(dir).failures.some(x=>x.includes("Unexpected SEO")));
});
test("no manufactured pass: the security report never marks live session or CSRF verified",t=>{
  const dir=fixture();t.after(()=>rmSync(dir,{recursive:true,force:true}));
  const a=audit(dir);
  for(const key of ["sessionBackendVerified","logoutVerified","csrfVerified","rateLimiterVerified"]){
    assert.strictEqual(a[key],false,`Live ${key} must remain BLOCKED`);
  }
});
