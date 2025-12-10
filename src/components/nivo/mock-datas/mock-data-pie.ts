export type RoomStat = {
    id: string
    label: string
    value: number
    color: string
}

function randomHSL(): string {
    const h = Math.floor(Math.random() * 360)
    const s = 60 + Math.floor(Math.random() * 20) // 60-80%
    const l = 40 + Math.floor(Math.random() * 20) // 40-60%
    return `hsl(${h}, ${s}%, ${l}%)`
}

export function generateRandomPieData(
    rooms: string[] = ['Room 1', 'Room 2', 'Room 3'],
    metrics: string[] = ['Temperature', 'IAQ', 'Humidity']
): RoomStat[] {
    const data: RoomStat[] = []

    rooms.forEach((room) => {
        metrics.forEach((metric) => {
            data.push({
                id: `${room}-${metric}`,
                label: `${room} ${metric}`,
                value: Math.floor(Math.random() * 100), 
                color: randomHSL()
            })
        })
    })

    return data
}
