import { Duration } from "../types/Duration"

// export interface Duration {
//   unit: "minutes" | "seconds" | "hours" | "instant";
//   amount: number,
// }

// Recieve duration object an return its value in minutes.
export const parseTime = (duration: Duration): number => {
  if (duration.unit === "minutes") {return duration.amount}
  if (duration.unit === "seconds") {return duration.amount/60}
  if (duration.unit === "hours")   {return duration.amount*60}
  return 0; // If unit is "instant" or another, return 0.
}

// Capitalize first letter of string
export const capitalizeFirstLetter = (string: string): string => {
  if (!string) return ''; // Handle empty string
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

export const normalizeCamelCase = (string: string): string => {
  const result = string.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
