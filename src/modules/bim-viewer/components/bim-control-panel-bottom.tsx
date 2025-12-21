import { cn } from "@/lib/utils";
import { useContext } from "react";
import { BimViewerContext } from "../bim-viewer";
import SmartButton from "@/components/ui/smart-button";
import SmartModal from "@/components/smart-modal/smart-modal";

export default function BimControlPanelBottom() {

    const {
        hasModel,
        isEditMode,
        showMarkers,
        sidebarLeftLogic,
        sidebarRightLogic,
        loadFileModalLogic,

        setIsEditMode,
        setShowMarkers,
        handleLoadIfcFile,
        handleLoadFragFile,
        handleClearFragments,
        handleDownloadFragFile,
        handleLoadSampleFragFile,
    } = useContext(BimViewerContext)

    const toggleSideBarLeft = (indexValue?: number)=> {
        if(sidebarLeftLogic?.contextValue?.tabIndex === indexValue)
            return sidebarLeftLogic?.toggleMenu?.()
        return sidebarLeftLogic?.openMenu?.({tabIndex: indexValue})
    }
    
    const toggleSideBarRight = (indexValue?: number)=> {
        if(sidebarRightLogic?.contextValue?.tabIndex === indexValue)
            return sidebarRightLogic?.toggleMenu?.()
        return sidebarRightLogic?.openMenu?.({tabIndex: indexValue})
    }

    return (
        <div className="flex flex-nowrap gap-2 justify-between w-full mt-auto">
            <div className="flex flex-wrap gap-2 justify-center">
                <SmartButton hide={!hasModel || isEditMode} label="View Stats" onClick={()=>toggleSideBarLeft?.(0)}/>
                <SmartButton hide={!hasModel || isEditMode} label="View Charts" onClick={()=>toggleSideBarLeft?.(1)}/>
                <SmartButton hide={!hasModel || isEditMode} label="View Counts" onClick={()=>toggleSideBarLeft?.(2)}/>
                <SmartButton 
                hide={!isEditMode} 
                className={'pointer-events-none'}
                label={`Double click to select an object`}/>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
                <SmartButton hide={hasModel} label="Upload File" onClick={loadFileModalLogic?.openModal}/>
                <SmartButton hide={!hasModel} label="Upload New File" onClick={loadFileModalLogic?.openModal}/>
                <SmartButton hide={hasModel} label="View Demo File" onClick={handleLoadSampleFragFile}/>
                <SmartButton hide={!hasModel} label="Download Fragments" onClick={handleDownloadFragFile}/>
                <SmartButton hide={!hasModel} label="Clear Canvas" onClick={handleClearFragments}/>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
                <SmartButton hide={!hasModel || isEditMode} label="View Counts" onClick={()=>toggleSideBarRight?.(2)}/>
                <SmartButton hide={!hasModel || isEditMode} label="View Charts" onClick={()=>toggleSideBarRight?.(1)}/>
                <SmartButton hide={!hasModel || isEditMode} label="View Stats" onClick={()=>toggleSideBarRight?.(0)}/>
            </div>

            <SmartModal {...loadFileModalLogic}>
                <div className="flex gap-2 flex-wrap">
                    <SmartButton label='Upload .FRAG File' onClick={handleLoadFragFile}/>
                    <SmartButton label='Upload .IFC File' onClick={handleLoadIfcFile}/>
                </div>
            </SmartModal>
        </div>
    )
}