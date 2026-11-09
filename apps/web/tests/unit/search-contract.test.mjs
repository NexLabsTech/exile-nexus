import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import test from "node:test";
import ts from "typescript";

const tsSource = readFileSync(new URL("../../src/lib/search-contract.ts", import.meta.url), "utf8");
const js = ts.transpileModule(tsSource, {
  fileName: "search-contract.ts",
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  reportDiagnostics: true,
});
assert.equal(js.diagnostics?.filter((d) => d.category === ts.DiagnosticCategory.Error).length ?? 0, 0);
const { createSearchIndex, searchRecords } = await import(
  `data:text/javascript;base64,${Buffer.from(js.outputText).toString("base64")}`
);
const routes = JSON.parse(readFileSync(new URL("../../src/data/routes.json", import.meta.url), "utf8"));
const fixtures = JSON.parse(readFileSync(new URL("../../src/data/search-fixtures.json", import.meta.url), "utf8"));
const index = createSearchIndex(routes, fixtures);

test("index contains all internal page routes and only labeled fictional fixtures", () => {
  assert.equal(index.length, routes.length + fixtures.length);
  for (const entry of index) {
    assert.ok(entry.href.startsWith("/") && entry.href.endsWith("/"));
    assert.ok(routes.some((route) => route.href === entry.href));
    assert.equal(entry.observedAt, null);
    assert.equal(entry.expiresAt, null);
    assert.equal(entry.evidenceId, null);
    if (entry.origin === "synthetic") {
      assert.equal(entry.permission, "SYNTHETIC");
      assert.equal(entry.sourceLabel, "Fictional demo fixture");
    } else {
      assert.equal(entry.origin, "internal-navigation");
      assert.equal(entry.permission, "INTERNAL");
      assert.equal(entry.sourceLabel, "Exile Nexus navigation");
    }
  }
});

test("search deterministically ranks exact navigation label before related fiction", () => {
  const one = searchRecords(index, "build", routes);
  const two = searchRecords(index, "BUILD", routes);
  assert.equal(one.state, "ready");
  assert.equal(one.records[0].title, "Build Hub");
  assert.deepEqual(one.records.map((x) => x.id), two.records.map((x) => x.id));
});

test("case and accents normalize but matching remains deterministic", () => {
  const local = [...index, {
    id:"demo:accent", title:"Ficção móvel", summary:"Synthetic extra", category:"SYNTHETIC", href:"/builds/",
    origin:"synthetic", permission:"SYNTHETIC", sourceLabel:"Fictional demo fixture",
    sourceVersion:"fixture-v1", observedAt:null, expiresAt:null, evidenceId:null,
  }];
  const r = searchRecords(local, "ficcao movel", routes);
  assert.ok(r.records.some((x) => x.id === "demo:accent"));
});

test("no search results and overlong search are explicit non-success states", () => {
  const empty = searchRecords(index, "zzzzzz-nonexistent-entry", routes);
  assert.equal(empty.state, "empty");
  assert.equal(empty.records.length, 0);
  const invalid = searchRecords(index, "x".repeat(81), routes);
  assert.equal(invalid.state, "error");
  assert.equal(invalid.records.length, 0);
  assert.match(invalid.message, /80-character/);
});

test("missing rights adapter fails closed even for forged AUTHORIZED external content", () => {
  for (const permission of ["AUTHORIZED", "CONDITIONAL", "UNVERIFIED", "PROHIBITED"]) {
    const forged = {
      ...index[0], id:`external:${permission}`, origin:"external", permission,
      title:"External game pricing", href:"/items/",
      sourceLabel:"Third party",
      observedAt:"2026-11-08T21:00:00Z",
      expiresAt:"2030-01-01T00:00:00Z",
      evidenceId:"FAKE",
    };
    const result = searchRecords([...index, forged], "External game pricing", routes);
    assert.equal(result.state, "empty", `external source leaked for ${permission}`);
  }
});

test("forged local navigation and external protocols are rejected", () => {
  const injections = [
    { ...index[0], id:"attack:protocol", title:"Attack protocol", href:"javascript:alert(1)" },
    { ...index[0], id:"attack:domain", title:"Attack domain", href:"//example.com/" },
    { ...index[0], id:"attack:route", title:"Attack route", href:"/private/" },
    { ...index[0], id:"attack:rights", title:"Attack rights", permission:"UNVERIFIED" },
  ];
  const response = searchRecords([...index, ...injections], "Attack", routes);
  assert.equal(response.state, "empty");
});

test("duplicate records cannot multiply, all results are bounded to 20", () => {
  const duplicate = createSearchIndex([...routes, ...routes], [...fixtures, ...fixtures]);
  assert.equal(duplicate.length, index.length);
  const huge = Array.from({ length: 30 }, (_, i) => ({
    ...index[0], id:`demo:sample-${i}`, title:`Sample ${i}`,
    origin:"synthetic", permission:"SYNTHETIC", sourceLabel:"Fictional demo fixture",
  }));
  const result = searchRecords(huge, "sample", routes);
  assert.equal(result.records.length, 20);
});

test("no-query response only lists permission-safe locally indexed pages", () => {
  const result = searchRecords(index, " ", routes);
  assert.equal(result.state, "ready");
  assert.equal(result.records.length, 10);
  assert.ok(result.records.every((x) => x.origin !== "external"));
});
