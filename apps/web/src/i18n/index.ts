import en from "./en.json";

/** Exact, reviewable English-only catalog. There is no language negotiation in this WO. */
export const locale = "en" as const;
export const copy = en;

/**
 * Deterministic formatting for static catalog placeholders. It does not render HTML.
 * Missing, malformed or surplus parameters are errors, never silently dropped.
 */
export function formatMessage(template: string, params: Readonly<Record<string, string | number>>): string {
  const names = [...template.matchAll(/\{([a-z][a-zA-Z0-9]*)\}/g)].map((match) => match[1]);
  const expected = new Set(names);
  if (/\{[^{}]*\}/.test(template.replace(/\{[a-z][a-zA-Z0-9]*\}/g, "")) ||
      template.includes("{{") || template.includes("}}")) {
    throw new Error("Invalid catalog placeholder syntax");
  }
  for (const key of expected) {
    if (!Object.prototype.hasOwnProperty.call(params, key)) {
      throw new Error(`Missing localization placeholder: ${key}`);
    }
    const value = params[key];
    if (!["number", "string"].includes(typeof value) ||
        (typeof value === "number" && !Number.isFinite(value))) {
      throw new Error(`Invalid localization placeholder value: ${key}`);
    }
  }
  for (const key of Object.keys(params)) {
    if (!expected.has(key)) throw new Error(`Unknown localization placeholder: ${key}`);
  }
  return template.replace(/\{([a-z][a-zA-Z0-9]*)\}/g, (_, key: string) => String(params[key]));
}
