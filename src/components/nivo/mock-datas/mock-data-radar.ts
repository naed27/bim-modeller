type MockDataItem = Record<string, string | number>

export function generateRandomRadarData(
    categories: string[] = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5"],
    metrics: string[] = ["Temperature", "IAQ", "Humidity"],
    count: number = 5,
    valueRange: [number, number] = [20, 100]
): MockDataItem[] {
    const data: MockDataItem[] = []
    for (let i = 0; i < count; i++) {
        const item: MockDataItem = {}
        item['subject'] = categories[i % categories.length]
        metrics.forEach(metric => {
            const [min, max] = valueRange
            item[metric.toLowerCase()] = Math.floor(Math.random() * (max - min + 1)) + min
        })
        data.push(item)
    }
    return data
}