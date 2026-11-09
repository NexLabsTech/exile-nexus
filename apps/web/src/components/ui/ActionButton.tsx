import type { ButtonHTMLAttributes, ReactNode } from "react";
import { copy } from "../../i18n";

export type ActionVariant = "primary" | "secondary" | "quiet";

export interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ActionVariant;
  loading?: boolean;
}

export function ActionButton({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  ...rest
}: ActionButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`ui-action ui-action--${variant} ${className}`.trim()}
    >
      <span className="ui-action__spinner" aria-hidden="true" hidden={!loading} />
      <span className="ui-action__label">{loading ? copy.action.working : children}</span>
    </button>
  );
}
