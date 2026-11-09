import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { URL } from "node:url";
import test from "node:test";
import { verifySeoBuild } from "../../scripts/verify-seo.mjs";

const policy = JSON.parse(readFileSync(new URL("../../src/data/publication-policy.json", import.meta.url), "utf8"));

function fakeDist() {
  const root = mkdtempSync(join(tmpdir(), "exn-seo-"));
  const paths = [...policy.publicEditorialPaths, ...policy.previewPaths];
  for (const [i, path] of paths.entries()) {
    const file = path === "/" ? "index.html" : path === "/404.html" ? "404.html" : path.slice(1) + "index.html";
    const full = join(root, file);
    mkdirSync(dirname(full), { recursive:true });
    writeFileSync(full, `<!doctype html><html lang="en"><head><meta name="description" content="Unique original page ${i} description"/><meta name="robots" content="noindex,nofollow"/><title>Unique page ${i} | Exile Nexus</title></head><body><main>Original preview</main></body></html>`);
  }
  writeFileSync(join(root, "robots.txt"), "User-agent: *\nDisallow: /\n");
  writeFileSync(join(root, "sitemap.xml"), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>\n');
  return root;
}

test("valid preview build passes with zero indexable pages", (t) => {
  const root = fakeDist();
  t.after(() => rmSync(root, { recursive:true, force:true }));
  const audit = verifySeoBuild(root, policy);
  assert.equal(audit.passed, true, audit.failures.join("; "));
  assert.equal(audit.publishedPages, 0);
  assert.equal(audit.pages.length, 11);
});

test("accidentally indexable fake section fails closed", (t) => {
  const root = fakeDist();
  t.after(() => rmSync(root, { recursive:true, force:true }));
  const target = join(root, "builds/index.html");
  writeFileSync(target, readFileSync(target, "utf8").replace("noindex,nofollow", "index,follow"));
  const audit = verifySeoBuild(root, policy);
  assert.equal(audit.passed, false);
  assert.match(audit.failures.join(" "), /Wrong robots/);
});

test("duplicate title or description fails static SEO gate", (t) => {
  const root = fakeDist();
  t.after(() => rmSync(root, { recursive:true, force:true }));
  const target = join(root, "items/index.html");
  let html = readFileSync(target, "utf8");
  html = html.replace("Unique page 2", "Unique page 1");
  html = html.replace("Unique original page 2", "Unique original page 1");
  writeFileSync(target, html);
  const audit = verifySeoBuild(root, policy);
  assert.equal(audit.passed, false);
  assert.match(audit.failures.join("; "), /Duplicate title/);
  assert.match(audit.failures.join("; "), /Duplicate description/);
});

test("unapproved sitemap listing a third-party path fails closed", (t) => {
  const root = fakeDist();
  t.after(() => rmSync(root, { recursive:true, force:true }));
  const sitemap = join(root, "sitemap.xml");
  writeFileSync(sitemap, readFileSync(sitemap,"utf8").replace("</urlset>", "<url><loc>https://external.example/path</loc></url></urlset>"));
  const audit = verifySeoBuild(root, policy);
  assert.equal(audit.passed, false);
  assert.match(audit.failures.join(" "), /Unapproved sitemap/);
});

test("no robots file blocks the static publication audit", (t) => {
  const root = fakeDist();
  t.after(() => rmSync(root, { recursive:true, force:true }));
  rmSync(join(root, "robots.txt"));
  assert.equal(verifySeoBuild(root, policy).passed, false);
});
