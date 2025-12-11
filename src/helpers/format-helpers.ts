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

export const numberToPriceFormat = (price: number): string =>
  price.toLocaleString(undefined, { minimumFractionDigits: 2 });

export const capitalizeFirstLetter = (string: string): string => {
  try {
    if ((string?.length || -1) <= 0) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch (error) {
    return "";
  }
};

export const formatKey = (key: string): string => {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const currencyFormat = (num?: number | string): string => {
  if (!num) return "";
  return parseFloat(num.toString())
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const numberWithCommas = (num?: number | string): string => {
  if (!num) return "";
  return parseInt(num.toString(), 10).toLocaleString("en-US");
};

export function snakeToTitleCase(str = "") {
  try {
    const words = str
      ?.toLocaleString()
      ?.replace(/_/g, " ")
      .replace(/"/g, "")
      .split(/\s+/);

    const formattedWords = words.map((word) => {
      const formattedWord = word.replace(/([a-z])([A-Z])/g, "$1 $2");

      if (formattedWord === "n/a" || formattedWord.includes("-")) {
        return formattedWord.toUpperCase();
      } else {
        const parts = formattedWord.split(" ");
        const formattedParts = parts.map((part) => {
          const firstLetter = part.charAt(0).toUpperCase();
          const restOfWord = part.slice(1).toLowerCase();
          return firstLetter + restOfWord;
        });
        return formattedParts.join("");
      }
    });

    return formattedWords.join(" ");
  } catch (error) {
    return str;
  }
}

export const dateFormat = (timestamp: string | number | Date): string => {
  if (!timestamp) return "";

  const date = new Date(timestamp);

  const timeFormat = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const dateFormat = date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${dateFormat}, ${timeFormat}`;
};

export function safelyConvertIntoString(input: any): string {
  try {
    // If input is already a string, return as-is
    if (typeof input === "string") {
      return input;
    }

    // If it's an object, format it into a readable string
    if (typeof input === "object" && input !== null) {
      // Handle arrays
      if (Array.isArray(input)) {
        return input.join(", ");
      }

      // Handle regular objects
      const entries = Object.entries(input);
      return entries.map(([key, value]) => `${key} ${value}`).join(", ");
    }

    // For other types (numbers, booleans, etc.), convert to string
    return String(input);
  } catch (error) {
    // If anything goes wrong, return the original input as string
    return String(input);
  }
}

export function stringifyWithoutQuotes(value: any): string {
  const json = JSON.stringify(value);

  // Remove outer quotes if this is a simple string
  const unquoted =
    json.startsWith('"') && json.endsWith('"') ? json.slice(1, -1) : json;

  // Remove quotes around string values inside arrays/objects
  return unquoted.replace(/"([^"]*)"/g, "$1");
}
