
export type ToolKind = "farm" | "builds" | "economy";
type Provenance = "manual" | "synthetic";

export interface FarmScenario {
  name: string;
  unit: string;
  cost: string;
  reward: string;
  runs: string;
  minutes: string;
  extra: string;
  fee: string;
  uncertainty: string;
}

interface Upgrade {
  name: string;
  cost: string;
  damage: string;
  survival: string;
}

export interface BuildScenario {
  name: string;
  unit: string;
  survivalLabel: string;
  damage: string;
  survival: string;
  budget: string;
  rank: "damage" | "survival" | "cost" | "efficiency";
  upgrades: Upgrade[];
}

export interface EconomyScenario {
  unitFrom: string;
  unitTo: string;
  amount: string;
  rate: string;
  priceA: string;
  priceB: string;
  grossBenefit: string;
  totalCost: string;
}

export interface ScenarioByKind {
  farm: FarmScenario;
  builds: BuildScenario;
  economy: EconomyScenario;
}

export const MAX_UPGRADES = 8;
export const MAX_SCENARIO_BYTES = 16_384;
const MAX_FILE_DEPTH = 4;
const SCALE = 1_000_000n;
const PERCENT = 100n * SCALE;
const MAX_VALUE = 1_000_000_000n * SCALE;
const SCHEMA_VERSION = 1;

export class ScenarioValidationError extends Error {
  readonly field: string;
  readonly code: "invalid" | "required" | "bounds" | "file";

  constructor(field: string, code: ScenarioValidationError["code"]) {
    super(`${field}: ${code}`);
    this.name = "ScenarioValidationError";
    this.field = field;
    this.code = code;
  }
}

function label(value: string, field: string, required: boolean): string {
  const text = value.trim();
  if (!text && required) throw new ScenarioValidationError(field, "required");
  if (value.length > 60) throw new ScenarioValidationError(field, "bounds");
  if (Array.from(value).some((char) => {
    const code = char.charCodeAt(0);
    return code < 32 || (code >= 127 && code <= 159)
      || (code >= 0x202a && code <= 0x202e) || (code >= 0x2066 && code <= 0x2069);
  })) throw new ScenarioValidationError(field, "invalid");
  return text;
}

function decimal(value: string, field: string, options: {
  optional?: boolean;
  max?: bigint;
  positive?: boolean;
} = {}): bigint {
  const text = value.trim();
  if (!text && options.optional) return 0n;
  if (!text) throw new ScenarioValidationError(field, "required");
  if (!/^(?:\d{1,10}(?:\.\d{1,6})?|\.\d{1,6})$/.test(text) || value.length > 20) {
    throw new ScenarioValidationError(field, "invalid");
  }
  const [integer, fractional = ""] = text.split(".");
  const parsed = BigInt(integer || "0") * SCALE + BigInt(fractional.padEnd(6, "0"));
  if (parsed > (options.max ?? MAX_VALUE) || (options.positive && parsed === 0n)) {
    throw new ScenarioValidationError(field, "bounds");
  }
  return parsed;
}

function runCount(value: string): bigint {
  const text = value.trim();
  if (!text) throw new ScenarioValidationError("runs", "required");
  if (!/^\d{1,7}$/.test(text) || value.length > 20) {
    throw new ScenarioValidationError("runs", "invalid");
  }
  const parsed = BigInt(text);
  if (parsed < 1n || parsed > 1_000_000n) throw new ScenarioValidationError("runs", "bounds");
  return parsed;
}

/** Round a rational number of millionths only at display time, with halves away from zero. */
function display(numerator: bigint, denominator = 1n): string | null {
  if (denominator === 0n) return null;
  const absolute = numerator < 0n ? -numerator : numerator;
  const rounded = (absolute + denominator / 2n) / denominator;
  const sign = numerator < 0n && rounded !== 0n ? "-" : "";
  const fraction = String(rounded % SCALE).padStart(6, "0").replace(/0+$/, "");
  return sign + String(rounded / SCALE) + (fraction ? "." + fraction : "");
}

