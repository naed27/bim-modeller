import * as THREE from "three"
import ENGINE from "@/lib/that-open/instance"
import { BimViewerContext } from "../bim-viewer"
import { useContext, useRef, useCallback } from "react"
import { raycast } from "@/lib/that-open/helpers/raycast-helpers"

export default function BimViewerCanvas() {
    const { containerRef } = useContext(BimViewerContext)

    const isDragging = useRef(false)
    const mouseDownPos = useRef({ x: 0, y: 0 })
    const mouse = useRef(new THREE.Vector2())

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        isDragging.current = false
        mouseDownPos.current = { x: e.clientX, y: e.clientY }
    }, [])

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const dx = e.clientX - mouseDownPos.current.x
        const dy = e.clientY - mouseDownPos.current.y
        if (Math.sqrt(dx*dx + dy*dy) > 3) isDragging.current = true
    }, [])

    const handleClick = useCallback(async (e: React.MouseEvent) => {
        if (isDragging.current) return

        mouse.current.x = e.clientX
        mouse.current.y = e.clientY

        const result = await raycast({
            mouse: mouse.current,
            camera: ENGINE.world.camera.three,
            dom: ENGINE.world.renderer!.three.domElement!,
        })

        if (!result?.point) return

        const flagDiv = document.createElement("div")
        flagDiv.innerText = "🚩"
        flagDiv.style.fontSize = "24px"
        flagDiv.style.userSelect = "none"
        flagDiv.style.pointerEvents = "none"

        ENGINE.marker.create(ENGINE.world, flagDiv, result.point, true)
    }, [])

    return (
        <div
            className="fixed inset-0 max-h-[99.9svh]"
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
        />
    )
}
