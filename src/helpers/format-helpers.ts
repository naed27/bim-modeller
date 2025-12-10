export function abbreviate(word: string, maxLength: number = 3) {
    if (!word) return ''
    if (word.length <= maxLength) return word
    return word
        .split(/[\s-_]/)          // split by spaces, hyphens, underscores
        .map(part => part[0])     // take first letter of each part
        .join('')
        .toUpperCase()             // optional: uppercase
        .slice(0, maxLength)      // enforce max length
}
