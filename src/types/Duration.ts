export interface Duration {
  unit: "minutes" | "seconds" | "hours" | "instant";
  amount: number,
}