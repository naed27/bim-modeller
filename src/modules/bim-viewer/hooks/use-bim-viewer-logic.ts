import useBimViewerModals from "./use-bim-viewer-modals"
import useBimEngineLogic from "@/hooks/use-bim-engine-logic"
import useSmartSidebarLogic from "@/layouts/smart-sidebar/use-smart-sidebar-logic"

export default function useBimViewerLogic() {

    const sidebarLeftLogic = useSmartSidebarLogic({
        className: 'max-w-[450px]',
        buttonClassName: 'mt-auto bottom-4 left-4',
    })

    const sidebarRightLogic = useSmartSidebarLogic({
        className: 'max-w-[450px]',
        buttonClassName: 'mt-auto bottom-4 right-4',
    })

    const modals = useBimViewerModals()
    
    const bimEngineLogic = useBimEngineLogic({
        onLoadStartCallback: modals?.loadFileModalLogic?.closeModal
    })

    return {
        ...bimEngineLogic,
        sidebarLeftLogic,
        sidebarRightLogic,  
        ...modals,
    }
}