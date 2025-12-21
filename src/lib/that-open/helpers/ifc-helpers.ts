import ENGINE from "@/lib/that-open/instance"
import { clearFragments } from "@/lib/that-open/helpers/fragment-helpers"
import { IFC_LOADER_WASM_PATH, INPUT_ACCEPT_IFC, INPUT_TYPE } from "../constants"

export async function setupIfcLoader() {
    await ENGINE.ifcLoader.setup({
        autoSetWasm: false,
        wasm: {
            absolute: true,
            path: IFC_LOADER_WASM_PATH,
        }
    })
}

export async function loadIfcFile({
  onLoadEnd,
  onLoadStart,
  onClearCallback,
  onSuccessfulLoad,
}:{
  onLoadEnd?: (...args: any) => void,
  onLoadStart?: (...args: any) => void,
  onClearCallback?: (...args: any) => void,
  onSuccessfulLoad?: (...args: any) => void,
}) {
  return new Promise<void>((resolve, reject) => {
    const input = document.createElement('input')
    input.type = INPUT_TYPE
    input.accept = INPUT_ACCEPT_IFC

    input.onchange = async () => {
      onLoadStart?.()
      const file = input.files?.[0]
      if (!file) return reject()

      try {
        
        clearFragments({onClearCallback})
        const data = await file.arrayBuffer()
        const buffer = new Uint8Array(data)

        const model = await ENGINE.ifcLoader.load(buffer, false, file.name, {
          processData: {
            progressCallback: (progress) => {
              console.log('Loading Progress (%): ', (progress * 100));
            },
          },
        })

        ENGINE.model = model
        
        onSuccessfulLoad?.()
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

