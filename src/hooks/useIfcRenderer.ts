
import { generateIfcRenderer } from "../lib/world"
import { useCallback, useLayoutEffect, useRef, useState } from "react"

export default function useIfcRenderer() {

    const initialized = useRef(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [ifcRenderer, setIfcRenderer] = useState<null | Awaited<ReturnType<typeof generateIfcRenderer>>>(null)

    const initializeWorld = useCallback(async()=>{
        if (initialized.current) return
        initialized.current = true
        if (containerRef.current) {
            const generatedIfcRenderer = await generateIfcRenderer({
                containerElement: containerRef.current,
            })
            setIfcRenderer?.(generatedIfcRenderer)
        }
    },[])

    useLayoutEffect(() => { 
        initializeWorld?.()
     }, [initializeWorld])

    useLayoutEffect(() => {
        return () => {
            ifcRenderer?.components?.dispose?.()
        }
    }, [ifcRenderer])

    const handleLoadIfcFile = async ()=>{
        await ifcRenderer?.ifcManager?.loadIfcFromFile?.({
            scene: ifcRenderer?.world?.scene,
            ifcLoader: ifcRenderer?.ifcManager?.ifcLoader,
            fragments: ifcRenderer?.fragmentsManager?.fragments,
            onLoadStart: ()=> setIsLoading?.(true),
            onLoadEnd: ()=> setIsLoading?.(false),
        })
    }
    
    const handleLoadFragFile = async ()=>{
        await ifcRenderer?.fragmentsManager?.loadFragFromFile({
            scene: ifcRenderer?.world?.scene,
            camera: ifcRenderer.world!.camera?.three,
            fragments: ifcRenderer?.fragmentsManager?.fragments,
            onLoadStart: ()=> setIsLoading?.(true),
            onLoadEnd: ()=> setIsLoading?.(false),
        })
    }

    
    const handleDownloadFragFile = async () => {
        ifcRenderer?.fragmentsManager?.downloadFragments?.(
            ifcRenderer?.fragmentsManager?.fragments
        )
    }

    return {
        ifcRenderer,
        containerRef,
        handleLoadIfcFile,
        handleLoadFragFile,
        handleDownloadFragFile,
        isLoading, setIsLoading,
    }
}