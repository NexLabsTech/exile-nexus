
import { useEffect, useState, type ChangeEvent, type SubmitEvent, type ReactNode } from "react";
import { copy } from "../../i18n";
import {
  MAX_SCENARIO_BYTES,
  ScenarioValidationError,
  parseScenario,
  serializeScenario,
  type ScenarioByKind,
  type ToolKind,
} from "../../lib/manual-tools";
import { ActionButton } from "../ui/ActionButton";
import { TextField } from "../ui/TextField";

interface FormContext<Data> {
  data: Data;
  change(data: Data): void;
  issue(field: string): string | undefined;
}

interface ScenarioFormProps<K extends ToolKind, Result> {
  kind: K;
  title: string;
  initial: ScenarioByKind[K];
  example?: ScenarioByKind[K];
  note: ReactNode;
  formula: ReactNode;
  calculate(data: ScenarioByKind[K]): Result;
  renderFields(context: FormContext<ScenarioByKind[K]>): ReactNode;
  renderResults(result: Result, data: ScenarioByKind[K]): ReactNode;
}

function errorCopy(code: string): string {
  if (code === "required") return copy.manual.required;
  if (code === "bounds") return copy.manual.bounds;
  return copy.manual.invalid;
}

export function ScenarioForm<K extends ToolKind, Result>({
  kind, title, initial, example, note, formula, calculate, renderFields, renderResults,
}: ScenarioFormProps<K, Result>) {
  const [data, setData] = useState(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [provenance, setProvenance] = useState<"manual" | "synthetic">("manual");
  const [edited, setEdited] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [issue, setIssue] = useState<{ field?: string; message: string }>();
  const [notice, setNotice] = useState("");
  const [reading, setReading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  function replace(next: ScenarioByKind[K]) {
    setData(next);
    setResult(null);
    setIssue(undefined);
    setNotice("");
    setConfirming(false);
  }

  function change(next: ScenarioByKind[K]) {
    replace(next);
    if (provenance === "synthetic") setEdited(true);
  }

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setIssue(undefined);
    setNotice("");
    setConfirming(false);
    try {
      setResult(calculate(data));
    } catch (error) {
      setResult(null);
      setIssue(error instanceof ScenarioValidationError
        ? { field: error.field, message: errorCopy(error.code) }
        : { message: copy.manual.invalid });
    }
  }

  async function importFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    setIssue(undefined);
    setNotice("");
    setReading(true);
    try {
      if (file.size > MAX_SCENARIO_BYTES) throw new Error();
      const text = new TextDecoder("utf-8", { fatal: true }).decode(await file.arrayBuffer());
      const imported = parseScenario(kind, text);
      replace(imported.scenario);
      setProvenance(imported.provenance);
      setEdited(false);
      setNotice(copy.manual.imported);
    } catch {
      setIssue({ message: copy.manual.fileError });
    } finally {
      setReading(false);
    }
  }

  function exportFile() {
    setIssue(undefined);
    setNotice("");
    try {
      const contents = serializeScenario(kind, data, provenance);
      const url = URL.createObjectURL(new Blob([contents], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `exile-nexus-${kind}.json`;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice(copy.manual.exported);
    } catch {
      setIssue({ message: copy.manual.exportError });
    }
  }

  return (
    <form aria-label={title} className="manual-tool" onSubmit={submit} noValidate>
      <p className="manual-note">{note}</p>
      <p className="manual-provenance">
        {provenance === "synthetic"
          ? edited ? copy.manual.editedSynthetic : copy.manual.synthetic
          : copy.manual.manual}
      </p>
      <fieldset className="manual-editable" disabled={!ready || reading}>
        {renderFields({ data, change, issue: (field) => issue?.field === field ? issue.message : undefined })}
        <div className="manual-actions">
          <ActionButton type="submit">{copy.manual.calculate}</ActionButton>
          {example && (
            <ActionButton variant="secondary" onClick={() => {
              replace(example);
              setProvenance("synthetic");
              setEdited(false);
            }}>{copy.manual.loadExample}</ActionButton>
          )}
          <ActionButton variant="quiet" onClick={exportFile}>{copy.manual.export}</ActionButton>
          <ActionButton variant="quiet" onClick={() => setConfirming(true)}>{copy.manual.reset}</ActionButton>
        </div>
        {confirming && (
          <div className="manual-confirm">
            <p>{copy.manual.confirm}</p>
            <div className="manual-actions">
              <ActionButton variant="secondary" onClick={() => {
                replace(initial);
                setProvenance("manual");
                setEdited(false);
              }}>{copy.manual.confirmReset}</ActionButton>
              <ActionButton variant="quiet" onClick={() => setConfirming(false)}>{copy.manual.cancel}</ActionButton>
            </div>
          </div>
        )}
        <TextField className="manual-import" type="file" label={copy.manual.import} accept=".json,application/json" onChange={importFile} />
      </fieldset>
      {issue && <p className="manual-error" role="alert">{issue.message}</p>}
      <div className="manual-announcement" role="status">
        {reading ? copy.manual.importing : notice}
      </div>
      <section className="manual-results" aria-live="polite">
        <h3>{copy.manual.result}</h3>
        {result === null ? <p>{copy.manual.empty}</p> : renderResults(result, data)}
      </section>
      <details className="manual-method">
        <summary>{copy.manual.formula}</summary>
        {formula}
        <p>{copy.manual.division}</p>
      </details>
    </form>
  );
}

export interface FieldDefinition<Key extends string> {
  key: Key;
  label: string;
  mode?: "decimal" | "numeric";
  required?: boolean;
  hint?: string;
}

export function ManualField<Key extends string>({ definition, value, onChange, error }: {
  definition: FieldDefinition<Key>;
  value: string;
  onChange(value: string): void;
  error?: string;
}) {
  return (
    <TextField
      label={definition.label}
      hint={definition.hint}
      inputMode={definition.mode}
      maxLength={definition.mode ? 20 : 60}
      required={definition.required}
      autoComplete="off"
      spellCheck={false}
      value={value}
      error={error}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
}

export function ResultMetrics({ values }: { values: readonly (readonly [string, string | null])[] }) {
  return (
    <dl className="manual-metrics">
      {values.map(([label, value]) => (
        <div key={label}><dt>{label}</dt><dd>{value ?? copy.manual.unavailable}</dd></div>
      ))}
    </dl>
  );
}

export function withUnit(value: string | null, unit: string, suffix = ""): string | null {
  if (value === null) return null;
  return unit ? `${value} ${unit}${suffix}` : value + suffix;
}

export function percentage(value: string | null): string | null {
  return value === null ? null : `${value}%`;
}
