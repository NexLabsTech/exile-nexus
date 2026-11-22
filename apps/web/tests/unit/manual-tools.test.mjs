
import assert from "node:assert/strict";
import test from "node:test";
import {
  MAX_SCENARIO_BYTES,
  calculateBuild,
  calculateEconomy,
  calculateFarm,
  parseScenario,
  serializeScenario,
  ScenarioValidationError,
} from "../../src/lib/manual-tools.ts";

const farm = {
  name: "", unit: "tokens", cost: "10", reward: "20", runs: "10",
  minutes: "5", extra: "10", fee: "10", uncertainty: "25",
};
const build = {
  name: "", unit: "tokens", survivalLabel: "Life", damage: "100", survival: "200", budget: "10",
  rank: "damage", upgrades: [
    { name: "Balanced", cost: "8", damage: "110", survival: "260" },
    { name: "Heavy hit", cost: "11", damage: "150", survival: "180" },
  ],
};
const economy = {
  unitFrom: "shards", unitTo: "tokens", amount: "2.5", rate: "4",
  priceA: "4", priceB: "5", grossBenefit: "20", totalCost: "15",
};

test("farm reduces gross reward by fees and holds fixed expenses during sensitivity", () => {
  assert.deepEqual(calculateFarm(farm), {
    investment: "110", gross: "200", net: "70", perRun: "7", perHour: "84", roi: "63.636364",
    breakEven: "12.222222", optimistic: "115", pessimistic: "25", smallSample: false,
  });
});

test("farm represents an unavailable break-even and ROI without NaN or Infinity", () => {
  const result = calculateFarm({
    ...farm, cost: "0", extra: "", fee: "100", runs: "1", uncertainty: "",
  });
  assert.equal(result.net, "0");
  for (const key of ["roi", "breakEven", "optimistic", "pessimistic"]) assert.equal(result[key], null);
  assert.equal(result.smallSample, true);
});

test("farm avoids premature rounding and preserves bounded outliers", () => {
  const decimal = calculateFarm({
    ...farm, cost: "0.000002", reward: "0.000001", runs: "3", extra: "", fee: "50",
  });
  assert.equal(decimal.net, "-0.000005");
  assert.equal(decimal.perHour, "-0.000018");
  assert.equal(decimal.roi, "-75");
  const outlier = calculateFarm({
    ...farm, cost: "1000000000", reward: "1000000000", runs: "1000000", extra: "", fee: "",
  });
  assert.equal(outlier.investment, "1000000000000000");
  assert.equal(outlier.net, "0");
});

test("out-of-range and invalid inputs identify the rejected field", () => {
  for (const [change, field] of [
    [{ unit: "" }, "unit"], [{ runs: "0" }, "runs"], [{ runs: "1.5" }, "runs"],
    [{ runs: "1000001" }, "runs"], [{ fee: "100.1" }, "fee"], [{ cost: "-1" }, "cost"],
    [{ reward: "1000000001" }, "reward"], [{ reward: "Infinity" }, "reward"],
    [{ minutes: "0" }, "minutes"], [{ minutes: "0.0000001" }, "minutes"],
  ]) {
    assert.throws(() => calculateFarm({ ...farm, ...change }), (error) =>
      error instanceof ScenarioValidationError && error.field === field);
  }
});

test("build ranks by the selected metric and exposes separate positive-efficiency and budget values", () => {
  const [first, second] = calculateBuild(build);
  assert.deepEqual(first, {
    index: 1, name: "Heavy hit", cost: "11", damageDelta: "50", damagePercent: "50",
    survivalDelta: "-20", survivalPercent: "-10", damageEfficiency: "0.22",
    survivalEfficiency: null, affordable: false,
  });
  assert.equal(second.affordable, true);
  assert.equal(second.survivalEfficiency, "0.266667");
  assert.equal(calculateBuild({ ...build, rank: "cost" })[0].name, "Balanced");
  assert.equal(calculateBuild({ ...build, rank: "survival" })[0].name, "Balanced");
  assert.equal(calculateBuild({ ...build, rank: "efficiency" })[0].name, "Heavy hit");
});

