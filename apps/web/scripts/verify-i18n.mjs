import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
export const PUBLIC_FILES = [
  "src/layouts/BaseLayout.astro",
  "src/pages/index.astro",
  "src/pages/[section]/index.astro",
  "src/pages/search/index.astro",
  "src/pages/ui-kit/index.astro",
  "src/pages/404.astro",
  "src/components/SiteHeader.astro",
  "src/components/SiteFooter.astro",
  "src/components/MobileNav.tsx",
  "src/components/search/GlobalSearch.tsx",
  "src/components/ui/UiShowcase.tsx",
  "src/components/ui/ActionButton.tsx",
  "src/components/ui/FeedbackPanel.tsx",
  "src/components/ui/TextField.tsx",
];

/** Explicit one-off literals remain proper names in the graphical SVG wordmark. */
const WORDMARK_LITERALS = new Set(["EXILE", "NEXUS", "EXILE NEXUS"]);

export function verifyCatalog(catalog, sourceMap, records) {
  const failures = [];
  const references = [];
  if (catalog?.$locale !== "en" || catalog?.$version !== 1) failures.push("Unexpected English catalog identity or version");
  const seenKeys = new Set();
  for (const [namespace, group] of Object.entries(catalog ?? {})) {
    if (namespace.startsWith("$")) continue;
    if (!group || Array.isArray(group) || typeof group !== "object") {
      failures.push(`Catalog namespace is not a string map: ${namespace}`);
      continue;
    }
    for (const [key, value] of Object.entries(group)) {
      const fullName = `${namespace}.${key}`;
      if (seenKeys.has(fullName)) failures.push(`Duplicated catalog key: ${fullName}`);
      seenKeys.add(fullName);
      if (typeof value !== "string" || !value.trim()) {
        failures.push(`Missing or empty catalog text: ${fullName}`);
        continue;
      }
      if (/<\/?[a-z][\s\S]*?>/i.test(value)) failures.push(`HTML is not permitted in catalog: ${fullName}`);
      const rest = value.replace(/\{([a-z][a-zA-Z0-9]*)\}/g, "");
      if (rest.includes("{") || rest.includes("}")) failures.push(`Invalid placeholder syntax: ${fullName}`);
    }
  }
  for (const [name, placeholders] of [
    ["home.featureLabel", ["name"]],
    ["search.oneResult", ["count"]],
    ["search.manyResults", ["count"]],
  ]) {
    const [group, key] = name.split(".");
    const template = catalog?.[group]?.[key];
    if (typeof template !== "string") {
      failures.push(`Missing required template: ${name}`);
      continue;
    }
    const actual = [...template.matchAll(/\{([a-z][a-zA-Z0-9]*)\}/g)].map((m) => m[1]);
    if (actual.join(",") !== placeholders.join(",")) failures.push(`Placeholder mismatch: ${name}`);
  }

  let filesScanned = 0;
  for (const file of PUBLIC_FILES) {
    const source = sourceMap[file];
    if (typeof source !== "string") {
      failures.push(`Public UI source missing from audit: ${file}`);
      continue;
    }
    filesScanned++;
    const mentioned = [...source.matchAll(/\bcopy\.([a-zA-Z][a-zA-Z0-9]*)\.([a-zA-Z][a-zA-Z0-9]*)/g)];
    for (const match of mentioned) {
      const name = `${match[1]}.${match[2]}`;
      references.push({ file, name });
      if (!Object.prototype.hasOwnProperty.call(catalog?.[match[1]] ?? {}, match[2]) ||
          typeof catalog[match[1]][match[2]] !== "string" || !catalog[match[1]][match[2]].trim()) {
        failures.push(`Unresolved localization key ${name} in ${file}`);
      }
    }
    if (file.endsWith(".astro")) {
      const html = source.replace(/^---[\s\S]*?---/, "");
      const literalStrings = [...html.matchAll(/>([^<>{}]+)</g)]
        .map((match) => match[1].trim())
        .filter((value) => /[a-z]/i.test(value) && !WORDMARK_LITERALS.has(value));
      for (const value of literalStrings) failures.push(`Hard-coded HTML copy in ${file}: ${value.slice(0, 80)}`);
      for (const match of html.matchAll(/\b(?:aria-label|placeholder|alt|title)=(["'])([^"'{}]+)\1/g)) {
        if (/[a-z]/i.test(match[2])) failures.push(`Hard-coded human-readable HTML attribute in ${file}: ${match[2]}`);
      }
    } else {
      const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TSX);
      function scan(node) {
        if (ts.isJsxText(node)) {
          const literal = node.getText(sourceFile).trim();
          if (/[a-z]/i.test(literal)) failures.push(`Hard-coded JSX copy in ${file}: ${literal.slice(0, 80)}`);
        }
        if (ts.isJsxAttribute(node)) {
          const key = node.name.getText(sourceFile);
          if (["aria-label", "placeholder", "alt", "title", "label"].includes(key) &&
              node.initializer && ts.isStringLiteral(node.initializer) &&
              /[a-z]/i.test(node.initializer.text)) {
            failures.push(`Hard-coded JSX attribute in ${file}: ${key}`);
          }
        }
        ts.forEachChild(node, scan);
      }
      scan(sourceFile);
    }
  }
  if (filesScanned !== PUBLIC_FILES.length) failures.push("English source coverage is incomplete");

  const routes = records.routes ?? [];
  const states = records.states ?? {};
  const fixtures = records.fixtures ?? [];
  if (routes.length !== 7) failures.push("Seven approved externalized navigation routes expected");
  for (const [i, route] of routes.entries()) {
    for (const key of ["slug", "href", "label", "short", "title", "description", "category", "eyebrow"]) {
      if (typeof route[key] !== "string" || !route[key].trim()) failures.push(`Missing route copy ${i}.${key}`);
    }
  }
  if (new Set(routes.map((r) => r.slug)).size !== routes.length) failures.push("Duplicate route localization");
  if (JSON.stringify(Object.keys(states).sort()) !== JSON.stringify(["empty","error","loading","success"])) failures.push("Incomplete UI feedback states");
  for (const [key, state] of Object.entries(states)) {
    if (!state?.title?.trim() || !state?.message?.trim()) failures.push(`Missing feedback text for ${key}`);
  }
  if (fixtures.length !== 3 || fixtures.some((x) => x.fictional !== true || !x.title || !x.summary)) {
    failures.push("Fictional search catalog is incomplete or mislabeled");
  }
  return { passed: failures.length === 0, locale: catalog?.$locale, catalogKeys: seenKeys.size,
    referencedKeys: new Set(references.map((x) => x.name)).size, filesScanned, failures };
}

export function runAudit(root = ROOT) {
  const read = (path) => readFileSync(join(root, path), "utf8");
  const catalog = JSON.parse(read("src/i18n/en.json"));
  const sourceMap = Object.fromEntries(PUBLIC_FILES.map((file) => [file, read(file)]));
  const records = {
    routes: JSON.parse(read("src/data/routes.json")),
    states: JSON.parse(read("src/data/ui-states.json")),
    fixtures: JSON.parse(read("src/data/search-fixtures.json")),
  };
  return verifyCatalog(catalog, sourceMap, records);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = runAudit();
    const output = process.argv.find((arg) => arg.startsWith("--output="))?.slice("--output=".length);
    if (output) {
      const dest = resolve(output);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, JSON.stringify(result, null, 2) + "\n");
    }
    console.log(JSON.stringify(result, null, 2));
    if (!result.passed) process.exitCode = 1;
  } catch (error) {
    console.error("EXN_I18N_GATE_ERROR", error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
