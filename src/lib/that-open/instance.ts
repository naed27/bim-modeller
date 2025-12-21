import * as OBC from "@thatopen/components"
import * as OBF from "@thatopen/components-front"
import { GeneralEditor } from "./general-editor"
import { FragmentsModel } from "@thatopen/fragments"
import { resetCamera } from "./helpers/camera-helpers"
import { setupEditor } from "./helpers/general-editor"
import { setupWorld }  from "@/lib/that-open/helpers/world-helpers"
import { setupIfcLoader } from "@/lib/that-open/helpers/ifc-helpers"
import { setupFragmentsManager } from "@/lib/that-open/helpers/fragment-helpers"

const components = new OBC.Components()
const grids = components.get(OBC.Grids)
const marker = components.get(OBF.Marker)
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
    setupEditor()
    resetCamera()
    return ENGINE
}

const ENGINE = {
    grids,
    world,
    worlds,
    marker,
    fragments,
    ifcLoader,
    components,
    highlighter,
    generateEngine,
    model: undefined as (undefined | FragmentsModel),
    generalEditor: undefined as (undefined | GeneralEditor),
}

export default ENGINE