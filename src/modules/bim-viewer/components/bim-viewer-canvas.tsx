import { useContext } from "react"
import { BimViewerContext } from "../bim-viewer"

export default function BimViewerCanvas() {

    const { containerRef } = useContext(BimViewerContext)

    return <div className="fixed inset-0 max-h-[99.9svh]" ref={containerRef}/>
}