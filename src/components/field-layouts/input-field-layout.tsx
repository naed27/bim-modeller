import { useState } from "react";
import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode } from "react";
import { Col, ColProps } from "../field-layouts/col";

export type InputFieldLayoutProps = {
  disabled?: any;
  label?: string;
  error?: string;
  hide?: boolean;
  helper?: string;
  required?: boolean;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  labelClassName?: string;
  layout?: "horizontal" | "vertical";
} & ColProps;

export default function InputFieldLayout(props: InputFieldLayoutProps) {
  const {
    label,
    error,
    style,
    helper,
    required,
    children,
    className,
    hide = false,
    labelClassName,
    disabled = false,
    layout = "vertical",
  } = props || {};
  const [showTooltip, setShowTooltip] = useState(false);
  if (hide === true) return null;

  return (
    <Col
      {...props}
      style={style}
      className={cn(
        "flex",
        layout === "vertical" ? "flex-col" : "flex-row items-center gap-2",
        className
      )}
    >
      {label && (
        <label
          htmlFor={label}
          className={cn(
            "flex items-center gap-1 text-[0.85rem]",
            labelClassName
          )}
        >
          {label}
          {required && !disabled && <span className="text-destructive">*</span>}
          {helper && (
            <div
              className="relative flex items-center"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <span className="inline-flex h-3 w-3 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-[10px] font-bold text-gray-700">
                ?
              </span>
              {showTooltip && (
                <div className="absolute left-full top-1/2 ml-2 w-48 -translate-y-1/2 rounded border border-gray-500 bg-black px-2 py-1 text-xs text-gray-500 shadow-lg">
                  {helper}
                </div>
              )}
            </div>
          )}
        </label>
      )}
      <div className="grow">{children}</div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </Col>
  );
}
