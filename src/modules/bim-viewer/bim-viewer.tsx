import '@/lib/that-open/instance';
import { createContext } from "react";
import BimViewerMarkers from './layouts/bim-viewer-markers';
import BimViewerCanvas from './components/bim-viewer-canvas';
import useBimViewerLogic from './hooks/use-bim-viewer-logic';
import SmartModal from '@/components/smart-modal/smart-modal';
import BimViewerUIOverlay from './layouts/bim-viewer-ui-overlay';
import BimViewerWindowPool from './layouts/bim-viewer-window-pool';
import BimControlPanelTop from './components/bim-control-panel-top';
import BimViewerSidebarLeft from './sections/bim-viewer-sidebar-left';
import BimViewerSidebarRight from './sections/bim-viewer-sidebar-right';
import BimControlPanelBottom from './components/bim-control-panel-bottom';
import LoadingSpinnerInAModal from "@/components/ui/loading-spinner-in-a-modal";

export const BimViewerContext = createContext({} as ReturnType<typeof useBimViewerLogic>);

export default function BimViewer() {
    
    const contextValue = useBimViewerLogic()

    return (
        <BimViewerContext.Provider value={contextValue}>
            <BimViewerCanvas/>
            <BimViewerMarkers/>
            <BimViewerUIOverlay>
                <BimControlPanelTop/>
                <BimViewerWindowPool hide={!contextValue?.hasModel || contextValue?.isEditMode}>
                  <BimViewerSidebarLeft/>
                  <BimViewerSidebarRight/>
                </BimViewerWindowPool>
                <BimControlPanelBottom/>
            </BimViewerUIOverlay>
            <SmartModal {...contextValue?.confirmationModalLogic}/>
            <LoadingSpinnerInAModal showWhen={contextValue?.isLoading}/>
        </BimViewerContext.Provider>
    )
}