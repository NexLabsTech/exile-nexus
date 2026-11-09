import { useState, type FormEvent } from "react";
import { ActionButton } from "./ActionButton";
import { TextField } from "./TextField";
import { FeedbackPanel, type FeedbackState } from "./FeedbackPanel";
import { copy } from "../../i18n";

const STATE_CHOICES: readonly FeedbackState[] = ["loading", "empty", "error", "success"];

export function UiShowcase() {
  const [status, setStatus] = useState<FeedbackState>("empty");
  const [query, setQuery] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const error = attempted && query.trim().length < 3 ? copy.kit.shortQueryError : undefined;

  function handlePreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    setStatus(query.trim().length < 3 ? "error" : "success");
  }

  return (
    <div id="component-workshop" className="ui-workshop">
      <section className="ui-workshop__section" aria-labelledby="ui-buttons-heading">
        <div className="ui-workshop__heading">
          <span className="ui-workshop__number">01</span>
          <div>
            <p className="eyebrow">{copy.kit.controlEyebrow}</p>
            <h2 id="ui-buttons-heading">{copy.kit.controlHeading}</h2>
            <p>{copy.kit.controlInfo}</p>
          </div>
        </div>
        <div className="ui-workshop__sample-grid">
          <div className="ui-workshop__sample">
            <p className="ui-workshop__label">{copy.kit.primary}</p>
            <ActionButton data-testid="primary-action" onClick={() => setStatus("success")}>{copy.kit.primaryAction}</ActionButton>
          </div>
          <div className="ui-workshop__sample">
            <p className="ui-workshop__label">{copy.kit.secondary}</p>
            <ActionButton variant="secondary" onClick={() => setStatus("empty")}>{copy.kit.secondaryAction}</ActionButton>
          </div>
          <div className="ui-workshop__sample">
            <p className="ui-workshop__label">{copy.kit.loading}</p>
            <ActionButton loading data-testid="loading-action">{copy.kit.loadingExample}</ActionButton>
          </div>
          <div className="ui-workshop__sample">
            <p className="ui-workshop__label">{copy.kit.disabled}</p>
            <ActionButton disabled data-testid="disabled-action">{copy.kit.unavailable}</ActionButton>
          </div>
        </div>
      </section>

      <section className="ui-workshop__section" aria-labelledby="ui-form-heading">
        <div className="ui-workshop__heading">
          <span className="ui-workshop__number">02</span>
          <div>
            <p className="eyebrow">{copy.kit.formEyebrow}</p>
            <h2 id="ui-form-heading">{copy.kit.formHeading}</h2>
            <p>{copy.kit.formInfo}</p>
          </div>
        </div>
        <div className="ui-workshop__form-grid">
          <form className="ui-workshop__form" onSubmit={handlePreview} noValidate>
            <TextField
              data-testid="preview-input"
              label={copy.kit.fieldLabel}
              name="search"
              autoComplete="off"
              value={query}
              required
              maxLength={64}
              onChange={(event) => {
                setQuery(event.currentTarget.value);
                if (attempted) setAttempted(false);
              }}
              hint={copy.kit.fieldHint}
              error={error}
            />
            <ActionButton type="submit">{copy.kit.validate}</ActionButton>
          </form>
          <div className="ui-workshop__form">
            <label className="ui-workshop__toggle">
              <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.currentTarget.checked)} />
              <span>{copy.kit.disableExample}</span>
            </label>
            <TextField label={copy.kit.disabledField} defaultValue={copy.kit.disabledDefault} disabled={disabled} hint={copy.kit.disabledHint} />
            <p className="ui-workshop__minor">{copy.kit.noStoredData}</p>
          </div>
        </div>
      </section>

      <section className="ui-workshop__section" aria-labelledby="ui-states-heading">
        <div className="ui-workshop__heading">
          <span className="ui-workshop__number">03</span>
          <div>
            <p className="eyebrow">{copy.kit.statesEyebrow}</p>
            <h2 id="ui-states-heading">{copy.kit.statesHeading}</h2>
            <p>{copy.kit.statesInfo}</p>
          </div>
        </div>
        <div className="ui-state-selector" role="group" aria-label={copy.kit.selectStatus}>
          {STATE_CHOICES.map((choice) => (
            <ActionButton
              key={choice}
              variant={status === choice ? "primary" : "quiet"}
              aria-pressed={status === choice}
              onClick={() => setStatus(choice)}
            >
              {choice === "loading" ? copy.kit.loadingState : choice === "empty" ? copy.kit.emptyState : choice === "error" ? copy.kit.errorState : copy.kit.successState}
            </ActionButton>
          ))}
        </div>
        <FeedbackPanel state={status} onRetry={() => setStatus("loading")} />
      </section>
      <p className="ui-workshop__footnote">{copy.kit.footnote}</p>
    </div>
  );
}
