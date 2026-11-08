import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import test from "node:test";

const file = fileURLToPath(new URL("../../src/data/ui-states.json", import.meta.url));
const states = JSON.parse(readFileSync(file, "utf8"));

test("component states are exhaustive, stable and meaningful", () => {
  assert.deepEqual(Object.keys(states).sort(), ["empty", "error", "loading", "success"]);
  for (const [key, state] of Object.entries(states)) {
    assert.match(key, /^(empty|error|loading|success)$/);
    assert.equal(typeof state.title, "string");
    assert.equal(typeof state.message, "string");
    assert.ok(state.title.length >= 8);
    assert.ok(state.message.length >= 24);
    assert.ok(state.glyph.length >= 1);
    assert.equal(/https?:\/\//.test(state.message), false);
  }
});

test("state variants are distinguishable by text, not color alone", () => {
  assert.equal(new Set(Object.values(states).map((v) => v.title)).size, 4);
  assert.match(states.error.title.toLowerCase(), /attention/);
  assert.match(states.empty.title.toLowerCase(), /no results/);
  assert.match(states.loading.title.toLowerCase(), /preparing/);
});

test("error and loading explain the absence of remote operations", () => {
  assert.match(states.error.message, /nothing was sent|nothing was saved/i);
  assert.match(states.loading.message, /no remote service/i);
});
