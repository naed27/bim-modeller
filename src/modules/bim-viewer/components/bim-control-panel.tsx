import { useContext } from "react";
import { BimViewerContext } from "../bim-viewer";
import SmartButton from "@/components/ui/smart-button";
import SmartModal from "@/components/smart-modal/smart-modal";

export default function BimControlPanel() {

    const {
        sidebarLeftLogic,
        sidebarRightLogic,
        loadFileModalLogic,
        handleLoadIfcFile,
        handleLoadFragFile,
        handleClearFragments,
        handleDownloadFragFile,
    } = useContext(BimViewerContext)

    return (
        <div className="flex flex-nowrap gap-2 justify-between w-full">
            <div className="flex flex-wrap gap-2 justify-start">
                <SmartButton label="View Charts" onClick={sidebarLeftLogic?.toggleMenu}/>
                <SmartButton label="View Counts" onClick={sidebarLeftLogic?.toggleMenu}/>
                <SmartButton label="View Mixed Charts & Counts" onClick={sidebarLeftLogic?.toggleMenu}/>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
                <SmartButton label="Load File" onClick={loadFileModalLogic?.openModal}/>
                <SmartButton label="Download Fragments" onClick={handleDownloadFragFile}/>
                <SmartButton label="Clear Canvas" onClick={handleClearFragments}/>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
                <SmartButton label="View Mixed Charts & Counts" onClick={sidebarRightLogic?.toggleMenu}/>
                <SmartButton label="View Counts" onClick={sidebarRightLogic?.toggleMenu}/>
                <SmartButton label="View Charts" onClick={sidebarRightLogic?.toggleMenu}/>
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