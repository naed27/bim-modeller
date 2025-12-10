import { CHART_THEME } from '../theme'
import { NivoChartProps } from '../types'
import { ResponsiveSwarmPlot } from '@nivo/swarmplot'

export default function NivoSwarmplot({ data }: NivoChartProps) {
    
    if (!data || !data.length) return null

    const keys = Object.keys(data?.reduce?.((acc, item)=>{
        acc[item?.group] = true
        return acc
    },{}))
    
    return (
        <ResponsiveSwarmPlot
        data={data}
        groups={keys}
        value="price"
        forceStrength={4}
        theme={CHART_THEME}
        simulationIterations={100}
        margin={{ top: 5, right: 28, bottom: 25, left: 28 }}
        size={{ key: 'volume', values: [4, 20], sizes: [6, 20] }}
        valueScale={{ type: 'linear', min: 0, max: 500, reverse: false }}/>
    )
}