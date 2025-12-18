import { useContext } from "react"
import { BimViewerContext } from "../bim-viewer"
import BimViewerMarker from "../components/bim-viewer-marker"

export default function BimViewerMarkers() {

    const props = useContext(BimViewerContext)

    if(!props?.showMarkers) return null

    return (
        <div className="fixed inset-0 z-3 pointer-events-none">
            {props?.markers?.map((marker)=>{
                return <BimViewerMarker  {...props} {...marker} key={marker?.id} />
            })}
        </div>
    )
}