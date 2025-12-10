import { cn } from "@/lib/utils";
import React, { CSSProperties, useContext } from "react";
import { PrivateAccessLayoutContext } from "@/layouts/private-access-layout/private-access-layout";

export type ColProps = {
  className?: string;
  flexBasis?: string;
  dontGrow?: boolean;
  style?: CSSProperties;
  children?: React.ReactNode;
  minWidth?: number | string;
  maxWidth?: number | string;
};

export const Col: React.FC<ColProps> = ({
  style,
  maxWidth,
  children,
  className,
  minWidth = 0,
  dontGrow = false,
  flexBasis = "14rem",
}) => {
  const { isMobile } = useContext(PrivateAccessLayoutContext);

  return (
    <div
      className={cn(dontGrow && !isMobile ? "" : "flex-1", className)}
      style={{
        minWidth,
        flexBasis,
        maxWidth,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
