import { Vector3, Matrix4 } from "three"
import ENGINE from "@/lib/that-open/instance"

export const TARGET = new Vector3()
export const POSITION = new Vector3()
export const FORWARD = new Vector3()
export const RIGHT = new Vector3()
export const UP = new Vector3(0, 1, 0)

type ControllerOptions = {
    speed?: number
    rotationSpeed?: number
}

export function setupController({
    speed = 1,
    rotationSpeed = 0.033,
}: ControllerOptions) {

    const controls = ENGINE.world.camera.controls
    controls.enabled = true

    // --- Key tracking ---
    const keys: Record<string, boolean> = {}

    let running = false
    let interval: number

    function startLoop() {
        if (!running) {
            running = true
            interval = window.setInterval(update, 16) // ~60fps
        }
    }

    function stopLoop() {
        if (running) {
            running = false
            clearInterval(interval)
        }
    }

    window.addEventListener("keydown", e => {
        keys[e.key.toLowerCase()] = true
        startLoop()
    })

    window.addEventListener("keyup", e => {
        keys[e.key.toLowerCase()] = false
        if (!Object.values(keys).some(v => v)) stopLoop()
    })

    // --- Update function ---
    async function update() {
        
        let moved = false

        // Fetch live camera position & target
        controls.getPosition(POSITION)
        controls.getTarget(TARGET)

        // Forward and right vectors
        FORWARD.copy(TARGET).sub(POSITION).normalize()
        RIGHT.copy(FORWARD).cross(UP).normalize()

        // Movement
        if (keys["w"]) { POSITION.addScaledVector(FORWARD, speed); TARGET.addScaledVector(FORWARD, speed); moved = true }
        if (keys["s"]) { POSITION.addScaledVector(FORWARD, -speed); TARGET.addScaledVector(FORWARD, -speed); moved = true }
        if (keys["a"]) { POSITION.addScaledVector(RIGHT, -speed); TARGET.addScaledVector(RIGHT, -speed); moved = true }
        if (keys["d"]) { POSITION.addScaledVector(RIGHT, speed); TARGET.addScaledVector(RIGHT, speed); moved = true }

        // Rotation
        if (keys["arrowleft"]) { 
            const m = new Matrix4().makeRotationY(rotationSpeed)
            FORWARD.copy(TARGET).sub(POSITION).applyMatrix4(m)
            TARGET.copy(POSITION).add(FORWARD)
            moved = true
        }
        if (keys["arrowright"]) { 
            const m = new Matrix4().makeRotationY(-rotationSpeed)
            FORWARD.copy(TARGET).sub(POSITION).applyMatrix4(m)
            TARGET.copy(POSITION).add(FORWARD)
            moved = true
        }
        if (keys["arrowup"]) { 
            const m = new Matrix4().makeRotationAxis(RIGHT, rotationSpeed)
            FORWARD.copy(TARGET).sub(POSITION).applyMatrix4(m)
            TARGET.copy(POSITION).add(FORWARD)
            moved = true
        }
        if (keys["arrowdown"]) { 
            const m = new Matrix4().makeRotationAxis(RIGHT, -rotationSpeed)
            FORWARD.copy(TARGET).sub(POSITION).applyMatrix4(m)
            TARGET.copy(POSITION).add(FORWARD)
            moved = true
        }

        if (moved) {
            await controls.setLookAt(POSITION.x, POSITION.y, POSITION.z, TARGET.x, TARGET.y, TARGET.z)
        }
    }

    return {
        dispose: () => {
            clearInterval(interval)
            window.removeEventListener("keydown", () => {})
            window.removeEventListener("keyup", () => {})
        }
    }
}
