import { 
    useRef, 
    useMemo, 
    useState,
    useCallback, 
    useLayoutEffect, 
} from "react"
import { 
    loadFragFile, 
    clearFragments, 
    downloadFragments, 
    loadSampleFragModel,
} from "@/lib/that-open/helpers/fragment-helpers"
import * as THREE from "three"
import { ThreeMarker } from "@/lib/types"
import ENGINE from "@/lib/that-open/instance"
import { loadIfcFile } from "@/lib/that-open/helpers/ifc-helpers"
import { raycast } from "@/lib/that-open/helpers/raycast-helpers"

export default function useBimEngineLogic({
    onLoadEndCallback,
    onLoadStartCallback,
}:{
    onLoadEndCallback?: (...args: any)=>any
    onLoadStartCallback?: (...args: any)=>any
}={}) {

    const isDragging = useRef(false)
    const mouse = useRef(new THREE.Vector2())
    const mouseDownPos = useRef({ x: 0, y: 0 })

    const initialized = useRef(false)
    const [engine, setEngine] = useState<any>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [markers, setMarkers] = useState<ThreeMarker[]>([])
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [showMarkers, setShowMarkers] = useState<boolean>(false)
    const [transformMode, setTransformMode] = useState<'translate' | 'rotate'>('translate')

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
        setMarkers?.([])
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

    const handleClearFragments = async ()=> {
        setMarkers?.([])
        await clearFragments?.({ onLoadStart,  onLoadEnd })
    }

    const handleDownloadFragFile = ()=> downloadFragments?.()

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        isDragging.current = false
        mouseDownPos.current = { x: e.clientX, y: e.clientY }
    }, [])

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const dx = e.clientX - mouseDownPos.current.x
        const dy = e.clientY - mouseDownPos.current.y
        if (Math.sqrt(dx*dx + dy*dy) > 3) isDragging.current = true
    }, [])

    const handleAddMarker = useCallback(async (e: React.MouseEvent) => {
        if (isDragging.current) return
        if(!showMarkers) return

        mouse.current.x = e.clientX
        mouse.current.y = e.clientY

        const result = await raycast({
            mouse: mouse.current,
            camera: ENGINE.world.camera.three,
            dom: ENGINE.world.renderer!.three.domElement!,
        })

        if (!result?.point) return

        const newMarker = {
            id: crypto.randomUUID?.(),
            objectVector3Coordinates: result.point,
        }
        
        setMarkers((currentMarkers)=>[...currentMarkers, newMarker])

    }, [showMarkers])

    return {
        hasModel,
        containerRef,
        handleMouseDown,
        handleMouseMove,
        handleAddMarker,
        handleLoadIfcFile,
        handleLoadFragFile,
        markers, setMarkers,
        handleClearFragments,
        handleDownloadFragFile,
        isLoading, setIsLoading,
        handleLoadSampleFragFile,
        isEditMode, setIsEditMode,
        showMarkers, setShowMarkers,
        transformMode, setTransformMode,
    }
}