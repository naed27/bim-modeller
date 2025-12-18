import { useContext } from "react"
import { BimViewerContext } from "../bim-viewer"

export default function BimViewerCanvas() {

    const {
        containerRef,
        handleMouseDown,
        handleMouseMove,
        handleAddMarker,
    } = useContext(BimViewerContext)

    return (
        <div
        ref={containerRef}
        onClick={handleAddMarker}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        className="fixed inset-0 max-h-[99.9svh]"/>
    )
}
