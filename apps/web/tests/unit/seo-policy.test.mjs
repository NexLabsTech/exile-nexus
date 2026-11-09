import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../../src/lib/seo-policy.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  fileName: "seo-policy.ts",
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  reportDiagnostics: true,
});
assert.equal(compiled.diagnostics?.filter((x) => x.category === ts.DiagnosticCategory.Error).length ?? 0, 0);
const { validatePublicationPolicy, allowedPublishedPaths, metadataForPage, createSitemapXml, createRobotsTxt } =
  await import(`data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`);
const preview = JSON.parse(readFileSync(new URL("../../src/data/publication-policy.json", import.meta.url), "utf8"));
const approval = {
  ...preview, status: "APPROVED",
  approvedSiteOrigin: "https://illustrative-seo-fixture.org",
  approvalEvidence: "EXN-SEO-PUBLISH-TEST-ONLY",
};

test("actual repository publication policy remains unapproved", () => {
  validatePublicationPolicy(preview);
  assert.equal(preview.status, "PREVIEW_ONLY");
  assert.equal(preview.approvedSiteOrigin, null);
  assert.equal(preview.approvalEvidence, null);
  assert.deepEqual(allowedPublishedPaths(preview), []);
});

test("preview-only Home and section URLs are noindex with no canonical or JSON-LD", () => {
  for (const path of ["/", "/builds/", "/items/", "/economy/", "/search/", "/ui-kit/", "/404.html"]) {
    const meta = metadataForPage(preview, path, "A title", "Unique original editorial description");
    assert.deepEqual(meta, { robots:"noindex,nofollow", canonical:null, structuredData:null, publishable:false });
  }
});

test("preview robots denies crawling and sitemap publishes no URLs", () => {
  assert.equal(createRobotsTxt(preview), "User-agent: *\nDisallow: /\n");
  const xml = createSitemapXml(preview);
  assert.match(xml, /<urlset /);
  assert.doesNotMatch(xml, /<url>|<loc>|<lastmod>/);
  assert.doesNotMatch(xml, /https?:\/\/[^"]+\/index/);
});

test("only original Home is indexable with separately supplied domain and approval fixture", () => {
  const pub = validatePublicationPolicy(approval);
  assert.deepEqual(allowedPublishedPaths(pub), ["/"]);
  const meta = metadataForPage(pub, "/", "Original Portal", "Original independent site information");
  assert.equal(meta.robots, "index,follow");
  assert.equal(meta.canonical, "https://illustrative-seo-fixture.org/");
  assert.equal(meta.structuredData["@context"], "https://schema.org");
  assert.deepEqual(meta.structuredData["@graph"].map((x) => x["@type"]), ["WebSite", "WebPage"]);
  assert.match(meta.structuredData["@graph"][0].description, /independent|Independent/);
  assert.ok(!JSON.stringify(meta.structuredData).includes("Grinding Gear Games"));
});

test("unverified previews never become indexable, even in approved fixture", () => {
  for (const path of ["/builds/", "/items/", "/patches/", "/search/", "/ui-kit/", "/404.html", "/private/"]) {
    const meta = metadataForPage(approval, path, "Restricted preview", "No verified live data");
    assert.equal(meta.robots, "noindex,nofollow");
    assert.equal(meta.canonical, null);
    assert.equal(meta.structuredData, null);
  }
  assert.equal(metadataForPage(approval, "/", "Home", "Original", "noindex,nofollow").publishable, false);
});

test("approved fixture sitemap and robots expose exactly the indexable original page", () => {
  const sitemap = createSitemapXml(approval);
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, 1);
  assert.match(sitemap, /<loc>https:\/\/illustrative-seo-fixture\.org\/<\/loc>/);
  assert.doesNotMatch(sitemap, /search\/|builds\/|ui-kit\//);
  const robots = createRobotsTxt(approval);
  assert.match(robots, /^User-agent: \*\nAllow: \/\n/);
  assert.match(robots, /Disallow: \/search\//);
  assert.match(robots, /Sitemap: https:\/\/illustrative-seo-fixture\.org\/sitemap.xml/);
});

test("invalid or fake publication approvals fail closed", () => {
  for (const change of [
    { status:"APPROVED", approvedSiteOrigin:null, approvalEvidence:null },
    { status:"APPROVED", approvedSiteOrigin:"http://illustrative-seo-fixture.org", approvalEvidence:"EXN-SEO-PUBLISH-TEST-ONLY" },
    { status:"APPROVED", approvedSiteOrigin:"https://example.com", approvalEvidence:"EXN-SEO-PUBLISH-TEST-ONLY" },
    { status:"APPROVED", approvedSiteOrigin:"https://illustrative-seo-fixture.org/a", approvalEvidence:"EXN-SEO-PUBLISH-TEST-ONLY" },
    { status:"APPROVED", approvedSiteOrigin:"https://user@illustrative-seo-fixture.org", approvalEvidence:"EXN-SEO-PUBLISH-TEST-ONLY" },
    { status:"APPROVED", approvedSiteOrigin:"https://illustrative-seo-fixture.org", approvalEvidence:"EXN-DEC-0008" },
    { status:"PREVIEW_ONLY", approvedSiteOrigin:"https://illustrative-seo-fixture.org", approvalEvidence:null },
  ]) {
    assert.throws(() => validatePublicationPolicy({ ...preview, ...change }));
  }
});

test("duplicate, unsafe, overlapping or missing preview path policy fails closed", () => {
  assert.throws(() => validatePublicationPolicy({ ...preview, publicEditorialPaths:["/", "/"] }), /Duplicated/);
  assert.throws(() => validatePublicationPolicy({ ...preview, publicEditorialPaths:["/", "/search/"] }), /Duplicated/);
  assert.throws(() => validatePublicationPolicy({ ...preview, publicEditorialPaths:["/", "//evil/"] }), /Unsafe/);
  assert.throws(() => validatePublicationPolicy({ ...preview, previewPaths:preview.previewPaths.filter((p) => p !== "/search/") }), /exclusions/);
});

test("metadata canonical retains origin, never borrows an unrelated pathname", () => {
  const meta = metadataForPage(approval, "/", "The site", "Original content");
  assert.equal(meta.canonical, "https://illustrative-seo-fixture.org/");
  assert.equal(meta.structuredData["@graph"][1].url, meta.canonical);
});
