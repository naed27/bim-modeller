import { cn } from "@/lib/utils";
import SmartButton from "./ui/smart-button";
import { Col } from "@/components/field-layouts/col";
import { Row } from "@/components/field-layouts/row";

type FormButtonSetProps = {
  onReset?: () => void;
  onCancel?: () => void;
  onConfirm?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  hide?: boolean;
  className?: string;
  disabled?: boolean;
  shadow?: boolean;
  readOnly?: boolean;
  isLoading?: boolean;
  resetIcon?: string;
  cancelIcon?: string;
  confirmIcon?: string | React.JSX.Element;
  isConfirmPermitted?: boolean;
  wrapperClassName?: string;
  resetButtonLabel?: string;
  resetButtonClassName?: string;
  disableResetButton?: boolean;
  cancelButtonLabel?: string;
  cancelButtonClassName?: string;
  confirmButtonLabel?: string;
  confirmButtonClassName?: string;
  hideConfirmButton?: boolean;
  disableConfirmButton?: boolean;
};

export default function FormButtonSet({
  onReset,
  onCancel,
  onConfirm,
  children,
  hide = false,
  className = "",
  disabled = false,
  readOnly = false,
  isLoading = false,
  resetButtonClassName,
  wrapperClassName = "",
  hideConfirmButton = false,
  cancelButtonClassName = "",
  isConfirmPermitted = true,
  resetButtonLabel = "Reset",
  disableResetButton = false,
  disableConfirmButton = false,
  cancelButtonLabel = "Cancel",
  confirmButtonLabel = "Confirm",
  confirmButtonClassName = "bg-black",
}: FormButtonSetProps) {
  if (hide) return null;

  return (
    <Row className={cn("my-0 py-0", wrapperClassName)}>
      <Col className={`flex flex-wrap justify-end gap-2 ${className}`}>
        {isLoading ? (
          <SmartButton disabled className="rounded">
            Loading
          </SmartButton>
        ) : (
          <>
            {onCancel && (
              <SmartButton
                onClick={onCancel}
                disabled={disabled}
                className={cn(`flex items-center gap-2`, cancelButtonClassName)}
              >
                {readOnly ? "Close" : cancelButtonLabel}
              </SmartButton>
            )}

            {onReset && (
              <SmartButton
                onClick={onReset}
                disabled={disabled || disableResetButton}
                className={cn(resetButtonClassName, `flex items-center gap-2`)}
              >
                {resetButtonLabel}
              </SmartButton>
            )}

            {children}

            {onConfirm && !hideConfirmButton && isConfirmPermitted && (
              <SmartButton
                onClick={onConfirm}
                disabled={disabled || disableConfirmButton}
                className={cn(
                  `flex items-center gap-2 bg-primary`,
                  confirmButtonClassName
                )}
              >
                {confirmButtonLabel}
              </SmartButton>
            )}
          </>
        )}
      </Col>
    </Row>
  );
}
