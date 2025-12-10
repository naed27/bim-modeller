import SmartChartDemo from "@/components/nivo/smart-chart-demo";

export default function BimViewerLeftCharts() {

    return (
        <div className='flex h-full flex-col gap-5 justify-center overflow-hidden'>
            <SmartChartDemo className='grow' type={'stream'} refreshDataInterval={60000}/>
            <SmartChartDemo className='grow' type={'swarmplot'} refreshDataInterval={60000}/>
            <SmartChartDemo className='grow' type={'pie'} refreshDataInterval={60000}/>
        </div>
    )
}