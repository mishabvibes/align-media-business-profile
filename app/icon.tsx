import { ImageResponse } from "next/og"

import { BrandMark } from "@/lib/brand-mark"
import { loadOgFonts } from "@/lib/og-fonts"

export const dynamic = "force-static"
export const size = { width: 64, height: 64 }
export const contentType = "image/png"

export default async function Icon() {
  return new ImageResponse(<BrandMark size={size.width} />, {
    ...size,
    fonts: await loadOgFonts(),
  })
}
