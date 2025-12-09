import * as OBC from "@thatopen/components"
import ENGINE from "@/lib/that-open/instance"
import * as OBF from "@thatopen/components-front"

export async function setupWorld(container: HTMLElement) {

    ENGINE.world.scene = new OBC.SimpleScene(ENGINE.components);

    ENGINE.world.scene = new OBC.SimpleScene(ENGINE.components);

    ENGINE.world.renderer = new OBF.PostproductionRenderer(ENGINE.components, container);

    ENGINE.world.camera = new OBC.OrthoPerspectiveCamera(ENGINE.components);

    ENGINE.world.scene.setup();

    ENGINE.world.scene.three.background = null;

    ENGINE.components.init()

    ENGINE.grids.create(ENGINE.world) 
}
