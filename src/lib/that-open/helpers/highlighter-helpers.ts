import * as THREE from "three";
import ENGINE from "@/lib/that-open/instance";
import type { ModelIdMap } from "@thatopen/components"

export function setupHighlighter() {
    ENGINE.highlighter.setup({ 
        world: ENGINE.world, 
        selectMaterialDefinition: {
            opacity: 1,
            renderedFaces: 0,
            transparent: false,
            color: new THREE.Color("lightblue"),
        }
    })

    ENGINE.highlighter.events.select.onHighlight.add(async (modelIdMap) => {
        const selectedData = await fetchSelectedItemsData(modelIdMap)
        console.log("Selected items data:", selectedData)
    })

    ENGINE.highlighter.events.select.onClear.add(() => {
        console.log("Selection cleared")
    })
}

async function fetchSelectedItemsData(
    modelIdMap: ModelIdMap,
) {
    const promises = Object.entries(modelIdMap).map(async ([modelId, localIds]) => {
        const model = ENGINE.fragments.list.get(modelId)
        if (!model) {
            console.warn(`Model not found: ${modelId}`)
            return []
        }
        return model.getItemsData([...localIds])
    })

    const results = await Promise.all(promises)
    return results.flat()
}
