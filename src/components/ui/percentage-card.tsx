import { cn } from "@/lib/utils";
import SmartIcon from "./smart-icon";
import useCountUp from "@/hooks/use-count-up";
import { ReactNode, useCallback } from "react";

type PercentageCardProps = {
  percentage?: number; 
  label?: string | ReactNode;
  iconCode?: string;
  hide?: boolean;
  className?: string;
  isLoading?: boolean;
  fillWidth?: boolean;
  countClassName?: string;
  animationDuration?: number;
  onClick?: (...args: any) => any;
};

export default function PercentageCard({
  percentage = 0,
  label,
  onClick,
  className,
  hide = false,
  countClassName,
  isLoading = false,
  iconCode = "chart-pie",
  animationDuration = 400,
}: PercentageCardProps) {

    const displayedCount = useCountUp({
        isLoading,
        to: Number(percentage),
        duration: animationDuration,
    });

    const onClickHandler = useCallback(() => {
        if (isLoading) return;
        if (onClick) return onClick();
    }, [onClick, isLoading]);

    if (hide) return null;
    if (percentage === undefined && !label) return null;

    return (
        <div
        onClick={onClickHandler}
        className={cn(
            `grow basis-[100px] h-auto 
            rounded-lg border border-gray-500
            hover:border-green-600 hover:bg-gray-700
            flex flex-col gap-2 p-2 items-center justify-center cursor-pointer`,
            className
        )}
        >
        <div className="flex flex-col w-full items-center justify-between gap-2">
            <SmartIcon
            iconCode={iconCode}
            className="text-[3rem] rounded-sm p-1 text-green-300"
            />
            <div className="truncate text-md font-bold leading-none tracking-wide text-gray-300">
            {Number(displayedCount.toLocaleString()).toFixed(0)}%
            </div>
        </div>

        <div className="w-[75%] h-2 bg-gray-600 rounded-full overflow-hidden">
            <div className="h-full bg-green-400"
            style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}/>
        </div>

        {label && (
            <div
            className={cn(
                "truncate text-sm font-semibold text-green-300",
                countClassName
            )}
            >
            {label}
            </div>
        )}

        </div>
    );
}
