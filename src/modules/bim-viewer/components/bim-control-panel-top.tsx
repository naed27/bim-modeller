import { cn } from "@/lib/utils";
import { useContext } from "react";
import { BimViewerContext } from "../bim-viewer";
import SmartButton from "@/components/ui/smart-button";
import ENGINE from "@/lib/that-open/instance";

export default function BimControlPanelTop() {

    const {
        hasModel,
        isEditMode,
        showMarkers,

        setIsEditMode,
        setShowMarkers,
    } = useContext(BimViewerContext)
    return (
        <div className="flex flex-nowrap gap-2 justify-between w-full mb-auto">
            <div className="flex flex-wrap gap-2 justify-start">
                <SmartButton 
                hide={!hasModel} 
                onClick={()=>{
                    setIsEditMode(c=>!c)
                    setShowMarkers(false)
                }}
                label={`Edit Mode: ${isEditMode ? 'ON' : 'OFF'}`}
                className={cn(isEditMode ? `bg-blue-700 hover:bg-blue-800` : '')}/>

                <SmartButton 
                hide={!hasModel || isEditMode} 
                onClick={()=>setShowMarkers(c=>!c)}
                label={`Show Markers: ${showMarkers ? 'ON' : 'OFF'}`}
                className={cn(showMarkers ? `bg-blue-700 hover:bg-blue-800` : '')}/>
                
                <SmartButton 
                label={`Apply Changes`}
                hide={!hasModel || !isEditMode} 
                onClick={()=>ENGINE?.generalEditor?.applyChanges?.()}/>
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