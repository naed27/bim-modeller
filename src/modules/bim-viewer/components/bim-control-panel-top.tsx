import { cn } from "@/lib/utils";
import { useContext } from "react";
import { BimViewerContext } from "../bim-viewer";
import SmartButton from "@/components/ui/smart-button";
import ENGINE from "@/lib/that-open/instance";
import { capitalizeFirstLetter } from "@/helpers/format-helpers";

export default function BimControlPanelTop() {

    const {
        hasModel,
        isEditMode, setIsEditMode,
        showMarkers, setShowMarkers,
        transformMode, setTransformMode,
    } = useContext(BimViewerContext)
    return (
        <div className="flex flex-nowrap gap-2 justify-between w-full mb-auto">
            <div className="flex flex-wrap gap-2 justify-start">
                <SmartButton 
                onClick={()=>{
                    setIsEditMode(c=>!c)
                    setShowMarkers(false)
                }}
                label={`Edit Model`}
                hide={!hasModel || isEditMode} 
                className={cn(isEditMode ? `bg-blue-700 hover:bg-blue-800` : '')}/>

                <SmartButton 
                hide={!hasModel || isEditMode} 
                onClick={()=>setShowMarkers(c=>!c)}
                label={`Show Markers: ${showMarkers ? 'ON' : 'OFF'}`}
                className={cn(showMarkers ? `bg-blue-700 hover:bg-blue-800` : '')}/>
                
                <SmartButton 
                label={`Apply Changes`}
                hide={!hasModel || !isEditMode} 
                onClick={()=>{
                    ENGINE?.generalEditor?.applyChanges?.()
                    setIsEditMode(false)
                }}
                className={cn(`bg-green-800 hover:bg-green-900`)}/>

                <SmartButton 
                label={`Transform Mode: ${(()=>{
                    if(transformMode === 'rotate') return capitalizeFirstLetter('Rotate')
                    if(transformMode === 'translate') return capitalizeFirstLetter('Linear')
                })()}`}
                hide={!hasModel || !isEditMode} 
                onClick={()=>{
                    const currentMode = ENGINE?.generalEditor?.getControlsMode?.()
                    const newValue = (()=>{
                        if(currentMode === 'rotate') return 'translate'
                        if(currentMode === 'translate') return 'rotate'
                        return 'translate'
                    })()
                    setTransformMode(newValue)
                    ENGINE?.generalEditor?.setControlsMode?.(newValue)
                }}/>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
                <SmartButton 
                hide={!hasModel} 
                className={'pointer-events-none'}
                label={`Current Mode: ${(()=>{
                    if(isEditMode) return 'Editing'
                    if(showMarkers) return 'Showing & Adding Markers'
                    return 'View'
                })()}`}/>
            </div>
        </div>
    )
}