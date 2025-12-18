import { Vector3 } from "three"
import { RefObject } from "react"
import ENGINE from "../instance"

const projected = new Vector3()

export const updateMarkerCoordinates = ({
    ref,
    objectVector3Coordinates
}:{
    objectVector3Coordinates: Vector3
    ref: RefObject<HTMLDivElement | null>
}) => {

    
      if (!ref.current) return

      const camera = ENGINE.world.camera.three
      const renderer = ENGINE.world.renderer?.three
      if (!camera || !renderer) return

      projected.copy(objectVector3Coordinates)
      projected.project(camera)

      if (projected.z > 1 || objectVector3Coordinates.y < 0) {
        ref.current.style.display = "none"
        return
      }

      ref.current.style.display = "block"

      const x = (projected.x * 0.5 + 0.5) * renderer.domElement.clientWidth
      const y = (-projected.y * 0.5 + 0.5) * renderer.domElement.clientHeight

      ref.current.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`
}