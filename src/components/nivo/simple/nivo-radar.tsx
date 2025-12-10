import { CHART_THEME } from '../theme'
import { NivoChartProps } from '../types'
import { ResponsiveRadar } from '@nivo/radar'

export default function NivoRadar ({ data }: NivoChartProps) {

    if (!data || !data.length) return null

    const keys = Object.keys(data?.at(0))?.filter((a)=>a!=='subject')
    
    return (
        <ResponsiveRadar
        data={data}
        keys={keys}
        dotSize={10}
        indexBy="subject"
        dotBorderWidth={2}
        theme={CHART_THEME}
        gridLabelOffset={36}
        blendMode="multiply"
        colors={{scheme: 'green_blue'}}
        dotColor={{ theme: 'background' }}
        margin={{ top: 44, right: 25, bottom: 44, left: 25 }}/>
    )
}