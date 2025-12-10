import { cn } from "@/lib/utils";
import React, { RefObject } from "react";

type CardProps = {
  title?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  customRef?: RefObject<any>;
};

export default function Card({
  title,
  children,
  customRef,
  className,
}: CardProps) {

  return (
    <div
      ref={customRef}
      className={cn(
        "grow overflow-hidden rounded-lg border border-transparent bg-card p-4 shadow-sm",
        "border-gray-500/10",
        className
      )}
    >
      {title && (
        <div className="text-lg font-semibold tracking-tight">{title}</div>
      )}

      {children}
    </div>
  );
}
