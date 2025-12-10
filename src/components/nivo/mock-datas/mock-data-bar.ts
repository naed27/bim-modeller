export interface SubjectStats {
    subject: string
    [className: string]: string | number
}

// random integer between min and max inclusive
const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1))

/**
 * Generate mock stats for subjects and classes
 * @param subjects array of subject names (e.g., rooms, students)
 * @param classes array of class names (e.g., metrics: temperature, humidity)
 * @param max optional max value (default 100)
 */
export function generateRandomBarData(
    subjects: string[] = ["Room 1", "Room 2", "Room 3"], 
    classes: string[] = ["Temperature", "Humidity", "IAQ"], 
    max: number = 10
): SubjectStats[] {
    return subjects.map(subject => {
        const item: SubjectStats = { subject }
        classes.forEach(cls => { item[cls] = randInt(0, max)  })
        return item
    })
}
