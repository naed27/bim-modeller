import * as OBC from "@thatopen/components"
import { PerspectiveCamera, OrthographicCamera } from "three"

const WORKER_URL = "/engine_fragment/worker.mjs"

export default function setupFragmentsManager(
  components: OBC.Components,
  world: OBC.World
) {
  const fragments = components.get(OBC.FragmentsManager)

  fragments.init(WORKER_URL)

  world?.camera?.controls?.addEventListener?.("rest", () => {
    fragments?.core?.update?.(true)
  })
  
  world.onCameraChanged.add((camera) => {
    for (const [, model] of fragments?.list) {
      model?.useCamera?.(camera?.three);
    }
    fragments?.core?.update?.(true);
  });

  fragments.list.onItemSet.add(({ value: model }: { value: any }) => {
    if (!model) return
    if (model.useCamera && world?.camera?.three) model.useCamera(world.camera.three)
    if (model.object && world?.scene?.three) world.scene.three.add(model.object)
    if (fragments?.core) fragments.core.update(true)
  })

  return { fragments, downloadFragments, loadFragFromFile, clearFragments }
}

export const clearFragments = ({
  scene,
  fragments,
}:{
  scene: OBC.SimpleScene,
  fragments: OBC.FragmentsManager,
}) => {
   fragments.list.forEach((model) => {
      model.object.traverse((child: any) => {
        if (child.geometry) child.geometry.dispose()
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m?: any) => m.dispose())
          } else {
            child.material.dispose()
          }
        }
      })
      scene.three.remove(model.object)
    })
    fragments.list.clear()
    fragments.core.update(true)
}

export async function loadFragFromFile({
  scene,
  camera,
  fragments,
  onLoadEnd,
  onLoadStart,
}:{
  scene: OBC.SimpleScene,
  fragments: OBC.FragmentsManager,
  onLoadEnd?: (...args: any) => void,
  onLoadStart?: (...args: any) => void,
  camera?: PerspectiveCamera | OrthographicCamera,
}): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".frag"

    input.onchange = async () => {
      onLoadStart?.()
      const file = input.files?.[0]
      if (!file) return reject("No file selected")

      try {
        clearFragments?.({ fragments, scene })

        const data = await file.arrayBuffer()
        const buffer = new Uint8Array(data)

        await fragments.core.load(buffer, {
          modelId: file.name,
          camera,
        })

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

export async function downloadFragments(
  fragments: OBC.FragmentsManager,
  defaultFileName = "model.frag"
) {
  const [model] = fragments.list.values()
  if (!model) return

  const buffer = await model.getBuffer(false)

  if ("showSaveFilePicker" in window) {
    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: defaultFileName,
        types: [
          {
            description: "Fragments File",
            accept: { "application/octet-stream": [".frag"] },
          },
        ],
      })
      const writable = await handle.createWritable()
      await writable.write(buffer)
      await writable.close()
    } catch (err) {
      console.error("Save canceled or failed", err)
    }
  } else {
    const file = new File([buffer], defaultFileName)
    const link = document.createElement("a")
    link.href = URL.createObjectURL(file)
    link.download = file.name
    link.click()
    URL.revokeObjectURL(link.href)
  }
}
