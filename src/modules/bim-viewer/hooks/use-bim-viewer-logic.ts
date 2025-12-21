import useBimViewerModals from "./use-bim-viewer-modals"
import useBimEngineLogic from "@/hooks/use-bim-engine-logic"
import { CONTROLLER_SPEED } from "@/lib/that-open/constants"
import { useBimViewerController } from "./use-bim-viewer-controller"
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
        onLoadStartCallback: ()=>{
            modals?.loadFileModalLogic?.closeModal?.()
            sidebarLeftLogic?.closeMenu?.()
            sidebarRightLogic?.closeMenu?.()
        },
    })

    const canvasController = useBimViewerController({speed: CONTROLLER_SPEED})

    return {
        ...bimEngineLogic,
        canvasController,
        sidebarLeftLogic,
        sidebarRightLogic,  
        ...modals,
    }
}