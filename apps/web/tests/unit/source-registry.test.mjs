import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { URL } from "node:url";
import { listSourceRegistrations, sourceRegistry, evaluateSourceUse } from "../../src/lib/source-registry.ts";

const terms = "https://www.pathofexile.com/legal/terms-of-use-and-privacy-policy";
const documentaryRequest = { sourceId: "R01", purpose: "reference", url: terms };
const operations = ["ingest", "cache", "persist", "display", "monetize", "reuse-code"];

test("the versioned registry matches every status in the accepted R01–R14 matrix", () => {
  assert.equal(sourceRegistry.schemaVersion, 1);
  const matrix = readFileSync(new URL("../../../../docs/rights-and-data-sources.md", import.meta.url), "utf8");
  const expected = [...matrix.matchAll(/^\| (R\d{2}) \| .*\| \*\*(AUTORIZADO|CONDICIONADO|NÃO VERIFICADO|PROIBIDO)\*\*/gm)]
    .map(([, id, status]) => [id, status]);
  assert.equal(expected.length, 14);
  const sources = listSourceRegistrations();
  assert.deepEqual(sources.map(({ id, rightsStatus }) => [id, rightsStatus]), expected);
  for (const source of sources) {
    assert.ok(source.surface.trim());
    assert.ok(source.reviewNote.trim());
    assert.ok(source.gates.length >= 1);
    for (const value of source.referenceUrls) {
      const url = new URL(value);
      assert.equal(url.protocol, "https:");
      assert.equal(url.username + url.password, "");
    }
  }
  for (const id of ["R08", "R11", "R12", "R13"]) {
    assert.equal(sources.find((row) => row.id === id).owner, null, id);
  }
});

test("only the exact documentary terms reference passes under R01", () => {
  assert.deepEqual(evaluateSourceUse(documentaryRequest), { allowed: true, reason: "DOCUMENTARY_REFERENCE" });
  for (const url of [
    undefined, null, terms + "?copy=1", terms + "#license", "http://www.pathofexile.com/legal/terms-of-use-and-privacy-policy",
    "https://www.pathofexile.com@unrelated.invalid/terms", "https://www.pathofexile.com/developer/docs",
  ]) {
    assert.deepEqual(evaluateSourceUse({ ...documentaryRequest, url }), { allowed: false, reason: "REFERENCE_NOT_REGISTERED" });
  }
});

test("the registry fails closed for all operational uses and unapproved reference statuses", () => {
  for (const source of listSourceRegistrations()) {
    const request = { sourceId: source.id, url: source.referenceUrls[0] ?? null };
    for (const purpose of operations) {
      assert.deepEqual(evaluateSourceUse({ ...request, purpose }), { allowed: false, reason: "OPERATION_NOT_ADMITTED" });
    }
    if (source.id !== "R01") {
      assert.deepEqual(evaluateSourceUse({ ...request, purpose: "reference" }), { allowed: false, reason: "REFERENCE_NOT_APPROVED" });
    }
  }
});

test("unknown requests and caller edits cannot invent a source permission", () => {
  for (const sourceId of ["R99", "__proto__", "constructor", "r01"]) {
    assert.deepEqual(evaluateSourceUse({ ...documentaryRequest, sourceId }), { allowed: false, reason: "UNKNOWN_SOURCE" });
  }
  assert.deepEqual(evaluateSourceUse({ ...documentaryRequest, purpose: "arbitrary-action" }),
    { allowed: false, reason: "OPERATION_NOT_ADMITTED" });
  const records = listSourceRegistrations();
  records[0].referenceUrls.push("https://unrelated.invalid/");
  records[1].rightsStatus = "AUTORIZADO";
  records[1].gates.push("REFERENCE_ONLY");
  assert.deepEqual(evaluateSourceUse({ ...documentaryRequest, url: "https://unrelated.invalid/" }),
    { allowed: false, reason: "REFERENCE_NOT_REGISTERED" });
  assert.deepEqual(evaluateSourceUse({ ...documentaryRequest, sourceId: "R02", url: records[1].referenceUrls[0] }),
    { allowed: false, reason: "REFERENCE_NOT_APPROVED" });
});
