/** English-only, fail-closed interpolation. Never treats catalog text as HTML. */
export function formatMessage(template: string, params: Readonly<Record<string, string | number>>): string {
  const placeholder = /\{([a-z][a-zA-Z0-9]*)\}/g;
  const named = [...template.matchAll(placeholder)].map((m) => m[1]);
  const expected = new Set(named);
  const unrecognized = template.replace(/\{([a-z][a-zA-Z0-9]*)\}/g, "");
  if (unrecognized.includes("{") || unrecognized.includes("}")) {
    throw new Error("Malformed localization placeholder");
  }
  for (const name of expected) {
    if (!Object.prototype.hasOwnProperty.call(params, name)) {
      throw new Error(`Missing localization placeholder: ${name}`);
    }
    const value = params[name];
    if ((typeof value !== "string" && typeof value !== "number") ||
        (typeof value === "number" && !Number.isFinite(value))) {
      throw new Error(`Invalid localization placeholder: ${name}`);
    }
  }
  for (const key of Object.keys(params)) {
    if (!expected.has(key)) throw new Error(`Unexpected localization placeholder: ${key}`);
  }
  return template.replace(placeholder, (_, key: string) => String(params[key]));
}
