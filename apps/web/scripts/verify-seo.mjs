import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));

function findMeta(html, name) {
  const tag = html.match(new RegExp(`<meta\\s+[^>]*name=["']${name}["'][^>]*>`, "i"))?.[0] ?? "";
  return tag.match(/content=["']([^"']*)["']/i)?.[1] ?? null;
}

function findCanonical(html) {
  const tag = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i)?.[0] ?? "";
  return tag.match(/href=["']([^"']*)["']/i)?.[1] ?? null;
}

export function verifySeoBuild(distDir, policy) {
  const failures = [];
  const pages = [];
  if (policy.schemaVersion !== 1 || !["PREVIEW_ONLY", "APPROVED"].includes(policy.status)) {
    return { passed:false, pages:[], failures:["Unknown publication policy schema"] };
  }
  const publicationOrigin = policy.status === "APPROVED" ? policy.approvedSiteOrigin : null;
  const paths = [...policy.publicEditorialPaths, ...policy.previewPaths];
  if (paths.length !== new Set(paths).size) failures.push("Duplicated publication routes");
  for (const pathname of paths) {
    if (!/^\/(?:[a-z0-9-]+\/)*$/.test(pathname) && pathname !== "/404.html") {
      failures.push(`Unsafe route: ${pathname}`);
      continue;
    }
    const rel = pathname === "/" ? "index.html" : pathname === "/404.html" ? "404.html" : pathname.slice(1) + "index.html";
    const filename = join(distDir, rel);
    if (!existsSync(filename)) { failures.push(`Missing built route: ${rel}`); continue; }
    const html = readFileSync(filename, "utf8");
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() ?? "";
    const description = findMeta(html, "description");
    const robots = findMeta(html, "robots");
    const canonical = findCanonical(html);
    const ldMatch = html.match(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
    const shouldPublish = policy.status === "APPROVED" && policy.publicEditorialPaths.includes(pathname);
    const expectedRobots = shouldPublish ? "index,follow" : "noindex,nofollow";
    if (!title || !description) failures.push(`Missing title/description: ${rel}`);
    if (robots !== expectedRobots) failures.push(`Wrong robots for ${rel}: ${robots}`);
    const expectedCanonical = shouldPublish ? new URL(pathname, publicationOrigin + "/").href : null;
    if (canonical !== expectedCanonical) failures.push(`Wrong canonical for ${rel}: ${canonical}`);
    if (shouldPublish) {
      if (!ldMatch) failures.push(`Missing structured JSON-LD for approved ${rel}`);
      else {
        try {
          const data = JSON.parse(ldMatch[1]);
          if (data["@context"] !== "https://schema.org" ||
              !Array.isArray(data["@graph"]) ||
              !data["@graph"].some((entry) => entry["@type"] === "WebPage" && entry.url === expectedCanonical)) {
            failures.push(`Invalid structured JSON-LD for ${rel}`);
          }
        } catch {
          failures.push(`Unparseable structured JSON-LD for ${rel}`);
        }
      }
    } else if (ldMatch) {
      failures.push(`Unapproved route has public structured data: ${rel}`);
    }
    if (!/<html\s+[^>]*lang=["']en["']/i.test(html)) failures.push(`Missing English language marker: ${rel}`);
    pages.push({ pathname, title, description, robots, canonical, structuredData: Boolean(ldMatch) });
  }
  for (const field of ["title", "description"]) {
    const values = pages.map((page) => page[field]).filter(Boolean);
    if (new Set(values).size !== values.length) failures.push(`Duplicate ${field} across generated pages`);
  }
  const robotsFile = join(distDir, "robots.txt");
  const sitemapFile = join(distDir, "sitemap.xml");
  if (!existsSync(robotsFile) || !existsSync(sitemapFile)) {
    failures.push("Missing generated robots.txt or sitemap.xml");
  } else {
    const robots = readFileSync(robotsFile, "utf8");
    const sitemap = readFileSync(sitemapFile, "utf8");
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    if (!sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
      failures.push("Invalid sitemap namespace");
    }
    if (policy.status === "PREVIEW_ONLY") {
      if (robots !== "User-agent: *\nDisallow: /\n") failures.push("Preview robots must deny all crawlers");
      if (locs.length > 0) failures.push("Unapproved sitemap must remain empty");
    } else {
      const expected = policy.publicEditorialPaths.map((pathname) => new URL(pathname, publicationOrigin + "/").href);
      if (JSON.stringify(locs) !== JSON.stringify(expected)) failures.push("Published sitemap is stale or exposes unapproved page");
      if (!robots.includes(`Sitemap: ${publicationOrigin}/sitemap.xml`) ||
          !policy.previewPaths.every((pathname) => robots.includes(`Disallow: ${pathname}`))) {
        failures.push("Approved robots does not protect preview paths or cite sitemap");
      }
    }
  }
  return { passed: failures.length === 0, pages, failures, publicationStatus: policy.status,
    originApproved: Boolean(publicationOrigin), publishedPages: pages.filter((page) => page.robots === "index,follow").length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const policy = JSON.parse(readFileSync(join(ROOT, "src/data/publication-policy.json"), "utf8"));
    const result = verifySeoBuild(join(ROOT, "dist"), policy);
    const output = process.argv.find((arg) => arg.startsWith("--output="))?.slice("--output=".length);
    if (output) {
      const target = resolve(output);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, JSON.stringify(result, null, 2) + "\n");
    }
    console.log(JSON.stringify({ passed:result.passed, publicationStatus:result.publicationStatus,
      publishedPages:result.publishedPages, pagesChecked:result.pages.length, failures:result.failures }, null, 2));
    if (!result.passed) process.exitCode = 1;
  } catch (error) {
    console.error("EXN_SEO_GATE_FAILED", error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
