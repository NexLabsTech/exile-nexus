import records from "../data/routes.json";

export interface RouteEntry {
  slug: string;
  href: string;
  label: string;
  short: string;
  category: string;
  eyebrow: string;
  title: string;
  description: string;
  mark: string;
}

export const routes: readonly RouteEntry[] = records;

export function isCurrentPath(pathname: string, href: string): boolean {
  const normalize = (value: string): string => value.replace(/\/+$/, "") || "/";
  return normalize(pathname) === normalize(href);
}

export function sectionForSlug(slug: string): RouteEntry | undefined {
  return routes.find((route) => route.slug === slug);
}
