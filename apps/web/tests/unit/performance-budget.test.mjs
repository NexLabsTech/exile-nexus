import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { inspectDist, validateBudgets } from "../../scripts/verify-budget.mjs";

const budget = {
  schemaVersion: 1,
  staticAssets: {
    scriptGzipBytes: 1200,
    styleGzipBytes: 1200,
    homeHtmlGzipBytes: 1200,
    entireDistRawBytes: 5000,
  },
};

function fixture() {
  const root = mkdtempSync(join(tmpdir(), "exn-budget-"));
  mkdirSync(join(root, "builds"));
  mkdirSync(join(root, "ui-kit"));
  mkdirSync(join(root, "_astro"));
  for (const path of ["index.html", "builds/index.html", "ui-kit/index.html"]) {
    writeFileSync(join(root, path), "<!doctype html><html><body>Local demo</body></html>");
  }
  writeFileSync(join(root, "_astro", "app.js"), "console.log('sample');");
  writeFileSync(join(root, "_astro", "site.css"), "html{background:black}");
  return root;
}

test("small reproducible build satisfies all budget fields", (t) => {
  const root = fixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const report = inspectDist(root, budget);
  assert.equal(report.passed, true);
  assert.equal(report.violations.length, 0);
  assert.equal(report.files.length, 5);
  assert.ok(report.metrics.scriptGzipBytes > 0);
  assert.ok(report.metrics.styleGzipBytes > 0);
});

test("missing route blocks performance evidence", (t) => {
  const root = fixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  rmSync(join(root, "builds", "index.html"));
  assert.throws(() => inspectDist(root, budget), /Required page missing/);
});

test("budget breach fails closed with exact measured bytes", (t) => {
  const root = fixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const narrow = { ...budget, staticAssets: { ...budget.staticAssets } };
  narrow.staticAssets.scriptGzipBytes = 2;
  const report = inspectDist(root, narrow);
  assert.equal(report.passed, false);
  assert.match(report.violations.join(" "), /scriptGzipBytes/);
  assert.ok(report.metrics.scriptGzipBytes > narrow.staticAssets.scriptGzipBytes);
});

test("missing or disabled threshold cannot turn a test green", () => {
  const bad = { ...budget, staticAssets: { ...budget.staticAssets } };
  bad.staticAssets.styleGzipBytes = 0;
  assert.throws(() => validateBudgets(bad), /Invalid finite positive budget/);
  assert.throws(() => validateBudgets({ schemaVersion: 999 }), /Unsupported/);
});

test("oversized total raw build fails without masking other checks", (t) => {
  const root = fixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(join(root, "large.txt"), Buffer.alloc(5001, 65));
  const report = inspectDist(root, budget);
  assert.equal(report.passed, false);
  assert.match(report.violations.join(" "), /entireDistRawBytes/);
});
