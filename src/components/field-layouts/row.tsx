import { cn } from "@/lib/utils";
import React, { CSSProperties, RefObject } from "react";

type RowProps = {
  gapX?: string;
  gapY?: string;
  hide?: boolean;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
  customRef?: RefObject<any>;
  evenOutChildGapsAccordingToChildrenPerRow?: boolean;
};

export const Row: React.FC<RowProps> = ({
  style,
  children,
  customRef,
  className,
  gapY = "1",
  gapX = "1.5",
  hide = false,
}) => {
  if (hide) return null;
  return (
    <div
      ref={customRef}
      style={style ?? { gap: `${gapY}rem ${gapX}rem` }}
      className={cn("my-6 flex flex-wrap first:mt-0 last:mb-0", className)}
    >
      {children}
    </div>
  );
};
