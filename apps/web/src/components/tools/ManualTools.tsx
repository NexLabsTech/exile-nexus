
import { useRef } from "react";
import { copy, formatMessage } from "../../i18n";
import {
  MAX_UPGRADES,
  calculateBuild,
  calculateEconomy,
  calculateFarm,
  type BuildScenario,
  type EconomyScenario,
  type FarmScenario,
  type ToolKind,
} from "../../lib/manual-tools";
import { ActionButton } from "../ui/ActionButton";
import { ManualField, ResultMetrics, ScenarioForm, percentage, withUnit, type FieldDefinition } from "./ScenarioForm";
import "../../styles/ui-kit.css";
import "../../styles/manual-tools.css";

const farmInitial: FarmScenario = {
  name: "", unit: "", cost: "", reward: "", runs: "", minutes: "", extra: "", fee: "", uncertainty: "",
};

const farmExample: FarmScenario = {
  name: "Practice scenario", unit: "tokens", cost: "10", reward: "20", runs: "10",
  minutes: "5", extra: "10", fee: "0", uncertainty: "25",
};

const farmFields: FieldDefinition<keyof FarmScenario>[] = [
  { key: "name", label: copy.manual.farmName },
  { key: "unit", label: copy.manual.unit, required: true },
  { key: "cost", label: copy.manual.cost, mode: "decimal", required: true },
  { key: "reward", label: copy.manual.reward, mode: "decimal", required: true },
  { key: "runs", label: copy.manual.runs, mode: "numeric", hint: copy.manual.runsHint, required: true },
  { key: "minutes", label: copy.manual.minutes, mode: "decimal", required: true },
  { key: "extra", label: copy.manual.extra, mode: "decimal" },
  { key: "fee", label: copy.manual.fee, mode: "decimal", hint: copy.manual.percentHint },
  { key: "uncertainty", label: copy.manual.uncertainty, mode: "decimal", hint: copy.manual.percentHint },
];

function FarmTool() {
  return (
    <ScenarioForm
      kind="farm"
      title={copy.manual.farmTitle}
      initial={farmInitial}
      example={farmExample}
      note={copy.manual.numberHint}
      calculate={calculateFarm}
      formula={<><p>{copy.manual.farmFormula}</p><p>{copy.manual.farmSensitivity}</p></>}
      renderFields={({ data, change, issue }) => (
        <div className="manual-fields">
          {farmFields.map((definition) => (
            <ManualField key={definition.key} definition={definition} value={data[definition.key]}
              onChange={(value) => change({ ...data, [definition.key]: value })} error={issue(definition.key)} />
          ))}
        </div>
      )}
      renderResults={(result, data) => (
        <>
          {data.name.trim() && <p className="manual-result-caption">{data.name.trim()}</p>}
          <ResultMetrics values={[
            [copy.manual.net, withUnit(result.net, data.unit.trim())],
            [copy.manual.perHour, withUnit(result.perHour, data.unit.trim(), "/hour")],
            [copy.manual.investment, withUnit(result.investment, data.unit.trim())],
            [copy.manual.gross, withUnit(result.gross, data.unit.trim())],
            [copy.manual.perRun, withUnit(result.perRun, data.unit.trim())],
            [copy.manual.roi, percentage(result.roi)],
            [copy.manual.breakEven, withUnit(result.breakEven, data.unit.trim())],
          ]} />
          {result.smallSample && <p className="manual-warning">{copy.manual.smallSample}</p>}
          {result.optimistic === null ? <p>{copy.manual.noSensitivity}</p> : (
            <ResultMetrics values={[
              [copy.manual.pessimistic, withUnit(result.pessimistic, data.unit.trim())],
              [copy.manual.optimistic, withUnit(result.optimistic, data.unit.trim())],
            ]} />
          )}
        </>
      )}
    />
  );
}

type Upgrade = BuildScenario["upgrades"][number];
type BuildField = Exclude<keyof BuildScenario, "rank" | "upgrades">;

const emptyUpgrade: Upgrade = { name: "", cost: "", damage: "", survival: "" };
const buildInitial: BuildScenario = {
  name: "", unit: "", survivalLabel: "", damage: "", survival: "", budget: "", rank: "damage",
  upgrades: [emptyUpgrade],
};

