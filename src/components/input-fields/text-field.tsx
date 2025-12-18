"use client";

import {
  Override,
  InputFieldBaseProps,
  TextFieldSpecialProps,
} from "@/lib/types";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import InputFieldLayout from "../field-layouts/input-field-layout";

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const TextField: React.FC<
  Override<InputFieldBaseProps, TextFieldSpecialProps>
> = ({
  hide,
  label,
  error,
  value,
  style,
  prefix,
  helper,
  onBlur,
  onFocus,
  onChange,
  onKeyDown,
  className,
  customRef,
  placeholder,
  labelClassName,
  inputClassName,
  required = false,
  disabled = false,
  inputType = "text",
  ...props
}) => {
  const cleanValue = useMemo(() => {
    if (!prefix || !value) return value ?? "";
    const regex = new RegExp(`^${escapeRegExp(prefix)}`);
    return value.replace(regex, "");
  }, [value, prefix]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;

    if (prefix && raw.startsWith(prefix)) {
      const regex = new RegExp(`^${escapeRegExp(prefix)}`);
      raw = raw.replace(regex, "");
    }

    // Create a synthetic event with fullValue injected into e.target.value
    const customEvent = {
      ...e,
      target: {
        ...e.target,
        value: raw,
      },
    };

    onChange?.(customEvent as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <InputFieldLayout
      helper={helper}
      hide={hide}
      style={style}
      label={label}
      error={error}
      disabled={disabled}
      required={required}
      className={className}
      labelClassName={labelClassName}
      {...props}
    >
      <div
        className={cn(
          "mt-1 flex w-full items-center gap-1",
          disabled && "cursor-not-allowed"
        )}
        title={String(value ?? undefined)}
      >
        {prefix && (
          <span className="min-w-max rounded-md border bg-input px-2 py-2 text-sm text-foreground/80">
            {prefix}
          </span>
        )}
        <Input
          id={label}
          ref={customRef}
          onBlur={onBlur}
          type={inputType}
          onFocus={onFocus}
          value={cleanValue}
          required={required}
          disabled={disabled}
          readOnly={!onChange}
          onKeyDown={onKeyDown}
          onChange={handleChange}
          placeholder={
            disabled
              ? ""
              : !onChange
                ? "No onChange handler"
                : (placeholder ?? `Enter ${label ?? "something"}`)
          }
          className={cn(
            "w-full rounded-full border border-gray-500 bg-input p-2 px-3 text-input-foreground placeholder:text-placeholder bg-gray-900",
            disabled && "cursor-not-allowed",
            inputClassName
          )}
        />
      </div>
    </InputFieldLayout>
  );
};
