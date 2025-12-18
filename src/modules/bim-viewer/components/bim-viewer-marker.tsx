import ENGINE from "@/lib/that-open/instance"
import type { ThreeMarker } from "@/lib/types"
import Marker from "./bim-viewer-marker/marker"
import Tooltip from "./bim-viewer-marker/tooltip"
import Details from "./bim-viewer-marker/details"
import SmartIcon from "@/components/ui/smart-icon"
import { useEffect, useRef, useState } from "react"
import SmartModal from "@/components/smart-modal/smart-modal"
import useBimViewerLogic from "../hooks/use-bim-viewer-logic"
import { updateMarkerCoordinates } from "@/lib/that-open/helpers/marker-helpers"
import useSmartModalLogic from "@/components/smart-modal/hooks/use-smart-modal-logic"

export default function BimViewerMarker(props: ThreeMarker & ReturnType<typeof useBimViewerLogic>) {

    const {
        setMarkers,
        description,
        confirmationModalLogic,
        objectVector3Coordinates,
    } = props

    const ref = useRef<HTMLDivElement>(null)

    const [isTooltipOpen, setIsTooltipOpen] = useState(false)

    const detailsFormModalLogic = useSmartModalLogic({ closeButton:true, modalHeaderText: 'Description', hideButtons: true })

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation()
        confirmationModalLogic?.openConfirmationModal({
        modalHeaderText: "Confirmation",
        modalMessage: `Are you sure you want to remove this marker?`,
        onConfirmCallback: () => setMarkers(mk =>mk.filter( m => m.objectVector3Coordinates !== objectVector3Coordinates)),
      })
    }

    const handleToggleTooltip = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsTooltipOpen(value => !value)
    }

    useEffect(() => {
        const update = () => updateMarkerCoordinates({ ref, objectVector3Coordinates })
        ENGINE.world?.renderer?.onBeforeUpdate.add(update)
        return () => ENGINE.world?.renderer?.onBeforeUpdate.remove(update)
    }, [objectVector3Coordinates])

    return (
        <>
            <div ref={ref} className="fixed">
                <Marker onClick={handleToggleTooltip} isTooltipOpen={isTooltipOpen}/>
                <Tooltip 
                onClick={detailsFormModalLogic?.openModal}
                description={description}
                isTooltipOpen={isTooltipOpen}
                buttons={(
                    <>
                        <SmartIcon iconCode="pencil" onClick={detailsFormModalLogic?.openModal} className="hover:text-blue-600"/>
                        <SmartIcon iconCode="trash" onClick={handleRemove} className="hover:text-red-600"/>
                        <SmartIcon iconCode="eye-slash" onClick={handleToggleTooltip} className="hover:text-gray-600"/>
                    </>
                )}/>
            </div>

            <SmartModal {...detailsFormModalLogic}>
                <Details
                {...props}
                value={description}
                onCancel={detailsFormModalLogic?.closeModal}
                onSubmit={(newValue)=>{
                    setMarkers((currentMarkers)=>{
                        return currentMarkers?.map((marker: any)=>{
                            if(marker?.objectVector3Coordinates === objectVector3Coordinates)
                                return {...marker, description: newValue}
                            return marker
                        })
                    })
                    detailsFormModalLogic?.closeModal?.()
                }}/>
            </SmartModal>
        </>
    )
}
