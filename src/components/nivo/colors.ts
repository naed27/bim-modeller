export const CYBERPUNK_PALETTE: string[] = Array.from({ length: 100 }, () => {
    // Base neon colors
    const baseColors = [
        [255, 30, 150],   // neon pink
        [0, 255, 255],    // cyan
        [255, 255, 0],    // yellow
        [255, 105, 180],  // hot pink
        [0, 255, 100],    // neon green
        [180, 0, 255],    // neon purple
        [255, 150, 0],    // neon orange
    ]

    // Pick a base color
    const [rBase, gBase, bBase] = baseColors[Math.floor(Math.random() * baseColors.length)]

    // Add small random variation +/- 20
    const r = Math.min(255, Math.max(0, rBase + Math.floor(Math.random() * 41 - 20)))
    const g = Math.min(255, Math.max(0, gBase + Math.floor(Math.random() * 41 - 20)))
    const b = Math.min(255, Math.max(0, bBase + Math.floor(Math.random() * 41 - 20)))

    // Slight opacity variation between 0.35-0.5
    const a = +(0.35 + Math.random() * 0.15).toFixed(2)

    return `rgba(${r}, ${g}, ${b}, ${a})`
})
