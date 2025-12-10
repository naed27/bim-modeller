import '@/lib/that-open/instance'
import * as BUI from "@thatopen/ui"
import BimViewer from './modules/bim-viewer/bim-viewer'

BUI.Manager.init()

function App() {

  return (
    <>
      <BimViewer/>
    </>
  )
}

export default App
