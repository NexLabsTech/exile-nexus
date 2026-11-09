/** EXN-M01-WO-007: typed, fail-closed static SEO publication contract. */
export type PublicationStatus = "PREVIEW_ONLY" | "APPROVED";
export type RobotsDirective = "noindex,nofollow" | "index,follow";

export interface PublicationPolicy {
  schemaVersion: number;
  status: PublicationStatus;
  approvedSiteOrigin: string | null;
  approvalEvidence: string | null;
  publicEditorialPaths: string[];
  previewPaths: string[];
  notice: string;
}

export interface SeoResult {
  robots: RobotsDirective;
  canonical: string | null;
  structuredData: Record<string, unknown> | null;
  publishable: boolean;
}

const VALID_PATH = /^(?:\/(?:[a-z0-9-]+\/)*|\/404\.html)$/;
const EVIDENCE_ID = /^EXN-SEO-PUBLISH-[A-Z0-9-]{5,}$/;
const SITE_TITLE = "Exile Nexus";

function assertPath(path: string): void {
  if (!VALID_PATH.test(path) || path.includes("//")) {
    throw new Error(`Unsafe or noncanonical publication path: ${path}`);
  }
}

function approvedOrigin(origin: string): string {
  const url = new URL(origin);
  if (url.protocol !== "https:" || url.origin !== origin || url.username || url.password ||
      url.search || url.hash || url.pathname !== "/" || url.port) {
    throw new Error("Approved public site origin must be an absolute HTTPS origin with no path, query, fragment or port");
  }
  const host = url.hostname.toLowerCase();
  if (host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0" ||
      host.endsWith(".localhost") || host.endsWith(".invalid") || host.endsWith(".test") ||
      host.endsWith(".example") || host === "example.com" || host === "www.example.com") {
    throw new Error("Placeholder/private hostname must not become a public canonical origin");
  }
  return origin;
}

export function validatePublicationPolicy(policy: PublicationPolicy): PublicationPolicy {
  if (policy.schemaVersion !== 1 ||
      !["PREVIEW_ONLY", "APPROVED"].includes(policy.status) ||
      !Array.isArray(policy.publicEditorialPaths) || !Array.isArray(policy.previewPaths)) {
    throw new Error("Unsupported SEO publication policy schema");
  }
  if (!policy.publicEditorialPaths.includes("/")) throw new Error("Original Home must appear in public editorial path registry");
  const all = [...policy.publicEditorialPaths, ...policy.previewPaths];
  for (const path of all) assertPath(path);
  if (new Set(all).size !== all.length) throw new Error("Duplicated or conflicting public/preview publication path");
  if (!policy.previewPaths.includes("/search/") || !policy.previewPaths.includes("/ui-kit/") ||
      !policy.previewPaths.includes("/404.html")) {
    throw new Error("Required private/synthetic preview exclusions missing");
  }
  if (policy.status === "PREVIEW_ONLY") {
    if (policy.approvedSiteOrigin !== null || policy.approvalEvidence !== null)
      throw new Error("Preview policy may not declare an origin or approval");
  } else {
    if (!policy.approvedSiteOrigin || !policy.approvalEvidence ||
        !EVIDENCE_ID.test(policy.approvalEvidence)) {
      throw new Error("Publishable origin requires separately reviewed EXN-SEO-PUBLISH evidence");
    }
    approvedOrigin(policy.approvedSiteOrigin);
  }
  return policy;
}

export function allowedPublishedPaths(policy: PublicationPolicy): string[] {
  const checked = validatePublicationPolicy(policy);
  return checked.status === "APPROVED" ? [...checked.publicEditorialPaths] : [];
}

export function metadataForPage(
  policy: PublicationPolicy, path: string, title: string, description: string,
  requestedRobots: RobotsDirective = "index,follow",
): SeoResult {
  validatePublicationPolicy(policy);
  const blocked: SeoResult = { robots: "noindex,nofollow", canonical: null, structuredData: null, publishable: false };
  if (requestedRobots === "noindex,nofollow" || !allowedPublishedPaths(policy).includes(path)) return blocked;
  const origin = approvedOrigin(policy.approvedSiteOrigin!);
  const canonical = new URL(path, origin + "/").href;
  const graph: Record<string, unknown>[] = [{
    "@type": "WebPage",
    "@id": canonical + "#webpage",
    "url": canonical,
    "name": `${title} | ${SITE_TITLE}`,
    "description": description,
    "inLanguage": "en",
    "isAccessibleForFree": true,
  }];
  if (path === "/") {
    graph.unshift({
      "@type": "WebSite",
      "@id": canonical + "#website",
      "url": canonical,
      "name": SITE_TITLE,
      "description": "Independent, original dark-fantasy companion portal in development. No official game affiliation.",
      "inLanguage": "en",
    });
    (graph[1] as Record<string, unknown>).isPartOf = { "@id": canonical + "#website" };
  }
  return {
    robots: "index,follow",
    canonical,
    structuredData: { "@context": "https://schema.org", "@graph": graph },
    publishable: true,
  };
}

export function createRobotsTxt(policy: PublicationPolicy): string {
  const checked = validatePublicationPolicy(policy);
  if (checked.status === "PREVIEW_ONLY") return "User-agent: *\nDisallow: /\n";
  const lines = ["User-agent: *", "Allow: /", ...checked.previewPaths.map((path) => `Disallow: ${path}`)];
  lines.push(`Sitemap: ${checked.approvedSiteOrigin}/sitemap.xml`);
  return lines.join("\n") + "\n";
}

export function createSitemapXml(policy: PublicationPolicy): string {
  const checked = validatePublicationPolicy(policy);
  const paths = allowedPublishedPaths(checked);
  const urls = paths.map((path) => {
    const canonical = new URL(path, checked.approvedSiteOrigin! + "/").href;
    return `  <url><loc>${canonical}</loc></url>`;
  });
  return ['<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>', ''].join("\n");
}
