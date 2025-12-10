import { CHART_THEME } from '../theme'
import { ResponsivePie } from '@nivo/pie'
import { NivoChartProps } from '../types'
import { abbreviate } from '@/helpers/format-helpers'

export default function NivoPie ({ data }: NivoChartProps) {

    if (!data || !data.length) return null

    return (
       <ResponsivePie
            data={data}
            padAngle={0.6}
            cornerRadius={2}
            innerRadius={0.5}
            theme={CHART_THEME}
            enableArcLabels={false}
            arcLinkLabelsOffset={0} 
            enableArcLinkLabels={true}
            arcLinkLabelsSkipAngle={10}
            colors={{ scheme: 'dark2' }}
            arcLinkLabelsTextColor="#fff"
            arcLinkLabelsDiagonalLength={10}
            arcLinkLabelsStraightLength={10}
            margin={{ top: 15, right: 15, bottom: 15, left: 15 }}
            arcLinkLabel={(data) => abbreviate(String(data?.label))}
        />
    )
}