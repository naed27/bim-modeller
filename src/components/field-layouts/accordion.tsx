import { cn } from "@/lib/utils";
import React, { useState, JSX } from "react";
import { ChevronRightIcon } from "lucide-react";

type AccordionProps = {
  hide?: boolean;
  open?: boolean;
  padding?: string;
  shadow?: boolean;
  rounded?: boolean;
  className?: string;
  titleClassName?: string;
  toggleSeparator?: boolean;
  contentClassName?: string;
  children: React.ReactNode;
  title: string | JSX.Element;
  onToggle?: (...args: any) => any;
};

export default function Accordion({
  title,
  children,
  onToggle,
  className,
  hide = false,
  open = false,
  padding = "4",
  shadow = false,
  rounded = false,
  titleClassName,
  contentClassName,
  toggleSeparator = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(open);

  const toggleAccordion = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onToggle?.();
    setIsOpen(!isOpen);
  };

  if (hide) return null;

  return (
    <div
      className={cn(
        `w-full overflow-hidden`,
        rounded && "rounded-lg",
        shadow && "shadow-lg",
        className
      )}
    >
      <div
        onClick={toggleAccordion}
        className={cn(
          rounded && "rounded-t-lg",
          (() => {
            if (!toggleSeparator) return "border-b border-primary pb-4";
            return isOpen ? "border-b border-primary pb-4" : "";
          })(),
          "flex cursor-pointer items-center justify-between text-lg font-semibold",
          titleClassName
        )}
      >
        <div className="w-full">{title}</div>
        <ChevronRightIcon
          className={cn(
            "transition-transform duration-200",
            isOpen ? "rotate-90 transform" : "rotate-0 transform"
          )}
          size={20}
        />
      </div>

      <div
        className={cn(
          `py-${padding} duration-200 ease-in-out`,
          isOpen ? "h-auto" : "m-0 h-0 p-0",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
