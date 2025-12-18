import useSmartModalLogic from "@/components/smart-modal/hooks/use-smart-modal-logic"

export default function useBimViewerModals() {

    const loadFileModalLogic = useSmartModalLogic({
        closeButton: true,
        modalHeaderText: 'Select which file to upload',
    })

    const confirmationModalLogic = useSmartModalLogic({
        closeButton: true,
    });

    return {
        loadFileModalLogic,
        confirmationModalLogic,
    }
}