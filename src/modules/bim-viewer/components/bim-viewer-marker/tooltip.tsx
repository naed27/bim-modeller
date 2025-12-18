import { ReactNode } from "react";

export default function Tooltip({
    onClick,
    buttons,
    description,
    isTooltipOpen,
}:{
    buttons?: ReactNode
    description?: string
    isTooltipOpen?: boolean
    onClick?: (...args: any)=> any
}) {

    if(!isTooltipOpen) return null

    return (
         <div
          onClick={onClick}
          className="
            flex items-center gap-2
            text-xs text-gray-800
            border border-gray-300
            rounded-md px-2 py-1 shadow-lg
            pointer-events-auto  bg-white/90
            absolute -top-7 left-1/2 -translate-x-1/2 z-4
            hover:bg-blue-100
          "
        >
            {description && <div className="font-medium cursor-text whitespace-nowrap">
              {description}
            </div>}
            <div className="flex gap-2 justify-center items-center">
                {buttons}
            </div>
        </div>
    )
}