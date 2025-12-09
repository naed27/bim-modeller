import ENGINE from "@/lib/that-open/instance"
import { resetCamera } from "./camera-helpers";
import { DEFAULT_FILE_NAME, INPUT_ACCEP_FRAG, INPUT_TYPE, WORKER_URL } from "../constants"

export function setupFragmentsManager() {
  
  ENGINE.fragments.init(WORKER_URL)

  ENGINE.world?.camera?.controls?.addEventListener?.("rest", () => ENGINE.fragments?.core?.update?.(true))
  
  ENGINE.world.onCameraChanged.add((camera) => {
    for (const [, model] of ENGINE.fragments?.list){
      model?.useCamera?.(camera?.three);
    }
    ENGINE.fragments?.core?.update?.(true);
  });

  ENGINE.fragments.list.onItemSet.add(({ value: model }: { value: any }) => {
    if (!model) return
    if (model.useCamera && ENGINE.world?.camera?.three) model.useCamera(ENGINE.world.camera.three)
    if (model.object && ENGINE.world?.scene?.three) ENGINE.world.scene.three.add(model.object)
    if (ENGINE.fragments?.core) ENGINE.fragments.core.update(true)
  })

}

export const clearFragments = () => {
  ENGINE.fragments.core.update(true)
  ENGINE.fragments.list.forEach((model) => {
    model?.dispose?.()
    ENGINE.world.scene.three.remove(model.object)
  })
  
  resetCamera()
  ENGINE.fragments.list.clear()
  ENGINE.fragments.core.update(true)
}

export async function loadFragFile({
  onLoadEnd,
  onLoadStart,
}:{
  onLoadEnd?: (...args: any) => void,
  onLoadStart?: (...args: any) => void,
}): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const input = document.createElement('input')
    input.type = INPUT_TYPE
    input.accept = INPUT_ACCEP_FRAG

    input.onchange = async () => {
      onLoadStart?.()
      const file = input.files?.[0]
      if (!file) return reject()

      try {
        clearFragments()
        const data = await file.arrayBuffer()
        const buffer = new Uint8Array(data)
        
        await ENGINE.fragments.core.load(buffer, {
          modelId: file.name,
          camera: ENGINE.world.camera.three,
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

export async function downloadFragments(defaultFileName = DEFAULT_FILE_NAME) {

  const [model] = ENGINE.fragments.list.values()
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
    } catch (err) {}
  } else {
    const file = new File([buffer], defaultFileName)
    const link = document.createElement("a")
    link.href = URL.createObjectURL(file)
    link.download = file.name
    link.click()
    URL.revokeObjectURL(link.href)
  }
}
