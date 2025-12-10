import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export default function BimStatSection({
    children,
    className,
}:{
    className?: string
    children?: ReactNode
}) {

    return (
        <div className={cn("rounded-md", className)}>
            {children}
        </div>
    )
}