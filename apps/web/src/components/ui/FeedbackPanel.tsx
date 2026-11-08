import type { ReactNode } from "react";
import { ActionButton } from "./ActionButton";

export type FeedbackState = "loading" | "error" | "empty" | "success";

export interface FeedbackPanelProps {
  state: FeedbackState;
  onRetry?: () => void;
  children?: ReactNode;
}

const content: Record<FeedbackState, { title: string; message: string; glyph: string }> = {
  loading: {
    title: "Preparing your view",
    message: "This local example shows a pending operation. No remote service is contacted.",
    glyph: "◌",
  },
  error: {
    title: "Something needs attention",
    message: "The simulated operation could not be completed. Nothing was sent or saved.",
    glyph: "!",
  },
  empty: {
    title: "No results to display",
    message: "The collection is empty. Add or search for content when the feature becomes available.",
    glyph: "◇",
  },
  success: {
    title: "Action confirmed",
    message: "The local interaction completed. This preview never sends real data.",
    glyph: "✦",
  },
};

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
        {state === "error" && onRetry ? <ActionButton variant="secondary" onClick={onRetry}>Try again</ActionButton> : null}
      </div>
    </section>
  );
}
