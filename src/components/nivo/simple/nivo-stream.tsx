import { CHART_THEME } from '../theme'
import { NivoChartProps } from '../types'
import { ResponsiveStream } from '@nivo/stream'

export default function NivoStream({ data }: NivoChartProps) {
  if (!data || !data.length) return null

  const keys = Object.keys(data[0])

  return (
   <ResponsiveStream
    data={data}
    keys={keys}
    dotSize={8}
    offsetType="none"
    dotBorderWidth={2}
    enableGridX={true}
    enableGridY={false}
    theme={CHART_THEME}
    colors={{ scheme: 'blue_green' }}
    margin={{ top: 5, right: 85, bottom: 25, left: 28 }}
    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    dotBorderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
    legends={[
        {
            itemWidth: 80,
            itemHeight: 20,
            translateX: 100,
            direction: 'column',
            symbolShape: 'circle',
            anchor: 'bottom-right',
            itemTextColor: '#ffffff',
        },
    ]}
    />
  )
}
