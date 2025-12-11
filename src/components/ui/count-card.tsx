import { cn } from "@/lib/utils";
import SmartIcon from "./smart-icon";
import useCountUp from "@/hooks/use-count-up";
import { ReactNode, useCallback } from "react";

type CountCardProps = {
  count?: number;
  hide?: boolean;
  iconCode?: string;
  footer?: ReactNode;
  className?: string;
  isLoading?: boolean;
  fillWidth?: boolean;
  countSuffix?: string;
  countClassName?: string;
  label?: string | ReactNode;
  animationDuration?: number;
  onClick?: (...args: any) => any;
};

export default function CountCard({
  count,
  label,
  onClick,
  className,
  hide = false,
  countClassName,
  countSuffix = '',
  isLoading = false,
  iconCode = 'hammer',
  animationDuration = 400,
}: CountCardProps) {

    const displayedCount = useCountUp({
        isLoading,
        to: Number(count),
        duration: animationDuration,
    });

    const onClickHandler = useCallback(() => {
        if (isLoading) return;
        if (onClick) return onClick();
    }, [onClick, isLoading]);

    if (hide) return null;
    if (!count && !label) return null;

    return (
        <div
        onClick={onClickHandler}
        className={cn(
            `grow basis-[120px] h-auto
            flex flex-col gap-1 p-2 items-start 
            justify-center rounded-lg border 
            border-gray-500 hover:border-green-600 hover:bg-gray-700 cursor-pointer`,
            className,
        )}>
            <div className="flex flex-row w-full items-between h-full justify-between gap-2">
                <SmartIcon iconCode={iconCode} className={"text-base rounded-sm p-1 text-green-300"}/>
                <div
                className={"truncate text-xl font-bold leading-none tracking-wide text-gray-300"}>
                    {displayedCount.toLocaleString() + countSuffix}
                </div>
            </div>
            <div>
                <div className={cn("truncate text-sm font-semibold text-green-300", countClassName)}>
                    {label}
                </div>
            </div>
        </div>
    );
}
