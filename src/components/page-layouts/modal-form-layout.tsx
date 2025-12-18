import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode, RefObject } from "react";

export default function ModalFormLayout({
  style,
  children,
  className,
  customRef,
  formButtonSet,
  contentClassName,
}: {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  contentClassName?: string;
  formButtonSet?: ReactNode;
  customRef?: RefObject<any>;
}) {
  return (
    <div
      style={style}
      className={cn("relative flex max-h-[70svh] w-full flex-col", className)}
    >
      {children && (
        <div
          ref={customRef}
          className={cn(
            "mb-5 grow overflow-y-auto py-1",
            contentClassName
          )}
        >
          {children}
        </div>
      )}
      {formButtonSet}
    </div>
  );
}
