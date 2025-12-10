import { CHART_THEME } from '../theme'
import { NivoChartProps } from '../types'
import { ResponsiveBullet } from '@nivo/bullet'

export default function NivoBullet({ data }: NivoChartProps) {

    if (!data || !data.length) return null

    return (
        <ResponsiveBullet
            data={data}
            spacing={30}
            titleOffsetY={5}
            measureSize={0.2}
            titleAlign="start"
            titleOffsetX={-70}
            theme={CHART_THEME}
            markerColors = {['#ffff66']}
            measureColors = {['#ff8fcf', '#33fff7']}
            rangeColors = {['#252540', '#38385c', '#4c4c78'] }
            margin={{ top: 25, right: 10, bottom: 25, left: 80 }}
        />
    )
}
