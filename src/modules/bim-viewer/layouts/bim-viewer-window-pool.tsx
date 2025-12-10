import { ReactNode } from "react";

export default function BimViewerWindowPool({ children }:{children?: ReactNode}) {

    return (
        <div className="grow flex gap-2">
            {children}
        </div>
    )
}