import { ReactNode } from "react";

export default function BimViewerWindowPool({ 
    children,
    hide = false,
}:{
    hide?: boolean,
    children?: ReactNode
}) {

    if(hide) return null

    return (
        <div className="grow flex gap-2 pt-1">
            {children}
        </div>
    )
}