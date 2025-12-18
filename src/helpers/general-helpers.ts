export const delay = async (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const isBlank = (value: any) =>
  value === undefined || value === null || value === "" || value?.length === 0;

export const isNotAFunction = (input: any) => typeof input !== "function";

export const isNullOrUndefined = (value?: any) =>
  value === undefined || value === null;

export function isTotallyEmpty(value: unknown): boolean {
  return (
    value == null ||
    (typeof value === "object" &&
      "length" in value &&
      (value as { length: number }).length === 0) ||
    (typeof value === "object" &&
      value.constructor === Object &&
      Object.keys(value).length === 0)
  );
}

export const safeText = (value: any) => {
  if (
    value === null ||
    value === "null" ||
    value === "undefined" ||
    value === undefined
  )
    return "";

  if (typeof value === "string" || typeof value === "number")
    return String(value);
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return "Invalid data";
};

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const calculateDistance = (
  pointA: { lat: string | number; long: string | number },
  pointB: { lat: string | number; long: string | number }
) => {
  const toRad = (degrees: number) => (degrees * Math.PI) / 180;

  const R = 6371;

  const lat1 = Number(pointA.lat);
  const lon1 = Number(pointA.long);
  const lat2 = Number(pointB.lat);
  const lon2 = Number(pointB.long);

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));

  return R * c;
};

export function download(fileUrl: string, filename?: string) {
  if (!fileUrl) return;

  const link = document.createElement("a");
  link.href = fileUrl;

  // Optional: use custom filename or fallback to S3's default
  link.download = filename || fileUrl.split("/").pop() || "download";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
