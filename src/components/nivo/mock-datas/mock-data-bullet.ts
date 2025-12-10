export interface BulletItem {
    id: string
    ranges: number[]
    measures: number[]
    markers: number[]
}

// integer random between inclusive [min, max]
const randInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min

// float random between (min, max)
const rand = (min: number, max: number): number =>
    +(Math.random() * (max - min) + min).toFixed(2)

// generate array of 'count' random floats between min and max
const randArray = (count: number, min: number, max: number): number[] =>
    Array.from({ length: count }, () => rand(min, max))

/**
 * Generate bullet-like data where ranges contain
 * semantic breakpoints: min, some random low ranges, midValue, some higher ranges, max.
 */
export function generateRandomBulletData(ids: string[] = [
    "temp",
    "power",
    "volume",
]): BulletItem[] {
    return ids.map((id) => {
        // pick base scale appropriate for a metric (flexible)
        const baseMax = rand(10, 50)
        const minValue = 0

        // semantically useful values derived from baseMax
        const midValue = rand(baseMax * 0.2, baseMax * 0.5)
        const highValue = rand(baseMax * 0.5, baseMax * 0.9)

        // random noise values around those ranges
        const lowNoise = randArray(randInt(1, 3), minValue, midValue)
        const midNoise = randArray(randInt(0, 3), midValue * 0.9, highValue * 1.1)
        const highNoise = randArray(randInt(0, 2), highValue, baseMax)

        // assemble ranges: ensure unique + sorted ascending
        const ranges = Array.from(
            new Set([minValue, ...lowNoise, midValue, ...midNoise, highValue, ...highNoise, baseMax])
        ).sort((a, b) => a - b)

        // measures: 1-2 values typically within [min, baseMax]
        const measures = randArray(randInt(1, 2), minValue, baseMax).map(n => Number(n.toFixed(2)))

        // markers: 1-2 markers often near high end or mid
        const markers = randArray(randInt(1, 2), Math.max(minValue, midValue * 0.8), baseMax).map(n =>
            Number(n.toFixed(2))
        )

        return {
            id,
            ranges,
            measures,
            markers,
        }
    })
}
