import * as THREE from "three"
import * as OBF from "@thatopen/components-front"
import type { Components, IfcLoader, SimpleCamera, SimpleRenderer, SimpleScene, SimpleWorld } from "@thatopen/components"

export function setupInteractor({
    world,
    container,
    components,
}: {
    ifcLoader: IfcLoader
    container: HTMLElement
    components: Components,
    world: SimpleWorld<SimpleScene, SimpleCamera, SimpleRenderer>
}) {

    const hoverer = components.get(OBF.Hoverer)
    hoverer.world = world
    hoverer.enabled = true
    hoverer.material = new THREE.MeshBasicMaterial({
        opacity: 0.5,
        color: 0x6528d7,
        depthTest: false,
        transparent: true,
    })

    // --- Add click interaction ---
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    function onClick(event: MouseEvent) {
        const rect = container.getBoundingClientRect()
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

        raycaster.setFromCamera(mouse, world.camera.three)
        
        const intersects = raycaster.intersectObjects(world?.scene?.three as any, true)

        if (intersects.length > 0) {
            const object = intersects[0].object
            console.log(object);
            
            // const id = ifcLoader?.webIfc?.GetExpressIdFromGuid(object)
            // if (id) {
            //     ifcLoader.ifcManager.getItemProperties(0, id, true).then((props?: any) => {
            //         console.log("Clicked IFC object:", props)
            //     })
            // }
        }
    }

    container.addEventListener("click", onClick)

    return {
        dispose: () => container.removeEventListener("click", onClick),
    }
}