const buildFields: FieldDefinition<BuildField>[] = [
  { key: "name", label: copy.manual.buildName },
  { key: "unit", label: copy.manual.unit, required: true },
  { key: "damage", label: copy.manual.damage, mode: "decimal", required: true },
  { key: "survival", label: copy.manual.survival, mode: "decimal", required: true },
  { key: "survivalLabel", label: copy.manual.survivalLabel },
  { key: "budget", label: copy.manual.budget, mode: "decimal", required: true },
];

const upgradeFields: FieldDefinition<keyof Upgrade>[] = [
  { key: "name", label: copy.manual.upgradeName, required: true },
  { key: "cost", label: copy.manual.upgradeCost, mode: "decimal", required: true },
  { key: "damage", label: copy.manual.upgradeDamage, mode: "decimal", required: true },
  { key: "survival", label: copy.manual.upgradeSurvival, mode: "decimal", required: true },
];

const rankOptions: Record<BuildScenario["rank"], string> = {
  damage: copy.manual.rankDamage,
  survival: copy.manual.rankSurvival,
  cost: copy.manual.rankCost,
  efficiency: copy.manual.rankEfficiency,
};

function BuildTool() {
  const pendingUpgradeFocus = useRef<number | null>(null);

  return (
    <ScenarioForm
      kind="builds"
      title={copy.manual.buildTitle}
      initial={buildInitial}
      note={<>{copy.manual.buildDisclaimer} {copy.manual.numberHint}</>}
      calculate={calculateBuild}
      formula={<p>{copy.manual.buildFormula}</p>}
      renderFields={({ data, change, issue }) => (
        <>
          <div className="manual-fields">
            {buildFields.map((definition) => (
              <ManualField key={definition.key} definition={definition} value={data[definition.key]}
                onChange={(value) => change({ ...data, [definition.key]: value })} error={issue(definition.key)} />
            ))}
          </div>
          {data.upgrades.map((upgrade, index) => {
            const heading = formatMessage(copy.manual.upgrade, { number: String(index + 1) });
            return (
              <fieldset key={index} className="manual-group" ref={(row) => {
                if (row && pendingUpgradeFocus.current === index) {
                  pendingUpgradeFocus.current = null;
                  row.querySelector("input")?.focus();
                }
              }}>
                <legend>{heading}</legend>
                <div className="manual-fields">
                  {upgradeFields.map((definition) => (
                    <ManualField key={definition.key} definition={definition} value={upgrade[definition.key]}
                      error={issue(`upgrades.${index}.${definition.key}`)}
                      onChange={(value) => change({
                        ...data,
                        upgrades: data.upgrades.map((entry, row) =>
                          row === index ? { ...entry, [definition.key]: value } : entry),
                      })} />
                  ))}
                </div>
                {data.upgrades.length > 1 && (
                  <ActionButton variant="quiet" onClick={() => {
                    const upgrades = data.upgrades.filter((_, row) => row !== index);
                    pendingUpgradeFocus.current = Math.min(index, upgrades.length - 1);
                    change({ ...data, upgrades });
                  }}>{copy.manual.removeUpgrade}</ActionButton>
                )}
              </fieldset>
            );
          })}
          <ActionButton variant="secondary" disabled={data.upgrades.length >= MAX_UPGRADES}
            onClick={() => {
              pendingUpgradeFocus.current = data.upgrades.length;
              change({ ...data, upgrades: [...data.upgrades, emptyUpgrade] });
            }}>
            {copy.manual.addUpgrade}
          </ActionButton>
          <label className="manual-rank">
            <span className="ui-field__label">{copy.manual.rank}</span>
            <select className="ui-field__control" value={data.rank} onChange={(event) => {
              const rank = event.currentTarget.value as BuildScenario["rank"];
              change({ ...data, rank });
            }}>
              {Object.entries(rankOptions).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
        </>
      )}
      renderResults={(upgrades, data) => (
        <>
          {data.name.trim() && <p className="manual-result-caption">{data.name.trim()}</p>}
          <ol className="manual-upgrades" aria-label={copy.manual.ranked}>
            {upgrades.map((upgrade) => (
              <li key={upgrade.index}>
                <div className="manual-upgrade-heading">
                  <h4>{upgrade.name}</h4>
                  <span className={upgrade.affordable ? "manual-affordable" : "manual-warning"}>
                    {upgrade.affordable ? copy.manual.withinBudget : copy.manual.overBudget}
                  </span>
                </div>
                <ResultMetrics values={[
                  [copy.manual.upgradeCost, withUnit(upgrade.cost, data.unit.trim())],
                  [copy.manual.damageGain, upgrade.damageDelta],
                  [copy.manual.damagePercent, percentage(upgrade.damagePercent)],
                  [copy.manual.survivalGain, withUnit(upgrade.survivalDelta, data.survivalLabel.trim())],
                  [copy.manual.survivalPercent, percentage(upgrade.survivalPercent)],
                  [copy.manual.damageEfficiency, withUnit(upgrade.damageEfficiency, data.unit.trim())],
                  [copy.manual.survivalEfficiency, withUnit(upgrade.survivalEfficiency, data.unit.trim())],
                ]} />
              </li>
            ))}
          </ol>
        </>
      )}
    />
  );
}

const economyInitial: EconomyScenario = {
  unitFrom: "", unitTo: "", amount: "", rate: "", priceA: "", priceB: "", grossBenefit: "", totalCost: "",
};

const economyGroups: { title: string; fields: FieldDefinition<keyof EconomyScenario>[] }[] = [
  { title: copy.manual.conversion, fields: [
    { key: "unitFrom", label: copy.manual.unitFrom },
    { key: "unitTo", label: copy.manual.unitTo },
    { key: "amount", label: copy.manual.amount, mode: "decimal" },
    { key: "rate", label: copy.manual.rate, mode: "decimal" },
  ] },
  { title: copy.manual.priceCompare, fields: [
    { key: "priceA", label: copy.manual.priceA, mode: "decimal" },
    { key: "priceB", label: copy.manual.priceB, mode: "decimal" },
  ] },
  { title: copy.manual.costBenefit, fields: [
    { key: "grossBenefit", label: copy.manual.grossBenefit, mode: "decimal" },
    { key: "totalCost", label: copy.manual.totalCost, mode: "decimal" },
  ] },
];

const cheaperLabels = { a: copy.manual.cheaperA, b: copy.manual.cheaperB, tie: copy.manual.cheaperTie };

function EconomyTool() {
  return (
    <ScenarioForm
      kind="economy"
      title={copy.manual.economyTitle}
      initial={economyInitial}
      note={<><strong>{copy.manual.noFeed}</strong> {copy.manual.economyInstruction} {copy.manual.numberHint}</>}
      calculate={calculateEconomy}
      formula={<p>{copy.manual.economyFormula}</p>}
      renderFields={({ data, change, issue }) => (
        <>
          {economyGroups.map(({ title, fields }) => (
            <fieldset key={title} className="manual-group">
              <legend>{title}</legend>
              <div className="manual-fields">
                {fields.map((definition) => (
                  <ManualField key={definition.key} definition={definition} value={data[definition.key]}
                    onChange={(value) => change({ ...data, [definition.key]: value })} error={issue(definition.key)} />
                ))}
              </div>
            </fieldset>
          ))}
        </>
      )}
      renderResults={(result, data) => (
        <>
          {result.converted !== null && (
            <ResultMetrics values={[[copy.manual.converted, withUnit(result.converted, data.unitTo.trim())]]} />
          )}
          {result.cheaper !== null && (
            <ResultMetrics values={[
              [copy.manual.cheapest, cheaperLabels[result.cheaper]],
              [copy.manual.difference, result.difference],
              [copy.manual.variation, percentage(result.variation)],
            ]} />
          )}
          {result.net !== null && (
            <ResultMetrics values={[
              [copy.manual.netBenefit, result.net],
              [copy.manual.margin, percentage(result.margin)],
              [copy.manual.roi, percentage(result.roi)],
              [copy.manual.benefitCost, result.benefitCost],
            ]} />
          )}
        </>
      )}
    />
  );
}

export default function ManualTools({ kind }: { kind: ToolKind }) {
  if (kind === "farm") return <FarmTool />;
  if (kind === "builds") return <BuildTool />;
  return <EconomyTool />;
}
