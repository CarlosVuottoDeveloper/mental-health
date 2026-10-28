import { CircleAlert } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Id of a field's error message, to wire `aria-describedby`. */
export function fieldErrorId(id: string) {
  return `${id}-error`;
}

export function FieldError({
  id,
  children,
}: {
  id: string;
  children?: ReactNode;
}) {
  if (!children) return null;
  return (
    <p
      id={fieldErrorId(id)}
      className="flex items-start gap-1.5 text-body-sm text-danger"
    >
      {/* The icon repeats the message's meaning without relying on colour. */}
      <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

export type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

/** Label + control + error message. The control must use the same `id`. */
export function Field({ id, label, error, children, className }: FieldProps) {
  return (
    <div data-slot="field" className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-body-sm font-medium">
        {label}
      </label>
      {children}
      <FieldError id={id}>{error}</FieldError>
    </div>
  );
}

const controlFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export type InputProps = ComponentProps<"input"> & {
  /** Marks the field invalid and links it to its error message. */
  error?: string;
};

export function Input({ className, error, id, ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error && id ? fieldErrorId(id) : undefined}
      className={cn(
        "h-12 w-full rounded-md border border-border-strong bg-surface px-4 text-body-md text-foreground",
        "transition-colors duration-(--duration-fast) placeholder:text-foreground-muted hover:border-ink-400",
        "aria-invalid:border-danger",
        controlFocus,
        className,
      )}
      {...props}
    />
  );
}

export type ChoiceGroupProps = Omit<
  ComponentProps<"input">,
  "type" | "value" | "id"
> & {
  id: string;
  legend: string;
  options: { value: string; label: string }[];
  error?: string;
};

/**
 * Single choice shown as pills: native radios inside a fieldset, so keyboard
 * and screen reader behavior come from the browser.
 */
export function ChoiceGroup({
  id,
  legend,
  options,
  error,
  className,
  ...inputProps
}: ChoiceGroupProps) {
  return (
    <fieldset
      data-slot="choice-group"
      aria-describedby={error ? fieldErrorId(id) : undefined}
      className={cn("flex flex-col gap-2", className)}
    >
      <legend className="mb-2 text-body-sm font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "inline-flex h-11 cursor-pointer items-center rounded-pill border border-border-strong px-5 text-body-sm transition-colors duration-(--duration-fast)",
              "hover:border-ink-400 has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground",
              "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
              error && "border-danger",
            )}
          >
            <input
              type="radio"
              value={option.value}
              className="sr-only"
              {...inputProps}
            />
            {option.label}
          </label>
        ))}
      </div>
      <FieldError id={id}>{error}</FieldError>
    </fieldset>
  );
}

export type CheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  id: string;
  children: ReactNode;
  error?: string;
};

export function Checkbox({
  id,
  children,
  error,
  className,
  ...props
}: CheckboxProps) {
  return (
    <div data-slot="checkbox" className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? fieldErrorId(id) : undefined}
          className={cn(
            "mt-0.5 size-5 shrink-0 cursor-pointer rounded-xs accent-ink-900",
            controlFocus,
          )}
          {...props}
        />
        <label htmlFor={id} className="text-body-sm text-foreground-muted">
          {children}
        </label>
      </div>
      <FieldError id={id}>{error}</FieldError>
    </div>
  );
}