export function calculateFarm(input: FarmScenario) {
  label(input.name, "name", false);
  label(input.unit, "unit", true);
  const runs = runCount(input.runs);
  const minutes = decimal(input.minutes, "minutes", { positive: true });
  const investment = decimal(input.cost, "cost") * runs + decimal(input.extra, "extra", { optional: true });
  const gross = decimal(input.reward, "reward") * runs;
  const fee = decimal(input.fee, "fee", { optional: true, max: PERCENT });
  const allowance = PERCENT - fee;
  const netNumerator = gross * allowance - investment * PERCENT;

  let optimistic: string | null = null;
  let pessimistic: string | null = null;
  if (input.uncertainty.trim()) {
    const range = decimal(input.uncertainty, "uncertainty", { max: PERCENT });
    const denominator = PERCENT * PERCENT;
    optimistic = display(gross * (PERCENT + range) * allowance - investment * denominator, denominator);
    pessimistic = display(gross * (PERCENT - range) * allowance - investment * denominator, denominator);
  }

  return {
    investment: display(investment),
    gross: display(gross),
    net: display(netNumerator, PERCENT),
    perRun: display(netNumerator, PERCENT * runs),
    perHour: display(netNumerator * 60n * SCALE, PERCENT * runs * minutes),
    roi: display(netNumerator, investment),
    breakEven: display(investment * PERCENT, runs * allowance),
    optimistic,
    pessimistic,
    smallSample: runs < 10n,
  };
}

function order(left: bigint, right: bigint): number {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

function efficiency(cost: bigint, baseline: bigint, delta: bigint): string | null {
  return baseline > 0n && delta > 0n ? display(cost * baseline, delta * 100n) : null;
}

function efficiencyOrder(left: { delta: bigint; cost: bigint }, right: { delta: bigint; cost: bigint }, baseline: bigint) {
  if (baseline === 0n) return 0;
  const leftValid = left.delta > 0n;
  const rightValid = right.delta > 0n;
  if (!leftValid || !rightValid) return Number(rightValid) - Number(leftValid);
  return order(left.cost * right.delta, right.cost * left.delta);
}

export function calculateBuild(input: BuildScenario) {
  label(input.name, "name", false);
  label(input.unit, "unit", true);
  label(input.survivalLabel, "survivalLabel", false);
  const damage = decimal(input.damage, "damage");
  const survival = decimal(input.survival, "survival");
  const budget = decimal(input.budget, "budget");
  if (input.upgrades.length < 1 || input.upgrades.length > MAX_UPGRADES) {
    throw new ScenarioValidationError("upgrades", "bounds");
  }

  const rows = input.upgrades.map((upgrade, index) => {
    const field = `upgrades.${index}.`;
    return {
      index,
      name: label(upgrade.name, field + "name", true),
      cost: decimal(upgrade.cost, field + "cost"),
      delta: decimal(upgrade.damage, field + "damage") - damage,
      survivalDelta: decimal(upgrade.survival, field + "survival") - survival,
    };
  });
  rows.sort((left, right) => {
    let comparison: number;
    switch (input.rank) {
      case "damage": comparison = order(right.delta, left.delta); break;
      case "survival": comparison = order(right.survivalDelta, left.survivalDelta); break;
      case "cost": comparison = order(left.cost, right.cost); break;
      case "efficiency": comparison = efficiencyOrder(left, right, damage); break;
      default: throw new ScenarioValidationError("rank", "invalid");
    }
    return comparison || left.index - right.index;
  });
  return rows.map((row) => ({
    index: row.index,
    name: row.name,
    cost: display(row.cost),
    damageDelta: display(row.delta),
    damagePercent: display(row.delta * PERCENT, damage),
    survivalDelta: display(row.survivalDelta),
    survivalPercent: display(row.survivalDelta * PERCENT, survival),
    damageEfficiency: efficiency(row.cost, damage, row.delta),
    survivalEfficiency: efficiency(row.cost, survival, row.survivalDelta),
    affordable: row.cost <= budget,
  }));
}

export function calculateEconomy(input: EconomyScenario) {
  const hasConversion = [input.unitFrom, input.unitTo, input.amount, input.rate].some((value) => value.trim());
  const hasPrices = Boolean(input.priceA.trim() || input.priceB.trim());
  const hasEstimate = Boolean(input.grossBenefit.trim() || input.totalCost.trim());
  if (!hasConversion && !hasPrices && !hasEstimate) throw new ScenarioValidationError("scenario", "required");

  let converted: string | null = null;
  if (hasConversion) {
    label(input.unitFrom, "unitFrom", true);
    label(input.unitTo, "unitTo", true);
    converted = display(decimal(input.amount, "amount") * decimal(input.rate, "rate", { positive: true }), SCALE);
  }

  let difference: string | null = null;
  let variation: string | null = null;
  let cheaper: "a" | "b" | "tie" | null = null;
  if (hasPrices) {
    const priceA = decimal(input.priceA, "priceA");
    const delta = decimal(input.priceB, "priceB") - priceA;
    difference = display(delta);
    variation = display(delta * PERCENT, priceA);
    cheaper = delta === 0n ? "tie" : delta > 0n ? "a" : "b";
  }

  let net: string | null = null;
  let margin: string | null = null;
  let roi: string | null = null;
  let benefitCost: string | null = null;
  if (hasEstimate) {
    const benefit = decimal(input.grossBenefit, "grossBenefit");
    const cost = decimal(input.totalCost, "totalCost");
    const delta = benefit - cost;
    net = display(delta);
    margin = display(delta * PERCENT, benefit);
    roi = display(delta * PERCENT, cost);
    benefitCost = display(benefit * SCALE, cost);
  }
  return { converted, difference, variation, cheaper, net, margin, roi, benefitCost };
}

const fields = {
  farm: ["name", "unit", "cost", "reward", "runs", "minutes", "extra", "fee", "uncertainty"],
  builds: ["name", "unit", "survivalLabel", "damage", "survival", "budget", "rank"],
  economy: ["unitFrom", "unitTo", "amount", "rate", "priceA", "priceB", "grossBenefit", "totalCost"],
} as const;
const upgradeFields = ["name", "cost", "damage", "survival"] as const;

function recordWithKeys(value: unknown, keys: readonly string[]): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Object.getPrototypeOf(value) !== Object.prototype ||
      Object.keys(value).length !== keys.length || !keys.every((key) => Object.hasOwn(value, key))) {
    throw new ScenarioValidationError("scenario", "file");
  }
  return value as Record<string, unknown>;
}

