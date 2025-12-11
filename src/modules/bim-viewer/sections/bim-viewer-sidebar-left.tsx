import { useContext } from "react"
import { BimViewerContext } from "../bim-viewer"
import CountCard from "@/components/ui/count-card"
import PercentageCard from "@/components/ui/percentage-card";
import { TabsNavigator } from "@/components/ui/tabs-navigator"
import SmartChartDemo from "@/components/nivo/smart-chart-demo"
import SmartSidebar from "@/layouts/smart-sidebar/smart-sidebar"
import { COUNT_CARDS_POOL, getRandomizedCards, PERCENTAGE_CARDS_POOL } from "@/mocker/mock-data";

const tabs = [
  {
    title: 'Stats',
    content: (
      <div className='flex h-full flex-col gap-5 justify-center overflow-hidden'>
        <div>
          <div className='flex w-full h-full gap-2 content-start'>
            <div className='grow flex flex-wrap gap-2'>
              {getRandomizedCards(COUNT_CARDS_POOL, 4, "count", 1, 20)?.map((item, idx) => <CountCard key={`${item?.label}${idx}`} {...item}/>)}
            </div>
            <div className='flex flex-col gap-2'>
              {getRandomizedCards(PERCENTAGE_CARDS_POOL, 1, "percentage", 10, 100)?.map((item, idx) => <PercentageCard key={`${item?.label}${idx}`} {...item}/>)}
            </div>
          </div>
        </div>
        <div className='grow w-full flex'>
          <SmartChartDemo className='grow' type={'swarmplot'} refreshDataInterval={20000}/>
        </div>
        <div>
          <div className='flex w-full h-full gap-2 content-start'>
            <div className='grow flex flex-wrap gap-2'>
              {getRandomizedCards(COUNT_CARDS_POOL, 8, "count", 1, 20)?.map((item, idx) => <CountCard key={`${item?.label}${idx}`} {...item}/>)}
            </div>
            <div className='flex flex-col gap-2'>
              {getRandomizedCards(PERCENTAGE_CARDS_POOL, 2, "percentage", 10, 100)?.map((item, idx) => <PercentageCard key={`${item?.label}${idx}`} {...item}/>)}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Charts',
    content: (
      <div className='flex h-full flex-col gap-5 justify-center overflow-hidden'>
        <SmartChartDemo className='grow' type={'stream'} refreshDataInterval={20000}/>
        <SmartChartDemo className='grow' type={'swarmplot'} refreshDataInterval={20000}/>
        <SmartChartDemo className='grow' type={'pie'} refreshDataInterval={20000}/>
      </div>
    ),
  },
  {
    title: 'Counts',
    content: (
      <div className='flex w-full h-full gap-2 content-start'>
        <div className='grow flex flex-wrap gap-2'>
          {getRandomizedCards(COUNT_CARDS_POOL, 18, "percentage", 1, 20)?.map((item, idx) => <CountCard key={`${item?.label}${idx}`} {...item}/>)}
        </div>
        <div className='flex flex-col gap-2'>
          {getRandomizedCards(PERCENTAGE_CARDS_POOL, 4, "percentage", 10, 100)?.map((item, idx) => <PercentageCard key={`${item?.label}${idx}`} {...item}/>)}
        </div>
      </div>
    ),
  },
];

export default function BimViewerSidebarLeft() {

    const { sidebarLeftLogic } = useContext(BimViewerContext)

    return (
        <SmartSidebar {...sidebarLeftLogic} className='self-start pt-0'>
            <TabsNavigator tabs={tabs} currentTab={sidebarLeftLogic?.contextValue?.tabIndex}/>
        </SmartSidebar>
    )
}