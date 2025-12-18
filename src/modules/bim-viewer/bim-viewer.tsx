import '@/lib/that-open/instance';
import { createContext } from "react";
import BimViewerMarkers from './layouts/bim-viewer-markers';
import BimViewerCanvas from './components/bim-viewer-canvas';
import useBimViewerLogic from './hooks/use-bim-viewer-logic';
import BimControlPanel from './components/bim-control-panel';
import BimViewerUIOverlay from './layouts/bim-viewer-ui-overlay';
import BimViewerWindowPool from './layouts/bim-viewer-window-pool';
import BimViewerSidebarLeft from './sections/bim-viewer-sidebar-left';
import BimViewerSidebarRight from './sections/bim-viewer-sidebar-right';
import LoadingSpinnerInAModal from "@/components/ui/loading-spinner-in-a-modal";
import SmartModal from '@/components/smart-modal/smart-modal';

export const BimViewerContext = createContext({} as ReturnType<typeof useBimViewerLogic>);

export default function BimViewer() {
    
    const contextValue = useBimViewerLogic()

    return (
        <BimViewerContext.Provider value={contextValue}>
            <BimViewerCanvas/>
            <BimViewerMarkers/>
            <BimViewerUIOverlay>
                <BimViewerWindowPool hide={!contextValue?.hasModel}>
                  <BimViewerSidebarLeft/>
                  <BimViewerSidebarRight/>
                </BimViewerWindowPool>
                <BimControlPanel/>
            </BimViewerUIOverlay>
            <SmartModal {...contextValue?.confirmationModalLogic}/>
            <LoadingSpinnerInAModal showWhen={contextValue?.isLoading}/>
        </BimViewerContext.Provider>
    )
}