/**
 * EXN-M01-WO-006. Search is deliberately limited to our own public routes and
 * clearly labeled synthetic fixtures until a separately approved rights gate
 * authorizes an external adapter. An "AUTHORIZED" string alone is not proof.
 */
export type SearchOrigin = "internal-navigation" | "synthetic" | "external";
export type Permission = "INTERNAL" | "SYNTHETIC" | "AUTHORIZED" | "CONDITIONAL" | "UNVERIFIED" | "PROHIBITED";
export interface SearchRecord {
  id: string;
  title: string;
  summary: string;
  category: string;
  href: string;
  origin: SearchOrigin;
  permission: Permission;
  sourceLabel: string;
  sourceVersion: string;
  observedAt: string | null;
  expiresAt: string | null;
  evidenceId: string | null;
}
export interface NavigationRoute {
  slug: string;
  href: string;
  label: string;
  description: string;
  category: string;
}
export interface SyntheticFixture {
  id: string;
  title: string;
  summary: string;
  category: string;
  href: string;
  fictional: true;
}
export interface SearchResponse {
  state: "ready" | "empty" | "error";
  records: SearchRecord[];
  message: string;
}

const MAX_QUERY_LENGTH = 80;
const MAX_RESULTS = 20;
const SAFE_LOCAL_ROUTE = /^\/[a-z0-9/-]*\/$/;

function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
}

function safeRoute(href: string): boolean {
  return SAFE_LOCAL_ROUTE.test(href) && !href.includes("//");
}

function isAllowed(record: SearchRecord, allowedHrefs: ReadonlySet<string>): boolean {
  if (!record || !safeRoute(record.href) || !allowedHrefs.has(record.href)) return false;
  if (!record.id.trim() || !record.title.trim() || !record.summary.trim()) return false;
  if (record.origin === "internal-navigation") {
    return record.permission === "INTERNAL" && record.sourceLabel === "Exile Nexus navigation";
  }
  if (record.origin === "synthetic") {
    return record.permission === "SYNTHETIC" && record.sourceLabel === "Fictional demo fixture";
  }
  // An external source requires a separately approved rights adapter, which does
  // not exist in this Work Order. Even a forged AUTHORIZED marker fails closed.
  return false;
}

export function createSearchIndex(routes: readonly NavigationRoute[], fixtures: readonly SyntheticFixture[]): SearchRecord[] {
  const allowedHrefs = new Set(routes.filter((route) => safeRoute(route.href)).map((route) => route.href));
  const navigation: SearchRecord[] = routes.map((route) => ({
    id: `page:${route.slug}`,
    title: route.label,
    summary: route.description,
    category: route.category,
    href: route.href,
    origin: "internal-navigation",
    permission: "INTERNAL",
    sourceLabel: "Exile Nexus navigation",
    sourceVersion: "current static site build",
    observedAt: null,
    expiresAt: null,
    evidenceId: null,
  }));
  const demos: SearchRecord[] = fixtures
    .filter((fixture) => fixture.fictional === true)
    .map((fixture) => ({
      id: `demo:${fixture.id}`,
      title: fixture.title,
      summary: fixture.summary,
      category: fixture.category,
      href: fixture.href,
      origin: "synthetic",
      permission: "SYNTHETIC",
      sourceLabel: "Fictional demo fixture",
      sourceVersion: "fixture-v1",
      observedAt: null,
      expiresAt: null,
      evidenceId: null,
    }));
  const seen = new Set<string>();
  return [...navigation, ...demos].filter((record) => {
    if (!isAllowed(record, allowedHrefs) || seen.has(record.id)) return false;
    seen.add(record.id);
    return true;
  });
}

export function searchRecords(index: readonly SearchRecord[], rawQuery: string, allowedRoutes: readonly NavigationRoute[]): SearchResponse {
  if (rawQuery.length > MAX_QUERY_LENGTH) {
    return { state: "error", records: [], message: "Search query exceeds the 80-character limit." };
  }
  const allowedHrefs = new Set(allowedRoutes.map((route) => route.href).filter(safeRoute));
  const permitted = index.filter((record) => isAllowed(record, allowedHrefs));
  const terms = normalize(rawQuery).split(" ").filter(Boolean);
  if (!terms.length) {
    return { state: permitted.length ? "ready" : "empty", records: permitted.slice(0, MAX_RESULTS), message: "Showing local pages and fictional examples only." };
  }
  const scored = permitted.flatMap((record, position) => {
    const title = normalize(record.title);
    const category = normalize(record.category);
    const summary = normalize(record.summary);
    const tokens = [title, category, summary];
    if (!terms.every((term) => tokens.some((value) => value.includes(term)))) return [];
    const rank = terms.reduce((value, term) =>
      value + (title === term ? 50 : title.startsWith(term) ? 25 : title.includes(term) ? 12 : category.includes(term) ? 6 : 1), 0);
    return [{ record, rank, position }];
  });
  scored.sort((left, right) => right.rank - left.rank || left.position - right.position);
  const records = scored.slice(0, MAX_RESULTS).map((item) => item.record);
  return {
    state: records.length ? "ready" : "empty",
    records,
    message: records.length ? `${records.length} local result${records.length === 1 ? "" : "s"} found.` : "No matching local pages or fictional examples.",
  };
}
