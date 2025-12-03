
import initializeEngine  from "../helpers/ifc/engine";
import setupIfcLoader from "../helpers/ifc/ifc-loader";
import setupController from "../helpers/ifc/controller";
import setupFragmentsManager from "../helpers/ifc/fragments";
import { setupInteractor } from "../helpers/ifc/interactor";

export const generateIfcRenderer = async ({
    containerElement,
}:{
    containerElement: HTMLDivElement
}) => {
    
    const { components, world } = await initializeEngine(containerElement)

    const ifcManager = await setupIfcLoader(components)

    const fragmentsManager = setupFragmentsManager(components, world)

    setupController({ speed: 1, camera: world?.camera })

    setupInteractor({
        components, world, container: containerElement, ifcLoader: ifcManager?.ifcLoader
    })

    return {
        world,
        components,
        ifcManager,
        fragmentsManager,
    }
}