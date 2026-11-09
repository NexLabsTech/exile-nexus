import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { URL } from "node:url";
import { readAccessibilityMatrix, verifyAccessibilityMatrix } from "../../scripts/verify-a11y-matrix.mjs";

const matrix=JSON.parse(readFileSync(new URL("../fixtures/accessibility-matrix.json",import.meta.url),"utf8"));
const routes=JSON.parse(readFileSync(new URL("../../src/data/routes.json",import.meta.url),"utf8"));
const clone=(x)=>JSON.parse(JSON.stringify(x));

test("all existing routes, four viewports and six states have enforced accessibility coverage",()=>{
  const result=readAccessibilityMatrix();
  assert.equal(result.passed,true,result.failures.join("\n"));
  assert.equal(result.routeCount,11);
  assert.equal(result.viewportCount,4);
});
test("missing or duplicated route fails without silently omitting a page",()=>{
  const m=clone(matrix);m.routes.pop();
  assert.equal(verifyAccessibilityMatrix(m,routes).passed,false);
  m.routes.push(clone(m.routes[0]));
  assert.equal(verifyAccessibilityMatrix(m,routes).passed,false);
});
test("no missing 320px reflow or WCAG 2.2 AA tags",()=>{
  const m=clone(matrix);m.viewports=m.viewports.filter(v=>v.width!==320);
  assert.ok(verifyAccessibilityMatrix(m,routes).failures.some(x=>x.includes("320")));
  const n=clone(matrix);n.axeTags=n.axeTags.filter(x=>x!=="wcag22aa");
  assert.ok(verifyAccessibilityMatrix(n,routes).failures.some(x=>x.includes("wcag22aa")));
});
test("critical or serious violation allowance may never be silently raised",()=>{
  for(const key of ["criticalViolationLimit","seriousViolationLimit"]){
    const m=clone(matrix);m[key]=1;
    assert.ok(verifyAccessibilityMatrix(m,routes).failures.some(x=>x.includes("must not be relaxed")));
  }
});
test("manual verification cannot be promoted to PASS without evidence",()=>{
  const m=clone(matrix);m.notes="Manual screen reader certification PASS";
  assert.ok(verifyAccessibilityMatrix(m,routes).failures.some(x=>x.includes("NOT_RUN")));
});
test("keyboard interactive states remain part of coverage gate",()=>{
  for(const state of matrix.requiredStates){
    const m=clone(matrix);m.requiredStates=m.requiredStates.filter(x=>x!==state);
    assert.equal(verifyAccessibilityMatrix(m,routes).passed,false,state);
  }
});
