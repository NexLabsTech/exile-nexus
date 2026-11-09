import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import test from "node:test";
import ts from "typescript";
import { PUBLIC_FILES, runAudit, verifyCatalog } from "../../scripts/verify-i18n.mjs";

const read = (relative) => readFileSync(new URL(`../../${relative}`, import.meta.url), "utf8");
const catalog = JSON.parse(read("src/i18n/en.json"));
const records = {
  routes: JSON.parse(read("src/data/routes.json")),
  states: JSON.parse(read("src/data/ui-states.json")),
  fixtures: JSON.parse(read("src/data/search-fixtures.json")),
};
const sources = Object.fromEntries(PUBLIC_FILES.map((path) => [path, read(path)]));
const clone = (value) => JSON.parse(JSON.stringify(value));

const formatSrc = read("src/i18n/format.ts");
const transpiled = ts.transpileModule(formatSrc, {
  fileName: "format.ts",
  compilerOptions: { module:ts.ModuleKind.ESNext, target:ts.ScriptTarget.ES2022 },
});
const { formatMessage } = await import(`data:text/javascript;base64,${Buffer.from(transpiled.outputText).toString("base64")}`);

test("real English catalog and existing externalized records have full public copy coverage", () => {
  const result = runAudit();
  assert.equal(result.passed, true, result.failures.join("\n"));
  assert.equal(result.locale, "en");
  assert.equal(result.filesScanned, PUBLIC_FILES.length);
  assert.ok(result.catalogKeys >= 120);
  assert.ok(result.referencedKeys >= 100);
  assert.deepEqual(result.failures, []);
});

test("English formatting is deterministic and escapes nothing into HTML", () => {
  assert.equal(formatMessage(catalog.home.featureLabel, { name:"Build Hub" }), "Explore Build Hub");
  assert.equal(formatMessage("Result {count}", { count:12 }), "Result 12");
  assert.equal(formatMessage("No parameters", {}), "No parameters");
  assert.equal(formatMessage("{name} & {name}", { name:"<literal>" }), "<literal> & <literal>");
});

test("missing, extra, malformed or non-finite placeholder fails closed", () => {
  assert.throws(() => formatMessage("{name}", {}), /Missing/);
  assert.throws(() => formatMessage("{name}", { name:"X", unused:"Y" }), /Unexpected/);
  assert.throws(() => formatMessage("{count}", { count:Infinity }), /Invalid/);
  for (const invalid of ["Hi {bad-name}", "Hi {", "Hi }", "{{name}}"]) {
    assert.throws(() => formatMessage(invalid, { name:"X" }), /Malformed/);
  }
});

test("missing catalog entry fails, not silently translated to fallback", () => {
  const broken = clone(catalog);
  delete broken.common.openMenu;
  const result = verifyCatalog(broken, sources, records);
  assert.equal(result.passed, false);
  assert.ok(result.failures.some((x) => /Unresolved localization key common.openMenu/.test(x)));
});

test("blank message, invalid template and missing required namespace fail", () => {
  const blank = clone(catalog);
  blank.search.label = "  ";
  assert.equal(verifyCatalog(blank, sources, records).passed, false);
  const invalid = clone(catalog);
  invalid.home.featureLabel = "Explore {thing}";
  assert.ok(verifyCatalog(invalid, sources, records).failures.some((x) => x.includes("Placeholder mismatch")));
  const missing = clone(catalog);
  delete missing.kit;
  assert.equal(verifyCatalog(missing, sources, records).passed, false);
});

test("regression: new hardcoded Astro public text is rejected", () => {
  const broken = { ...sources, "src/pages/index.astro": sources["src/pages/index.astro"] + "\n<p>This bypasses localization</p>\n" };
  const result = verifyCatalog(catalog, broken, records);
  assert.ok(result.failures.some((x) => x.includes("Hard-coded HTML copy")));
});

test("regression: new hardcoded React JSX copy or aria label is rejected", () => {
  const broken = { ...sources, "src/components/MobileNav.tsx": sources["src/components/MobileNav.tsx"] + "\nconst sample = <div aria-label=\"Hardcoded\">Unlocalized text</div>;\n" };
  const result = verifyCatalog(catalog, broken, records);
  assert.ok(result.failures.some((x) => x.includes("Hard-coded JSX copy")));
  assert.ok(result.failures.some((x) => x.includes("Hard-coded JSX attribute")));
});

test("externalized route and feedback catalogs cannot become incomplete silently", () => {
  const broken = clone(records);
  broken.routes[0].description = "";
  assert.equal(verifyCatalog(catalog, sources, broken).passed, false);
  const fake = clone(records);
  fake.fixtures[0].fictional = false;
  assert.equal(verifyCatalog(catalog, sources, fake).passed, false);
  const noError = clone(records);
  delete noError.states.error;
  assert.equal(verifyCatalog(catalog, sources, noError).passed, false);
});

test("a missing public UI source must fail, not be called NOT_APPLICABLE", () => {
  const incomplete = { ...sources };
  delete incomplete["src/pages/search/index.astro"];
  const result = verifyCatalog(catalog, incomplete, records);
  assert.equal(result.passed, false);
  assert.ok(result.failures.some((x) => x.includes("Public UI source missing")));
});
