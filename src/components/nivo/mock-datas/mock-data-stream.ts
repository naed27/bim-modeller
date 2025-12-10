
export const BIM_OBJECT_NAMES = ["Wall", "Door", "Window", "Column", "Beam", "Roof"]

export function generateRandomStreamData(
  items = 9,
  minValue = 10,
  maxValue = 200,
) {
  const data = []

  for (let i = 0; i < items; i++) {
    const point: Record<string, number> = {}
    BIM_OBJECT_NAMES.forEach(name => {
      point[name] = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
    })
    data.push(point)
  }

  return data
}

export const mockBIMData = generateRandomStreamData()
