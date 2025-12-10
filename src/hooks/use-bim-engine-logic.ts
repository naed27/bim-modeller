
import ENGINE from "@/lib/that-open/instance"
import { loadIfcFile } from "@/lib/that-open/helpers/ifc-helpers"
import { useCallback, useLayoutEffect, useRef, useState } from "react"
import { clearFragments, downloadFragments, loadFragFile } from "@/lib/that-open/helpers/fragment-helpers"

export default function useBimEngineLogic({
    onLoadEndCallback,
    onLoadStartCallback,
}:{
    onLoadEndCallback?: (...args: any)=>any
    onLoadStartCallback?: (...args: any)=>any
}={}) {

    const initialized = useRef(false)
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
        await ENGINE.generateEngine(containerRef.current)
    },[])

    useLayoutEffect(() => { 
        initializeWorld?.() 
    }, [initializeWorld])

    const handleLoadIfcFile = async ()=> await loadIfcFile?.({ onLoadStart,  onLoadEnd })
    
    const handleLoadFragFile = async ()=> await loadFragFile?.({ onLoadStart,  onLoadEnd })

    return {
        containerRef,
        handleLoadIfcFile,
        handleLoadFragFile,
        isLoading, setIsLoading,
        handleClearFragments: clearFragments,
        handleDownloadFragFile: ()=>downloadFragments?.(),
    }
}