test("build sorts exact efficiency and preserves entry order for ties and unavailable values", () => {
  const zeroBaseline = calculateBuild({ ...build, damage: "0", rank: "efficiency" });
  assert.deepEqual(zeroBaseline.map((row) => [row.index, row.damagePercent, row.damageEfficiency]),
    [[0, null, null], [1, null, null]]);
  const upgrades = [
    { name: "First", cost: "0.000001", damage: "999999998", survival: "1" },
    { name: "Better", cost: "0.000001", damage: "999999999", survival: "1" },
    { name: "Tie", cost: "0.000001", damage: "999999999", survival: "1" },
    { name: "Loss", cost: "0", damage: "0", survival: "1" },
  ];
  assert.deepEqual(calculateBuild({ ...build, rank: "efficiency", upgrades }).map((row) => row.index), [1, 2, 0, 3]);
});

test("economy calculates independent groups and returns unavailable ratios for zero baselines", () => {
  assert.deepEqual(calculateEconomy(economy), {
    converted: "10", difference: "1", variation: "25", cheaper: "a", net: "5", margin: "25",
    roi: "33.333333", benefitCost: "1.333333",
  });
  const local = calculateEconomy({
    ...economy, unitFrom: "", unitTo: "", amount: "", rate: "", priceA: "0", totalCost: "0",
  });
  assert.equal(local.converted, null);
  assert.equal(local.variation, null);
  assert.equal(local.roi, null);
  assert.equal(local.benefitCost, null);
  assert.throws(() => calculateEconomy({ ...economy, rate: "" }), { field: "rate" });
  assert.throws(() => calculateEconomy({ ...economy, rate: "0" }), { field: "rate" });
});

test("versioned import preserves all fields and synthetic provenance", () => {
  assert.deepEqual(parseScenario("farm", serializeScenario("farm", farm, "synthetic")), {
    scenario: farm, provenance: "synthetic",
  });
  assert.deepEqual(parseScenario("builds", serializeScenario("builds", build)), {
    scenario: build, provenance: "manual",
  });
  assert.deepEqual(parseScenario("economy", serializeScenario("economy", economy)), {
    scenario: economy, provenance: "manual",
  });
});

test("import rejects oversize, deep, cross-tool, unexpected and unsafe structures", () => {
  const encoded = serializeScenario("farm", farm);
  const envelope = JSON.parse(encoded);
  for (const value of [
    "{" , "[".repeat(100) + "]".repeat(100),
    encoded + " ".repeat(MAX_SCENARIO_BYTES),
    JSON.stringify({ ...envelope, version: 2 }),
    JSON.stringify({ ...envelope, provenance: "verified_market" }),
    JSON.stringify({ ...envelope, scenario: { ...farm, unknown: "value" } }),
    JSON.stringify({ ...envelope, scenario: { ...farm, unit: { nested: true } } }),
    JSON.stringify({ ...envelope, scenario: { ...farm, cost: "-1" } }),
    JSON.stringify({ ...envelope, scenario: { ...farm, unit: "\u0000" } }),
    encoded.replace(/"unit":\s*"tokens"/, '"unit":"tokens","__proto__":{"polluted":true}'),
  ]) {
    assert.throws(() => parseScenario("farm", value), ScenarioValidationError);
  }
  assert.throws(() => parseScenario("builds", encoded), ScenarioValidationError);
  assert.equal(Object.hasOwn(Object.prototype, "polluted"), false);
});

test("build import rejects an oversized upgrade array and unknown keys in a row", () => {
  const encoded = serializeScenario("builds", build);
  const envelope = JSON.parse(encoded);
  const withUpgrades = (upgrades) => JSON.stringify({ ...envelope, scenario: { ...build, upgrades } });
  assert.throws(() => parseScenario("builds", withUpgrades(Array(9).fill(build.upgrades[0]))), ScenarioValidationError);
  assert.throws(() => parseScenario("builds", withUpgrades([{ ...build.upgrades[0], constructor: {} }])), ScenarioValidationError);
});
