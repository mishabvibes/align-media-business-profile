import { readFile } from "node:fs/promises"
import { join } from "node:path"

// Static TTFs for next/og (Satori can't read woff2 or variable fonts).
// Both are OFL, downloaded from Google Fonts into assets/fonts.
const fontsDir = join(process.cwd(), "assets/fonts")

export async function loadOgFonts() {
  const [bricolage, instrument] = await Promise.all([
    readFile(join(fontsDir, "BricolageGrotesque-ExtraBold.ttf")),
    readFile(join(fontsDir, "InstrumentSans-Medium.ttf")),
  ])
  return [
    { name: "Bricolage", data: bricolage, weight: 800 as const, style: "normal" as const },
    { name: "Instrument Sans", data: instrument, weight: 500 as const, style: "normal" as const },
  ]
}

export const ogColors = {
  ink: "#0B0A0D",
  line: "#2A2732",
  paper: "#F1EEE8",
  mute: "#A6A1AE",
  violet: "#7C3AED",
} as const
