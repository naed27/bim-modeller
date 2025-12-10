import * as OBC from "@thatopen/components"
import { CONTROLLER_SPEED } from "./constants"
import * as OBF from "@thatopen/components-front"
import { resetCamera } from "./helpers/camera-helpers"
import { setupWorld }  from "@/lib/that-open/helpers/world-helpers"
import { setupIfcLoader } from "@/lib/that-open/helpers/ifc-helpers"
import { setupController } from "@/lib/that-open/helpers/controller-helpers"
import { setupHighlighter } from "@/lib/that-open/helpers/highlighter-helpers"
import { setupFragmentsManager } from "@/lib/that-open/helpers/fragment-helpers"

const components = new OBC.Components()

const grids = components.get(OBC.Grids)
const worlds = components.get(OBC.Worlds)
const ifcLoader = components.get(OBC.IfcLoader)
const highlighter = components.get(OBF.Highlighter)
const fragments = components.get(OBC.FragmentsManager)

const world = worlds.create<
    OBC.SimpleScene,
    OBC.SimpleCamera,
    OBC.SimpleRenderer
>();

const generateEngine = async (containerElement: HTMLDivElement) => {
    await setupWorld(containerElement)
    await setupIfcLoader()
    setupFragmentsManager()
    setupController({ speed: CONTROLLER_SPEED })
    setupHighlighter()
    resetCamera()
    return {}
}

const ENGINE = {
    grids,
    world,
    worlds,
    fragments,
    ifcLoader,
    components,
    highlighter,
    generateEngine,
}

export default ENGINE