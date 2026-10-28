export type Stat = {
  value: number
  // Shown after the number, e.g. "+" or "%".
  suffix?: string
  label: string
}

// Empty until the client provides real numbers. The section stays hidden while empty.
export const stats: Stat[] = []
