
import ENGINE from "@/lib/that-open/instance"
import { loadIfcFile } from "@/lib/that-open/helpers/ifc-helpers"
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react"
import { clearFragments, downloadFragments, loadFragFile, loadSampleFragModel } from "@/lib/that-open/helpers/fragment-helpers"

export default function useBimEngineLogic({
    onLoadEndCallback,
    onLoadStartCallback,
}:{
    onLoadEndCallback?: (...args: any)=>any
    onLoadStartCallback?: (...args: any)=>any
}={}) {

    const initialized = useRef(false)
    const [engine, setEngine] = useState<any>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = useState(false)

    const onLoadStart = () => {
        setIsLoading?.(true)
        onLoadStartCallback?.()
    }

    const onLoadEnd = () => {
        setIsLoading?.(false)
        onLoadEndCallback?.()
    }
    
    const initializeWorld = useCallback(async()=>{
        if (initialized.current) return
        initialized.current = true
        if (!containerRef.current) return
        const worldEngine = await ENGINE.generateEngine(containerRef.current)
        setEngine(worldEngine)
    },[])

    const hasModel = useMemo(()=>{
        return (engine?.fragments?.list?.size ?? 0) > 0
    },[engine?.fragments?.list?.size])
    
    useLayoutEffect(() => { 
        initializeWorld?.() 
    }, [initializeWorld])

    const handleLoadIfcFile = async ()=> await loadIfcFile?.({ onLoadStart,  onLoadEnd })
    
    const handleLoadFragFile = async ()=> await loadFragFile?.({ onLoadStart,  onLoadEnd })

    const handleLoadSampleFragFile = async ()=> await loadSampleFragModel?.({ onLoadStart,  onLoadEnd })

    const handleClearFragments = async ()=> await clearFragments?.({ onLoadStart,  onLoadEnd })

    const handleDownloadFragFile = ()=> downloadFragments?.()

    return {
        hasModel,
        containerRef,
        handleLoadIfcFile,
        handleLoadFragFile,
        handleClearFragments,
        handleDownloadFragFile,
        isLoading, setIsLoading,
        handleLoadSampleFragFile,
    }
}