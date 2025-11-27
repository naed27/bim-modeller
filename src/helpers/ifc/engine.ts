import * as OBC from "@thatopen/components"

export const INITIAL_CAMERA_POSITION = {
    targetX: 26,
    targetY: -4,
    targetZ: 25,
    positionX: 78,
    positionY: 20,
    positionZ: -2.2,
}

export default async function initializeEngine(container: HTMLElement) {
    const components = new OBC.Components()

    const worlds = components.get(OBC.Worlds)
    const world = worlds.create<
        OBC.SimpleScene,
        OBC.SimpleCamera,
        OBC.SimpleRenderer
    >();
    
    world.scene = new OBC.SimpleScene(components);

    world.scene = new OBC.SimpleScene(components);
    
    world.renderer = new OBC.SimpleRenderer(components, container);
    world.camera = new OBC.SimpleCamera(components);

    world.scene.setup();
    world.scene.three.background = null;
    
    await world.camera.controls.setLookAt(
        INITIAL_CAMERA_POSITION?.positionX,
        INITIAL_CAMERA_POSITION?.positionY,
        INITIAL_CAMERA_POSITION?.positionZ,
        INITIAL_CAMERA_POSITION?.targetX,
        INITIAL_CAMERA_POSITION?.targetY,
        INITIAL_CAMERA_POSITION?.targetZ,
    );

    components.init()

    const grids = components.get(OBC.Grids)
    grids.create(world) 

    return { components, world }
}
