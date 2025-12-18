
import { Matrix4, Vector3 } from "three"
import ENGINE from "@/lib/that-open/instance"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

const POSITION = new Vector3()
const TARGET = new Vector3()
const FORWARD = new Vector3()
const RIGHT = new Vector3()
const UP = new Vector3(0, 1, 0)

export function useBimViewerController({
  speed = 1,
  rotationSpeed = 0.033,
}: {
  speed?: number
  rotationSpeed?: number
}) {

    const [isEnabled, setIsEnabled] = useState(true) 

    const keysRef = useRef<Record<string, boolean>>({})
    const runningRef = useRef(false)
    const intervalRef = useRef<number | null>(null)

    const startLoop = () => {
        if (!runningRef.current) {
            runningRef.current = true
            intervalRef.current = window.setInterval(update, 16)
        }
    }

    const stopLoop = () => {
        runningRef.current = false
        if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        }
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (!isEnabled) return
        keysRef.current[e.key.toLowerCase()] = true
        startLoop()
    }

    const onKeyUp = (e: KeyboardEvent) => {
        keysRef.current[e.key.toLowerCase()] = false
        if (!Object.values(keysRef.current).some(Boolean)) {
        stopLoop()
        }
    }

    const update = async () => {
        
        const controls = ENGINE.world.camera.controls

        if (!controls) return
        if (!isEnabled) return

        let moved = false

        controls.getPosition(POSITION)
        controls.getTarget(TARGET)

        FORWARD.copy(TARGET).sub(POSITION).normalize()
        RIGHT.copy(FORWARD).cross(UP).normalize()

        // Movement
        if (keysRef.current["w"]) { POSITION.addScaledVector(FORWARD, speed); TARGET.addScaledVector(FORWARD, speed); moved = true }
        if (keysRef.current["s"]) { POSITION.addScaledVector(FORWARD, -speed); TARGET.addScaledVector(FORWARD, -speed); moved = true }
        if (keysRef.current["a"]) { POSITION.addScaledVector(RIGHT, -speed); TARGET.addScaledVector(RIGHT, -speed); moved = true }
        if (keysRef.current["d"]) { POSITION.addScaledVector(RIGHT, speed); TARGET.addScaledVector(RIGHT, speed); moved = true }

        // Rotation
        if (keysRef.current["arrowleft"]) {
            const m = new Matrix4().makeRotationY(rotationSpeed)
            FORWARD.copy(TARGET).sub(POSITION).applyMatrix4(m)
            TARGET.copy(POSITION).add(FORWARD)
            moved = true
        }

        if (keysRef.current["arrowright"]) {
            const m = new Matrix4().makeRotationY(-rotationSpeed)
            FORWARD.copy(TARGET).sub(POSITION).applyMatrix4(m)
            TARGET.copy(POSITION).add(FORWARD)
            moved = true
        }

        if (keysRef.current["arrowup"]) {
            const m = new Matrix4().makeRotationAxis(RIGHT, rotationSpeed)
            FORWARD.copy(TARGET).sub(POSITION).applyMatrix4(m)
            TARGET.copy(POSITION).add(FORWARD)
            moved = true
        }

        if (keysRef.current["arrowdown"]) {
            const m = new Matrix4().makeRotationAxis(RIGHT, -rotationSpeed)
            FORWARD.copy(TARGET).sub(POSITION).applyMatrix4(m)
            TARGET.copy(POSITION).add(FORWARD)
            moved = true
        }

        if (moved) {
            await controls.setLookAt(
                POSITION.x, POSITION.y, POSITION.z,
                TARGET.x, TARGET.y, TARGET.z
            )
        }
    }

    const enable = () => setIsEnabled(true)
    const disable = () => setIsEnabled(false)
    const toggle = () => setIsEnabled((c)=>!c)

    useEffect(() => {
        const controls = ENGINE.world.camera.controls
        if(!controls) return
        controls.enabled = isEnabled

        if (!isEnabled) {
            keysRef.current = {}
            stopLoop()
        }

        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("keyup", onKeyUp)

        return () => {
            stopLoop()
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("keyup", onKeyUp)
        }
    }, [isEnabled, speed, rotationSpeed])
    

    return {
        enable, disable, toggle
    }

}
