import { useId, type InputHTMLAttributes } from "react";

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  hint?: string;
  error?: string;
}

export function TextField({
  label,
  hint,
  error,
  id: explicitId,
  disabled = false,
  className = "",
  required,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId();
  const id = explicitId ?? generatedId;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const description = [hint ? hintId : "", error ? errorId : ""].filter(Boolean).join(" ");

  return (
    <div className={`ui-field ${error ? "ui-field--invalid" : ""} ${disabled ? "ui-field--disabled" : ""} ${className}`.trim()}>
      <label className="ui-field__label" htmlFor={id}>
        {label}{required ? <span className="ui-field__required" aria-hidden="true"> *</span> : null}
      </label>
      <input
        {...inputProps}
        id={id}
        className="ui-field__control"
        disabled={disabled}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={description || undefined}
      />
      {hint ? <p className="ui-field__help" id={hintId}>{hint}</p> : null}
      {error ? <p className="ui-field__error" id={errorId}>{error}</p> : null}
    </div>
  );
}