function hasOnlyStrings(record: Record<string, unknown>, keys: readonly string[]) {
  if (!keys.every((key) => typeof record[key] === "string")) {
    throw new ScenarioValidationError("scenario", "file");
  }
}

function validateScenario<K extends ToolKind>(kind: K, value: unknown): ScenarioByKind[K] {
  const keys = fields[kind];
  const data = recordWithKeys(value, kind === "builds" ? [...keys, "upgrades"] : keys);
  hasOnlyStrings(data, keys);
  if (kind === "builds") {
    const ranks = ["damage", "survival", "cost", "efficiency"];
    if (!ranks.includes(data.rank as string) || !Array.isArray(data.upgrades) ||
        data.upgrades.length < 1 || data.upgrades.length > MAX_UPGRADES) {
      throw new ScenarioValidationError("scenario", "file");
    }
    for (const entry of data.upgrades) hasOnlyStrings(recordWithKeys(entry, upgradeFields), upgradeFields);
    calculateBuild(data as unknown as BuildScenario);
  } else if (kind === "farm") {
    calculateFarm(data as unknown as FarmScenario);
  } else {
    calculateEconomy(data as unknown as EconomyScenario);
  }
  return data as unknown as ScenarioByKind[K];
}

/** Bound structural depth before parsing. JSON.parse remains responsible for grammar. */
function checkFileBounds(text: string) {
  if (text.length > MAX_SCENARIO_BYTES || new TextEncoder().encode(text).length > MAX_SCENARIO_BYTES) {
    throw new ScenarioValidationError("scenario", "file");
  }
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (const character of text) {
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
    } else if (character === '"') {
      inString = true;
    } else if (character === "{" || character === "[") {
      depth++;
      if (depth > MAX_FILE_DEPTH) throw new ScenarioValidationError("scenario", "file");
    } else if (character === "}" || character === "]") {
      depth--;
      if (depth < 0) throw new ScenarioValidationError("scenario", "file");
    }
  }
}

export function parseScenario<K extends ToolKind>(kind: K, text: string): {
  scenario: ScenarioByKind[K]; provenance: Provenance;
} {
  checkFileBounds(text);
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new ScenarioValidationError("scenario", "file");
  }

  const { version, kind: source, provenance, scenario } = recordWithKeys(raw, ["version", "kind", "provenance", "scenario"]);
  if (version !== SCHEMA_VERSION || source !== kind || (provenance !== "manual" && provenance !== "synthetic")) {
    throw new ScenarioValidationError("scenario", "file");
  }
  return { scenario: validateScenario(kind, scenario), provenance };
}

export function serializeScenario<K extends ToolKind>(
  kind: K,
  scenario: ScenarioByKind[K],
  provenance: Provenance = "manual",
): string {
  validateScenario(kind, scenario);
  if (provenance !== "manual" && provenance !== "synthetic") {
    throw new ScenarioValidationError("scenario", "file");
  }
  const text = JSON.stringify({ version: SCHEMA_VERSION, kind, provenance, scenario }, null, 2) + "\n";
  checkFileBounds(text);
  return text;
}
