import { cn } from "@/lib/utils";
import SmartIcon from "@/components/ui/smart-icon";

export default function Marker({
    onClick,
    isTooltipOpen,
}:{
    isTooltipOpen?: boolean
    onClick: (...args: any) => any 
}) {

    return (
        <div
        onClick={onClick}
        className={cn(`
            pointer-events-auto
            items-center justify-center
            cursor-pointer flex w-7 h-7 z-1
            rounded-full border-2 border-white
        `,
        isTooltipOpen ? 'bg-green-500' : 'bg-blue-400 hover:bg-blue-500' 
        )}>
        <SmartIcon iconCode="location" className="text-white text-sm" />
      </div>
    )
}