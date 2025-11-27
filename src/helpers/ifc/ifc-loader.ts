import * as OBC from "@thatopen/components"
import { clearFragments } from "./fragments"

export default async function setupIfcLoader(components: OBC.Components) {
    const ifcLoader = components.get(OBC.IfcLoader)

    await ifcLoader.setup({
        autoSetWasm: false,
        wasm: {
            absolute: true,
            path: "https://unpkg.com/web-ifc@0.0.72/",
        }
    })

    return { ifcLoader, loadIfcFromFile }
}

export async function loadIfcFromFile({
  scene,
  ifcLoader,
  fragments,
  onLoadEnd,
  onLoadStart,
}:{
  ifcLoader: OBC.IfcLoader,
  fragments: OBC.FragmentsManager,
  scene: OBC.SimpleScene,
  onLoadStart?: (...args: any) => void,
  onLoadEnd?: (...args: any) => void,
}) {
  return new Promise<void>((resolve, reject) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".ifc"

    input.onchange = async () => {
      onLoadStart?.()
      const file = input.files?.[0]
      if (!file) return reject("No file selected")

      try {
        
        clearFragments({scene, fragments})

        const data = await file.arrayBuffer()
        const buffer = new Uint8Array(data)

        await ifcLoader.load(buffer, false, file.name)
        resolve()
      } catch (err) {
        reject(err)
      }finally{
        onLoadEnd?.()
      }
    }

    input.click()
  })
}

