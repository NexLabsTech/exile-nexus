import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";

const root = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));
const routes = JSON.parse(readFileSync(path.join(root, "src/data/routes.json"), "utf8"));

test("every section is distinct and has a stable deep link", () => {
  const slugs = routes.map(({ slug }) => slug);
  const hrefs = routes.map(({ href }) => href);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.equal(new Set(hrefs).size, hrefs.length);
  assert.equal(routes.length, 7);
  for (const route of routes) {
    assert.match(route.slug, /^[a-z]+$/);
    assert.equal(route.href, `/${route.slug}/`);
    assert.ok(route.label.trim() && route.title.trim() && route.description.trim());
    assert.equal(route.href.startsWith("http"), false);
  }
});

test("module previews make no claim to be live integrations", () => {
  for (const route of routes) {
    assert.equal(/https?:\/\//.test(route.description), false);
    assert.equal(/live (market|prices)/i.test(route.description), false);
    assert.equal(route.category.length > 0, true);
  }
});

test("mandatory shell paths are represented", () => {
  const slugs = routes.map((route) => route.slug);
  for (const required of ["builds", "items", "economy", "farm", "patches", "advisor", "guides"]) {
    assert.ok(slugs.includes(required), `missing ${required}`);
  }
});
