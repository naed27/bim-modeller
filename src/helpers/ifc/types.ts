import type { 
    IfcLoader, 
    Components, 
    FragmentsManager, 
} from "@thatopen/components";
import type { RefObject  } from "react"
import type * as OBC from "@thatopen/components"

export type IfcEngine = {
    world: OBC.World
    components: Components
}

export type IfcContextShape = {
    engine?: IfcEngine
    ifcLoader?: IfcLoader
    fragments?: FragmentsManager
    downloadFragments?: () => Promise<void>
    loadIfc?: (url: string) => Promise<void>
    containerRef?: RefObject <HTMLElement | null>
    initEngine?: (container: HTMLElement) => Promise<IfcEngine>
    setupIfcLoader?: (components: Components) => Promise<IfcLoader>
    setupFragments?: (components: Components, world: OBC.World) => FragmentsManager
}