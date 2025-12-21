import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export default function SmartButton({
    hide,
    label,
    onClick,
    children,
    className,
    disabled = false,
}: {
    hide?: boolean
    label?: string
    disabled?: boolean
    className?: string
    children?: ReactNode
    onClick?: (...args: any) => any
}) {

    if (hide) return null

    const content = children ?? label ?? ''

    return (
        <button
        onClick={onClick}
        className={cn("py-1 px-3 bg-gray-900 border border-gray-400 rounded-full text-xs select-none hover:bg-gray-700",
            disabled ? 'pointer-events-none cursor-not-allowed opacity-70' : 'pointer-events-auto cursor-pointer',
            className
        )}>
            {content}
        </button>
    )
}
