export type SwarmGroup = 'group A' | 'group B' | 'group C'

export interface SwarmDataItem {
    id: string
    group: SwarmGroup
    price: number
    volume: number
}

export function generateRandomSwarmData(
    count: number = 50,
    groups: SwarmGroup[] = ['group A', 'group B', 'group C'],
    priceRange: [number, number] = [0, 500],
    volumeRange: [number, number] = [4, 20]
): SwarmDataItem[] {
    const data: SwarmDataItem[] = []

    for (let i = 0; i < count; i++) {
        const group = groups[Math.floor(Math.random() * groups.length)]
        const price = Math.floor(Math.random() * (priceRange[1] - priceRange[0] + 1)) + priceRange[0]
        const volume = Math.floor(Math.random() * (volumeRange[1] - volumeRange[0] + 1)) + volumeRange[0]
        data.push({
            id: `${i}`,
            group,
            price,
            volume,
        })
    }

    return data
}


export const swarmLegends = [
    { id: 'group A', label: 'Group A', color: '#e41a1c' },
    { id: 'group B', label: 'Group B', color: '#377eb8' },
    { id: 'group C', label: 'Group C', color: '#4daf4a' },
]
