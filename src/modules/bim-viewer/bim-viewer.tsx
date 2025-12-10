import '@/lib/that-open/instance'
import { createContext } from "react";
import BimViewerCanvas from './components/bim-viewer-canvas'
import useBimViewerLogic from './hooks/use-bim-viewer-logic'
import BimControlPanel from './components/bim-control-panel';
import { TabsNavigator } from '@/components/ui/tabs-navigator';
import SmartChartDemo from '@/components/nivo/smart-chart-demo';
import SmartSidebar from '@/layouts/smart-sidebar/smart-sidebar';
import BimViewerUIOverlay from './layouts/bim-viewer-ui-overlay';
import BimViewerWindowPool from './layouts/bim-viewer-window-pool';
import BimViewerLeftCharts from './sections/bim-viewer-left-charts';
import BimViewerLeftCounts from './sections/bim-viewer-left-counts';
import LoadingSpinnerInAModal from "@/components/ui/loading-spinner-in-a-modal"
import BimViewerLeftChartsAndCounts from './sections/bim-viewer-left-charts-and-counts';

export const BimViewerContext = createContext({} as ReturnType<typeof useBimViewerLogic>);

  const tabs = [
    {
      title: 'Charts & Counts',
      content: <BimViewerLeftChartsAndCounts/>,
    },
    {
      title: 'Charts',
      content: <BimViewerLeftCharts/>,
    },
    {
      title: 'Counts',
      content: <BimViewerLeftCounts/>,
    },
  ];


export default function BimViewer() {
    
    const contextValue = useBimViewerLogic()

    return (
        <BimViewerContext.Provider value={contextValue}>
            <BimViewerCanvas/>
            <BimViewerUIOverlay>
                <BimViewerWindowPool>
                    <SmartSidebar {...contextValue?.sidebarLeftLogic} className='self-start pt-0'>
                        <TabsNavigator tabs={tabs}/>
                    </SmartSidebar>
                    
                    <SmartSidebar {...contextValue?.sidebarRightLogic} className='self-end ml-auto'>
                        <div className='flex h-full flex-col gap-5 justify-center overflow-hidden'>
                            <SmartChartDemo className='grow' type={'bar'} refreshDataInterval={60000}/>
                            <SmartChartDemo className='grow' type={'bullet'} refreshDataInterval={60000}/>
                            <SmartChartDemo className='grow' type={'radar'} refreshDataInterval={60000}/>
                        </div>
                    </SmartSidebar>
                </BimViewerWindowPool>
                <BimControlPanel/>
            </BimViewerUIOverlay>
            <LoadingSpinnerInAModal showWhen={contextValue?.isLoading}/>
        </BimViewerContext.Provider>
    )
}