import type { ReactNode } from "react";
import { ActionButton } from "./ActionButton";
import statusDefinitions from "../../data/ui-states.json";
import { copy } from "../../i18n";

export type FeedbackState = "loading" | "error" | "empty" | "success";

export interface FeedbackPanelProps {
  state: FeedbackState;
  onRetry?: () => void;
  children?: ReactNode;
}

const content: Record<FeedbackState, { title: string; message: string; glyph: string }> = statusDefinitions;

export function FeedbackPanel({ state, onRetry, children }: FeedbackPanelProps) {
  const details = content[state];
  return (
    <section
      className={`ui-feedback ui-feedback--${state}`}
      role={state === "error" ? "alert" : "status"}
      aria-busy={state === "loading"}
      data-feedback-state={state}
    >
      <span aria-hidden="true" className="ui-feedback__symbol">{details.glyph}</span>
      <div className="ui-feedback__body">
        <h3 className="ui-feedback__title">{details.title}</h3>
        <p>{children ?? details.message}</p>
        {state === "error" && onRetry ? <ActionButton variant="secondary" onClick={onRetry}>{copy.action.tryAgain}</ActionButton> : null}
      </div>
    </section>
  );
}
