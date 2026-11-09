import en from "./en.json";

/** Exact, reviewable English-only catalog. There is no language negotiation in this WO. */
export const locale = "en" as const;
export const copy = en;

export { formatMessage } from "./format";
