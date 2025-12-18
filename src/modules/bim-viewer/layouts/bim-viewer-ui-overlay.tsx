import { ReactNode } from "react";

export default function BimViewerUIOverlay({ children }:{children?: ReactNode}) {

    return (
        <div className="fixed inset-0 z-4 pointer-events-none p-2 flex flex-col gap-2">
            {children}
        </div>
    )
}