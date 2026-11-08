import { useState, type FormEvent } from "react";
import { ActionButton } from "./ActionButton";
import { TextField } from "./TextField";
import { FeedbackPanel, type FeedbackState } from "./FeedbackPanel";

const STATE_CHOICES: readonly FeedbackState[] = ["loading", "empty", "error", "success"];

export function UiShowcase() {
  const [status, setStatus] = useState<FeedbackState>("empty");
  const [query, setQuery] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const error = attempted && query.trim().length < 3 ? "Enter at least three characters." : undefined;

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
            <p className="eyebrow">INTERACTIVE CONTROLS</p>
            <h2 id="ui-buttons-heading">Action buttons</h2>
            <p>Explicit enabled, loading and disabled states. Focus remains visible to keyboard users.</p>
          </div>
        </div>
        <div className="ui-workshop__sample-grid">
          <div className="ui-workshop__sample">
            <p className="ui-workshop__label">PRIMARY</p>
            <ActionButton data-testid="primary-action" onClick={() => setStatus("success")}>Confirm action</ActionButton>
          </div>
          <div className="ui-workshop__sample">
            <p className="ui-workshop__label">SECONDARY</p>
            <ActionButton variant="secondary" onClick={() => setStatus("empty")}>Clear results</ActionButton>
          </div>
          <div className="ui-workshop__sample">
            <p className="ui-workshop__label">LOADING</p>
            <ActionButton loading data-testid="loading-action">Loading example</ActionButton>
          </div>
          <div className="ui-workshop__sample">
            <p className="ui-workshop__label">DISABLED</p>
            <ActionButton disabled data-testid="disabled-action">Unavailable</ActionButton>
          </div>
        </div>
      </section>

      <section className="ui-workshop__section" aria-labelledby="ui-form-heading">
        <div className="ui-workshop__heading">
          <span className="ui-workshop__number">02</span>
          <div>
            <p className="eyebrow">FORMS AND VALIDATION</p>
            <h2 id="ui-form-heading">Labeled text field</h2>
            <p>Required, hint, validation error and disabled states are announced appropriately.</p>
          </div>
        </div>
        <div className="ui-workshop__form-grid">
          <form className="ui-workshop__form" onSubmit={handlePreview} noValidate>
            <TextField
              data-testid="preview-input"
              label="Search label (local demo)"
              name="search"
              autoComplete="off"
              value={query}
              required
              maxLength={64}
              onChange={(event) => {
                setQuery(event.currentTarget.value);
                if (attempted) setAttempted(false);
              }}
              hint="Use three or more characters. Nothing is transmitted."
              error={error}
            />
            <ActionButton type="submit">Validate locally</ActionButton>
          </form>
          <div className="ui-workshop__form">
            <label className="ui-workshop__toggle">
              <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.currentTarget.checked)} />
              <span>Disable the example field</span>
            </label>
            <TextField label="Disabled field" defaultValue="Example only" disabled={disabled} hint="Toggle above to switch input availability." />
            <p className="ui-workshop__minor">The example does not store user information.</p>
          </div>
        </div>
      </section>

      <section className="ui-workshop__section" aria-labelledby="ui-states-heading">
        <div className="ui-workshop__heading">
          <span className="ui-workshop__number">03</span>
          <div>
            <p className="eyebrow">FEEDBACK AND RECOVERY</p>
            <h2 id="ui-states-heading">Explicit status panels</h2>
            <p>Loading, empty, error and success states, each with a text label rather than color alone.</p>
          </div>
        </div>
        <div className="ui-state-selector" role="group" aria-label="Choose preview status">
          {STATE_CHOICES.map((choice) => (
            <ActionButton
              key={choice}
              variant={status === choice ? "primary" : "quiet"}
              aria-pressed={status === choice}
              onClick={() => setStatus(choice)}
            >
              {choice === "loading" ? "Loading" : choice === "empty" ? "Empty" : choice === "error" ? "Error" : "Success"}
            </ActionButton>
          ))}
        </div>
        <FeedbackPanel state={status} onRetry={() => setStatus("loading")} />
      </section>
      <p className="ui-workshop__footnote">All components use original typography and geometry. This is a demo route, not a live game feature or a data source.</p>
    </div>
  );
}
