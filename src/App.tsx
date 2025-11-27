import * as BUI from "@thatopen/ui"
import useIfcRenderer from "./hooks/useIfcRenderer"
import BimPanel from "./components/bim/basic/bim-panel"
import BimButton from "./components/bim/basic/bim-button"
import BimPanelSection from "./components/bim/basic/bim-panel-section"
import LoadingSpinnerInAModal from "./components/common/loading-spinner-in-a-modal"

BUI.Manager.init()

function App() {

  const { 
    isLoading,
    containerRef,
    handleLoadIfcFile,
    handleLoadFragFile,
    handleClearFragments,
    handleDownloadFragFile,
  } = useIfcRenderer()

  return (
    <>
      <div className="fixed inset-0" ref={containerRef} />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute right-1 top-1 w-[300px]">
          <BimPanel label="File Handlers">
            <BimPanelSection label=".FRAG Files">
              <BimButton label="Load FRAG File" onClick={handleLoadFragFile}/>
              <BimButton label="Download FRAG" onClick={handleDownloadFragFile}/>
            </BimPanelSection>
            <BimPanelSection label=".IFC Files">
              <BimButton label="Load IFC File" onClick={handleLoadIfcFile}/>
            </BimPanelSection>
            <BimPanelSection label="Canvas">
              <BimButton label="Clear Canvas" onClick={handleClearFragments}/>
            </BimPanelSection>
          </BimPanel>
        </div>
        <div className="absolute left-1 bottom-1 w-[300px]">
          <BimPanel>
             <BimPanelSection label="Controls">
              <BimButton label="WASD Keys = camera movement" className='h-4'/>
              <BimButton label="Arrow Keys = camera rotation" className='h-4'/>
              <BimButton label="Mouse Drag = camera rotation" className='h-4'/>
              <BimButton label="Mouse Scroll = camera forward/backward" className='h-4'/>
            </BimPanelSection>
          </BimPanel>
        </div>
      </div>
      <LoadingSpinnerInAModal showWhen={isLoading}/>
    </>
  )
}

export default App
