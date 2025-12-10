import { CHART_THEME } from '../theme';
import { ResponsiveBar } from '@nivo/bar'
import { NivoChartProps } from '../types'

export default function NivoBar ({ data }: NivoChartProps) {
    
    if (!data || !data.length) return null
    
    const keys = Object.keys(data?.at(0))?.filter((a)=>a!=='subject')
    
    return (
        <ResponsiveBar
            data={data}
            keys={keys}
            indexBy="subject"
            theme={CHART_THEME}
            enableLabel={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            colors={{scheme: 'category10'}}
            margin={{ top: 5, right: 5, bottom: 25, left: 25 }}
        />
    )
}